importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js')

import { expose } from 'comlink'
import { loadPyodide as loadPyodideType, PyodideInterface } from 'pyodide'

declare global {
  interface Window {
    loadPyodide: typeof loadPyodideType
    pyodide: PyodideInterface
  }
}

// Monkey patch console.log to prevent the script from outputting logs
if (self.location.hostname !== 'localhost') {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.log = () => {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.error = () => {}
}

let pythonConsole: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reprShorten: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  awaitFut: (fut: unknown) => any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pyconsole: any
  clearConsole: () => void
}

const reactPyModule = {
  getInput: (id: string, prompt: string) => {
    const request = new XMLHttpRequest()
    // Synchronous request to be intercepted by service worker
    request.open('GET', `/react-py-get-input/?id=${id}&prompt=${prompt}`, false)
    request.send(null)
    return request.responseText
  }
}

const patchInputCode = (id: string) => `
import sys, builtins
import react_py
__prompt_str__ = ""
def get_input(prompt=""):
    global __prompt_str__
    __prompt_str__ = prompt
    print(prompt, end="")
    s = react_py.getInput("${id}", prompt)
    print()
    return s
builtins.input = get_input
sys.stdin.readline = lambda: react_py.getInput("${id}", __prompt_str__)
`

const python = {
  async init(
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
  ) {
    self.pyodide = await self.loadPyodide({ stdout })

    // Enable debug mode
    // self.pyodide.setDebug(true)

    // Always load pyodide-http package
    await self.pyodide.loadPackage(['pyodide-http'])
    // Load packages if provided
    if (packages && packages[0].length > 0) {
      await self.pyodide.loadPackage(packages[0])
    }
    if (packages && packages[1].length > 0) {
      await self.pyodide.loadPackage(['micropip'])
      const micropip = self.pyodide.pyimport('micropip')
      await micropip.install(packages[1])
    }

    const id = self.crypto.randomUUID()
    const version = self.pyodide.version

    self.pyodide.registerJsModule('react_py', reactPyModule)

    const initCode = `
import sys
import pyodide_http

sys.tracebacklimit = 0

pyodide_http.patch_all()
`
    await self.pyodide.runPythonAsync(initCode)

    if (mode === 'console') {
      const namespace = self.pyodide.globals.get('dict')()
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
      await self.pyodide.runPythonAsync(initConsoleCode, { globals: namespace })
      const reprShorten = namespace.get('repr_shorten')
      const banner = namespace.get('BANNER')
      const awaitFut = namespace.get('await_fut')
      const pyconsole = namespace.get('pyconsole')
      const clearConsole = namespace.get('clear_console')

      // eslint-disable-next-line camelcase
      pyconsole.stdout_callback = stdout

      pythonConsole = {
        reprShorten,
        awaitFut,
        pyconsole,
        clearConsole
      }

      await self.pyodide.runPythonAsync(patchInputCode(id), {
        globals: namespace
      })
      onLoad({ id, version, banner })
    } else {
      await self.pyodide.runPythonAsync(patchInputCode(id))
      onLoad({ id, version })
    }
  },
  async run(
    code: string,
    autoImportPackages: boolean
  ): Promise<{ state: string; error?: string } | undefined> {
    if (autoImportPackages) {
      await self.pyodide.loadPackagesFromImports(code)
    }
    if (pythonConsole) {
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
          if (value instanceof self.pyodide.ffi.PyProxy) {
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
    } else {
      await self.pyodide.runPythonAsync(code)
    }
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
