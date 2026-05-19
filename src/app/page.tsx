"use client"

import { Profile } from "@/components/homepage/Profile";
import { ContentGrid } from "@/components/homepage/ContentGrid";
import { RowGrid } from "@/components/homepage/RowGrid";
import { SocialsCard } from "@/components/homepage/SocialsCard";
import { ThemeCard } from "@/components/homepage/ThemeCard";
import AnimatedContent from "@/components/AnimatedContent";
import { AvengersCard } from "@/components/homepage/AvengersCard";

export default function HomePage() {
  return (
    <main
      className="content-wrapper"
      style={{
        padding: "50px 24px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <AnimatedContent
        distance={100}
        direction="vertical"
        reverse={false}
        duration={0.8}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.1}
        delay={0}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: "24px" }}>
          <Profile />
        </div>
      </AnimatedContent>

      <AnimatedContent
        distance={100}
        direction="vertical"
        reverse={false}
        duration={0.8}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.1}
        delay={0.3}
      >
        <ContentGrid />
      </AnimatedContent>

      <AnimatedContent
        distance={100}
        direction="vertical"
        reverse={false}
        duration={0.8}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.1}
        delay={0.5}
      >

        <RowGrid rowHeight="auto" gap="16px">
          <SocialsCard />
          <AvengersCard />
          <ThemeCard />
        </RowGrid>
      </AnimatedContent>

    </main>
  );
}
