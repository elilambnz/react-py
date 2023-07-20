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
import { PythonConsoleRunner } from '../types/Runner'
import { ConsoleState } from '../types/Console'

interface UsePythonConsoleProps {
  packages?: Packages
}

export default function usePythonConsole(props?: UsePythonConsoleProps) {
  const { packages = {} } = props ?? {}

  const [runnerId, setRunnerId] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [pyodideVersion, setPyodideVersion] = useState<string | undefined>()
  const [banner, setBanner] = useState<string | undefined>()
  const [consoleState, setConsoleState] = useState<ConsoleState>()
  const [isRunning, setIsRunning] = useState(false)
  const [stdout, setStdout] = useState('')
  const [stderr, setStderr] = useState('')

  const {
    packages: globalPackages,
    timeout,
    sendInput,
    workerAwaitingInputIds
  } = useContext(PythonContext)

  const workerRef = useRef<Worker>()
  const runnerRef = useRef<Remote<PythonConsoleRunner>>()

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
      new URL('../workers/python-console-worker', import.meta.url)
    )
    workerRef.current = worker
  }

  useEffect(() => {
    // Spawn worker on mount
    createWorker()

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
          const runner: Remote<PythonConsoleRunner> = wrap(
            workerRef.current as Worker
          )
          runnerRef.current = runner

          await runner.init(
            proxy((msg: string) => {
              // Suppress messages that are not useful for the user
              if (suppressedMessages.includes(msg)) {
                return
              }
              setStdout(msg)
            }),
            proxy(({ id, version, banner }) => {
              setRunnerId(id)
              setBanner(banner)
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
      setStdout('')
      setStderr('')

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
          await runnerRef.current.run(moduleReloadCode(watchedModules))
        }
        const { state, error } = await runnerRef.current.run(code)
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
    [isReady, timeout, watchedModules]
  )

  const interruptExecution = () => {
    cleanup()
    setIsRunning(false)
    setPyodideVersion(undefined)
    setBanner(undefined)
    setConsoleState(undefined)

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
    banner,
    consoleState,
    isAwaitingInput,
    sendInput: sendUserInput
  }
}
