---
sidebar_position: 6
---

# Usage with Vite

:::info
Calls to `react-py` hooks will not work with [Vite](https://vitejs.dev) during dev mode due to web workers not being included in the dev build. To view your site with `react-py` enabled, you must build your site and serve it.
:::

## Vite config

The service worker that handles `stdin` must be accessible from the root of your site. This means that the `assetsDir` build option must be set to `''` (empty string).

Add the following build options to your `vite.config.js` file:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: ''
  }
})
```
