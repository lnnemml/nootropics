# ADR 0012 — Neon Postgres + Drizzle ORM as Phase 2 DB layer

**Date:** 2026-07-03
**Status:** Decided

## Decision

Use Neon (serverless Postgres) with Drizzle ORM for Phase 2 database
implementation. Single `orders` table as the MVP schema; richer schema
(users, product_variants, order_items, referral_codes, etc.) deferred
to Phase 3+.

## Context

These choices were proposed in `architecture/tech-stack.md` from day one
but never formally confirmed with an ADR. Phase 2 starting now — confirm
the record.

Neon: serverless autoscaling, native Vercel branching integration, no
ops overhead. Drizzle: TypeScript-first, edge-runtime compatible, explicit
SQL-like syntax that is safe for LLM coding agents (avoids the
"magic" footguns of heavier ORMs like Prisma that are harder to reason
about in an agent context).

## Consequences

- All DB access routes through `src/lib/db/` — no raw SQL elsewhere.
- Schema migrations via `drizzle-kit push` (dev/preview) and
  `drizzle-kit migrate` (production).
- MVP schema is deliberately denormalized (product slug + quantity on
  `orders` directly) to keep Phase 2 simple. Phase 3 can add normalized
  `products` + `product_variants` when a second product approaches.
- `NEON_DATABASE_URL` required in Vercel env before Task 2.1 can run.

## Revisit if

- A second developer joins and needs a more structured migration workflow.
- Order volume requires read replicas or connection pooling beyond what
  Neon's serverless HTTP driver handles natively.
