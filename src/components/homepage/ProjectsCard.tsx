import { PROJECTS } from "@/lib/config";
import { Card } from "./Card";

const MAX = 4;

export function ProjectsCard() {
  const visible = PROJECTS.slice(0, MAX);
  const hasMore = PROJECTS.length > MAX;

  return (
    <Card
      title="Recent Projects"
      viewAll={hasMore ? { href: "/projects" } : undefined}
    >
      <style>{`
        .project-item {
          display: flex;
          align-items: stretch;
          border-radius: var(--ui-radius);
          border: 1px solid var(--border);
          text-decoration: none;
          overflow: hidden;
          transition: border-color 0.2s ease;
          cursor: pointer;
        }
        .project-item:hover {
          border-color: var(--primary);
        }
        .project-action {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          width: 0;
          overflow: hidden;
          background: var(--primary);
          color: var(--background);
          transition: width 0.25s ease;
          flex-shrink: 0;
        }
        .project-item:hover .project-action {
          width: 64px;
        }
        .project-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
          padding: 12px 14px;
        }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {visible.map((project, i) => {
          const isDeveloping = project.link === "developing";

          const content = (
            <>
              <div className="project-action">
                {isDeveloping ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.55rem", fontWeight: 600, textAlign: "center", whiteSpace: "nowrap" }}>Building</span>
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>
                    <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.55rem", fontWeight: 600, whiteSpace: "nowrap" }}>Visit</span>
                  </>
                )}
              </div>
              <div className="project-content">
                <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.875rem", fontWeight: 600, color: "var(--foreground)" }}>
                  {project.title}
                </span>
                <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.8rem", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
                  {project.description}
                </span>
              </div>
            </>
          );

          return isDeveloping ? (
            <div key={i} className="project-item" style={{ cursor: "default" }}>
              {content}
            </div>
          ) : (
            <a key={i} href={project.link} target="_blank" rel="noopener noreferrer" className="project-item">
              {content}
            </a>
          );
        })}
      </div>
    </Card>
  );
}
