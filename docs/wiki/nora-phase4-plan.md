# NORA — Phase 4 Plan: Fulfilment & Checkout Validation (simplified)

Session date: 2026-07-10  
Architect: Claude Web  
Executor: Claude Code → `lnnemml/nootropics`

---

## Scope decision

AfterShip integration, live tracking webhooks, and delivery email automation
removed from Phase 4 scope — overkill at launch volume. Tracking flow is:

1. Admin enters carrier + tracking number → DB saved → shipping email auto-sent
2. Customer sees tracking number + link in their account

If live tracking status is needed in future, it can be added as Phase 5 with
AfterShip (schema is forward-compatible).

---

## Decisions locked

| Question | Decision |
|----------|----------|
| Shipping carrier(s)? | Укрпошта primary (others available in dropdown) |
| Live tracking / AfterShip? | **No** — removed from scope |
| Follow-up email cron? | **Deferred** — no Vercel Pro, no community destination |
| Google Places API? | **Yes** — address autocomplete at checkout |
| Vercel Pro for cron? | **No** — free plan |

---

## ADRs to record

**ADR 0014 — Tracking approach: manual only**  
Admin enters tracking number via admin panel. Auto-email sent to customer.
No external tracking API. AfterShip deferred to Phase 5 if needed.
Tracking URL generated from carrier slug + number (no API call).

**ADR 0015 — Google Places Autocomplete for checkout**  
Client-side with domain-restricted API key. `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY`.
Cost at launch volume: ~$1–2/month.

**ADR 0016 — Post-delivery follow-up cron deferred**  
Blocker 1: Vercel free plan has no Cron Jobs.
Blocker 2: community destination not decided.
`followUpSentAt` column added in 4.1 so no migration needed when resumed.

---

## New env vars required

| Variable | Where | Source |
|----------|-------|--------|
| `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` | Vercel → Production + Preview + Development | Google Cloud Console → Maps → Places API |

No AfterShip env vars needed.

**Google API key restrictions (Google Cloud Console):**
- Application restrictions: HTTP referrers
- Allowed: `*.noraalliance.com/*`, `localhost:3000/*`
- API restrictions: Places API only

---

## Task table

| Task | Scope | Complexity |
|------|-------|------------|
| **4.1** | Schema: tracking cols + db:push | Low |
| **4.2** | Admin: carrier dropdown + tracking input + markOrderShipped + shipping email | Low |
| **4.3** | Customer: tracking card in /account/orders/[id] | Low |
| **4.4** | Checkout: phone validation (libphonenumber-js) | Low |
| **4.5** | Checkout: country dropdown + postal code regex + conditional state field | Medium |
| **4.6** | Checkout: Google Places Autocomplete for address | Medium |
| ~~AfterShip~~ | ~~Live tracking webhook~~ | **Removed** |
| ~~4.8~~ | ~~Post-delivery follow-up cron~~ | **Deferred** |

**Execution order:** 4.1 → 4.2 → 4.3 → 4.4 → 4.5 → 4.6

---

## Task 4.1 — Schema

### Columns to add to `orders` in `src/lib/db/schema.ts`

```ts
trackingNumber:  text("tracking_number"),
trackingCarrier: text("tracking_carrier"),  // "ukrposhta" | "dhl" | "ups" | "fedex" | "usps" | "other"
shippedAt:       timestamp("shipped_at"),
followUpSentAt:  timestamp("follow_up_sent_at"),  // reserved — ADR 0016
```

No `deliveredAt`. No `trackingEvents`. Clean and minimal.

### Migration

```bash
node --env-file=.env.local ./node_modules/.bin/drizzle-kit push
```

### Acceptance

- `db:push` reports 4 new columns, zero errors
- No existing rows affected

---

## Task 4.2 — Admin: markOrderShipped

### UI in `/admin/orders/[id]/page.tsx`

Add "Shipping" section after the order summary card.

**Unshipped state:**
- Carrier dropdown: Укрпошта (default), DHL, UPS, FedEx, USPS, Other
- Tracking number text input
- "Mark as shipped" button — disabled until both fields non-empty

**Shipped state (read-only after submit):**
- "Shipped via [carrier]" + date
- Tracking number (monospace) + external tracking link

