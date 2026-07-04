import { createHmac } from "node:crypto";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { sendPaymentConfirmedEmail } from "@/lib/email/send";
import { eq } from "drizzle-orm";

function sortObjectRecursive(obj: Record<string, unknown>): Record<string, unknown> {
  return Object.keys(obj).sort().reduce(
    (result: Record<string, unknown>, key: string) => {
      const val = obj[key];
      result[key] =
        val !== null && typeof val === "object" && !Array.isArray(val)
          ? sortObjectRecursive(val as Record<string, unknown>)
          : val;
      return result;
    },
    {}
  );
}

export async function POST(req: Request): Promise<Response> {
  const body = await req.text();
  const sig = req.headers.get("x-nowpayments-sig");

  // Verify HMAC-SHA512 signature
  const secret = process.env.NOWPAYMENTS_IPN_SECRET;
  if (!secret) {
    console.error("NOWPAYMENTS_IPN_SECRET not set");
    return new Response("Server misconfigured", { status: 500 });
  }

  const data = JSON.parse(body) as Record<string, unknown>;
  const sorted = sortObjectRecursive(data);
  const expected = createHmac("sha512", secret)
    .update(JSON.stringify(sorted))
    .digest("hex");

  if (!sig || sig !== expected) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Only act on fully completed payments
  if (data.payment_status !== "finished") {
    return new Response("OK");
  }

  // Find order by orderNumber (we passed orderNumber as order_id to NowPayments)
  const orderNumber = data.order_id as string;
  const [order] = await db.select().from(orders)
    .where(eq(orders.orderNumber, orderNumber))
    .limit(1);

  if (!order) {
    console.error(`NowPayments IPN: order not found for order_id=${orderNumber}`);
    return new Response("OK");
  }

  // Idempotent — skip if already marked paid
  if (order.status === "paid") {
    return new Response("OK");
  }

  await db.update(orders)
    .set({ status: "paid" })
    .where(eq(orders.id, order.id));

  await sendPaymentConfirmedEmail({ ...order, status: "paid" });

  return new Response("OK");
}
