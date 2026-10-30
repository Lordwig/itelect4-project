import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useToggle from "./useToggle";

describe("useToggle", () => {
  it("starts with the value it is given", () => {
    const { result } = renderHook(() => useToggle(false));

    expect(result.current[0]).toBe(false);
  });

  it("flips the value each time toggle is called", () => {
    const { result } = renderHook(() => useToggle(false));

    // A state change has to happen inside act(), or React has not
    // finished updating when the next line reads the result.
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);
  });
});