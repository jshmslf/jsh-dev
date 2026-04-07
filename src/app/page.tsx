"use client"

import { Profile } from "@/components/homepage/Profile";
import { ContentGrid } from "@/components/homepage/ContentGrid";
import { RowGrid } from "@/components/homepage/RowGrid";
import { SocialsCard } from "@/components/homepage/SocialsCard";
import { ThemeCard } from "@/components/homepage/ThemeCard";
import AnimatedContent from "@/components/AnimatedContent";

export default function HomePage() {
  return (
    <main
      className="content-wrapper"
      style={{
        padding: "34px 24px 20px",
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
        
      <Profile />
</AnimatedContent>
      <ContentGrid />
      <RowGrid columns={2} rowHeight="auto" gap="16px">
        <SocialsCard />
        <ThemeCard />
      </RowGrid>
    </main>
  );
}
