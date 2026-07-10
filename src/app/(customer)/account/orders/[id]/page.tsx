import { customerAuth } from "@/lib/customer-auth";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { STATUS_LABELS, STATUS_COLORS } from "@/lib/order-status";
import Link from "next/link";
import { TrackingCard } from "./TrackingCard";
import { CARRIER_LABELS, getTrackingUrl } from "@/lib/tracking";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id }  = await params;
  const session = await customerAuth();
  const email   = session!.user.email!;

  const order = await db.query.orders.findFirst({
    where: and(eq(orders.id, id), eq(orders.email, email)),
  });

  if (!order) notFound();

  const shippingAddress = [
    order.address,
    order.city,
    order.stateRegion,
    order.postalCode,
    order.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Container className="py-12 md:py-16">
      <Link
        href="/account/orders"
        className="font-mono text-xs text-ink/40 hover:text-ink transition-colors inline-block mb-8"
      >
        ← All orders
      </Link>

      {/* Order header */}
      <div className="mb-8">
        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-1">
          {order.orderNumber}
        </p>
        <div className="flex items-center gap-3">
          <p className="font-mono text-xs text-ink/40">
            {new Date(order.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <span className="text-ink/20">·</span>
          <p className={`font-mono text-xs ${STATUS_COLORS[order.status] ?? ""}`}>
            {STATUS_LABELS[order.status] ?? order.status}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Order summary */}
        <div className="border border-border rounded-[2px] bg-card p-5">
          <p className="font-mono text-[10px] text-ink/40 uppercase tracking-widest mb-4">
            Order summary
          </p>
          <div className="flex flex-col gap-3">
            <Row label="Product" value={order.productSlug} />
            <Row label="Quantity" value={String(order.quantity)} />
            <Row
              label="Payment"
              value={order.paymentMethod}
              valueClass={
                order.paymentMethod === "crypto" ? "text-accent" : undefined
              }
            />
            {order.cryptoDiscountPct && (
              <Row
                label="Crypto discount"
                value={`${order.cryptoDiscountPct}%`}
              />
            )}
            {order.promoCode && (
              <Row label="Promo code" value={order.promoCode} />
            )}
            <div className="pt-3 border-t border-border">
              <Row
                label="Total"
                value={`$${(order.totalPrice / 100).toFixed(2)}`}
                valueClass="text-ink font-medium"
              />
            </div>
          </div>
        </div>

        {/* Shipping */}
        <div className="border border-border rounded-[2px] bg-card p-5">
          <p className="font-mono text-[10px] text-ink/40 uppercase tracking-widest mb-4">
            Shipping address
          </p>
          <div className="flex flex-col gap-3">
            <Row label="Name" value={order.name} />
            <Row label="Phone" value={order.phone} />
            <Row label="Address" value={shippingAddress} />
          </div>
        </div>
      </div>

      {/* Tracking */}
      {order.trackingNumber && (
        <TrackingCard
          trackingNumber={order.trackingNumber}
          carrierLabel={CARRIER_LABELS[order.trackingCarrier ?? ""] ?? (order.trackingCarrier ?? "")}
          trackingUrl={
            order.trackingCarrier && order.trackingCarrier !== "other"
              ? getTrackingUrl(order.trackingCarrier, order.trackingNumber)
              : null
          }
          shippedAt={order.shippedAt}
        />
      )}

      {/* Note */}
      {order.note && (
        <div className="mt-4 border border-border rounded-[2px] bg-card p-5">
          <p className="font-mono text-[10px] text-ink/40 uppercase tracking-widest mb-3">
            Note
          </p>
          <p className="text-sm text-secondary">{order.note}</p>
        </div>
      )}
    </Container>
  );
}

function Row({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string | null | undefined;
  valueClass?: string;
}) {
  if (!value) return null;
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="font-mono text-xs text-ink/40 shrink-0">{label}</span>
      <span className={`font-mono text-xs text-right ${valueClass ?? "text-ink/80"}`}>
        {value}
      </span>
    </div>
  );
}
