---
sidebar_position: 3
---

# API Reference

## Python provider

Props which can be provided to the `<PythonProvider>` component.

| Prop                  | Required | Type      | Default   | Description                                                                                    |
| --------------------- | -------- | --------- | --------- | ---------------------------------------------------------------------------------------------- |
| packages              | No       | `Package` | undefined | Packages to be loaded globally for usage by all instances.                                     |
| timeout               | No       | `number`  | 0         | Time in ms until a running instance is terminated, 0 means there is no time limit.             |
| lazy                  | No       | `boolean` | false     | If true, prevents the web worker from spawning until `runPython` is called for the first time. |
| terminateOnCompletion | No       | `boolean` | false     | If true, the web worker will terminate on completion.                                          |

## usePython hook

| Prop     | Required | Type      | Default   | Description                                       |
| -------- | -------- | --------- | --------- | ------------------------------------------------- |
| packages | No       | `Package` | undefined | Packages to be loaded for usage by this instance. |

### runPython

`async (code: string) => void`

Takes a string of Python code. Example:

```tsx
runPython(`pi = 3.141
print(f"Pi to two decimal places is: {pi:.2f}")`)
// expected output: "Pi to two decimal places is: 3.14"
```

### stdout

`string`

Python stdout.

### stderr

`string`

Python stderr.

### isLoading

`boolean`

True if the worker is still being initialised. False if ready.

### isRunning

`boolean`

True if code is being executed. False if idle.

### interruptExecution

`() => void`

Can be called to immediately interrupt ongoing execution. Will terminate the running worker and spawn a new one.

## Types

### `Package`

Props:

`official`: `string[]` (optional) - Pyodide official packages

`micropip`: `string[]` (optional) - Packages imported using micropip

Example usage:

```tsx
import { PythonProvider } from 'react-py'

function App() {
  const packages = {
    official: ['asciitree'],
    micropip: ['python-cowsay'],
  }

  return (
    // Add the provider to your app
    <PythonProvider packages={packages}>
      <Codeblock />
    </PythonProvider>
  )
}

render(<App />, document.getElementById('root'))
```