### New file: `src/lib/tracking.ts`

```ts
export function getTrackingUrl(carrier: string, trackingNumber: string): string | null {
  const n = encodeURIComponent(trackingNumber)
  switch (carrier) {
    case 'ukrposhta': return `https://track.ukrposhta.ua/tracking_UA.html?barCode=${n}`
    case 'dhl':       return `https://www.dhl.com/en/express/tracking.html?AWB=${n}`
    case 'ups':       return `https://www.ups.com/track?tracknum=${n}`
    case 'fedex':     return `https://www.fedex.com/fedextrack/?trknbr=${n}`
    case 'usps':      return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${n}`
    default:          return null
  }
}

export const CARRIER_LABELS: Record<string, string> = {
  ukrposhta: 'Укрпошта',
  dhl:       'DHL',
  ups:       'UPS',
  fedex:     'FedEx',
  usps:      'USPS',
  other:     'Other',
}
```

### Server Action: `markOrderShipped` in `src/app/actions/shipping.ts`

```
1. Validate: order exists, not already shipped (shippedAt IS NULL)
2. UPDATE orders SET
     status = 'fulfilled',
     trackingNumber = $carrier,
     trackingCarrier = $trackingNumber,
     shippedAt = NOW()
   WHERE id = $orderId
3. Fetch full order for email
4. Send shipping confirmation email via Resend
5. revalidatePath('/admin/orders/[id]')
```

### Shipping email

From: `orders@noraalliance.com`  
Subject: `Your NeuroDrive order #[orderNumber] has shipped`

Body:
- Order number + item
- "Your order is on its way via [carrier label]"
- Tracking number in monospace
- Tracking link (if carrier is not "other")
- "International shipments typically arrive within 7–21 business days"
- Link to customer account: `https://www.noraalliance.com/account`

### Acceptance

- Carrier "Укрпошта" is the default selection
- Submit sets `status = fulfilled`, `shippedAt`, `trackingNumber`, `trackingCarrier`
- Customer receives shipping email with tracking number and link
- Button replaced by read-only display after submission

---

## Task 4.3 — Customer: tracking card

### File: `src/app/(customer)/account/orders/[id]/page.tsx`

Render tracking section only if `order.trackingNumber !== null`.

**Card contents:**
- "Shipment tracking" heading
- Carrier: `CARRIER_LABELS[order.trackingCarrier]`
- Tracking number in monospace with copy button
- "Track package →" external link via `getTrackingUrl()`
- Shipped date

No timeline, no live status — just the static info.

### Acceptance

- No card when `trackingNumber` is null
- Card with link renders correctly when set
- Copy button copies tracking number to clipboard

---

## Task 4.4 — Phone validation

**Package:** `libphonenumber-js`

```bash
npm install libphonenumber-js
```

- Country code prefix shown before phone input (derives from selected country)
- Validate on blur with `isValidPhoneNumber(value, countryCode)`
- Error: "Invalid phone number for this country"

---

## Task 4.5 — Country dropdown + postal code regex

**Field order at checkout (updated):**
1. Country (dropdown, first — drives all validation)
2. First name / Last name
3. Address line 1
4. Address line 2 (optional)
5. City
6. State / Province (conditional: US, CA, AU, MX, BR, IN)
7. Postal code (regex per country)
8. Phone (with prefix from Task 4.4)

**Postal code regexes:**
```ts
US: /^\d{5}(-\d{4})?$/
CA: /^[A-Z]\d[A-Z][ -]?\d[A-Z]\d$/i
GB: /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i
AU: /^\d{4}$/
DE: /^\d{5}$/
FR: /^\d{5}$/
NL: /^\d{4}\s?[A-Z]{2}$/i
UA: /^\d{5}$/
// All others: any non-empty string
```

**Country list:** primary markets first (US, CA, GB, DE, FR, NL, AU, UA), then alphabetical.

---

## Task 4.6 — Google Places Autocomplete

**Package:** `@googlemaps/js-api-loader`

```bash
npm install @googlemaps/js-api-loader
```

**Env:** `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY`

