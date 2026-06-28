# Design Tokens — Color (extracted from existing brand assets)

> Source: pixel-sampled from
> `docs/raw/design/product_shot_without_bg.jpeg` (the actual printed
> label) + exact hex values read directly from
> `docs/raw/design/neurodrive_logo_N.svg`. Extracted 2026-06-29.
>
> **Status: authoritative.** This supersedes the "cool/technical
> instrument-panel blues" *instinct* given to Claude Design in the
> Design pass #1 calibration (see
> [`brand-design-brief.md`](./brand-design-brief.md)) — that was a
> direction guess made before real brand assets were available. The
> logo and label already exist and are treated as final; the site's
> palette derives from them, not the other way around.

## Core palette

| Token | Hex | Source | Usage |
|---|---|---|---|
| `--color-ink` | **#2E3A3C** | Averaged from the label's bottom band background (~#2C3438–#303838) and the logo's line-art stroke (~#343C40) | Primary dark — logo line art, the dark band/footer treatment, dark UI surfaces |
| `--color-text` | **#242424** | Sampled directly from the "NEURODRIVE" wordmark on the label | Default body/heading text — slightly more neutral-black than `--color-ink`, used for long-form readability rather than as a brand graphic color |
| `--color-accent` | **#1E9C78** | Exact value from the SVG (`fill:#1e9c78`), confirmed against the label's sampled dot color (#28947C — within JPEG compression noise of the same color) | **The signature accent** — the two dots on the logo. Use for CTAs, links, active states, the "steady/spike" motif's accent moments |
| `--color-accent-bright` | **#14B089** | Exact value from the SVG's highlight layer (`fill:#14b089`) | Secondary/hover variant of the accent — brighter highlight teal, e.g. hover state on accent buttons, gradient stop |
| `--color-neutral` | **#696C6D** | Exact value from the SVG's shadow/bevel layer (`fill:#696c6d`) | Mid-gray for the neutral scale — secondary text, borders, muted UI elements |
| `--color-paper` | **#FAFAF7** | Sampled label background (~#F0F0F0 in JPEG, corrected up — JPEG compression on near-white reads darker than the true paper white) | Page/card background — warm-neutral off-white, not stark `#FFFFFF` |
| `--color-amber` | **#7E4A12** | Averaged from the amber glass bottle body | Optional material accent — sparing use only (e.g. a warm tint behind product photography, never as a primary UI color — this is the bottle's material, not a brand graphic color) |
| `--color-black` | **#0A0A0A** | Sampled from the dropper cap | True black, for the rare case `--color-text` isn't dark enough (e.g. on `--color-paper`) |

## How these relate to each other

`--color-ink` and `--color-text` are close but deliberately distinct:
the label itself uses a teal-tinted dark for graphic elements (logo,
band) and a more neutral near-black for the wordmark's body-style text.
Carry that same distinction into the site: **`--color-ink` for brand
graphic moments, `--color-text` for actual reading text.** Don't merge
them into one "dark" token — that would lose a real, intentional nuance
already present in the approved brand assets.

`--color-accent` is the one color that should show up the most
deliberately and the least often — it's the dot color, the "moment" in
an otherwise quiet charcoal/white system. Treat it the way the existing
logo treats it: precise, small, high-contrast against the dark ink, not
spread evenly across the page.

## What this changes in `brand-design-brief.md`

The "Color temperature" instinct (cool/technical, instrument-panel blues
and graphite) was a reasonable *direction* in the absence of real
assets, but it specified **blue** — the actual brand color is a
**teal/mint-green** accent on a **charcoal** (not blue-gray) ink. Treat
this page as the correction. The "abstract/geometric, recurring as
accents" decision about motif literalism still holds — it just now uses
this exact palette instead of an invented one.

## Open item

The SVG also defines #14b089 and #696c6d as part of what looks like an
extruded/3D-shaded render of the logo (highlight + bevel-shadow layers),
not just the flat 2-tone version seen on the printed label. Confirm with
Anton whether that 3D-rendered version of the logo is meant to appear
anywhere on the site (e.g. an animated hero mark), or whether the site
should only ever use the flat 2-color version (`--color-ink` +
`--color-accent`) as shown on the label.

## Related pages

- [`brand-design-brief.md`](./brand-design-brief.md)
- [`../decisions/0006-claude-design-for-ui-ux.md`](../decisions/0006-claude-design-for-ui-ux.md)
