import type { ExperienceItem, Section } from "./types"

const experienceSection: Section<ExperienceItem> = {
    title: "Experience",
    items: [
        {
            job_title: "Software Engineer",
            company_name: "Mayon Ventures",
            starting_year: "2025",
        }
    ]
}

export const experienceService = {
    // getPreview() {
    //     return {
    //         ...experienceSection,
    //         items: experienceSection.items
    //     };
    // },

    getAll() {
        return experienceSection;
    }
}