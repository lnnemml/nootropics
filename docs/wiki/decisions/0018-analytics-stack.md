# ADR 0018 — Analytics Stack

**Date:** 2026-07-13
**Status:** Accepted
**Supersedes:** None

## Decision

Implement a layered analytics stack combining client-side tracking with server-side
Conversions API for accurate attribution even with ad blockers.

Client-side: GTM (for GA4) + Microsoft Clarity (direct) + Meta Pixel (direct) + Vercel Analytics.
Server-side: Meta CAPI + GA4 Measurement Protocol.

## Context

Phase 6 introduces paid traffic. Accurate conversion tracking is essential for:
- Optimizing ad spend (Meta, Google, Reddit)
- Understanding user behavior on the DR landing page (Clarity heatmaps/recordings)
- Server-side event deduplication for reliable attribution

## Key Choices

- **GTM for GA4 only, direct scripts for Clarity and Meta Pixel.** GTM provides flexibility
  for future tags without code deploys. Clarity and Meta are direct because they're
  developer-managed and simpler without the GTM indirection layer.
- **CAPI fires from server actions and webhooks**, not from a separate server. Uses Vercel's
  serverless functions directly.
- **Event deduplication** via `eventId` generated on the client, passed to server actions,
  and sent to both client pixel and server CAPI endpoints.

## Consequences

- Six new environment variables required in Vercel
- `trackEvent()` in client code and `trackServerEvent()` in server code are the only
  analytics APIs — all sections and CTAs call through these
- Analytics failures are non-blocking (Promise.allSettled, console.error only)

## Revisit if

- Ad spend exceeds $500/day — consider a dedicated analytics platform (Segment, Rudderstack)
- GA4 data quality issues — consider moving GA4 to direct script instead of GTM
