---
sidebar_position: 5
---

# Usage with Next.js

:::info
`react-py` is not Server-Side Rendering (SSR) friendly, due to client only APIs such as web workers. To use this package with [Next.js](https://nextjs.org), ensure it is loaded on the client side only.
:::

You can ensure that a component is loaded on the client side only by using [Client Components](https://nextjs.org/docs/getting-started/react-essentials#client-components).

## Adding the `PythonProvider`

To ensure proper usage of the provider, import it only on the client side. Make sure any hooks using the provider are placed below the provider import. For example, your `page.tsx` file may look like:

```tsx
'use client'

import { PythonProvider } from 'react-py'

import Codeblock from './components/Codeblock'

export default function Home() {
  return (
    <PythonProvider>
      <main>
        <Codeblock />
      </main>
    </PythonProvider>
  )
}
```

## Using the `usePython` hook

Then simply use hooks in `components/Codeblock.tsx` as follows:

```tsx
'use client'

import { useState } from 'react'
import { usePython } from 'react-py'

export default function Codeblock() {
  const [input, setInput] = useState('')

  // Use the usePython hook to run code and access both stdout and stderr
  const { runPython, stdout, stderr, isLoading, isRunning } = usePython()

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
          value={!isRunning ? 'Run' : 'Running...'}
          disabled={isLoading || isRunning}
          onClick={(e) => {
            e.preventDefault()
            runPython(input)
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
  )
}
```
