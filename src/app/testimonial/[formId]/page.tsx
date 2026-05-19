"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Star } from "lucide-react";

const COMMENT_MAX = 2000;

interface FormState {
  name: string;
  email: string;
  company: string;
  position: string;
  comment: string;
  stars: number;
}

interface Testimonial {
  name: string;
  email: string;
  company: string | null;
  position: string | null;
  comment: string;
  stars: number;
}

const EMPTY: FormState = { name: "", email: "", company: "", position: "", comment: "", stars: 0 };

function maskName(name: string) {
  return name.trim().split(/\s+/).map((w) => w[0] + "*".repeat(Math.max(w.length - 1, 0))).join(" ");
}

type PageState =
  | { status: "loading" }
  | { status: "not-found" }
  | { status: "form" }
  | { status: "already-submitted"; testimonial: Testimonial }
  | { status: "success"; submitted: FormState };

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          style={{
            background: "none", border: "none", cursor: "pointer", padding: "2px",
            color: n <= active ? "var(--primary)" : "var(--border)",
            transition: "color 0.1s ease", lineHeight: 0,
          }}
        >
          <Star size={26} fill={n <= active ? "currentColor" : "none"} strokeWidth={1.5} />
        </button>
      ))}
    </div>
  );
}

function StarDisplay({ value }: { value: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={16}
          fill={n <= value ? "var(--primary)" : "none"}
          stroke="var(--primary)"
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: { name: string; company?: string | null; position?: string | null; comment: string; stars: number } }) {
  return (
    <div className="tf-preview-card">
      <div className="tf-preview-top">
        <div className="tf-preview-avatar">{t.name.charAt(0).toUpperCase()}</div>
        <div>
          <p className="tf-preview-name">{t.name}</p>
          {(t.company || t.position) && (
            <p className="tf-preview-role">
              {[t.position, t.company].filter(Boolean).join(" at ")}
            </p>
          )}
        </div>
        <div style={{ marginLeft: "auto" }}>
          <StarDisplay value={t.stars} />
        </div>
      </div>
      <p className="tf-preview-comment">&ldquo;{t.comment}&rdquo;</p>
    </div>
  );
}

