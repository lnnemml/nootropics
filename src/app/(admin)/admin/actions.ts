"use server";

// Admin order actions (ADR 0024, ported from isrib-next ADR 0011). Every action re-verifies the
// admin session first: the proxy is only the first gate, and Server Actions are reachable by
// direct POST. Emails and side effects are best-effort; a paid state is never rolled back
// because an email bounced.
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, isAdminAuthed } from "@/lib/admin/auth";
import { safeErrorTag } from "@/lib/affiliate/core";
import { claimCommissionAndNotify } from "@/lib/affiliate/earn";
import { db } from "@/lib/db";
import { orderStatusEnum, orders } from "@/lib/db/schema";
import { sendPaymentConfirmedEmail, sendPaymentConfirmedOpsAlert } from "@/lib/email/send";
import { createReferrerReward } from "@/lib/referral-reward";

export type ActionResult = { ok: true } | { error: string };

type OrderStatus = (typeof orderStatusEnum.enumValues)[number];

const UNAUTHORIZED = { error: "Unauthorized" };

function refreshOrder(orderId: string): void {
  revalidatePath("/admin");
  revalidatePath(`/admin/orders/${orderId}`);
}

// Referral reward and affiliate commission both key off paid/fulfilled; both are idempotent.
async function runPaidSideEffects(orderId: string): Promise<void> {
  try {
    await createReferrerReward(orderId);
  } catch (err) {
    console.error("createReferrerReward failed (non-fatal):", safeErrorTag(err));
  }
  await claimCommissionAndNotify(orderId);
}

export async function logout(): Promise<void> {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

export async function setStatus(orderId: string, status: OrderStatus): Promise<ActionResult> {
  if (!(await isAdminAuthed())) return UNAUTHORIZED;
  if (!orderStatusEnum.enumValues.includes(status)) return { error: "Invalid status." };

  const [updated] = await db
    .update(orders)
    .set({ status })
    .where(eq(orders.id, orderId))
    .returning({ id: orders.id });
  if (!updated) return { error: "Order not found." };

  if (status === "paid" || status === "fulfilled") await runPaidSideEffects(orderId);

  refreshOrder(orderId);
  return { ok: true };
}

// The manual-payment confirmation (crypto is confirmed by the NowPayments webhook). Unlike a bare
// status change, this emails the customer and ops. Idempotent: a paid order is left alone.
export async function markPaid(orderId: string): Promise<ActionResult> {
  if (!(await isAdminAuthed())) return UNAUTHORIZED;

  const [order] = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  if (!order) return { error: "Order not found." };
  if (order.status === "paid" || order.status === "fulfilled") return { ok: true };
  if (order.status === "cancelled") return { error: "This order is cancelled." };

  await db.update(orders).set({ status: "paid" }).where(eq(orders.id, orderId));

  await Promise.allSettled([
    sendPaymentConfirmedEmail({ ...order, status: "paid" }),
    sendPaymentConfirmedOpsAlert({ ...order, status: "paid" }),
  ]);
  await runPaidSideEffects(orderId);

  refreshOrder(orderId);
  return { ok: true };
}
