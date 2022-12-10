---
sidebar_position: 4
---

# Usage with Docusaurus

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

You can override the default CodeBlock by swizzling the component, (more about swizzling)[https://docusaurus.io/docs/swizzling].

For a full example, check out an example of a Docusaurus site using `react-py` at https://github.com/James-Ansley/latenights-textbook, specifically `src/theme/CodeBlock` and `src/components/CodeEditor`.

## Docusaurus config

We've encountered a Webpack issue when bundling a Docusaurus site with this package. The following plugin can be added to `docusaurus.config.js` to resolve this issue:

```js
plugins: [
  async function disableUsedExports() {
    return {
      name: 'disable-used-exports',
      configureWebpack() {
        return {
          optimization: {
            usedExports: false,
          },
        }
      },
    }
  },
]
```

[Read more about this issue here](https://github.com/facebook/docusaurus/issues/8389).
