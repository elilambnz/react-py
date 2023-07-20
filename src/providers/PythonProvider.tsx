import { createContext, useEffect, useRef, useState } from 'react'
import { Packages } from '../types/Packages'

const PythonContext = createContext({
  packages: {} as Packages,
  timeout: 0,
  lazy: false,
  terminateOnCompletion: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  sendInput: (_id: string, _value: string) => {},
  workerAwaitingInputIds: [] as string[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getPrompt: (_id: string) => undefined as string | undefined
})

export const suppressedMessages = ['Python initialization complete']

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

  const [workerAwaitingInputIds, setWorkerAwaitingInputIds] = useState<
    Set<string>
  >(new Set())
  const [workerAwaitingInputPrompt, setWorkerAwaitingInputPrompt] = useState<
    Map<string, string>
  >(new Map())

  const swRef = useRef<ServiceWorker>()

  useEffect(() => {
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register(
            new URL('../workers/service-worker', import.meta.url)
          )
          if (registration.installing) {
            console.debug('Service worker installing')
          } else if (registration.waiting) {
            console.debug('Service worker installed')
          } else if (registration.active) {
            console.debug('Service worker active')
            swRef.current = registration.active
          }
        } catch (error) {
          console.error(`Registration failed with ${error}`)
        }

        navigator.serviceWorker.onmessage = (event) => {
          if (event.data.type === 'AWAITING_INPUT') {
            setWorkerAwaitingInputIds((prev) =>
              new Set(prev).add(event.data.id)
            )
            setWorkerAwaitingInputPrompt((prev) => {
              const next = new Map(prev)
              next.set(event.data.id, event.data.prompt)
              return next
            })
          }
        }
      }
    }
    registerServiceWorker()
  }, [])

  const sendInput = (id: string, value: string): void => {
    if (!workerAwaitingInputIds.has(id)) {
      console.error('Worker not awaiting input')
      return
    }

    if (!swRef.current) {
      console.error('No service worker registered')
      return
    }

    swRef.current.postMessage({
      type: 'INPUT',
      id,
      value
    })

    setWorkerAwaitingInputIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
    setWorkerAwaitingInputPrompt((prev) => {
      const next = new Map(prev)
      next.delete(id)
      return next
    })
  }

  return (
    <PythonContext.Provider
      value={{
        packages,
        timeout,
        lazy,
        terminateOnCompletion,
        sendInput,
        workerAwaitingInputIds: Array.from(workerAwaitingInputIds),
        getPrompt: (id: string) => workerAwaitingInputPrompt.get(id)
      }}
      {...props}
    />
  )
}

export { PythonContext, PythonProvider }
