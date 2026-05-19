"use client";

import { useState } from "react";
import { THEME_DEFAULTS } from "@/lib/config";
import { getExpiring, setExpiring } from "@/lib/storage";

function getInitialTheme(): boolean {
  if (typeof window === "undefined") return THEME_DEFAULTS.mode === "dark";
  const stored = getExpiring("theme");
  return stored ? stored === "dark" : THEME_DEFAULTS.mode === "dark";
}

export function useTheme() {
  const [isDark, setIsDark] = useState(getInitialTheme);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    setExpiring("theme", next ? "dark" : "light");
  }

  return { isDark, toggle };
}
