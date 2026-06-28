interface MiniChartProps {
  variant: "steady" | "jagged";
}

export function MiniChart({ variant }: MiniChartProps) {
  return (
    <svg viewBox="0 0 300 120" width="100%" style={{ display: "block" }}>
      {/* Baseline */}
      <line
        x1="0"
        y1="102"
        x2="300"
        y2="102"
        stroke="var(--color-secondary)"
        strokeOpacity="0.2"
        strokeWidth="1"
      />
      {variant === "steady" ? (
        <>
          <path
            d="M8 98 C90 98 112 52 162 46 C214 40 256 36 292 31"
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="292" cy="31" r="4.5" fill="#14B089" />
        </>
      ) : (
        <path
          d="M8 96 L70 88 L120 16 L152 108 L205 102 L292 104"
          fill="none"
          stroke="var(--color-secondary)"
          strokeWidth="2"
          strokeDasharray="4 5"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
