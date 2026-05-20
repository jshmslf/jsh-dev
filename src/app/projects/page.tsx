import { PROJECTS, TECH_ICONS } from "@/lib/config";
import Link from "next/link";

function StackChip({ name }: { name: string }) {
  const icon = TECH_ICONS[name];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontFamily: "var(--font-geist-mono)",
        fontSize: "0.65rem",
        color: "var(--foreground)",
        background: "var(--muted)",
        border: "1px solid var(--border)",
        borderRadius: "var(--ui-radius)",
        padding: "2px 7px",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {icon && <img src={icon} alt="" width={12} height={12} style={{ display: "block" }} />}
      {name}
    </span>
  );
}

export default function ProjectsPage() {
  return (
    <main
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "40px 20px 80px",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "var(--foreground)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Projects
        </span>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.75rem",
            color: "var(--primary)",
            textDecoration: "none",
          }}
        >
          back
        </Link>
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 860px) {
          .projects-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .projects-grid { grid-template-columns: 1fr; }
        }
        .project-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 0;
          overflow: hidden;
          transition: border-color 0.2s ease;
          text-decoration: none;
        }
        .project-card:hover { border-color: var(--primary); }
        .project-thumbnail-wrapper {
          overflow: hidden;
        }
        .project-thumbnail {
          width: 100%;
          height: 140px;
          object-fit: cover;
          display: block;
          border-bottom: 1px solid var(--border);
          background: var(--muted);
          transition: transform 0.35s ease;
        }
        .project-card:hover .project-thumbnail {
          transform: scale(1.06);
        }
        .project-thumbnail-placeholder {
          width: 100%;
          height: 140px;
          background: var(--muted);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .project-card-body {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 14px 16px 16px;
          flex: 1;
        }
        .project-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
        }
        .project-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: auto;
        }
      `}</style>

      <div className="projects-grid">
        {PROJECTS.map((project) => {
          const isDeveloping = project.link === "developing";

          return (
            <a key={project.slug} href={`/projects/${project.slug}`} className="card project-card">
              <div className="project-thumbnail-wrapper">
                {project.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.image} alt={project.title} className="project-thumbnail" />
                ) : (
                  <div className="project-thumbnail-placeholder">
                    <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.65rem", color: "var(--muted-foreground)" }}>
                      no preview
                    </span>
                  </div>
                )}
              </div>

              <div className="project-card-body">
                <div className="project-card-header">
                  <span
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      color: "var(--foreground)",
                    }}
                  >
                    {project.title}
                  </span>
                  {isDeveloping && (
                    <span
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.6rem",
                        color: "var(--muted-foreground)",
                        background: "var(--muted)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--ui-radius)",
                        padding: "2px 6px",
                        flexShrink: 0,
                      }}
                    >
                      building
                    </span>
                  )}
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.775rem",
                    color: "var(--muted-foreground)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {project.description}
                </p>

                {project.stack.length > 0 && (
                  <div className="project-stack">
                    {project.stack.map((tech) => (
                      <StackChip key={tech} name={tech} />
                    ))}
                  </div>
                )}
              </div>
            </a>
          );
        })}
      </div>
    </main>
  );
}
