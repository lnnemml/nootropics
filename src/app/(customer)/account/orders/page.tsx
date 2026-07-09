import { customerAuth } from "@/lib/customer-auth";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { Container } from "@/components/layout/Container";
import { STATUS_LABELS, STATUS_COLORS } from "@/lib/order-status";
import Link from "next/link";

export default async function OrdersPage() {
  const session   = await customerAuth();
  const email     = session!.user.email!;

  const allOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.email, email))
    .orderBy(desc(orders.createdAt));

  return (
    <Container className="py-12 md:py-16">
      <Link
        href="/account"
        className="font-mono text-xs text-ink/40 hover:text-ink transition-colors inline-block mb-8"
      >
        ← My account
      </Link>

      <div className="flex items-baseline justify-between mb-6">
        <p className="font-mono text-xs text-accent uppercase tracking-widest">
          Orders
        </p>
        <p className="font-mono text-xs text-ink/30">
          {allOrders.length} total
        </p>
      </div>

      <div className="border border-border rounded-[2px] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-card border-b border-border">
            <tr>
              {["Order", "Date", "Product", "Payment", "Total", "Status"].map(
                (h) => (
                  <th
                    key={h}
                    className="font-mono text-xs text-ink/50 text-left px-4 py-3"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-border last:border-0 hover:bg-card/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/account/orders/${order.id}`}
                    className="font-mono text-xs text-accent hover:underline"
                  >
                    {order.orderNumber}
                  </Link>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-ink/50">
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-ink/70">
                  {order.productSlug} × {order.quantity}
                </td>
                <td className="px-4 py-3 font-mono text-xs">
                  <span
                    className={
                      order.paymentMethod === "crypto"
                        ? "text-accent"
                        : "text-ink/50"
                    }
                  >
                    {order.paymentMethod}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-ink">
                  ${(order.totalPrice / 100).toFixed(2)}
                </td>
                <td
                  className={`px-4 py-3 font-mono text-xs ${STATUS_COLORS[order.status] ?? ""}`}
                >
                  {STATUS_LABELS[order.status] ?? order.status}
                </td>
              </tr>
            ))}
            {allOrders.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center font-mono text-xs text-ink/30"
                >
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
