# NeuroDrive Launch Sales Strategy — Salesmaxxing Playbook

> Created: 2026-11-18. Updated: 2026-11-18.
> Status: pre-launch, first batch approaching.
> Constraints: crypto/manual payment only, no card processing, one operator,
> research-chemicals category, pre-revenue (no real testimonials yet).
> Price: $120/bottle, 2×$220, 3×$300. Crypto = -10%.
> Available paid channels: **Meta (Facebook/Instagram)**, **Google Search**.
> Reddit Ads: not available. No waitlist — go straight to sales.

## Executive summary

Three pillars: **Paid traffic** (Meta + Google) → **Affiliate program**
(ported from ISRIB, influencer-driven) → **Retention** (referrals, email,
reorders). Landing page and ad creative testing are separate workstreams.

---

## Pillar 1 — Paid traffic (Meta + Google)

### 1.1 Meta Ads — PRIMARY CHANNEL

Meta is the primary acquisition channel despite supplement-category risk.
The Meta Pixel + server-side CAPI are already installed and deduped.

**Strategy: start warm, go cold.**

**Phase A — Retargeting foundation (week 1–2)**
Drive initial traffic from Google Search (high-intent, see 1.2) and
organic channels (Reddit seeding, NeuroBench) while Meta Pixel collects
events. Meanwhile set up:
- Custom Audience: all `/go` visitors (last 30 days)
- Custom Audience: checkout starters who didn't complete
- Custom Audience: product page visitors

**Phase B — Retargeting campaigns (week 2+)**
Run retargeting ads against the audiences above. These are the highest-ROAS
Meta campaigns because the visitor already showed interest.

Retargeting ad copy (address specific objections):
- "Still thinking about NeuroDrive? Here's what makes it different from every
  other nootropic." (education angle)
- "10% off with crypto. No card info needed." (payment friction)
- "One compound. NMR-verified every batch. Not a mystery blend." (trust)

**Phase C — Cold prospecting (week 3+ or 100+ pixel events)**
Once the pixel has enough conversion data, launch Lookalike audiences:
- 1% Lookalike of purchasers (once you have 20+ purchases)
- 1% Lookalike of checkout starters (available sooner)
- Interest targeting: nootropics, biohacking, productivity, programming,
  supplements, cognitive enhancement

Cold ad formats:
- **Video ads** (15–30 sec) — mechanism explanation, product demo, "day in
  my life" format
- **Image + copy** — before/after comparison (stimulant timeline vs
  NeuroDrive), product shot with key claims
- **Headline angles to A/B test:**
  - "What if your brain fog isn't about sleep?"
  - "The focus compound that doesn't work like caffeine"
  - "Restore your dopamine. Don't stimulate it."
  - "One drop. No crash. No tolerance."

**Ad account safety (research chemicals on Meta):**
- Never use the word "drug" or name prescription drugs (Adderall, modafinil)
  in ad copy
- Frame as "cognitive support" / "dopamine support supplement"
- Lead with the mechanism (TH enzyme, dopamine synthesis), not health claims
- Avoid before/after transformation claims in ad copy (save those for the
  landing page)
- Keep a backup ad account ready — supplement ads face random disapprovals

### 1.2 Google Search

**Why:** high-intent buyers actively searching for the compound. These
convert at the highest rate and seed Meta's pixel with quality events.

**Keywords (exact/phrase match):**
- "buy bromantane" / "bromantane for sale" / "bromantane drops"
- "bromantane sublingual" / "bromantane solution" / "bromantane MCT"
- "bromantane nootropic" / "best bromantane source"
- "focus nootropic without stimulants" / "dopamine support supplement"
- "NeuroDrive nootropic" (brand — capture as awareness grows)

**Ad copy:** mechanism-first, not hype. "Sublingual bromantane. 80 mg/ml.
NMR-verified every batch. Crypto accepted." — speaks directly to the
research-minded buyer.

**Landing page:** `/go` for broad terms, product page for brand terms.

### 1.3 Reddit organic (free)

r/Nootropics, r/StackAdvice, r/Biohackers, r/Supplements, r/Bromantane.

Value-first posts, NOT promotion:
- "My 30-day experience with sublingual bromantane (vs. powder)"
- "Bromantane sublingual vs. capsule bioavailability — what I found"
- Answering existing "what's a good focus nootropic" threads

Never link to NORA in posts. Link only when asked or in profile bio. This
audience sniffs out shills instantly.

Cadence: 3–5 posts/comments per week.

---

## Pillar 2 — Affiliate program (port from ISRIB)

### Why this is a core sales pillar

Affiliates turn influencers into a paid salesforce at zero upfront cost —
commission is earned only on paid orders. This is the single most
capital-efficient growth lever for a niche product with a passionate but
hard-to-reach audience. One X/Twitter or YouTube influencer in the
nootropics space can generate more trust-driven sales than $1,000 in cold
Meta ads.

### Model (from ISRIB ADR 0025, adapted to NORA — implemented, see [ADR 0023](../decisions/0023-affiliate-program.md))

- **Commission:** 35% of `orders.total_price`, configurable per affiliate.
  (default 3500 bps)
