export const MARGIN_MIN = 0;
export const MARGIN_MAX = 1000;
export const MARGIN_STEP = 10;

/** A side's margin in pixels. `null` keeps the automatic, centred margin. */
export type NoteMargin = number | null;

/** [value] kept inside the allowed range and on a step; `null` stays `null`. */
export function clampMargin(value: unknown): NoteMargin {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  const clamped = Math.min(MARGIN_MAX, Math.max(MARGIN_MIN, value));
  return Math.round(clamped / MARGIN_STEP) * MARGIN_STEP;
}
