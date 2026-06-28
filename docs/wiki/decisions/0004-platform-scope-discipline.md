# 0004 — Platform Scope Discipline

- **Date:** 2026-06-28
- **Status:** Confirmed (process constraint, not a one-time decision)

## Decision

Architecture is platform-grade from the start (multi-product data model,
route structure, referral/discount system designed for scale). Execution
proceeds strictly single-product-first, phase by phase. No feature is
built ahead of the phase that needs it unless it is free to make
platform-ready now (e.g. a `slug`-based product table vs. a hardcoded
object) vs. expensive to build for a still-hypothetical need (e.g. a full
forum before there is an audience).

Full reasoning: [`../architecture/platform-vs-product.md`](../architecture/platform-vs-product.md).

## Context

Anton's stated long-term goal is a full community + multi-product
platform competing against Nootropics Depot and Umbrella Labs. The
immediate reality is one product, pre-launch, pre-revenue. Without an
explicit constraint, an architect-mode collaborator (human or LLM) will
naturally over-build toward the long-term vision and stall the actual
launch.

## Consequences

- Every new phase plan should be checked against this ADR before
  expanding scope.
- If Claude Code (or Claude web) proposes a feature, it should be able to
  point to which phase it belongs to and why it can't wait.

## Revisit if

Phase 1 ships and gets real traffic/orders — re-evaluate which "future"
features have become "now" features based on actual usage, not
anticipation.
