// @ts-expect-error
importScripts("https://cdn.jsdelivr.net/pyodide/v0.21.3/full/pyodide.js");

declare global {
  interface Window {
    loadPyodide: any;
    pyodide: any;
  }
}

import { expose } from "comlink";

const python = {
  async init(stdout: (msg: string) => void, onLoad: (version: string) => void) {
    self.pyodide = await self.loadPyodide({
      stdout: (msg: string) => stdout(msg),
    });
    onLoad(self.pyodide.version);
  },
  async run(code: string) {
    await self.pyodide.runPythonAsync(code);
  },
};

expose(python);
