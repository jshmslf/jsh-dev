export const THEME_DEFAULTS = {
  accent: "#005A9C",  // Dodger blue — any hex from ACCENT_PRESETS
  radius: "0px",      // "0px" | "6px" | "14px" | "20px" | "999px"
  mode: "dark",      // "light" | "dark"
};

export const ACCENT_PRESETS = [
  { name: "Dodger", value: "#005A9C" },
  { name: "Spotify", value: "#1DB954" },
  { name: "Sage",    value: "#a8c5a0" },
  { name: "Blush",   value: "#f2a7b0" },
  { name: "Sky",     value: "#a0c4e8" },
  { name: "Peach",   value: "#f7c59f" },
  { name: "Lilac",   value: "#c3aed6" },
  { name: "Mint",    value: "#a0e4c8" },
  { name: "Butter",  value: "#f5e6a3" },
  { name: "Rose",    value: "#e8a0b4" },
];

export const RADIUS_PRESETS = [
  { label: "None", value: "0px" },
  { label: "SM",   value: "6px" },
  { label: "MD",   value: "14px" },
  { label: "LG",   value: "20px" },
];

export const PROJECTS = [
  {
    title: "Jointify",
    description: "A smart budgeting web app for couples to track joint finances and generate instant financial summaries.",
    link: "developing",
  },
  {
    title: "Xtream",
    description: "A movie and TV streaming web app featuring personalized AI recommendations and a custom bucket list for tracking watch history.",
    link: "https://xtream-now.vercel.app",
  },
  {
    title: "W",
    description: 'A community-focused social media platform designed as a lightweight "X" clone for private or niche group interactions.',
    link: "https://w-social.vercel.app",
  },
  {
    title: "GWAko",
    description: "A specialized academic tool for PSU students that calculates GWA based on official university standards to track eligibility for honors and scholarships.",
    link: "https://gwako.onrender.com",
  },
];

export const SOCIALS = [
  { title: "GitHub", url: "https://github.com/jshmslf" },
  { title: "LinkedIn", url: "https://www.linkedin.com/in/jshmslf/" },
  { title: "Instagram", url: "https://instagram.com/jshmslf" },
  { title: "Email", url: "mailto:joshuaverceles@email.com" },
];

export const TECH_STACK = {
  frontend: ["Angular", "Next.js", "TypeScript", "React Native", "Tailwind CSS"],
  backend: ["Node.js", "Python", "FastAPI", "PostgreSQL", "Redis"],
  devTools: ["Git", "Docker", "Linux", "Figma", "VS Code"],
};

export const EXPERIENCE = [
  {
    title: "Software Engineer",
    company: "Mayon Capital",
    year: "2025",
    current: true,
  },
  {
    title: "System Developer",
    company: "Provincial Engineering Office of Pangasinan",
    year: "2025",
    current: false,
  },
  {
    title: "BS Computer Science",
    company: "Pangasinan State University — Lingayen Campus",
    year: "2025",
    current: false,
  },
  {
    title: "Hello World!",
    company: "Wrote my first line of code",
    year: "2018",
    current: false,
  },
];
