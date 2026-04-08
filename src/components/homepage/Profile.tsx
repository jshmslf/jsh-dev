"use client";
import { Mail, Palette, ChevronDown } from "lucide-react";
import { useContact } from "@/components/ContactModal";
import { BadgesSection } from "./BadgesSection";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

export function Profile() {
  const { open } = useContact();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const [dropPos, setDropPos] = useState({ top: 0, right: 0 });

  function updatePos() {
    if (!moreRef.current) return;
    const rect = moreRef.current.getBoundingClientRect();
    setDropPos({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
  }

  useEffect(() => {
    if (!moreOpen) return;
    updatePos();
    window.addEventListener("scroll", updatePos, true);
    window.addEventListener("resize", updatePos);
    const close = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("click", close);
    return () => {
      window.removeEventListener("scroll", updatePos, true);
      window.removeEventListener("resize", updatePos);
      document.removeEventListener("click", close);
    };
  }, [moreOpen]);

  return (
    <>
      <style>{`
        .profile-desktop-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 12px;
        }
        .profile-desktop-btns {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .profile-mobile-row {
          display: none;
        }
        .profile-more-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          left: auto;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--ui-radius);
          padding: 6px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 9999;
          min-width: 160px;
          box-shadow: 0 8px 24px oklch(0 0 0 / 30%);
          isolation: isolate;
        }
        .profile-more-dropdown a,
        .profile-more-dropdown button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: var(--ui-radius);
          font-family: var(--font-geist-sans);
          font-size: 0.875rem;
          color: var(--foreground);
          text-decoration: none;
          background: transparent;
          border: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
          transition: background 0.15s ease;
        }
        .profile-more-dropdown a:hover,
        .profile-more-dropdown button:hover {
          background: var(--muted);
        }
        @media (max-width: 640px) {
          .profile-desktop-row { display: none; }
          .profile-mobile-row { display: flex; flex-direction: column; gap: 12px; width: 100%; }
        }
      `}</style>

      <section className="profile-section" style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative", width: "100%" }}>

        <h1 style={{ fontFamily: "var(--font-geist-sans)", fontSize: "2.25rem", fontWeight: 700, color: "var(--foreground)", margin: 0, lineHeight: 1.15, display: "flex", alignItems: "center", gap: "12px" }}>
          <span className="name-wrapper">
            Joshua <span style={{ color: "var(--primary)" }}>Verceles</span>
            <span className="nickname">jshmslf</span>
          </span>
        </h1>

        <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "1rem", color: "var(--muted-foreground)", lineHeight: 1.75, maxWidth: "600px", margin: 0 }}>
          I&apos;m currently working as Software Engineer at{" "}
          <a href="https://mayoncapital.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--foreground)", textDecoration: "underline" }}>Mayon Capital</a>,
          where I build web solutions that help global teams establish their digital identity. And also a graphic artist. Currently focusing on ML for expanding my capabilities.
        </p>

        {/* Desktop layout */}
        <div className="profile-desktop-row">
          <div className="profile-desktop-btns">
            <a href="https://github.com/jshmslf" target="_blank" rel="noopener noreferrer" className="profile-btn" style={{ background: "var(--foreground)", color: "var(--background)", borderColor: "var(--foreground)" }}>
              <GithubIcon />
              GitHub
            </a>
            <button onClick={open} className="profile-btn">
              <Mail size={16} />
              Email
            </button>
            <a href="/art" className="profile-btn">
              <Palette size={16} />
              Art Portfolio
            </a>
            <a
              href="/about"
              style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.875rem", color: "var(--muted-foreground)", textDecoration: "none", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-foreground)")}
            >
              More about me →
            </a>
          </div>
          <BadgesSection />
        </div>

        {/* Mobile layout */}
        <div className="profile-mobile-row">
          <BadgesSection />
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <a href="https://github.com/jshmslf" target="_blank" rel="noopener noreferrer" className="profile-btn" style={{ background: "var(--foreground)", color: "var(--background)", borderColor: "var(--foreground)" }}>
              <GithubIcon />
              GitHub
            </a>
            <button onClick={open} className="profile-btn">
              <Mail size={16} />
              Send Email
            </button>
            <div ref={moreRef} style={{ position: "relative" }}>
              <button className="profile-btn" onClick={(e) => { e.stopPropagation(); setMoreOpen((v) => !v); }} style={{ gap: "6px" }}>
                More <ChevronDown size={14} style={{ transform: moreOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s ease" }} />
              </button>
              {moreOpen && typeof document !== "undefined" && createPortal(
                <div className="profile-more-dropdown" style={{ position: "fixed", top: dropPos.top, right: dropPos.right }}>
                  <a href="/art"><Palette size={14} />Art Portfolio</a>
                  <a href="/about">More about me →</a>
                </div>,
                document.body
              )}
            </div>
          </div>
        </div>

      </section>
    </>
  );
}
