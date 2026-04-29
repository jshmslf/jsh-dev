"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot } from "lucide-react";

interface Message {
  role: "user" | "ai";
  text: string;
}

const GREETING: Message = {
  role: "ai",
  text: "Hey! I'm Josh's AI assistant. Ask me anything about his work, skills, or projects.",
};

export function AIChatButton() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  function send() {
    const text = input.trim();
    if (!text || thinking) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { role: "ai", text: "This feature is coming soon! Stay tuned." },
      ]);
      setThinking(false);
    }, 900);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <>
      <style>{`
        .ai-fab {
          position: fixed;
          bottom: 28px;
          right: 28px;
          width: 48px;
          height: 48px;
          border-radius: var(--ui-radius);
          background: var(--primary);
          color: var(--background);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px oklch(0 0 0 / 25%);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          z-index: 100;
        }
        .ai-fab:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px oklch(0 0 0 / 30%);
        }
        .ai-fab:active {
          transform: translateY(0);
        }
        .ai-panel {
          position: fixed;
          bottom: 88px;
          right: 28px;
          width: 320px;
          height: 420px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--card-radius);
          box-shadow: 0 8px 32px oklch(0 0 0 / 20%);
          display: flex;
          flex-direction: column;
          z-index: 100;
          overflow: hidden;
          animation: chat-in 0.2s ease;
        }
        @media (max-width: 640px) {
          .ai-panel {
            left: 12px;
            right: 12px;
            width: auto;
            bottom: 76px;
            height: 60vh;
          }
          .ai-fab {
            bottom: 20px;
            right: 16px;
          }
        }
        @keyframes chat-in {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        .ai-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }
        .ai-panel-header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ai-panel-messages {
          flex: 1;
          overflow-y: auto;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ai-bubble {
          max-width: 80%;
          padding: 8px 12px;
          border-radius: var(--ui-radius);
          font-family: var(--font-geist-sans);
          font-size: 0.82rem;
          line-height: 1.5;
        }
        .ai-bubble-ai {
          background: var(--muted);
          color: var(--foreground);
          align-self: flex-start;
        }
        .ai-bubble-user {
          background: var(--primary);
          color: var(--background);
          align-self: flex-end;
        }
        .ai-thinking {
          align-self: flex-start;
          display: flex;
          gap: 4px;
          padding: 10px 14px;
          background: var(--muted);
          border-radius: var(--ui-radius);
        }
        .ai-thinking span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--muted-foreground);
          animation: bounce 1.2s ease infinite;
        }
        .ai-thinking span:nth-child(2) { animation-delay: 0.15s; }
        .ai-thinking span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }
        .ai-input-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border-top: 1px solid var(--border);
          flex-shrink: 0;
        }
        .ai-input {
          flex: 1;
          background: var(--muted);
          border: 1px solid transparent;
          border-radius: var(--ui-radius);
          padding: 8px 12px;
          font-family: var(--font-geist-sans);
          font-size: 0.82rem;
          color: var(--foreground);
          outline: none;
          transition: border-color 0.15s ease;
          resize: none;
        }
        .ai-input:focus {
          border-color: var(--primary);
        }
        .ai-input::placeholder {
          color: var(--muted-foreground);
        }
        .ai-send {
          width: 34px;
          height: 34px;
          border-radius: var(--ui-radius);
          background: var(--primary);
          color: var(--background);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: opacity 0.15s ease;
        }
        .ai-send:disabled {
          opacity: 0.4;
          cursor: default;
        }
      `}</style>

      {open && (
        <div className="ai-panel">
          <div className="ai-panel-header">
            <div className="ai-panel-header-left">
              <Bot size={16} color="var(--primary)" />
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.8rem", fontWeight: 700, color: "var(--foreground)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Ask Josh
              </span>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", display: "flex", padding: 0 }}>
              <X size={16} />
            </button>
          </div>

          <div className="ai-panel-messages">
            {messages.map((m, i) => (
              <div key={i} className={`ai-bubble ${m.role === "ai" ? "ai-bubble-ai" : "ai-bubble-user"}`}>
                {m.text}
              </div>
            ))}
            {thinking && (
              <div className="ai-thinking">
                <span /><span /><span />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="ai-input-row">
            <textarea
              className="ai-input"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask me anything..."
            />
            <button className="ai-send" onClick={send} disabled={!input.trim() || thinking}>
              <Send size={14} />
            </button>
          </div>
        </div>
      )}

      <button className="ai-fab" onClick={() => setOpen((o) => !o)} aria-label="Chat with Josh's AI">
        {open ? <X size={20} /> : <Bot size={20} />}
      </button>
    </>
  );
}
