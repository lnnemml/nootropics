# Home / Mission Page — Copy v3

> **Superseded by [`home-page-copy-v4.md`](./home-page-copy-v4.md)** —
> v4 drops the abstract chart motif (ADR 0009) and replaces FeaturedRelease
> with ReleaseCatalog. Kept per append-only convention.

> Supersedes [`home-page-copy-v2.md`](./home-page-copy-v2.md) — adds a
> concrete proof point (bromantane/tyrosine hydroxylase mechanism named
> in the ContrastCardPair) and a Featured Release product teaser
> (FeaturedRelease component, NeuroDrive bottle + CTA); removes the
> duplicate Hero/Mission claim. Hero CTA now points to the product page
> instead of the `#science` anchor.

## Nav

- **Wordmark:** NORA *(not "NeuroDrive" — this is the platform-level page)*
- **Links:** Products · About · Journal · Contact
- **CTA:** Order now →

## Hero

- **Eyebrow:** Built for people who can't afford an off day
- **H1:** We name the mechanism. Or we don't ship it.
- **Subhead:** We're a research alliance, not a supplement brand. Every release ships with a mechanism we can name and a study we can cite — starting with NeuroDrive, a single, named compound, evaluated against exactly that standard.
- **CTA:** View NeuroDrive →  *(links to `/products/neurodrive`)*
- **Chart caption:** `FIG.01 — SIGNAL vs. NOISE`
- **Chart curve labels:** `VALIDATED` (solid line endpoint) / `HYPED` then `FORGOTTEN` (dashed line peak/crash)
- **Chart legend:** `NORA` (solid line) / `Hype cycles` (dashed line)

## Contrast / "the two methods"

- **Eyebrow:** The two methods
- **H2:** One method compounds. The other just trends.
- **Card 1 — eyebrow `NORA — RESEARCH-LED`:** Our first release names its mechanism outright: bromantane upregulates tyrosine hydroxylase, the enzyme that sets your brain's own dopamine synthesis rate. That's the bar — a pathway we can point to, not a blend we can't explain.
- **Card 2 — eyebrow `INDUSTRY — HYPE-LED`:** A twelve-ingredient 'focus blend' with no single dose disclosed, no mechanism named per ingredient, and one clinical study covering one component — not the formula you're actually taking.

## Featured Release (new section, between ContrastCardPair and Mission)

- **Eyebrow:** Our first release
- **Product name:** NeuroDrive
- **Body:** Sublingual bromantane, one named mechanism — evaluated against the standard above, not an exception to it.
- **CTA:** View NeuroDrive →  *(links to `/products/neurodrive`)*
- **Image:** `/neurodrive-bottle.jpg`

## Mission

- **Eyebrow:** Mission
- **Body:** NeuroDrive *(accent-colored)* is proof of the standard, not an exception to it — every product that follows gets evaluated the same way.

## Principles

1. **Mechanism over marketing** — Every claim traces back to a pathway we can name and a study we can cite. No proprietary fairy dust.
2. **Built for skeptics** — You've tried things that didn't work. Good — that's the right instinct. We'd rather you read the research than take our word for it.
3. **Curated, not exhaustive** — We'd rather release one compound we trust completely than fifty we're unsure about. Every addition to the catalog has to earn its place.

## Page structure (component order)

```
Hero → DividerMotif → ContrastCardPair (#science) → FeaturedRelease → MissionStatement (#mission) → DividerMotif → PrincipleGrid
```

## Related pages

- [`../product/brand-hierarchy.md`](../product/brand-hierarchy.md)
- [`../design/design-system.md`](../design/design-system.md)
- [`../product/avatar.md`](../product/avatar.md)
- [`home-page-copy-v2.md`](./home-page-copy-v2.md) *(superseded)*
