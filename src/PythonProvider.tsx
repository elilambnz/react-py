import { createContext, useEffect, useState } from "react";

declare global {
  interface Window {
    loadPyodide: (config: any) => Promise<any>;
  }
}

const PythonContext = createContext({
  isLoading: false,
  pyodide: null,
  run: async (_code: string) => {},
  output: [],
});

function PythonProvider(props: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [pyodide, setPyodide] = useState<any>(null);
  const [output, setOutput] = useState<string[]>([]);

  useEffect(() => {
    if (!pyodide) {
      const init = async () => {
        try {
          setIsLoading(true);
          setPyodide(
            await window.loadPyodide({
              stdout: (msg: string) => {
                if (isLoading && msg === "Python initialization complete") {
                  setIsLoading(false);
                } else {
                  setOutput((prev) => [...prev, msg]);
                }
              },
            })
          );
        } catch (error) {
          // NOTE: If error is "Error: Pyodide is already loading.", this is likely due to React running in Strict Mode.
          // Strict Mode renders components twice (on dev but not production) in order to detect any problems with your code and warn you about them.
          console.error("Error loading Pyodide:", error);
        }
      };
      init();
    }
  }, [pyodide, isLoading, output]);

  const run = async (code: string) => {
    // Clear output
    setOutput([]);
    if (!pyodide) {
      throw new Error("Pyodide is not loaded yet");
    }
    await pyodide.runPythonAsync(code);
    // FIXME: Broken, returns stale output
    return output.join("\n");
  };

  return (
    <PythonContext.Provider
      value={{
        isLoading,
        pyodide,
        run,
        output,
      }}
      {...props}
    />
  );
}

export { PythonContext, PythonProvider };
