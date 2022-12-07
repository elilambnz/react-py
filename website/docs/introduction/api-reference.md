---
sidebar_position: 3
draft: true
---

# API Reference

## Python provider

Props which can be provided to the `<PythonProvider>` component.

| Prop    | Required | Type     | Default | Description                                                                        |
| ------- | -------- | -------- | ------- | ---------------------------------------------------------------------------------- |
| timeout | No       | `number` | 0       | Time in ms until a running instance is terminated, 0 means there is no time limit. |

## usePython hook

### runPython

`async (code: string) => void`

Takes a string of Python code. Example:

```tsx
runPython(`pi = 3.141
print(f"Pi to two decimal places is: {pi:.2f}")`);
// expected output: "Pi to two decimal places is: 3.14"
```

### stdout

`string`

Python stdout.

### stderr

`String`

Python stderr.

### isLoading

`Boolean`

True if the worker is still being initialised. False if ready.

### isRunning

`Boolean`

True if code is being executed. False if idle.

### interruptExecution

`() => void`

Can be called to immediately interrupt ongoing execution. Will terminate the running worker and spawn a new one.
