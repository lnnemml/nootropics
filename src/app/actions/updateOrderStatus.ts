"use server";

import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { createReferrerReward } from "@/lib/referral-reward";

export async function updateOrderStatus(
  orderId: string,
  status: typeof orders.$inferInsert.status
): Promise<void> {
  await db
    .update(orders)
    .set({ status })
    .where(eq(orders.id, orderId));

  if (status === "paid" || status === "fulfilled") {
    await createReferrerReward(orderId).catch((err) => {
      console.error("createReferrerReward failed:", err);
    });
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/orders/${orderId}`);
}
