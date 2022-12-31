---
sidebar_position: 5
---

# Custom Modules

Use the `watchModules` and `unwatchModules` methods respectively to tell react-py about any custom modules to keep track of:

```tsx
import { useEffect } from 'react'
import { usePython } from 'react-py'

function Codeblock() {
  const { writeFile, watchModule ... } = usePython()

  useEffect(() => {
    const data = `
def add(a, b):
  result = a + b
  return result
`
    writeFile('utils.py', data)
    watchModules(['utils'])
  }, [])

  ...
}
```

Use your custom module:

```py
from utils import add
print(add(2, 3))
```
