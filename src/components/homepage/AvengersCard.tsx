"use client";

import { useEffect, useState } from "react";

const RELEASE = new Date("2026-12-18T00:00:00");
const POSTER = "https://image.tmdb.org/t/p/w780/8HkIe2i4ScpCkcX9SzZ9IPasqWV.jpg";

function getCountdown() {
  const diff = RELEASE.getTime() - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, mins, secs };
}

export function AvengersCard() {
  const [countdown, setCountdown] = useState<ReturnType<typeof getCountdown>>(null);

  useEffect(() => {
    const update = () => setCountdown(getCountdown());
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="card"
      style={{ position: "relative", overflow: "hidden", minHeight: "200px", display: "flex" }}
    >
      {/* Poster background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${POSTER})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        filter: "brightness(0.3)",
        transform: "scale(1.05)",
      }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, oklch(0 0 0 / 30%) 0%, transparent 100%)" }} />

      {/* Content */}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", gap: "12px", textAlign: "center" }}>

        <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", color: "oklch(1 0 0 / 50%)", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>
          Avengers: Doomsday returns in
        </p>

        {countdown ? (
          <div style={{ display: "flex", gap: "16px", alignItems: "flex-end" }}>
            {[
              { value: countdown.days, label: "days" },
              { value: countdown.hours, label: "hrs" },
              { value: countdown.mins, label: "min" },
              { value: countdown.secs, label: "sec" },
            ].map(({ value, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "2rem", fontWeight: 700, color: "white", margin: 0, lineHeight: 1 }}>
                  {String(value).padStart(2, "0")}
                </p>
                <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.6rem", color: "oklch(1 0 0 / 50%)", margin: "4px 0 0", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "1rem", fontWeight: 700, color: "white", margin: 0 }}>
            It&apos;s here. 🔴
          </p>
        )}
      </div>
    </div>
  );
}
