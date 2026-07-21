# ADR 0019 — Direct Response Landing Page at `/go`

**Date:** 2026-07-13
**Status:** Accepted
**Supersedes:** None (the home page and product page remain separate surfaces)

## Decision

Build a standalone DR landing page at `/go` with its own layout (no NavBar, no Footer,
no MarketingShell). 17 sections following an e-commerce DR wireframe pattern optimized
for paid traffic conversion.

## Context

The main site (home page, product page) serves organic/brand traffic. The `/go` page
is designed specifically for cold paid traffic (Reddit Ads, Google Search, TikTok) where
the visitor has no prior brand awareness and must be converted in a single session.

## Key Choices

- **Custom layout outside route groups.** `/go` sits at `app/go/` (not inside `(marketing)`)
  with its own `layout.tsx`. Root layout analytics scripts still apply; NavBar/Footer do not.
- **No money-back guarantee.** Research chemicals industry standard; fraud risk; no guarantee
  language anywhere on the page.
- **Evidence-based visuals over lifestyle photos.** Data timelines, mechanism diagrams,
  comparison tables. The target audience (rational optimizers, developers, biohackers) trusts
  data visualizations more than stock photography.
- **Community quotes, not customer testimonials.** Pre-revenue, no verified customers. All
  quotes are paraphrased composites from public bromantane/nootropics forum discussions,
  attributed to "Bromantane community" — never presented as customer reviews.
- **Hero carousel (4 slides)** tells the full product story without scrolling: product shot →
  sublingual application → mechanism/proof chart → dream outcome close-up.
- **Repeated social proof.** Quote sections appear every 2-3 sections (S04, S09, S13) with
  single-column layout for maximum impact.

## Structure (17 sections)

S00 TopBar, S01 Hero, S02 SocialProofBar, S03 PainSection (PAS), S04 UgcProof,
S05 BenefitIcons, S06 ValueProp1 (Focus), S07 ValueProp2 (Motivation), S08 Mechanism,
S09 SocialProof3, S10 Differentiators (comparison table), S11 TrustBar,
S12 ValueProp3 (Calm Clarity), S13 SocialProof4, S14 FAQ, S15 FinalCTA, S16 Footer.

## Consequences

- `/go` has NO NavBar — visitor cannot navigate away to the main site (intentional for DR)
- All CTAs link to checkout; no internal navigation except anchor links
- `trackEvent('cta_click', { location })` fires on every CTA for conversion funnel analysis
- UGC video placeholders remain until video production completes
- Dead old section files exist alongside new ones (S02Problem, S03Stimulants, etc. from
  an earlier landing page version) — these are unused but not yet cleaned up

## Revisit if

- Conversion rate data suggests a different section order
- Card payment processing becomes available (CTAs would change)
- Real customer testimonials become available (replace community quotes)
