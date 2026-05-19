import { notFound } from "next/navigation";
import { PROJECTS, TECH_ICONS } from "@/lib/config";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title };
}

function StackChip({ name }: { name: string }) {
  const icon = TECH_ICONS[name];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontFamily: "var(--font-geist-mono)",
        fontSize: "0.75rem",
        color: "var(--foreground)",
        background: "var(--muted)",
        border: "1px solid var(--border)",
        borderRadius: "var(--ui-radius)",
        padding: "3px 10px",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {icon && <img src={icon} alt="" width={14} height={14} style={{ display: "block" }} />}
      {name}
    </span>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const isDeveloping = project.link === "developing";

  return (
    <main
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "40px 20px 80px",
        display: "flex",
        flexDirection: "column",
        gap: "28px",
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
          {project.title}
        </span>
        <a
          href="/projects"
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

      <div className="card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
          <span
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1rem",
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
                padding: "3px 8px",
              }}
            >
              building
            </span>
          ) : (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.75rem",
                color: "var(--primary)",
                textDecoration: "none",
              }}
            >
              visit
            </a>
          )}
        </div>

        <p
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "0.875rem",
            color: "var(--muted-foreground)",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {project.description}
        </p>

        {project.images.length > 0 && (
          <style>{`
            .detail-gallery { display: flex; gap: 10px; flex-wrap: wrap; }
            .detail-gallery img {
              flex: 1;
              min-width: 160px;
              height: 140px;
              object-fit: cover;
              border-radius: var(--ui-radius);
              border: 1px solid var(--border);
            }
          `}</style>
        )}

        {project.images.length > 0 && (
          <div className="detail-gallery">
            {project.images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} alt="" />
            ))}
          </div>
        )}

        {project.stack.length > 0 && (
          <div>
            <p
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: "0.7rem",
                color: "var(--muted-foreground)",
                margin: "0 0 8px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Stack
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {project.stack.map((tech) => (
                <StackChip key={tech} name={tech} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
