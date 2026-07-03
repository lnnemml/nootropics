# Phase 2 — Backend MVP — Implementation Plan

> Created 2026-07-03. Gate criteria: a real order can be placed, saved to
> DB, confirmed by email, and optionally paid via NowPayments crypto — and
> Anton can view/update order statuses in a minimal admin panel.
>
> Format: one task per Claude Code session. Each task is atomic — commit,
> verify build clean, move on. Do not combine tasks.

## Prerequisites (Anton, not Claude Code)

- [ ] **SPF/DKIM for `noraalliance.com`** — add DNS records on Namecheap.
  Resend provides these in Dashboard → Domains → noraalliance.com → DNS
  Records. Records needed:
  - TXT record on `resend._domainkey` (DKIM public key)
  - TXT record on `@` or `send` subdomain (SPF: `v=spf1 include:amazonses.com ~all`)
  Can be added before or during Task 2.3 coding; emails won't deliver
  reliably until propagation completes (~24 hours).

- [ ] **NowPayments account** — create at nowpayments.io, get API key, add
  `noraalliance.com` as the callback/IPN domain. Required before Task 2.4
  can be tested end-to-end. Anton stores key in Vercel env as
  `NOWPAYMENTS_API_KEY`.

## New env vars introduced this phase

| Var | Task | Where to add |
|-----|------|-------------|
| `NEON_DATABASE_URL` | 2.1 | Vercel (Production + Preview + Development) + `.env.local` |
| `NOWPAYMENTS_API_KEY` | 2.4 | Vercel (Production + Preview) |
| `ADMIN_EMAIL` | 2.5 | Vercel + `.env.local` |
| `ADMIN_PASSWORD_HASH` | 2.5 | Vercel + `.env.local` (bcrypt hash) |
| `NEXTAUTH_SECRET` | 2.5 | Vercel + `.env.local` |
| `NEXTAUTH_URL` | 2.5 | Vercel Production: `https://noraalliance.com` |

`RESEND_API_KEY` already exists in Vercel. Do not add it again.

---

## Task 2.1 — Neon + Drizzle foundation

**What it does:** installs the DB toolchain, creates the schema, wires the
Neon connection, runs the first migration.

**Packages to install:**
```
drizzle-orm @neondatabase/serverless
drizzle-kit dotenv-cli (dev)
```

**Files to create:**

`src/lib/db/schema.ts` — MVP orders table (denormalized, single-product):
```typescript
import { pgTable, text, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const orderStatusEnum = pgEnum("order_status", [
  "pending_payment_instructions",
  "awaiting_payment",
  "paid",
  "fulfilled",
  "cancelled",
]);

export const paymentMethodEnum = pgEnum("payment_method", [
  "crypto",
  "manual",
]);

export const orders = pgTable("orders", {
  id:                       text("id").primaryKey(),          // nanoid
  createdAt:                timestamp("created_at").defaultNow().notNull(),
  status:                   orderStatusEnum("status").default("pending_payment_instructions").notNull(),

  // customer
  name:                     text("name").notNull(),
  email:                    text("email").notNull(),
  phone:                    text("phone").notNull(),

  // shipping
  address:                  text("address").notNull(),
  city:                     text("city").notNull(),
  postalCode:               text("postal_code").notNull(),
  stateRegion:              text("state_region"),
  country:                  text("country").notNull(),

  // order
  productSlug:              text("product_slug").notNull(),   // "neurodrive"
  quantity:                 integer("quantity").notNull(),
  basePrice:                integer("base_price").notNull(),  // cents
  paymentMethod:            paymentMethodEnum("payment_method").notNull(),
  cryptoDiscountPct:        integer("crypto_discount_pct"),   // 10 when crypto
  totalPrice:               integer("total_price").notNull(), // cents

  // optional
  promoCode:                text("promo_code"),
  note:                     text("note"),

  // nowpayments (crypto path only)
  nowpaymentsInvoiceId:     text("nowpayments_invoice_id"),
  nowpaymentsPaymentUrl:    text("nowpayments_payment_url"),

  // housekeeping
  confirmationEmailSentAt:  timestamp("confirmation_email_sent_at"),
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
```

`src/lib/db/index.ts`:
```typescript
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(process.env.NEON_DATABASE_URL!);
export const db = drizzle(sql, { schema });
```

`drizzle.config.ts` at project root:
```typescript
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL!,
  },
} satisfies Config;
```

`.env.local.example` — append:
```
NEON_DATABASE_URL=postgresql://...
```

Add `package.json` scripts:
```json
"db:push": "dotenv-cli -e .env.local -- drizzle-kit push",
"db:studio": "dotenv-cli -e .env.local -- drizzle-kit studio"
```

