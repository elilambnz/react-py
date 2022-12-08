import { useContext, useEffect, useRef, useState } from "react";
import { PythonContext, suppressedMessages } from "../providers/PythonProvider";
import { proxy, Remote, wrap } from "comlink";

interface Runner {
  init: (
    stdout: (msg: string) => void,
    onLoad: (pyodide: any) => void
  ) => Promise<void>;
  run: (code: string) => Promise<void>;
  interruptExecution: () => void;
}

export default function usePython() {
  const [isLoading, setIsLoading] = useState(true);
  const [pyodideVersion, setPyodideVersion] = useState<string | undefined>();
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [stdout, setStdout] = useState("");
  const [stderr, setStderr] = useState("");
  const [worker, setWorker] = useState<Worker>();

  const { timeout } = useContext(PythonContext);

  const runnerRef = useRef<Remote<Runner>>();

  const createWorker = () =>
    setWorker(new Worker(new URL("../workers/python-worker", import.meta.url)));

  useEffect(() => {
    // Spawn worker on mount
    createWorker();
  }, []);

  useEffect(() => {
    if (worker && !isReady) {
      const init = async () => {
        try {
          setIsLoading(true);
          const runner: Remote<Runner> = wrap(worker);
          runnerRef.current = runner;

          await runner.init(
            proxy((msg) => {
              // Suppress messages that are not useful for the user
              if (suppressedMessages.includes(msg)) {
                return;
              }
              setOutput((prev) => [...prev, msg]);
            }),
            proxy((version) => {
              setPyodideVersion(version);
            })
          );
        } catch (error) {
          console.error("Error loading Pyodide:", error);
        } finally {
          setIsLoading(false);
        }
      };
      init();
    }
  }, [worker]);

  useEffect(() => {
    if (pyodideVersion) {
      console.debug("Loaded pyodide version:", pyodideVersion);
    }
  }, [pyodideVersion]);

  useEffect(() => {
    if (isRunning && output.length > 0) {
      setStdout(output.join("\n"));
    }
  }, [isRunning, output]);

  const isReady = !isLoading && pyodideVersion;

  const pythonRunnerCode = `
import sys

sys.tracebacklimit = 0

import time
def sleep(seconds):
    start = now = time.time()
    while now - start < seconds:
        now = time.time()
time.sleep = sleep

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
    let timeoutTimer;
    try {
      setIsRunning(true);
      // Clear output
      setOutput([]);
      if (!isReady || !runnerRef.current) {
        throw new Error("Pyodide is not loaded yet");
      }
      if (timeout > 0) {
        timeoutTimer = setTimeout(() => {
          setStdout("");
          setStderr(`Execution timed out. Reached limit of ${timeout} ms.`);
          interruptExecution();
        }, timeout);
      }
      await runnerRef.current.run(code);
    } catch (error: any) {
      setStderr("Traceback (most recent call last):\n" + error.message);
    } finally {
      setIsRunning(false);
      clearTimeout(timeoutTimer);
    }
  };

  const interruptExecution = () => {
    if (!worker) {
      return;
    }
    console.debug("Terminating worker");
    worker.terminate();
    setOutput([]);
    setIsRunning(false);
    setPyodideVersion(undefined);

    // Spawn new worker
    createWorker();
  };

  return {
    runPython,
    stdout,
    stderr,
    isLoading,
    isRunning,
    interruptExecution,
  };
}
