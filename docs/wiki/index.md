# Wiki Index

Content-oriented catalog of everything in `docs/wiki/`. Updated on every
ingest/edit. Read this first when answering a question or starting a new
session — drill into specific pages from here rather than scanning the
whole wiki.

## Product knowledge

- [`product/overview.md`](./product/overview.md) — what NeuroDrive is, big
  idea, positioning anchor, UMP/UMS, discovery story
- [`product/avatar.md`](./product/avatar.md) — buyer demographics,
  psychographics, emotional journey, voice-of-customer phrases
- [`product/beliefs-and-objections.md`](./product/beliefs-and-objections.md)
  — belief chain required to buy, objection → response map, hard
  constraints
- [`product/brand-hierarchy.md`](./product/brand-hierarchy.md) — **NORA
  (platform) vs. NeuroDrive (product) — check before writing any copy**

## Marketing knowledge

- [`marketing/messaging-angles.md`](./marketing/messaging-angles.md) —
  angle families, validated headlines, sales-page structure
- [`marketing/competitive-landscape.md`](./marketing/competitive-landscape.md)
  — product-level competitors (Modafinil, Alpha Brain, Thesis, etc.) vs.
  platform-level competitors (Nootropics Depot, Umbrella Labs)
- [`marketing/home-page-copy-v1.md`](./marketing/home-page-copy-v1.md) —
  *(superseded by v2 — wrote at the NeuroDrive level, wrong for the home
  page)*
- [`marketing/home-page-copy-v2.md`](./marketing/home-page-copy-v2.md) —
  *(superseded by v3)*
- [`marketing/home-page-copy-v3.md`](./marketing/home-page-copy-v3.md) —
  *(superseded by v4 — dropped chart motif, replaced FeaturedRelease with ReleaseCatalog)*
- [`marketing/home-page-copy-v4.md`](./marketing/home-page-copy-v4.md) —
  **current home/mission copy** — chart-free Hero, ReleaseCatalog (1 live + 2 in-research slots)

## Architecture knowledge

- [`architecture/tech-stack.md`](./architecture/tech-stack.md) — stack
  choices with reasoning and rejected alternatives
- [`architecture/folder-structure.md`](./architecture/folder-structure.md)
  — route groups, `src/lib` layout, why `src/lib/copy/` exists
- [`architecture/data-model.md`](./architecture/data-model.md) — Phase 2
  DB schema sketch, open questions
- [`architecture/platform-vs-product.md`](./architecture/platform-vs-product.md)
  — scope-discipline rule (read before starting any new phase)
- [`architecture/manual-payment-flow.md`](./architecture/manual-payment-flow.md)
  — order lifecycle, checkout fields, email touchpoints (no payment
  gateway — see ADR 0005)

## Design knowledge

- [`design/brand-design-brief.md`](./design/brand-design-brief.md) —
  brand direction brief for Claude Design / frontend implementation
- [`design/design-system.md`](./design/design-system.md) — **locked
  design system** (tokens, typography, components) — implement every
  page against this, not ad hoc per-page styling
- [`design/design-tokens.md`](./design/design-tokens.md) — **authoritative
  color palette**, extracted directly from the existing logo + product
  label (supersedes the earlier color-temperature instinct)

## Decisions (ADR-style, append-only — never delete, supersede instead)

- [`decisions/0001-stack-and-repo-shape.md`](./decisions/0001-stack-and-repo-shape.md)
- [`decisions/0002-primary-ad-angle.md`](./decisions/0002-primary-ad-angle.md)
- [`decisions/0003-no-soviet-origin-angle.md`](./decisions/0003-no-soviet-origin-angle.md)
  — **hard constraint, check before any new advertorial**
- [`decisions/0004-platform-scope-discipline.md`](./decisions/0004-platform-scope-discipline.md)
- [`decisions/0005-manual-payment-flow.md`](./decisions/0005-manual-payment-flow.md)
  — **hard constraint: no Stripe / no payment gateway in code**
- [`decisions/0006-claude-design-for-ui-ux.md`](./decisions/0006-claude-design-for-ui-ux.md)
- [`decisions/0007-design-lock-in-and-brand-hierarchy.md`](./decisions/0007-design-lock-in-and-brand-hierarchy.md)
  — design system locked, Claude Design retired, NORA brand confirmed
- [`decisions/0008-phase-1.5-site-completeness.md`](./decisions/0008-phase-1.5-site-completeness.md)
  — Phase 1.5 inserted before Phase 2; cart hook pattern; pricing/legal constraints
- [`decisions/0009-retire-chart-motif-on-home.md`](./decisions/0009-retire-chart-motif-on-home.md)
  — abstract line-chart motif dropped from home page; optional on product page pending revisit

## Planning

- [`roadmap.md`](./roadmap.md) — phase-by-phase plan
- [`phase-1-implementation-plan.md`](./phase-1-implementation-plan.md) —
  Phase 1 task list *(done)*
- [`phase-1.5-implementation-plan.md`](./phase-1.5-implementation-plan.md) —
  **active task list for Claude Code** (site completeness), one task per session

## Backlog (sources not yet ingested / pages not yet written)

- `product/mechanism-and-science.md` — deeper bromantane mechanism +
  Soviet actoprotector science narrative (source material exists in
  `docs/raw/foundational/NeuroDrive_research_document.pdf`, pages on
  "Scientific & Story Angles" — not yet split into its own page)
- `marketing/voice-of-customer.md` — full categorized phrase bank (pain
  points, desired outcomes, metaphors, skepticism language) — currently
  only a small excerpt lives in `product/avatar.md`
- Figma label design knowledge (referenced in prior chat memory — not yet
  ingested into this wiki; lives only in chat history / Figma file
  `1AIByRxbbibNWrGDkkEVVn` for now)
- Sales page React/Next.js copy implementation knowledge (prior landing
  page work referenced in chat memory — not yet ingested)

See [`log.md`](./log.md) for the chronological record of what's been done.
