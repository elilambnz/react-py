import { PythonProvider } from "@site/../dist";
import React from "react";

export default function Root({ children }) {
  return <PythonProvider>{children}</PythonProvider>;
}
