"use server";

import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { sendOrderEmails } from "@/lib/email/send";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

const QUANTITY_PRICES: Record<string, { base: number; total: number; discountPct: number }> = {
  "1": { base: 12000, total: 12000, discountPct: 0 },
  "2": { base: 12000, total: 22000, discountPct: 0 },
  "3": { base: 12000, total: 30000, discountPct: 0 },
};

const CRYPTO_DISCOUNT_PCT = 10;

export async function submitOrder(formData: FormData): Promise<void> {
  const raw = {
    name:          formData.get("name") as string,
    email:         formData.get("email") as string,
    phone:         formData.get("phone") as string,
    address:       formData.get("address") as string,
    city:          formData.get("city") as string,
    postalCode:    formData.get("postalCode") as string,
    stateRegion:   formData.get("stateRegion") as string | null,
    country:       formData.get("country") as string,
    qty:           formData.get("qty") as string,
    paymentMethod: formData.get("paymentMethod") as "crypto" | "manual",
    promoCode:     formData.get("promoCode") as string | null,
    note:          formData.get("note") as string | null,
  };

  // Validate required fields (HTML required handles client-side; this is server-side guard)
  const required = ["name", "email", "phone", "address", "city", "postalCode", "country", "qty", "paymentMethod"] as const;
  for (const field of required) {
    if (!raw[field]) return;
  }

  if (!["crypto", "manual"].includes(raw.paymentMethod)) {
    return;
  }

  const pricing = QUANTITY_PRICES[raw.qty] ?? QUANTITY_PRICES["1"];
  const qty = parseInt(raw.qty);
  const isCrypto = raw.paymentMethod === "crypto";
  const cryptoDiscountPct = isCrypto ? CRYPTO_DISCOUNT_PCT : null;
  const totalPrice = isCrypto
    ? Math.round(pricing.total * (1 - CRYPTO_DISCOUNT_PCT / 100))
    : pricing.total;

  const id = nanoid();

  await db.insert(orders).values({
    id,
    name:             raw.name,
    email:            raw.email,
    phone:            raw.phone,
    address:          raw.address,
    city:             raw.city,
    postalCode:       raw.postalCode,
    stateRegion:      raw.stateRegion || null,
    country:          raw.country,
    productSlug:      "neurodrive",
    quantity:         qty,
    basePrice:        pricing.base,
    paymentMethod:    raw.paymentMethod,
    cryptoDiscountPct,
    totalPrice,
    promoCode:        raw.promoCode || null,
    note:             raw.note || null,
  });

  await sendOrderEmails({
    id,
    name: raw.name,
    email: raw.email,
    phone: raw.phone,
    address: raw.address,
    city: raw.city,
    postalCode: raw.postalCode,
    stateRegion: raw.stateRegion || null,
    country: raw.country,
    productSlug: "neurodrive",
    quantity: qty,
    basePrice: pricing.base,
    paymentMethod: raw.paymentMethod,
    cryptoDiscountPct,
    totalPrice,
    promoCode: raw.promoCode || null,
    note: raw.note || null,
    nowpaymentsInvoiceId: null,
    nowpaymentsPaymentUrl: null,
    confirmationEmailSentAt: null,
    createdAt: new Date(),
    status: "pending_payment_instructions",
  });

  redirect(`/checkout/success?ref=${id}`);
}
