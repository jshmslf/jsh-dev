"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import {
  PenTool, Layers, Fingerprint, Shirt,
  Star, X, ChevronLeft, ChevronRight, ZoomIn,
} from "lucide-react";
import { HIGHLIGHT_PUBLIC_IDS } from "@/lib/art-highlights";

type CloudinaryImage = {
  publicId: string;
  url: string;
  thumb: string;
  width: number;
  height: number;
};

const CATEGORIES = [
  {
    id: "Art",
    label: "Illustrations & Art",
    description: "Clean vector illustrations, icons, and digital drawings.",
    icon: <PenTool size={22} />,
  },
  {
    id: "Poster",
    label: "Posters",
    description: "Composites, retouching, and digital painting.",
    icon: <Layers size={22} />,
  },
  {
    id: "Logo",
    label: "Brand Identity",
    description: "Logos, brand guidelines & visual identity systems.",
    icon: <Fingerprint size={22} />,
  },
  {
    id: "Shirt Design",
    label: "Shirt Designs",
    description: "Apparel graphics and print-ready shirt art.",
    icon: <Shirt size={22} />,
  },
] as const;

type FolderId = typeof CATEGORIES[number]["id"] | "all";

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

// ── Lightbox ──────────────────────────────────────────────────────────────────

function Lightbox({
  images, index, onClose, onPrev, onNext,
}: {
  images: CloudinaryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  const img = images[index];
  return (
    <div className="lb-backdrop" onClick={onClose}>
      <div className="lb-box" onClick={(e) => e.stopPropagation()}>
        <button className="lb-close" onClick={onClose} aria-label="Close"><X size={20} /></button>
        {images.length > 1 && (
          <>
            <button className="lb-prev" onClick={onPrev} aria-label="Previous"><ChevronLeft size={24} /></button>
            <button className="lb-next" onClick={onNext} aria-label="Next"><ChevronRight size={24} /></button>
          </>
        )}
        <div className="lb-img-wrap">
          <Image src={img.url} alt="" fill sizes="100vw" className="lb-img" priority />
        </div>
        {images.length > 1 && (
          <span className="lb-counter">{index + 1} / {images.length}</span>
        )}
      </div>
    </div>
  );
}

function useLightbox(images: CloudinaryImage[]) {
  const [idx, setIdx] = useState<number | null>(null);
  const open = useCallback((i: number) => setIdx(i), []);
  const close = useCallback(() => setIdx(null), []);
  const prev = useCallback(
    () => setIdx((i) => i === null ? null : (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setIdx((i) => i === null ? null : (i + 1) % images.length),
    [images.length],
  );
  return { idx, open, close, prev, next };
}

// ── Tiles ─────────────────────────────────────────────────────────────────────

function Tile({ img, onClick }: { img: CloudinaryImage; onClick: () => void }) {
  return (
    <button className="bento-tile" onClick={onClick} aria-label="View full image">
      <Image src={img.thumb} alt="" fill sizes="(max-width:640px) 50vw, 33vw" className="bento-tile-img" />
      <div className="bento-tile-overlay"><ZoomIn size={18} /></div>
    </button>
  );
}

function SkeletonTile() {
  return <div className="bento-skeleton" />;
}

// ── Bento group ───────────────────────────────────────────────────────────────
//
//  Normal (flip=false):           Flipped (flip=true):
//  ┌──────────┬─────┬─────┐       ┌─────┬─────┬──────────┐
//  │          │  1  │  2  │       │  0  │  1  │          │
//  │    0     ├─────┼─────┤       ├─────┼─────┤    4     │
//  │  (large) │  3  │  4  │       │  2  │  3  │  (large) │
//  └──────────┴─────┴─────┘       └─────┴─────┴──────────┘

function BentoGroup({
  group,
  flip,
  offset,
  onOpen,
  skeleton = false,
}: {
  group: (CloudinaryImage | null)[];
  flip: boolean;
  offset: number;
  onOpen: (i: number) => void;
  skeleton?: boolean;
}) {
  const slots = Array.from({ length: 5 }, (_, i) => group[i] ?? null);

  function cell(localIdx: number) {
    if (skeleton) return <SkeletonTile />;
    const img = slots[localIdx];
    if (!img) return null;
    return <Tile img={img} onClick={() => onOpen(offset + localIdx)} />;
  }

  return (
    <div className={`bento-group${flip ? " bento-flip" : ""}`}>
      <div className="bg-0">{cell(0)}</div>
      <div className="bg-1">{cell(1)}</div>
      <div className="bg-2">{cell(2)}</div>
      <div className="bg-3">{cell(3)}</div>
      <div className="bg-4">{cell(4)}</div>
    </div>
  );
}

// ── Category section ──────────────────────────────────────────────────────────

function CategorySection({ cat }: { cat: typeof CATEGORIES[number] }) {
  const [images, setImages] = useState<CloudinaryImage[] | null>(null);
  const lb = useLightbox(images ?? []);

  useEffect(() => {
    fetch(`/api/cloudinary?folder=${encodeURIComponent(cat.id)}`)
      .then((r) => r.json())
      .then((d) => setImages(d.images ?? []))
      .catch(() => setImages([]));
  }, [cat.id]);

  const loading = images === null;
  const groups = chunk(images ?? [], 5);

  return (
    <>
      <div className="art-category-section">
        <div className="art-category-header">
          <span className="art-category-icon">{cat.icon}</span>
          <div>
            <h2 className="art-category-title">{cat.label}</h2>
            <p className="art-category-desc">{cat.description}</p>
          </div>
        </div>
        <div className="bento-stack">
          {loading && (
            <BentoGroup group={[]} flip={false} offset={0} onOpen={() => {}} skeleton />
          )}
          {!loading && groups.map((g, gi) => (
            <BentoGroup key={gi} group={g} flip={gi % 2 !== 0} offset={gi * 5} onOpen={(i) => lb.open(i)} />
          ))}
        </div>
      </div>
      {lb.idx !== null && images && (
        <Lightbox images={images} index={lb.idx} onClose={lb.close} onPrev={lb.prev} onNext={lb.next} />
      )}
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ArtPage() {
  const [active, setActive] = useState<FolderId>("all");
  const [highlights, setHighlights] = useState<CloudinaryImage[] | null>(null);
  const lb = useLightbox(highlights ?? []);

  useEffect(() => {
    if (!HIGHLIGHT_PUBLIC_IDS.length) { setHighlights([]); return; }
    fetch(`/api/cloudinary?ids=${HIGHLIGHT_PUBLIC_IDS.join(",")}`)
      .then((r) => r.json())
      .then((d) => setHighlights(d.images ?? []))
      .catch(() => setHighlights([]));
  }, []);

  const tabs: { id: FolderId; label: string }[] = [
    { id: "all", label: "All" },
    ...CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
  ];

  const shown = active === "all" ? CATEGORIES : CATEGORIES.filter((c) => c.id === active);

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
        .art-hero { display: flex; flex-direction: column; gap: 6px; }
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
        .art-section { display: flex; flex-direction: column; gap: 16px; }
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

        /* ── Bento group ── */
        .bento-group {
          display: grid;
          grid-template-columns: 5fr 3fr 3fr;
          grid-template-rows: 1fr 1fr;
          gap: 10px;
          height: 460px;
        }
        /* Normal: slot 0 is large on the left */
        .bento-group .bg-0 { grid-column: 1; grid-row: 1 / 3; }
        .bento-group .bg-1 { grid-column: 2; grid-row: 1; }
        .bento-group .bg-2 { grid-column: 3; grid-row: 1; }
        .bento-group .bg-3 { grid-column: 2; grid-row: 2; }
        .bento-group .bg-4 { grid-column: 3; grid-row: 2; }
        /* Flipped: slot 4 is large on the right */
        .bento-group.bento-flip { grid-template-columns: 3fr 3fr 5fr; }
        .bento-group.bento-flip .bg-0 { grid-column: 1; grid-row: 1; }
        .bento-group.bento-flip .bg-1 { grid-column: 2; grid-row: 1; }
        .bento-group.bento-flip .bg-2 { grid-column: 1; grid-row: 2; }
        .bento-group.bento-flip .bg-3 { grid-column: 2; grid-row: 2; }
        .bento-group.bento-flip .bg-4 { grid-column: 3; grid-row: 1 / 3; }

        .bento-group > div {
          position: relative;
          overflow: hidden;
          border-radius: var(--card-radius);
          min-height: 0;
        }
        .bento-stack { display: flex; flex-direction: column; gap: 10px; }

        /* ── Tile ── */
        .bento-tile {
          position: relative;
          width: 100%; height: 100%;
          border: none; padding: 0;
          cursor: pointer;
          background: var(--muted);
          display: block;
          overflow: hidden;
          border-radius: var(--card-radius);
        }
        .bento-tile-img { object-fit: cover; transition: transform 0.35s ease; }
        .bento-tile:hover .bento-tile-img { transform: scale(1.06); }
        .bento-tile-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.38);
          display: flex; align-items: center; justify-content: center;
          color: #fff; opacity: 0; transition: opacity 0.2s ease;
        }
        .bento-tile:hover .bento-tile-overlay { opacity: 1; }

        /* ── Skeleton ── */
        .bento-skeleton {
          width: 100%; height: 100%;
          border-radius: var(--card-radius);
          background: var(--muted);
          animation: b-pulse 1.5s ease-in-out infinite;
        }
        @keyframes b-pulse { 0%,100%{opacity:1} 50%{opacity:.35} }

        /* ── Tabs ── */
        .art-divider { height: 1px; background: var(--border); }
        .art-tabs { display: flex; gap: 6px; flex-wrap: wrap; }
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
        .art-tab:hover { color: var(--foreground); border-color: var(--foreground); }
        .art-tab.active { background: var(--primary); color: var(--background); border-color: var(--primary); }

        /* ── Category ── */
        .art-categories { display: flex; flex-direction: column; gap: 56px; }
        .art-category-section { display: flex; flex-direction: column; gap: 20px; }
        .art-category-header { display: flex; align-items: flex-start; gap: 14px; }
        .art-category-icon { color: var(--primary); flex-shrink: 0; margin-top: 2px; }
        .art-category-title {
          font-family: var(--font-geist-sans);
          font-size: 1.1rem; font-weight: 700;
          color: var(--foreground); margin: 0 0 4px;
        }
        .art-category-desc {
          font-family: var(--font-geist-sans);
          font-size: 0.875rem;
          color: var(--muted-foreground);
          margin: 0; line-height: 1.6;
        }

        /* ── Lightbox ── */
        .lb-backdrop {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.92);
          z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
        }
        .lb-box {
          position: relative; width: 100%; max-width: 1100px;
          display: flex; align-items: center; justify-content: center;
        }
        .lb-img-wrap { position: relative; width: 100%; height: 85vh; }
        .lb-img { object-fit: contain; }
        .lb-close {
          position: absolute; top: -44px; right: 0;
          background: rgba(255,255,255,0.1); border: none; color: #fff;
          width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.15s; z-index: 2;
        }
        .lb-close:hover { background: rgba(255,255,255,0.25); }
        .lb-prev, .lb-next {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(255,255,255,0.1); border: none; color: #fff;
          width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.15s; z-index: 2;
        }
        .lb-prev:hover, .lb-next:hover { background: rgba(255,255,255,0.25); }
        .lb-prev { left: -56px; }
        .lb-next { right: -56px; }
        .lb-counter {
          position: absolute; bottom: -32px; left: 50%; transform: translateX(-50%);
          font-family: var(--font-geist-mono); font-size: 0.75rem;
          color: rgba(255,255,255,0.6);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .bento-group,
          .bento-group.bento-flip {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 220px 150px 150px;
            height: auto;
          }
          .bento-group .bg-0 { grid-column: 1 / 3; grid-row: 1; }
          .bento-group .bg-1 { grid-column: 1; grid-row: 2; }
          .bento-group .bg-2 { grid-column: 2; grid-row: 2; }
          .bento-group .bg-3 { grid-column: 1; grid-row: 3; }
          .bento-group .bg-4 { grid-column: 2; grid-row: 3; }
          .bento-group.bento-flip .bg-0 { grid-column: 1; grid-row: 2; }
          .bento-group.bento-flip .bg-1 { grid-column: 2; grid-row: 2; }
          .bento-group.bento-flip .bg-2 { grid-column: 1; grid-row: 3; }
          .bento-group.bento-flip .bg-3 { grid-column: 2; grid-row: 3; }
          .bento-group.bento-flip .bg-4 { grid-column: 1 / 3; grid-row: 1; }
        }
        @media (max-width: 640px) {
          .art-page { padding-top: 32px; padding-bottom: 60px; gap: 28px; }
          .art-hero-title { font-size: 1.75rem; }
          .bento-group,
          .bento-group.bento-flip { grid-template-rows: 180px 120px 120px; }
          .art-tabs { gap: 4px; overflow-x: auto; flex-wrap: nowrap; padding-bottom: 4px; }
          .art-tab { font-size: 0.7rem; padding: 5px 10px; }
          .art-categories { gap: 40px; }
          .lb-prev { left: 8px; }
          .lb-next { right: 8px; }
          .lb-img-wrap { height: 70vh; }
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

        {HIGHLIGHT_PUBLIC_IDS.length > 0 && (
          <div className="art-section">
            <div className="art-section-label"><Star size={13} />Selected works</div>
            <BentoGroup
              group={highlights ?? []}
              flip={false}
              offset={0}
              onOpen={(i) => lb.open(i)}
              skeleton={highlights === null}
            />
            {lb.idx !== null && highlights && (
              <Lightbox images={highlights} index={lb.idx} onClose={lb.close} onPrev={lb.prev} onNext={lb.next} />
            )}
          </div>
        )}

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
