---
sidebar_position: 3
---

# API Reference

## `<PythonProvider>`

Props which can be provided to the `PythonProvider` component.

| Prop                  | Required | Type                    | Default   | Description                                                                                          |
| --------------------- | -------- | ----------------------- | --------- | ---------------------------------------------------------------------------------------------------- |
| packages              | No       | [`Packages`](#packages) | undefined | Packages to be loaded globally for usage by all instances.                                           |
| timeout               | No       | `number`                | 0         | Time in ms until a running instance is terminated, 0 means there is no time limit.                   |
| lazy                  | No       | `boolean`               | false     | If true, prevents the web worker from spawning until `runPython` is called for the first time.       |
| terminateOnCompletion | No       | `boolean`               | false     | If true, the web worker will terminate on completion. Does not apply to the `usePythonConsole` hook. |

## `usePython` and `usePythonConsole` hooks

Props which can be provided to the `usePython` and `usePythonConsole` hooks.

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

**Note:** calls to `runPython` when using the `usePythonConsole` hook can be incomplete.

### stdout

`string`

Python stdout. When using the `usePythonConsole` hook, you will need to keep track of the history of stdout yourself.

### stderr

`string`

Python stderr.

### isLoading

`boolean`

True if the worker is still being initialised. False if loaded.

### isReady

`boolean`

True if instance is ready to run Python code. False otherwise. When using `lazy` prop, this will be false until `runPython` is called for the first time.

### isRunning

`boolean`

True if code is being executed. False if idle.

### interruptExecution

`() => void`

Can be called to immediately interrupt ongoing execution. Will terminate the running worker and spawn a new one.

### readFile

`(name: string) => void`

Exposes `pyodide.FS.readFile`, encoding is `utf8`. [Read more here](https://emscripten.org/docs/api_reference/Filesystem-API.html#FS.readFile).

### writeFile

`(name: string, data: string) => void`

Exposes `pyodide.FS.writeFile`, encoding is `utf8`. [Read more here](https://emscripten.org/docs/api_reference/Filesystem-API.html#FS.writeFile).

### mkdir

`(name: string) => void`

Exposes `pyodide.FS.mkdir`. [Read more here](https://emscripten.org/docs/api_reference/Filesystem-API.html#FS.mkdir).

### rmdir

Exposes `pyodide.FS.rmdir`. [Read more here](https://emscripten.org/docs/api_reference/Filesystem-API.html#FS.rmdir).

### watchModules

`(moduleNames: string[]) => void`

Adds modules to be reloaded before code is run.

### unwatchModules

`(moduleNames: string[]) => void`

Removes modules to be reloaded before code is run.

### isAwaitingInput

`boolean`

True if Python is awaiting input from `stdin`. False otherwise.

### sendInput

`(value: string) => void`

Sends input to Python `stdin`.

### prompt

`string`

Provides the current `stdin` prompt string.

## `usePythonConsole` hook

### banner

`string`

Python banner.

### consoleState

`ConsoleState | undefined`

Current state of console.

## Types

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

### ConsoleState

Enum representing console state.

`'complete' | 'incomplete' | 'syntax-error'`