Also install `nanoid` (for order ID generation in Task 2.2):
```
nanoid
```

**Gate:** `tsc --noEmit` clean. `npm run db:push` runs against a real Neon
connection (Anton provides `NEON_DATABASE_URL` before this task). Build
clean on Vercel preview.

**Wiki:** append log entry `[2026-07-03] phase | Task 2.1 — Neon + Drizzle foundation`.

---

## Task 2.2 — Checkout Server Action + order persistence

**What it does:** wires the checkout form (currently UI-only) to a Server
Action that validates input, inserts the order, and redirects to a success
page. No email yet (that's Task 2.3) — order is saved and status is
`pending_payment_instructions`.

**Files to create/update:**

`src/app/actions/submitOrder.ts` — Server Action:
- `"use server"` directive
- Accepts `FormData`
- Validates required fields (name, email, phone, address, city,
  postalCode, country, paymentMethod, qty)
- Generates `id` via `nanoid()`
- Looks up price from `products.ts` quantityOptions (not from user input —
  price is canonical on the server, not trusted from client)
- Inserts into `orders` via `db.insert(orders).values(...)`
- Returns `{ success: true, orderId }` or `{ success: false, error }`

`src/app/(shop)/checkout/page.tsx` — update:
- Wire form's `action` to `submitOrder`
- On success: redirect to `/checkout/success?ref=[orderId]`
- On error: show inline error message (reuse existing error state pattern)
- Crypto discount: still calculated client-side for display, but also
  passed as a hidden field so the Server Action can record it

`src/app/(shop)/checkout/success/page.tsx` — new page:
- Reads `?ref` query param (display only, not re-fetched from DB)
- Message: "Order received. We'll be in touch at [email] within one
  business day." (email is NOT shown — ref param only)
- For crypto path: "A NowPayments invoice will be emailed to you shortly."
  (Task 2.4 will actually send it; for now this is copy-only)
- Link back to home

**Gate:** `tsc --noEmit` clean. Submit the checkout form manually; confirm
row appears in DB via `npm run db:studio` or Neon console. Build clean.

---

## Task 2.3 — Resend transactional email

**Prerequisite (Anton):** SPF/DKIM DNS records live on Namecheap. Without
this, emails will be accepted by Resend but may go to spam or bounce.
Code can be written and committed before DNS is live; test delivery only
after DNS propagates.

**What it does:** adds two automatic emails fired from `submitOrder.ts`
after the DB insert.

**Packages to install:**
```
resend
```

**Files to create/update:**

`src/lib/email/templates.ts` — plain-TypeScript email HTML builders
(no `@react-email` — keep it simple, no extra compilation step):
- `orderConfirmationCustomer(order: NewOrder): string` — customer-facing
  HTML. Two variants by `order.paymentMethod`:
  - `"manual"`: "Your order is received. A member of our team will email
    you at [email] within one business day to arrange payment. Order ref:
    [id]."
  - `"crypto"`: "Your order is received. A NowPayments invoice will be
    sent to [email] shortly. Order ref: [id]. You'll have 24 hours to
    complete payment."
  Include: product name, quantity, total (formatted from cents), order ref.
  Plain HTML, inline styles, NORA brand colors (#1E9C78 accent, #2E3A3C ink).

- `orderAlertOps(order: NewOrder): string` — internal ops email.
  Full order details: name, email, phone, address, product, qty, total,
  payment method, note, order ID, timestamp.
  Subject line: `[NORA] New order — [name] — [payment_method] — $[total]`.

`src/lib/email/send.ts`:
```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmation(order: NewOrder) {
  await resend.emails.send({
    from: "NORA Alliance <orders@noraalliance.com>",
    to: order.email,
    subject: "Your NORA order has been received",
    html: orderConfirmationCustomer(order),
  });
}

export async function sendOpsAlert(order: NewOrder) {
  await resend.emails.send({
    from: "NORA System <system@noraalliance.com>",
    to: process.env.ADMIN_EMAIL!,
    subject: `[NORA] New order — ${order.name} — ${order.paymentMethod} — $${(order.totalPrice / 100).toFixed(2)}`,
    html: orderAlertOps(order),
  });
}
```

`src/app/actions/submitOrder.ts` — update: after successful DB insert,
call `sendOrderConfirmation(order)` and `sendOpsAlert(order)` (fire both,
don't await sequentially — use `Promise.allSettled` so one failure doesn't
block the other). Update `confirmationEmailSentAt` on success.

**Gate:** `tsc --noEmit` clean. Submit a test order; verify both emails
arrive (after DNS is live). Build clean on Vercel.

---

## Task 2.4 — NowPayments crypto invoice integration

**Prerequisite (Anton):** NowPayments account created, API key in Vercel
env as `NOWPAYMENTS_API_KEY`.

**What it does:** when a crypto order is submitted, calls the NowPayments
API to create a hosted invoice, stores the invoice ID + URL on the order,
and redirects the customer to the NowPayments payment page.

**Files to create/update:**

`src/lib/nowpayments.ts`:
```typescript
const NOWPAYMENTS_API = "https://api.nowpayments.io/v1";

interface InvoiceResponse {
  id: string;
  invoice_url: string;
  // other fields we don't use
}

export async function createInvoice(params: {
  orderId: string;
  amountUsd: number;   // already post-discount
  description: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<InvoiceResponse> {
  const res = await fetch(`${NOWPAYMENTS_API}/invoice`, {
    method: "POST",
    headers: {
      "x-api-key": process.env.NOWPAYMENTS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      price_amount: params.amountUsd,
      price_currency: "usd",
      order_id: params.orderId,
      order_description: params.description,
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      is_fixed_rate: true,
      is_fee_paid_by_user: false,
    }),
  });
  if (!res.ok) throw new Error(`NowPayments API error: ${res.status}`);
  return res.json();
}
```

`src/app/actions/submitOrder.ts` — update crypto path:
- After DB insert + emails, if `paymentMethod === "crypto"`:
  - Call `createInvoice(...)`
  - Update order row: `nowpaymentsInvoiceId`, `nowpaymentsPaymentUrl`
  - Return `{ success: true, orderId, redirectUrl: invoice.invoice_url }`

`src/app/(shop)/checkout/page.tsx` — update:
- On crypto success response with `redirectUrl`: `router.push(redirectUrl)`
  instead of the standard success page redirect.

**Gate:** `tsc --noEmit` clean. Test with a real NowPayments sandbox key
if available (NowPayments has a sandbox environment). Build clean.

---

## Task 2.5 — Auth.js + minimal admin panel

**What it does:** protects `/admin` routes with Auth.js (Credentials
provider, single admin user from env), and provides a minimal orders list
+ status update interface.

**Packages to install:**
```
next-auth@beta @auth/drizzle-adapter
bcryptjs @types/bcryptjs
```

**Files to create/update:**

`src/lib/auth.ts` — Auth.js v5 config:
```typescript
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        if (
          credentials.email === process.env.ADMIN_EMAIL &&
          await bcrypt.compare(credentials.password as string, process.env.ADMIN_PASSWORD_HASH!)
        ) {
          return { id: "admin", email: process.env.ADMIN_EMAIL };
        }
        return null;
      },
    }),
  ],
  pages: { signIn: "/admin/login" },
});
```

`src/app/api/auth/[...nextauth]/route.ts` — handlers export.

`middleware.ts` at project root — protect `/admin` routes:
```typescript
import { auth } from "@/lib/auth";
export default auth;
export const config = { matcher: ["/admin/:path*"] };
```

`src/app/(admin)/admin/login/page.tsx` — simple login form (email +
password). Use design system tokens. No fancy styling needed — internal
tool only.

`src/app/(admin)/admin/page.tsx` — orders list:
- Server Component, fetches all orders `ORDER BY created_at DESC`
- Table columns: ref (truncated), date, name, email, payment method,
  total, status (color-coded badge), action
- Status badge colors: pending = amber, awaiting = yellow, paid = green,
  fulfilled = teal, cancelled = muted
- Each row links to `/admin/orders/[id]`

`src/app/(admin)/admin/orders/[id]/page.tsx` — order detail:
- Full order fields displayed
- Status update: `<select>` with all status values + a "Save" button
- Server Action `updateOrderStatus(id, status)` — `db.update(orders).set({ status }).where(eq(orders.id, id))`

`src/app/actions/updateOrderStatus.ts` — Server Action (admin-only, no
auth check needed since middleware already gates the route).

**Gate:** `tsc --noEmit` clean. Login with admin credentials, see orders
list, update a status, verify in DB. Build clean on Vercel.

---

## Definition of done for Phase 2

All five tasks complete AND:
- A real order placed on `noraalliance.com` lands in the DB
- Customer receives confirmation email within 60 seconds
- Anton receives ops alert email within 60 seconds
- Crypto path: customer is redirected to a live NowPayments invoice
- Anton can log into `/admin`, see the order, and mark it paid

When done: update `roadmap.md` to mark Phase 2 done, append to `log.md`,
and start Phase 3 (referral system) planning.
