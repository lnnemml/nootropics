import type { NewOrder, Order } from "@/lib/db/schema";

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
  <p style="font-family: monospace; font-size: 13px; color: #1E9C78; margin-bottom: 24px;">Order ${order.orderNumber}</p>
  <p style="color: #2E3A3C; margin-bottom: 24px;">Thank you for your order, ${order.name}. Here is your summary:</p>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
    <tr style="border-bottom: 1px solid #e5e5e0;">
      <td style="padding: 10px 0; color: #666;">Order number</td>
      <td style="padding: 10px 0; text-align: right; font-family: monospace;">${order.orderNumber}</td>
    </tr>
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

export function orderPaymentConfirmedCrypto(order: Order): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: 'Space Grotesk', Arial, sans-serif; color: #2E3A3C; max-width: 560px; margin: 0 auto; padding: 40px 24px;">
  <p style="font-family: monospace; font-size: 11px; color: #1E9C78; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 24px;">NORA Alliance</p>
  <h1 style="font-size: 28px; font-weight: 600; margin-bottom: 16px; line-height: 1.2;">Payment confirmed.</h1>
  <p style="font-family: monospace; font-size: 13px; color: #1E9C78; margin-bottom: 24px;">Order ${order.orderNumber}</p>
  <p style="color: #2E3A3C; margin-bottom: 24px;">Your crypto payment has been confirmed, ${order.name}. We'll ship your NeuroDrive within 24 hours and email a tracking number to <strong>${order.email}</strong>.</p>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
    <tr style="border-bottom: 1px solid #e5e5e0;">
      <td style="padding: 10px 0; color: #666;">Order number</td>
      <td style="padding: 10px 0; text-align: right; font-family: monospace;">${order.orderNumber}</td>
    </tr>
    <tr style="border-bottom: 1px solid #e5e5e0;">
      <td style="padding: 10px 0; color: #666;">Product</td>
      <td style="padding: 10px 0; text-align: right;">NeuroDrive × ${order.quantity}</td>
    </tr>
    <tr>
      <td style="padding: 10px 0; font-weight: 600;">Total paid</td>
      <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #1E9C78;">${formatPrice(order.totalPrice)}</td>
    </tr>
  </table>
  <p style="color: #2E3A3C; margin-bottom: 32px;">If you have any questions, reach us at <a href="mailto:orders@noraalliance.com" style="color: #1E9C78;">orders@noraalliance.com</a>.</p>
  <hr style="border: none; border-top: 1px solid #e5e5e0; margin: 24px 0;">
  <p style="font-size: 12px; color: #999;">NORA Alliance · noraalliance.com</p>
</body>
</html>`;
}

export function orderPaymentConfirmedOps(order: Order): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: monospace; color: #2E3A3C; max-width: 600px; margin: 0 auto; padding: 32px 24px;">
  <h2 style="font-size: 18px; margin-bottom: 24px; color: #1E9C78;">✓ [NORA] Payment confirmed — ${order.orderNumber}</h2>
  <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
    <tr><td style="padding: 6px 0; color: #666; width: 160px;">Order</td><td>${order.orderNumber}</td></tr>
    <tr><td style="padding: 6px 0; color: #666;">Name</td><td>${order.name}</td></tr>
    <tr><td style="padding: 6px 0; color: #666;">Email</td><td><a href="mailto:${order.email}">${order.email}</a></td></tr>
    <tr><td style="padding: 6px 0; color: #666;">Product</td><td>${order.productSlug} × ${order.quantity}</td></tr>
    <tr><td style="padding: 6px 0; color: #666;">Total paid</td><td style="font-weight: bold; color: #1E9C78;">$${(order.totalPrice / 100).toFixed(2)}</td></tr>
    <tr><td style="padding: 6px 0; color: #666;">Address</td><td>${order.address}, ${order.city}${order.stateRegion ? ", " + order.stateRegion : ""}, ${order.postalCode}, ${order.country}</td></tr>
    <tr><td style="padding: 6px 0; color: #666;">Phone</td><td>${order.phone}</td></tr>
    ${order.note ? `<tr><td style="padding: 6px 0; color: #666;">Note</td><td>${order.note}</td></tr>` : ""}
  </table>
  <p style="margin-top: 24px; font-size: 12px; color: #999;">Action required: fulfil and ship this order.</p>
</body>
</html>`;
}

