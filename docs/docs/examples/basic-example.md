---
sidebar_position: 1
---

# Basic Example

This is a basic example using [react-ace](https://www.npmjs.com/package/react-ace) to render an interactive code block.

```python
import random

def shuffle(data):
  for i in range(len(data) - 1):
      j = random.randrange(i, len(data))
      data[i], data[j] = data[j], data[i]


data = [0, 1, 2, 3, 4, 5]
shuffle(data)
print(data)
```
