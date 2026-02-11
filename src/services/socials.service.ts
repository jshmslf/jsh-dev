import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import type { Section, SocialsItem } from "./types"

const socialsSection: Section<SocialsItem> = {
    title: "Social Links",
    items: [
        {
            icon: FaLinkedin,
            social_title: 'LinkedIn',
            social_link: 'https://www.linkedin.com/in/jshmslf/'
        },
        {
            icon: FaGithub,
            social_title: 'GitHub',
            social_link: 'https://github.com/jshmslf'
        },
        {
            icon: FaInstagram,
            social_title: 'Instagram',
            social_link: 'https://www.instagram.com/jshmslf/'
        },
    ]
}

export const socialsService = {
    getAll() {
        return socialsSection;
    }
}