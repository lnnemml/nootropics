# Brand Design Brief — NeuroDrive Platform

> Written 2026-06-29 for use with Claude Design (and any future frontend
> implementation in Claude Code). This is a *brief*, not a finished
> token system — Claude Design should propose the actual palette/type/
> layout choices; this page constrains the direction so independent
> design passes don't drift.

## What this brand is not

Say this out loud before designing anything: **NeuroDrive is not a
wellness brand.** No soft pastels, no hand-lettered scripts, no "self-care
Sunday" energy, no stock-photo person meditating with a smoothie. The
avatar (programmers, founders, quant researchers — see
[`../product/avatar.md`](../product/avatar.md)) is allergic to that
aesthetic; it actively damages trust with this buyer.

Also avoid the current generic "AI-generated design" defaults: warm cream
+ high-contrast serif + terracotta accent; near-black + single acid-green
accent; broadsheet hairline-rule newspaper layout. All three are
overused right now — if Claude Design's first instinct lands on one of
these, push for a more specific choice tied to this brief.

## What this brand is

**A precision instrument, not a lifestyle product.** Think: the visual
register of Linear, Vercel's own marketing site, a well-designed lab
instrument's control panel — rational, evidence-first, quietly confident.
The buyer trusts data and mechanism, not vibes. Design should *look* like
it was made by people who understand dopamine pathways, not people who
sell dopamine pathways.

## Positioning anchor → the obvious signature element

The core line is **"Restore, Don't Stimulate"** — already validated as a
contrast split-panel concept for static ads (steady/sustained line vs.
spike-and-crash). This is content-grounded, not decorative, and should be
considered as a **site-wide signature motif**, not just an ad format: a
visual "steady line vs. spike line" idea that could recur in the hero,
in section dividers, in a data-visualization-style proof section — the
kind of single memorable element the frontend-design process calls for,
because it comes directly from the product's own mechanism story rather
than being bolted on.

## Functional/content constraints that affect design

- Heavy reliance on **mechanism explanation** (dopamine, actoprotector
  science) — the design needs a clean way to present a *little* science
  without becoming a clinical journal page. A restrained
  data/diagram visual language (think: a single clean line chart, not a
  decorative illustration) fits the "for builders" tone better than
  literal brain/molecule clip-art.
- **"Don't Buy If..." sections and objection-handling** (see
  [`../product/beliefs-and-objections.md`](../product/beliefs-and-objections.md))
  need a distinct, calm visual treatment — these are credibility devices,
  not warnings, so they shouldn't look like error states.
- Checkout is a **manual-confirmation form**, not a payment screen (see
  [`../architecture/manual-payment-flow.md`](../architecture/manual-payment-flow.md))
  — design the confirmation state to feel deliberate and trustworthy
  ("we received this, a person will follow up"), not like an error or a
  broken cart.

## Where this gets used (design sequencing — updated 2026-06-29)

> **Sequencing correction:** design and build both proceed
> non-advertorial-first now. Lock the design system on the simplest,
> most universal surface, then extend it — don't spend the first pass on
> the hardest page.

1. `(marketing)` home / mission — **design this first.** It's the anchor
   surface: header, footer, type scale, color system, and the signature
   motif's "quiet" treatment all get decided here and inherited by
   everything else.
2. `(shop)/products/[slug]` — generic product page template, reusing the
   locked system from step 1.
3. Checkout (manual-confirmation flow) — reuses the system; needs its own
   "trustworthy, not broken" treatment per the constraint below.
4. `(shop)/neurodrive` — the long-form advertorial landing page —
   **deliberately last.** Highest-stakes page, benefits most from a
   design system that's already proven on simpler surfaces first.

## Workflow

1. Use **Claude Design** to explore and produce the actual visual
   direction (palette, type pairing, layout, the signature motif) against
   this brief.
2. Review against this brief and the brand-voice constraints in
   [`../product/avatar.md`](../product/avatar.md) /
   [`../decisions/0003-no-soviet-origin-angle.md`](../decisions/0003-no-soviet-origin-angle.md)
   before locking anything in.
3. Once approved, Claude Code implements the locked direction as
   Tailwind/shadcn tokens + components in `src/components/` — record the
   final token system back into this page (or a sibling
   `design-tokens.md`) once it exists, so it doesn't only live in a
   Claude Design session.

## Design pass #1 — calibration answers (2026-06-29)

Given to Claude Design's clarifying-questions flow for the home/mission
pass. Not yet a locked ADR — these are directional inputs for *this*
pass; treat as confirmed once Anton reviews the actual output.

- **First surface:** Marketing home/mission (see sequencing above)
- **Output type:** visual-direction exploration (hero + key sections),
  not a finished hi-fi page yet — lock direction before full build-out
- **Number of directions:** 2
- **Signature motif literalism:** abstract/geometric interpretation of
  the steady-line/spike-line idea, recurring as section dividers/accents
  — not a literal data-viz chart on this pass (reserve literal charts for
  the advertorial's mechanism/proof section specifically, later)
- **Color temperature:** ~~cool/technical (instrument-panel blues,
  graphite)~~ **superseded 2026-06-29** — real brand assets (logo +
  printed label) now exist. The actual palette is charcoal-teal ink
  (#2E3A3C) + a precise mint/teal accent (#1E9C78), not blue. See
  [`design-tokens.md`](./design-tokens.md) for the full extracted
  palette and reasoning — that page is now authoritative for color.
- **Typography:** grotesque sans (UI/headlines) + mono for data/stat
  callouts — the Linear/Vercel register named directly in this brief.
  Reserve a restrained serif option specifically for the advertorial's
  long-form editorial copy, decided when that page comes up later.
- **Copy for this pass:** plausible placeholder copy in the brief's voice
  (not lorem, not final copy — home/mission copy hasn't been drafted in
  the wiki yet)

## Related pages

- [`../decisions/0006-claude-design-for-ui-ux.md`](../decisions/0006-claude-design-for-ui-ux.md)
- [`../product/avatar.md`](../product/avatar.md)
- [`../marketing/messaging-angles.md`](../marketing/messaging-angles.md)
