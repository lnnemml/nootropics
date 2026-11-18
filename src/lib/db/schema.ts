import { pgTable, text, integer, timestamp, pgEnum, boolean, index, uniqueIndex } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id:            text("id").primaryKey(),         // nanoid
  email:         text("email").notNull().unique(),
  name:          text("name"),
  image:         text("image"),
  emailVerified: timestamp("email_verified_at"),
  passwordHash:  text("password_hash"),           // nullable — guest/social users have none
  createdAt:     timestamp("created_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// verificationTokens — used for password reset (one-time expiring tokens).
// Magic-link auth was removed in Task 3.2b.
export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),  // email address
    token:      text("token").notNull().unique(),
    expires:    timestamp("expires").notNull(),
  }
);

export type VerificationToken = typeof verificationTokens.$inferSelect;

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

// ADR 0023 — how an order reached an affiliate: the ?ref link cookie, or a typed code
export const attributionSourceEnum = pgEnum("attribution_source", [
  "link",
  "code",
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

  // account link (nullable — guest checkout stays supported)
  userId:                   text("user_id").references(() => users.id),

  // housekeeping
  confirmationEmailSentAt:  timestamp("confirmation_email_sent_at"),

  // order number — human-readable, generated server-side
  orderNumber:  text("order_number").notNull().unique(),

  // UTM tracking
  utmSource:    text("utm_source"),
  utmMedium:    text("utm_medium"),
  utmCampaign:  text("utm_campaign"),
  utmContent:   text("utm_content"),
  utmTerm:      text("utm_term"),

  // derived from UTM — "paid" | "referral" | "direct"
  trafficType:  text("traffic_type"),

  // shipping / fulfillment tracking
  trackingNumber:   text("tracking_number"),
  trackingCarrier:  text("tracking_carrier"),
  shippedAt:        timestamp("shipped_at"),
  followUpSentAt:   timestamp("follow_up_sent_at"),  // reserved for future cron

  // referral — populated at checkout when a referral code or reward is applied
  referralCodeUsed:    text("referral_code_used"),    // snapshot of code string at purchase
  referralDiscountPct: integer("referral_discount_pct"), // 10 when referral applied
  discountLedgerId:    text("discount_ledger_id"),    // FK → discountLedger.id if reward used

  // ADR 0023 — affiliate attribution + commission snapshot, written at order creation from the
  // final total. Earned/void is derived from `status`, never stored (commissionState).
  // No onDelete: an affiliate with order history is deactivated (is_active), not deleted.
  affiliateId:               text("affiliate_id").references(() => affiliates.id),
  attributionSource:         attributionSourceEnum("attribution_source"),
  affiliateDiscountBps:      integer("affiliate_discount_bps"),        // discount actually applied: best of the affiliate rate and crypto
  commissionRateSnapshotBps: integer("commission_rate_snapshot_bps"),  // 3500 = 35%; the rate when the order was placed
  commissionAmountCents:     integer("commission_amount_cents"),
  commissionEarnedAt:        timestamp("commission_earned_at"),        // atomic claim; the only trigger for the notification
}, (table) => [
  index("orders_affiliate_id_idx").on(table.affiliateId),
]);

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

