---
sidebar_position: 3
---

# Using Packages

## Python standard library

The Python standard library is available without needing to install any packages, [view the full list here](https://docs.python.org/3/library/).

Example using [uuid](https://docs.python.org/3/library/uuid.html).

```python
import uuid

print(uuid.uuid4())
```

## Pyodide official packages

There is a list of official packages included with Pyodide, [view the full list here](https://pyodide.org/en/stable/usage/packages-in-pyodide.html).

These packages can be imported either globally through the provider, or per hook usage. For more info, see the [API reference docs](../introduction/api-reference).

Example using [asciitree](https://github.com/mbr/asciitree).

```python
from asciitree import LeftAligned
from collections import OrderedDict as OD

tree = {
    'asciitree': OD([
        ('sometimes',
            {'you': {}}),
        ('just',
            {'want': OD([
                ('to', {}),
                ('draw', {}),
            ])}),
        ('trees', {}),
        ('in', {
            'your': {
                'browser': {}
            }
        })
    ])
}

tr = LeftAligned()
print(tr(tree))
```

## Installing packages with micropip

Micropip can be used to install pure Python packages with wheels available on PyPI [or from other URLs](https://pyodide.org/en/stable/usage/loading-packages.html#installing-wheels-from-arbitrary-urls).

Like the official packages, these packages can also be imported either globally through the provider, or per hook usage. For more info, see the [API reference docs](../introduction/api-reference).

Example using [python-cowsay](https://github.com/James-Ansley/cowsay).

```python
from cowsay import cowsay

message = """
The most remarkable thing about my mother is that for thirty years she served
the family nothing but leftovers.  The original meal has never been found.
		-- Calvin Trillin
""".strip()
print(cowsay(message))
```
