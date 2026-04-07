import { ReactNode } from "react";
import { SocialsCard } from "./SocialsCard";
import { ThemeCard } from "./ThemeCard";

interface RowGridProps {
  columns: number;
  children: ReactNode;
  rowHeight?: string;
  gap?: string;
}

export function RowGrid({ columns, rowHeight = "300px", gap = "16px" }: RowGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridAutoRows: rowHeight === "auto" ? "auto" : rowHeight,
        gap,
        width: "100%",
      }}
    >
      <SocialsCard/>
      <ThemeCard />
    </div>
  );
}
