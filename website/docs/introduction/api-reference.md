---
sidebar_position: 3
---

# API Reference

## Python provider

Props which can be provided to the `<PythonProvider>` component.

| Prop    | Required | Type      | Default | Description                                                                                    |
| ------- | -------- | --------- | ------- | ---------------------------------------------------------------------------------------------- |
| timeout | No       | `number`  | 0       | Time in ms until a running instance is terminated, 0 means there is no time limit.             |
| lazy    | No       | `boolean` | false   | If true, prevents the web worker from spawning until `runPython` is called for the first time. |

## usePython hook

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
