import { PROJECTS, TECH_STACK, EXPERIENCE, SOCIALS } from "@/lib/config";
import { NextResponse } from "next/server";

function match(msg: string, ...keywords: string[]) {
  return keywords.some((k) => msg.includes(k));
}

function buildReply(message: string): string {
  const m = message.toLowerCase();

  if (match(m, "who", "about", "joshua", "josh")) {
    return "I'm Joshua Verceles — a software engineer based in Pangasinan, Philippines. I build web solutions and currently work at Mayon Capital.";
  }

  if (match(m, "project", "app", "built", "made", "portfolio")) {
    const list = PROJECTS.map((p) => `• ${p.title} — ${p.description}`).join("\n");
    return `Here are Joshua's projects:\n\n${list}`;
  }

  if (match(m, "stack", "tech", "skill", "language", "framework", "tool")) {
    return (
      `Joshua's tech stack:\n\n` +
      `Frontend: ${TECH_STACK.frontend.join(", ")}\n` +
      `Backend: ${TECH_STACK.backend.join(", ")}\n` +
      `Dev Tools: ${TECH_STACK.devTools.join(", ")}`
    );
  }

  if (match(m, "experience", "job", "work", "career", "company")) {
    const list = EXPERIENCE.map((e) => `• ${e.title} @ ${e.company} (${e.year})`).join("\n");
    return `Joshua's experience:\n\n${list}`;
  }

  if (match(m, "contact", "reach", "email", "social", "github", "linkedin")) {
    const list = SOCIALS.map((s) => `• ${s.title}: ${s.url}`).join("\n");
    return `You can reach Joshua at:\n\n${list}`;
  }

  return "I'm still in development and can only respond to a limited range of topics. Try asking about Joshua's projects, stack, experience, or how to contact him.";
}

export async function POST(req: Request) {
  const { message } = await req.json();
  if (!message || typeof message !== "string") {
    return NextResponse.json({ reply: "Invalid request." }, { status: 400 });
  }
  const reply = buildReply(message.trim());
  return NextResponse.json({ reply });
}
