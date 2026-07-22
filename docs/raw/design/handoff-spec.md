# NeuroDrive /go — Tailwind Handoff Spec

Visual redesign only. No copy, section order, component logic, or npm changes. Palette, fonts, and `rounded-[2px]` stay locked.

---

## 0. globals.css additions

Add these utilities (with comments) — used across sections:

```css
/* --- Premium redesign utilities --- */

/* Noise/grain overlay for dark sections. Apply to a section with position:relative,
   then add an absolutely-positioned child div with .noise-overlay */
.noise-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.045;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='2' stitchTiles='stitch'/></filter><rect width='240' height='240' filter='url(%23n)' opacity='0.5'/></svg>");
}

/* Primary CTA gradient (teal, subtly dimensional) */
.cta-gradient {
  background: linear-gradient(160deg, #22b189 0%, #1e9c78 55%, #178263 100%);
}

/* Teal hairline divider glow, for section top/bottom edges */
.teal-hairline {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(30,156,120,0.4), transparent);
}

/* Radial teal glow blob (hero, carousel halo) */
.teal-glow {
  background: radial-gradient(circle, rgba(30,156,120,0.16) 0%, rgba(30,156,120,0) 65%);
}
```

Recurring class strings (referenced below as tokens):

- **FRAME** (image mount, dark sections): `border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-4 rounded-[2px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]` (p-2 on mobile)
- **QUOTE-CARD** (dark card): `bg-gradient-to-br from-[#2b3235] to-[#262d30] border-l-2 border-l-[#1e9c78] rounded-[2px] shadow-[0_32px_64px_-32px_rgba(43,50,53,0.5)] transition-all duration-300 hover:-translate-y-[3px]`
- **H2-HEADER**: flex row `flex items-center gap-4 mb-14` with `<div class="w-8 h-px bg-[#1e9c78]">` rule + `text-[34px] font-bold tracking-[-0.015em]` (26px mobile)
- **SECTION-PAD**: `py-[140px]` desktop / `py-[88px]` mobile (was py-24). Applies to S03, S04, S06–S10, S12–S14.

---

## 1. `_components/CtaButton.tsx`

**Primary variant:**
```
inline-flex items-center justify-center rounded-[2px] px-10 py-[18px]
text-[17px] font-semibold tracking-[0.01em] text-white cta-gradient
border border-white/[0.14]
shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_12px_32px_-8px_rgba(30,156,120,0.45)]
transition-all duration-200
hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_18px_44px_-8px_rgba(30,156,120,0.6)]
```

**Outline variant:**
```
inline-flex items-center justify-center rounded-[2px] px-[38px] py-[17px]
text-base font-semibold tracking-[0.01em]
border border-[#1e9c78]/65 text-[#1e9c78] bg-[#1e9c78]/[0.06]
transition-colors duration-200
hover:bg-[#1e9c78] hover:text-white hover:border-[#1e9c78]
```

Mobile: both become `flex w-full min-h-[56px]` inside sections; add `active:scale-[0.98]`.

## 2. `_sections/S00TopBar.tsx`

- bg `#222a2e` → `bg-[#1f2528] border-b border-white/[0.06]`, `py-[13px]`
- Message: `font-mono text-[10px] uppercase tracking-[0.18em] text-white/50`
- Nav links: `tracking-[0.14em] text-white/45 hover:text-[#1e9c78] transition-colors gap-7`; "Order" link permanently `text-[#1e9c78] hover:text-white`
- Mobile: hide nav links, center the message, `text-[9px] leading-relaxed text-center`

## 3. `_sections/S01Hero.tsx` + `_components/HeroCarousel.tsx`

Section:
- bg: `bg-gradient-to-b from-[#22282b] via-[#2b3235] to-[#2b3235]`, `pt-24 pb-32 relative overflow-hidden`
- Add `.noise-overlay` child (opacity 0.05 here) + a positioned teal glow: `absolute -top-[20%] -right-[8%] w-[720px] h-[720px] teal-glow`
- Bottom edge: `.teal-hairline` absolutely positioned at bottom
- Grid gap `gap-12` → `gap-[72px]`

