"use client";

import Link from "next/link";
import { useState } from "react";
import { PenTool, Layers, Share2, Fingerprint, Type, ImageOff, Star } from "lucide-react";

const HIGHLIGHTS = [
  { label: "Highlight 01", size: "large" },
  { label: "Highlight 02", size: "small" },
  { label: "Highlight 03", size: "small" },
  { label: "Highlight 04", size: "small" },
  { label: "Highlight 05", size: "small" },
] as const;

const CATEGORIES = [
  {
    id: "social-media",
    label: "Social Media Art",
    description: "Posts, stories, banners & thumbnails crafted for various platforms.",
    icon: <Share2 size={22} />,
    slots: 6,
  },
  {
    id: "vector",
    label: "Vector Art",
    description: "Clean vector illustrations, icons, and digital drawings.",
    icon: <PenTool size={22} />,
    slots: 5,
  },
  {
    id: "photo-manipulation",
    label: "Photo Manipulation",
    description: "Composites, retouching, and digital painting.",
    icon: <Layers size={22} />,
    slots: 5,
  },
  {
    id: "brand-identity",
    label: "Brand Identity",
    description: "Logos, brand guidelines & visual identity systems.",
    icon: <Fingerprint size={22} />,
    slots: 4,
  },
  {
    id: "typography",
    label: "Typography",
    description: "Lettering, type treatments & editorial layouts.",
    icon: <Type size={22} />,
    slots: 4,
  },
] as const;

type CategoryId = typeof CATEGORIES[number]["id"] | "all";

function PlaceholderCard({ label }: { label?: string }) {
  return (
    <div className="art-placeholder-card">
      <ImageOff size={20} strokeWidth={1.5} />
      <span>{label ?? "Coming soon"}</span>
    </div>
  );
}

function HighlightSection() {
  return (
    <div className="art-section">
      <div className="art-section-label">
        <Star size={13} />
        Selected works
      </div>
      <div className="art-highlight-grid">
        <div className="art-highlight-featured">
          <PlaceholderCard label="Featured" />
        </div>
        <div className="art-highlight-rest">
          {HIGHLIGHTS.slice(1).map((h) => (
            <PlaceholderCard key={h.label} label={h.label} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CategorySection({ cat }: { cat: typeof CATEGORIES[number] }) {
  return (
    <div className="art-category-section">
      <div className="art-category-header">
        <span className="art-category-icon">{cat.icon}</span>
        <div>
          <h2 className="art-category-title">{cat.label}</h2>
          <p className="art-category-desc">{cat.description}</p>
        </div>
      </div>
      <div className="art-grid">
        {Array.from({ length: cat.slots }).map((_, i) => (
          <PlaceholderCard key={i} />
        ))}
      </div>
    </div>
  );
}

export default function ArtPage() {
  const [active, setActive] = useState<CategoryId>("all");

  const tabs: { id: CategoryId; label: string }[] = [
    { id: "all", label: "All" },
    ...CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
  ];

  const shown = active === "all"
    ? CATEGORIES
    : CATEGORIES.filter((c) => c.id === active);

  return (
    <>
      <style>{`
        .art-page {
          padding-top: 48px;
          padding-bottom: 80px;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .art-back {
          font-family: var(--font-geist-mono);
          font-size: 0.75rem;
          color: var(--muted-foreground);
          text-decoration: none;
          transition: color 0.15s ease;
          width: fit-content;
        }
        .art-back:hover { color: var(--foreground); }
        .art-hero {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .art-hero-username {
          font-family: var(--font-geist-mono);
          font-size: 0.8rem;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .art-hero-title {
          font-family: var(--font-geist-sans);
          font-size: 2.25rem;
          font-weight: 700;
          color: var(--foreground);
          margin: 0;
          line-height: 1.15;
        }
        .art-hero-sub {
          font-family: var(--font-geist-sans);
          font-size: 1rem;
          color: var(--muted-foreground);
          margin: 6px 0 0;
          line-height: 1.7;
          max-width: 520px;
        }
        .art-tabs {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .art-tab {
          font-family: var(--font-geist-mono);
          font-size: 0.75rem;
          padding: 6px 14px;
          border-radius: var(--ui-radius);
          border: 1px solid var(--border);
          background: transparent;
          color: var(--muted-foreground);
          cursor: pointer;
          transition: all 0.15s ease;
          white-space: nowrap;
        }
        .art-tab:hover {
          color: var(--foreground);
          border-color: var(--foreground);
        }
        .art-tab.active {
          background: var(--primary);
          color: var(--background);
          border-color: var(--primary);
        }

        /* Highlight section */
        .art-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .art-section-label {
          font-family: var(--font-geist-mono);
          font-size: 0.7rem;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .art-highlight-grid {
          display: grid;
          grid-template-columns: 5fr 4fr;
          gap: 12px;
          align-items: stretch;
        }
        .art-highlight-featured {
          min-height: 0;
        }
        .art-highlight-featured .art-placeholder-card {
          aspect-ratio: unset;
          height: 100%;
          min-height: 280px;
        }
        .art-highlight-rest {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .art-highlight-rest .art-placeholder-card {
          aspect-ratio: 1 / 1;
        }

        /* Divider */
        .art-divider {
          height: 1px;
          background: var(--border);
        }

        /* Categories */
        .art-categories {
          display: flex;
          flex-direction: column;
          gap: 48px;
        }
        .art-category-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .art-category-header {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .art-category-icon {
          color: var(--primary);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .art-category-title {
          font-family: var(--font-geist-sans);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--foreground);
          margin: 0 0 4px;
        }
        .art-category-desc {
          font-family: var(--font-geist-sans);
          font-size: 0.875rem;
          color: var(--muted-foreground);
          margin: 0;
          line-height: 1.6;
        }
        .art-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .art-placeholder-card {
          aspect-ratio: 4 / 3;
          border: 1.5px dashed var(--border);
          border-radius: var(--card-radius);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: var(--muted-foreground);
          transition: border-color 0.2s ease, color 0.2s ease;
        }
        .art-placeholder-card:hover {
          border-color: var(--primary);
          color: var(--primary);
        }
        .art-placeholder-card span {
          font-family: var(--font-geist-mono);
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        @media (max-width: 768px) {
          .art-highlight-grid { grid-template-columns: 1fr; }
          .art-highlight-featured .art-placeholder-card { aspect-ratio: 16 / 9; height: auto; min-height: unset; }
          .art-highlight-rest { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .art-page { padding-top: 32px; padding-bottom: 60px; gap: 28px; }
          .art-hero-title { font-size: 1.75rem; }
          .art-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .art-tabs { gap: 4px; overflow-x: auto; flex-wrap: nowrap; padding-bottom: 4px; }
          .art-tab { font-size: 0.7rem; padding: 5px 10px; }
          .art-categories { gap: 36px; }
        }
      `}</style>

      <main className="content-wrapper art-page">

        <Link href="/" className="art-back">back to home</Link>

        <div className="art-hero">
          <span className="art-hero-username">jshmslf</span>
          <h1 className="art-hero-title">Art Portfolio</h1>
          <p className="art-hero-sub">
            A collection of graphic art and design work — spanning social media content, vector illustrations, photo composites, and more.
          </p>
        </div>

        <HighlightSection />
        <div className="art-divider" />

        <div className="art-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`art-tab${active === tab.id ? " active" : ""}`}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="art-categories">
          {shown.map((cat) => (
            <CategorySection key={cat.id} cat={cat} />
          ))}
        </div>

      </main>
    </>
  );
}
