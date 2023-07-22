importScripts('https://cdn.jsdelivr.net/pyodide/v0.23.3/full/pyodide.js')

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerJsModule: any
}

interface micropip {
  install: (packages: string[]) => Promise<void>
}

declare global {
  interface Window {
    loadPyodide: ({
      stdout
    }: {
      stdout?: (msg: string) => void
    }) => Promise<Pyodide>
    pyodide: Pyodide
  }
}

// Monkey patch console.log to prevent the script from outputting logs
if (self.location.hostname !== 'localhost') {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.log = () => {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.error = () => {}
}

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

const reactPyModule = {
  getInput: (id: string, prompt: string) => {
    const request = new XMLHttpRequest()
    // Synchronous request to be intercepted by service worker
    request.open('GET', `/get_input/?id=${id}&prompt=${prompt}`, false)
    request.send(null)
    return request.responseText
  }
}

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
    packages: string[][]
  ) {
    self.pyodide = await self.loadPyodide({})
    await self.pyodide.loadPackage(['pyodide-http'])
    if (packages[0].length > 0) {
      await self.pyodide.loadPackage(packages[0])
    }
    if (packages[1].length > 0) {
      await self.pyodide.loadPackage(['micropip'])
      const micropip = self.pyodide.pyimport('micropip')
      await micropip.install(packages[1])
    }

    const id = self.crypto.randomUUID()
    const version = self.pyodide.version

    self.pyodide.registerJsModule('react_py', reactPyModule)

    const namespace = self.pyodide.globals.get('dict')()
    const initConsoleCode = `
import pyodide_http
pyodide_http.patch_all()

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
    const patchInputCode = `
import sys, builtins
import react_py
__saved_input__ = input
__prompt_str__ = ""
def input(prompt = ""):
  global __prompt_str__
  __prompt_str__ = prompt
  print(prompt, end="")
  s = __saved_input__()
  print()
  return s
builtins.input = input
sys.stdin.readline = lambda: react_py.getInput("${id}", __prompt_str__)
`
    await self.pyodide.runPythonAsync(patchInputCode, { globals: namespace })
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

    onLoad({ id, version, banner })
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