Text column:
- Eyebrow: prefix with `<div class="w-6 h-px bg-[#1e9c78]">`, `font-mono text-[11px] uppercase tracking-[0.22em] text-[#1e9c78] mb-7`
- H1: `text-[50px] leading-[1.06] tracking-[-0.02em] mb-7 [text-wrap:pretty]` (31px / leading-[1.12] mobile); the "(Zero Caffeine)" span → `text-white/40 font-medium`
- Paragraph: `text-[19px] text-white/[0.68] leading-[1.65] max-w-[580px] mb-10`
- Spec line → badge: wrap in `inline-flex border border-white/[0.12] bg-white/[0.04] rounded-[2px] px-4 py-[9px]`, text `font-mono text-[11px] uppercase tracking-[0.12em] text-white/65`; stack CTA above badge with `gap-6`

Carousel (HeroCarousel.tsx):
- Wrap the carousel in a mount: outer `relative` with `absolute -inset-10 teal-glow` halo, then frame `relative border border-white/[0.12] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-3 rounded-[2px] shadow-[0_48px_96px_-32px_rgba(0,0,0,0.6)]` (p-2 mobile)
- Inner bg `#2b3235` → `#22282b`
- Slide transition: `duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]`
- Dots → bars: active `w-6 h-0.5 bg-[#1e9c78]`, inactive `w-2.5 h-0.5 bg-white/30`, `rounded-[1px] transition-all duration-300`
- Caption overlays: gradient to `black/70`, captions `font-mono text-[11px] uppercase tracking-[0.14em] text-white/70`, padding `pt-10 px-5 pb-[18px]`

## 4. `_sections/S02SocialProofBar.tsx`

- `bg-[#f0f1f0]` → `bg-[#f8f9fa] border-b border-[#2b3235]/[0.07]`, `py-[26px]`
- Items: `gap-2.5 px-7`, dividers `bg-[#2b3235]/[0.12] h-5`
- Mobile: `grid grid-cols-2 gap-x-3 gap-y-3.5`, no dividers, `text-xs`

## 5. `_sections/S03PainSection.tsx`

- SECTION-PAD; H2 `text-[42px] leading-[1.12] tracking-[-0.02em] mb-12` (30px mobile)
- Salutation line: `font-mono text-sm tracking-[0.06em] text-[#2b3235]/55`
- Checklist `<ul>` → card: `bg-white border border-[#2b3235]/[0.08] rounded-[2px] p-7 px-8 gap-[18px] shadow-[0_16px_40px_-24px_rgba(43,50,53,0.25)]`; check marks `font-mono`
- Body text: `text-[19px] text-[#2b3235]/75 leading-[1.7] gap-[26px]` (17px mobile)
- Big statement lines: `text-[26px] font-bold tracking-[-0.01em] leading-[1.3]` (21px mobile)
- Final teal line: wrap in `border-l-2 border-[#1e9c78] pl-6`
- before-after.png → light frame: `mt-[72px] bg-white border border-[#2b3235]/[0.08] p-3.5 rounded-[2px] shadow-[0_32px_64px_-36px_rgba(43,50,53,0.35)]`

## 6. `_sections/S04UgcProof.tsx` + `_components/VideoPlaceholder.tsx`

Section: SECTION-PAD, bg `bg-gradient-to-b from-[#2b3235] to-[#262d30]`, `relative overflow-hidden` + `.noise-overlay`; H2 → H2-HEADER pattern.

VideoPlaceholder → poster treatment:
- Container: `relative border border-white/10 rounded-[2px] overflow-hidden cursor-pointer transition-all duration-[250ms] hover:-translate-y-[3px] hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.6)]`
- Poster image (`object-cover opacity-85`) + scrim `bg-gradient-to-t from-black/65 to-black/10`
- Play button: `w-14 h-14 rounded-full bg-white/[0.12] border border-white/40 backdrop-blur-[8px]` centered, white triangle
- Bottom row: label `font-mono text-[10px] uppercase tracking-[0.12em] text-white/85` + duration chip `font-mono text-[10px] text-white/70 bg-black/50 px-[7px] py-[3px] rounded-[2px]`
- Grid: `gap-5 mb-14`; mobile stacks 1-col

