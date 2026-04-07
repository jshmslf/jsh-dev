"use client";
import { useContact } from "@/components/ContactModal";

export function HireMeCard() {
  const { open } = useContact();

  return (
    <div
      className="card"
      style={{
        flex: 1,
        padding: "20px",
        background: "var(--card)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        textAlign: "center",
        cursor: "default",
      }}
    >
      <button onClick={open} className="profile-btn">
        Hire Me
      </button>
    </div>
  );
}
