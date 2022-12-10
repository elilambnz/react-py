import { createContext } from 'react'

const PythonContext = createContext({
  timeout: 0,
  lazy: false,
  terminateOnCompletion: false,
  packages: {} as Packages,
})

export const suppressedMessages = ['Python initialization complete']

export interface Packages {
  official?: string[]
  micropip?: string[]
}

interface PythonProviderProps {
  timeout?: number
  lazy?: boolean
  terminateOnCompletion?: boolean
  packages?: Packages
  // eslint-disable-next-line
  children: any
}

function PythonProvider(props: PythonProviderProps) {
  const {
    timeout = 0,
    lazy = false,
    terminateOnCompletion = false,
    packages = {},
  } = props

  return (
    <PythonContext.Provider
      value={{
        timeout,
        lazy,
        terminateOnCompletion,
        packages,
      }}
      {...props}
    />
  )
}

export { PythonContext, PythonProvider }
