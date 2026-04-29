"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  company: string | null;
  position: string | null;
  comment: string;
  stars: number;
  created_at: string;
}

function StarDisplay({ value }: { value: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={13}
          fill={n <= value ? "var(--primary)" : "none"}
          stroke="var(--primary)"
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="tl-card">
      <div className="tl-card-top">
        <div className="tl-avatar">{t.name.charAt(0).toUpperCase()}</div>
        <div className="tl-meta">
          <p className="tl-name">{t.name}</p>
          {(t.position || t.company) && (
            <p className="tl-role">{[t.position, t.company].filter(Boolean).join(" at ")}</p>
          )}
        </div>
        <div style={{ marginLeft: "auto", flexShrink: 0 }}>
          <StarDisplay value={t.stars} />
        </div>
      </div>
      <p className="tl-comment">&ldquo;{t.comment}&rdquo;</p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="tl-card">
      <div className="tl-card-top">
        <div className="tl-skeleton" style={{ width: 36, height: 36, borderRadius: "var(--ui-radius)", flexShrink: 0 }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          <div className="tl-skeleton" style={{ width: "50%", height: 12 }} />
          <div className="tl-skeleton" style={{ width: "35%", height: 10 }} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div className="tl-skeleton" style={{ width: "100%", height: 12 }} />
        <div className="tl-skeleton" style={{ width: "85%", height: 12 }} />
        <div className="tl-skeleton" style={{ width: "60%", height: 12 }} />
      </div>
    </div>
  );
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/testimonial")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setTestimonials(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <style>{`
        .tl-page {
          min-height: 100vh;
          padding: 60px 24px 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .tl-wrap {
          width: 100%;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .tl-header { display: flex; flex-direction: column; gap: 6px; }
        .tl-badge {
          font-family: var(--font-geist-mono);
          font-size: 0.7rem;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .tl-title {
          font-family: var(--font-geist-sans);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--foreground);
          margin: 0;
        }
        .tl-sub {
          font-family: var(--font-geist-sans);
          font-size: 0.9rem;
          color: var(--muted-foreground);
          margin: 4px 0 0;
          line-height: 1.65;
        }
        .tl-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .tl-card {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 20px;
          border: 1px solid var(--border);
          border-radius: var(--card-radius);
          background: var(--card);
          transition: border-color 0.15s ease;
        }
        .tl-card:hover { border-color: var(--primary); }
        .tl-card-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .tl-avatar {
          width: 36px;
          height: 36px;
          border-radius: var(--ui-radius);
          background: var(--primary);
          color: var(--background);
          font-family: var(--font-geist-sans);
          font-size: 1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .tl-meta { flex: 1; min-width: 0; }
        .tl-name {
          font-family: var(--font-geist-sans);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--foreground);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tl-role {
          font-family: var(--font-geist-mono);
          font-size: 0.65rem;
          color: var(--muted-foreground);
          margin: 2px 0 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tl-comment {
          font-family: var(--font-geist-sans);
          font-size: 0.875rem;
          color: var(--muted-foreground);
          margin: 0;
          line-height: 1.7;
          font-style: italic;
        }
        .tl-empty {
          padding: 40px 24px;
          text-align: center;
          border: 1.5px dashed var(--border);
          border-radius: var(--card-radius);
          font-family: var(--font-geist-mono);
          font-size: 0.75rem;
          color: var(--muted-foreground);
        }
        .tl-skeleton {
          border-radius: var(--ui-radius);
          background: var(--muted);
          animation: tl-pulse 1.4s ease-in-out infinite;
        }
        @keyframes tl-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .tl-stats {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .tl-stat {
          display: flex;
          align-items: baseline;
          gap: 5px;
        }
        .tl-stat-value {
          font-family: var(--font-geist-sans);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--foreground);
          line-height: 1;
        }
        .tl-stat-label {
          font-family: var(--font-geist-mono);
          font-size: 0.68rem;
          color: var(--muted-foreground);
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }
        .tl-stat-divider {
          width: 1px;
          height: 24px;
          background: var(--border);
          flex-shrink: 0;
        }
        @media (max-width: 540px) {
          .tl-page { padding: 40px 20px 60px; }
        }
      `}</style>

      <main className="tl-page">
        <div className="tl-wrap">
          <div className="tl-header">
            <span className="tl-badge">jshmslf</span>
            <h1 className="tl-title">Testimonials</h1>
            <p className="tl-sub">What people say about working with me.</p>
          </div>

          {!loading && testimonials.length > 0 && (() => {
            const avg = testimonials.reduce((s, t) => s + t.stars, 0) / testimonials.length;
            return (
              <div className="tl-stats">
                <div className="tl-stat">
                  <span className="tl-stat-value">{avg.toFixed(1)}</span>
                  <span className="tl-stat-label">/ 5 avg</span>
                </div>
                <div className="tl-stat-divider" />
                <div className="tl-stat">
                  <span className="tl-stat-value">{testimonials.length}</span>
                  <span className="tl-stat-label">testimonial{testimonials.length !== 1 ? "s" : ""}</span>
                </div>
              </div>
            );
          })()}

          <div className="tl-list">
            {loading ? (
              [1, 2, 3].map((n) => <SkeletonCard key={n} />)
            ) : testimonials.length === 0 ? (
              <div className="tl-empty">No testimonials yet.</div>
            ) : (
              testimonials.map((t, i) => <TestimonialCard key={i} t={t} />)
            )}
          </div>
        </div>
      </main>
    </>
  );
}
