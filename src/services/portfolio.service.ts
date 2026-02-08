import { experienceService } from "./experience.service"
import { techService } from "./tech.service"

export const portfolioService = {
    home() {
        return {
            tech: techService.getPreview(),
            experience: experienceService.getAll(),
        }
    }
}