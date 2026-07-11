import { pgTable, text, integer, timestamp, pgEnum, boolean } from "drizzle-orm/pg-core";

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
});

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
