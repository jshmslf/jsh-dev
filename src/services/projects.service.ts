import type { ProjectItem, Section } from "./types"

const projectSection: Section<ProjectItem> = {
    title: "Recent Projects",
    items: [
        {
            project_title: 'W',
            project_desc: 'X Clone App',
            project_link: 'w-social.vercel.app',
        },
        {
            project_title: 'GWAko',
            project_desc: 'GWA calculator designed for PSU',
            project_link: 'gwako.onrender.com',
        },
    ]
}

export const projectService = {
    getPreview() {
        return projectSection.items.slice(0, 4);
    },

    getAll() {
        return projectSection;
    }
}