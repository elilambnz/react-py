import { createContext, useEffect, useRef, useState } from 'react'
import { Packages } from '../types/Packages'

const PythonContext = createContext({
  packages: {} as Packages,
  timeout: 0,
  lazy: false,
  terminateOnCompletion: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  sendInput: (_id: string, _value: string) => {},
  workerAwaitingInputIds: [] as string[]
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

  const swRef = useRef<ServiceWorker>()

  useEffect(() => {
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register(
            new URL('../workers/service-worker', import.meta.url)
          )
          if (registration.installing) {
            console.log('Service worker installing')
          } else if (registration.waiting) {
            console.log('Service worker installed')
          } else if (registration.active) {
            console.log('Service worker active')
            swRef.current = registration.active
          }
        } catch (error) {
          console.error(`Registration failed with ${error}`)
        }

        navigator.serviceWorker.onmessage = (event) => {
          console.log('onmessage', event)
          if (event.data.type === 'AWAITING_INPUT') {
            setWorkerAwaitingInputIds((prev) =>
              new Set(prev).add(event.data.id)
            )
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
    console.log('sending:', value)

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
  }

  return (
    <PythonContext.Provider
      value={{
        packages,
        timeout,
        lazy,
        terminateOnCompletion,
        sendInput,
        workerAwaitingInputIds: Array.from(workerAwaitingInputIds)
      }}
      {...props}
    />
  )
}

export { PythonContext, PythonProvider }
