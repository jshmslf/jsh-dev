"use client";

import Image from "next/image";
import { BADGES } from "@/lib/config";
import { Tooltip } from "@/components/Tooltip";

export function BadgesSection() {
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
      {BADGES.map((badge) => (
        <Tooltip key={badge.id} text={badge.name}>
          <a
            href={badge.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", transition: "transform 0.2s ease, opacity 0.2s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Image
              src={badge.image}
              alt={badge.name}
              width={50}
              height={50}
              style={{ borderRadius: "var(--ui-radius)", objectFit: "contain" }}
            />
          </a>
        </Tooltip>
      ))}
    </div>
  );
}
