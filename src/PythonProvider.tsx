import { createContext, useEffect, useState } from "react";

declare global {
  interface Window {
    loadPyodide?: (config: any) => Promise<any>;
  }
}

const PythonContext = createContext({
  pyodide: null,
  run: async (_code: string) => {},
  output: [],
  isLoading: false,
});

function PythonProvider(props: any) {
  const [hasScript, setHasScript] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pyodide, setPyodide] = useState<any>(null);
  const [output, setOutput] = useState<string[]>([]);

  useEffect(() => {
    if (window.loadPyodide) {
      setHasScript(true);
      return;
    }

    const script = document.createElement("script");
    // TODO: import the script locally
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js";
    script.async = true;
    script.onload = () => {
      setHasScript(true);
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (hasScript && !pyodide) {
      const init = async () => {
        try {
          setIsLoading(true);
          if (!window.loadPyodide) {
            throw new Error("pyodide not loaded");
          }
          setPyodide(
            await window.loadPyodide({
              stdout: (msg: string) => setOutput((prev) => [...prev, msg]),
            })
          );
        } catch (error) {
          // NOTE: If error is "Error: Pyodide is already loading.", this is likely due to React running in Strict Mode.
          // Strict Mode renders components twice (on dev but not production) in order to detect any problems with your code and warn you about them.
          console.error("Error loading Pyodide:", error);
        } finally {
          setIsLoading(false);
        }
      };
      init();
    }
  }, [hasScript, pyodide]);

  useEffect(() => {
    if (pyodide) {
      console.info("Loaded pyodide version:", pyodide.version);
      setIsLoading(false);
    }
  }, [pyodide]);

  const run = async (code: string) => {
    // Clear output
    setOutput([]);
    if (!pyodide) {
      throw new Error("Pyodide is not loaded yet");
    }
    await pyodide.runPythonAsync(code);
    return output.join("\n");
  };

  return (
    <PythonContext.Provider
      value={{
        isLoading: !hasScript || isLoading,
        pyodide,
        run,
        output,
      }}
      {...props}
    />
  );
}

export { PythonContext, PythonProvider };
