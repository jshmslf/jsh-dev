"use client";

import { useState } from "react";
import { THEME_DEFAULTS, ACCENT_PRESETS } from "@/lib/config";

export { ACCENT_PRESETS };

export function useAccent() {
  const [accent, setAccent] = useState(() => {
    if (typeof window === "undefined") return THEME_DEFAULTS.accent;
    return localStorage.getItem("accent") || THEME_DEFAULTS.accent;
  });

  function applyAccent(color: string) {
    setAccent(color);
    document.documentElement.style.setProperty("--primary", color);
    localStorage.setItem("accent", color);
  }

  return { accent, applyAccent };
}
