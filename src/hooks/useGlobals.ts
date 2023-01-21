import { Remote } from 'comlink'
import { Runner } from '../types/Runner'

interface UseGlobalsProps {
  runner: Remote<Runner> | undefined
}

export default function useGlobals(props: UseGlobalsProps) {
  const { runner } = props

  const getGlobal = (variable: string) => {
    return runner?.getGlobal(variable)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setGlobal = (variable: string, value: any) => {
    return runner?.setGlobal(variable, value)
  }

  return {
    getGlobal,
    setGlobal
  }
}
