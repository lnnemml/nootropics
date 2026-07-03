import type { NewOrder } from "@/lib/db/schema";

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function orderConfirmationCustomer(order: NewOrder): string {
  const isCrypto = order.paymentMethod === "crypto";

  const paymentMessage = isCrypto
    ? `<p>A NowPayments invoice will be sent to <strong>${order.email}</strong> shortly. You will have 24 hours to complete payment once the invoice arrives.</p>`
    : `<p>A member of our team will contact you at <strong>${order.email}</strong> within one business day to arrange payment. You can also reach us at <a href="mailto:orders@noraalliance.com">orders@noraalliance.com</a>.</p>`;

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: 'Space Grotesk', Arial, sans-serif; color: #2E3A3C; max-width: 560px; margin: 0 auto; padding: 40px 24px;">
  <p style="font-family: monospace; font-size: 11px; color: #1E9C78; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 24px;">NORA Alliance</p>
  <h1 style="font-size: 28px; font-weight: 600; margin-bottom: 16px; line-height: 1.2;">Order received.</h1>
  <p style="color: #2E3A3C; margin-bottom: 24px;">Thank you for your order, ${order.name}. Here is your summary:</p>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
    <tr style="border-bottom: 1px solid #e5e5e0;">
      <td style="padding: 10px 0; color: #666;">Product</td>
      <td style="padding: 10px 0; text-align: right;">NeuroDrive × ${order.quantity}</td>
    </tr>
    <tr style="border-bottom: 1px solid #e5e5e0;">
      <td style="padding: 10px 0; color: #666;">Payment method</td>
      <td style="padding: 10px 0; text-align: right;">${isCrypto ? "Crypto (10% discount applied)" : "Manual arrangement"}</td>
    </tr>
    <tr>
      <td style="padding: 10px 0; font-weight: 600;">Total</td>
      <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #1E9C78;">${formatPrice(order.totalPrice)}</td>
    </tr>
  </table>
  ${paymentMessage}
  <p style="font-family: monospace; font-size: 11px; color: #999; margin-top: 32px;">Order ref: ${order.id}</p>
  <hr style="border: none; border-top: 1px solid #e5e5e0; margin: 24px 0;">
  <p style="font-size: 12px; color: #999;">NORA Alliance · noraalliance.com</p>
</body>
</html>`;
}

export function orderAlertOps(order: NewOrder): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: monospace; color: #2E3A3C; max-width: 600px; margin: 0 auto; padding: 32px 24px;">
  <h2 style="font-size: 18px; margin-bottom: 24px;">[NORA] New order — ${order.paymentMethod.toUpperCase()}</h2>
  <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
    <tr><td style="padding: 6px 0; color: #666; width: 160px;">Ref</td><td>${order.id}</td></tr>
    <tr><td style="padding: 6px 0; color: #666;">Time</td><td>${new Date().toISOString()}</td></tr>
    <tr><td style="padding: 6px 0; color: #666;">Name</td><td>${order.name}</td></tr>
    <tr><td style="padding: 6px 0; color: #666;">Email</td><td><a href="mailto:${order.email}">${order.email}</a></td></tr>
    <tr><td style="padding: 6px 0; color: #666;">Phone</td><td>${order.phone}</td></tr>
    <tr><td style="padding: 6px 0; color: #666;">Address</td><td>${order.address}, ${order.city}${order.stateRegion ? ", " + order.stateRegion : ""}, ${order.postalCode}, ${order.country}</td></tr>
    <tr><td style="padding: 6px 0; color: #666;">Product</td><td>${order.productSlug} × ${order.quantity}</td></tr>
    <tr><td style="padding: 6px 0; color: #666;">Payment</td><td>${order.paymentMethod}${order.cryptoDiscountPct ? ` (${order.cryptoDiscountPct}% discount)` : ""}</td></tr>
    <tr><td style="padding: 6px 0; color: #666;">Total</td><td style="font-weight: bold;">${formatPrice(order.totalPrice)}</td></tr>
    ${order.promoCode ? `<tr><td style="padding: 6px 0; color: #666;">Promo code</td><td>${order.promoCode}</td></tr>` : ""}
    ${order.note ? `<tr><td style="padding: 6px 0; color: #666;">Note</td><td>${order.note}</td></tr>` : ""}
  </table>
</body>
</html>`;
}
