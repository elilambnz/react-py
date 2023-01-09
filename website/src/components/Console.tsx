import React, { useEffect, useRef, useState } from 'react'

import { usePython } from '@site/../dist'
import clsx from 'clsx'

enum ConsoleState {
  'complete',
  'incomplete',
  'syntax-error'
}

const ps1 = '>>> '
const ps2 = '... '

export default function Console() {
  const [input, setInput] = useState<string>()

  const [banner, setBanner] = useState<string>()
  const [echo, setEcho] = useState<string>()
  const [error, setError] = useState<string>()

  const [consoleState, setConsoleState] = useState<ConsoleState>()
  const [output, setOutput] = useState<{ text: string; className?: string }[]>(
    []
  )

  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState(0)

  const textArea = useRef<HTMLTextAreaElement>()

  const { isReady, isRunning, interruptExecution, initConsole, push } =
    usePython()

  const isConsoleReady = isReady && banner && !isRunning

  useEffect(() => {
    if (!banner && isReady) {
      const init = async () => {
        setBanner(await initConsole((message: string) => setEcho(message)))
        textArea.current.focus()
      }
      init()
    }
  }, [isReady])

  useEffect(() => {
    banner && setOutput((prev) => [...prev, { text: banner + '\n' }])
  }, [banner])

  useEffect(() => {
    echo && setOutput((prev) => [...prev, { text: echo }])
  }, [echo])

  useEffect(() => {
    error &&
      setOutput((prev) => [
        ...prev,
        { text: error + '\n', className: 'text-red-500' }
      ])
  }, [error])

  function getPrompt() {
    return consoleState === ConsoleState.incomplete ? ps2 : ps1
  }

  function stop() {
    interruptExecution()
  }

  function reset() {
    interruptExecution()
    setBanner(undefined)
    setOutput([])
    setHistory([])
  }

  async function send() {
    if (!isConsoleReady) {
      return
    }
    try {
      setCursor(0)
      input && setHistory((prev) => [input, ...prev])
      setOutput((prev) => [...prev, { text: getPrompt() + input + '\n' }])
      const { state, error } = await push(input)
      setConsoleState(ConsoleState[state])
      if (error) {
        throw error
      }
    } catch (err) {
      setError(err)
      console.error(err)
    } finally {
      setInput('')
      textArea.current.focus()
    }
  }

  return (
    <div className="relative mb-10">
      <pre className="mt-4 min-h-[3.5rem] text-left">
        {!isConsoleReady && <code>Loading...</code>}
        {output.map((line, i) => (
          <code className={line.className} key={i}>
            {line.text}
          </code>
        ))}
        <div className="mt-2 flex">
          <code className="mt-2">{getPrompt()}</code>
          <textarea
            ref={textArea}
            className="highlight-white/5 w-full resize-none rounded-md bg-slate-800 p-2 text-sm shadow-sm ring-0 ring-slate-900/10"
            style={{
              height: input
                ? `${input.split('\n').length * 1.25 + 1}rem`
                : '2.25rem'
            }}
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
            }}
            onKeyDown={(e) => {
              switch (e.key) {
                case 'Enter':
                  !e.shiftKey && send()
                  break
                case 'ArrowUp':
                  setInput(history[cursor])
                  setCursor((prev) =>
                    Math.min(...[history.length - 1, prev + 1])
                  )
                  break
                case 'ArrowDown':
                  setInput(history[cursor])
                  setCursor((prev) => Math.max(...[0, prev - 1]))
                  break
                default:
                  break
              }
            }}
            disabled={!isConsoleReady}
            autoCapitalize="off"
            spellCheck="false"
            autoFocus={true}
          />
        </div>
      </pre>

      <span className="absolute top-2 right-2 z-10 inline-flex rounded-md shadow-sm">
        <button
          onClick={stop}
          type="button"
          disabled={!isRunning}
          className={clsx(
            'relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700',
            isRunning
              ? 'opacity-75 hover:cursor-pointer hover:bg-gray-50 hover:opacity-100'
              : 'opacity-50'
          )}
        >
          Stop
        </button>
        <button
          onClick={reset}
          type="button"
          disabled={isRunning}
          className={clsx(
            'relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700',
            !isRunning
              ? 'opacity-75 hover:cursor-pointer hover:bg-gray-50 hover:opacity-100'
              : 'opacity-50'
          )}
        >
          Reset
        </button>
      </span>
    </div>
  )
}
