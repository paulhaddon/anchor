"use client";

import { useEffect } from "react";
import { usePreferencesStore } from "./store";

/** Passes the editor margin settings to the editor's CSS. */
export function MarginsApplier() {
  const marginLeft = usePreferencesStore((state) => state.editor.marginLeft);
  const marginRight = usePreferencesStore((state) => state.editor.marginRight);
  useEffect(() => {
    const root = document.documentElement;
    const apply = (name: string, value: number | null) => {
      if (value === null) root.style.removeProperty(name);
      else root.style.setProperty(name, `${value}px`);
    };
    apply("--note-margin-left", marginLeft);
    apply("--note-margin-right", marginRight);
    if (marginLeft === null && marginRight === null)
      root.removeAttribute("data-note-margins");
    else root.setAttribute("data-note-margins", "");
  }, [marginLeft, marginRight]);
  return null;
}
