import React, { useEffect, useState } from 'react'

import { Packages } from '@site/../dist/types/Packages'

import BrowserOnly from '@docusaurus/BrowserOnly'
import { useColorMode } from '@docusaurus/theme-common'
import { usePython } from '@site/../dist'

import Controls from './Controls'
import { ArrowPathIcon, PlayIcon, StopIcon } from '@heroicons/react/24/solid'

const editorOptions = {
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  highlightActiveLine: false,
  showPrintMargin: false
}

const editorOnLoad = (editor) => {
  editor.renderer.setScrollMargin(10, 10, 0, 0)
  editor.moveCursorTo(0, 0)
}

interface MatplotlibExampleProps {
  code: string
  packages?: Packages
}

export default function MatplotlibExample(props: MatplotlibExampleProps) {
  const { code, packages } = props
  const [input, setInput] = useState(code.trimEnd())
  const [showOutput, setShowOutput] = useState(false)

  useEffect(() => {
    setInput(code.trimEnd())
    setShowOutput(false)
  }, [code])

  const { colorMode } = useColorMode()

  const {
    runPython,
    stdout,
    stderr,
    isLoading,
    isRunning,
    interruptExecution
  } = usePython({ packages })

  function run() {
    runPython(input)
    setShowOutput(true)
  }

  function stop() {
    interruptExecution()
    setShowOutput(false)
  }

  function reset() {
    setShowOutput(false)
    setInput(code.trimEnd())
  }

  return (
    <div className="xl:flex xl:space-x-4">
      <div className="relative mb-10 flex flex-col xl:w-1/2">
        <Controls
          items={[
            {
              label: 'Run',
              icon: PlayIcon,
              onClick: run,
              disabled: isLoading || isRunning,
              hidden: isRunning
            },
            {
              label: 'Stop',
              icon: StopIcon,
              onClick: stop,
              hidden: !isRunning
            },
            {
              label: 'Reset',
              icon: ArrowPathIcon,
              onClick: reset,
              disabled: isRunning
            }
          ]}
        />

        <BrowserOnly fallback={<div>Loading...</div>}>
          {() => {
            const AceEditor = require('react-ace').default
            require('ace-builds/src-noconflict/mode-python')
            require('ace-builds/src-noconflict/theme-textmate')
            require('ace-builds/src-noconflict/theme-idle_fingers')
            require('ace-builds/src-noconflict/ext-language_tools')
            return (
              <AceEditor
                value={input}
                mode="python"
                name="CodeBlock"
                fontSize="0.9rem"
                className="min-h-[4rem] overflow-clip rounded shadow-md"
                theme={colorMode === 'dark' ? 'idle_fingers' : 'textmate'}
                onChange={(newValue) => setInput(newValue)}
                width="100%"
                maxLines={Infinity}
                onLoad={editorOnLoad}
                editorProps={{ $blockScrolling: true }}
                setOptions={editorOptions}
              />
            )
          }}
        </BrowserOnly>
      </div>
      <div className="xl:w-1/2">
        <h2>Result</h2>
        {!stderr ? (
          stdout && stdout.startsWith('data:image/png;base64,') ? (
            <img src={stdout} />
          ) : (
            <p>No image yet</p>
          )
        ) : (
          <pre className="mt-4 text-left">
            <code className="text-red-500">{stderr}</code>
          </pre>
        )}
      </div>
    </div>
  )
}
