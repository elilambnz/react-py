---
sidebar_position: 4
---

# Usage with Next.js

`react-py` is not Server-Side Rendering (SSR) friendly, due to client only APIs such as web workers. To use this package with [Next.js](https://nextjs.org), ensure it is loaded on the client side only.

These docs are current as of Next 13. In the future, this will become easier with [Client Components](https://beta.nextjs.org/docs/rendering/server-and-client-components#client-components).

## Adding the `PythonProvider`

The provider needs to be imported dynamically using [Dynamic Import](https://nextjs.org/docs/advanced-features/dynamic-import) without SSR. Add the following to `_app.tsx`:

```tsx
import type { AppProps } from 'next/app'

import dynamic from 'next/dynamic'

const PythonProvider = dynamic(
  () => import('react-py').then((module) => module.PythonProvider),
  {
    ssr: false
  }
)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PythonProvider>
      <Component {...pageProps} />
    </PythonProvider>
  )
}
```

## Using the `usePython` hook

Ensure that components using the `usePython` hook are loaded on the client side only. For example, `index.tsx` may look like:

```tsx
import dynamic from 'next/dynamic'

const Codeblock = dynamic(() => import('../components/Codeblock'), {
  ssr: false
})

export default function Home() {
  return <Codeblock />
}
```

As long as the component is imported as shown in the previous step, hooks can be used in `components/Codeblock.tsx` as follows:

```tsx
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