Quote cards (light-on-dark glass):
```
bg-gradient-to-br from-white/[0.055] to-white/[0.02]
border border-white/10 border-l-2 border-l-[#1e9c78] rounded-[2px]
pl-24 pr-12 pt-10 pb-9 relative
shadow-[0_24px_56px_-28px_rgba(0,0,0,0.55)]
transition-all duration-[250ms] hover:-translate-y-0.5 hover:border-[#1e9c78]/35
```
- Quote mark: `text-[110px] leading-none text-[#1e9c78] absolute top-[22px] left-[30px] opacity-50 font-serif` (Georgia)
- Quote text: `text-[21px] font-medium leading-[1.6] relative z-[1]`
- Attribution: `flex items-center gap-3` — `w-7 h-px bg-[#1e9c78]/60` rule + `font-mono text-[11px] uppercase tracking-[0.14em] text-[#6b8480]`
- Mobile: `pt-11 px-6 pb-[26px]` (quote mark 72px at top-3.5 left-5), text 17px

## 7. `_sections/S05BenefitIcons.tsx` + `_components/BenefitIcon.tsx`

- Section `py-[72px] border-b border-[#2b3235]/[0.06]`, gap `gap-11`
- Replace emoji with inline stroke SVGs (24–28px, stroke `#1e9c78`, stroke-width 1.5–2) — see the mockup files for the seven glyphs
- Icon container: `w-16 h-16 flex items-center justify-center bg-white border border-[#2b3235]/10 rounded-[2px] shadow-[0_8px_20px_-12px_rgba(43,50,53,0.25)] transition-all duration-[250ms] hover:border-[#1e9c78]/50 hover:-translate-y-[3px]`
- Label: `font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-[#2b3235]/75 mt-3.5`
- Mobile: `grid grid-cols-3 gap-x-3 gap-y-6`, containers `w-14 h-14`, labels 9px

## 8. `_sections/S06ValueProp1.tsx` / `S12ValueProp3.tsx` (dark image-led)

- SECTION-PAD, `relative overflow-hidden` + `.noise-overlay`
- Image → FRAME, `mb-16`
- H2: `text-[34px] leading-[1.15] tracking-[-0.015em] mb-6 [text-wrap:pretty]`; copy `text-[17px] text-white/[0.72] leading-[1.7]`, last para `mb-10`
- Text block `max-w-[640px]`
- S06 CTA = outline variant; S12 = primary

## 9. `_sections/S07ValueProp2.tsx`

- SECTION-PAD, grid `gap-20`
- Image: offset teal outline behind — wrapper `relative`, `absolute top-6 left-6 -right-6 -bottom-6 border border-[#1e9c78]/35 rounded-[2px]` + photo `h-[540px] rounded-[2px] overflow-hidden shadow-[0_48px_96px_-48px_rgba(43,50,53,0.5)]`
- Type scale same as S06 (dark-on-light colors: `text-[#2b3235]`, copy `text-[#2b3235]/[0.72]`)
- Mobile: text → image (`h-[380px]`, offset `top-3.5 left-3.5`) → CTA

## 10. `_sections/S08Mechanism.tsx`

- SECTION-PAD, bg `bg-gradient-to-b from-[#262d30] to-[#2b3235]` + `.noise-overlay` + top `.teal-hairline`
- H2 → H2-HEADER, `mb-16`
- Both images → FRAME; first `mb-[72px]`, second `mb-16`

## 11. `_sections/S10Differentiators.tsx`

- SECTION-PAD + `.noise-overlay`; H2 → H2-HEADER
- comparison-table.png → teal-glow FRAME variant:
```
border border-[#1e9c78]/25 bg-gradient-to-b from-[#1e9c78]/[0.05] to-white/[0.01]
p-4 rounded-[2px]
shadow-[0_0_100px_-30px_rgba(30,156,120,0.3),0_40px_80px_-40px_rgba(0,0,0,0.6)]
```

## 12. `_sections/S11TrustBar.tsx`

- `bg-[#1f2528] py-[26px] border-y border-white/[0.06]`
- Labels → `font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white/75`; dividers `bg-white/10`
- Mobile: `grid grid-cols-2 gap-x-2.5 gap-y-3.5`, 9px labels, no dividers

