"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Tooltip } from "@/components/Tooltip";

interface Track {
  isPlaying: boolean;
  title: string | null;
  artist: string;
  album: string;
  albumArt: string;
  url: string;
  playedAt: string | null;
}

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function SpotifyCard() {
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/spotify");
        const data = await res.json();
        if (!cancelled && !data.error && data.title) setTrack(data);
      } catch {}
      if (!cancelled) setLoading(false);
    }
    load();
    const id = setInterval(load, 30_000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  if (loading) {
    return (
      <div className="card" style={{ padding: "20px", background: "var(--card)", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div className="skeleton" style={{ height: "14px", width: "40%", borderRadius: "var(--ui-radius)" }} />
        <div className="skeleton" style={{ height: "120px", borderRadius: "var(--ui-radius)" }} />
      </div>
    );
  }

  if (!track?.title) {
    return (
      <div className="card" style={{ padding: "20px", background: "var(--card)" }}>
        <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.75rem", color: "var(--muted-foreground)", margin: 0 }}>
          Not playing anything right now.
        </p>
      </div>
    );
  }

  return (
    <Tooltip text="🎵Listen with me">
      <a
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card"
        style={{ display: "flex", textDecoration: "none", position: "relative", overflow: "hidden", cursor: "pointer", width: "100%" }}
      >
        {track.albumArt && (
          <>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${track.albumArt})`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(2px) brightness(0.3)", transform: "scale(1.05)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, oklch(0 0 0 / 90%) 0%, transparent 60%)" }} />
          </>
        )}

        <div style={{ position: "relative", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "200px", gap: "10px", textAlign: "center", flex: 1 }}>
          {track.albumArt && (
            <Image src={track.albumArt} alt={track.album} width={100} height={100} style={{ borderRadius: "var(--ui-radius)", boxShadow: "0 8px 24px oklch(0 0 0 / 60%)" }} />
          )}
          <div style={{ width: "100%" }}>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", color: track.isPlaying ? "#1DB954" : "oklch(1 0 0 / 50%)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {track.isPlaying ? "Now Playing" : track.playedAt ? timeAgo(track.playedAt) : "Recently played"}
            </span>
            <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.95rem", fontWeight: 700, color: "white", margin: "4px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {track.title}
            </p>
            <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.8rem", color: "oklch(1 0 0 / 70%)", margin: "2px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {track.artist}
            </p>
          </div>
        </div>
      </a>
    </Tooltip>
  );
}
