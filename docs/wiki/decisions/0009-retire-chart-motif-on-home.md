# ADR 0009 — Retire chart motif on home page

## Decision

The abstract steady/jagged SVG line-chart motif (StatChart in Hero,
MiniChart in ContrastCardPair) is dropped from the home page as of
the v4 copy pass (2026-06-30). `Hero.chart` and
`ContrastCardPair.cards[].chartVariant` are made optional rather
than removed, so the product page (which still uses the motif) compiles
unchanged.

## Context

Anton reviewed the v3 home page live in the browser. Direct feedback:
"looks generic, like fake data." The motif was originally designed for
NeuroDrive's dopamine/mechanism story — where the steady vs. jagged curves
map to a real, named physiological dynamic. Generalized to the NORA
platform level (relabeled SIGNAL vs. NOISE / VALIDATED / HYPED / FORGOTTEN)
the same SVG loses its grounding and reads as decorative infographic,
contradicting the page's core claim that NORA doesn't hype without
evidence.

## Consequences

- Home page Hero is now text-only (single-column, max-width constrained).
- ContrastCardPair cards on the home page are text-only — the "two methods"
  point is carried by the copy, not the charts.
- The motif remains on the NeuroDrive product page (SUSTAINED vs. SPIKED,
  dopamine framing) where it has a concrete referent.
- **Revisit trigger:** once the product page goes through its own polish
  pass (Phase 1.5 item 3), evaluate whether the motif still earns its place
  there or whether visual consistency with the chart-free home page argues
  for dropping it site-wide. Don't leave "charts on product / no charts on
  home" as a permanent divergence without a conscious decision.

## Revisit if

- The product page polish pass drops the motif there too (then remove the
  StatChart/MiniChart components if nothing else uses them).
- A future page (e.g. a mechanism explainer article) finds a use case where
  real data is visualized — that's a different thing from the decorative
  steady/jagged pair and is fine to add as a new component.
