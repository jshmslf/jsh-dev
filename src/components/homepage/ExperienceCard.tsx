import { EXPERIENCE } from "@/lib/config";
import { Card } from "./Card";

export function ExperienceCard() {
  return (
    <Card title="Experience">
      <div style={{ display: "flex", flexDirection: "column" }}>
        {EXPERIENCE.map((item, i) => {
          const isLast = i === EXPERIENCE.length - 1;
          return (
            <div
              key={i}
              style={{ display: "flex", gap: "14px", marginTop: i !== 0 ? "-2px" : 0 }}
            >
              {/* Timeline column */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                {/* Bullet */}
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "var(--ui-radius)",
                    border: "2px solid var(--primary)",
                    background: item.current ? "var(--primary)" : "transparent",
                    flexShrink: 0,
                    marginTop: "3px",
                  }}
                />
                {/* Connector line */}
                {!isLast && (
                  <div
                    style={{
                      width: "2px",
                      flex: 1,
                      background: "var(--border)",
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%", paddingBottom: isLast ? 0 : "20px" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.875rem", fontWeight: 600, color: "var(--foreground)", margin: 0 }}>
                    {item.title}
                  </p>
                  <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.75rem", color: "var(--muted-foreground)", margin: "2px 0 0" }}>
                    {item.company}
                  </p>
                </div>
                <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.75rem", color: "var(--muted-foreground)", flexShrink: 0, marginLeft: "12px" }}>
                  {item.year}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
