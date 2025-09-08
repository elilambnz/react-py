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
import { ConsoleState } from '../types/Console'

interface UsePythonConsoleProps {
  packages?: Packages
}

function usePython(props?: UsePythonConsoleProps) {
  const { packages = {} } = props ?? {}

  const [runnerId, setRunnerId] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [banner, setBanner] = useState<string | undefined>()
  const [consoleState, setConsoleState] = useState<ConsoleState>()
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState<string[]>([])
  const [stdout, setStdout] = useState('')
  const [stderr, setStderr] = useState('')
  const [pendingCode, setPendingCode] = useState<string | undefined>()

  const {
    packages: globalPackages,
    timeout,
    lazy,
    autoImportPackages,
    sendInput,
    workerAwaitingInputIds,
    getPrompt
  } = useContext(PythonContext)

  const workerRef = useRef<Worker>()
  const runnerRef = useRef<Remote<PythonRunner>>()
  const interruptBuffer = useRef(new Uint8Array(new SharedArrayBuffer(1)))

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

  // Immediately set stdout upon receiving new input
  useEffect(() => {
    if (output.length > 0 && !isRunning) {
      setStdout(output.join(''))
    }
  }, [output, isRunning])

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
            proxy(({ id, version, banner }) => {
              setRunnerId(id)
              setBanner(banner)
              console.debug('Loaded pyodide version:', version)
            }),
            'console',
            interruptBuffer.current,
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
    async (code: string) => {
      // Clear stdout and stderr
      setOutput([])
      setStdout('')
      setStderr('')

      if (lazy && !isReady) {
        // Spawn worker and set pending code
        createWorker()
        setPendingCode(code)
        return
      }

      if (!isReady) {
        throw new Error('Pyodide is not loaded yet')
      }
      let timeoutTimer
      try {
        setIsRunning(true)
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
          await runnerRef.current.run(
            moduleReloadCode(watchedModules),
            autoImportPackages
          )
        }
        interruptBuffer.current[0] = 0
        const runResult = await runnerRef.current.run(code, autoImportPackages)
        const { state, error } = runResult ?? {}
        setConsoleState(ConsoleState[state as keyof typeof ConsoleState])
        if (error) {
          setStderr(error)
        }
        // eslint-disable-next-line
      } catch (error: any) {
        console.error('Error pushing to console:', error)
      } finally {
        setIsRunning(false)
        clearTimeout(timeoutTimer)
      }
    },
    [lazy, isReady, timeout, watchedModules]
  )

  const interruptExecution = () => {
    // 2 stands for SIGINT.
    interruptBuffer.current[0] = 2
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
    output,
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
    banner,
    consoleState,
    isAwaitingInput,
    sendInput: sendUserInput,
    prompt: runnerId ? getPrompt(runnerId) : ''
  }
}

export default function usePythonConsole(props?: UsePythonConsoleProps) {
  const { stderr, stdout, runPython, consoleState, ...pyconsole } =
    usePython(props)
  const [output, setOutput] = useState([''])
  function getPrompt() {
    return consoleState === ConsoleState.incomplete ? '... ' : '>>> '
  }

  function run(input: string) {
    setOutput((prev) => [...prev, getPrompt() + input + '\n'])
    runPython(input)
  }

  useEffect(() => {
    if (stdout === pyconsole.output.join('')) {
      setOutput((prev) => [...prev, stdout, stderr ? stderr + '\n' : ''])
    }
  }, [stdout, pyconsole.output, stderr])

  return {
    ...pyconsole,
    output,
    run,
    getPrompt
  }
}
