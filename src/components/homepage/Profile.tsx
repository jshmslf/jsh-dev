"use client";
import { Mail } from "lucide-react";
import { useContact } from "@/components/ContactModal";

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

export function Profile() {
  const { open } = useContact();
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative" }}>

      <h1
        style={{
          fontFamily: "var(--font-geist-sans)",
          fontSize: "2.25rem",
          fontWeight: 700,
          color: "var(--foreground)",
          margin: 0,
          lineHeight: 1.15,
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span className="name-wrapper">
          Joshua <span style={{ color: "var(--primary)" }}>Verceles</span>
          <span className="nickname">jshmslf</span>
        </span>
      </h1>

      <p
        style={{
          fontFamily: "var(--font-geist-sans)",
          fontSize: "1rem",
          color: "var(--muted-foreground)",
          lineHeight: 1.75,
          maxWidth: "600px",
          margin: 0,
        }}
      >
        I&apos;m currently working as Software Engineer at{" "}
        <a href="https://mayoncapital.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--foreground)", textDecoration: "underline" }}>Mayon Capital</a>,
        where I build web solutions that help global teams establish their digital identity. And also a graphic artist. Currently focusing on ML for expanding my capabilities.
      </p>

      <div style={{ display: "flex", gap: "12px" }} className="profile-btn-group">
        <a
          href="https://github.com/joshuaverceles"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-btn"
        >
          <GithubIcon />
          GitHub
        </a>

        <button onClick={open} className="profile-btn">
          <Mail size={16} />
          Send Email
        </button>

        <a href="/about" className="profile-btn">
          More about me →
        </a>
      </div>
    </section>
  );
}
