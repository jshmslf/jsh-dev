import { CERTIFICATES } from "@/lib/config";
import { Card } from "./Card";

export function CertificatesCard() {
  return (
    <Card title="Certificates">
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {CERTIFICATES.map((cert, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 12px",
              borderRadius: "var(--ui-radius)",
              border: "1px solid var(--border)",
              transition: "border-color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)" }}>
              {cert.title}
            </span>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.7rem", color: "var(--primary)", flexShrink: 0, marginLeft: "12px" }}>
              {cert.issuer}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
