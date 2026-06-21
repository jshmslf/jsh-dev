export const CERTIFICATES = [
  { title: "Ethical Hacker", issuer: "Cisco" },
];

export const BADGES = [
  {
    id: "ethical-hacker",
    name: "Certified Ethical Hacker",
    image: "/assets/badges/ethical-hacker.png",
    host: "https://www.credly.com",
    url: "https://www.credly.com/badges/c60bdddc-d589-4bb6-99d0-e4ea8f23ff35",
  },
];

export const THEME_DEFAULTS = {
  accent: "#005A9C",  // Dodger blue — any hex from ACCENT_PRESETS
  radius: "0px",      // "0px" | "6px" | "14px" | "20px" | "999px"
  mode: "dark",      // "light" | "dark"
};

export const ACCENT_PRESETS = [
  { name: "Dodger", value: "#005A9C" },
  { name: "Spotify", value: "#1DB954" },
  { name: "Blush",   value: "#f2a7b0" },
  { name: "Sky",     value: "#a0c4e8" },
  { name: "Peach",   value: "#f7c59f" },
  { name: "Lilac",   value: "#c3aed6" },
  { name: "Butter",  value: "#f5e6a3" },
];

export const RADIUS_PRESETS = [
  { label: "None", value: "0px" },
  { label: "SM",   value: "6px" },
  { label: "MD",   value: "14px" },
  { label: "LG",   value: "20px" },
];

export const PROJECTS = [
  {
    title: "Tracr",
    slug: "tracr",
    description: "A job application tracker that helps users organize and monitor their application progress, paired with a browser extension for easier, on-the-spot tracking — see GitHub repo for the extension.",
    link: "https://tracr-web.vercel.app",
    image: "/assets/siteshot/tracr.webp",
    github: "",
    stack: ["Next.js", "Python", "PostgreSQL", "Vercel"],
  },
  {
    title: "Vault",
    slug: "vault",
    description: "A mobile password manager with a password aging system that detects weak or outdated passwords and recommends stronger replacements.",
    link: "https://github.com/jshmslf/vault-mobile",
    image: "/assets/siteshot/vault.webp",
    github: "https://github.com/jshmslf/vaullt-mobile-backend",
    stack: ["React Native", "Python", "PostgreSQL", "Android"],
  },
  {
    title: "Jointify",
    slug: "jointify",
    description: "A smart budgeting web app for couples to track joint finances and generate instant financial summaries.",
    link: "https://jointify-web.vercel.app/",
    image: "/assets/siteshot/jointify.webp",
    github: "",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "OnRender", "Vercel"],
  },
  {
    title: "Xtream",
    slug: "xtream",
    description: "A movie and TV streaming web app featuring personalized AI recommendations and a custom bucket list for tracking watch history.",
    link: "https://xtream-now.vercel.app",
    image: "/assets/siteshot/xtream.webp",
    github: "",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
  },
  {
    title: "W",
    slug: "w",
    description: 'A community-focused social media platform designed as a lightweight "X" clone for private or niche group interactions.',
    link: "https://w-social.vercel.app",
    image: "",
    github: "",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
  },
  {
    title: "GWAko",
    slug: "gwako",
    description: "A specialized academic tool for PSU students that calculates GWA based on official university standards to track eligibility for honors and scholarships.",
    link: "https://gwako.onrender.com",
    image: "",
    github: "",
    stack: ["React", "Node.js", "PostgreSQL"],
  },
];

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
export const TECH_ICONS: Record<string, string> = {
  "Angular":      `${DEVICON}/angular/angular-original.svg`,
  "Next.js":      `${DEVICON}/nextjs/nextjs-original.svg`,
  "TypeScript":   `${DEVICON}/typescript/typescript-original.svg`,
  "React Native": `${DEVICON}/react/react-original.svg`,
  "React":        `${DEVICON}/react/react-original.svg`,
  "Tailwind CSS": `${DEVICON}/tailwindcss/tailwindcss-original.svg`,
  "Node.js":      `${DEVICON}/nodejs/nodejs-original.svg`,
  "Python":       `${DEVICON}/python/python-original.svg`,
  "FastAPI":      `${DEVICON}/fastapi/fastapi-original.svg`,
  "PostgreSQL":   `${DEVICON}/postgresql/postgresql-original.svg`,
  "Redis":        `${DEVICON}/redis/redis-original.svg`,
  "Git":          `${DEVICON}/git/git-original.svg`,
  "Vercel":       `${DEVICON}/vercel/vercel-original.svg`,
  "Docker":       `${DEVICON}/docker/docker-original.svg`,
  "Linux":        `${DEVICON}/linux/linux-original.svg`,
  "Figma":        `${DEVICON}/figma/figma-original.svg`,
  "VS Code":      `${DEVICON}/vscode/vscode-original.svg`,
};

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