**Implementation:**
1. `src/hooks/useGooglePlaces.ts` — lazy-loads Maps JS API with `libraries: ['places']`
2. Attach `google.maps.places.Autocomplete` to street address input ref
3. Options: `{ types: ['address'], componentRestrictions: { country: ['us','ca','gb','de','fr','nl','au','ua'] } }`
4. On `place_changed`: extract address components → fill city, state, postal code, country

---

## Deferred

| Task | Reason | Resumption |
|------|--------|-----------|
| Live tracking (AfterShip) | Overkill at launch | Phase 5, when order volume justifies |
| Follow-up cron | No Vercel Pro; no community | Upgrade to Pro + community destination decided |

---

## Active deviations (carried forward)

| Deviation | Constraint |
|-----------|-----------|
| `db:push` env loading | `node --env-file=.env.local ./node_modules/.bin/drizzle-kit push` |
| Vercel env var | `POSTGRES_URL` (not `NEON_DATABASE_URL`) |
| Canonical domain | All URLs/webhooks: `https://www.noraalliance.com` |
| Middleware filename | **`middleware.ts`** — NEVER `proxy.ts` (Claude Code has renamed this twice) |
| Customer auth basePath | `/api/auth/customer`, cookie: `nora-customer-session` |
| Admin auth cookie | `next-auth.session-token` at `/api/auth` |
| `authorized` callback | Unused in `auth(handler)` form |
| `verificationTokens` dual-purpose | `verify:` prefix = email verify; bare email = password reset |
| `submitOrder` void return | `useActionState` integration pending |

---

## Claude Code prompts

### Prompt 4.1 — Schema

```
Read CLAUDE.md and docs/wiki/ first.

Task 4.1: Add tracking columns to orders table.

File: src/lib/db/schema.ts

Add to the `orders` table:
- trackingNumber:  text("tracking_number")               — nullable
- trackingCarrier: text("tracking_carrier")              — nullable
- shippedAt:       timestamp("shipped_at")               — nullable
- followUpSentAt:  timestamp("follow_up_sent_at")        — nullable (reserved for future cron)

Then run:
node --env-file=.env.local ./node_modules/.bin/drizzle-kit push

Confirm db:push reports 4 new columns applied, no errors.

Do NOT rename middleware.ts.
Commit: "feat(schema): add tracking columns to orders (Phase 4.1)"
```

### Prompt 4.2 — Admin shipping

```
Read CLAUDE.md and docs/wiki/ first.

Task 4.2: Add carrier + tracking number input to admin order detail page.

1. Create src/lib/tracking.ts:

export function getTrackingUrl(carrier: string, trackingNumber: string): string | null {
  const n = encodeURIComponent(trackingNumber)
  switch (carrier) {
    case 'ukrposhta': return `https://track.ukrposhta.ua/tracking_UA.html?barCode=${n}`
    case 'dhl':       return `https://www.dhl.com/en/express/tracking.html?AWB=${n}`
    case 'ups':       return `https://www.ups.com/track?tracknum=${n}`
    case 'fedex':     return `https://www.fedex.com/fedextrack/?trknbr=${n}`
    case 'usps':      return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${n}`
    default:          return null
  }
}

export const CARRIER_LABELS: Record<string, string> = {
  ukrposhta: 'Укрпошта',
  dhl: 'DHL',
  ups: 'UPS',
  fedex: 'FedEx',
  usps: 'USPS',
  other: 'Other',
}

2. Create src/app/actions/shipping.ts with Server Action markOrderShipped:
   Parameters: orderId: string, carrier: string, trackingNumber: string
   Steps:
   a. Validate order exists and shippedAt IS NULL (not already shipped)
   b. UPDATE orders SET status = 'fulfilled', trackingNumber, trackingCarrier, shippedAt = NOW()
   c. Fetch full order for email
   d. Send Resend email from orders@noraalliance.com:
      Subject: "Your NeuroDrive order #[orderNumber] has shipped"
      Include: carrier label, tracking number (monospace), tracking URL if not "other",
      note about 7-21 business day delivery, link to https://www.noraalliance.com/account
   e. revalidatePath for the admin order detail page

3. Update src/app/admin/orders/[id]/page.tsx:
   Add "Shipping" section below the order summary.
   - If order.shippedAt is null: show carrier dropdown (Укрпошта default),
     tracking number text input, "Mark as shipped" button (disabled until both filled)
   - If order.shippedAt is set: read-only display of carrier, tracking number,
     external tracking link, shipped date

Design system: rounded-[2px], Space Grotesk, no hardcoded px-[72px], use Container.tsx.
Do NOT rename middleware.ts.
Commit: "feat(admin): add tracking input and markOrderShipped action (Phase 4.2)"
```

