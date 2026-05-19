"use client";

import { useState, useEffect } from "react";

const ADMIN_PASSWORD = "022723";
const SESSION_KEY = "fg-auth";

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function attempt(e: React.FormEvent) {
    e.preventDefault();
    if (value === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onUnlock();
    } else {
      setError(true);
      setValue("");
    }
  }

  return (
    <>
      <style>{`
        .pg-wrap {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .pg-box {
          width: 100%;
          max-width: 320px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .pg-title {
          font-family: var(--font-geist-sans);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--foreground);
          margin: 0;
        }
        .pg-sub {
          font-family: var(--font-geist-mono);
          font-size: 0.7rem;
          color: var(--muted-foreground);
          margin: 4px 0 0;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .pg-form { display: flex; flex-direction: column; gap: 10px; }
        .pg-input {
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
          letter-spacing: 0.15em;
        }
        .pg-input::placeholder { color: var(--muted-foreground); letter-spacing: 0; }
        .pg-input:focus { border-color: var(--primary); }
        .pg-input.err { border-color: var(--destructive); }
        .pg-error {
          font-family: var(--font-geist-mono);
          font-size: 0.65rem;
          color: var(--destructive);
        }
        .pg-btn {
          padding: 10px;
          border-radius: var(--ui-radius);
          border: none;
          background: var(--primary);
          color: var(--background);
          font-family: var(--font-geist-mono);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.15s ease;
          letter-spacing: 0.04em;
        }
        .pg-btn:hover { opacity: 0.85; }
      `}</style>
      <div className="pg-wrap">
        <div className="pg-box">
          <div>
            <p className="pg-title">Admin Access</p>
            <p className="pg-sub">Enter password to continue</p>
          </div>
          <form className="pg-form" onSubmit={attempt}>
            <input
              className={`pg-input${error ? " err" : ""}`}
              type="password"
              placeholder="Password"
              value={value}
              autoFocus
              onChange={(e) => { setValue(e.target.value); setError(false); }}
            />
            {error && <span className="pg-error">Incorrect password.</span>}
            <button type="submit" className="pg-btn">Unlock</button>
          </form>
        </div>
      </div>
    </>
  );
}

function DeleteConfirmModal({
  form,
  onConfirm,
  onCancel,
}: {
  form: { id: string; label: string; submitted: boolean };
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const [input, setInput] = useState("");
  const match = input === form.id;

  return (
    <>
      <style>{`
        .dc-overlay {
          position: fixed; inset: 0;
          background: oklch(0 0 0 / 0.5);
          display: flex; align-items: center; justify-content: center;
          padding: 24px; z-index: 100;
        }
        .dc-modal {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--card-radius);
          padding: 24px;
          width: 100%; max-width: 420px;
          display: flex; flex-direction: column; gap: 18px;
        }
        .dc-title {
          font-family: var(--font-geist-sans);
          font-size: 1rem; font-weight: 700;
          color: var(--foreground); margin: 0;
        }
        .dc-body {
          font-family: var(--font-geist-sans);
          font-size: 0.85rem; color: var(--muted-foreground);
          margin: 0; line-height: 1.6;
        }
        .dc-warn {
          font-family: var(--font-geist-mono);
          font-size: 0.7rem;
          color: var(--destructive);
          background: oklch(from var(--destructive) l c h / 0.08);
          border: 1px solid oklch(from var(--destructive) l c h / 0.25);
          border-radius: var(--ui-radius);
          padding: 8px 12px;
          line-height: 1.5;
        }
        .dc-prompt {
          display: flex; flex-direction: column; gap: 7px;
        }
        .dc-prompt-label {
          font-family: var(--font-geist-mono);
          font-size: 0.68rem; color: var(--muted-foreground);
          line-height: 1.5;
        }
        .dc-prompt-label code {
          color: var(--foreground);
          background: var(--muted);
          padding: 1px 5px;
          border-radius: 4px;
          font-family: var(--font-geist-mono);
          font-size: 0.75rem;
        }
        .dc-input {
          background: var(--muted);
          border: 1px solid transparent;
          border-radius: var(--ui-radius);
          padding: 9px 12px;
          font-family: var(--font-geist-mono);
          font-size: 0.8rem; letter-spacing: 0.05em;
          color: var(--foreground);
          outline: none; width: 100%; box-sizing: border-box;
          transition: border-color 0.15s ease;
        }
        .dc-input:focus { border-color: var(--primary); }
        .dc-actions { display: flex; gap: 10px; }
        .dc-cancel {
          flex: 1; padding: 9px;
          border-radius: var(--ui-radius);
          border: 1px solid var(--border);
          background: transparent;
          font-family: var(--font-geist-mono);
          font-size: 0.78rem; color: var(--muted-foreground);
          cursor: pointer; transition: all 0.15s ease;
        }
        .dc-cancel:hover { color: var(--foreground); border-color: var(--foreground); }
        .dc-delete {
          flex: 1; padding: 9px;
          border-radius: var(--ui-radius);
          border: none;
          background: var(--destructive);
          font-family: var(--font-geist-mono);
          font-size: 0.78rem; font-weight: 600;
          color: #fff; cursor: pointer;
          transition: opacity 0.15s ease;
        }
        .dc-delete:disabled { opacity: 0.35; cursor: default; }
        .dc-delete:not(:disabled):hover { opacity: 0.85; }
      `}</style>
      <div className="dc-overlay" onClick={onCancel}>
        <div className="dc-modal" onClick={(e) => e.stopPropagation()}>
          <p className="dc-title">Delete form</p>
          <p className="dc-body">
            You&apos;re about to delete <strong>{form.label}</strong>. This action cannot be undone.
          </p>
          {form.submitted && (
            <p className="dc-warn">
              This form has a submitted testimonial. Deleting it will also permanently remove the testimonial from the database.
            </p>
          )}
          <div className="dc-prompt">
            <span className="dc-prompt-label">
              To confirm, type the form ID: <code>{form.id}</code>
            </span>
            <input
              className="dc-input"
              placeholder={form.id}
              value={input}
              autoFocus
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && match && onConfirm()}
            />
          </div>
          <div className="dc-actions">
            <button className="dc-cancel" onClick={onCancel}>Cancel</button>
            <button className="dc-delete" disabled={!match} onClick={onConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function shortId() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 9 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}
import { Copy, Check, ExternalLink, Trash2, Plus } from "lucide-react";

interface GeneratedForm {
  id: string;
  label: string;
  createdAt: string;
  submitted: boolean;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit",
  });
}

