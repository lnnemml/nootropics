import { Resend } from "resend";
import type { NewOrder, Order } from "@/lib/db/schema";
import { orderConfirmationCustomer, orderAlertOps, orderPaymentConfirmedCrypto, orderPaymentConfirmedOps, orderShippedCustomer } from "./templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderEmails(order: NewOrder): Promise<void> {
  const adminEmails = (process.env.ADMIN_EMAIL ?? "").split(",").map(e => e.trim()).filter(Boolean);

  await Promise.allSettled([
    resend.emails.send({
      from: "NORA Alliance <orders@noraalliance.com>",
      to: order.email,
      subject: "Your NORA order has been received",
      html: orderConfirmationCustomer(order),
    }),
    resend.emails.send({
      from: "NORA System <system@noraalliance.com>",
      to: adminEmails,
      subject: `[NORA] ${order.orderNumber} — ${order.name} — ${order.paymentMethod} — $${(order.totalPrice / 100).toFixed(2)}`,
      html: orderAlertOps(order),
    }),
  ]);
}

export async function sendPaymentConfirmedEmail(order: Order): Promise<void> {
  await resend.emails.send({
    from: "NORA Alliance <orders@noraalliance.com>",
    to: order.email,
    subject: `${order.orderNumber} — Payment confirmed`,
    html: orderPaymentConfirmedCrypto(order),
  });
}

export async function sendOrderShippedEmail(
  order: Order,
  carrierLabel: string,
  trackingUrl: string | null
): Promise<void> {
  await resend.emails.send({
    from: "NORA Alliance <orders@noraalliance.com>",
    to: order.email,
    subject: `Your NeuroDrive order #${order.orderNumber} has shipped`,
    html: orderShippedCustomer(order, carrierLabel, trackingUrl),
  });
}

export async function sendPaymentConfirmedOpsAlert(order: Order): Promise<void> {
  const adminEmails = (process.env.ADMIN_EMAIL ?? "").split(",").map(e => e.trim()).filter(Boolean);
  await resend.emails.send({
    from: "NORA System <system@noraalliance.com>",
    to: adminEmails,
    subject: `✓ [NORA] ${order.orderNumber} — Crypto payment confirmed — $${(order.totalPrice / 100).toFixed(2)}`,
    html: orderPaymentConfirmedOps(order),
  });
}