### Prompt 4.3 — Customer tracking card

```
Read CLAUDE.md and docs/wiki/ first.

Task 4.3: Show tracking info in customer order detail page.

File: src/app/(customer)/account/orders/[id]/page.tsx

Import getTrackingUrl and CARRIER_LABELS from src/lib/tracking.ts

Add a tracking card below the order summary, rendered only if order.trackingNumber is not null:
- "Shipment tracking" heading
- Carrier: CARRIER_LABELS[order.trackingCarrier]
- Tracking number in monospace font with a copy-to-clipboard button
- "Track package →" external link via getTrackingUrl(), target="_blank", rel="noopener noreferrer"
- Shipped date (order.shippedAt formatted)

No timeline, no live status, no external API.

Design system: rounded-[2px], Space Grotesk, no hardcoded px-[72px].
Do NOT rename middleware.ts.
Commit: "feat(account): add tracking card to order detail (Phase 4.3)"
```

### Prompt 4.4 + 4.5 — Checkout phone + address validation

```
Read CLAUDE.md and docs/wiki/ first.

Tasks 4.4 + 4.5: Phone and address validation at checkout.

npm install libphonenumber-js

Task 4.4 — Phone validation:
- Import isValidPhoneNumber from libphonenumber-js
- Phone field: show country code prefix based on selected country (ISO 3166-1 alpha-2)
- Validate on blur. Error: "Invalid phone number for this country"
- Country change updates the validation context

Task 4.5 — Country dropdown + postal code:
- Country dropdown as the first address field
  Primary markets at top: US, CA, GB, DE, FR, NL, AU, UA — then rest alphabetical
- Postal code regex validation per country on blur:
  US: /^\d{5}(-\d{4})?$/
  CA: /^[A-Z]\d[A-Z][ -]?\d[A-Z]\d$/i
  GB: /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i
  AU: /^\d{4}$/
  DE/FR/UA: /^\d{5}$/
  NL: /^\d{4}\s?[A-Z]{2}$/i
  All others: any non-empty string passes
- State/Province field: show only for ['US', 'CA', 'AU', 'MX', 'BR', 'IN']
  Label: "State" for US/AU, "Province" for CA, "State/Region" otherwise

All validation is client-side only. No backend changes.
Design system: rounded-[2px], Space Grotesk, no hardcoded px-[72px].
Do NOT rename middleware.ts.
Commit: "feat(checkout): phone + country + postal code validation (Phase 4.4+4.5)"
```

### Prompt 4.6 — Google Places Autocomplete

```
Read CLAUDE.md and docs/wiki/ first.

Task 4.6: Google Places Autocomplete for checkout address input.

npm install @googlemaps/js-api-loader

Env var: NEXT_PUBLIC_GOOGLE_PLACES_API_KEY (already in Vercel)

1. Create src/hooks/useGooglePlaces.ts:
   - Lazy-loads Maps JS API with @googlemaps/js-api-loader, libraries: ['places']
   - Client-side only (guard with typeof window !== 'undefined')
   - Returns { isLoaded: boolean }

2. In the checkout address section:
   - Attach google.maps.places.Autocomplete to the street address input ref after isLoaded
   - Options: { types: ['address'], componentRestrictions: { country: ['us','ca','gb','de','fr','nl','au','ua'] } }
   - On place_changed: parse address_components and update form state:
     street_number + route → address line 1
     locality → city
     administrative_area_level_1 (short_name) → state
     postal_code → postal code
     country (short_name, lowercase) → country dropdown value

No API key hardcoded — use process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY only.
Design system: rounded-[2px], Space Grotesk, no hardcoded px-[72px].
Do NOT rename middleware.ts.
Commit: "feat(checkout): Google Places address autocomplete (Phase 4.6)"
```
