# Platform vs. Product — Scope Discipline

> Last updated 2026-06-28. This page exists specifically to prevent scope
> creep — re-read it before starting any new phase.

## The tension

Anton's vision is a full multi-product nootropics e-commerce platform with
community/education presence, competing against Nootropics Depot and
Umbrella Labs at the platform level (see
[`../marketing/competitive-landscape.md`](../marketing/competitive-landscape.md)).
But there is currently **one product** (NeuroDrive) and **zero revenue**.

## The rule

**Architecture is platform-grade from day one (multi-product data model,
route structure that doesn't need rework). Execution is single-product
first.** Concretely:

- Phase 1 ships the NeuroDrive advertorial landing + product page on the
  platform-ready foundation — but no second product, no forum, no full
  community features yet.
- Don't build a feature "because the platform will eventually need it"
  unless it's *free* to build now (e.g. a `products` table instead of a
  hardcoded NeuroDrive object) vs. *expensive* to build now for a need
  that's still hypothetical (e.g. a full discussion/forum system before
  there's an audience to discuss anything).
- Community/education content starts as **MDX blog posts**, not a forum
  platform, until there's evidence of an audience that wants to post, not
  just read.

## Decision log pointer

See [`../decisions/0004-platform-scope-discipline.md`](../decisions/0004-platform-scope-discipline.md)
for the formal record of this constraint and any exceptions granted.

## Related pages

- [`../marketing/competitive-landscape.md`](../marketing/competitive-landscape.md)
- [`../roadmap.md`](../roadmap.md)
- [`data-model.md`](./data-model.md)
