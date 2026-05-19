import { TECH_ICONS, TECH_STACK } from "@/lib/config";

const groups = [
  { label: "Front End", items: TECH_STACK.frontend },
  { label: "Backend", items: TECH_STACK.backend },
  { label: "Dev Tools", items: TECH_STACK.devTools },
];

function TechChip({ name }: { name: string }) {
  const icon = TECH_ICONS[name];
  return (
    <span
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
      {icon && <img src={icon} alt="" width={14} height={14} style={{ display: "block" }} />}
      {name}
    </span>
  );
}

export default function StackPage() {
  return (
    <main
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "40px 20px 80px",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
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
          Tech Stack
        </span>
        <a
          href="/"
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.75rem",
            color: "var(--primary)",
            textDecoration: "none",
          }}
        >
          back
        </a>
      </div>

      <div className="card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
        {groups.map(({ label, items }) => (
          <div key={label}>
            <p
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.7rem",
                color: "var(--muted-foreground)",
                margin: "0 0 8px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {label}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {items.map((item) => (
                <TechChip key={item} name={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
