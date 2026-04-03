"use client";

import { createContext, useContext, useState, ReactNode, FormEvent } from "react";

const ContactContext = createContext<{ open: () => void } | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ContactContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      {isOpen && <ContactModalInner onClose={() => setIsOpen(false)} />}
    </ContactContext.Provider>
  );
}

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContact must be used within ContactProvider");
  return ctx;
}

type Status = "idle" | "loading" | "success" | "error";

interface Fields {
  name: string;
  email: string;
  contact: string;
  subject: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validate(fields: Fields): FieldErrors {
  const errors: FieldErrors = {};
  if (!fields.name.trim()) errors.name = "Name is required.";
  if (!fields.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = "Enter a valid email.";
  if (!fields.subject.trim()) errors.subject = "Subject is required.";
  if (!fields.message.trim()) errors.message = "Message is required.";
  return errors;
}

function ContactModalInner({ onClose }: { onClose: () => void }) {
  const [fields, setFields] = useState<Fields>({ name: "", email: "", contact: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function set(key: keyof Fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key as keyof FieldErrors]) setErrors((err) => ({ ...err, [key]: undefined }));
    };
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setStatus("loading");
    // TODO: replace with real API call
    await new Promise((r) => setTimeout(r, 1200));
    // Simulate success (change to "error" to test error state)
    setStatus("success");
  }

  return (
    <>
      <style>{`
        .contact-overlay {
          position: fixed;
          inset: 0;
          background: oklch(0 0 0 / 60%);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fade-in 0.2s ease;
        }
        .contact-modal {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--card-radius);
          padding: 28px;
          width: 100%;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: slide-up 0.2s ease;
        }
        @keyframes fade-in {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(16px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        .contact-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .contact-label {
          font-family: var(--font-geist-mono);
          font-size: 0.7rem;
          color: var(--muted-foreground);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .contact-input {
          font-family: var(--font-geist-sans);
          font-size: 0.875rem;
          color: var(--foreground);
          background: var(--muted);
          border: 1px solid var(--border);
          border-radius: var(--ui-radius);
          padding: 8px 12px;
          outline: none;
          transition: border-color 0.2s ease;
          width: 100%;
          box-sizing: border-box;
        }
        .contact-input:focus { border-color: var(--primary); }
        .contact-input.error { border-color: var(--destructive); }
        .contact-input::placeholder { color: var(--muted-foreground); opacity: 0.6; }
        textarea.contact-input { resize: vertical; min-height: 100px; }
        .field-error {
          font-family: var(--font-geist-mono);
          font-size: 0.68rem;
          color: var(--destructive);
        }
      `}</style>

      <div className="contact-overlay" onClick={(e) => e.target === e.currentTarget && status !== "loading" && onClose()}>
        <div className="contact-modal">

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "1rem", fontWeight: 700, color: "var(--foreground)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Get in Touch
            </span>
            {status !== "loading" && (
              <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", fontSize: "1.2rem", lineHeight: 1, padding: "4px" }}>
                ✕
              </button>
            )}
          </div>

          {/* Success state */}
          {status === "success" && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "24px 0", textAlign: "center" }}>
              <span style={{ fontSize: "2.5rem" }}>✅</span>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "1rem", fontWeight: 600, color: "var(--foreground)", margin: 0 }}>Message sent!</p>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.875rem", color: "var(--muted-foreground)", margin: 0 }}>
                Thanks for reaching out. I&apos;ll get back to you soon.
              </p>
              <button className="profile-btn" onClick={onClose} style={{ marginTop: "8px" }}>Close</button>
            </div>
          )}

          {/* Error state */}
          {status === "error" && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "24px 0", textAlign: "center" }}>
              <span style={{ fontSize: "2.5rem" }}>❌</span>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "1rem", fontWeight: 600, color: "var(--foreground)", margin: 0 }}>Something went wrong.</p>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.875rem", color: "var(--muted-foreground)", margin: 0 }}>
                Please try again or reach me directly.
              </p>
              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <button className="profile-btn" onClick={() => setStatus("idle")}>Try Again</button>
                <button className="profile-btn" onClick={onClose}>Close</button>
              </div>
            </div>
          )}

          {/* Form */}
          {(status === "idle" || status === "loading") && (
            <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div className="contact-field">
                  <label className="contact-label">Name</label>
                  <input className={`contact-input${errors.name ? " error" : ""}`} type="text" placeholder="Juan dela Cruz" value={fields.name} onChange={set("name")} />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>
                <div className="contact-field">
                  <label className="contact-label">Email</label>
                  <input className={`contact-input${errors.email ? " error" : ""}`} type="email" placeholder="juan@email.com" value={fields.email} onChange={set("email")} />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
              </div>

              <div className="contact-field">
                <label className="contact-label">Contact <span style={{ opacity: 0.5 }}>(optional)</span></label>
                <input className="contact-input" type="text" placeholder="+63 912 345 6789" value={fields.contact} onChange={set("contact")} />
              </div>

              <div className="contact-field">
                <label className="contact-label">Subject</label>
                <input className={`contact-input${errors.subject ? " error" : ""}`} type="text" placeholder="Let's work together" value={fields.subject} onChange={set("subject")} />
                {errors.subject && <span className="field-error">{errors.subject}</span>}
              </div>

              <div className="contact-field">
                <label className="contact-label">Message</label>
                <textarea className={`contact-input${errors.message ? " error" : ""}`} placeholder="Your message..." value={fields.message} onChange={set("message")} maxLength={500} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {errors.message ? <span className="field-error">{errors.message}</span> : <span />}
                  <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.68rem", color: fields.message.length >= 500 ? "var(--destructive)" : "var(--muted-foreground)" }}>
                    {fields.message.length}/500
                  </span>
                </div>
              </div>

              <button type="submit" className="profile-btn" style={{ alignSelf: "flex-end" }} disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Send Message →"}
              </button>
            </form>
          )}

        </div>
      </div>
    </>
  );
}
