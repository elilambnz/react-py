---
sidebar_position: 1
---

# Interrupting execution

Execution can be interrupted at any time by calling the `interruptExecution` method. This will terminate the running worker and spawn a new one.

Try running the example below and stopping the execution before it finishes.

You can also set a timeout globally, see the [API reference docs](../introduction/api-reference).

```python
import time
startTime = time.time()
for i in range(0, 10):
   print(i)
   # making delay for 1 second
   time.sleep(1)
endTime = time.time()
elapsedTime = endTime - startTime
print("Elapsed Time = %s" % elapsedTime)
```
