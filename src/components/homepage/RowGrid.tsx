import { ReactNode, Children } from "react";

interface RowGridProps {
  children: ReactNode;
  rowHeight?: string;
  gap?: string;
}

export function RowGrid({ children, rowHeight = "auto", gap = "16px" }: RowGridProps) {
  const count = Children.count(children);

  return (
    <div
      className="row-grid"
      style={{
        gridTemplateColumns: `repeat(${count}, 1fr)`,
        gridAutoRows: rowHeight,
        gap,
      }}
    >
      {children}
    </div>
  );
}
