import { proxy, Remote, wrap } from 'comlink'
import { createContext, useEffect, useRef, useState } from 'react'
import { Packages } from '../types/Packages'
import { PythonRunner } from '../types/Runner'

const PythonContext = createContext({
  packages: {} as Packages,
  timeout: 0,
  lazy: false,
  terminateOnCompletion: false,
  loading: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getRunner: async (msgCallback: (msg: string) => void) => '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  run: async (id: string, code: string) => {},
  output: new Map<string, string[]>()
})

export const suppressedMessages = ['Python initialization complete']

const BUFFER = 2

interface PythonProviderProps {
  packages?: Packages
  timeout?: number
  lazy?: boolean
  terminateOnCompletion?: boolean
  // eslint-disable-next-line
  children: any
}

function PythonProvider(props: PythonProviderProps) {
  const {
    packages = {},
    timeout = 0,
    lazy = false,
    terminateOnCompletion = false
  } = props

  const workerRef = useRef<Map<string, Worker>>(new Map())
  const runnerRef = useRef<Map<string, Remote<PythonRunner>>>(new Map())
  const assignedRunners = useRef<Set<string>>(new Set())
  const output = useRef<Map<string, string[]>>(new Map())

  const msgCallbacks = useRef<Map<string, (msg: string) => void>>(new Map())

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!lazy) {
      console.log('Buffer size:', BUFFER)

      for (let i = 0; i < BUFFER; i++) {
        createInstance()
      }
    }
  }, [])

  const createInstance = async () => {
    try {
      const availableRunners = Array.from(runnerRef.current.keys()).filter(
        (id) => !assignedRunners.current.has(id)
      )
      if (availableRunners.length === 0) {
        setLoading(true)
      }

      const id = crypto.randomUUID()

      const worker = new Worker(
        new URL('../workers/python-worker', import.meta.url)
      )
      workerRef.current.set(id, worker)

      const runner: Remote<PythonRunner> = wrap(worker)
      runnerRef.current.set(id, runner)

      await runner.init(
        proxy((msg: string) => {
          // Suppress messages that are not useful for the user
          if (suppressedMessages.includes(msg)) {
            return
          }

          const callback = msgCallbacks.current.get(id)
          if (callback) {
            callback(msg)
          } else {
            console.warn('No callback found for runner', id)
          }
        }),
        proxy(({ version }) => {
          console.debug('Loaded pyodide version:', version)
          setLoading(false)
        }),
        [packages.official ?? [], packages.micropip ?? []]
      )
    } catch (error) {
      console.error('Error loading Pyodide:', error)
    }
  }

  const getRunner = async (msgCallback: (msg: string) => void) => {
    if (lazy) {
      await createInstance()
    }

    console.log(runnerRef.current.keys(), assignedRunners)

    // get the first available runner
    const availableRunners = Array.from(runnerRef.current.keys()).filter(
      (id) => !assignedRunners.current.has(id)
    )

    const id = availableRunners[0]
    if (!id) {
      throw new Error('No runner available')
    }

    assignedRunners.current.add(id)

    // register callback
    msgCallbacks.current.set(id, msgCallback)

    // if available is less than buffer, create a new instance
    if (availableRunners.length - 1 < BUFFER) {
      createInstance()
    }

    return id
  }

  const run = async (id: string, code: string) => {
    const runner = runnerRef.current.get(id)
    if (!runner) {
      throw new Error('Runner not found')
    }
    await runner.run(code)

    if (terminateOnCompletion) {
      console.log('Python terminateOnCompletion', id)

      runnerRef.current.delete(id)
      assignedRunners.current.delete(id)

      const worker = workerRef.current.get(id)
      if (!worker) {
        throw new Error('Worker not found')
      }
      worker.terminate()
    }
  }

  return (
    <PythonContext.Provider
      value={{
        packages,
        timeout,
        lazy,
        terminateOnCompletion,
        loading,
        getRunner,
        run,
        output: output.current
      }}
      {...props}
    />
  )
}

export { PythonContext, PythonProvider }
