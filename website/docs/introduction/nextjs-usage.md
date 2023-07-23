---
sidebar_position: 4
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

## Service worker

The service worker that handles `stdin` must be accessible from the root of your site to handle incoming fetch requests. By default, Next.js will place the `react-py` service worker in a subdirectory of your build directory.

To register the service worker, first copy the service worker to your public directory:

```bash
cp node_modules/react-py/dist/workers/service-worker.js public/react-py-sw.js
```

Then, register the service worker in the entrypoint of your app. Ensure that you register the service worker on the client side only:

```tsx
"use client";

...

useEffect(() => {
  navigator.serviceWorker
    .register('/react-py-sw.js')
    .then((registration) =>
      console.log(
        'Service Worker registration successful with scope: ',
        registration.scope
      )
    )
    .catch((err) => console.log('Service Worker registration failed: ', err))
}, [])
```

:::note
You will need to copy the service worker to the root of your build directory if you update `react-py` to a new version.
:::