- **Buyer discount:** 15%, configurable per affiliate. Does NOT stack with
  crypto 10% discount — best-single rule applies.
- **Earned on paid only.** Cancelled/unpaid orders earn nothing.
- **Payouts:** manual, in crypto, twice a month. Recorded with a tx hash.
- **Full transparency** for the affiliate, zero customer PII.
- **Feature flag:** `AFFILIATES_ENABLED` ("true" = on).

**Worked example:** $120 order with affiliate code, crypto payment:
- Buyer pays: $102 (15% discount — beats the 10% crypto discount)
- Commission: $35.70 (35% of $102)
- NORA keeps: $66.30

**Worked example:** $300 order (3 bottles) with affiliate code:
- Buyer pays: $255 (15% off $300)
- Commission: $89.25
- NORA keeps: $165.75

### Infrastructure to port from ISRIB

**DB schema (additive):**
- `affiliates` table (name, handle, code, commission/discount rates, notify
  email, telegram chat id, is_active)
- `affiliate_clicks` table (deduplicated click tracking)
- `affiliate_payouts` table (crypto payout records)
- `affiliate_login_tokens` / `affiliate_sessions` / `affiliate_login_attempts`
  (partner auth)
- Orders table: add `affiliate_id`, `attribution_source`, commission snapshot
  columns, `commission_earned_at`

**Code modules:**
- `src/lib/affiliate/` — core logic (attribution resolution, commission
  calculation, state machine), click tracking, earning/notification, session
  management, partner/admin queries
- `src/app/(partner)/partner/` — partner portal (dashboard, login, CSV export)
- `src/app/(admin)/admin/affiliates/` — admin CRUD + payout forms
- `src/app/api/affiliate/click/` — click tracking endpoint
- Proxy-level cookie + click tracking (`?ref=CODE`)
- Telegram bot notification on commission earned

**Attribution flow:**
1. Influencer shares `noraalliance.com/go?ref=CODE` (or the bare code)
2. Middleware sets `nora_ref` cookie (30 days), fires click tracking
3. Buyer arrives at `/go`, CTA → checkout
4. Checkout picks the code up from the cookie (or the buyer types it in the
   promo field and hits Apply); 15% discount applied
5. On order paid → commission earned, affiliate notified via Telegram/email
6. Partner portal: affiliate sees masked orders, earnings, balance

### Affiliate outreach targets

Nootropics influencers (X/Twitter, YouTube, TikTok):
- Bromantane/nootropics content creators
- Biohacking YouTubers
- Productivity/focus content creators
- "Smart drugs" reviewers
- Nootropics subreddit power users (DM for collaboration, not posts)

**Outreach pitch:** "35% commission, 15% off for your audience, real-time
Telegram notifications, crypto payouts. Here's the product, here's the NMR
certificate. Try it yourself first."

### Affiliate + paid traffic synergy

Affiliate codes work as trackable promo codes. When an influencer posts about
NeuroDrive:
1. Their audience searches Google → Google branded search ads catch them
2. Their audience sees retargeting Meta ads → reinforces the message
3. Organic Reddit discussion follows → builds social proof

The affiliate code attributes the sale correctly even when the buyer arrives
through a paid ad (cookie attribution with 30-day window).

---

## Pillar 3 — Retention & LTV

### 3.1 Customer referral activation

The 10%/10% referral system is already built. Activate it:

**Post-purchase email (3 days after delivery):**
- "Your referral code: give 10%, get 10%"
- Personalized link, one-click copy
- CTA: "Share with someone who'd benefit"

The target audience (devs, founders) has peer networks who match the avatar
exactly. One referral in a Slack workspace cascades.

### 3.2 Email automation sequences

**A. Abandoned checkout recovery (highest ROI email)**
- Trigger: checkout started (email captured) but order not submitted
- Timing: 1h → 24h → 72h
- Email 1: "Your NeuroDrive order is waiting" (remind + crypto discount)
- Email 2: "Still thinking? Here's what bromantane actually does" (education)
- Email 3: "Last call" (mild urgency)

**B. Post-purchase onboarding**
- Day 0: order confirmation (exists)
- Day 1: "How to use NeuroDrive" (dosing protocol, what to expect)
- Day 7: "One week in" (mechanism reinforcement, set expectations)
- Day 14: "Quick question" (collect feedback → first real testimonials)
- Day 25: "Running low?" (reorder reminder — 30ml ≈ 30 days)

**C. Win-back**
- Day 45: "It's been a while" (address drop-off reasons)
- Day 60: "10% off your next bottle" (discount to re-engage)

### 3.3 UGC collection

