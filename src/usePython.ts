import { useContext, useEffect, useState } from "react";
import { PythonContext, separator } from "./PythonProvider";

function usePython() {
  const [isRunning, setIsRunning] = useState(false);
  const [stdout, setStdout] = useState("");
  const [stderr, setStderr] = useState("");

  const { run, output, isLoading } = useContext(PythonContext);

  useEffect(() => {
    if (output.length > 0) {
      if (output[output.length - 1] === separator) {
        setStdout(output.slice(0, -1).join("\n"));
      }
    }
  }, [isRunning]);

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
    finally:
        print()
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
      setIsRunning(true);
      await run(code);
    } catch (error: any) {
      setStderr("Traceback (most recent call last):\n" + error.message);
    } finally {
      setIsRunning(false);
    }
  };

  return {
    runPython,
    stdout,
    stderr,
    isLoading,
    isRunning,
  };
}

export default usePython;