export const referralCodes = pgTable("referral_codes", {
  id:        text("id").primaryKey(),                                          // nanoid
  userId:    text("user_id").references(() => users.id).notNull().unique(),
  code:      text("code").notNull().unique(),                                  // "NORA-K7BM2P"
  active:    boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ReferralCode = typeof referralCodes.$inferSelect;

export const discountLedger = pgTable("discount_ledger", {
  id:              text("id").primaryKey(),                                    // nanoid
  userId:          text("user_id").references(() => users.id).notNull(),
  source:          text("source").notNull(),                                   // "referral_reward" | "promo"
  discountPct:     integer("discount_pct").notNull(),                          // 10 = 10%
  status:          text("status").default("available").notNull(),              // "available" | "redeemed" | "expired"
  redeemedOrderId: text("redeemed_order_id"),                                  // set on use
  expiresAt:       timestamp("expires_at"),                                    // null = never expires
  createdAt:       timestamp("created_at").defaultNow().notNull(),
});

export type DiscountLedgerEntry = typeof discountLedger.$inferSelect;

export const referrals = pgTable("referrals", {
  id:               text("id").primaryKey(),                                   // nanoid
  referralCodeId:   text("referral_code_id").references(() => referralCodes.id).notNull(),
  referredOrderId:  text("referred_order_id").references(() => orders.id).notNull(),
  referredEmail:    text("referred_email").notNull(),
  referrerRewardId: text("referrer_reward_id"),                                // FK → discountLedger.id, set when reward created
  createdAt:        timestamp("created_at").defaultNow().notNull(),
});

export type Referral = typeof referrals.$inferSelect;

// ── Marketing contacts (ADR 0024) ─────────────────────────────────────────────
// The broadcast list, kept apart from orders so LTV numbers never include never-paid leads.
// Insert-only: an existing row is never touched, so an opt-out always wins. Resend owns
// unsubscribe status once a contact is in the segment.
export const marketingContacts = pgTable("marketing_contacts", {
  id:             text("id").primaryKey(),
  email:          text("email").notNull().unique(),  // lowercased + trimmed
  firstName:      text("first_name"),
  source:         text("source").notNull(),          // "order" | "order-backfill"
  unsubscribedAt: timestamp("unsubscribed_at"),
  createdAt:      timestamp("created_at").defaultNow().notNull(),
});

// ── Affiliates (ADR 0023, ported from isrib-next ADR 0025) ────────────────────
// Creator program, separate from the customer referral (ADR 0017). Money is integer cents;
// rates are integer basis points (3500 = 35%).

export const affiliates = pgTable("affiliates", {
  id:                   text("id").primaryKey(),          // nanoid
  name:                 text("name").notNull(),
  handle:               text("handle"),
  code:                 text("code").notNull().unique(),  // stored uppercase; never NORA- (customer referral prefix)
  commissionRateBps:    integer("commission_rate_bps").notNull().default(3500),
  customerDiscountBps:  integer("customer_discount_bps").notNull().default(1500),
  notifyEmail:          text("notify_email"),             // also the self-purchase check and partner login
  notifyTelegramChatId: text("notify_telegram_chat_id"),  // when set, Telegram goes first and email is the fallback
  isActive:             boolean("is_active").notNull().default(true),
  createdAt:            timestamp("created_at").defaultNow().notNull(),
});

export type Affiliate = typeof affiliates.$inferSelect;

// One row per visitor per affiliate per UTC day: visitor_hash uses a daily salt, so the unique
// index is the dedupe. Never store a raw IP.
export const affiliateClicks = pgTable("affiliate_clicks", {
  id:          text("id").primaryKey(),
  affiliateId: text("affiliate_id").notNull().references(() => affiliates.id, { onDelete: "cascade" }),
  createdAt:   timestamp("created_at").defaultNow().notNull(),
  landingPath: text("landing_path"),
  visitorHash: text("visitor_hash").notNull(),
}, (table) => [
  uniqueIndex("affiliate_clicks_affiliate_id_visitor_hash_idx").on(table.affiliateId, table.visitorHash),
]);

// Immutable money records. No onDelete: a paid affiliate must not be deletable.
export const affiliatePayouts = pgTable("affiliate_payouts", {
  id:             text("id").primaryKey(),
  affiliateId:    text("affiliate_id").notNull().references(() => affiliates.id),
  amountCents:    integer("amount_cents").notNull(),
  cryptoCurrency: text("crypto_currency").notNull(),
  cryptoAmount:   text("crypto_amount").notNull(),  // text so it stays exact
  txHash:         text("tx_hash").notNull().unique(),
  periodStart:    timestamp("period_start").notNull(),
  periodEnd:      timestamp("period_end").notNull(),
  paidAt:         timestamp("paid_at").notNull(),
  createdAt:      timestamp("created_at").defaultNow().notNull(),
});

// Single-use magic links; only the SHA-256 of the opaque token is stored.
export const affiliateLoginTokens = pgTable("affiliate_login_tokens", {
  id:          text("id").primaryKey(),
  affiliateId: text("affiliate_id").notNull().references(() => affiliates.id, { onDelete: "cascade" }),
  tokenHash:   text("token_hash").notNull().unique(),
  expiresAt:   timestamp("expires_at").notNull(),
  usedAt:      timestamp("used_at"),
  createdAt:   timestamp("created_at").defaultNow().notNull(),
});

// DB-backed partner sessions, so deactivating an affiliate cuts access at once.
export const affiliateSessions = pgTable("affiliate_sessions", {
  id:          text("id").primaryKey(),
  affiliateId: text("affiliate_id").notNull().references(() => affiliates.id, { onDelete: "cascade" }),
  tokenHash:   text("token_hash").notNull().unique(),
  expiresAt:   timestamp("expires_at").notNull(),
  createdAt:   timestamp("created_at").defaultNow().notNull(),
});

// Partner login rate limiting only.
export const affiliateLoginAttempts = pgTable("affiliate_login_attempts", {
  id:          text("id").primaryKey(),
  visitorHash: text("visitor_hash").notNull(),
  createdAt:   timestamp("created_at").defaultNow().notNull(),
});
