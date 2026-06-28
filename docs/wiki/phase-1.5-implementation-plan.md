# Phase 1.5 — Site Completeness — Implementation Plan

> Read [`product/beliefs-and-objections.md`](./product/beliefs-and-objections.md),
> [`design/design-system.md`](./design/design-system.md), and this file's
> task list before starting. Same convention as Phase 1: one task per
> Claude Code session/commit.

## Task 1 — Product photo + price block on the product page

- Drop in `docs/raw/design/product_shot_without_bg.jpeg` as the
  NeuroDrive product image (optimize via `next/image`, responsive sizes,
  not a raw `<img>` tag)
- Price block: **placeholder/TBD until Anton supplies real numbers** —
  build the UI slot (price, compare-at-price if there's a subscription
  discount, "subscribe & save" toggle per the offer brief's multi-bottle/
  subscription framework) with an obviously-fake placeholder value so
  it's visually complete but nobody mistakes it for a real price.
- **Do not invent a real price.** If Anton hasn't supplied one by the
  time this task starts, flag it back rather than guessing.

## Task 2 — Cart with localStorage persistence

- Build a `useCart` hook (or context) as the single interface for
  add/remove/update-quantity/clear — **all cart UI reads/writes through
  this hook, never localStorage directly.** This is what makes the
  Phase 4 swap to a DB-backed cart a hook-internals change, not a UI
  rewrite.
- Cart drawer/page component using `design-system.md`'s locked tokens
  (no new visual patterns)
- Persist to `localStorage`, hydrate on mount with the same
  flicker-avoidance approach already used for the dark-mode toggle (see
  Phase 1 Task 2's `ThemeToggle` — same `mounted` guard pattern applies
  here)

## Task 3 — About page

- `(marketing)/about` — deeper mission content than the home page's
  brief mission section. Source: `product/overview.md`,
  `product/brand-hierarchy.md` (NORA's identity, why mechanism-first,
  why curated not exhaustive — same material as the home page principles,
  expanded into full paragraphs rather than 1-2 lines each)
- Reuses existing components (`MissionStatement`, `PrincipleGrid`, etc.)
  — this page should not need new component types

## Task 4 — FAQ page

- `(marketing)/faq` — every entry in
  [`product/beliefs-and-objections.md`](./product/beliefs-and-objections.md)'s
  objection table becomes one FAQ Q&A pair. This is largely a content-
  transcription task, not new copywriting — don't editorialize the
  existing objection responses, they're already calibrated.
- Simple accordion or flat Q&A list — check `design-system.md` for
  whether an accordion pattern already exists; if not, this is a small,
  legitimate new component, not scope creep.

## Task 5 — Legal/technical pages

- Terms of Service, Privacy Policy, Refund Policy, Shipping Policy
- **These are AI-drafted starting templates, not legally reviewed final
  text.** Say so visibly in the commit message and flag to Anton — do
  not present these as launch-ready without real legal review,
  especially given the FDA-disclaimer and supplement-liability
  considerations already present in `product/beliefs-and-objections.md`
  and the footer's existing "not a medical device" line.
- Reuse a simple long-form text layout (check if one exists in the
  locked design system; if not, a plain article-style template is
  appropriate here — these pages don't need the marketing component set)

## Task 6 — Nav/footer wiring + full click-through

- Add About, FAQ, and the legal pages to the footer link columns (the
  `COMPANY` column already anticipated `Mission / Contact` — extend it;
  the `RESEARCH` column already anticipated `Don't buy if…`, which now
  has a real home in the FAQ)
- Full click-through from home → product → cart → every new page, both
  light and dark mode, deployed and checked on the live Vercel URL

## Explicitly out of scope for Phase 1.5

- Database, auth, real payment/email wiring — still Phase 2-4
- The NeuroDrive advertorial — still deferred, per the original
  non-advertorial-first sequencing decision
- A second product — the product page template must support it, the
  catalog still doesn't need it yet

## After Phase 1.5

Update [`roadmap.md`](./roadmap.md) to mark Phase 1.5 done, log the
outcome, and only then start Phase 2 (database) planning in detail.
