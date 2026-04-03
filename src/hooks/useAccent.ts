"use client";

import { useState } from "react";
import { THEME_DEFAULTS, ACCENT_PRESETS } from "@/lib/config";

export { ACCENT_PRESETS };

export function useAccent() {
  const [accent, setAccent] = useState(THEME_DEFAULTS.accent);

  function applyAccent(color: string) {
    setAccent(color);
    document.documentElement.style.setProperty("--primary", color);
  }

  return { accent, applyAccent };
}
