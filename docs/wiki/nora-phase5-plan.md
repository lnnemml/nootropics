# NORA — Phase 5 Plan: Referral System

Session date: 2026-07-10  
Architect: Claude Web  
Executor: Claude Code → `lnnemml/nootropics`

---

## Mechanics (locked)

| Role | Reward |
|------|--------|
| **Referred** (new customer) | 10% off first order |
| **Referrer** (existing customer) | 10% off next order |

- Loyalty tiers (bronze/silver/gold) — **deferred** to Phase 6+
- Referral + crypto discounts **stack** (max 20% combined = $96 on a $120 bottle)
- Referrer reward activates when referred order reaches `paid` or `fulfilled` status
- Each user gets one referral code, auto-generated on account creation
- Referral code format: `NORA-XXXXXX` (6-char alphanumeric, uppercase)

---

## Flow

```
1. User signs up → referral code auto-generated (e.g. NORA-K7BM2P)
2. User shares link: https://www.noraalliance.com/?ref=NORA-K7BM2P
3. New visitor lands → ref code stored in sessionStorage (same pattern as UTM)
4. At checkout → referral detected → "10% referral discount" line in order summary
5. Order placed → referralCodeUsed saved on order row
6. Order reaches "paid" status → referrer gets a reward record (10% off next order)
7. Referrer sees reward in /account → auto-applied at their next checkout
```

---

## ADR to record

**ADR 0017 — Referral system mechanics**
- Symmetrical 10%/10% model (referred gets 10% off, referrer gets 10% off)
- Referral + crypto discounts stack (max 20%)
- Referrer reward activates on referred order reaching `paid` status
- One referral code per user, auto-generated
- No loyalty tiers at launch — deferred
- `discount_ledger` tracks rewards with status lifecycle (available → redeemed → expired)

---

## New env vars

None. Referral system is internal — no external APIs.

---

## Schema additions

### New table: `referral_codes`

```ts
referralCodes = pgTable("referral_codes", {
  id:        text("id").primaryKey(),           // nanoid
  userId:    text("user_id").references(() => users.id).notNull().unique(),
  code:      text("code").notNull().unique(),    // "NORA-K7BM2P"
  active:    boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})
```

### New table: `referrals`

```ts
referrals = pgTable("referrals", {
  id:               text("id").primaryKey(),           // nanoid
  referralCodeId:   text("referral_code_id").references(() => referralCodes.id).notNull(),
  referredOrderId:  text("referred_order_id").references(() => orders.id).notNull(),
  referredEmail:    text("referred_email").notNull(),   // snapshot — even if user not created yet
  referrerRewardId: text("referrer_reward_id"),          // FK → discountLedger.id, set when reward created
  createdAt:        timestamp("created_at").defaultNow().notNull(),
})
```

### New table: `discount_ledger`

```ts
discountLedger = pgTable("discount_ledger", {
  id:             text("id").primaryKey(),           // nanoid
  userId:         text("user_id").references(() => users.id).notNull(),
  source:         text("source").notNull(),           // "referral_reward" | "promo" (extensible later)
  discountPct:    integer("discount_pct").notNull(),  // 10 = 10%
  status:         text("status").default("available").notNull(), // "available" | "redeemed" | "expired"
  redeemedOrderId: text("redeemed_order_id"),         // FK → orders.id, set on use
  expiresAt:      timestamp("expires_at"),            // nullable — null = never expires
  createdAt:      timestamp("created_at").defaultNow().notNull(),
})
```

### Changes to `orders` table

```ts
// add columns:
referralCodeUsed:    text("referral_code_used"),       // the code string, snapshot at purchase time
referralDiscountPct: integer("referral_discount_pct"), // 10 when referral applied
discountLedgerId:    text("discount_ledger_id"),       // FK → discountLedger.id if referrer reward used
```

---

## Task table

| Task | Scope | Complexity |
|------|-------|------------|
| **5.1** | Schema: 3 new tables + order columns + db:push | Low |
| **5.2** | Referral code generation on registration + backfill existing users | Low |
| **5.3** | Referral link capture: ?ref=CODE → sessionStorage | Low |
| **5.4** | Checkout: detect referral, calculate + display discount, save on order | Medium |
| **5.5** | Referrer reward: create discount_ledger entry when referred order is paid | Medium |
| **5.6** | Checkout: auto-apply referrer's available reward (discount_ledger) | Medium |
| **5.7** | Account: referral dashboard (code, share, history, rewards) | Medium |

**Execution order:** 5.1 → 5.2 → 5.3 → 5.4 → 5.5 → 5.6 → 5.7

---

## Task 5.1 — Schema

Add three new tables (`referralCodes`, `referrals`, `discountLedger`) and
three new columns on `orders` (`referralCodeUsed`, `referralDiscountPct`,
`discountLedgerId`). Run `db:push`.

---

## Task 5.2 — Referral code generation

**On registration:** in `registerCustomer` action, after creating the user,
generate a referral code: `NORA-` + 6 random uppercase alphanumeric chars.
Insert into `referral_codes`.

**Backfill:** one-time script or migration that generates codes for all existing
users who don't have one yet. Can be a simple `db:seed` script or inline in
the task.

**Code generation helper:** `src/lib/referral.ts`
```ts
function generateReferralCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // no I/O/0/1 confusion
  let result = 'NORA-'
  for (let i = 0; i < 6; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}
```

Collision check: retry if code already exists (extremely unlikely with 30^6 space).

---

## Task 5.3 — Referral link capture

Same pattern as existing UTM capture:

