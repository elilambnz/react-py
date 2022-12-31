---
sidebar_position: 4
---

# File System

Some internal Pyodide file system methods are exposed.

For more info, see the [API reference docs](../introduction/api-reference#usepython-hook).

```tsx
import { usePython } from 'react-py'

function Codeblock() {
  const { readFile, writeFile, mkdir, rmdir ... } = usePython()

  function read() {
    const file = readFile('/hello.txt')
    console.log(file)
  }

  function write() {
    const data = 'hello world!'
    writeFile('/hello.txt', data)
  }

  function createDir() {
    mkdir('lib')
  }

  function deleteDir() {
    rmdir('cruft')
  }

  ...
}
```

You can also use Python to read and write files:

```python
with open("hello.txt", "w") as f:
  f.write('hello world!')

with open('hello.txt') as f:
  contents = f.read()
  print(contents)
```

:::note
Files are not shared between instances, each usage of the `usePython` hook has an independent file system. Files are also not persisted on page reload.
:::
