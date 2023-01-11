import React, { useEffect, useRef, useState } from 'react'

import { usePythonConsole } from '@site/../dist'
import { ConsoleState } from '@site/../dist/types/Console'

import Controls from './Controls'
import { ArrowPathIcon, Bars3BottomLeftIcon } from '@heroicons/react/24/solid'

const ps1 = '>>> '
const ps2 = '... '

export default function Console() {
  const [input, setInput] = useState<string>('')
  const [output, setOutput] = useState<{ text: string; className?: string }[]>(
    []
  )
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState(0)

  const textArea = useRef<HTMLTextAreaElement>()

  const {
    runPython,
    stdout,
    stderr,
    banner,
    consoleState,
    isReady,
    isRunning,
    interruptExecution
  } = usePythonConsole({ packages: { micropip: ['python-cowsay'] } })

  useEffect(() => {
    if (isReady) {
      textArea.current.focus()
    }
  }, [isReady])

  useEffect(() => {
    banner && setOutput((prev) => [...prev, { text: banner + '\n' }])
  }, [banner])

  useEffect(() => {
    stdout && setOutput((prev) => [...prev, { text: stdout }])
  }, [stdout])

  useEffect(() => {
    stderr &&
      setOutput((prev) => [
        ...prev,
        { text: stderr + '\n', className: 'text-red-500' }
      ])
  }, [stderr])

  function getPrompt() {
    return consoleState === ConsoleState.incomplete ? ps2 : ps1
  }

  function clear() {
    setOutput([])
  }

  function reset() {
    interruptExecution()
    clear()
  }

  async function send() {
    setCursor(0)
    input && setHistory((prev) => [input, ...prev])
    setOutput((prev) => [...prev, { text: getPrompt() + input + '\n' }])
    await runPython(input)
    setInput('')
    textArea.current.focus()
  }

  return (
    <div className="relative mb-10">
      <div className="absolute right-0 z-20">
        <Controls
          items={[
            {
              label: 'Clear',
              icon: Bars3BottomLeftIcon,
              onClick: clear,
              disabled: isRunning
            },
            {
              label: 'Reset',
              icon: ArrowPathIcon,
              onClick: reset
              // disabled: isRunning
            }
          ]}
        />
      </div>

      <pre className="z-10 max-h-[calc(100vh_-_20rem)] min-h-[20rem] text-left text-base shadow-md">
        {!isReady && <code>Loading...</code>}
        {output.map((line, i) => (
          <code className={line.className} key={i}>
            {line.text}
          </code>
        ))}
        <div className="relative mt-2 flex">
          <code className="mt-2">{getPrompt()}</code>
          <textarea
            ref={textArea}
            className="-ml-1 w-full resize-none rounded-md border-none bg-neutral-200 py-2 pl-1 pr-2 !outline-none !ring-0 focus:bg-transparent dark:bg-neutral-600 dark:focus:bg-transparent"
            style={{
              height: input
                ? `${input.split('\n').length * 1.5 + 1}rem`
                : '2.5rem',
              fontFamily: 'unset'
            }}
            value={input}
            onChange={(e) => {
              const value = e.target.value
              setHistory((prev) => [value, ...prev.slice(1)])
              setInput(value)
            }}
            onKeyDown={(e) => {
              // @ts-ignore
              const start = e.target.selectionStart
              // @ts-ignore
              const end = e.target.selectionEnd

              switch (e.key) {
                case 'Enter':
                  !e.shiftKey && send()
                  break
                case 'ArrowUp':
                  if (start === 0 && end === 0) {
                    setInput(history[cursor])
                    setCursor((prev) =>
                      Math.min(...[history.length - 1, prev + 1])
                    )
                  }
                  break
                case 'ArrowDown':
                  if (start === input.length && end === input.length) {
                    setInput(history[cursor])
                    setCursor((prev) => Math.max(...[0, prev - 1]))
                  }
                  break
                default:
                  break
              }
            }}
            disabled={!isReady}
            autoCapitalize="off"
            spellCheck="false"
            autoFocus={true}
          />
        </div>
      </pre>
    </div>
  )
}
