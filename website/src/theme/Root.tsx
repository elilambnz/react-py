import React from 'react'
import { PythonProvider } from '@site/../dist'

export default function Root({ children }) {
  return <PythonProvider>{children}</PythonProvider>
}
