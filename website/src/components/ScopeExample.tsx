import React, { useState } from 'react'
import { usePython } from '@site/../dist'

export default function ScopeExample() {
  const { getGlobal, setGlobal } = usePython()

  const [x, setX] = useState()

  return (
    <div className="mb-10">
      <h2>Scope</h2>
      <button
        onClick={async () => {
          try {
            const g = await getGlobal('x')
            console.log('g', g)

            setX(g)
          } catch (error) {
            console.error('err getting g', error)
          }
        }}
      >
        Get x
      </button>
      <br />
      <span>x: {JSON.stringify(x)}</span>
    </div>
  )
}