export default function TestimonialPage() {
  const params = useParams<{ formId: string }>();
  const formId = params?.formId ?? "";

  const [page, setPage] = useState<PageState>({ status: "loading" });
  const [form, setForm] = useState<FormState>(EMPTY);
  const [anonymous, setAnonymous] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!formId) return;
    fetch(`/api/testimonial?formId=${encodeURIComponent(formId)}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.exists) {
          setPage({ status: "not-found" });
        } else if (data.submitted) {
          setPage({ status: "already-submitted", testimonial: data.testimonial });
        } else {
          setPage({ status: "form" });
        }
      })
      .catch(() => setPage({ status: "not-found" }));
  }, [formId]);

  function set(key: keyof FormState, value: string | number) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate() {
    const e: typeof errors = {};
    if (!form.name.trim())    e.name    = "Name is required.";
    if (!form.email.trim())   e.email   = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.comment.trim()) e.comment = "Please share your thoughts.";
    if (form.comment.length > COMMENT_MAX) e.comment = `Maximum ${COMMENT_MAX} characters.`;
    if (!form.stars)          e.stars   = "Please select a rating.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    const submittedName = anonymous ? maskName(form.name) : form.name;
    try {
      const res = await fetch("/api/testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId, ...form, name: submittedName }),
      });
      if (!res.ok) throw new Error();
      setPage({ status: "success", submitted: { ...form, name: submittedName } });
    } catch {
      setErrors({ comment: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  const remaining = COMMENT_MAX - form.comment.length;

  return (
    <>
      <style>{`
        .tf-page {
          min-height: 100vh;
          padding: 60px 24px 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .tf-card {
          width: 100%;
          max-width: 540px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .tf-header { display: flex; flex-direction: column; gap: 6px; }
        .tf-badge {
          font-family: var(--font-geist-mono);
          font-size: 0.7rem;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .tf-title {
          font-family: var(--font-geist-sans);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--foreground);
          margin: 0;
        }
        .tf-sub {
          font-family: var(--font-geist-sans);
          font-size: 0.9rem;
          color: var(--muted-foreground);
          margin: 4px 0 0;
          line-height: 1.65;
        }
        .tf-form { display: flex; flex-direction: column; gap: 18px; }
        .tf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .tf-field { display: flex; flex-direction: column; gap: 6px; }
        .tf-label {
          font-family: var(--font-geist-mono);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: var(--muted-foreground);
        }
        .tf-label span { color: var(--primary); margin-left: 2px; }
        .tf-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .tf-char-count {
          font-family: var(--font-geist-mono);
          font-size: 0.65rem;
          color: var(--muted-foreground);
          transition: color 0.15s ease;
        }
        .tf-char-count.warn { color: var(--destructive); }
        .tf-input, .tf-textarea {
          background: var(--muted);
          border: 1px solid transparent;
          border-radius: var(--ui-radius);
          padding: 10px 14px;
          font-family: var(--font-geist-sans);
          font-size: 0.875rem;
          color: var(--foreground);
          outline: none;
          transition: border-color 0.15s ease;
          width: 100%;
          box-sizing: border-box;
        }
        .tf-input::placeholder, .tf-textarea::placeholder { color: var(--muted-foreground); }
        .tf-input:focus, .tf-textarea:focus { border-color: var(--primary); }
        .tf-input.err, .tf-textarea.err { border-color: var(--destructive); }
        .tf-textarea { resize: vertical; min-height: 110px; line-height: 1.6; }
        .tf-error { font-family: var(--font-geist-mono); font-size: 0.65rem; color: var(--destructive); }
        .tf-submit {
          padding: 12px 28px;
          border-radius: var(--ui-radius);
          border: none;
          background: var(--primary);
          color: var(--background);
          font-family: var(--font-geist-mono);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.15s ease;
          width: 100%;
          letter-spacing: 0.04em;
        }
        .tf-submit:disabled { opacity: 0.5; cursor: default; }
        .tf-submit:not(:disabled):hover { opacity: 0.85; }
        /* Anonymous toggle */
        .tf-anon-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          border-radius: var(--ui-radius);
          border: 1px solid var(--border);
          background: var(--muted);
          cursor: pointer;
          user-select: none;
          transition: border-color 0.15s ease;
        }
        .tf-anon-row:hover { border-color: var(--primary); }
        .tf-anon-text { display: flex; flex-direction: column; gap: 2px; }
        .tf-anon-label {
          font-family: var(--font-geist-mono);
          font-size: 0.72rem;
          color: var(--foreground);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .tf-anon-hint {
          font-family: var(--font-geist-mono);
          font-size: 0.62rem;
          color: var(--muted-foreground);
          letter-spacing: 0.02em;
        }
        .tf-toggle {
          width: 36px;
          height: 20px;
          border-radius: 999px;
          background: var(--border);
          position: relative;
          flex-shrink: 0;
          transition: background 0.2s ease;
        }
        .tf-toggle.on { background: var(--primary); }
        .tf-toggle-knob {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--background);
          transition: transform 0.2s ease;
        }
        .tf-toggle.on .tf-toggle-knob { transform: translateX(16px); }
        /* Preview card */
        .tf-preview-card {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 20px;
          border: 1px solid var(--border);
          border-radius: var(--card-radius);
          background: var(--card);
        }
        .tf-preview-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .tf-preview-avatar {
          width: 40px;
          height: 40px;
          border-radius: var(--ui-radius);
          background: var(--primary);
          color: var(--background);
          font-family: var(--font-geist-sans);
          font-size: 1.1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .tf-preview-name {
          font-family: var(--font-geist-sans);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--foreground);
          margin: 0;
        }
        .tf-preview-role {
          font-family: var(--font-geist-mono);
          font-size: 0.68rem;
          color: var(--muted-foreground);
          margin: 2px 0 0;
        }
        .tf-preview-comment {
          font-family: var(--font-geist-sans);
          font-size: 0.875rem;
          color: var(--muted-foreground);
          margin: 0;
          line-height: 1.7;
          font-style: italic;
        }
        .tf-preview-label {
          font-family: var(--font-geist-mono);
          font-size: 0.65rem;
          color: var(--muted-foreground);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        /* Loading skeleton */
        .tf-skeleton {
          border-radius: var(--ui-radius);
          background: var(--muted);
          animation: tf-pulse 1.4s ease-in-out infinite;
        }
        @keyframes tf-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 540px) {
          .tf-page { padding: 40px 20px 60px; }
          .tf-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <main className="tf-page">
        <div className="tf-card">

          {page.status === "loading" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="tf-skeleton" style={{ width: "40%", height: 12 }} />
              <div className="tf-skeleton" style={{ width: "70%", height: 28 }} />
              <div className="tf-skeleton" style={{ width: "100%", height: 14 }} />
              <div className="tf-skeleton" style={{ width: "80%", height: 14 }} />
            </div>
          )}

          {page.status === "not-found" && (
            <div className="tf-header">
              <span className="tf-badge">jshmslf</span>
              <h1 className="tf-title">Not Available</h1>
              <p className="tf-sub">This testimonial link is invalid or has expired.</p>
            </div>
          )}

          {page.status === "already-submitted" && (
            <>
              <div className="tf-header">
                <span className="tf-badge">jshmslf</span>
                <h1 className="tf-title">Already Submitted</h1>
                <p className="tf-sub">A testimonial has already been recorded for this link.</p>
              </div>
              <div>
                <p className="tf-preview-label" style={{ marginBottom: "10px" }}>Submitted testimonial</p>
                <TestimonialCard t={page.testimonial} />
              </div>
            </>
          )}

          {page.status === "success" && (
            <>
              <div className="tf-header">
                <span className="tf-badge">jshmslf</span>
                <h1 className="tf-title">Thanks!</h1>
                <p className="tf-sub">Your testimonial has been submitted. Here&apos;s a preview of what was recorded.</p>
              </div>
              <div>
                <p className="tf-preview-label" style={{ marginBottom: "10px" }}>Your submission</p>
                <TestimonialCard t={page.submitted} />
              </div>
            </>
          )}

          {page.status === "form" && (
            <>
              <div className="tf-header">
                <span className="tf-badge">jshmslf</span>
                <h1 className="tf-title">Leave a Testimonial</h1>
                <p className="tf-sub">
                  Share your experience working with me. Your feedback helps others understand what it&apos;s like to collaborate.
                </p>
              </div>

              <form className="tf-form" onSubmit={handleSubmit} noValidate>
                <div className="tf-row">
                  <div className="tf-field">
                    <label className="tf-label">
                      Name <span>*</span>
                      {anonymous && form.name.trim() && (
                        <span style={{ color: "var(--muted-foreground)", marginLeft: 6, textTransform: "none", letterSpacing: 0 }}>
                          → {maskName(form.name)}
                        </span>
                      )}
                    </label>
                    <input
                      className={`tf-input${errors.name ? " err" : ""}`}
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                    />
                    {errors.name && <span className="tf-error">{errors.name}</span>}
                  </div>
                  <div className="tf-field">
                    <label className="tf-label">Email <span>*</span></label>
                    <input
                      className={`tf-input${errors.email ? " err" : ""}`}
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                    {errors.email && <span className="tf-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="tf-row">
                  <div className="tf-field">
                    <label className="tf-label">Company</label>
                    <input
                      className="tf-input"
                      placeholder="Where you work"
                      value={form.company}
                      onChange={(e) => set("company", e.target.value)}
                    />
                  </div>
                  <div className="tf-field">
                    <label className="tf-label">Position</label>
                    <input
                      className="tf-input"
                      placeholder="Your role"
                      value={form.position}
                      onChange={(e) => set("position", e.target.value)}
                    />
                  </div>
                </div>

                <div className="tf-field">
                  <label className="tf-label">Rating <span>*</span></label>
                  <StarPicker value={form.stars} onChange={(v) => set("stars", v)} />
                  {errors.stars && <span className="tf-error">{errors.stars}</span>}
                </div>

                <div className="tf-field">
                  <div className="tf-label-row">
                    <label className="tf-label">Testimonial <span>*</span></label>
                    <span className={`tf-char-count${remaining < 100 ? " warn" : ""}`}>
                      {remaining} / {COMMENT_MAX}
                    </span>
                  </div>
                  <textarea
                    className={`tf-textarea${errors.comment ? " err" : ""}`}
                    placeholder="Share your experience..."
                    value={form.comment}
                    maxLength={COMMENT_MAX}
                    onChange={(e) => set("comment", e.target.value)}
                  />
                  {errors.comment && <span className="tf-error">{errors.comment}</span>}
                </div>

                <div
                  className="tf-anon-row"
                  onClick={() => setAnonymous((v) => !v)}
                >
                  <div className="tf-anon-text">
                    <span className="tf-anon-label">Post anonymously</span>
                    <span className="tf-anon-hint">Your name will appear as {form.name.trim() ? maskName(form.name) : "J*** D**"}</span>
                  </div>
                  <div className={`tf-toggle${anonymous ? " on" : ""}`}>
                    <div className="tf-toggle-knob" />
                  </div>
                </div>

                <button type="submit" className="tf-submit" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Testimonial"}
                </button>
              </form>
            </>
          )}

        </div>
      </main>
    </>
  );
}
