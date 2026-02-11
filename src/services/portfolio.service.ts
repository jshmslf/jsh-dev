import { experienceService } from "./experience.service"
import { projectService } from "./projects.service"
import { socialsService } from "./socials.service"
import { techService } from "./tech.service"

export const portfolioService = {
    home() {
        return {
            tech: techService.getPreview(),
            experience: experienceService.getAll(),
            project: projectService.getPreview(),
            socials: socialsService.getAll(),
        }
    }
}