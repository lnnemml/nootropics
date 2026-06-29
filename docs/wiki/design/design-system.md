# Design System — Locked (from Claude Design pass #1)

> **Status: locked.** This is the canonical visual system for the entire
> site. Claude Code should build every future page against these exact
> tokens/components — do not invent new colors, radii, or spacing scales
> per-page. The raw, viewable reference markup this was extracted from
> lives at
> [`docs/raw/design/home-design-pass-1.html`](../../raw/design/home-design-pass-1.html)
> (open it directly in a browser — real Google Fonts, no embedded blobs).
> Claude Design was used exclusively to synthesize this composition;
> from here on, all implementation happens in Claude Code, against this
> spec.

## Color tokens — light + dark mode

Both directions Claude Design produced aren't "pick one" — they're the
site's **light and dark mode**, same token names, different values. Use
a class-based dark mode strategy (e.g. Tailwind `dark:`), not separate
pages.

| Token | Light value | Dark value | Usage |
|---|---|---|---|
| `--bg-page` | `#FAFAF7` (paper) | `#0A0A0A` (black) | Page background |
| `--bg-raised` | `#F3F3EE` | `#2E3A3C` (ink) | Section-level "raised" surface (contrast section, footer) |
| `--bg-card` | `#FFFFFF` | `#0A0A0A` | Cards floating on a raised surface |
| `--text-primary` | `#242424` | `#FAFAF7` | Body text, headings |
| `--text-ink` | `#2E3A3C` | `#FAFAF7` | Brand graphic elements (wordmark, H1) — see nuance below |
| `--text-secondary` | `#696C6D` | `rgba(250,250,247,0.5–0.74)` | Eyebrows, captions, muted body |
| `--border` | `rgba(46,58,60,0.09–0.22)` | `rgba(250,250,247,0.1–0.28)` | All hairline borders — always tinted, never flat gray |
| `--accent` | `#1E9C78` | `#1E9C78` | Primary accent — logo dot 1, link/active states |
| `--accent-bright` | `#14B089` | `#14B089` | Secondary accent — logo dot 2, dark-mode CTA background, hover |

`--text-ink` vs `--text-primary` nuance (carried over from the original
label): ink is for *brand graphic* moments (logo wordmark, H1), primary
is for *reading* text. Don't collapse these into one "dark" value — see
[`design-tokens.md`](./design-tokens.md).

## Typography

- **Display/UI face:** Space Grotesk (400/500/600/700)
- **Data/label face:** JetBrains Mono (400/500) — used for: eyebrows
  (uppercase, `letter-spacing: 0.12–0.16em`, 11–12px), nav CTA pill text,
  chart captions/axis labels, numbered principle labels (`01`/`02`/`03`),
  footer column headers, copyright line
- **Scale** (Space Grotesk unless noted):
  - H1: 62–74px, weight 600, `line-height: ~1.0`, `letter-spacing: -0.025 to -0.03em`
  - H2 (section): 32–34px, weight 600, `letter-spacing: -0.02em`
  - Mission pull-quote: 34–37px, weight 500, `line-height: 1.3`, `letter-spacing: -0.015em`, centered
  - H3 (principle headers): 20–21px, weight 600
  - Body: 14px (nav links) / 15px (card body) / 18–19px (hero subhead)

## Spacing & shape

- Page horizontal gutter: **72px** desktop (scale down responsively, don't redesign the rhythm)
- Section vertical padding: 76–104px depending on section weight (hero/mission heaviest, nav/footer lightest)
- **Border-radius: 2–3px everywhere.** This is deliberate — "precision
  instrument," not the rounded-2xl SaaS default. Don't let a component
  library's default radius creep in.
- Borders are always 1px solid, low-opacity tinted color (never a flat
  `#e5e5e5`-style gray)

## Components

**Logo** — `src/components/ui/Logo.tsx`. Inline SVG of the NORA stacked lockup
(geometric N lettermark + NORA wordmark). Fill colors are mapped to CSS tokens
(`#2b3235` + `#334d48` → `var(--color-ink)`; `#696c6d` → `var(--color-secondary)`;
teal accents stay as hex). Accepts a `height` prop (nav: 38px, footer: 44px).
Favicon: `src/app/icon.svg` — the N-mark only (flat, cropped viewBox), no CSS vars.

1. **NavBar** — NORA logo lockup + 4 text links (Products/About/Journal/Contact)
   + one outlined mono CTA pill ("Order now →", hidden on /checkout). Hairline
   border-bottom. Collapses to hamburger below md.
2. **Hero** — eyebrow (mono, uppercase) → H1 (2 lines) → subhead
   (max-width constrained) → CTA row (solid button + mono caption),
   paired with a bordered **stat card**: an SVG line chart contrasting a
   smooth solid curve against a dashed jagged curve, with mono
   fig-caption and axis labels, accent-colored endpoint dots.
3. **ContrastCardPair** — 2-col equal grid, each card = mono eyebrow
   (accent-colored for "us," neutral for "them") + small SVG mini-chart
   + body paragraph.
4. **MissionStatement** — centered, eyebrow + large pull-quote paragraph
   with 1–2 accent-colored characters/words as the only color accent.
5. **PrincipleGrid** — 3-col grid, each = mono numbered label + H3 + body
   paragraph, hairline `border-top` above the whole row.
6. **DividerMotif** — thin full-width SVG: a steady line with one small
   deviation + an accent dot. Use between major sections sparingly — one
   or two per page, not on every section boundary.
7. **Footer** — raised-surface block: logo+tagline column + 2 link
   columns with mono uppercase headers, mono copyright line below.

## The signature motif — generalized meaning

The steady-curve-vs-jagged-dashed-curve motif was designed for
NeuroDrive's "Restore, Don't Stimulate" claim, but it generalizes cleanly
to **NORA's** brand level as "evidence vs. hype" / "signal vs. noise" —
same exact visual, re-captioned per context:

- On NeuroDrive pages: dopamine/mechanism framing (as Claude Design built it)
- On NORA platform pages (home, mission, future product index): research-method
  framing — e.g. fig-caption `SIGNAL vs. NOISE`, curve labels `VALIDATED` /
  `HYPED` / `FORGOTTEN` instead of `SUSTAINED` / `SPIKE` / `CRASH`

Keep the SVG path shapes and component structure identical — only the
mono labels change. This is what "reusing the style for every page"
means in practice: same component, re-captioned per page's actual
subject, never a new motif invented per page.

## Related pages

- [`design-tokens.md`](./design-tokens.md) — color extraction reasoning
- [`brand-design-brief.md`](./brand-design-brief.md) — original brief
- [`../product/brand-hierarchy.md`](../product/brand-hierarchy.md) — NORA vs. NeuroDrive
- [`home-page-copy-v2.md`](./home-page-copy-v2.md)
