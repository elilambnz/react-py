import React from 'react'
import { PythonProvider } from '@site/../dist'

export default function Root({ children }) {
  const packages = {
    official: ['asciitree'],
    micropip: ['python-cowsay'],
  }

  return <PythonProvider packages={packages}>{children}</PythonProvider>
}
