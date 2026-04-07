import { ReactNode } from "react";

interface RowGridProps {
  columns: number;
  children: ReactNode;
  rowHeight?: string;
  gap?: string;
}

export function RowGrid({ columns, children, rowHeight = "auto", gap = "16px" }: RowGridProps) {
  return (
    <div
      className="row-grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridAutoRows: rowHeight,
        gap,
      }}
    >
      {children}
    </div>
  );
}
