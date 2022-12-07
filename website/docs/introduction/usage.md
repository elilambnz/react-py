---
sidebar_position: 2
---

# Usage

How to use `react-py` in your project.

## `PythonProvider` Provider

First, wrap your app in a `PythonProvider` component.

```tsx
import { PythonProvider } from "react-py";

function App() {
  return (
    // Add the provider to your app
    <PythonProvider>
      <Codeblock />
    </PythonProvider>
  );
}

render(<App />, document.getElementById("root"));
```

## `usePython` Hook

Use the `usePython` hook to run code and access both stdout and stderr.

```tsx
import { useState } from "react";
import { usePython } from "react-py";

function Codeblock() {
  const [input, setInput] = useState("");

  // Use the usePython hook to run code and access both stdout and stderr
  const { runPython, stdout, stderr, isLoading, isRunning } = usePython();

  return (
    <>
      {isLoading ? <p>Loading...</p> : <p>Ready!</p>}
      <form>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your code here"
        />
        <input
          type="submit"
          value={!isRunning ? "Run" : "Running..."}
          disabled={isLoading || isRunning}
          onClick={(e) => {
            e.preventDefault();
            runPython(input);
          }}
        />
      </form>
      <p>Output</p>
      <pre>
        <code>{stdout}</code>
      </pre>
      <p>Error</p>
      <pre>
        <code>{stderr}</code>
      </pre>
    </>
  );
}
```

## Usage with Docusaurus

We've encountered a Webpack issue when bundling a Docusaurus site with this package. The following plugin can be added to `docusaurus.config.js` to resolve this issue:

```js
plugins: [
  async function disableUsedExports() {
    return {
      name: "disable-used-exports",
      configureWebpack() {
        return {
          optimization: {
            usedExports: false,
          },
        };
      },
    };
  },
];
```

[Read more about this issue here](https://github.com/facebook/docusaurus/issues/8389).
