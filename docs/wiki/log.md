# Wiki Log

Append-only chronological record. Each entry starts with `## [YYYY-MM-DD]
<type> | <short title>` so it stays parseable with simple tools, e.g.
`grep "^## \[" docs/wiki/log.md | tail -5`.

Types: `setup`, `ingest`, `decision`, `lint`, `phase`.

---

## [2026-06-28] setup | Architecture v1 + wiki initialization

- Scaffolded Next.js 15 + TypeScript + Tailwind project (`create-next-app`,
  App Router, `src/` dir).
- Established route group structure: `(marketing)`, `(shop)`, `(account)`,
  `(blog)`.
- Established `src/lib/{db,auth,referrals,copy}` layout.
- Created `docs/raw/` (immutable source layer) and copied the four
  foundational PDFs into `docs/raw/foundational/`.
- Initialized `docs/wiki/` following the Karpathy LLM-wiki pattern
  (raw → wiki → schema), adapted for a combined business-knowledge +
  technical-architecture wiki.
- Synthesized product/avatar/beliefs/messaging/competitive-landscape pages
  from the four foundational PDFs (full ingest of all four sources).
- Recorded ADRs 0001–0004 (stack & repo shape; primary ad angle; Soviet
  origin-angle exclusion; platform scope discipline).
- Wrote root `CLAUDE.md` schema (appended to Next.js's auto-generated
  AGENTS.md import) describing wiki maintenance workflow for Claude Code.
- **Status:** tech stack and architecture proposed to Anton, pending
  explicit sign-off before Phase 1 work begins in Claude Code.

## Backlog for next ingest session

- `NeuroDrive_research_document.pdf` "Scientific & Story Angles" and
  "Messaging Framework & Strategic Recommendations" sections deserve their
  own dedicated wiki pages (`product/mechanism-and-science.md`,
  expanded `marketing/voice-of-customer.md`) — only partially synthesized
  in this pass to keep Phase 0 scoped.
- Prior chat-history knowledge (Figma label work, sales-page React
  implementation decisions, JSX deployment lesson about double-quoting
  strings) should be ingested into the wiki in a follow-up session so it
  isn't only living in Claude's memory system.

## [2026-06-29] decision | Payment flow correction + design tooling

- Anton confirmed Phase 0 architecture overall, with two corrections:
  1. **No Stripe** — high-risk product category, mainstream processors
     don't work. Phase 1 checkout is a manual-confirmation flow: customer
     fills a form, gets a Resend confirmation email, ops follows up by
     email to arrange payment manually. High-risk offshore merchant
     account is being researched in parallel by Anton (no provider chosen
     yet). Recorded as ADR 0005, with full operational detail in new page
     `architecture/manual-payment-flow.md`. Updated `tech-stack.md`,
     `data-model.md` (`orders` status enum, new `order_notes` table),
     `roadmap.md` (Phase 4 redefined), and added a hard constraint to root
     `CLAUDE.md` (no Stripe / no card fields / no "Pay Now" button).
  2. **Resend** added as the email provider (transactional order-received
     + internal new-order notifications).
- Anton wants top-tier UI/UX and will use **Claude Design** for visual
  direction. Recorded as ADR 0006, with a new brand design brief at
  `design/brand-design-brief.md` (synthesized from the avatar/positioning
  knowledge already in the wiki + the `frontend-design` skill's design
  process, explicitly steering away from generic AI-design defaults and
  toward the "Restore, Don't Stimulate" steady-line/spike-line motif as a
  content-grounded signature element).
- Confirmed: Phase 0 scaffold has been deployed to Vercel. Roadmap updated
  to mark Phase 0 done, Phase 1 current.

## [2026-06-29] ingest | Claude Design pass #1 results reviewed — copy rewritten

- Anton reviewed Claude Design's two output directions (light "Baseline"
  + dark "Calibration") for the home/mission page. **Design: approved as
  strong** — palette, steady/spike motif (used as hero chart + recurring
  divider, not just one hero moment), and Space Grotesk/JetBrains Mono
  typography all landed as directed.