Every batch #001 customer is a testimonial opportunity:
- Day 14 email: feedback form / reply prompt
- Day 21: "30-second video = 20% off next order"
- Replace go-v2 community quotes with real ones as they arrive
- Encourage organic Reddit posts (don't incentivize — against rules)

### 3.4 NeuroBench video channel (medium-term)

Already structured (ADR 0021): faceless nootropics channel → email funnel →
`dopamine-drive` segment → soft CTA to NORA. 30–90 day payoff, but
compounds through YouTube SEO.

### 3.5 TikTok/Reels organic angle testing

30–60 sec videos to test messaging angles at $0:
- "What if your brain fog isn't about sleep?"
- "POV: you stop stimulating your dopamine and start restoring it"
- "Day 7 on bromantane"
- Winning angles → `/go` hero + paid ad creative

---

## Budget allocation

| Channel | Daily | Monthly | Purpose |
|---|---|---|---|
| Meta Ads | $15 | ~$450 | Primary (retargeting → cold as pixel matures) |
| Google Search | $10 | ~$300 | High-intent buyers (seeds Meta pixel data) |
| Affiliates | $0 upfront | % of sales | Commission-only, zero risk |
| Reddit organic | $0 | $0 | Community presence, trust |
| NeuroBench | $0 | $0 | Long-term SEO + email list |
| TikTok organic | $0 | $0 | Angle testing |
| **Total paid** | **$25** | **~$750** | |

### Scaling rules

- **ROAS > 2× on a channel:** double its budget, pull from the lowest-ROAS.
- **At 20+ pixel purchases:** launch Meta Lookalike campaigns.
- **At $2k/month revenue:** raise total paid to $50/day.
- **Affiliate produces > $500/month:** onboard a second affiliate.
- **A TikTok angle gets 50k+ views:** immediately port to Meta ad creative.

---

## Conversion funnel metrics

| Metric | Target | Tool |
|---|---|---|
| `/go` sessions | 1,000+/month | GA4 |
| `/go` → checkout rate | 5–8% | GA4 funnel |
| Checkout → order submitted | 40–60% | GA4 + DB |
| Order → paid | 70%+ | DB |
| CAC (blended) | <$40 | Manual |
| AOV | $140+ (push 2-bottle) | DB |
| Affiliate conversion rate | 3–5% | Affiliate dashboard |
| Referral activation | 15%+ of customers share | DB |

---

## Pricing & offer psychology

- **Per-day cost:** "$4/day — less than your daily coffee that's burning you
  out."
- **Competitor anchor:** "Thesis: $79–119/month for a mystery blend.
  NeuroDrive: one studied compound, NMR-verified, $4/day."
- **Default selection:** pre-select 2-bottle option at checkout → instant
  AOV lift to $220.
- **Savings badges:** make "Save $20" / "Save $60" visually loud.
- **Crypto as feature, not friction:** "Pay with crypto: $108. No card info
  needed. No data stored." — the privacy-conscious dev audience sees this
  as a benefit.
- **Affiliate code as social proof:** when an influencer shares a code, the
  buyer feels they're getting an insider deal (15% > the 10% crypto
  discount).

---

## Quick wins (prioritized)

1. **Port affiliate program from ISRIB** — zero-upfront-cost sales channel,
   scales with influencer reach. (multi-session implementation)
2. **Deploy go-v2** — compliance-clean landing page, already built. All paid
   traffic → `/go`. (1 hour)
3. **Google Search ads** — high-intent buyers, seeds Meta pixel. (2–3h setup)
4. **Meta retargeting** — catch visitors who didn't buy. (2–3h setup,
   week 2+)
5. **Abandoned checkout email** — highest-ROI email. (4–6h)
6. **Post-purchase referral email** — activate existing referral system.
   (2–3h)
7. **Pre-select 2-bottle at checkout** — instant AOV lift. (30 min)
8. **Reddit organic seeding** — $0, starts immediately. (ongoing)

---

## What NOT to do

- **Don't name prescription drugs in Meta ads.** Adderall/modafinil in ad
  copy = instant disapproval. Use "stimulants" generically.
- **Don't fake reviews.** The audience will find them. Wait for real ones.
- **Don't offer money-back guarantee.** Hard constraint (ADR 0019).
- **Don't discount below $100/bottle.** Price floor. Discounts below signal
  desperation.
- **Affiliate codes don't stack.** An affiliate order gets the better of the
  affiliate rate (15%) and crypto (10%), never both, and drops any customer
  referral (ADR 0023). Note: customer referral + crypto *do* still stack
  (ADR 0017), so a referred crypto buyer gets 20% — more than an influencer's
  audience. Revisit if that looks wrong once both are live.
- **Don't run Meta cold campaigns before pixel has data.** Waste of money.
  Let Google + organic seed the pixel first.

---

## Related pages

- [`messaging-angles.md`](./messaging-angles.md) — headline/angle bank
- [`competitive-landscape.md`](./competitive-landscape.md)
- [`../product/avatar.md`](../product/avatar.md) — buyer demographics
- [`../product/beliefs-and-objections.md`](../product/beliefs-and-objections.md)
- [`../decisions/0019-dr-landing-page.md`](../decisions/0019-dr-landing-page.md) — `/go` structure
- [`../decisions/0017-referral-system.md`](../decisions/0017-referral-system.md) — referral mechanics
- [`../decisions/0018-analytics-stack.md`](../decisions/0018-analytics-stack.md) — tracking setup
- [`../decisions/0021-shared-nootropics-video-channel.md`](../decisions/0021-shared-nootropics-video-channel.md) — NeuroBench
