# ADR 0016 — Post-delivery follow-up cron deferred

**Status:** deferred  
**Date:** 2026-07-10  
**Supersedes:** —

## Context

Post-delivery follow-up email (14 days after delivery) was planned as
Task 4.8 to drive reviews, community engagement, and repeat purchases.

## Decision

Deferred. Two blockers:
1. Vercel free plan does not support Cron Jobs
2. Community destination (Reddit, Discord, etc.) not yet created

## Schema

`followUpSentAt` column already added to orders table in Task 4.1.
No migration needed when this is unblocked.

## Resumption conditions

Both must be true:
- (a) Vercel Pro upgrade OR external cron service (e.g. cron-job.org
  hitting `POST /api/cron/follow-up` with `Authorization: Bearer $CRON_SECRET`)
- (b) Community destination decided (Reddit community created, or
  review collection mechanism chosen)

## Implementation sketch

Query: `WHERE deliveredAt < NOW() - INTERVAL '14 days' AND followUpSentAt IS NULL`
Send follow-up email → set `followUpSentAt = NOW()`.

Note: `deliveredAt` column does not currently exist (removed with AfterShip
scope in Phase 4). Will need to be added when AfterShip or manual delivery
marking is implemented.
