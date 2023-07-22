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
    self.pyodide = await self.loadPyodide({
      stdout
    })
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
    const initCode = `
import pyodide_http
pyodide_http.patch_all()
import time
def sleep(seconds):
    start = now = time.time()
    while now - start < seconds:
        now = time.time()
time.sleep = sleep
`
    await self.pyodide.runPythonAsync(initCode)
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
  print(s)
  return s
builtins.input = input
sys.stdin.readline = lambda: react_py.getInput("${id}", __prompt_str__)
`
    await self.pyodide.runPythonAsync(patchInputCode)

    onLoad({ id, version })
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
