export interface Runner {
  init: (
    stdout: (msg: string) => void,
    onLoad: ({
      id,
      version,
      banner
    }: {
      id: string
      version: string
      banner?: string
    }) => void,
    mode: 'standard' | 'console',
    packages?: string[][]
  ) => Promise<void>
  interruptExecution: () => void
  readFile: (name: string) => void
  writeFile: (name: string, data: string | ArrayBufferView) => void
  mkdir: (name: string) => void
  rmdir: (name: string) => void
}

export interface PythonRunner extends Runner {
  run: (
    code: string,
    autoImportPackages: boolean
  ) => Promise<void | { state: string; error?: string }>
}
