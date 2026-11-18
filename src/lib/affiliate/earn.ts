import "server-only";

// ADR 0023 — the commission claim. commission_earned_at is set by one conditional UPDATE, so
// however many paid paths (webhook, admin setStatus/markPaid, markOrderShipped) reach an order, exactly
// one gets a row back and notifies.

import { and, eq, inArray, isNotNull, isNull } from "drizzle-orm";
import { db } from "@/lib/db";
import { affiliates, orders } from "@/lib/db/schema";
import { sendPartnerEmail } from "@/lib/email/send";
import { sendTelegramMessage } from "@/lib/telegram";
import { buildAffiliateNotification, safeErrorTag } from "./core";
import { affiliatesEnabled } from "./flag";

// Never throws: every caller sits on a payment transition, which this must not be able to
// affect. A delivery failure only logs, because the dashboard remains the record.
export async function claimCommissionAndNotify(orderId: string): Promise<void> {
  try {
    if (!affiliatesEnabled()) return;

    const [claimed] = await db
      .update(orders)
      .set({ commissionEarnedAt: new Date() })
      .where(
        and(
          eq(orders.id, orderId),
          isNotNull(orders.affiliateId),
          isNull(orders.commissionEarnedAt),
          inArray(orders.status, ["paid", "fulfilled"]),
        ),
      )
      .returning({
        orderNumber: orders.orderNumber,
        createdAt: orders.createdAt,
        totalPrice: orders.totalPrice,
        commissionAmountCents: orders.commissionAmountCents,
        affiliateId: orders.affiliateId,
      });

    if (!claimed || claimed.affiliateId === null || !claimed.commissionAmountCents) return;

    const [affiliate] = await db
      .select({
        notifyEmail: affiliates.notifyEmail,
        notifyTelegramChatId: affiliates.notifyTelegramChatId,
      })
      .from(affiliates)
      .where(eq(affiliates.id, claimed.affiliateId))
      .limit(1);
    if (!affiliate) return;

    const message = buildAffiliateNotification({
      orderNumber: claimed.orderNumber,
      createdAt: claimed.createdAt,
      orderTotalCents: claimed.totalPrice,
      commissionCents: claimed.commissionAmountCents,
    });

    let sentByTelegram = false;
    if (affiliate.notifyTelegramChatId) {
      try {
        await sendTelegramMessage(affiliate.notifyTelegramChatId, message.text);
        sentByTelegram = true;
      } catch (err) {
        console.error("Affiliate Telegram notification failed (non-fatal):", safeErrorTag(err));
      }
    }

    if (!sentByTelegram && affiliate.notifyEmail) {
      await sendPartnerEmail(affiliate.notifyEmail, message.subject, message.html);
    }
  } catch (err) {
    console.error("Affiliate commission claim failed (non-fatal):", safeErrorTag(err));
  }
}
