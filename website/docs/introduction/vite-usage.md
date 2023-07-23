---
sidebar_position: 3
---

# Usage with Vite

:::info
Calls to `react-py` hooks will not work with [Vite](https://vitejs.dev) during dev mode due to web workers not being included in the dev build. To view your site with `react-py` enabled, you must build your site and serve it.
:::

## Service worker

The service worker that handles `stdin` must be accessible from the root of your site to handle incoming fetch requests. By default, Vite will place the `react-py` service worker in a subdirectory of your build directory.

To register the service worker, first copy the service worker to your public directory:

```bash
cp node_modules/react-py/dist/workers/service-worker.js public/react-py-sw.js
```

Then, register the service worker in the entrypoint of your app:

```tsx
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
