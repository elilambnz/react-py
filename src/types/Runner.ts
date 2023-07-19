export interface Runner {
  init: (
    stdout: (msg: string) => void,
    onLoad: ({ version, banner }: { version: string; banner?: string }) => void,
    packages?: string[][]
  ) => Promise<void>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getGlobal: (variable: string) => any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setGlobal: (variable: string, value: any) => void
  interruptExecution: () => void
  readFile: (name: string) => void
  writeFile: (name: string, data: string) => void
  mkdir: (name: string) => void
  rmdir: (name: string) => void
}

export interface PythonRunner extends Runner {
  run: (code: string) => Promise<void>
}

export interface PythonConsoleRunner extends Runner {
  run: (code: string) => Promise<{ state: string; error?: string }>
}
