import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { PythonContext, suppressedMessages } from '../providers/PythonProvider'
import { Remote } from 'comlink'
import useFilesystem from './useFilesystem'

import { Packages } from '../types/Packages'
import { PythonRunner } from '../types/Runner'

interface UsePythonProps {
  packages?: Packages
}

export default function usePython(props?: UsePythonProps) {
  const { packages } = props ?? {}

  const [runnerId, setRunnerId] = useState<string>()
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState<string[]>([])
  const [stdout, setStdout] = useState('')
  const [stderr, setStderr] = useState('')
  const [hasRun, setHasRun] = useState(false)

  const {
    timeout,
    lazy,
    terminateOnCompletion,
    loading,
    getRunner,
    run,
    terminate
  } = useContext(PythonContext)

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

  useEffect(() => {
    // Cleanup worker on unmount
    return () => {
      cleanup()
    }
  }, [])

  // Immediately set stdout upon receiving new input
  useEffect(() => {
    if (output.length > 0) {
      setStdout(output.join('\n'))
    }
  }, [output])

  const cleanup = () => {
    if (runnerId) {
      terminate(runnerId)
    }
    setIsRunning(false)
    setRunnerId(undefined)
    setHasRun(false)
    setOutput([])
    setStdout('')
    setStderr('')
  }

  // React to run completion and run cleanup if worker should terminate on completion
  useEffect(() => {
    if (terminateOnCompletion && hasRun && !isRunning) {
      cleanup()
    }
  }, [terminateOnCompletion, hasRun, isRunning])

  const interruptExecution = () => {
    cleanup()
  }

  const isReady = !!runnerId

  const isLoading = loading && !isReady

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

  // send a callback to the worker to handle the output
  const handleOutput = (msg: string) => {
    // Suppress messages that are not useful for the user
    if (suppressedMessages.includes(msg)) {
      return
    }
    setOutput((prev) => [...prev, msg])
  }

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

      let newRunnerId
      if (!runnerId || terminateOnCompletion || packages) {
        console.log('no runnerId, getting runner')
        newRunnerId = await getRunner(handleOutput, packages)
        setRunnerId(newRunnerId)
      }

      const r = runnerId || newRunnerId

      if (!r) {
        console.log('no runnerId, returning')
        return
      }

      code = `${pythonRunnerCode}\n\nrun(${JSON.stringify(
        code
      )}, ${JSON.stringify(preamble)})`

      // if (!isReady) {
      //   throw new Error('Pyodide is not loaded yet')
      // }
      let timeoutTimer
      try {
        setIsRunning(true)
        setHasRun(true)
        // Clear output
        setOutput([])
        // if (!isReady || !runnerRef.current) {
        //   throw new Error('Pyodide is not loaded yet')
        // }
        if (timeout > 0) {
          timeoutTimer = setTimeout(() => {
            setStdout('')
            setStderr(`Execution timed out. Reached limit of ${timeout} ms.`)
            interruptExecution()
          }, timeout)
        }
        if (watchedModules.size > 0) {
          await run(r, moduleReloadCode(watchedModules))
        }
        await run(r, code)
        // eslint-disable-next-line
      } catch (error: any) {
        setStderr('Traceback (most recent call last):\n' + error.message)
      } finally {
        setIsRunning(false)
        clearTimeout(timeoutTimer)
      }
    },
    [runnerId, lazy, timeout, watchedModules]
  )

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
    unwatchModules
  }
}

// const allPackages = useMemo(() => {
//   const official = [
//     ...new Set([
//       ...(globalPackages.official ?? []),
//       ...(packages.official ?? [])
//     ])
//   ]
//   const micropip = [
//     ...new Set([
//       ...(globalPackages.micropip ?? []),
//       ...(packages.micropip ?? [])
//     ])
//   ]
//   return [official, micropip]
// }, [globalPackages, packages])
