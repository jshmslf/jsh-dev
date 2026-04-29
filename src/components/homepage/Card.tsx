"use client";

import { ReactNode, useEffect, useState } from "react";

interface CardProps {
  title: string;
  children: ReactNode;
  viewAll?: { label?: string; href: string };
  style?: React.CSSProperties;
}

export function Card({ title, children, viewAll, style }: CardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="card"
      style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px", background: "var(--card)", ...style }}
    >
      {!mounted ? (
        <>
          <div className="skeleton" style={{ height: "14px", width: "40%", borderRadius: "var(--ui-radius)" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div className="skeleton" style={{ height: "12px", width: "90%", borderRadius: "var(--ui-radius)" }} />
            <div className="skeleton" style={{ height: "12px", width: "65%", borderRadius: "var(--ui-radius)" }} />
          </div>
        </>
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--foreground)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {title}
            </span>
            {viewAll && (
              <a
                href={viewAll.href}
                style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.75rem", color: "var(--primary)", textDecoration: "none" }}
              >
                {viewAll.label ?? "view all →"}
              </a>
            )}
          </div>
          <div>{children}</div>
        </>
      )}
    </div>
  );
}
