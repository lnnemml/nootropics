# 0007 — Design System Lock-In; Claude Design Retired From the Loop

- **Date:** 2026-06-29
- **Status:** Confirmed

## Decision

The visual system produced in Claude Design's first pass (colors,
typography, spacing/radius, the steady/spike motif, component patterns)
is now **locked** — see [`../design/design-system.md`](../design/design-system.md).
Claude Code implements every page against this spec directly. Claude
Design's role in this project is finished: it was used exclusively to
synthesize the visual composition once; it is not part of the ongoing
build loop.

Simultaneously, the brand hierarchy was corrected: **NORA (Nootropics
Research Alliance)** is the platform brand; **NeuroDrive** is product
#1 under it. See
[`../product/brand-hierarchy.md`](../product/brand-hierarchy.md).

## Context

Claude Design's composition (palette, motif, type pairing) was approved
as strong. Its copy was rejected as generic, root-caused to two
compounding problems: (1) it never had access to the product/marketing
wiki pages, only the design brief; (2) more fundamentally, the home page
itself was being written at the wrong brand level — NeuroDrive-specific
instead of NORA-platform-level.

## Consequences

- No further Claude Design sessions are planned for this project unless
  a genuinely new visual-direction decision is needed (e.g. a
  fundamentally different page type the locked system doesn't cover).
- Claude Code is now the only implementation tool — see the Phase 1
  implementation plan in
  [`../phase-1-implementation-plan.md`](../phase-1-implementation-plan.md).
- Every page must be checked against
  [`../product/brand-hierarchy.md`](../product/brand-hierarchy.md) for
  voice (NORA vs. product-specific) before copy is finalized — this is
  now a standing check alongside the existing Soviet-origin-angle and
  scope-discipline constraints.

## Revisit if

A future page type genuinely doesn't fit the locked component set (e.g.
a data-heavy admin dashboard) — bring that *specific* gap back through a
short Claude Design pass rather than reopening general visual direction.
