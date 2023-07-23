---
sidebar_position: 7
---

# Troubleshooting

## `usePythonConsole` messages out of order

If you are using the `usePythonConsole` hook and the messages are out of order, this may be due to your `useEffect` hook watching `stdout` [automatically batching updates in React 18](https://react.dev/blog/2022/03/08/react-18-upgrade-guide#automatic-batching). A workaround is to run your app in React 17 mode using [`ReactDOM.render`](https://react.dev/reference/react-dom/render).

## Calling `input()` returns HTML

If you are using the `input()` function in Python, you may encounter the following error:

```
ValueError: <!DOCTYPE html>...
```

This is due to no service worker being registered, so the HTML of the page is returned instead of being intercepted by the service worker. Ensure that you've followed the [usage instructions](../introduction/usage.md) and have registered the service worker. For framework specific guides, see the sidebar.
