import { useState } from "react";
import { usePython } from "react-py";

import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import clsx from "clsx";

const placeholder = `print("Hello World")`;

function App() {
  const [input, setInput] = useState(placeholder);
  const { runPython, stdout, stderr, isLoading, isRunning } = usePython();

  return (
    <div className="min-w-full bg-white">
      <div className="relative overflow-hidden">
        <Popover as="header" className="relative">
          <div className="bg-gray-900 pt-6">
            <nav
              className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6"
              aria-label="Global"
            >
              <div className="flex flex-1 items-center">
                <div className="flex w-full items-center justify-between md:w-auto">
                  <div className="-mr-2 flex items-center md:hidden">
                    <Popover.Button className="focus-ring-inset inline-flex items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex md:items-center md:space-x-6">
                <a
                  href="https://github.com/elilambnz/react-py"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
                >
                  View on GitHub
                </a>
              </div>
            </nav>
          </div>

          <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute inset-x-0 top-0 origin-top transform p-2 transition md:hidden"
            >
              <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                <div className="flex items-center justify-between px-5 pt-4">
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="pt-5 pb-6">
                  <div className="mt-6 px-5">
                    <a
                      href="https://github.com/elilambnz/react-py"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full rounded-md bg-gradient-to-r from-teal-500 to-cyan-600 py-3 px-4 text-center font-medium text-white shadow hover:from-teal-600 hover:to-cyan-700"
                    >
                      View on GitHub
                    </a>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
        <main>
          <div className="bg-gray-900 pt-10 pb-8 sm:pt-16 lg:overflow-hidden lg:pt-8 lg:pb-14">
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
                  <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                      <span className="block bg-gradient-to-r from-teal-200 to-cyan-400 bg-clip-text pb-3 text-transparent sm:pb-5">
                        react-py
                      </span>
                    </h1>
                    <p className="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl">
                      Run Python code directly in the browser.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative bg-gray-50 pt-16 pb-16 sm:pt-24 lg:pt-32">
            <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
              <div>
                <h2 className="text-base font-semibold uppercase tracking-wider text-cyan-600">
                  Basic example
                </h2>
              </div>

              <div className="mt-8 flex flex-wrap rounded-md border border-black p-4 lg:flex-nowrap">
                <div className="w-full lg:w-1/2">
                  <AceEditor
                    value={input}
                    width="100%"
                    mode="python"
                    theme="github"
                    onChange={(newValue) => setInput(newValue)}
                    name="codeblock"
                    editorProps={{ $blockScrolling: true }}
                  />
                </div>

                <div className="my-4 ml-4 w-full text-left lg:my-0 lg:w-1/2">
                  <h2 className="text-base font-semibold uppercase tracking-wider text-cyan-600">
                    {isLoading ? "Loading..." : "Ready!"}
                  </h2>

                  <button
                    type="button"
                    className={clsx(
                      "mt-4 inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:cursor-pointer hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2",
                      (isLoading || isRunning) &&
                        "cursor-not-allowed opacity-50"
                    )}
                    disabled={isLoading || isRunning}
                    onClick={() => runPython(input)}
                  >
                    {!isRunning ? "Run" : "Running..."}
                  </button>
                  <div className="mt-4">
                    <p>
                      <b>Output</b>
                    </p>
                    <pre className="mt-2 min-h-[2.5rem] overflow-auto rounded-md bg-slate-200 p-2">
                      <code>{stdout}</code>
                    </pre>
                    <br />
                    <p>
                      <b>Error</b>
                    </p>
                    <pre className="mt-2 min-h-[2.5rem] overflow-auto rounded-md bg-slate-200 p-2 text-red-500">
                      <code>{stderr}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-white">
          <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
            <div className="flex justify-center space-x-6 md:order-2">
              <a
                href="https://github.com/elilambnz/react-py"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <div className="mt-8 md:order-1 md:mt-0">
              <p className="text-center text-base text-gray-400">
                Made with ❤️ + ☕️ by{" "}
                <a
                  href="https://github.com/elilambnz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500"
                >
                  Eli Lamb
                </a>
                . Licensed under the{" "}
                <a
                  href="https://github.com/elilambnz/react-py/blob/main/LICENSE.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500"
                >
                  MIT License
                </a>
                .
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
