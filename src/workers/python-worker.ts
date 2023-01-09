importScripts('https://cdn.jsdelivr.net/pyodide/v0.22.0/full/pyodide.js')

interface Pyodide {
  loadPackage: (packages: string[]) => Promise<void>
  pyimport: (pkg: string) => micropip
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  runPythonAsync: (code: string, namespace?: any) => Promise<void>
  version: string
  FS: {
    readFile: (name: string, options: unknown) => void
    writeFile: (name: string, data: string, options: unknown) => void
    mkdir: (name: string) => void
    rmdir: (name: string) => void
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  globals: any
  isPyProxy: (value: unknown) => boolean
  setStdin: (stdin: () => string) => void
}

interface micropip {
  install: (packages: string[]) => Promise<void>
}

declare global {
  interface Window {
    loadPyodide: ({
      stdin,
      stdout
    }: {
      stdin: () => string
      stdout: (msg: string) => void
    }) => Promise<Pyodide>
    pyodide: Pyodide
  }
}

// Monkey patch console.log to prevent the script from outputting logs
// eslint-disable-next-line @typescript-eslint/no-empty-function
console.log = () => {}

import { expose } from 'comlink'

let pythonConsole: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reprShorten: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  awaitFut: (fut: unknown) => any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pyconsole: any
  clearConsole: () => void
}

const python = {
  async init(
    stdin: () => string,
    stdout: (msg: string) => void,
    onLoad: (version: string) => void,
    packages: string[][]
  ) {
    self.pyodide = await self.loadPyodide({
      stdin: () => {
        console.debug('prompt...')
        return 'foo'
      },
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
    // self.pyodide.setStdin(() => {
    //   console.debug('prompt...')
    //   return stdin()
    // })
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
  },
  async initConsole(
    initConsoleCode: string,
    stdoutCallback: (s: string) => void
  ) {
    const namespace = self.pyodide.globals.get('dict')()
    await self.pyodide.runPythonAsync(initConsoleCode, { globals: namespace })
    const reprShorten = namespace.get('repr_shorten')
    const awaitFut = namespace.get('await_fut')
    const pyconsole = namespace.get('pyconsole')
    const clearConsole = namespace.get('clear_console')

    // eslint-disable-next-line camelcase
    pyconsole.stdout_callback = (s: string) => {
      stdoutCallback(s)
    }

    pythonConsole = {
      reprShorten,
      awaitFut,
      pyconsole,
      clearConsole
    }

    const banner = namespace.get('BANNER')
    return banner
  },
  async push(code: string) {
    let state
    for (const c of code.split('\n')) {
      const fut = pythonConsole.pyconsole.push(c)
      state = fut.syntax_check
      const wrapped = pythonConsole.awaitFut(fut)
      try {
        const [value] = await wrapped
        if (self.pyodide.isPyProxy(value)) {
          value.destroy()
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (e.constructor.name === 'PythonError') {
          const message = fut.formatted_error || e.message
          return { state, error: message.trimEnd() }
        } else {
          throw e
        }
      } finally {
        fut.destroy()
        wrapped.destroy()
      }
    }

    // Return state
    return { state }
  }
}

expose(python)
