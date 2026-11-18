"use server";

import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { createReferrerReward } from "@/lib/referral-reward";
import { claimCommissionAndNotify } from "@/lib/affiliate/earn";
import { isAdminAuthed } from "@/lib/auth";

export async function updateOrderStatus(
  orderId: string,
  status: typeof orders.$inferInsert.status
): Promise<void> {
  // Order status drives affiliate commission (ADR 0023), so this must never run unauthenticated.
  if (!(await isAdminAuthed())) return;

  await db
    .update(orders)
    .set({ status })
    .where(eq(orders.id, orderId));

  if (status === "paid" || status === "fulfilled") {
    await createReferrerReward(orderId).catch((err) => {
      console.error("createReferrerReward failed:", err);
    });
    await claimCommissionAndNotify(orderId);
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/orders/${orderId}`);
}
