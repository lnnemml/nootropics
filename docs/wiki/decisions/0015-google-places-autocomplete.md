# ADR 0015 — Google Places Autocomplete for checkout

**Status:** accepted  
**Date:** 2026-07-10  
**Supersedes:** —

## Context

International checkout needs address input that works for any country.
Manual entry is error-prone; autocomplete reduces friction and improves
data quality for shipping labels.

## Decision

Google Places API via `PlaceAutocompleteElement` (new API, required for
keys created after March 2025). Client-side only. API key restricted to
`noraalliance.com` + `localhost:3000` via HTTP referrer restrictions.

Required Google Cloud APIs: Maps JavaScript API + Places API (New).

Env var: `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` (client-exposed by design).

## Rationale

Google Places has the best global address coverage. Cost is negligible
at launch volume (~$0.017/session, ~$1-2/month at 100 orders).
No country restrictions on autocomplete — works worldwide.

## Consequences

- Dependency on Google Cloud billing account (free tier $300 credit for 90 days)
- API key is exposed in client JS (restricted by HTTP referrer + API scope)
- PlaceAutocompleteElement renders its own Web Component input — requires
  CSS customization to match design system
