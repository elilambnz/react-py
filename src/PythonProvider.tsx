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

const suppressedMessages = ["Python initialization complete"];

export const separator = "#<ab@17943918#@>#";

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
              stdout: (msg: string) => {
                // Suppress messages that are not useful for the user
                if (suppressedMessages.includes(msg)) {
                  return;
                }
                setOutput((prev) => [...prev, msg]);
              },
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
    // Add separator to indicate end of output
    setOutput((prev) => [...prev, separator]);
  };

  return (
    <PythonContext.Provider
      value={{
        pyodide,
        run,
        output,
        isLoading: !hasScript || isLoading,
      }}
      {...props}
    />
  );
}

export { PythonContext, PythonProvider };
