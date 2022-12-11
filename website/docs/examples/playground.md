---
sidebar_position: 0
draft: true
---

# Playground

Used for testing bugs etc.

```python
with open("/hello.txt", "w") as fh:
  fh.write("hello world!")
  print("done")
```

```python
with open("/hello.txt", "r") as fh:
  data = fh.read()
print(data)
```