export function orderShippedCustomer(
  order: Order,
  carrierLabel: string,
  trackingUrl: string | null
): string {
  const trackingLink = trackingUrl
    ? `<p style="margin-bottom: 16px;">Track your parcel: <a href="${trackingUrl}" style="color: #1E9C78;">${trackingUrl}</a></p>`
    : "";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: 'Space Grotesk', Arial, sans-serif; color: #2E3A3C; max-width: 560px; margin: 0 auto; padding: 40px 24px;">
  <p style="font-family: monospace; font-size: 11px; color: #1E9C78; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 24px;">NORA Alliance</p>
  <h1 style="font-size: 28px; font-weight: 600; margin-bottom: 16px; line-height: 1.2;">Your order has shipped.</h1>
  <p style="font-family: monospace; font-size: 13px; color: #1E9C78; margin-bottom: 24px;">Order ${order.orderNumber}</p>
  <p style="color: #2E3A3C; margin-bottom: 24px;">Good news, ${order.name} — your NeuroDrive is on its way.</p>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
    <tr style="border-bottom: 1px solid #e5e5e0;">
      <td style="padding: 10px 0; color: #666;">Carrier</td>
      <td style="padding: 10px 0; text-align: right;">${carrierLabel}</td>
    </tr>
    <tr style="border-bottom: 1px solid #e5e5e0;">
      <td style="padding: 10px 0; color: #666;">Tracking number</td>
      <td style="padding: 10px 0; text-align: right; font-family: monospace;">${order.trackingNumber}</td>
    </tr>
  </table>
  ${trackingLink}
  <p style="color: #2E3A3C; margin-bottom: 24px;">International deliveries typically arrive within <strong>7–21 business days</strong>.</p>
  <p style="color: #2E3A3C; margin-bottom: 24px;">View your order at <a href="https://www.noraalliance.com/account" style="color: #1E9C78;">noraalliance.com/account</a>.</p>
  <p style="color: #2E3A3C; margin-bottom: 32px;">Questions? Reach us at <a href="mailto:orders@noraalliance.com" style="color: #1E9C78;">orders@noraalliance.com</a>.</p>
  <hr style="border: none; border-top: 1px solid #e5e5e0; margin: 24px 0;">
  <p style="font-size: 12px; color: #999;">NORA Alliance · noraalliance.com</p>
</body>
</html>`;
}

export function orderAlertOps(order: NewOrder): string {
  const trafficColor =
    order.trafficType === "paid" ? "#dc2626" :
    order.trafficType === "referral" ? "#1E9C78" :
    "#666";

  const trafficBlock = `
    <tr><td colspan="2" style="padding: 16px 0 6px; font-weight: bold; border-top: 1px solid #e5e5e0;">Traffic</td></tr>
    <tr><td style="padding: 4px 0; color: #666; width: 160px;">Type</td><td style="font-weight: bold; color: ${trafficColor};">${(order.trafficType ?? "direct").toUpperCase()}</td></tr>
    ${order.utmSource   ? `<tr><td style="padding: 4px 0; color: #666;">Source</td><td>${order.utmSource}</td></tr>` : ""}
    ${order.utmMedium   ? `<tr><td style="padding: 4px 0; color: #666;">Medium</td><td>${order.utmMedium}</td></tr>` : ""}
    ${order.utmCampaign ? `<tr><td style="padding: 4px 0; color: #666;">Campaign</td><td>${order.utmCampaign}</td></tr>` : ""}
    ${order.utmContent  ? `<tr><td style="padding: 4px 0; color: #666;">Ad set</td><td>${order.utmContent}</td></tr>` : ""}
    ${order.utmTerm     ? `<tr><td style="padding: 4px 0; color: #666;">Creative</td><td>${order.utmTerm}</td></tr>` : ""}
  `;

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: monospace; color: #2E3A3C; max-width: 600px; margin: 0 auto; padding: 32px 24px;">
  <h2 style="font-size: 18px; margin-bottom: 24px;">[NORA] New order — ${order.paymentMethod.toUpperCase()}</h2>
  <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
    <tr><td style="padding: 6px 0; color: #666; width: 160px;">Order number</td><td style="font-weight: bold;">${order.orderNumber}</td></tr>
    <tr><td style="padding: 6px 0; color: #666;">Ref</td><td>${order.id}</td></tr>
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
    ${trafficBlock}
  </table>
</body>
</html>`;
}
