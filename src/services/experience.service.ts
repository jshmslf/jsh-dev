import type { ExperienceItem, Section } from "./types"

const experienceSection: Section<ExperienceItem> = {
    title: "Experience",
    items: [
        {
            job_title: "Software Engineer",
            company_name: "Mayon Ventures",
            starting_year: "2025",
        },
        {
            job_title: "System Developer (Intern)",
            company_name: "Provincial Engineering Office of Pangasinan",
            starting_year: "2025"
        },
        {
            job_title: "BS Computer Science",
            company_name: "Pangasinan State University - Lingayen Campus",
            starting_year: "2025"
        },
    ]
}

export const experienceService = {
    getAll() {
        return experienceSection;
    }
}