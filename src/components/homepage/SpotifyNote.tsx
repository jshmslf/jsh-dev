"use client";

import { useEffect, useRef, useState } from "react";

interface Track {
  isPlaying: boolean;
  title: string;
  artist: string;
  url: string;
}

function MarqueeText({ text, className }: { text: string; className: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const span = spanRef.current;
    if (wrap && span) setActive(span.scrollWidth > wrap.clientWidth);
  }, [text]);

  return (
    <div ref={wrapRef} style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
      <span
        ref={spanRef}
        className={active ? `${className} marquee-running` : className}
      >
        {active ? <>{text}&nbsp;&nbsp;&nbsp;&nbsp;{text}</> : text}
      </span>
    </div>
  );
}

export function SpotifyNote() {
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/spotify");
        const data = await res.json();
        if (!cancelled && data.title) setTrack(data);
      } catch {}
    }
    load();
    const id = setInterval(load, 30_000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  if (!track) return null;

  return (
    <>
      <style>{`
        .spotify-note {
          position: absolute;
          bottom: calc(70%);
          left: 5px;
          right: 5px;
          display: flex;
          flex-direction: column;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--ui-radius);
          padding: 7px 11px;
          text-decoration: none;
          box-shadow: 0 2px 10px oklch(0 0 0 / 12%);
          cursor: pointer;
          transition: border-color 0.15s ease;
          z-index: 10;
        }
        .spotify-note:hover {
          border-color: var(--primary);
        }
        .spotify-note::after {
          content: "";
          position: absolute;
          bottom: -6px;
          left: 16px;
          width: 10px;
          height: 10px;
          background: var(--card);
          border-right: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          transform: rotate(45deg);
          transition: border-color 0.15s ease;
        }
        .spotify-note:hover::after {
          border-color: var(--primary);
        }
        .spotify-note-status {
          font-family: var(--font-geist-mono);
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          white-space: nowrap;
        }
        .spotify-note-title {
          font-family: var(--font-geist-sans);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--foreground);
          display: inline-block;
        }
        .spotify-note-artist {
          font-family: var(--font-geist-sans);
          font-size: 0.7rem;
          color: var(--muted-foreground);
          display: inline-block;
        }
        .marquee-running {
          animation: marquee-slide 4s linear infinite;
        }
        @keyframes marquee-slide {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <a
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        className="spotify-note"
      >
        <span className="spotify-note-status" style={{ color: track.isPlaying ? "var(--primary)" : "var(--muted-foreground)" }}>
          {track.isPlaying ? "now playing" : "last played"}
        </span>
        <MarqueeText text={track.title} className="spotify-note-title" />
        <MarqueeText text={track.artist} className="spotify-note-artist" />
      </a>
    </>
  );
}
