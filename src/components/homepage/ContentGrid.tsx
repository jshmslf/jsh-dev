import { TechStackCard } from "./TechStackCard";
import { ExperienceCard } from "./ExperienceCard";
import { ProjectsCard } from "./ProjectsCard";
import { LocationCard } from "./LocationCard";
import { LikesCard } from "./LikesCard";
import { DodgersCard } from "./DodgersCard";
import { HireMeCard } from "./HireMeCard";

export function ContentGrid() {
  return (
    <div className="content-grid">
      {/* Left column */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", height: "100%" }}>
        <TechStackCard />
        <ProjectsCard />
        <DodgersCard />
      </div>

      {/* Right column */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignSelf: "stretch" }}>
        <ExperienceCard />
        <HireMeCard />
        <LocationCard />
        <LikesCard />
      </div>
    </div>
  );
}
