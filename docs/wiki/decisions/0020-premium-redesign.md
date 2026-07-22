# ADR 0020 — Premium Visual Redesign of `/go` Landing Page

**Date:** 2026-07-15
**Status:** Accepted
**Relates to:** ADR 0019 (DR landing page)

## Decision

Apply a premium visual redesign to the entire `/go` landing page, elevating it from
functional placeholder styling to luxury-tier design quality. The redesign targets the
aesthetic level of Aesop, Seed, Eight Sleep, and Linear.

Claude Design (Fable model) was used to produce the redesign mockup with full Tailwind
handoff spec. The spec lives at `docs/raw/design/handoff-spec.md` with HTML mockups at
`docs/raw/design/Redesign.dc.html` (desktop) and `docs/raw/design/Redesign Mobile.dc.html`
(mobile).

## Context

The initial `/go` build prioritized structure and content. Placeholder styling was
functional but not premium — flat backgrounds, basic cards, emoji icons, default spacing.
For a $120/bottle product targeting rational optimizers, the visual quality must signal
the same precision and authority as the copy.

## What Changed

Visual/CSS only — no content, structure, or component logic changes:

- **Section rhythm:** padding bumped to 140px desktop / 88px mobile (from ~64-96px)
- **Dark sections:** noise/grain texture overlay, gradient backgrounds (not flat color),
  teal glow accents, hairline teal dividers between sections
- **CTA buttons:** gradient with inset highlight, hover lift + glow intensify
- **Hero carousel:** glass frame mount with teal radial glow halo, pill-style dot indicators
- **Image mounts:** all images wrapped in glass-border frames with deep shadows
- **Quote cards:** gradient backgrounds, teal left border, 110px decorative quote marks,
  hover lift with shadow deepen
- **Benefit icons:** white bordered containers (64×64) with hover lift, SVG stroke icons
- **Video placeholders:** redesigned as poster frames with glass play button + duration chip
- **FAQ accordion:** CSS grid-rows animation, teal left border on active item, rotating `+` icon
- **S07 product photo:** offset teal outline frame behind image for depth
- **S10 comparison table:** teal-glow border frame treatment
- **S15 final CTA:** teal-to-forest gradient overlay, vignette, 54px headline, oversized white button
- **Typography:** refined sizing, tracking, and weight hierarchy across all sections

## Key Design Patterns (reusable)

Custom CSS utilities in `globals.css`:
- `.noise-overlay` — SVG fractal noise at 4.5% opacity
- `.cta-gradient` — 3-stop teal gradient with inset highlight shadow
- `.teal-glow` — radial gradient for ambient glow effects
- `.teal-hairline` — horizontal gradient line for section edges
- `.image-frame` / `.image-frame-teal` — glass-border image mounts
- `.quote-card` — gradient card with teal left border and hover lift
- `.section-heading-dash` — teal dash prefix before section headings

Recurring class tokens:
- FRAME — image mount classes for dark sections
- QUOTE-CARD — dark gradient card classes
- H2-HEADER — teal dash + heading flex layout
- SECTION-PAD — `py-[140px]` desktop / `py-[88px]` mobile

## Consequences

- Claude Design re-enters the workflow for visual design passes (supersedes ADR 0007's
  "Claude Design retired" for the `/go` page only — main site design system unchanged)
- The `/go` page now has its own visual language that's more aggressive than the main site
- Custom CSS utilities are scoped to `/go` usage but live in global `globals.css`
- All future `/go` section edits should reference `handoff-spec.md` for consistent styling

## Revisit if

- Main site needs similar premium treatment (extract shared utilities)
- Performance audit shows noise overlay or shadows impacting LCP/CLS
- Mobile conversion data suggests the heavier design hurts load times on 3G
