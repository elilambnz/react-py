---
sidebar_position: 1
---

# Getting Started

Run Python (3.11) code directly in the browser using [Pyodide](https://pyodide.org).

Learn how to get `react-py` set up in your project.

## Requirements

- [React](https://reactjs.org) version 16.9.0 or above

## Installation

Install `react-py` with:

```sh
npm install react-py
```

## Limitations

Most of the Python standard library is functional, except from some modules. The following modules can be imported, but are not functional due to the limitations of the WebAssembly VM:

- multiprocessing
- threading
- sockets

Learn more about the limitations [here](https://pyodide.org/en/stable/usage/wasm-constraints.html).
