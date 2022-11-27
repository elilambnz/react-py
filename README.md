<p align="center">
  <a href="https://elilambnz.github.io/react-py/#gh-light-mode-only" target="_blank">
    <img src="./.github/logo-light.png" alt="react-py" width="350" height="70">
  </a>
  <a href="https://elilambnz.github.io/react-py/#gh-dark-mode-only" target="_blank">
    <img src="./.github/logo-dark.png" alt="react-py" width="350" height="70">
  </a>
</p>

<p align="center">
  Run Python code directly in the browser. <a href="https://elilambnz.github.io/react-py">Try it out!</a>
</p>

<p align="center">
  <a href="https://github.com/elilambnz/react-py/actions?query=workflow%3ACodeQL+branch%3Amain"><img src="https://img.shields.io/github/workflow/status/elilambnz/react-py/CodeQL?style=flat-square&amp;label=CodeQL" alt="CodeQL"></a>
  <a href="https://github.com/elilambnz/react-py/blob/main/LICENSE.md"><img src="https://img.shields.io/npm/l/react-py?style=flat-square" alt="MIT License"></a>
  <a href="https://www.npmjs.com/package/react-py"><img src="https://img.shields.io/npm/v/react-py?style=flat-square" alt="NPM Version"></a>
  <a href="https://bundlephobia.com/package/react-py"><img src="https://img.shields.io/bundlephobia/min/react-py?style=flat-square" alt="NPM Bundle Size"></a>
</p>

---

## Quickstart

Install `react-py` with:

```bash
npm i react-py
```

Then, wrap your app in a `PythonProvider` component.

```tsx
import { PythonProvider } from "react-py";

function App() {
  return (
    // Add the provider to your app
    <PythonProvider>
      <Codeblock />
    </PythonProvider>
  );
}

render(<App />, document.getElementById("root"));
```

Using the `usePython` hook, you can run code and access both stdout and stderr. For full usage instructions, see the [usage docs](https://elilambnz.github.io/react-py/docs/introduction/usage).

## Documentation

For full documentation, visit [elilambnz.github.io/react-py](https://elilambnz.github.io/react-py/).

## Examples

[Basic example](https://elilambnz.github.io/react-py/docs/examples/basic-example)
[Interrupting execution](https://elilambnz.github.io/react-py/docs/examples/interrupting-execution)

## Limitations

Most of the Python standard library is functional, except from some modules. The following modules can be imported, but are not functional due to the limitations of the WebAssembly VM:

- multiprocessing
- threading
- sockets

[Learn more about the limitations here](https://pyodide.org/en/stable/usage/wasm-constraints.html).

## Roadmap

- [x] Add additional examples
- [x] Ability to run python in Web Workers
- [ ] Extended API for custom configuration

## License

_react-py_ is available under the MIT License.

## Contact

Eli Lamb - [elilambnz](https://github.com/elilambnz)  
James Ansley - [James-Ansley](https://github.com/James-Ansley)

## Acknowledgments

This project is heavily based on [Pyodide](https://pyodide.org/), a Python distribution for the browser and Node.js based on WebAssembly.
