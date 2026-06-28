# Phase 1 — Implementation Plan (for Claude Code)

> Read [`design/design-system.md`](./design/design-system.md) and
> [`product/brand-hierarchy.md`](./product/brand-hierarchy.md) in full
> before starting task 1. Each numbered task below is sized to be one
> Claude Code session / one commit, per the convention in root
> `CLAUDE.md`. Don't combine tasks across sessions; don't split a single
> task across multiple commits unless it genuinely fails the size check.

## Task 1 — Design tokens into Tailwind

Translate [`design/design-system.md`](./design/design-system.md) color/
typography/spacing tokens into actual Tailwind config (or `globals.css`
CSS variables, whichever fits the installed Tailwind version — check
`package.json`). Concretely:
- Color tokens with light/dark values (`bg-page`, `bg-raised`, `bg-card`,
  `text-primary`, `text-ink`, `text-secondary`, `border`, `accent`,
  `accent-bright`)
- Font families wired via `next/font/google` for Space Grotesk +
  JetBrains Mono (see `docs/raw/design/home-design-pass-1.html` for the
  exact weights used: Space Grotesk 400/500/600/700, JetBrains Mono
  400/500)
- Border-radius scale capped at 2–3px as the default (override the
  framework/component-library default, don't fight it page by page)
- Dark mode wired via Tailwind's `class` strategy

**Acceptance check:** a throwaway test page renders both light and dark
mode using only the new tokens, matching
`docs/raw/design/home-design-pass-1.html` visually (open that file
directly in a browser side-by-side).

## Task 2 — Shared layout shell

Build the root layout pieces that every page inherits:
- `NavBar` component (logo dot-pair + "NORA" wordmark + 3 links + mono
  CTA pill) — see Component 1 in `design-system.md`
- `Footer` component (logo+tagline column + 2 link columns + mono
  copyright line) — Component 7
- A light/dark mode toggle (placement: wherever fits the nav cleanly —
  use judgment, it's not specified in the locked design)

**Acceptance check:** NavBar + Footer render correctly in both modes on
a blank page; toggle actually switches the whole page, not just itself.

## Task 3 — Reusable content components

Build the remaining components from `design-system.md` as standalone,
reusable pieces (not hardcoded into one page):
- `Hero` (eyebrow + H1 + subhead + CTA row + slot for a side card)
- `StatChart` — the steady-vs-jagged-dashed SVG line chart with mono
  fig-caption/labels/legend, as a parameterized component (caption,
  labels, and legend text are props — this is what makes the "signature
  motif, generalized meaning" reuse in `design-system.md` actually work
  in code, not just in copy docs)
- `ContrastCardPair` (2-card grid, each with eyebrow + mini-chart + body)
- `MissionStatement` (centered pull-quote with accent-colored word/char slots)
- `PrincipleGrid` (3-col numbered grid)
- `DividerMotif` (thin SVG section divider)

**Acceptance check:** each component can be dropped into a Storybook-
style test page (or just a scratch route) with different prop values
and still look correct in both light and dark mode.

## Task 4 — NORA home / mission page

Build `(marketing)/page.tsx` using Tasks 2–3's components and the copy
in [`marketing/home-page-copy-v2.md`](./marketing/home-page-copy-v2.md)
**exactly** — including the re-captioned `StatChart` props (`SIGNAL vs.
NOISE`, not the dopamine-specific labels). Remove the Phase-0 placeholder
content entirely.

**Acceptance check:** page matches the locked design's structure/spacing
(reference: `docs/raw/design/home-design-pass-1.html`), copy matches
`home-page-copy-v2.md` exactly, nav wordmark reads "NORA."

## Task 5 — Generic product page template

Build `(shop)/products/[slug]/page.tsx` as a real template (data-driven
by slug, not hardcoded to NeuroDrive even though NeuroDrive is the only
entry right now — see
[`architecture/platform-vs-product.md`](./architecture/platform-vs-product.md)).
Content for this task is **placeholder-but-structurally-correct** for
NeuroDrive (real copy comes in a later, dedicated copywriting task) —
the goal here is the template/layout, reusing Hero/StatChart/etc. from
Task 3, with product-specific framing this time (NeuroDrive-level voice,
not NORA-level — see `product/brand-hierarchy.md`).

**Acceptance check:** visiting `/products/neurodrive` renders a
product-page-shaped layout using the locked design system; the template
itself contains no NeuroDrive-specific strings hardcoded outside of the
data it's fed.

## Task 6 — Checkout shell (manual-confirmation, UI only)

Build `(shop)/checkout` as a real form (per
[`architecture/manual-payment-flow.md`](./architecture/manual-payment-flow.md)):
name, email, phone, shipping address, product/quantity, optional note.
**No payment fields, no DB wiring yet** — this task is UI-only; form
submission can `console.log` for now. Visual treatment should feel
deliberate and trustworthy on submit (per the brief's "trustworthy, not
broken" requirement), not like a generic unstyled form.

**Acceptance check:** form renders in the locked design system, all
fields present per `manual-payment-flow.md`, submit state shows a
clearly-intentional confirmation UI (even though it's not wired to
anything real yet).

## Task 7 — Navigation wiring + deploy check

Wire real links between home → products/[slug] → checkout (and back),
confirm dark mode persists across navigation (not just per-page), run a
full build, deploy to Vercel, and do a manual click-through on the live
URL in both light and dark mode.

**Acceptance check:** a full click-through works end-to-end on the
deployed Vercel URL, no console errors, no broken nav links.

## Explicitly out of scope for Phase 1

- The NeuroDrive long-form advertorial (`(shop)/neurodrive`) — deferred
  per the non-advertorial-first sequencing decision (see
  [`design/brand-design-brief.md`](./design/brand-design-brief.md) and
  ADR 0007). Phase 1 ends after Task 7; the advertorial is its own
  follow-up phase once the design system has proven itself on simpler
  pages.
- Database, auth, real payment/email wiring (Phases 2–4)
- A second product (Phase 1 template must support it; don't build it
  yet)

## After Phase 1

Update [`roadmap.md`](./roadmap.md) to mark Phase 1 done, log the
outcome in `wiki/log.md`, and only then plan the advertorial page and
Phase 2 (database) in detail.
