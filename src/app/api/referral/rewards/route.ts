import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { discountLedger } from "@/lib/db/schema";
import { customerAuth } from "@/lib/customer-auth";
import { and, eq } from "drizzle-orm";

// GET /api/referral/rewards
// Returns available discount_ledger entries for the logged-in customer.
// No auth → empty list (guests can't have rewards).
export async function GET() {
  const session = await customerAuth();
  if (!session?.user?.id) {
    return NextResponse.json({ rewards: [] });
  }

  const rewards = await db
    .select({
      id:          discountLedger.id,
      discountPct: discountLedger.discountPct,
      source:      discountLedger.source,
    })
    .from(discountLedger)
    .where(
      and(
        eq(discountLedger.userId, session.user.id),
        eq(discountLedger.status, "available")
      )
    );

  return NextResponse.json({ rewards });
}
