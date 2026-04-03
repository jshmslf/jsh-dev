"use client";

import { useState } from "react";
import { THEME_DEFAULTS } from "@/lib/config";

function getInitialTheme(): boolean {
  if (typeof window === "undefined") return THEME_DEFAULTS.mode === "dark";
  const stored = localStorage.getItem("theme");
  return stored ? stored === "dark" : THEME_DEFAULTS.mode === "dark";
}

export function useTheme() {
  const [isDark, setIsDark] = useState(getInitialTheme);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return { isDark, toggle };
}
