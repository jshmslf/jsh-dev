"use client";

import { ReactNode, useRef, useState } from "react";

interface TooltipProps {
  text: string;
  children: ReactNode;
}

export function Tooltip({ text, children }: TooltipProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <span
      ref={ref}
      style={{ position: "relative", display: "inline-flex", width: "100%" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      <span
        style={{
          position: "absolute",
          left: pos.x,
          top: pos.y - 36,
          transform: "translateX(-50%)",
          background: "var(--foreground)",
          color: "var(--background)",
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.7rem",
          padding: "4px 10px",
          borderRadius: "var(--ui-radius)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          zIndex: 50,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
      >
        {text}
      </span>
    </span>
  );
}