export default function FormGeneratePage() {
  const [unlocked, setUnlocked] = useState(false);
  const [forms, setForms] = useState<GeneratedForm[]>([]);
  const [label, setLabel] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<GeneratedForm | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      setUnlocked(true);
      loadForms();
    }
    setMounted(true);
  }, []);

  async function loadForms() {
    try {
      const res = await fetch("/api/testimonial-forms");
      const data = await res.json();
      if (Array.isArray(data)) {
        setForms(data.map((r: { id: string; label: string; created_at: string; submitted: boolean }) => ({
          id: r.id,
          label: r.label,
          createdAt: r.created_at,
          submitted: r.submitted,
        })));
      }
    } catch {}
  }

  async function generate() {
    const id = shortId();
    const resolvedLabel = label.trim() || `Form ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
    setLoading(true);
    try {
      await fetch("/api/testimonial-forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, label: resolvedLabel }),
      });
      setForms((prev) => [{ id, label: resolvedLabel, createdAt: new Date().toISOString(), submitted: false }, ...prev]);
      setLabel("");
    } finally {
      setLoading(false);
    }
  }

  function copy(id: string) {
    const url = `${window.location.origin}/testimonial/${id}`;
    navigator.clipboard.writeText(url).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  async function confirmDelete() {
    if (!deleting) return;
    const id = deleting.id;
    setDeleting(null);
    setForms((prev) => prev.filter((f) => f.id !== id));
    await fetch("/api/testimonial-forms", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).catch(() => {});
  }

  function formUrl(id: string) {
    return `/testimonial/${id}`;
  }

  function handleUnlock() {
    setUnlocked(true);
    loadForms();
  }

  if (!unlocked && mounted) return <PasswordGate onUnlock={handleUnlock} />;
  if (!mounted) return null;

  return (
    <>
      <style>{`
        .fg-page {
          min-height: 100vh;
          padding: 48px 24px 80px;
          display: flex;
          flex-direction: column;
          gap: 36px;
          max-width: 680px;
          margin: 0 auto;
          width: 100%;
        }
        .fg-header { display: flex; flex-direction: column; gap: 6px; }
        .fg-badge {
          font-family: var(--font-geist-mono);
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--primary);
        }
        .fg-title {
          font-family: var(--font-geist-sans);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--foreground);
          margin: 0;
        }
        .fg-sub {
          font-family: var(--font-geist-sans);
          font-size: 0.875rem;
          color: var(--muted-foreground);
          margin: 4px 0 0;
          line-height: 1.6;
        }
        .fg-generate-box {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 20px;
          border: 1px solid var(--border);
          border-radius: var(--card-radius);
          background: var(--card);
        }
        .fg-generate-row {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .fg-input {
          flex: 1;
          background: var(--muted);
          border: 1px solid transparent;
          border-radius: var(--ui-radius);
          padding: 9px 14px;
          font-family: var(--font-geist-sans);
          font-size: 0.875rem;
          color: var(--foreground);
          outline: none;
          transition: border-color 0.15s ease;
        }
        .fg-input::placeholder { color: var(--muted-foreground); }
        .fg-input:focus { border-color: var(--primary); }
        .fg-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 18px;
          border-radius: var(--ui-radius);
          border: none;
          background: var(--primary);
          color: var(--background);
          font-family: var(--font-geist-mono);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: opacity 0.15s ease;
          flex-shrink: 0;
        }
        .fg-btn:hover { opacity: 0.85; }
        .fg-hint {
          font-family: var(--font-geist-mono);
          font-size: 0.65rem;
          color: var(--muted-foreground);
        }
        .fg-list-header {
          font-family: var(--font-geist-mono);
          font-size: 0.7rem;
          color: var(--muted-foreground);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin: 0 0 12px;
        }
        .fg-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .fg-form-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border: 1px solid var(--border);
          border-radius: var(--card-radius);
          background: var(--card);
          transition: border-color 0.15s ease;
        }
        .fg-form-row:hover { border-color: var(--primary); }
        .fg-form-info { flex: 1; min-width: 0; }
        .fg-form-label {
          font-family: var(--font-geist-sans);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--foreground);
          margin: 0 0 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .fg-form-meta {
          font-family: var(--font-geist-mono);
          font-size: 0.65rem;
          color: var(--muted-foreground);
        }
        .fg-form-actions {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }
        .fg-icon-btn {
          width: 32px;
          height: 32px;
          border-radius: var(--ui-radius);
          border: 1px solid var(--border);
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--muted-foreground);
          transition: all 0.15s ease;
          text-decoration: none;
          flex-shrink: 0;
        }
        .fg-icon-btn:hover { color: var(--foreground); border-color: var(--foreground); }
        .fg-icon-btn.danger:hover { color: var(--destructive); border-color: var(--destructive); }
        .fg-status-tag {
          font-family: var(--font-geist-mono);
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 2px 7px;
          border-radius: 999px;
          border: 1px solid;
          flex-shrink: 0;
        }
        .fg-status-tag.filled {
          color: var(--primary);
          border-color: var(--primary);
          background: oklch(from var(--primary) l c h / 0.08);
        }
        .fg-status-tag.pending {
          color: var(--muted-foreground);
          border-color: var(--border);
        }
        .fg-empty {
          padding: 32px;
          text-align: center;
          border: 1.5px dashed var(--border);
          border-radius: var(--card-radius);
          font-family: var(--font-geist-mono);
          font-size: 0.75rem;
          color: var(--muted-foreground);
        }
        @media (max-width: 640px) {
          .fg-page { padding: 36px 20px 60px; gap: 28px; }
          .fg-title { font-size: 1.4rem; }
          .fg-generate-row { flex-direction: column; align-items: stretch; }
          .fg-btn { justify-content: center; }
        }
      `}</style>

      <main className="fg-page">
        <div className="fg-header">
          <span className="fg-badge">Admin</span>
          <h1 className="fg-title">Testimonial Form Generator</h1>
          <p className="fg-sub">
            Generate unique form links to collect testimonials. Each link is single-use and tied to a unique ID.
          </p>
        </div>

        <div className="fg-generate-box">
          <div className="fg-generate-row">
            <input
              className="fg-input"
              placeholder="Form label (optional)"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && generate()}
              disabled={loading}
            />
            <button className="fg-btn" onClick={generate} disabled={loading}>
              <Plus size={14} />
              {loading ? "Saving..." : "Generate"}
            </button>
          </div>
          <span className="fg-hint">Leave blank to auto-label by date.</span>
        </div>

        <div>
            <p className="fg-list-header">Generated forms ({forms.length})</p>
            {forms.length === 0 ? (
              <div className="fg-empty">No forms generated yet.</div>
            ) : (
              <div className="fg-list">
                {forms.map((f) => (
                  <div key={f.id} className="fg-form-row">
                    <div className="fg-form-info">
                      <p className="fg-form-label">{f.label}</p>
                      <span className="fg-form-meta">{formatDate(f.createdAt)} &nbsp;·&nbsp; {f.id}</span>
                    </div>
                    <span className={`fg-status-tag${f.submitted ? " filled" : " pending"}`}>
                      {f.submitted ? "filled" : "pending"}
                    </span>
                    <div className="fg-form-actions">
                      <button
                        className="fg-icon-btn"
                        title="Copy link"
                        onClick={() => copy(f.id)}
                      >
                        {copied === f.id ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                      <a
                        href={formUrl(f.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fg-icon-btn"
                        title="Open form"
                      >
                        <ExternalLink size={14} />
                      </a>
                      <button
                        className="fg-icon-btn danger"
                        title="Delete"
                        onClick={() => setDeleting(f)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
      </main>

      {deleting && (
        <DeleteConfirmModal
          form={deleting}
          onConfirm={confirmDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </>
  );
}
