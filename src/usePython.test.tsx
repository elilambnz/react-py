// import { test } from "mocha";
// import { expect } from "chai";
// import { renderHook, act } from "@testing-library/react-hooks/native";

// import usePython from "./usePython";
// import { PythonProvider } from "./PythonProvider";

// test("should output hello world", async () => {
//   const wrapper = ({ children }: any) => {
//     return <PythonProvider>{children}</PythonProvider>;
//   };

//   const { result } = renderHook(() => usePython(), {
//     wrapper,
//   });

//   act(() => {
//     result.current.runPython('print("Hello World")');
//   });

//   expect(result.current.stdout).to.be.equal("Hello World\n");
// });
