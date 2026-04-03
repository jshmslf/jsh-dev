import { Profile } from "@/components/homepage/Profile";
import { ContentGrid } from "@/components/homepage/ContentGrid";

export default function HomePage() {
  return (
    <main
      className="content-wrapper"
      style={{
        padding: "64px 24px 80px",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      <Profile />
      <ContentGrid />
    </main>
  );
}
