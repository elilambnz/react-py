importScripts('https://cdn.jsdelivr.net/pyodide/v0.21.3/full/pyodide.js')

interface Pyodide {
  version: string
  runPythonAsync: (code: string) => Promise<void>
  loadPackage: (packages: string[]) => Promise<void>
  pyimport: (pkg: string) => micropip
  FS: {
    readFile: (name: string, options: unknown) => void
    writeFile: (name: string, data: string, options: unknown) => void
    mkdir: (name: string) => void
    rmdir: (name: string) => void
  }
}

interface micropip {
  install: (packages: string[]) => Promise<void>
}

declare global {
  interface Window {
    loadPyodide: ({
      stdout
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
  async init(
    stdout: (msg: string) => void,
    onLoad: (version: string) => void,
    packages: string[][]
  ) {
    self.pyodide = await self.loadPyodide({
      stdout: (msg: string) => stdout(msg)
    })
    if (packages[0].length > 0) {
      await self.pyodide.loadPackage(packages[0])
    }
    if (packages[1].length > 0) {
      await self.pyodide.loadPackage(['micropip'])
      const micropip = self.pyodide.pyimport('micropip')
      await micropip.install(packages[1])
    }
    onLoad(self.pyodide.version)
  },
  async run(code: string) {
    await self.pyodide.runPythonAsync(code)
  },
  readFile(name: string) {
    return self.pyodide.FS.readFile(name, { encoding: 'utf8' })
  },
  writeFile(name: string, data: string) {
    return self.pyodide.FS.writeFile(name, data, { encoding: 'utf8' })
  },
  mkdir(name: string) {
    self.pyodide.FS.mkdir(name)
  },
  rmdir(name: string) {
    self.pyodide.FS.rmdir(name)
  }
}

expose(python)
