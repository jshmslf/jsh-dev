import type { BadgeItem, Section } from "./types";

const frontend: Section<BadgeItem> = {
    title: "Frontend",
    items: [
        { label: "Angular"},
        { label: "Vite" },
        { label: "SCSS" },
        { label: "TypeScript" },
        { label: "React" },
        { label: "Shadcn/UI" },
        { label: "Tailwind CSS" },
        { label: "ESLint" },
    ]
}

const backend: Section<BadgeItem> = {
    title: "Backend",
    items: [
        { label: "Node.js" },
        { label: "Python" },
        { label: "PHP" },
        { label: "PostreSQL" },
        { label: "MySQL" },
        { label: "MongoDB" },
        { label: "JWT" },
    ]
}

export const techService = {
    getPreview() {
        return [
            {
                ...frontend,
                items: frontend.items.slice(0, 6),
            },
            {
                ...backend,
                items: backend.items.slice(0, 4)
            }
        ]
    },

    getAll() {
        return [frontend, backend];
    }
}