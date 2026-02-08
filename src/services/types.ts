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

