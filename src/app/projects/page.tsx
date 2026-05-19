import { PROJECTS, TECH_ICONS } from "@/lib/config";

function StackChip({ name }: { name: string }) {
  const icon = TECH_ICONS[name];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontFamily: "var(--font-geist-mono)",
        fontSize: "0.7rem",
        color: "var(--foreground)",
        background: "var(--muted)",
        border: "1px solid var(--border)",
        borderRadius: "var(--ui-radius)",
        padding: "3px 8px",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {icon && <img src={icon} alt="" width={13} height={13} style={{ display: "block" }} />}
      {name}
    </span>
  );
}

export default function ProjectsPage() {
  return (
    <main
      style={{
        maxWidth: "860px",
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
        <a
          href="/"
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.75rem",
            color: "var(--primary)",
            textDecoration: "none",
          }}
        >
          back
        </a>
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 640px) {
          .projects-grid { grid-template-columns: 1fr; }
        }
        .project-card {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 20px;
          cursor: pointer;
          transition: border-color 0.2s ease;
        }
        .project-card:hover {
          border-color: var(--primary);
        }
        .project-card-cover {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .project-card-header {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
        }
        .project-card-body {
          position: relative;
          z-index: 1;
        }
        .project-visit-link {
          position: relative;
          z-index: 1;
          font-family: var(--font-geist-mono);
          font-size: 0.7rem;
          color: var(--primary);
          text-decoration: none;
          white-space: nowrap;
          padding-top: 2px;
          flex-shrink: 0;
        }
        .project-visit-link:hover { text-decoration: underline; }
        .project-thumbnails {
          position: relative;
          z-index: 1;
          display: flex;
          gap: 8px;
        }
        .project-thumbnail {
          flex: 1;
          height: 110px;
          object-fit: cover;
          border-radius: var(--ui-radius);
          border: 1px solid var(--border);
          background: var(--muted);
        }
        .project-stack {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
      `}</style>

      <div className="projects-grid">
        {PROJECTS.map((project) => {
          const isDeveloping = project.link === "developing";
          const thumbs = project.images.slice(0, 3);

          return (
            <div key={project.slug} className="card project-card">
              {/* Cover link makes the whole card clickable */}
              <a href={`/projects/${project.slug}`} className="project-card-cover" aria-label={project.title} />

              <div className="project-card-header">
                <span
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "var(--foreground)",
                  }}
                >
                  {project.title}
                </span>
                {isDeveloping ? (
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.65rem",
                      color: "var(--muted-foreground)",
                      background: "var(--muted)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--ui-radius)",
                      padding: "2px 7px",
                      flexShrink: 0,
                      paddingTop: "3px",
                    }}
                  >
                    building
                  </span>
                ) : (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-visit-link"
                  >
                    visit
                  </a>
                )}
              </div>

              <p
                className="project-card-body"
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.8rem",
                  color: "var(--muted-foreground)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {project.description}
              </p>

              {thumbs.length > 0 && (
                <div className="project-thumbnails">
                  {thumbs.map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={src} alt="" className="project-thumbnail" />
                  ))}
                </div>
              )}

              {project.stack.length > 0 && (
                <div className="project-stack">
                  {project.stack.map((tech) => (
                    <StackChip key={tech} name={tech} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
