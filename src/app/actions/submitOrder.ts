"use server";

import { db } from "@/lib/db";
import { orders, referralCodes, discountLedger } from "@/lib/db/schema";
import { sendOrderEmails } from "@/lib/email/send";
import { generateOrderNumber, deriveTrafficType } from "@/lib/order-number";
import { createInvoice } from "@/lib/nowpayments";
import { customerAuth } from "@/lib/customer-auth";
import { trackServerEvent } from "@/lib/analytics/server";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

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
    utmSource:     formData.get("utmSource")   as string | null,
    utmMedium:     formData.get("utmMedium")   as string | null,
    utmCampaign:   formData.get("utmCampaign") as string | null,
    utmContent:    formData.get("utmContent")  as string | null,
    utmTerm:       formData.get("utmTerm")     as string | null,
    referralCode:  (formData.get("referralCode") as string | null)?.trim().toUpperCase() || null,
    rewardId:      formData.get("rewardId") as string | null,
    eventId:       formData.get("eventId") as string | null,
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

  // Link order to account if customer is signed in
  const session = await customerAuth();
  const userId = session?.user?.id ?? null;

  // Server-side referral validation — silently ignored if invalid
  let referralCodeUsed: string | null = null;
  let referralDiscountPct: number | null = null;
  if (raw.referralCode) {
    const codeRecord = await db.query.referralCodes.findFirst({
      where: and(eq(referralCodes.code, raw.referralCode), eq(referralCodes.active, true)),
    });
    if (codeRecord) {
      const isSelfReferral = userId !== null && codeRecord.userId === userId;
      if (!isSelfReferral) {
        referralCodeUsed = raw.referralCode;
        referralDiscountPct = 10;
      }
    }
  }

  // Reward validation — only for signed-in users, only if no referral discount (mutual exclusivity)
  let discountLedgerId: string | null = null;
  let rewardDiscountPct: number | null = null;
  if (raw.rewardId && userId && !referralCodeUsed) {
    const entry = await db.query.discountLedger.findFirst({
      where: and(
        eq(discountLedger.id, raw.rewardId),
        eq(discountLedger.userId, userId),
        eq(discountLedger.status, "available")
      ),
    });
    if (entry) {
      discountLedgerId = entry.id;
      rewardDiscountPct = entry.discountPct;
    }
  }

  const cryptoDiscount = isCrypto ? Math.round(pricing.total * CRYPTO_DISCOUNT_PCT / 100) : 0;
  const referralDiscount = referralDiscountPct ? Math.round(pricing.total * referralDiscountPct / 100) : 0;
  const rewardDiscount = rewardDiscountPct ? Math.round(pricing.total * rewardDiscountPct / 100) : 0;
  const totalPrice = pricing.total - cryptoDiscount - referralDiscount - rewardDiscount;

  const id = nanoid();
  const orderNumber = generateOrderNumber();
  const trafficType = deriveTrafficType(raw.utmSource, raw.utmMedium);

  await db.insert(orders).values({
    id,
    userId,
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
    promoCode:           raw.promoCode || null,
    note:                raw.note || null,
    referralCodeUsed,
    referralDiscountPct,
    discountLedgerId,
    orderNumber,
    utmSource:        raw.utmSource   || null,
    utmMedium:        raw.utmMedium   || null,
    utmCampaign:      raw.utmCampaign || null,
    utmContent:       raw.utmContent  || null,
    utmTerm:          raw.utmTerm     || null,
    trafficType,
  });

  const h = await headers();
  await trackServerEvent({
    eventName: "Purchase",
    eventId: raw.eventId ?? undefined,
    email: raw.email,
    value: totalPrice / 100,
    currency: "USD",
    userAgent: h.get("user-agent") ?? undefined,
    sourceUrl: h.get("referer") ?? undefined,
    ip: h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined,
  });

  // Mark reward as redeemed AFTER order is persisted — if insert failed, reward stays available
  if (discountLedgerId) {
    await db.update(discountLedger)
      .set({ status: "redeemed", redeemedOrderId: id })
      .where(eq(discountLedger.id, discountLedgerId));
  }

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
    referralCodeUsed,
    referralDiscountPct,
    discountLedgerId,
    nowpaymentsInvoiceId: null,
    nowpaymentsPaymentUrl: null,
    confirmationEmailSentAt: null,
    createdAt: new Date(),
    status: "pending_payment_instructions",
    orderNumber,
    utmSource:   raw.utmSource   || null,
    utmMedium:   raw.utmMedium   || null,
    utmCampaign: raw.utmCampaign || null,
    utmContent:  raw.utmContent  || null,
    utmTerm:     raw.utmTerm     || null,
    trafficType,
  });

  if (raw.paymentMethod === "crypto") {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://noraalliance.com";
      const invoice = await createInvoice({
        orderId:        id,
        orderNumber,
        amountUsd:      totalPrice / 100,
        successUrl:     `${baseUrl}/checkout/success?ref=${id}&order=${orderNumber}&method=crypto`,
        cancelUrl:      `${baseUrl}/checkout`,
        ipnCallbackUrl: `${baseUrl}/api/webhooks/nowpayments`,
      });

      await db
        .update(orders)
        .set({
          nowpaymentsInvoiceId:  invoice.id,
          nowpaymentsPaymentUrl: invoice.invoice_url,
        })
        .where(eq(orders.id, id));

      redirect(invoice.invoice_url);
    } catch (err) {
      if (isRedirectError(err)) throw err;
      console.error("NowPayments invoice creation failed:", err);
      // Order is already saved + ops alerted — fall through to success page
    }
  }

  redirect(`/checkout/success?ref=${id}&order=${orderNumber}`);
}
