import { createContext } from "react";

const PythonContext = createContext({
  timeout: 0,
});

export const suppressedMessages = ["Python initialization complete"];

interface PythonProviderProps {
  timeout?: number;
  children: any;
}

function PythonProvider(props: PythonProviderProps) {
  const { timeout = 0 } = props;

  return (
    <PythonContext.Provider
      value={{
        timeout,
      }}
      {...props}
    />
  );
}

export { PythonContext, PythonProvider };
