<p align="center">
  <a href="https://elilambnz.github.io/react-py" target="_blank">
    <img src="./.github/logo.png" alt="react-py logo" width="70" height="70">
  </a>
</p>

<p align="center">
  Effortlessly run Python code in your React apps.
</p>

<p align="center">
  <a href="https://github.com/elilambnz/react-py/blob/main/LICENSE.md"><img src="https://img.shields.io/npm/l/react-py?style=flat-square" alt="MIT License"></a>
  <a href="https://www.npmjs.com/package/react-py"><img src="https://img.shields.io/npm/v/react-py?style=flat-square" alt="NPM Version"></a>
  <a href="https://bundlephobia.com/package/react-py"><img src="https://img.shields.io/bundlephobia/min/react-py?style=flat-square" alt="NPM Bundle Size"></a>
</p>

---

## Try it out

You can try out `react-py` [in the playground](https://elilambnz.github.io/react-py/playground).

## Quickstart

Install `react-py` with:

```sh
npm install react-py
```

Then, wrap your app in a `PythonProvider` component.

```tsx
import { PythonProvider } from 'react-py'

function App() {
  return (
    // Add the provider to your app
    <PythonProvider>
      <Codeblock />
    </PythonProvider>
  )
}

render(<App />, document.getElementById('root'))
```

Using the `usePython` hook, you can run code and access both stdout and stderr. For full usage instructions and framework specific guides, see the [usage docs](https://elilambnz.github.io/react-py/docs/introduction/usage).

## Documentation

For full documentation, visit [elilambnz.github.io/react-py](https://elilambnz.github.io/react-py).

## Examples

[Basic Example](https://elilambnz.github.io/react-py/docs/examples/basic-example)

[REPL](https://elilambnz.github.io/react-py/docs/examples/repl)

[Interrupting Execution](https://elilambnz.github.io/react-py/docs/examples/interrupting-execution)

[Using Packages](https://elilambnz.github.io/react-py/docs/examples/using-packages)

[File System](https://elilambnz.github.io/react-py/docs/examples/file-system)

[Custom Modules](https://elilambnz.github.io/react-py/docs/examples/custom-modules)

[Making API Calls](https://elilambnz.github.io/react-py/docs/examples/making-api-calls)

[User Input](https://elilambnz.github.io/react-py/docs/examples/user-input)

[Data Visualisation](https://elilambnz.github.io/react-py/docs/examples/data-visualisation)

## Limitations

Most of the Python standard library is functional, except from some modules. The following modules can be imported, but are not functional due to the limitations of the WebAssembly VM:

- multiprocessing
- threading
- sockets

[Learn more about the limitations here](https://pyodide.org/en/stable/usage/wasm-constraints.html).

## License

_react-py_ is available under the MIT License.

## Maintainers

Eli Lamb - [elilambnz](https://github.com/elilambnz)  
James Ansley - [James-Ansley](https://github.com/James-Ansley)

## Acknowledgments

This project uses [Pyodide](https://pyodide.org), a Python distribution for the browser and Node.js based on WebAssembly.

## Contributing

If you're interested in contributing, please read our [contributing docs](https://github.com/elilambnz/react-py/blob/master/CONTRIBUTING.md) **before submitting a pull request**.
