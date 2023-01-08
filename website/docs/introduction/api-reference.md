---
sidebar_position: 3
---

# API Reference

## `<PythonProvider>`

Props which can be provided to the `PythonProvider` component.

| Prop                  | Required | Type                    | Default   | Description                                                                                    |
| --------------------- | -------- | ----------------------- | --------- | ---------------------------------------------------------------------------------------------- |
| packages              | No       | [`Packages`](#packages) | undefined | Packages to be loaded globally for usage by all instances.                                     |
| timeout               | No       | `number`                | 0         | Time in ms until a running instance is terminated, 0 means there is no time limit.             |
| lazy                  | No       | `boolean`               | false     | If true, prevents the web worker from spawning until `runPython` is called for the first time. |
| terminateOnCompletion | No       | `boolean`               | false     | If true, the web worker will terminate on completion.                                          |

## `usePython` hook

Props which can be provided to the `usePython` hook.

| Prop     | Required | Type                    | Default   | Description                                       |
| -------- | -------- | ----------------------- | --------- | ------------------------------------------------- |
| packages | No       | [`Packages`](#packages) | undefined | Packages to be loaded for usage by this instance. |

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

### readFile

`(name: string) => void`

Exposes `pyodide.FS.readFile`, encoding is `utf8`.

### writeFile

`(name: string, data: string) => void`

Exposes `pyodide.FS.writeFile`, encoding is `utf8`.

### mkdir

`(name: string) => void`

Exposes `pyodide.FS.mkdir`.

### rmdir

Exposes `pyodide.FS.rmdir`.

### watchModules

`(modules: string[]) => void`

Adds modules to be reloaded before code is run.

### unwatchModules

`(modules: string[]) => void`

Removes modules to be reloaded before code is run.

### Packages

Example:

```js
{
  official: ['asciitree'],
  micropip: ['python-cowsay'],
}
```

#### official

`string[]` (optional) - Pyodide official packages

#### micropip

`string[]` (optional) - Packages imported using micropip
