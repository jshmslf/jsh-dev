"use client";

import { useEffect } from "react";
import { THEME_DEFAULTS } from "@/lib/config";
import { getExpiring } from "@/lib/storage";

export function ThemeInitializer() {
  useEffect(() => {
    const accent = getExpiring("accent") || THEME_DEFAULTS.accent;
    const radius = getExpiring("radius") || THEME_DEFAULTS.radius;
    const cardRadius = radius === "999px" ? "24px" : radius;
    document.documentElement.style.setProperty("--primary", accent);
    document.documentElement.style.setProperty("--ui-radius", radius);
    document.documentElement.style.setProperty("--card-radius", cardRadius);
  }, []);

  return null;
}
