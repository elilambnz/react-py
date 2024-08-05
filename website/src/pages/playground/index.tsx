import React from 'react'

import Layout from '@theme/Layout'
import { useColorMode } from '@docusaurus/theme-common'

import Environment from '@site/src/components/Environment'

function EnvironmentContainer() {
  const { colorMode } = useColorMode()

  return <Environment theme={colorMode} />
}

export default function Playground(): JSX.Element {
  return (
    <Layout title="Playground" description="Try out react-py in your browser">
      <main className="flex h-full min-h-[calc(100vh-5rem)] min-w-[300px] flex-col">
        <EnvironmentContainer />
      </main>
    </Layout>
  )
}
