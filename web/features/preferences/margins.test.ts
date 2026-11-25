import { describe, expect, it } from "vitest";
import { clampMargin, MARGIN_MAX, MARGIN_MIN } from "./margins";

describe("clampMargin", () => {
  it("keeps automatic as null", () => {
    expect(clampMargin(null)).toBeNull();
    expect(clampMargin(undefined)).toBeNull();
    expect(clampMargin("120")).toBeNull();
    expect(clampMargin(Number.NaN)).toBeNull();
  });

  it("stays inside the range", () => {
    expect(clampMargin(-50)).toBe(MARGIN_MIN);
    expect(clampMargin(99999)).toBe(MARGIN_MAX);
  });

  it("snaps to a step", () => {
    expect(clampMargin(123)).toBe(120);
    expect(clampMargin(125)).toBe(130);
  });
});
