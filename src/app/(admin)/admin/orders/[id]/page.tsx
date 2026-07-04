import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { updateOrderStatus } from "@/app/actions/updateOrderStatus";

const ALL_STATUSES = [
  "pending_payment_instructions",
  "awaiting_payment",
  "paid",
  "fulfilled",
  "cancelled",
] as const;

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, id))
    .limit(1);

  if (!order) notFound();

  const rows: [string, string | number | null | undefined][] = [
    ["Order number",    order.orderNumber],
    ["Created",         new Date(order.createdAt).toISOString()],
    ["Name",            order.name],
    ["Email",           order.email],
    ["Phone",           order.phone],
    ["Address",         `${order.address}, ${order.city}${order.stateRegion ? ", " + order.stateRegion : ""}, ${order.postalCode}, ${order.country}`],
    ["Product",         `${order.productSlug} × ${order.quantity}`],
    ["Payment method",  order.paymentMethod],
    ["Total",           `$${(order.totalPrice / 100).toFixed(2)}`],
    ["Promo code",      order.promoCode],
    ["Note",            order.note],
    ["Traffic type",    order.trafficType],
    ["UTM source",      order.utmSource],
    ["UTM medium",      order.utmMedium],
    ["UTM campaign",    order.utmCampaign],
    ["UTM content",     order.utmContent],
    ["UTM term",        order.utmTerm],
    ["NowPayments ID",  order.nowpaymentsInvoiceId],
  ];

  return (
    <main className="min-h-screen bg-page p-8">
      <div className="max-w-[700px] mx-auto">
        <Link
          href="/admin"
          className="font-mono text-xs text-ink/40 hover:text-ink transition-colors mb-6 inline-block"
        >
          ← All orders
        </Link>

        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">
          {order.orderNumber}
        </p>
        <h1 className="font-display text-2xl font-semibold text-ink mb-8">
          {order.name}
        </h1>

        {/* Status update */}
        <div className="border border-border rounded-[2px] p-6 mb-6 bg-card">
          <p className="font-mono text-xs text-ink/50 mb-3 uppercase tracking-widest">
            Status
          </p>
          <form className="flex gap-3 items-center">
            <select
              name="status"
              defaultValue={order.status}
              className="border border-border bg-page text-ink font-mono text-sm px-3 py-2 rounded-[2px] outline-none"
            >
              {ALL_STATUSES.map(s => (
                <option key={s} value={s}>
                  {s.replace(/_/g, " ")}
                </option>
              ))}
            </select>
            <button
              type="submit"
              formAction={async (formData: FormData) => {
                "use server";
                const status = formData.get("status") as typeof ALL_STATUSES[number];
                await updateOrderStatus(order.id, status);
              }}
              className="bg-ink text-page font-mono text-xs px-4 py-2 rounded-[2px] hover:opacity-90 transition-opacity"
            >
              Save
            </button>
          </form>
        </div>

        {/* Order details */}
        <div className="border border-border rounded-[2px] overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {rows
                .filter(([, v]) => v !== null && v !== undefined && v !== "")
                .map(([label, value]) => (
                  <tr key={label} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-mono text-xs text-ink/40 w-[180px]">
                      {label}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-ink">
                      {String(value)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
