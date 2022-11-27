importScripts("https://cdn.jsdelivr.net/pyodide/v0.21.3/full/pyodide.js");
import { expose } from "comlink";

const python = {
  async init(id, stdout, onLoad) {
    self.pyodide = await loadPyodide({
      stdout: (msg) => stdout(id, msg),
    });
    onLoad(self.pyodide.version);
  },
  async run(code) {
    await self.pyodide.runPythonAsync(code);
  },
};

expose(python);
