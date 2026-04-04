import { TechStackCard } from "./TechStackCard";
import { ThemeCard } from "./ThemeCard";
import { ExperienceCard } from "./ExperienceCard";
import { ProjectsCard } from "./ProjectsCard";
import { SocialsCard } from "./SocialsCard";
import { LocationCard } from "./LocationCard";
import { LikesCard } from "./LikesCard";

export function ContentGrid() {
  return (
    <div className="content-grid">
      {/* Left column */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <TechStackCard />
        <ProjectsCard />
      </div>

      {/* Right column */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <ExperienceCard />
        <LocationCard />
        <LikesCard />
        <SocialsCard />
        <ThemeCard />
      </div>
    </div>
  );
}
