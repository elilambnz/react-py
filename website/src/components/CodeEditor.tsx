import React, { useEffect, useState } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { useColorMode } from "@docusaurus/theme-common";
import clsx from "clsx";

const editorOptions = {
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  highlightActiveLine: false,
  showPrintMargin: false,
};

const editorOnLoad = (editor) => {
  editor.renderer.setScrollMargin(10, 10, 0, 0);
  editor.moveCursorTo(0, 0);
};

export default function CodeEditor(props) {
  const { code } = props;
  const [input, setInput] = useState(code.trimEnd());
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    setInput(code.trimEnd());
    setShowOutput(false);
  }, [code]);

  const { colorMode } = useColorMode();

  return (
    <div className="relative mb-10">
      <BrowserOnly fallback={<div>Loading...</div>}>
        {() => {
          const AceEditor = require("react-ace").default;
          require("ace-builds/src-noconflict/mode-python");
          require("ace-builds/src-noconflict/theme-textmate");
          require("ace-builds/src-noconflict/theme-idle_fingers");
          require("ace-builds/src-noconflict/ext-language_tools");
          return (
            <AceEditor
              value={input}
              mode="python"
              name="CodeBlock"
              fontSize="0.9rem"
              className="overflow-clip rounded shadow-md"
              theme={colorMode === "dark" ? "idle_fingers" : "textmate"}
              onChange={(newValue) => setInput(newValue)}
              width="100%"
              maxLines={Infinity}
              onLoad={editorOnLoad}
              editorProps={{ $blockScrolling: true }}
              setOptions={editorOptions}
            />
          );
        }}
      </BrowserOnly>

      <BrowserOnly fallback={<div>Loading...</div>}>
        {() => {
          const { usePython } = require("react-py");

          const { runPython, stdout, stderr, isLoading, isRunning } =
            usePython();

          function run() {
            setShowOutput(true);
            runPython(input);
          }

          function reset() {
            setShowOutput(false);
            setInput(code.trimEnd());
          }
          return (
            <>
              <span className="absolute top-2 right-2 z-10 inline-flex rounded-md shadow-sm">
                <button
                  onClick={run}
                  type="button"
                  disabled={isLoading || isRunning}
                  className={clsx(
                    "relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700",
                    !(isLoading || isRunning)
                      ? "opacity-75 hover:cursor-pointer hover:bg-gray-50 hover:opacity-100"
                      : "opacity-50"
                  )}
                >
                  Run
                </button>
                <button
                  onClick={reset}
                  type="button"
                  disabled={isRunning}
                  className={clsx(
                    "relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700",
                    !isRunning
                      ? "opacity-75 hover:cursor-pointer hover:bg-gray-50 hover:opacity-100"
                      : "opacity-50"
                  )}
                >
                  Reset
                </button>
              </span>
              {showOutput && (
                <pre className="mt-4 text-left">
                  <code>{stdout}</code>
                  <code className="text-red-500">{stderr}</code>
                </pre>
              )}
            </>
          );
        }}
      </BrowserOnly>
    </div>
  );
}
