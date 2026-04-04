import Link from "next/link";

export default function NotFound() {
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
        gap: "16px",
        minHeight: "80vh",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: "6rem",
          fontWeight: 700,
          color: "var(--primary)",
          margin: 0,
          lineHeight: 1,
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "var(--font-geist-sans)",
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "var(--foreground)",
          margin: 0,
        }}
      >
        Page not found
      </h1>
      <p
        style={{
          fontFamily: "var(--font-geist-sans)",
          fontSize: "0.95rem",
          color: "var(--muted-foreground)",
          margin: 0,
          maxWidth: "360px",
          lineHeight: 1.7,
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="profile-btn" style={{ marginTop: "12px" }}>
        ← Back to Home
      </Link>
    </main>
  );
}
