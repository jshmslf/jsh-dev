"use client";

import { useState } from "react";
import { THEME_DEFAULTS, ACCENT_PRESETS } from "@/lib/config";
import { getExpiring, setExpiring } from "@/lib/storage";

export { ACCENT_PRESETS };

export function useAccent() {
  const [accent, setAccent] = useState(() => {
    if (typeof window === "undefined") return THEME_DEFAULTS.accent;
    return getExpiring("accent") || THEME_DEFAULTS.accent;
  });

  function applyAccent(color: string) {
    setAccent(color);
    document.documentElement.style.setProperty("--primary", color);
    setExpiring("accent", color);
  }

  return { accent, applyAccent };
}
