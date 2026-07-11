import { customerAuth } from "@/lib/customer-auth";
import { db } from "@/lib/db";
import { referralCodes, referrals, discountLedger, orders } from "@/lib/db/schema";
import { and, desc, eq, inArray } from "drizzle-orm";
import { Container } from "@/components/layout/Container";
import CopyButton from "@/components/ui/CopyButton";
import { STATUS_LABELS } from "@/lib/order-status";
import Link from "next/link";

const BASE_URL = "https://www.noraalliance.com";

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return "***";
  return `${local[0]}***@${domain}`;
}

export default async function ReferralsPage() {
  const session = await customerAuth();
  const userId = session!.user.id!;

  const [code] = await db
    .select()
    .from(referralCodes)
    .where(eq(referralCodes.userId, userId))
    .limit(1);

  const rawReferrals = code
    ? await db
        .select({
          id:               referrals.id,
          referredEmail:    referrals.referredEmail,
          referrerRewardId: referrals.referrerRewardId,
          createdAt:        referrals.createdAt,
          orderStatus:      orders.status,
        })
        .from(referrals)
        .leftJoin(orders, eq(referrals.referredOrderId, orders.id))
        .where(eq(referrals.referralCodeId, code.id))
        .orderBy(desc(referrals.createdAt))
    : [];

  const rewardIds = rawReferrals
    .map((r) => r.referrerRewardId)
    .filter((id): id is string => id !== null);

  const rewardStatusRows = rewardIds.length > 0
    ? await db
        .select({ id: discountLedger.id, status: discountLedger.status })
        .from(discountLedger)
        .where(inArray(discountLedger.id, rewardIds))
    : [];

  const rewardStatusMap = new Map(rewardStatusRows.map((r) => [r.id, r.status]));

  const availableRewards = await db
    .select({ id: discountLedger.id, discountPct: discountLedger.discountPct })
    .from(discountLedger)
    .where(and(eq(discountLedger.userId, userId), eq(discountLedger.status, "available")));

  const shareUrl = code ? `${BASE_URL}/?ref=${code.code}` : null;

  return (
    <Container className="py-12 md:py-16">
      <div className="mb-10">
        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-1">
          Referrals
        </p>
        <h1 className="text-2xl font-semibold text-ink tracking-tight">
          Refer friends, earn rewards
        </h1>
      </div>

      <div className="flex flex-col gap-8">

        {/* Referral code card */}
        {code ? (
          <div className="border border-border rounded-[2px] p-6 bg-card">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-secondary mb-4">
              Your referral code
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-2xl font-medium text-accent">
                  {code.code}
                </span>
                <CopyButton text={code.code} label="Copy code" />
              </div>
              {shareUrl && (
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-[12px] text-secondary break-all">
                    {shareUrl}
                  </span>
                  <CopyButton text={shareUrl} label="Copy link" />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="border border-border rounded-[2px] px-5 py-8 text-center">
            <p className="font-mono text-xs text-ink/30">
              No referral code yet — sign out and back in to generate yours.
            </p>
          </div>
        )}

        {/* How it works */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-secondary mb-4">
            How it works
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              "Share your link with friends",
              "They get 10% off their first order",
              "You get 10% off your next order when they buy",
            ].map((text, i) => (
              <div key={i} className="border border-border rounded-[2px] p-4">
                <p className="font-mono text-[10px] text-accent mb-2">0{i + 1}</p>
                <p className="font-sans text-[14px] text-primary">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Available rewards */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-secondary mb-4">
            Your rewards
          </p>
          {availableRewards.length === 0 ? (
            <div className="border border-border rounded-[2px] px-5 py-8 text-center">
              <p className="font-mono text-xs text-ink/30">
                Refer a friend to earn rewards.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {availableRewards.map((reward) => (
                <div
                  key={reward.id}
                  className="border border-border rounded-[2px] px-4 py-3 flex items-center justify-between"
                >
                  <p className="font-sans text-[14px] text-primary">
                    {reward.discountPct}% off your next order
                  </p>
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em] px-1.5 py-0.5 rounded-[2px] bg-accent/10 text-accent">
                    Available
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Referral history */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-secondary mb-4">
            Referral history
          </p>
          {rawReferrals.length === 0 ? (
            <div className="border border-border rounded-[2px] px-5 py-8 text-center">
              <p className="font-mono text-xs text-ink/30">
                No referrals yet. Share your link to get started.
              </p>
            </div>
          ) : (
            <div className="border border-border rounded-[2px] overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-card border-b border-border">
                  <tr>
                    {["Date", "Email", "Order status", "Reward"].map((h) => (
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
                  {rawReferrals.map((referral) => {
                    const rewardStatus = referral.referrerRewardId
                      ? rewardStatusMap.get(referral.referrerRewardId)
                      : null;
                    return (
                      <tr
                        key={referral.id}
                        className="border-b border-border last:border-0"
                      >
                        <td className="px-4 py-3 font-mono text-xs text-ink/50">
                          {new Date(referral.createdAt).toLocaleDateString("en-GB", {
                            day:   "2-digit",
                            month: "short",
                            year:  "numeric",
                          })}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-ink/70">
                          {maskEmail(referral.referredEmail)}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-ink/50">
                          {referral.orderStatus
                            ? (STATUS_LABELS[referral.orderStatus] ?? referral.orderStatus)
                            : "—"}
                        </td>
                        <td className="px-4 py-3">
                          {rewardStatus === "available" && (
                            <span className="font-mono text-[9px] uppercase tracking-[0.1em] px-1.5 py-0.5 rounded-[2px] bg-accent/10 text-accent">
                              Available
                            </span>
                          )}
                          {rewardStatus === "redeemed" && (
                            <span className="font-mono text-[9px] uppercase tracking-[0.1em] px-1.5 py-0.5 rounded-[2px] bg-raised text-secondary border border-border">
                              Redeemed
                            </span>
                          )}
                          {!rewardStatus && (
                            <span className="font-mono text-xs text-ink/30">{"—"}</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div>
          <Link
            href="/account"
            className="font-mono text-xs text-ink/40 hover:text-ink transition-colors"
          >
            {"← Back to account"}
          </Link>
        </div>
      </div>
    </Container>
  );
}
