import { pgTable, text, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";

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
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
