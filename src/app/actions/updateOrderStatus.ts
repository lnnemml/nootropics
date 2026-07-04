"use server";

import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(
  orderId: string,
  status: typeof orders.$inferInsert.status
): Promise<void> {
  await db
    .update(orders)
    .set({ status })
    .where(eq(orders.id, orderId));
  revalidatePath("/admin");
  revalidatePath(`/admin/orders/${orderId}`);
}
