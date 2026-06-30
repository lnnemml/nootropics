import { Container } from "@/components/layout/Container";

export function DividerMotif() {
  return (
    <Container>
      <svg viewBox="0 0 1136 36" width="100%" style={{ display: "block" }}>
        <path
          d="M0 26 L500 26 L524 8 L540 32 L562 26 L1136 26"
          fill="none"
          stroke="var(--color-ink)"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="524" cy="8" r="3.5" fill="var(--color-accent-bright)" />
      </svg>
    </Container>
  );
}
