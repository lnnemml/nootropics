const MONO_FONT = "var(--font-jetbrains-mono, monospace)";

interface StatChartProps {
  caption: string;
  solidLabel: string;
  dashedPeakLabel: string;
  dashedEndLabel: string;
  legendSolid: string;
  legendDashed: string;
}

export function StatChart({
  caption,
  solidLabel,
  dashedPeakLabel,
  dashedEndLabel,
  legendSolid,
  legendDashed,
}: StatChartProps) {
  return (
    <figure className="border border-border rounded overflow-hidden">
      <div className="p-6">
        <svg viewBox="0 0 680 300" width="100%" style={{ display: "block" }}>
          {/* Dashed jagged curve */}
          <path
            d="M30 240 L150 232 L250 58 L322 254 L420 248 L662 250"
            fill="none"
            stroke="var(--color-secondary)"
            strokeWidth="2"
            strokeDasharray="4 5"
            strokeLinejoin="round"
          />
          {/* Solid smooth curve */}
          <path
            d="M30 236 C150 236 188 152 305 142 C432 132 545 120 662 113"
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Start dot */}
          <circle cx="30" cy="236" r="5" fill="#1E9C78" />
          {/* End dot */}
          <circle cx="662" cy="113" r="5" fill="#14B089" />

          {/* Solid curve label */}
          <text
            x="468"
            y="100"
            fill="var(--color-ink)"
            fontSize="10"
            fontWeight="500"
            letterSpacing="0.1em"
            style={{ fontFamily: MONO_FONT }}
          >
            {solidLabel}
          </text>

          {/* Dashed peak label */}
          <text
            x="222"
            y="46"
            fill="var(--color-secondary)"
            fontSize="10"
            letterSpacing="0.1em"
            style={{ fontFamily: MONO_FONT }}
          >
            {dashedPeakLabel}
          </text>

          {/* Dashed end label */}
          <text
            x="528"
            y="244"
            fill="var(--color-secondary)"
            fontSize="10"
            letterSpacing="0.1em"
            style={{ fontFamily: MONO_FONT }}
          >
            {dashedEndLabel}
          </text>
        </svg>
      </div>

      <figcaption className="border-t border-border px-6 py-4 flex items-center justify-between gap-4">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.12em] text-secondary"
        >
          {caption}
        </span>
        <span className="flex items-center gap-5 shrink-0">
          {/* Solid legend */}
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-[2px] w-5 rounded-full"
              style={{ backgroundColor: "var(--color-ink)" }}
            />
            <span className="font-mono text-[10px] tracking-[0.08em] text-secondary">
              {legendSolid}
            </span>
          </span>
          {/* Dashed legend */}
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-[2px] w-5"
              style={{
                background:
                  "repeating-linear-gradient(to right, var(--color-secondary) 0, var(--color-secondary) 4px, transparent 4px, transparent 8px)",
              }}
            />
            <span className="font-mono text-[10px] tracking-[0.08em] text-secondary">
              {legendDashed}
            </span>
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
