import { test } from "mocha";
import { expect } from "chai";
import { renderHook, act } from "@testing-library/react-hooks";

import usePython from "./usePython";

test("should output hello world", () => {
  const { result } = renderHook(() => usePython());

  act(() => {
    result.current.runPython('print("Hello World")');
  });

  expect(result.current.stdout).to.be.equal("Hello World\n");
});
