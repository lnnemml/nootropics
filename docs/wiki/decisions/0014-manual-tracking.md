# ADR 0014 — Manual tracking (no external tracking API)

**Status:** accepted  
**Date:** 2026-07-10  
**Supersedes:** —

## Context

Phase 4 needed order tracking for shipped orders. Options considered:
AfterShip (webhook-based live tracking updates) vs. manual tracking
(admin enters tracking number, customer sees static info + external link).

## Decision

Manual tracking only. Admin enters carrier + tracking number via admin panel.
Customer sees tracking number + external carrier link in their account.
No AfterShip API, no webhooks, no live status updates in our DB.

## Rationale

At launch volume (<50 orders/month), live tracking infrastructure is
overkill. The tracking URL (e.g. Ukrposhta's tracking page) provides
real-time status directly. Adding AfterShip later requires only:
1. `npm install` + env vars
2. One `registerTracking()` call in `markOrderShipped`
3. One webhook endpoint + `trackingEvents` JSON column

Schema is forward-compatible: `trackingNumber`, `trackingCarrier`,
`shippedAt` already exist.

## Consequences

- No live tracking status in customer account (they follow external link)
- No automated delivery email (would need AfterShip webhook to detect delivery)
- `followUpSentAt` column added but unused until cron is implemented
