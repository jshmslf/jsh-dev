"use client";

import { useState, useEffect } from "react";
import { useAccent, ACCENT_PRESETS } from "@/hooks/useAccent";
import { useTheme } from "@/hooks/useTheme";
import { Card } from "./Card";
import { THEME_DEFAULTS, RADIUS_PRESETS } from "@/lib/config";
import { getExpiring, setExpiring } from "@/lib/storage";

export function ThemeCard() {
  const { accent, applyAccent } = useAccent();
  const { isDark, toggle } = useTheme();
  const [radius, setRadius] = useState(() => {
    if (typeof window === "undefined") return THEME_DEFAULTS.radius;
    return getExpiring("radius") || THEME_DEFAULTS.radius;
  });

  useEffect(() => {
    const savedAccent = getExpiring("accent") || THEME_DEFAULTS.accent;
    const savedRadius = getExpiring("radius") || THEME_DEFAULTS.radius;
    const cardRadius = savedRadius === "999px" ? "24px" : savedRadius;
    document.documentElement.style.setProperty("--primary", savedAccent);
    document.documentElement.style.setProperty("--card-radius", cardRadius);
    document.documentElement.style.setProperty("--ui-radius", savedRadius);
  }, []);

  function applyRadius(value: string) {
    setRadius(value);
    const cardRadius = value === "999px" ? "24px" : value;
    document.documentElement.style.setProperty("--card-radius", cardRadius);
    document.documentElement.style.setProperty("--ui-radius", value);
    setExpiring("radius", value);
  }

  return (
    <Card title="Theme">
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

        {/* Mode */}
        <div>
          <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.7rem", color: "var(--muted-foreground)", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Mode
          </p>
          <div
            suppressHydrationWarning
            style={{ display: "flex", border: "1px solid var(--border)", borderRadius: "var(--ui-radius)", overflow: "hidden", width: "100%" }}
          >
            {(["light", "dark"] as const).map((mode) => {
              const isActive = isDark ? mode === "dark" : mode === "light";
              return (
                <button
                  suppressHydrationWarning
                  key={mode}
                  onClick={toggle}
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.75rem",
                    padding: "8px 0",
                    flex: 1,
                    border: "none",
                    cursor: isActive ? "default" : "pointer",
                    background: isActive ? "var(--primary)" : "transparent",
                    color: isActive ? "var(--background)" : "var(--muted-foreground)",
                    transition: "background 0.2s ease, color 0.2s ease",
                  }}
                >
                  {mode}
                </button>
              );
            })}
          </div>
        </div>

        {/* Accent */}
        <div>
          <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.7rem", color: "var(--muted-foreground)", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Accent
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
            {ACCENT_PRESETS.map((preset) => {
              const isActive = accent === preset.value;
              return (
                <button
                  key={preset.value}
                  onClick={() => applyAccent(preset.value)}
                  title={preset.name}
                  style={{
                    width: "23px",
                    height: "23px",
                    borderRadius: "var(--ui-radius)",
                    background: preset.value,
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    outline: isActive ? `2px solid ${preset.value}` : "3px solid transparent",
                    outlineOffset: "3px",
                    transition: "outline-color 0.2s ease, transform 0.15s ease",
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Border Radius */}
        <div>
          <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.7rem", color: "var(--muted-foreground)", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Radius
          </p>
          <div style={{ display: "flex", gap: "6px", justifyContent: "space-between" }}>
            {RADIUS_PRESETS.map((r) => {
              const isActive = radius === r.value;
              return (
                <button
                  key={r.value}
                  onClick={() => applyRadius(r.value)}
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.7rem",
                    padding: "4px 10px",
                    borderRadius: "var(--ui-radius)",
                    background: isActive ? "var(--primary)" : "transparent",
                    color: isActive ? "var(--background)" : "var(--muted-foreground)",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </Card>
  );
}
