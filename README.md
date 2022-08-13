# react-py

<!-- [![Build Status](https://img.shields.io/github/workflow/status/elilambnz/react-py/Tests?style=flat-square&label=Tests)](https://github.com/elilambnz/react-py/actions?query=workflow%3ATests+branch%3Amain) -->

[![CodeQL](https://img.shields.io/github/workflow/status/elilambnz/react-py/CodeQL?style=flat-square&label=CodeQL)](https://github.com/elilambnz/react-py/actions?query=workflow%3ACodeQL+branch%3Amain)
[![MIT License](https://img.shields.io/npm/l/react-py?style=flat-square)](https://github.com/elilambnz/react-py/blob/main/LICENSE.md)
[![NPM Version](https://img.shields.io/npm/v/react-py?style=flat-square)](https://www.npmjs.com/package/react-py)
[![NPM Bundle Size](https://img.shields.io/bundlephobia/min/react-py?style=flat-square)](https://bundlephobia.com/package/react-py)

Run Python code directly in the browser. [Try it out!](https://elilambnz.github.io/react-py)

## Examples

[Basic example](https://elilambnz.github.io/react-py/docs/examples/basic-example)

## Installation

```
npm install react-py
```

## Usage

```tsx
import { useState } from "react";
import { usePython, PythonProvider } from "react-py";

function App() {
  return (
    // Add the provider to your app
    <PythonProvider>
      <Codeblock />
    </PythonProvider>
  );
}

function Codeblock() {
  const [input, setInput] = useState("");

  // Use the usePython hook to run code and access both stdout and stderr
  const { runPython, stdout, stderr, isLoading, isRunning } = usePython();

  return (
    <>
      {isLoading ? <p>Loading...</p> : <p>Ready!</p>}
      <form>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your code here"
        />
        <input
          type="submit"
          value={!isRunning ? "Run" : "Running..."}
          disabled={isLoading || isRunning}
          onClick={(e) => {
            e.preventDefault();
            runPython(input);
          }}
        />
      </form>
      <p>Output</p>
      <pre>{stdout}</pre>
      <p>Error</p>
      <pre>{stderr}</pre>
    </>
  );
}

render(<App />, document.getElementById("root"));
```

## Limitations

Most of the Python standard library is functional, except from some modules. The following modules can be imported, but are not functional due to the limitations of the WebAssembly VM:

- multiprocessing
- threading
- sockets

[Learn more about the limitations here](https://pyodide.org/en/stable/usage/wasm-constraints.html).

## Roadmap

- [ ] Add additional examples
- [ ] Ability to run python in Web Workers
- [ ] Extended API for custom configuration

## License

_react-py_ is available under the MIT License.

## Contact

Eli Lamb - [elilambnz](https://github.com/elilambnz)  
James Ansley - [James-Ansley](https://github.com/James-Ansley)

## Acknowlegments

This project is heavily based on [Pyodide](https://pyodide.org/), a Python distribution for the browser and Node.js based on WebAssembly.
