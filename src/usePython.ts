import { useContext, useEffect, useState } from "react";
import { PythonContext } from "./PythonProvider";

function usePython() {
  const [stdout, setStdout] = useState("");
  const [stderr, setStderr] = useState("");
  const [receiveOutput, setReceiveOutput] = useState(false);

  const { isLoading, run, output } = useContext(PythonContext);

  // HACK: This is a hack to get around runPython not returning output correctly
  useEffect(() => {
    if (receiveOutput) {
      setStdout(output.join("\n"));
      setReceiveOutput(false);
    }
  }, [output, receiveOutput]);

  const pythonRunnerCode = `
import sys

sys.tracebacklimit = 0

def run(code, preamble=''):
    globals_ = {}
    try:
        exec(preamble, globals_)
        code = compile(code, 'code', 'exec')
        exec(code, globals_)
    except Exception:
        type_, value, tracebac = sys.exc_info()
        tracebac = tracebac.tb_next
        raise value.with_traceback(tracebac)
`;

  const runPython = async (code: string, preamble = "") => {
    code = `${pythonRunnerCode}\n\nrun(${JSON.stringify(
      code
    )}, ${JSON.stringify(preamble)})`;
    // Clear stdout and stderr
    setStdout("");
    setStderr("");
    if (isLoading) {
      console.error("Pyodide is not loaded yet");
      return;
    }
    try {
      await run(code);
      // HACK: This is a hack to get around runPython not returning output correctly
      setReceiveOutput(true);
    } catch (error: any) {
      setStderr("Traceback (most recent call last):\n" + error.message);
    }
  };

  return {
    stdout,
    stderr,
    isLoading,
    runPython,
  };
}

export default usePython;
