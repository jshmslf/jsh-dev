interface SkeletonProps {
  height?: string | number;
  width?: string | number;
  style?: React.CSSProperties;
}

export function Skeleton({ height = "16px", width = "100%", style }: SkeletonProps) {
  return (
    <div
      className="skeleton"
      style={{ height, width, flexShrink: 0, ...style }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div
      className="card"
      style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px", background: "var(--card)" }}
    >
      <Skeleton height="14px" width="35%" />
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Skeleton height="12px" width="90%" />
        <Skeleton height="12px" width="70%" />
      </div>
    </div>
  );
}
