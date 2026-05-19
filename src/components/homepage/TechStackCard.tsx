import { TECH_ICONS, TECH_STACK } from "@/lib/config";
import { Card } from "./Card";

const groups = [
  { label: "Front End", items: TECH_STACK.frontend },
  { label: "Backend", items: TECH_STACK.backend },
  { label: "Dev Tools", items: TECH_STACK.devTools },
];

export function TechStackCard() {
  return (
    <Card title="Tech Stack" viewAll={{ href: "/stack", label: "view all" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {groups.map(({ label, items }) => (
          <div key={label}>
            <p
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.7rem",
                color: "var(--muted-foreground)",
                margin: "0 0 6px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {label}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {items.slice(0, 3).map((item) => (
                <span
                  key={item}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.75rem",
                    color: "var(--foreground)",
                    background: "var(--muted)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--ui-radius)",
                    padding: "3px 10px",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {TECH_ICONS[item] && <img src={TECH_ICONS[item]} alt="" width={14} height={14} style={{ display: "block" }} />}
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
