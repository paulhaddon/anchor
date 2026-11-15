"use client";

import { useEffect } from "react";
import { usePreferencesStore } from "./store";

/** Passes the line height setting to the editor's CSS. */
export function LineHeightApplier() {
  const lineHeight = usePreferencesStore((state) => state.editor.lineHeight);
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--note-line-height",
      String(lineHeight),
    );
  }, [lineHeight]);
  return null;
}
