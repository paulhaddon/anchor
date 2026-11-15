export const LINE_HEIGHT_MIN = 1;
export const LINE_HEIGHT_MAX = 1.7;
export const LINE_HEIGHT_STEP = 0.05;
export const LINE_HEIGHT_DEFAULT = 1.4;

/** [value] kept inside the allowed range and on a step. */
export function clampLineHeight(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value))
    return LINE_HEIGHT_DEFAULT;
  const clamped = Math.min(LINE_HEIGHT_MAX, Math.max(LINE_HEIGHT_MIN, value));
  const steps = Math.round(clamped / LINE_HEIGHT_STEP);
  return Math.round(steps * LINE_HEIGHT_STEP * 100) / 100;
}
