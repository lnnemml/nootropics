# 0006 — UI/UX Design via Claude Design

- **Date:** 2026-06-29
- **Status:** Confirmed

## Decision

Visual/UI design work (palette, typography, layout, component look) for
the marketing site and NeuroDrive pages is done in **Claude Design**
(Anthropic's dedicated design app), against the brief in
[`../design/brand-design-brief.md`](../design/brand-design-brief.md),
rather than designed ad-hoc inside Claude Code or freehanded in Tailwind
without an explicit visual-direction pass first.

## Context

Anton wants a top-tier UI/UX result, not a default Tailwind/shadcn look.
A dedicated design-focused pass (exploring palette/type/layout options
before locking implementation) produces materially better results than
going straight to component code, per the design process described in
the `frontend-design` skill (brainstorm → plan → critique → build →
critique again).

## Consequences

- Design direction is decided *before* Phase 1 frontend implementation
  is finalized in Claude Code — Claude Code should treat the locked
  direction as a constraint, not re-decide palette/type choices itself.
- The locked direction gets written back into the wiki (token system in
  `design-tokens.md`, once finalized) so it survives outside the Claude
  Design session itself — same principle as everything else in this
  wiki: a good output gets filed back, not left stranded in one tool's
  session history.
- If Claude Design's first pass leans into a generic/templated look (see
  "what this brand is not" in the brief), that's a signal to iterate
  again, not to accept it because a design tool produced it.

## Revisit if

The locked design direction needs significant revision after seeing it
implemented in the browser (common — design that works in isolation
doesn't always survive real content/responsive constraints). Record the
revision as an update to `brand-design-brief.md` / `design-tokens.md`,
not a new ADR, unless the *tool choice* itself changes.
