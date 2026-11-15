import { describe, expect, it } from "vitest";
import {
  clampLineHeight,
  LINE_HEIGHT_DEFAULT,
  LINE_HEIGHT_MAX,
  LINE_HEIGHT_MIN,
} from "./line-height";

describe("clampLineHeight", () => {
  it("keeps values inside the range", () => {
    expect(clampLineHeight(0.5)).toBe(LINE_HEIGHT_MIN);
    expect(clampLineHeight(3)).toBe(LINE_HEIGHT_MAX);
  });

  it("snaps to a step of 0.05", () => {
    expect(clampLineHeight(1.42)).toBe(1.4);
    expect(clampLineHeight(1.43)).toBe(1.45);
    expect(clampLineHeight(1.7)).toBe(1.7);
  });

  it("falls back to the default for anything that is not a number", () => {
    expect(clampLineHeight(undefined)).toBe(LINE_HEIGHT_DEFAULT);
    expect(clampLineHeight("1.5")).toBe(LINE_HEIGHT_DEFAULT);
    expect(clampLineHeight(Number.NaN)).toBe(LINE_HEIGHT_DEFAULT);
  });
});
