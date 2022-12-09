importScripts('https://cdn.jsdelivr.net/pyodide/v0.21.3/full/pyodide.js')

interface Pyodide {
  version: string
  runPythonAsync: (code: string) => Promise<void>
}

declare global {
  interface Window {
    loadPyodide: ({
      stdout,
    }: {
      stdout: (msg: string) => void
    }) => Promise<Pyodide>
    pyodide: Pyodide
  }
}

// Monkey patch console.log to prevent the script from outputting logs
// eslint-disable-next-line @typescript-eslint/no-empty-function
console.log = () => {}

import { expose } from 'comlink'

const python = {
  async init(stdout: (msg: string) => void, onLoad: (version: string) => void) {
    self.pyodide = await self.loadPyodide({
      stdout: (msg: string) => stdout(msg),
    })
    onLoad(self.pyodide.version)
  },
  async run(code: string) {
    await self.pyodide.runPythonAsync(code)
  },
}

expose(python)