## 13. `_sections/S09SocialProof3.tsx` / `S13SocialProof4.tsx`

- SECTION-PAD (light bg); S09 H2 → H2-HEADER (dark ink)
- Cards → QUOTE-CARD token; S09 large cards `pl-[100px] pr-[52px] py-11` with 110px quote mark (as S04); S13 compact rows keep `flex gap-7 px-12 py-9` with `text-[64px]` quote mark `opacity-60`
- Quote text `text-[21px] font-medium leading-[1.65]` (S13: 19px); attribution as S04
- Card list `gap-6 mb-16`

## 14. `_sections/S14Faq.tsx` + `_components/FaqAccordion.tsx`

- Section: SECTION-PAD, `bg-gradient-to-b from-[#2b3235] to-[#262d30]` + `.noise-overlay`, grid `gap-20`
- Product image → FRAME (p-3)
- H2 → H2-HEADER `mb-11`
- Item (closed): `py-5 border-b border-white/10 border-l-2 border-l-transparent transition-all duration-300`
- Item (open): add `pl-6 bg-white/[0.025] border-l-[#1e9c78]`
- Question: `font-semibold text-[17px] leading-[1.4]`
- Toggle sign: single `+` that rotates — `text-[#1e9c78] font-mono text-xl inline-block transition-transform duration-300`, open = `rotate-45`
- Answer reveal: CSS grid rows trick — wrapper `grid transition-[grid-template-rows] duration-[350ms]` with `grid-rows-[0fr]` / open `grid-rows-[1fr]`, inner `overflow-hidden`; answer `text-[15px] text-white/65 leading-[1.7] pt-3.5`

## 15. `_sections/S15FinalCta.tsx`

- `py-40` (desktop) / `py-28` (mobile), `relative overflow-hidden`
- Overlay stack over final-cta-bg.png: ① `bg-gradient-to-br from-[#1e9c78]/[0.94] to-[#334d48]/[0.96]` ② vignette `bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.25)_100%)]` ③ `.noise-overlay` (opacity 0.06)
- H2: `text-[54px] leading-[1.05] tracking-[-0.02em] mb-6` (36px mobile); sub `text-xl text-white/85 mb-12 max-w-[600px] mx-auto`
- Button (page peak): `bg-white text-[#1e9c78] px-16 py-6 text-xl font-semibold rounded-[2px] shadow-[0_24px_64px_-12px_rgba(0,0,0,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.01] hover:text-[#178263] hover:shadow-[0_32px_72px_-12px_rgba(0,0,0,0.5)]`
- Trust line: `font-mono text-[11px] tracking-[0.16em] text-white/70 mt-9`

## 16. `_sections/S16Footer.tsx`

- `bg-[#1f2528] py-16` (mobile add `pb-[120px]` clearance for sticky CTA)
- Disclaimer `text-xs text-white/[0.38] leading-[1.7] max-w-[720px]`; links `text-[13px] text-white/55 hover:text-[#1e9c78] transition-colors gap-7`; copyright `font-mono text-[11px] tracking-[0.16em] text-white/[0.28] uppercase`

## 17. `_components/StickyMobileCta.tsx`

- Show only after hero scrolls out (IntersectionObserver on `#hero`), slide-up: `transition-transform duration-[350ms]`, hidden = `translate-y-[110%]`
- Bar: `fixed bottom-0 inset-x-0 z-50 px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] bg-[#1f2528]/[0.92] backdrop-blur-[12px] border-t border-white/10 shadow-[0_-12px_32px_-12px_rgba(0,0,0,0.5)]`
- Left: two mono micro-labels — `NeuroDrive` (`text-[9px] tracking-[0.12em] text-white/55`) over `80mg/ml · 30 days` (`text-[#1e9c78]`)
- Right: primary CTA `flex-1 min-h-[50px] active:scale-[0.98]`

---

## Commit order (one per review unit)

1. globals.css utilities + CtaButton
2. S00 + S01/HeroCarousel
3. S02 + S05/BenefitIcon + S11
4. S03
5. S04/VideoPlaceholder
6. S06 + S07 + S12
7. S08 + S10
8. S09 + S13
9. S14/FaqAccordion
10. S15 + S16 + StickyMobileCta
