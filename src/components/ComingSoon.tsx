import Link from "next/link";

interface ComingSoonProps {
  title: string;
  description: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <main
      className="content-wrapper"
      style={{
        padding: "120px 24px 80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "20px",
        minHeight: "60vh",
      }}
    >
      <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.75rem", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>
        Coming Soon
      </p>
      <h1 style={{ fontFamily: "var(--font-geist-sans)", fontSize: "2rem", fontWeight: 700, color: "var(--foreground)", margin: 0 }}>
        {title}
      </h1>
      <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "1rem", color: "var(--muted-foreground)", margin: 0, maxWidth: "400px", lineHeight: 1.7 }}>
        {description}
      </p>
      <Link href="/" className="profile-btn" style={{ marginTop: "8px" }}>
        ← Back to Home
      </Link>
    </main>
  );
}
