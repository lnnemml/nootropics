"use server";

import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { CARRIER_LABELS, getTrackingUrl } from "@/lib/tracking";
import { sendOrderShippedEmail } from "@/lib/email/send";

export async function markOrderShipped(
  orderId: string,
  carrier: string,
  trackingNumber: string
): Promise<{ error?: string }> {
  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1);

  if (!order) return { error: "Order not found." };
  if (order.shippedAt !== null) return { error: "Order already marked as shipped." };

  await db
    .update(orders)
    .set({
      status: "fulfilled",
      trackingNumber,
      trackingCarrier: carrier,
      shippedAt: new Date(),
    })
    .where(eq(orders.id, orderId));

  const [updated] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1);

  const carrierLabel = CARRIER_LABELS[carrier] ?? carrier;
  const trackingUrl = carrier !== "other" ? getTrackingUrl(carrier, trackingNumber) : null;

  await sendOrderShippedEmail(updated, carrierLabel, trackingUrl);

  revalidatePath(`/admin/orders/${orderId}`);
  return {};
}
