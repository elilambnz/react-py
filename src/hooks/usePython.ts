import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { PythonContext, suppressedMessages } from '../providers/PythonProvider'
import { proxy, Remote, wrap } from 'comlink'
import useFilesystem from './useFilesystem'

import { Packages } from '../types/Packages'
import { PythonRunner } from '../types/Runner'

interface UsePythonProps {
  packages?: Packages
}

export default function usePython(props?: UsePythonProps) {
  const { packages = {} } = props ?? {}

  const [runnerId, setRunnerId] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState<string[]>([])
  const [stdout, setStdout] = useState('')
  const [stderr, setStderr] = useState('')
  const [pendingCode, setPendingCode] = useState<string | undefined>()
  const [hasRun, setHasRun] = useState(false)

  const {
    packages: globalPackages,
    timeout,
    lazy,
    terminateOnCompletion,
    sendInput,
    workerAwaitingInputIds,
    getPrompt
  } = useContext(PythonContext)

  const workerRef = useRef<Worker>()
  const runnerRef = useRef<Remote<PythonRunner>>()

  const {
    readFile,
    writeFile,
    mkdir,
    rmdir,
    watchModules,
    unwatchModules,
    watchedModules
  } = useFilesystem({ runner: runnerRef?.current })

  const createWorker = () => {
    const worker = new Worker(
      new URL('../workers/python-worker', import.meta.url)
    )
    workerRef.current = worker
  }

  useEffect(() => {
    if (!lazy) {
      // Spawn worker on mount
      createWorker()
    }

    // Cleanup worker on unmount
    return () => {
      cleanup()
    }
  }, [])

  const allPackages = useMemo(() => {
    const official = [
      ...new Set([
        ...(globalPackages.official ?? []),
        ...(packages.official ?? [])
      ])
    ]
    const micropip = [
      ...new Set([
        ...(globalPackages.micropip ?? []),
        ...(packages.micropip ?? [])
      ])
    ]
    return [official, micropip]
  }, [globalPackages, packages])

  const isReady = !isLoading && !!runnerId

  useEffect(() => {
    if (workerRef.current && !isReady) {
      const init = async () => {
        try {
          setIsLoading(true)
          const runner: Remote<PythonRunner> = wrap(workerRef.current as Worker)
          runnerRef.current = runner

          await runner.init(
            proxy((msg: string) => {
              // Suppress messages that are not useful for the user
              if (suppressedMessages.includes(msg)) {
                return
              }
              setOutput((prev) => [...prev, msg])
            }),
            proxy(({ id, version }) => {
              setRunnerId(id)
              console.debug('Loaded pyodide version:', version)
            }),
            allPackages
          )
        } catch (error) {
          console.error('Error loading Pyodide:', error)
        } finally {
          setIsLoading(false)
        }
      }
      init()
    }
  }, [workerRef.current])

  // Immediately set stdout upon receiving new input
  useEffect(() => {
    if (output.length > 0) {
      setStdout(output.join('\n'))
    }
  }, [output])

  // React to ready state and run delayed code if pending
  useEffect(() => {
    if (pendingCode && isReady) {
      const delayedRun = async () => {
        await runPython(pendingCode)
        setPendingCode(undefined)
      }
      delayedRun()
    }
  }, [pendingCode, isReady])

  // React to run completion and run cleanup if worker should terminate on completion
  useEffect(() => {
    if (terminateOnCompletion && hasRun && !isRunning) {
      cleanup()
      setIsRunning(false)
      setRunnerId(undefined)
    }
  }, [terminateOnCompletion, hasRun, isRunning])

  const pythonRunnerCode = `
import sys

sys.tracebacklimit = 0

import time
def sleep(seconds):
    start = now = time.time()
    while now - start < seconds:
        now = time.time()
time.sleep = sleep

def run(code, preamble=''):
    globals_ = {}
    try:
        exec(preamble, globals_)
        code = compile(code, 'code', 'exec')
        exec(code, globals_)
    except Exception:
        type_, value, tracebac = sys.exc_info()
        tracebac = tracebac.tb_next
        raise value.with_traceback(tracebac)
    finally:
        print()
`

  // prettier-ignore
  const moduleReloadCode = (modules: Set<string>) => `
import importlib
import sys
${Array.from(modules).map((name) => `
if """${name}""" in sys.modules:
    importlib.reload(sys.modules["""${name}"""])
`).join('')}
del importlib
del sys
`

  const runPython = useCallback(
    async (code: string, preamble = '') => {
      // Clear stdout and stderr
      setStdout('')
      setStderr('')

      if (lazy && !isReady) {
        // Spawn worker and set pending code
        createWorker()
        setPendingCode(code)
        return
      }

      code = `${pythonRunnerCode}\n\nrun(${JSON.stringify(
        code
      )}, ${JSON.stringify(preamble)})`

      if (!isReady) {
        throw new Error('Pyodide is not loaded yet')
      }
      let timeoutTimer
      try {
        setIsRunning(true)
        setHasRun(true)
        // Clear output
        setOutput([])
        if (!isReady || !runnerRef.current) {
          throw new Error('Pyodide is not loaded yet')
        }
        if (timeout > 0) {
          timeoutTimer = setTimeout(() => {
            setStdout('')
            setStderr(`Execution timed out. Reached limit of ${timeout} ms.`)
            interruptExecution()
          }, timeout)
        }
        if (watchedModules.size > 0) {
          await runnerRef.current.run(moduleReloadCode(watchedModules))
        }
        await runnerRef.current.run(code)
        // eslint-disable-next-line
      } catch (error: any) {
        setStderr('Traceback (most recent call last):\n' + error.message)
      } finally {
        setIsRunning(false)
        clearTimeout(timeoutTimer)
      }
    },
    [lazy, isReady, timeout, watchedModules]
  )

  const interruptExecution = () => {
    cleanup()
    setIsRunning(false)
    setRunnerId(undefined)
    setOutput([])

    // Spawn new worker
    createWorker()
  }

  const cleanup = () => {
    if (!workerRef.current) {
      return
    }
    console.debug('Terminating worker')
    workerRef.current.terminate()
  }

  const isAwaitingInput =
    !!runnerId && workerAwaitingInputIds.includes(runnerId)

  const sendUserInput = (value: string) => {
    if (!runnerId) {
      console.error('No runner id')
      return
    }
    sendInput(runnerId, value)
  }

  return {
    runPython,
    stdout,
    stderr,
    isLoading,
    isReady,
    isRunning,
    interruptExecution,
    readFile,
    writeFile,
    mkdir,
    rmdir,
    watchModules,
    unwatchModules,
    isAwaitingInput,
    sendInput: sendUserInput,
    prompt: runnerId ? getPrompt(runnerId) : ''
  }
}