**In UTMCapture component** (or a new `ReferralCapture`):
- On page load, check URL for `?ref=` param
- If present, validate code exists in DB via a lightweight API route:
  `GET /api/referral/validate?code=NORA-XXXXXX` → returns `{ valid: boolean }`
- If valid, store in `sessionStorage` as `nora_referral_code`
- Preserve through navigation (sessionStorage persists until tab closes)

**Alternative (simpler):** skip server validation on capture, validate at checkout
only. Store raw param in sessionStorage, validate when checkout loads.

Recommend the simpler approach — one less API route, validation happens at
the moment it matters (checkout).

---

## Task 5.4 — Checkout: apply referral discount

**On checkout page load:**
- Read `nora_referral_code` from sessionStorage
- If present, validate via server: check `referral_codes` table, ensure
  code is `active`, and ensure the code owner is NOT the current user
  (no self-referral)
- If valid, show in order summary:
  ```
  REFERRAL DISCOUNT (10%)    -$12
  ```
- Add hidden input `name="referralCode"` to form

**In `submitOrder` Server Action:**
- If `referralCode` is present in FormData:
  - Validate code again server-side (re-check active, not self-referral)
  - Calculate referral discount: `Math.round(basePrice * 0.10)`
  - Subtract from total (stacks with crypto discount if both apply)
  - Save `referralCodeUsed` and `referralDiscountPct` on order row
  - Adjust `totalPrice` calculation

**Price calculation with stacking:**
```
basePrice = PRICES[qty]                           // e.g. $120
cryptoDiscount = paymentMethod === 'crypto' ? round(basePrice * 0.10) : 0
referralDiscount = hasValidReferral ? round(basePrice * 0.10) : 0
total = basePrice - cryptoDiscount - referralDiscount
// $120 - $12 - $12 = $96 (both discounts)
```

---

## Task 5.5 — Referrer reward creation

**Trigger:** when a referred order reaches `paid` or `fulfilled` status.

**Where:** in `updateOrderStatus` Server Action (admin panel status change) and
in the NowPayments IPN webhook handler (auto-paid via crypto).

**Logic:**
1. When order status changes to `paid` or `fulfilled`:
2. Check if `order.referralCodeUsed` is not null
3. Look up the referral code → get `referralCodes.userId` (the referrer)
4. Check if a reward already exists for this referral (prevent duplicates)
5. Create `discount_ledger` entry:
   - `userId` = referrer's user ID
   - `source` = "referral_reward"
   - `discountPct` = 10
   - `status` = "available"
   - `expiresAt` = null (no expiry for now)
6. Create `referrals` entry linking code → order → reward
7. (Optional) Send email to referrer: "Your friend placed an order! You earned 10% off"

---

## Task 5.6 — Checkout: auto-apply referrer's reward

**On checkout page load (for logged-in users):**
- Query `discount_ledger WHERE userId = ? AND status = 'available'`
- If available reward exists, auto-apply:
  ```
  YOUR REWARD (10%)    -$12
  ```
- Add hidden input `name="rewardId"` with the discount_ledger ID

**In `submitOrder`:**
- If `rewardId` present, validate it belongs to user and status is `available`
- Apply discount to total (stacks with crypto; does NOT stack with being
  a referred customer — referral discount and reward discount are different
  events, but a user can only use one discount_ledger entry per order)
- Set `discount_ledger.status = 'redeemed'`, `redeemedOrderId = orderId`
- Save `discountLedgerId` on order row

**Discount priority (if user has BOTH a referral code in sessionStorage AND
an available reward):**
- Referral discount = for new customers being referred (10% off first order)
- Reward = for existing customers who referred someone (10% off next order)
- A returning customer won't have a referral code in sessionStorage (that's
  for new visitors). So these are mutually exclusive in practice.

---

## Task 5.7 — Account: referral dashboard

**New page:** `/account/referrals` (or section within `/account`)

**Contents:**
1. **Your referral code** — `NORA-K7BM2P` in monospace, copy button
2. **Share link** — `https://www.noraalliance.com/?ref=NORA-K7BM2P`, copy button
3. **How it works** — brief explanation:
   - "Share your link with friends"
   - "They get 10% off their first order"
   - "You get 10% off your next order when they buy"
4. **Referral history** — table/list:
   - Date | Referred email (masked: a***@gmail.com) | Order status | Your reward status
5. **Available rewards** — list of unused discount_ledger entries:
   - "10% off — earned from referral" with status badge

**Navigation:** add "Referrals" link to account sidebar/nav.

---

## Deferred from this phase

| Item | Reason |
|------|--------|
| Loyalty tiers (bronze/silver/gold) | Complexity — needs volume data first |
| Promo code backend validation | Separate from referral — can be Phase 6 |
| Referral email notification to referrer | Nice-to-have, not MVP |
| Social share buttons (Twitter, Telegram) | Can add later in dashboard |
| Referral code expiry | Not needed at launch |
| Affiliate program (external partners, higher %) | Different from customer referral — Phase 6+ |

---

## Active deviations (carried forward)

| Deviation | Constraint |
|-----------|-----------|
| `db:push` env loading | `node --env-file=.env.local ./node_modules/.bin/drizzle-kit push` |
| Vercel env var | `POSTGRES_URL` (not `NEON_DATABASE_URL`) |
| Canonical domain | All URLs: `https://www.noraalliance.com` |
| Middleware filename | **`middleware.ts`** — NEVER `proxy.ts` |
| Customer auth basePath | `/api/auth/customer`, cookie: `nora-customer-session` |
| Admin auth cookie | `next-auth.session-token` at `/api/auth` |
| `submitOrder` void return | `useActionState` integration still pending |
| Google Places | `PlaceAutocompleteElement` (new API), uncontrolled address field |
