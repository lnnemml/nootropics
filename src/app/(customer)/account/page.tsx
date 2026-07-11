import { customerAuth, customerSignOut } from "@/lib/customer-auth";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { Container } from "@/components/layout/Container";
import { STATUS_LABELS, STATUS_COLORS } from "@/lib/order-status";
import Link from "next/link";

export default async function AccountPage() {
  const session = await customerAuth();
  const email   = session!.user.email!;
  const name    = session!.user.name;

  const recentOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.email, email))
    .orderBy(desc(orders.createdAt))
    .limit(3);

  return (
    <Container className="py-12 md:py-16">
      {/* Page header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <p className="font-mono text-xs text-accent uppercase tracking-widest mb-1">
            My account
          </p>
          <h1 className="text-2xl font-semibold text-ink tracking-tight">
            {name ?? email}
          </h1>
          {name && (
            <p className="font-mono text-xs text-secondary mt-0.5">{email}</p>
          )}
        </div>
        <form
          action={async () => {
            "use server";
            await customerSignOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="font-mono text-xs text-ink/40 hover:text-ink transition-colors"
          >
            Sign out
          </button>
        </form>
      </div>

      {/* Referral quick link */}
      <Link
        href="/account/referrals"
        className="flex items-center justify-between border border-border rounded-[2px] px-5 py-4 mb-8 hover:border-accent/50 transition-colors"
      >
        <div>
          <p className="font-mono text-xs text-accent uppercase tracking-widest mb-0.5">
            Referrals
          </p>
          <p className="font-sans text-[14px] text-secondary">
            Share your code · earn 10% off your next order
          </p>
        </div>
        <span className="font-mono text-xs text-ink/30 ml-4">{"→"}</span>
      </Link>

      {/* Recent orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="font-mono text-xs text-ink/50 uppercase tracking-widest">
            Recent orders
          </p>
          {recentOrders.length > 0 && (
            <Link
              href="/account/orders"
              className="font-mono text-xs text-accent hover:underline"
            >
              View all →
            </Link>
          )}
        </div>

        {recentOrders.length === 0 ? (
          <div className="border border-border rounded-[2px] px-5 py-10 text-center">
            <p className="font-mono text-xs text-ink/30">No orders yet.</p>
            <Link
              href="/products/neurodrive"
              className="font-mono text-xs text-accent hover:underline mt-3 inline-block"
            >
              Shop NeuroDrive →
            </Link>
          </div>
        ) : (
          <div className="border border-border rounded-[2px] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-card border-b border-border">
                <tr>
                  {["Order", "Date", "Product", "Total", "Status"].map((h) => (
                    <th
                      key={h}
                      className="font-mono text-xs text-ink/50 text-left px-4 py-3"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
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
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Container>
  );
}
