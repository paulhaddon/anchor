"use client";

import {
  clampLineHeight,
  LINE_HEIGHT_MAX,
  LINE_HEIGHT_MIN,
  LINE_HEIGHT_STEP,
  usePreferencesStore,
} from "@/features/preferences";
import { Row, SaveStatus, Section, useSaveStatus } from "./settings-blocks";

export function LineHeightSection() {
  const lineHeight = usePreferencesStore((state) => state.editor.lineHeight);
  const setEditorPreference = usePreferencesStore(
    (state) => state.setEditorPreference,
  );
  const [saveStatus, setSaveStatus] = useSaveStatus();
  return (
    <Section id="line-height" title="Line height">
      <Row className="grid justify-items-center gap-2">
        <output
          htmlFor="line-height-slider"
          className="font-semibold text-ui tabular-nums"
        >
          {lineHeight.toFixed(2)}
        </output>
        <input
          id="line-height-slider"
          type="range"
          aria-label="Line height"
          min={LINE_HEIGHT_MIN}
          max={LINE_HEIGHT_MAX}
          step={LINE_HEIGHT_STEP}
          value={lineHeight}
          onChange={(e) => {
            setEditorPreference(
              "lineHeight",
              clampLineHeight(Number(e.target.value)),
            );
            setSaveStatus("saved");
          }}
          className="w-full max-w-md cursor-pointer accent-accent-strong"
        />
        <span className="h-5">
          <SaveStatus state={saveStatus} />
        </span>
      </Row>
      <Row aria-hidden className="grid items-start gap-0">
        <p className="m-0 text-body" style={{ lineHeight }}>
          Line 1
        </p>
        <p className="m-0 text-body" style={{ lineHeight }}>
          Line 2
        </p>
      </Row>
    </Section>
  );
}
