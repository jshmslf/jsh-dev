import type { IconType } from "react-icons";

export type PreviewConfig = {
    limit?: number;
};

export type BadgeItem = {
    label: string;
};

export type Section<T> = {
    title: string;
    items: T[];
};

export type ExperienceItem = {
    job_title: string,
    company_name: string,
    starting_year: string,
    ending_year?: string,
};

export type ProjectItem = {
    project_title: string,
    project_desc: string,
    project_link?: string,
};

export type SocialsItem = {
    icon: IconType,
    social_title: string,
    social_link: string,
};

