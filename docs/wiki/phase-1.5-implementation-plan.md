# Phase 1.5 — Site Completeness — Punch List

> **Format note (2026-06-29):** this is deliberately *not* structured
> like the Phase 1 plan (fixed atomic tasks with acceptance checks).
> Anton can't yet size the real scope of "make this look like a finished
> e-commerce site," so locking a task breakdown now would be false
> precision. This is an open punch list instead: a rough, reorderable
> set of areas to work through one at a time with Claude Code. Add to
> it, reorder it, or drop items as you actually see the site take shape
> — that's the intended use, not a deviation from it.
>
> **Definition of done for this phase:** Anton decides the site looks
> and functions like a real, externally-presentable e-commerce site.
> Not a checklist completion — a judgment call.

## Rough order to work through (not a contract)

1. **Header** — needs fixing (specifics TBD when you sit down with
   Claude Code and look at what's actually wrong)
2. **Home page** — rewrite/polish pass (the structure + copy from
   `marketing/home-page-copy-v2.md` is the baseline, but expect it to
   need real iteration once it's seen in the browser, not just approved
   on paper)
3. **Product page** — polish pass: real product photo
   (`docs/raw/design/product_shot_without_bg.jpeg`), price block
   (**blocked on Anton supplying real numbers — don't invent one**)
4. **Starter articles** — maybe; if/when it's clear what early
   education content should exist (mechanism explainers, etc. — source
   material exists in `NeuroDrive_research_document.pdf`'s "Scientific &
   Story Angles" section, not yet split into its own wiki page)
5. **Checkout** — polish the manual-confirmation flow shell (see
   `architecture/manual-payment-flow.md` for the fields/states it needs)
6. **About** — deeper NORA mission content than the home page's brief
   version (source: `product/overview.md`, `product/brand-hierarchy.md`)
7. **FAQ** — built from `product/beliefs-and-objections.md`'s objection
   → response map (close to copy-paste, minimal new copywriting)
8. **Legal/technical pages** — Terms, Privacy, Refund, Shipping.
   **AI-drafted starting templates only — needs real legal review before
   launch**, not launch-ready as generated.

## Standing constraints (apply to every item above, not just one)

- **Never invent a real product price.** If a task needs one and Anton
  hasn't supplied it, stop and ask rather than guessing.
- **Cart, when it's built:** behind a `useCart` hook so localStorage now
  → database-backed cart later (Phase 4) is a hook-internals swap, not a
  UI rewrite. Don't let cart logic leak directly into components.
- **Legal pages are templates, not final text** — say so in the commit,
  don't present them as launch-ready.
- Reuse the locked [`design/design-system.md`](./design/design-system.md)
  components throughout. A genuinely new component type (e.g. an FAQ
  accordion) is a legitimate small addition; a new color, radius, or
  layout pattern invented per-page is not.

## After this phase

When Anton calls it done, update [`roadmap.md`](./roadmap.md) to mark
Phase 1.5 done, log what actually got built in `wiki/log.md` (the real
list will likely differ from the rough order above — that's expected),
and only then start Phase 2 (database) planning in detail.