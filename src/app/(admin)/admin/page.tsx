import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { signOut } from "@/lib/auth";

const STATUS_COLORS: Record<string, string> = {
  pending_payment_instructions: "text-amber-500",
  awaiting_payment:             "text-yellow-500",
  paid:                         "text-green-600",
  fulfilled:                    "text-teal-600",
  cancelled:                    "text-ink/30",
};

export default async function AdminPage() {
  const allOrders = await db
    .select()
    .from(orders)
    .orderBy(desc(orders.createdAt));

  return (
    <main className="min-h-screen bg-page p-8">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <p className="font-mono text-xs text-accent uppercase tracking-widest">
            NORA Admin — Orders
          </p>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button className="font-mono text-xs text-ink/40 hover:text-ink transition-colors">
              Sign out
            </button>
          </form>
        </div>

        <div className="border border-border rounded-[2px] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-card border-b border-border">
              <tr>
                {["Order", "Date", "Name", "Email", "Method", "Total", "Status"].map(h => (
                  <th key={h} className="font-mono text-xs text-ink/50 text-left px-4 py-3">
                    {h}
                  </th>
                ))}
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
                      href={`/admin/orders/${order.id}`}
                      className="font-mono text-xs text-accent hover:underline"
                    >
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-ink/50">
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 text-ink">{order.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-ink/70">{order.email}</td>
                  <td className="px-4 py-3 font-mono text-xs">
                    <span className={order.paymentMethod === "crypto" ? "text-accent" : "text-ink/50"}>
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-ink">
                    ${(order.totalPrice / 100).toFixed(2)}
                  </td>
                  <td className={`px-4 py-3 font-mono text-xs ${STATUS_COLORS[order.status] ?? ""}`}>
                    {order.status.replace(/_/g, " ")}
                  </td>
                </tr>
              ))}
              {allOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center font-mono text-xs text-ink/30">
                    No orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