- **Copy: rejected as generic.** Root cause identified: Claude Design's
  project only contained `brand-design-brief.md` — it had no access to
  `product/avatar.md`, `product/beliefs-and-objections.md`, or
  `marketing/messaging-angles.md`, and was explicitly instructed (by the
  Design pass #1 calibration answers) to invent "plausible placeholder
  copy." The result was competent but interchangeable with any calm-tech
  brand — no bromantane, no mechanism specifics, no voice-of-customer
  language.
- Wrote grounded replacement copy in
  [`marketing/home-page-copy-v1.md`](./marketing/home-page-copy-v1.md),
  same section structure as the locked design, sourced from the avatar/
  beliefs/messaging-angles pages.
- **Process lesson for future Claude Design passes:** hand it the
  relevant `docs/wiki/product/` and `docs/wiki/marketing/` pages
  alongside the design brief, not the design brief alone — otherwise
  copy generation has nothing to ground in and defaults to generic.
  Apply this before the next page (product template / checkout) goes
  through a design pass.

## [2026-06-29] decision | Design locked, Claude Design retired, NORA brand confirmed

- Anton confirmed: lock the Claude Design composition as the permanent
  design system; Claude Design is done for this project, all further
  implementation happens in Claude Code only (ADR 0007).
- **Brand hierarchy corrected:** the platform brand is **NORA
  (Nootropics Research Alliance)**; NeuroDrive is product #1 under it
  (confirmed by Anton, matches the "Nootropic Research Alliance"
  endorsement line already on the physical label). New page
  `product/brand-hierarchy.md`. This explains exactly why
  `home-page-copy-v1.md` felt wrong — it spoke at the NeuroDrive/
  bromantane level on a page that should speak as NORA.
- Decoded and cleaned the raw Claude Design HTML bundle into a real,
  viewable reference file:
  `docs/raw/design/home-design-pass-1.html` (real Google Fonts swapped
  in for the embedded base64 font blobs, fake wrapper tags unwrapped
  into valid HTML).
- Wrote `design/design-system.md` — the locked, implementation-ready
  spec (color tokens for light+dark mode as a proper elevation system,
  typography scale, spacing/radius rules, 7 named components, and the
  generalized meaning of the steady/spike motif at the NORA platform
  level vs. the NeuroDrive product level).
- Wrote `marketing/home-page-copy-v2.md` — home page copy correctly
  scoped to NORA (v1 marked superseded, kept per append-only convention).
- Wrote `phase-1-implementation-plan.md` — 7 atomic tasks for Claude
  Code (tokens → layout shell → reusable components → NORA home page →
  product template → checkout shell → nav/deploy), explicitly excluding
  the NeuroDrive advertorial and Phase 2+ work.
- Recorded ADR 0007 tying all of this together; updated root `CLAUDE.md`
  with the design-lock-in and brand-voice hard constraints.

## [2026-06-29] decision | Design & build sequencing: non-advertorial first

- Anton corrected sequencing: both the Claude Design pass and the Phase 1
  Claude Code build should start with everything **except** the
  NeuroDrive advertorial — home/mission, product page template, checkout
  shell — and do the advertorial last, once the design system is proven.
- Updated `design/brand-design-brief.md` (re-ordered "where this gets
  used," removed the old "advertorial = highest priority" framing) and
  `roadmap.md` Phase 1 (advertorial moved to the end of the phase list).
- Gave Anton a directional answer key for Claude Design's clarifying-
  questions flow for the home/mission pass (first surface, output type,
  number of directions, motif literalism, color temperature, typography,
  copy approach) — recorded as a "Design pass #1 — calibration answers"
  addendum in `design/brand-design-brief.md`. Not yet a locked ADR;
  finalize once Anton reviews Claude Design's actual output.

## [2026-06-28] phase | Phase 1 Task 3 — Reusable content components

- Built six reusable components in `src/components/ui/`, all prop-driven, all
  working in light and dark mode via Task 1's token system:
  - `DividerMotif` — full-width SVG (exact path from raw HTML), ink stroke at
    45% opacity, accent-bright dot; no props
  - `MiniChart` — variant prop ("steady" | "jagged"); viewBox 300×120, shared
    baseline; steady has rising curve + teal endpoint dot, jagged has dashed
    zigzag; used inside ContrastCardPair
  - `StatChart` — full signature motif (680×300 viewBox); 6 props for caption,
    three curve labels, and legend text; renders as `<figure>` with bordered card
    and figcaption legend row; SVG strokes use `var(--color-*)` directly for
    dark mode without `dark:` overrides
  - `Hero` — eyebrow → H1 → subhead → CTA button, 2-col grid with chart slot;
    CTA uses `bg-ink text-page` which auto-inverts in dark mode via tokens
  - `ContrastCardPair` — `bg-raised` section, 2-card grid; eyebrowAccent bool
    controls `text-accent` vs `text-secondary` for us/them differentiation;
    accepts MiniChart variant per card
  - `MissionStatement` — centered large pull-quote, `body: React.ReactNode` so
    callers wrap accent words in `<span className="text-accent">`
  - `PrincipleGrid` — 3-col grid, always 3 principles, auto-numbered 01/02/03
    in JetBrains Mono, hairline `border-t` above the row
- Created throwaway `src/app/test-components/page.tsx` showing each component
  twice (different props) in a light/dark split layout; all verified visually.
  Delete by Task 4.

## [2026-06-28] phase | Phase 1 Task 2 — Shared layout shell

- Built `NavBar` (Server Component): two-dot accent logo mark + "NORA" wordmark
  (Space Grotesk 600) + three nav links (Science · Mission · Products) + outlined
  mono CTA pill "Read the mechanism →". Sticky, hairline `border-b border-border`.
- Built `Footer` (Server Component): `bg-raised` surface, logo+tagline column,
  RESEARCH and COMPANY link columns with mono uppercase headers, mono copyright line.
  Copy sourced exactly from `marketing/home-page-copy-v2.md`.
- Built `ThemeToggle` (Client Component): moon/sun icon toggle, reads
  `localStorage` on mount, toggles `.dark` on `<html>`, persists preference.
  Uses `mounted` guard to avoid icon flicker on first render.
- FOUC prevention: inline `<script>` at top of `<body>` reads `localStorage`
  synchronously before any content renders; `suppressHydrationWarning` on `<html>`.
- Updated `layout.tsx` to compose NavBar + `<main>` + Footer; updated marketing
  placeholder page to use design system tokens.
- Acceptance check passed: both modes correct visually, dark mode persists across
  reload with no flash, build clean.

## [2026-06-28] phase | Phase 1 Task 1 — Design tokens wired into Tailwind

- Replaced placeholder Geist fonts with **Space Grotesk** (400/500/600/700) and
  **JetBrains Mono** (400/500) via `next/font/google`; both exposed as CSS vars
  `--font-space-grotesk` / `--font-jetbrains-mono` and wired into Tailwind `@theme`
  as `--font-sans` / `--font-mono`.
- Rewrote `src/app/globals.css` with Tailwind v4 `@theme` block: all nine color
  tokens from `design-system.md` + `design-tokens.md` (page, raised, card, primary,
  ink, secondary, border, accent, accent-bright), radius scale capped at 1–3px
  everywhere, dark-mode custom variant via `@custom-variant dark`.
- `.dark {}` block carries the dark-mode overrides; class-based strategy means
  `dark:` Tailwind prefix works for any ancestor with `.dark`.
- Created throwaway `src/app/test-tokens/page.tsx` rendering both modes
  side-by-side (light half + `.dark`-wrapped dark half) — visually confirmed
  against `docs/raw/design/home-design-pass-1.html`; production build clean.

## [2026-06-29] ingest | Real brand assets — extracted authoritative color palette

- Anton provided the existing logo (`nora_logo_N.svg`) and a product
  shot of the printed NeuroDrive label
  (`product_shot_without_bg.jpeg`) — both copied into
  `docs/raw/design/`.
- Pixel-sampled the label photo and read exact hex values from the SVG
  to extract the real, already-approved color palette rather than
  guessing one: charcoal-teal ink (#2E3A3C), near-black body text
  (#242424), mint/teal accent (#1E9C78, confirmed against the SVG's
  exact authored value), a brighter highlight teal (#14B089) and mid-gray
  (#696C6D) both present in the SVG's shading layers, warm off-white
  paper (#FAFAF7), amber bottle glass (#7E4A12, sparing/optional use),
  true black (#0A0A0A).
- Wrote `design/design-tokens.md` as the new authoritative color source,
  explicitly superseding the earlier "cool/technical, instrument-panel
  blues" instinct given to Claude Design (that was a reasonable guess
  before real assets existed — it specified blue, the actual brand color
  is teal/mint, and the corrected page says so).
- Open item flagged for Anton: the SVG contains an apparent
  extruded/3D-shaded render of the logo (highlight + bevel layers) in
  addition to the flat 2-tone version seen on the label — needs a
  decision on whether the 3D version is used anywhere on the site.

## [2026-06-28] phase | Phase 1 Task 4 — NORA home / mission page

- Built `src/app/(marketing)/page.tsx` using all Task 3 components.
- Replaced Phase-0 placeholder with the full page structure:
  Hero → DividerMotif → ContrastCardPair → MissionStatement →
  DividerMotif → PrincipleGrid.
- StatChart re-captioned for NORA platform level: `FIG.01 — SIGNAL vs.
  NOISE`, labels VALIDATED / HYPED / FORGOTTEN, legend NORA / Hype cycles.
- MissionStatement body highlights "NORA" in `text-accent` (teal) as the
  sole color accent in the pull-quote, per design-system spec.
- ContrastCardPair eyebrows: `NORA — RESEARCH-LED` (accent) vs.
  `INDUSTRY — HYPE-LED` (neutral), both cards wired to MiniChart variants
  (steady / jagged).
- Section IDs `#science` and `#mission` added as wrapper divs for nav
  anchor links (full nav wiring comes in Task 7).
- All copy matches `marketing/home-page-copy-v2.md` exactly.
- Verified: page renders correctly in both light and dark mode; tsc
  --noEmit clean; 200 OK from running dev server.

## [2026-06-28] phase | Phase 1 Task 5 — Generic product page template

- Created `src/lib/copy/products.ts` with `ProductData` interface and
  `getProduct` / `getAllProductSlugs` helpers. NeuroDrive is the first
  (and currently only) entry — placeholder-but-structurally-correct copy
  with product-level (NeuroDrive) voice, not NORA-level.
- Created `src/app/(shop)/products/[slug]/page.tsx` as a fully
  data-driven async server component. Uses `await params` per Next.js
  16 API (params is a Promise). Calls `notFound()` for unknown slugs.
  `generateStaticParams` derived from the products list.
- Template structure mirrors the home page but with product framing:
  Hero (SUSTAINED vs. SPIKED chart) → DividerMotif → ContrastCardPair
  (SYNTHESIS-LED vs. RELEASE-LED) → MissionStatement (mechanism
  pull-quote) → DividerMotif → PrincipleGrid.
- No NeuroDrive-specific strings hardcoded in the template — all text
  comes from the data object keyed by slug.
- Acceptance check: `/products/neurodrive` renders correctly in dark
  mode; `/products/unknown-product` returns 404; tsc --noEmit clean.

## [2026-06-28] phase | Phase 1 Task 6 — Checkout shell (manual-confirmation, UI only)

- Created `src/app/(shop)/checkout/page.tsx` as a client component
  (interactive form state + confirmation toggle).
- All fields per `architecture/manual-payment-flow.md`: name, email,
  phone, address (line 1, line 2 optional, city, state, postal code,
  country), product/quantity select, optional note textarea.
- No payment fields, no DB wiring — form submission console.logs only,
  per Task 6 scope.
- Confirmation state replaces the form: NORA dot-pair accent, "Order
  received." heading, explicit "payment isn't processed yet" copy,
  order summary card (name, email, product, qty), mono footer line.
- Design: locked tokens throughout (bg-card inputs, border-border hairlines,
  2px radius, mono section labels, bg-ink submit button, Space Grotesk
  body). Section dividers are hairline border-t between Contact /
  Shipping / Your order / Note / Submit groups.
- Verified: form renders correctly in light mode; confirmation state
  shows after submit; tsc --noEmit clean.

## [2026-06-28] phase | Phase 1 Task 7 — Navigation wiring + deploy

- Added "Place an order" checkout CTA section to product page template
  (bottom of page, below PrincipleGrid), completing the
  home → products → checkout flow.
- Navigation wiring confirmed:
  - Home: NavBar "Products" → `/products/neurodrive` ✓
  - Home: NavBar "READ THE MECHANISM →" → `/products/neurodrive` ✓
  - Home: Hero CTA "See how we evaluate compounds" → `/#science` ✓
  - Product: Hero CTA "Read the mechanism" → `#mechanism` ✓
  - Product: "Place an order" → `/checkout` ✓
  - All pages: NORA wordmark → `/` ✓
  - Footer: RESEARCH / COMPANY links wired ✓
- Dark mode persists across all navigation (localStorage + inline script
  in layout.tsx prevents flash; verified on live Vercel URL).
- `npm run build` passed clean (8 static/SSG pages, no errors).
- Deployed to Vercel production: https://nora-lovat.vercel.app
  Project: isribs-projects/nora
- Live click-through verified: home → products/neurodrive → checkout →
  home (via logo), in dark mode throughout. No console errors.
- Roadmap updated: Phase 1 marked done, Phase 2 marked next.

## [2026-06-29] decision | Phase 1 done, deployed; Phase 1.5 inserted before the database layer
 
- Phase 1 (7 tasks) completed and pushed to `lnnemml/nootropics`. Anton's
  review: design system holds up well, but the site reads as "too
  generic, not a real e-commerce site yet" — correct assessment for a
  structural pass.
- Inserted **Phase 1.5 — Site completeness** before Phase 2 (database):
  product photo + price block (price explicitly blocked on Anton — not
  invented), a `useCart` hook with localStorage persistence (designed so
  Phase 4's DB-backed cart is a hook-internals swap, not a UI rewrite),
  About page, FAQ page (built directly from
  `product/beliefs-and-objections.md`'s objection map), and legal/
  technical pages (Terms, Privacy, Refund, Shipping — flagged explicitly
  as AI-drafted templates needing real legal review, not launch-ready
  as-is).
- Recorded as ADR 0008. New page
  [`phase-1.5-implementation-plan.md`](./phase-1.5-implementation-plan.md)
  with 6 atomic tasks. `roadmap.md` updated (Phase 1 marked done, Phase
  1.5 inserted — phases 2–7 not renumbered, to avoid breaking existing
  cross-references). `CLAUDE.md` updated with the no-invented-price and
  legal-templates-need-review constraints.

## [2026-06-29] decision | Phase 1.5 format corrected — open punch list, not fixed tasks 

- Anton corrected the execution structure of Phase 1.5: not a fixed
  atomic-task breakdown with acceptance checks (that was right for
  Phase 1's well-defined architectural scope, wrong here — he can't yet
  size "make this look finished," so a locked task list would be false
  precision).
- Rewrote `phase-1.5-implementation-plan.md` as an open, reorderable
  punch list: header → home page → product page → maybe starter
  articles → checkout → about → faq → legal pages, in *rough* order
  only. "Done" is Anton's subjective call that the site looks externally
  finished, not a checklist completion.
- Standing constraints carried over unchanged: never invent a real
  price, cart goes behind a `useCart` hook for the later DB swap, legal
  pages are templates not final text.
- Amended ADR 0008 with this correction (the underlying decision — finish
  the static site before the database layer — didn't change, only how
  rigidly it's planned). Updated `roadmap.md`'s Phase 1.5 section to
  match.

## [2026-06-29] phase | Nav shell hardening — mobile nav, responsive gutter, context CTA, root metadata

- **Mobile hamburger nav** (`NavBar.tsx`): below `md`, text links + CTA pill
  collapse into a hamburger-triggered overlay panel (`bg-page`, `border-border`,
  2px radius tokens). Logo + theme toggle remain always visible. Above `md`,
  desktop layout unchanged.
- **Responsive gutter** (`Container.tsx`): extracted a `Container` layout
  primitive at `src/components/layout/Container.tsx` with `px-4 sm:px-6
  md:px-[72px]` — applied to NavBar. A TODO comment in `Container.tsx` flags
  that Footer.tsx and the section components (Hero, ContrastCardPair,
  PrincipleGrid, MissionStatement, DividerMotif, product page checkout CTA)
  still use the hardcoded `px-[72px]` gutter and should migrate in a fast
  follow.
- **Context-aware CTA** (`NavBar.tsx`): "Read the mechanism →" pill is hidden
  on `/products/*` and `/checkout` routes via `usePathname` — now client
  component (`"use client"`). Visible everywhere else (home, future about/faq).
- **Root metadata** (`layout.tsx`): title changed to `"NORA — Nootropics
  Research Alliance"`. Product page (`(shop)/products/[slug]/page.tsx`) adds
  `generateMetadata` exporting `"${product.name} | NORA"` — confirms ADR 0007
  brand-hierarchy split down to the browser tab.
- `tsc --noEmit` clean.

## [2026-06-29] ingest | Commit 1 — Logo integration

- **`src/components/ui/Logo.tsx`** — new component, inline SVG of the NORA
  stacked lockup (`public/nora_logo.svg`, 39KB source). 5 layered paths,
  fills mapped to CSS tokens: `#2b3235` + `#334d48` → `var(--color-ink)`;
  `#696c6d` → `var(--color-secondary)`; accent teal values stay as hex
  (`#1E9C78`, `#14B089`). Accepts a `height` prop (nav: 38px, footer: 44px);
  viewBox crops to `"246 260 660 613"` so the logo renders tightly without
  the blank canvas margins from the Inkscape export.
- **`src/app/icon.svg`** — favicon, sourced from `neurodrive_logo_N.svg`
  (the N-mark only, not the full stacked lockup — better for 16-32px),
  viewBox cropped to `"365 270 430 440"`. Uses static hex fills since
  favicons don't support CSS variables. Resolves the open item in
  `design-tokens.md` about the extruded logo: layered lockup → header/footer;
  flat N-mark → favicon.
- **NavBar.tsx, Footer.tsx** — `LogoMark()` replaced with `<Logo />`.
- **`design/design-system.md`** — Logo section added to Components list.
- `tsc --noEmit` clean.

## [2026-06-29] phase | Commit 2 — Header nav restructure + placeholder pages

- **NavBar.tsx**: NAV_LINKS updated to Products / About / Journal / Contact.
  CTA pill changed from "Read the mechanism →" (→ `/products/neurodrive`)
  to "Order now →" (→ `/checkout`). Context-aware hide logic unchanged (pill
  hides on `/products/*` and `/checkout`).
- **`(marketing)/about/page.tsx`** — placeholder: mono eyebrow + H1 +
  muted body. Real content (from `product/overview.md` + `brand-hierarchy.md`)
  deferred to Phase 1.5 item 6.
- **`(marketing)/contact/page.tsx`** — minimal: heading + `hello@nora.so`
  mailto button. Added as Phase 1.5 item 7 in `phase-1.5-implementation-plan.md`.
- **`(blog)/blog/page.tsx`** — placeholder index: mono eyebrow + H1 + muted
  body. Article content deferred to Phase 1.5 item 4.
- **Footer.tsx COMPANY column**: "Mission" stays; "Contact" now links to
  `/contact` (was raw mailto); "About" added.
- `tsc --noEmit` clean.

## [2026-06-29] phase | Cart icon + mobile header layout

- **`src/lib/cart/useCart.ts`** — localStorage-backed cart hook. Shape:
  `[{ slug, qty }]`. Exposes `addItem` / `removeItem` / `setQty` /
  `itemCount` / `items`. Starts empty to match server render; populates
  from localStorage on mount (no hydration mismatch). All localStorage
  access isolated here — components never call it directly (per Phase 1.5
  standing constraint: hook internals are Phase 4's swap point).
- **`src/components/ui/CartIcon.tsx`** — outline bag icon (18×18, 1.4
  stroke, `currentColor`), accent-colored count badge (top-right, hidden
  when empty, "99+" cap). Wraps a Link to `/cart`.
- **NavBar.tsx** — removed `usePathname` + `showCta` + "Order now →" CTA
  entirely. Desktop right: ThemeToggle + CartIcon. Mobile right (always
  visible, outside hamburger): ThemeToggle + CartIcon + hamburger button.
  Mobile slide-down panel: 4 nav links only, no CTA duplicate.
- **`src/app/(shop)/cart/page.tsx`** — client component using `useCart`.
  Empty state: "Nothing here yet" + link to NeuroDrive. Non-empty: line
  items with qty stepper (± buttons via `setQty`) + remove button, plus
  "Proceed to checkout →" link stub. Checkout handoff wiring deferred to
  punch-list item 5.
- `tsc --noEmit` clean.

## [2026-06-29] phase | Logo patch — N icon-mark + text wordmark at nav size

- **Logo.tsx rewritten**: swapped from the 39KB full stacked lockup
  (`nora_logo.svg`) to the 5-path N icon-mark only (`neurodrive_logo_N.svg`),
  rendered as a 24×24 inline SVG with viewBox "365 270 430 440" (crops to
  the N content area). Same color-token mapping as before. "NORA" wordmark
  is now a plain text `<span>` (Space Grotesk 14px font-semibold text-ink)
  next to the icon — matches the original placeholder LogoMark() pattern,
  just with the real geometric mark in place of the CSS dots. `height` prop
  removed (fixed 24px icon, text scales with font).
- Full stacked lockup remains at `public/nora_logo.svg` for future
  large-size placements (About hero, OG image) — not deleted.
- NavBar.tsx and Footer.tsx updated: removed now-invalid `height` prop.
- Verified at 100% browser zoom: N mark crisp, wordmark readable, favicon
  N-mark visible in tab. `tsc --noEmit` clean.

## [2026-06-29] phase | Logo viewBox fix + path5 restore + cart redirect

- **Logo.tsx viewBox corrected**: changed from `"365 270 430 440"` to `"318 243
  338 333"` (artwork bounding box 322–652 x / 247–572 y from source SVG, +4px
  padding per side so strokes/dots aren't clipped). Previous viewBox was an
  eyeballed approximation that cropped the leftmost stroke of the N.
- **path5 `d` attribute restored**: the 3rd path (bevel-shadow layer,
  `fill:#1E9C78`) had a literal `"path5"` string as its `d` value — a
  copy/extraction error from the previous session. Pulled the real path data
  from `docs/raw/design/neurodrive_logo_N.svg` id="path5". All 5 layers now
  render.
- **CartIcon.tsx**: `href` changed from `/cart` to `/checkout`. The existing
  `src/app/(shop)/cart/page.tsx` remains in place but is currently dead code —
  not linked from anywhere, parked for a future cart-review step if one gets
  added to the roadmap.
- `tsc --noEmit` clean.

## [2026-06-30] fix | Container maxWidth double-shrink bug

**Bug:** `maxWidth` prop on Container (added in the mobile pass) was
double-shrinking text columns. Container's `md:px-[72px]` gutter applies
*inside* the max-width box, so `maxWidth="max-w-[760px]"` on the Hero
no-chart variant left only ~616px of usable text width.

**Fix:** removed the `maxWidth` prop from Container entirely. Narrower
text columns are now an inner `mx-auto max-w-[...]` div *inside* a
normal `<Container>` (gutter + max-w-7xl). Hero no-chart variant and
MissionStatement both use this pattern. No other component had the prop.

Subhead `max-w-[520px]` bumped to `max-w-[620px]` in Hero to match the
wider 860px text column (520px looked disproportionately narrow).

`tsc --noEmit` clean.

## [2026-06-30] phase | Mobile responsiveness pass — sitewide

All section components migrated to `Container` (`src/components/layout/Container.tsx`)
and given mobile-first breakpoint classes. `md` (768px) is the
mobile/desktop split, matching NavBar's existing hamburger breakpoint.

**Container changes:** `maxWidth` prop added (default `max-w-7xl`); TODO
comment removed.

**Per-component changes:**
- **Hero** — 2-col grid now `grid-cols-1 md:grid-cols-[1.05fr_1fr]`. H1
  `style={{fontSize:"clamp(...)"}}` replaced with `text-[36px] sm:text-[46px]
  md:text-[clamp(62px,5.5vw,74px)]` — clamp now only applies at `md+`, mobile
  gets explicit step sizes. `py-[80px]` → `py-12 md:py-[80px]`.
- **ContrastCardPair** — card grid `grid-cols-1 md:grid-cols-2`. Footnote
  row stacks vertically below `sm`. `py-[72px]` → `py-12 md:py-[72px]`.
  Section H2 `style={{fontSize:clamp(...)}}` → `text-[24px] md:text-[clamp(...)]`.
- **MissionStatement** — pull-quote `style={{fontSize:clamp(...)}}` →
  `text-[26px] sm:text-[30px] md:text-[clamp(34px,3vw,37px)]`. `py-[96px]` →
  `py-16 md:py-[96px]`.
- **PrincipleGrid** — `grid-cols-3` → `grid-cols-1 md:grid-cols-3`. `pb-[88px]`
  → `pb-10 md:pb-[88px]`. `pt-[44px]` → `pt-8 md:pt-[44px]`.
- **ReleaseCatalog** — grid `grid-cols-1 md:grid-cols-[1.7fr_1fr_1fr]`. Live
  card image col `88px` mobile, `100px` sm+. `py-[88px]` → `py-12 md:py-[88px]`.
- **DividerMotif** — hardcoded `px-[72px]` div replaced by `Container` wrapper.
- **Footer** — `grid-cols-[1fr_auto_auto]` → `grid-cols-1 sm:grid-cols-2
  md:grid-cols-[1fr_auto_auto]`. `px-[72px] py-16` moved into Container
  (`py-12 md:py-16`).
- **page.tsx (marketing) + products/[slug]/page.tsx** — inline CTA sections
  migrated from `px-[72px]` + `mx-auto max-w-7xl` to `Container`. CTA H2
  heading: `style={{clamp(...)}}` → `text-[22px] md:text-[clamp(28px,2.5vw,34px)]`.

Mobile breakpoint conventions documented in `design/design-system.md` under
new "Mobile breakpoints" section.

`tsc --noEmit` clean.

## [2026-06-30] phase | Home page v5 — section order, new H1, citation footnote, closing CTA

Four structural changes in one pass:

1. **New eyebrow + revised H1/subhead.** Eyebrow now names the platform
   explicitly ("NORA — Nootropics Research Alliance") — the old "Built for
   people who can't afford an off day" line now lives in the subhead where
   it has room to breathe. H1 revised from Anton's draft ("proven
   efficiency") to "a cited trial" — factually tighter and avoids an
   efficacy claim that conflicts with the footer's FDA disclaimer. Flagged
   in `home-page-copy-v5.md` so Anton can revert if he prefers his phrasing.

2. **Section order swapped.** ReleaseCatalog now comes before
   ContrastCardPair. The product appears first (the thing a visitor can
   actually buy), then the methodology section follows as the "why trust
   this" argument. Leads with the what before the how.

3. **Citation footnote on ContrastCardPair.** New optional `footnote` prop
   (citation tag + link). Home page passes the PMID 21322821 bromantane
   trial data and a "Read more on the Journal →" link to `/blog`. The
   `#science` anchor wrapper stays on the ContrastCardPair — nav links still
   resolve. Product page is unaffected (doesn't pass `footnote`).

4. **Closing CTA section.** Inline `<section>` (no new component — doesn't
   warrant one) before the footer: mono eyebrow "Ready when you are" + H2
   "Start with NeuroDrive" + product CTA button. Gives the page a landing-
   page-style exit ramp rather than ending on the PrincipleGrid.

**Files changed:**
- `src/components/ui/ContrastCardPair.tsx` — `footnote` prop added, `Link` import added
- `src/app/(marketing)/page.tsx` — v5 structure
- `docs/wiki/marketing/home-page-copy-v5.md` — new (supersedes v4)
- `docs/wiki/marketing/home-page-copy-v4.md` — superseded header added
- `docs/wiki/index.md` — v4 marked superseded, v5 added as current
- `docs/wiki/phase-1.5-implementation-plan.md` — item 10 added (mobile
  responsiveness pass, deferred by Anton until content is finalized)

## [2026-06-30] phase | Home page v4 — drop chart motif, add ReleaseCatalog

Anton reviewed v3 live in the browser. Feedback: chart motif "looks generic,
like fake data." Root cause: the steady/jagged curves earn their place on the
product page (they map to a real physiological dynamic — dopamine synthesis
rate vs. stimulant spike). Generalized to the platform level as SIGNAL vs.
NOISE they have no concrete referent and read as decorative infographic,
which undercuts the page's own evidence-over-hype claim.

**Changes:**

1. **Chart motif removed from home.** `Hero.chart` and
   `ContrastCardPair.cards[].chartVariant` made optional (backward compatible —
   product page compiles unchanged). Home page no longer passes either prop.
   ADR 0009 records the decision and flags the revisit trigger: product page
   polish pass (Phase 1.5 item 3) should evaluate whether the motif still
   earns its place there.

2. **FeaturedRelease replaced by ReleaseCatalog.** New component
   (`src/components/ui/ReleaseCatalog.tsx`): eyebrow + intro + asymmetric
   3-col grid. Slot 1 is the live product card (NeuroDrive, white-bg photo +
   CTA); slots 2–3 are dashed-border "in research" placeholders at 55%
   opacity. This signals platform ambition ("we're building a catalog") without
   inventing products — consistent with the "curated, not exhaustive" wedge
   from `competitive-landscape.md`.

3. **Product photo swapped.** `public/neurodrive-bottle.jpg` overwritten with
   `product_shot_white_bg.jpeg` (was the transparent-bg version).

**Files changed:**
- `src/components/ui/Hero.tsx` — `chart` prop made optional, layout conditional
- `src/components/ui/ContrastCardPair.tsx` — `chartVariant` made optional, MiniChart render guarded
- `src/components/ui/ReleaseCatalog.tsx` — new component
- `src/components/ui/FeaturedRelease.tsx` — deleted (superseded by ReleaseCatalog)
- `public/neurodrive-bottle.jpg` — overwritten with white-bg version
- `src/app/(marketing)/page.tsx` — v4 structure
- `docs/wiki/decisions/0009-retire-chart-motif-on-home.md` — new ADR
- `docs/wiki/design/design-system.md` — motif deprecated note + ReleaseCatalog in component list
- `docs/wiki/marketing/home-page-copy-v4.md` — new (supersedes v3)
- `docs/wiki/marketing/home-page-copy-v3.md` — superseded header added
- `docs/wiki/index.md` — v3 line marked superseded, v4 + ADR 0009 added

## [2026-06-30] phase | Home page v3 — proof point + FeaturedRelease teaser

Three problems fixed in one pass (Phase 1.5 punch-list item 2):

1. **Hero/Mission redundancy removed.** Both v2 sections said "mechanism
   we can name and a study we can cite." Mission body now focuses on
   NeuroDrive as proof of the standard, not a restatement of the platform
   pitch. Hero H1 sharpened to a direct claim ("We name the mechanism. Or
   we don't ship it.") and CTA now points to the product page, not `#science`.

2. **ContrastCardPair cards now prove the claim instead of asserting it.**
   NORA card names the actual mechanism: bromantane → tyrosine hydroxylase
   → dopamine synthesis rate. Industry card describes a realistic foil
   (twelve-ingredient blend, undisclosed doses, one study covering one
   component). The page earns its "no unproven claims" line rather than
   just making it.

3. **Product is now visible on the home page.** New `FeaturedRelease`
   component (eyebrow / product name / body / CTA + product photo in a
   `bg-card` card) sits between ContrastCardPair and MissionStatement.
   Uses only locked design-system tokens; no new colors, radii, or font
   sizes. Product photo reused from `docs/raw/design/product_shot_without_bg.jpeg`
   (same asset earmarked for the product page in item 3 — not new scope).

**Files changed:**
- `src/components/ui/FeaturedRelease.tsx` — new component
- `public/neurodrive-bottle.jpg` — product photo added
- `src/app/(marketing)/page.tsx` — replaced with v3 structure
- `docs/wiki/marketing/home-page-copy-v3.md` — new (supersedes v2)
- `docs/wiki/marketing/home-page-copy-v2.md` — superseded header added
- `docs/wiki/index.md` — v2 line marked superseded, v3 line added
- `docs/wiki/phase-1.5-implementation-plan.md` — item 2 marked done,
  item 3 price unblocked ($120 confirmed by Anton 2026-06-30)
