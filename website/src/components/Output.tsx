import { useEffect, useRef, useState } from 'react'
import { ConsoleState } from 'react-py/dist/types/Console'
import clsx from 'clsx'

const ps1 = '>>> '
const ps2 = '... '

export default function Output({
  isLoading,
  output,
  setOutput,
  run,
  isAwaitingInput,
  sendInput,
  consoleState,
  prompt
}: {
  isLoading: boolean
  output: { text: string; className?: string }[]
  setOutput: React.Dispatch<
    React.SetStateAction<{ text: string; className?: string }[]>
  >
  run: (code: string) => Promise<void>
  isAwaitingInput: boolean
  sendInput: (input: string) => void
  consoleState?: ConsoleState
  prompt?: string
}) {
  const [input, setInput] = useState<string>('')
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState(0)

  const textArea = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (isLoading) {
      textArea.current?.blur()
    }
  }, [isLoading])

  useEffect(() => {
    if (isAwaitingInput) {
      setInput('')
      // Remove the last line of output since we render the prompt
      setOutput((prev) => prev.slice(0, -1))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAwaitingInput])

  function getPrompt() {
    return isAwaitingInput
      ? prompt || ps1
      : consoleState === ConsoleState.incomplete
      ? ps2
      : ps1
  }

  async function send() {
    if (!input) return
    setCursor(0)
    setHistory((prev) => [input, ...prev])
    if (isAwaitingInput) {
      setOutput((prev) => [...prev, { text: getPrompt() + ' ' + input }])
      sendInput(input)
    } else {
      setOutput((prev) => [...prev, { text: getPrompt() + input + '\n' }])
      await run(input)
    }
    setInput('')
    textArea.current?.focus()
  }

  return (
    <pre className="m-0 h-full overflow-y-auto p-1 text-left text-base dark:text-white">
      {output.map((line, i) => (
        <code className={line.className} key={i}>
          {line.text}
        </code>
      ))}
      <div className="group relative flex items-center">
        <code className="text-zinc-500">{getPrompt()}</code>
        <span className="text-zinc-500 group-focus-within:hidden">|</span>
        <textarea
          ref={textArea}
          className={clsx(
            'w-full resize-none rounded-md border-none bg-transparent py-2 pl-1 pr-2 !outline-none !ring-0',
            isLoading && 'pointer-events-none'
          )}
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onKeyDown={(e: any) => {
            const start = e.target.selectionStart
            const end = e.target.selectionEnd

            switch (e.key) {
              case 'Enter':
                e.preventDefault()
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
                if (input && start === input.length && end === input.length) {
                  setInput(history[cursor])
                  setCursor((prev) => Math.max(...[0, prev - 1]))
                }
                break
              default:
                break
            }
          }}
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
    </pre>
  )
}
