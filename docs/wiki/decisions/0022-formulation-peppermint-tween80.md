# ADR 0022 — NeuroDrive formulation: peppermint oil 0.15%, Tween 80 0.1%

**Date:** 2026-11-01
**Status:** Accepted (Anton)

## Decision

NeuroDrive's formulation is:

- Bromantane 80 mg/ml
- Peppermint oil 0.15%
- Tween 80 0.1%
- MCT oil as the carrier

## Context

The previous formulation was bromantane 80 mg/ml with peppermint oil 0.1% in
MCT oil. This raises peppermint oil to 0.15% and adds Tween 80. Anton gave the
new numbers directly. The percentage basis (w/w or v/v) was not stated, and
neither was the old one.

## Consequences

- `src/lib/copy/products.ts` holds the customer-facing composition table on
  the product page. `product/overview.md` carries the same numbers.
- Bromantane stays at 80 mg/ml, so the 0.5–1 ml protocol, the 40–80 mg dose and
  every "80mg/ml" string are unchanged.
- `docs/raw/` design files stay as they are (immutable). None of them state
  the excipient percentages.
- Bromantane is still the only active, but the composition table now has four
  lines, so "One Ingredient" no longer holds. Anton approved changing the `/go`
  badge (`src/app/go/_sections/S05BenefitIcons.tsx`) to "Single compound", which
  matches `/go-v2`.

## Revisit if

The formulation changes again, or a batch COA or manufacturer spec disagrees
with these numbers.
