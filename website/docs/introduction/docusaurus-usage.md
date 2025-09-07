---
sidebar_position: 5
---

# Usage with Docusaurus

:::info
`react-py` is not Server-Side Rendering (SSR) friendly, due to client only APIs such as web workers. To use this package with [Docusaurus](https://docusaurus.io), ensure it is loaded on the client side only.
:::

## Adding the `PythonProvider`

Wrap your site with the `<Root>` component https://docusaurus.io/docs/swizzling#wrapper-your-site-with-root. Then wrap your site with the `PythonProvider` component:

```tsx
import React from 'react'
import { PythonProvider } from 'react-py'

export default function Root({ children }) {
  return <PythonProvider>{children}</PythonProvider>
}
```

## Overriding the CodeBlock component

You can override the default CodeBlock by swizzling the component, [more about swizzling](https://docusaurus.io/docs/swizzling).

For a full example, check out an example of a Docusaurus site using `react-py` at https://github.com/elilambnz/python-docusaurus-template, specifically `src/theme/CodeBlock` and `src/components/CodeEditor`.

## Docusaurus config

We've encountered a Webpack issue when bundling a Docusaurus site with this package. The following plugin can be added to `docusaurus.config.js` to resolve this issue:

```js
plugins: [
  async function reactPyWebpackFix() {
    return {
      name: 'react-py-webpack-fix',
      configureWebpack(_config, isServer) {
        if (isServer) return {}

        return {
          // Inject fallback __webpack_require__ object to prevent web worker errors
          plugins: [
            new (require('webpack').BannerPlugin)({
              banner: `
if (typeof __webpack_require__ === 'undefined') {
  var __webpack_require__ = {};
}
`,
              raw: true,
              test: /\.js$/
            })
          ]
        }
      }
    }
  }
]
```

This configuration resolves the `__webpack_require__ is not defined` error that occurs when web workers are processed by webpack. The BannerPlugin injects a simple `__webpack_require__` object to prevent the error from occurring in web worker contexts.

[Read more about the original issue here](https://github.com/facebook/docusaurus/issues/8389).

## Python Docusaurus Template

Get started with `react-py` and Docusaurus, you can use the [Python Docusaurus Template](https://github.com/elilambnz/python-docusaurus-template). Click the green "Use this template" button on the repository page to clone, then follow the Docusaurus configuration steps for your specific site.
