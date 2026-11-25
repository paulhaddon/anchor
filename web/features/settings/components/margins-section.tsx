"use client";

import { Minus, Plus } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  clampMargin,
  MARGIN_MAX,
  MARGIN_MIN,
  MARGIN_STEP,
  type NoteMargin,
  usePreferencesStore,
} from "@/features/preferences";
import {
  Row,
  RowText,
  SaveStatus,
  Section,
  useSaveStatus,
} from "./settings-blocks";

/** The note's width when its margins are automatic. */
const AUTO_COLUMN = 780;

function MarginRoller({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: NoteMargin;
  onChange: (value: NoteMargin) => void;
}) {
  // What is being typed, until the field is left or Enter is pressed.
  const [draft, setDraft] = React.useState<string | null>(null);
  const commit = () => {
    if (draft === null) return;
    onChange(draft.trim() === "" ? null : clampMargin(Number(draft)));
    setDraft(null);
  };
  const step = (direction: 1 | -1) => {
    // From automatic, the first step starts from today's gutter.
    const gutter = Math.max(0, (window.innerWidth - AUTO_COLUMN) / 2);
    const from = value ?? gutter;
    setDraft(null);
    onChange(clampMargin(from + direction * MARGIN_STEP));
  };
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="w-12 font-semibold text-ui">
        {label}
      </label>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        aria-label={`Decrease ${label.toLowerCase()} margin`}
        disabled={value !== null && value <= MARGIN_MIN}
        onClick={() => step(-1)}
      >
        <Minus aria-hidden />
      </Button>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={MARGIN_MIN}
        max={MARGIN_MAX}
        step={MARGIN_STEP}
        placeholder="Auto"
        value={draft ?? value ?? ""}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
        }}
        className="h-9 w-24 rounded-field bg-card px-3 text-center text-ui tabular-nums shadow-[inset_0_0_0_1px_var(--input)] outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--ring)]"
      />
      <Button
        type="button"
        variant="secondary"
        size="sm"
        aria-label={`Increase ${label.toLowerCase()} margin`}
        disabled={value !== null && value >= MARGIN_MAX}
        onClick={() => step(1)}
      >
        <Plus aria-hidden />
      </Button>
      <span className="text-meta text-muted-foreground">px</span>
      <Button
        type="button"
        variant="quiet"
        size="sm"
        disabled={value === null}
        onClick={() => onChange(null)}
      >
        Auto
      </Button>
    </div>
  );
}

export function MarginsSection() {
  const { marginLeft, marginRight } = usePreferencesStore(
    (state) => state.editor,
  );
  const setEditorPreference = usePreferencesStore(
    (state) => state.setEditorPreference,
  );
  const [saveStatus, setSaveStatus] = useSaveStatus();
  return (
    <Section id="margins" title="Margins">
      <Row>
        <RowText
          title="Note margins"
          text="The space between the edge of the window and the note, on wide screens. Auto keeps the note centred."
          saved={<SaveStatus state={saveStatus} />}
        />
      </Row>
      <Row className="grid justify-items-start gap-3">
        <MarginRoller
          id="margin-left"
          label="Left"
          value={marginLeft}
          onChange={(value) => {
            setEditorPreference("marginLeft", value);
            setSaveStatus("saved");
          }}
        />
        <MarginRoller
          id="margin-right"
          label="Right"
          value={marginRight}
          onChange={(value) => {
            setEditorPreference("marginRight", value);
            setSaveStatus("saved");
          }}
        />
      </Row>
    </Section>
  );
}
