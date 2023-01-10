import React, { useEffect, useRef, useState } from 'react'

import { usePythonConsole } from '@site/../dist'
import { ConsoleState } from '@site/../dist/types/Console'

import clsx from 'clsx'

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
      <pre className="mt-4 max-h-[calc(100vh_-_20rem)] min-h-[3.5rem] text-left text-base">
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
            className="-ml-1 w-full resize-none rounded-md border-none bg-slate-200 py-2 pl-1 pr-2 !outline-none !ring-0 focus:bg-transparent dark:bg-slate-800 dark:focus:bg-transparent"
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

      <span className="absolute top-2 right-2 z-10 inline-flex rounded-md shadow-sm">
        <button
          onClick={clear}
          type="button"
          disabled={isRunning}
          className={clsx(
            'relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700',
            !isRunning
              ? 'opacity-75 hover:cursor-pointer hover:bg-gray-50 hover:opacity-100'
              : 'opacity-50'
          )}
        >
          Clear
        </button>
        <button
          onClick={reset}
          type="button"
          // disabled={isRunning}
          className={clsx(
            'relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700',
            // !isRunning
            //   ? 'opacity-75 hover:cursor-pointer hover:bg-gray-50 hover:opacity-100'
            //   : 'opacity-50'
            'opacity-75 hover:cursor-pointer hover:bg-gray-50 hover:opacity-100'
          )}
        >
          Reset
        </button>
      </span>
    </div>
  )
}
