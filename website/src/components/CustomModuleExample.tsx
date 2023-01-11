import React, { useState } from 'react'
import BrowserOnly from '@docusaurus/BrowserOnly'
import { useColorMode } from '@docusaurus/theme-common'
import { usePython } from '@site/../dist'

import Controls from './Controls'
import {
  ArrowPathIcon,
  EyeIcon,
  EyeSlashIcon,
  PencilIcon,
  PlayIcon,
  StopIcon
} from '@heroicons/react/24/solid'

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

const moduleCode = `def add(a, b):
  result = a + b
  return result`

const inputCode = `from utils import add

print(add(2, 3))`

export default function CustomModuleExample() {
  const [module, setModule] = useState(moduleCode)
  const [input, setInput] = useState(inputCode)
  const [showOutput, setShowOutput] = useState(false)
  const [message, setMessage] = useState<string>()

  const { colorMode } = useColorMode()

  const {
    runPython,
    stdout,
    stderr,
    isLoading,
    isRunning,
    interruptExecution,
    writeFile,
    watchModules,
    unwatchModules
  } = usePython()

  function run() {
    runPython(input)
    setMessage(undefined)
    setShowOutput(true)
  }

  function stop() {
    interruptExecution()
    setShowOutput(false)
  }

  function reset() {
    setShowOutput(false)
    setModule(moduleCode)
    setInput(inputCode)
  }

  function write() {
    setShowOutput(false)
    writeFile('utils.py', module)
    setMessage('File written')
  }

  function watch() {
    setShowOutput(false)
    watchModules(['utils'])
    setMessage('Watching file')
  }

  function unwatch() {
    setShowOutput(false)
    unwatchModules(['utils'])
    setMessage('Not watching file')
  }

  return (
    <div className="relative mb-10">
      <BrowserOnly fallback={<div>Loading...</div>}>
        {() => {
          const AceEditor = require('react-ace').default
          require('ace-builds/src-noconflict/mode-python')
          require('ace-builds/src-noconflict/theme-textmate')
          require('ace-builds/src-noconflict/theme-idle_fingers')
          require('ace-builds/src-noconflict/ext-language_tools')
          return (
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <div className="flex-1">
                <div className="relative flex justify-between">
                  <h2>utils.py</h2>
                  <div className="absolute right-0 top-0 -m-2 -mt-3">
                    <Controls
                      items={[
                        {
                          label: 'Write',
                          icon: PencilIcon,
                          onClick: write
                        },
                        {
                          label: 'Watch',
                          icon: EyeIcon,
                          onClick: watch
                        },
                        {
                          label: 'Unwatch',
                          icon: EyeSlashIcon,
                          onClick: unwatch
                        }
                      ]}
                    />
                  </div>
                </div>
                <AceEditor
                  value={module}
                  mode="python"
                  name="CodeBlock"
                  fontSize="0.9rem"
                  className="min-h-[4rem] overflow-clip rounded shadow-md"
                  theme={colorMode === 'dark' ? 'idle_fingers' : 'textmate'}
                  onChange={(newValue) => setModule(newValue)}
                  width="100%"
                  maxLines={Infinity}
                  onLoad={editorOnLoad}
                  editorProps={{ $blockScrolling: true }}
                  setOptions={editorOptions}
                />
              </div>

              <div className="flex-1">
                <div className="relative flex justify-between">
                  <h2>main.py</h2>
                  <div className="absolute right-0 top-0 -m-2 -mt-3">
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
                  </div>
                </div>
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
              </div>
            </div>
          )
        }}
      </BrowserOnly>

      {message && (
        <pre className="mt-4 text-left text-blue-500">
          <code>{message}</code>
        </pre>
      )}
      {showOutput && (
        <pre className="mt-4 text-left">
          <code>{stdout}</code>
          <code className="text-red-500">{stderr}</code>
        </pre>
      )}
    </div>
  )
}
