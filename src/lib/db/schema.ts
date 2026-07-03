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
