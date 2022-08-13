import React, { useEffect, useState } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { useColorMode } from "@docusaurus/theme-common";
import { usePython } from "react-py";

const editorOptions = {
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  highlightActiveLine: false,
  showPrintMargin: false,
  // showGutter: false,
};

const editorOnLoad = (editor) => {
  editor.renderer.setScrollMargin(10, 10, 0, 0);
  // editor.renderer.setPadding(16);
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

  const { runPython, stdout, stderr, isLoading, isRunning } = usePython();

  const { colorMode } = useColorMode();

  function run() {
    setShowOutput(true);
    return runPython(input);
  }

  function reset() {
    setShowOutput(false);
    setInput(code.trimEnd());
  }

  return (
    <div className="relative py-4">
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
              theme={colorMode === "dark" ? "idle_fingers" : "textmate"}
              onChange={(newValue) => setInput(newValue)}
              width="100%"
              maxLines={Infinity}
              // style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
              onLoad={editorOnLoad}
              editorProps={{ $blockScrolling: true }}
              setOptions={editorOptions}
            />
          );
        }}
      </BrowserOnly>

      <span className="absolute top-2 right-2 z-10 mt-4 inline-flex rounded-md shadow-sm">
        <button
          disabled={isLoading || isRunning}
          onClick={run}
          type="button"
          className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 opacity-75 hover:cursor-pointer hover:bg-gray-50 hover:opacity-100"
        >
          Run
        </button>
        <button
          onClick={reset}
          type="button"
          className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 opacity-75 hover:cursor-pointer hover:bg-gray-50 hover:opacity-100"
        >
          Reset
        </button>
      </span>
      {showOutput && (
        <pre className="mt-4 text-left">
          <code>{stdout}</code>
          {<code className="text-red-500">{stderr}</code>}
        </pre>
      )}
    </div>
  );
}
