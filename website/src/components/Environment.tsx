import { useEffect, useRef, useState } from 'react'
import { usePythonConsole } from '@site/../dist'

import Editor from './Editor'
import Output from './Output'

import clsx from 'clsx'
import DialogEmpty from './DialogEmpty'
import { PlayIcon, StopIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { CubeIcon } from '@heroicons/react/24/outline'
import { DocumentArrowDownIcon } from '@heroicons/react/24/solid'

const startCode = `# Edit the code below and press the "Run" button above to see the output.
print("Hello World")`

function Environment({ theme }: { theme: string }) {
  const savedInput = localStorage.getItem('playground-input')
  const savedPackages = localStorage.getItem('playground-packages')

  const [input, setInput] = useState(savedInput || startCode)
  const [output, setOutput] = useState<{ text: string; className?: string }[]>(
    []
  )

  const [packagesModalOpen, setPackagesModalOpen] = useState(false)
  const [packageInput, setPackageInput] = useState('')
  const [selectedPackages, setSelectedPackages] = useState<string[]>(
    savedPackages ? JSON.parse(savedPackages) : []
  )
  const [isDragging, setIsDragging] = useState(false)

  const workspaceRef = useRef<HTMLDivElement>(null)

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer?.files[0]
    const validTypes = ['text/x-python', 'text/x-python-script']
    if (file && validTypes.includes(file.type)) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const fileContent = e.target?.result
        if (typeof fileContent === 'string') {
          setInput(fileContent)
        }
      }
      reader.readAsText(file)
    } else {
      alert('Invalid file type. Please upload a Python file.')
    }
  }

  useEffect(() => {
    const workspace = workspaceRef.current
    if (workspace) {
      workspace.addEventListener('dragover', handleDragOver)
      workspace.addEventListener('dragleave', handleDragLeave)
      workspace.addEventListener('drop', handleDrop)
    }
    return () => {
      if (workspace) {
        workspace.removeEventListener('dragover', handleDragOver)
        workspace.removeEventListener('dragleave', handleDragLeave)
        workspace.removeEventListener('drop', handleDrop)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceRef])

  const {
    runPython,
    stdout,
    stderr,
    consoleState,
    isLoading,
    isRunning,
    interruptExecution,
    isAwaitingInput,
    sendInput,
    prompt
  } = usePythonConsole({
    packages: {
      micropip: selectedPackages
    }
  })

  useEffect(() => {
    if (input) {
      localStorage.setItem('playground-input', input)
    }
  }, [input])

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

  async function run() {
    clear()
    await runPython(input)
  }

  function stop() {
    interruptExecution()
  }

  function clear() {
    setOutput([])
  }

  const handleUpdatePackages = async () => {
    localStorage.setItem(
      'playground-packages',
      JSON.stringify(selectedPackages)
    )

    setPackagesModalOpen(false)

    window.location.reload()
  }

  return (
    <>
      <div
        ref={workspaceRef}
        className="flex h-full flex-1 flex-col divide-y dark:divide-zinc-500 dark:bg-[#141414] md:flex-row md:divide-x md:divide-y-0"
      >
        <div className="flex min-h-[45vh] flex-col md:w-1/2">
          <div className="flex flex-wrap justify-between gap-x-2 gap-y-2 border-b p-2 dark:border-zinc-500">
            <div className="flex gap-x-2">
              <button
                className="inline-flex items-center gap-x-1.5 rounded-md border border-transparent bg-white px-2.5 py-1.5 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-100"
                onClick={() => setPackagesModalOpen(true)}
              >
                <CubeIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
                Packages{' '}
                {selectedPackages.length > 0 && `(${selectedPackages.length})`}
              </button>
            </div>

            <div className="flex gap-x-2">
              <button
                className="rounded-md border border-transparent bg-red-50 px-2.5 py-1.5 text-sm font-semibold text-red-700 shadow-sm ring-1 ring-inset ring-zinc-300 ring-red-600/20 hover:bg-red-100"
                onClick={() => {
                  clear()
                  setInput(startCode)
                }}
              >
                Reset
              </button>
              {!isRunning ? (
                <button
                  className={clsx(
                    'inline-flex items-center gap-x-1.5 rounded-md border border-transparent bg-lime-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600',
                    isLoading && 'cursor-not-allowed opacity-50'
                  )}
                  onClick={run}
                  disabled={isLoading}
                >
                  <PlayIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
                  Run
                </button>
              ) : (
                <button
                  className="inline-flex items-center gap-x-1.5 rounded-md border border-transparent bg-lime-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                  onClick={stop}
                >
                  <StopIcon className="h-4 w-4" />
                  Stop
                </button>
              )}
            </div>
          </div>
          <Editor
            theme={theme}
            input={input}
            onChange={(value) => setInput(value)}
          />
        </div>

        <div className="flex min-h-[45vh] flex-col md:w-1/2">
          <div className="flex justify-between border-b p-2 dark:border-zinc-500">
            <div>
              {isLoading && (
                <button
                  type="button"
                  className="inline-flex cursor-not-allowed items-center rounded-md border border-transparent bg-lime-50 px-2.5 py-1 text-sm font-semibold leading-6 text-lime-700 shadow-sm ring-1 ring-inset ring-lime-600/20"
                  disabled
                >
                  <svg
                    className="-ml-0.5 mr-3 h-4 w-4 animate-spin text-lime-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Setting up environment...
                </button>
              )}
              {isAwaitingInput && (
                <button
                  type="button"
                  className="inline-flex cursor-not-allowed items-center rounded-md border border-transparent bg-blue-50 px-2.5 py-1 text-sm font-semibold leading-6 text-blue-700 shadow-sm ring-1 ring-inset ring-blue-600/20"
                  disabled
                >
                  <svg
                    className="-ml-0.5 mr-3 h-4 w-4 animate-spin text-blue-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Awaiting input...
                </button>
              )}
            </div>
            <button
              className="rounded-md border border-transparent bg-white px-2.5 py-1.5 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-100"
              onClick={clear}
            >
              Clear
            </button>
          </div>
          <Output
            isLoading={isLoading}
            output={output}
            setOutput={setOutput}
            run={runPython}
            isAwaitingInput={isAwaitingInput}
            sendInput={sendInput}
            consoleState={consoleState}
            prompt={prompt}
          />
        </div>

        {isDragging && (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-white bg-opacity-10 backdrop-blur-sm backdrop-filter">
            <div className="rounded-md bg-lime-50 p-4">
              <div className="flex items-center gap-x-4">
                <DocumentArrowDownIcon
                  className="h-5 w-5 text-lime-400"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-lime-800">
                  Drop file to upload
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <DialogEmpty
        show={packagesModalOpen}
        onClose={() => setPackagesModalOpen(false)}
      >
        <button
          className="absolute right-0 top-0 border border-transparent bg-transparent p-4"
          onClick={() => setPackagesModalOpen(false)}
        >
          <span className="sr-only">Close</span>
          <XMarkIcon className="h-6 w-6 text-neutral-500 dark:text-neutral-400" />
        </button>
        <div className="w-full max-w-2xl bg-white py-6 sm:py-12 md:w-screen">
          <div className="mx-auto px-6 lg:px-8">
            <div className="pb-12">
              <h2 className="text-base font-semibold leading-7 text-zinc-900">
                Python packages
              </h2>

              <p className="prose mt-1 text-sm leading-6 text-zinc-600">
                The Python standard library is available without needing to
                install any packages,{' '}
                <a
                  className="text-black underline"
                  href="https://docs.python.org/3/library"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  view the full list here
                </a>
                . There is also a list of already installed packages,{' '}
                <a
                  className="text-black underline"
                  href="https://pyodide.org/en/stable/usage/packages-in-pyodide.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  view the full list here
                </a>
                .
              </p>

              <div className="mt-6">
                <label
                  htmlFor="package"
                  className="block text-sm font-medium leading-6 text-zinc-900"
                >
                  Package name or URL
                </label>
                <div className="mt-2 inline-flex items-center gap-x-2">
                  <input
                    type="text"
                    name="package"
                    id="package"
                    className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                    placeholder="i.e. python-cowsay"
                    onChange={(e) => setPackageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setSelectedPackages((prev) =>
                          prev.includes(packageInput)
                            ? prev
                            : [...prev, packageInput]
                        )
                      }
                    }}
                  />
                  <button
                    type="button"
                    className={clsx(
                      'rounded-md border border-transparent bg-lime-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600',
                      !packageInput && 'cursor-not-allowed opacity-50'
                    )}
                    onClick={() =>
                      setSelectedPackages((prev) =>
                        prev.includes(packageInput)
                          ? prev
                          : [...prev, packageInput]
                      )
                    }
                    disabled={!packageInput}
                  >
                    Add
                  </button>
                </div>
              </div>

              <ul role="list" className="mt-6 divide-y divide-zinc-100">
                {selectedPackages.length > 0 ? (
                  selectedPackages.map((pkg) => (
                    <li key={pkg} className="flex py-4">
                      <div className="flex-1 md:flex md:justify-between">
                        <div className="text-sm text-zinc-900">
                          <p>{pkg}</p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-zinc-500 md:mt-0">
                          <button
                            type="button"
                            className="rounded-md border border-transparent bg-white p-1.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            onClick={() =>
                              setSelectedPackages((prev) =>
                                prev.filter((p) => p !== pkg)
                              )
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="flex py-4">
                    <div className="flex-1 md:flex md:justify-between">
                      <div className="text-sm text-zinc-900">
                        <p>No packages added</p>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </div>

            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-lime-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-500 sm:ml-3 sm:w-auto"
                onClick={handleUpdatePackages}
              >
                Update packages
              </button>
            </div>
          </div>
        </div>
      </DialogEmpty>
    </>
  )
}

export default Environment
