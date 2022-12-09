import { createContext } from 'react'

const PythonContext = createContext({
  timeout: 0,
  lazy: false,
})

export const suppressedMessages = ['Python initialization complete']

interface PythonProviderProps {
  timeout?: number
  lazy?: boolean
  // eslint-disable-next-line
  children: any
}

function PythonProvider(props: PythonProviderProps) {
  const { timeout = 0, lazy = false } = props

  return (
    <PythonContext.Provider
      value={{
        timeout,
        lazy,
      }}
      {...props}
    />
  )
}

export { PythonContext, PythonProvider }
