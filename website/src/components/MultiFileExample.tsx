import React, { useEffect, useState } from 'react'
import BrowserOnly from '@docusaurus/BrowserOnly'
import { useColorMode } from '@docusaurus/theme-common'
import { usePython } from '@site/../dist'
import PythonIcon from '../../static/img/python-icon.svg'

import Controls from './Controls'
import Loader from './Loader'
import { Tab } from '@headlessui/react'
import { ArrowPathIcon, PlayIcon, StopIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

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

const mainCode = `from numbers import multiply
from strings import reverse_string

numbers = [1, 2, 3, 4, 5]
result = multiply(numbers)
print("Result of multiplication:", result)

string_to_reverse = "Hello, World!"
reversed_string = reverse_string(string_to_reverse)
print("Reversed string:", reversed_string)`

const numbersCode = `def multiply(numbers_list):
  result = 1
  for num in numbers_list:
      result *= num
  return result`

const stringsCode = `def reverse_string(input_string):
  return input_string[::-1]`

export default function MultiFileExample() {
  const [main, setMain] = useState(mainCode)
  const [numbers, setNumbers] = useState(numbersCode)
  const [strings, setUtils] = useState(stringsCode)
  const [showOutput, setShowOutput] = useState(false)

  const { colorMode } = useColorMode()

  const {
    runPython,
    stdout,
    stderr,
    isLoading,
    isRunning,
    interruptExecution,
    writeFile,
    watchModules
  } = usePython()

  useEffect(() => {
    watchModules(['numbers', 'strings'])
  }, [])

  function run() {
    writeFile('numbers.py', numbers)
    writeFile('strings.py', strings)
    runPython(main)
    setShowOutput(true)
  }

  function stop() {
    interruptExecution()
    setShowOutput(false)
  }

  function reset() {
    setShowOutput(false)
    setMain(mainCode)
    setNumbers(numbersCode)
  }

  const tabs = [
    {
      name: 'main.py',
      code: main,
      setter: setMain
    },
    {
      name: 'numbers.py',
      code: numbers,
      setter: setNumbers
    },
    {
      name: 'strings.py',
      code: strings,
      setter: setUtils
    }
  ]

  return (
    <div className="relative mb-10">
      {isLoading && <Loader />}

      <BrowserOnly fallback={<div>Loading...</div>}>
        {() => {
          const AceEditor = require('react-ace').default
          require('ace-builds/src-noconflict/mode-python')
          require('ace-builds/src-noconflict/theme-textmate')
          require('ace-builds/src-noconflict/theme-idle_fingers')
          require('ace-builds/src-noconflict/ext-language_tools')
          return (
            <div className="flex flex-col">
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

              <Tab.Group>
                <Tab.List className="flex h-[4.25rem] space-x-2 rounded-t bg-neutral-700 p-3">
                  {tabs.map(({ name }) => (
                    <Tab
                      key={name}
                      className={({ selected }) =>
                        clsx(
                          'flex cursor-pointer items-center rounded border-none px-4 py-1 text-sm font-medium ring-1 ring-inset ring-neutral-900',
                          selected
                            ? 'bg-white text-neutral-700'
                            : 'bg-neutral-500 text-gray-50 hover:bg-white hover:text-neutral-700'
                        )
                      }
                    >
                      <PythonIcon className="mr-1 -mb-1 h-4 w-4" />
                      {name}
                    </Tab>
                  ))}
                </Tab.List>
                <Tab.Panels>
                  {tabs.map(({ code, setter }) => (
                    <Tab.Panel>
                      <div className="flex-1">
                        <AceEditor
                          value={code}
                          mode="python"
                          name="CodeBlock"
                          fontSize="0.9rem"
                          className="min-h-[4rem] overflow-clip rounded shadow-md"
                          theme={
                            colorMode === 'dark' ? 'idle_fingers' : 'textmate'
                          }
                          onChange={(newValue) => setter(newValue)}
                          width="100%"
                          maxLines={Infinity}
                          onLoad={editorOnLoad}
                          editorProps={{ $blockScrolling: true }}
                          setOptions={editorOptions}
                        />
                      </div>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>
            </div>
          )
        }}
      </BrowserOnly>

      {showOutput && (
        <pre className="mt-4 text-left">
          <code>{stdout}</code>
          <code className="text-red-500">{stderr}</code>
        </pre>
      )}
    </div>
  )
}
