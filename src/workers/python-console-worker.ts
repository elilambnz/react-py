import { loadPyodide, PyodideInterface } from 'pyodide'
import { expose } from 'comlink'

// Monkey patch console.log to prevent the script from outputting logs
// eslint-disable-next-line @typescript-eslint/no-empty-function
console.log = () => {}

declare global {
  interface Window {
    pyodide: PyodideInterface
  }
}

const initConsoleCode = `
import sys
from pyodide.ffi import to_js
from pyodide.console import PyodideConsole, repr_shorten, BANNER
import __main__
BANNER = "Welcome to the Pyodide terminal emulator 🐍\\n" + BANNER
pyconsole = PyodideConsole(__main__.__dict__)
import builtins
async def await_fut(fut):
  res = await fut
  if res is not None:
    builtins._ = res
  return to_js([res], depth=1)
def clear_console():
  pyconsole.buffer = []
`

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
    stdout: (msg: string) => void,
    onLoad: ({ version, banner }: { version: string; banner?: string }) => void,
    packages: string[][]
  ) {
    self.pyodide = await loadPyodide({})
    if (packages[0].length > 0) {
      await self.pyodide.loadPackage(packages[0])
    }
    if (packages[1].length > 0) {
      await self.pyodide.loadPackage(['micropip'])
      const micropip = self.pyodide.pyimport('micropip')
      await micropip.install(packages[1])
    }
    const version = self.pyodide.version

    const namespace = self.pyodide.globals.get('dict')()
    await self.pyodide.runPythonAsync(initConsoleCode, { globals: namespace })
    const reprShorten = namespace.get('repr_shorten')
    const banner = namespace.get('BANNER')
    const awaitFut = namespace.get('await_fut')
    const pyconsole = namespace.get('pyconsole')
    const clearConsole = namespace.get('clear_console')
    namespace.destroy()

    // eslint-disable-next-line camelcase
    pyconsole.stdout_callback = stdout

    pythonConsole = {
      reprShorten,
      awaitFut,
      pyconsole,
      clearConsole
    }

    onLoad({ version, banner })
  },
  async run(
    code: string
  ): Promise<{ state: string; error?: string } | undefined> {
    if (!pythonConsole) {
      throw new Error('Console has not been initialised')
    }
    if (code === undefined) {
      throw new Error('No code to push')
    }
    let state
    for (const line of code.split('\n')) {
      const fut = pythonConsole.pyconsole.push(line)
      state = fut.syntax_check
      const wrapped = pythonConsole.awaitFut(fut)
      try {
        const [value] = await wrapped
        if (self.pyodide.isPyProxy(value)) {
          value.destroy()
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.constructor.name === 'PythonError') {
          const message = fut.formatted_error || error.message
          return { state, error: message.trimEnd() }
        } else {
          throw error
        }
      } finally {
        fut.destroy()
        wrapped.destroy()
      }
    }
    return { state }
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
