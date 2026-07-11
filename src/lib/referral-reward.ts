import { db } from "@/lib/db";
import { orders, referralCodes, referrals, discountLedger } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

/**
 * When a referred order is paid, create a reward for the referrer.
 * Idempotent — skips if a referrals record already exists for this order.
 */
export async function createReferrerReward(orderId: string): Promise<void> {
  const [order] = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  if (!order?.referralCodeUsed) return;

  const [codeRecord] = await db
    .select()
    .from(referralCodes)
    .where(eq(referralCodes.code, order.referralCodeUsed))
    .limit(1);
  if (!codeRecord) return;

  // Idempotency guard — bail if reward was already created for this order
  const [existing] = await db
    .select({ id: referrals.id })
    .from(referrals)
    .where(eq(referrals.referredOrderId, orderId))
    .limit(1);
  if (existing) return;

  // Create the referrer's reward entry
  const rewardId = nanoid();
  await db.insert(discountLedger).values({
    id: rewardId,
    userId: codeRecord.userId,
    source: "referral_reward",
    discountPct: 10,
    status: "available",
    expiresAt: null,
  });

  // Record the referral, linking code → order → reward
  await db.insert(referrals).values({
    id: nanoid(),
    referralCodeId: codeRecord.id,
    referredOrderId: orderId,
    referredEmail: order.email,
    referrerRewardId: rewardId,
  });
}
