"use client";

import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card } from "./Card";

const TOKEN_KEY = "visitor_token";
const TOKEN_EXPIRY_KEY = "visitor_token_expiry";
const SIX_MONTHS_MS = 1000 * 60 * 60 * 24 * 30 * 6;

function getToken(): string {
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
  const expired = expiry && Date.now() > Number(expiry);
  if (expired) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
  }
  let token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    token = uuidv4();
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(TOKEN_EXPIRY_KEY, String(Date.now() + SIX_MONTHS_MS));
  }
  return token;
}

interface Particle {
  id: number;
  x: number;
  y: number;
}

let pid = 0;

export function LikesCard() {
  const [displayTotal, setDisplayTotal] = useState<number | null>(null);
  const [myCount, setMyCount] = useState<number>(0);
  const [liked, setLiked] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const tokenRef = useRef<string>("");
  const totalAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    tokenRef.current = getToken();
    fetch(`/api/likes?token=${tokenRef.current}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) return;
        setDisplayTotal(d.total);
        setMyCount(d.myCount);
        if (d.myCount > 0) setLiked(true);
      })
      .catch(() => setDisplayTotal(0));
  }, []);

  async function handleLike() {
    setLiked(true);
    setMyCount((c) => c + 1);
    setDisplayTotal((t) => (t !== null ? t + 1 : t));

    // Spawn single particle at random position in total area
    if (totalAreaRef.current) {
      const rect = totalAreaRef.current.getBoundingClientRect();
      const newParticle: Particle = {
        id: pid++,
        x: Math.random() * (rect.width - 20),
        y: Math.random() * (rect.height - 10),
      };
      setParticles((p) => [...p, newParticle]);
      setTimeout(() => {
        setParticles((p) => p.filter((pt) => pt.id !== newParticle.id));
      }, 800);
    }

    await fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: tokenRef.current }),
    });
  }

  return (
    <Card title="">
      <style>{`
        @keyframes total-bump {
          0%   { transform: translateY(0); }
          50%  { transform: translateY(-4px); }
          100% { transform: translateY(0); }
        }
        @keyframes particle-float {
          0%   { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-40px) scale(0.7); }
        }
        .like-total {
          animation: total-bump 0.3s ease;
        }
        .particle {
          position: absolute;
          font-family: var(--font-geist-mono);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary);
          pointer-events: none;
          animation: particle-float 0.8s ease forwards;
        }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "8px 0" }}>

        {/* Total with particle area */}
        <div ref={totalAreaRef} style={{ position: "relative", textAlign: "center", width: "100%", minHeight: "48px" }}>
          <p
            key={displayTotal}
            className="like-total"
            style={{ fontFamily: "var(--font-geist-mono)", fontSize: "2.5rem", fontWeight: 700, color: "var(--foreground)", margin: 0, lineHeight: 1 }}
          >
            {displayTotal !== null ? displayTotal.toLocaleString() : (
              <span className="skeleton" style={{ display: "inline-block", width: "80px", height: "2.5rem", borderRadius: "var(--ui-radius)" }} />
            )}
          </p>
          {particles.map((p) => (
            <span
              key={p.id}
              className="particle"
              style={{ left: p.x, top: p.y }}
            >
              +1
            </span>
          ))}
        </div>

        {/* Button */}
        <button className="profile-btn" onClick={handleLike} style={{ width: "100%", justifyContent: "center" }}>
          Tap me
        </button>

        {/* Personal count */}
        <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.75rem", color: "var(--muted-foreground)", margin: 0 }}>
          you&apos;ve tapped{" "}
          <span style={{ color: "var(--primary)", fontWeight: 600 }}>{myCount}</span>{" "}
          {myCount === 1 ? "time" : "times"}
        </p>

      </div>
    </Card>
  );
}
