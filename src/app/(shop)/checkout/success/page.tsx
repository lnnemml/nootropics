import { customerAuth } from "@/lib/customer-auth";
import { Container } from "@/components/layout/Container";
import Link from "next/link";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; order?: string; method?: string }>;
}) {
  const { ref, order, method } = await searchParams;
  const isCrypto = method === "crypto";
  const session  = await customerAuth();

  return (
    <main className="py-24">
      <Container>
        <div className="max-w-[560px]">
          <p className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
            {isCrypto ? "Payment submitted" : "Order received"}
          </p>
          <h1 className="font-display text-[clamp(32px,4vw,48px)] font-semibold text-ink mb-6 leading-tight">
            {"You're all set."}
          </h1>
          {order && (
            <p className="font-mono text-sm text-ink mb-4">
              Order <span className="text-accent">{order}</span>
            </p>
          )}
          <p className="text-ink/70 mb-4">
            {isCrypto
              ? "Your crypto payment has been submitted. Once confirmed on the blockchain (usually 10–30 minutes), we'll ship your order within 24 hours and email you a tracking number."
              : "We'll be in touch within one business day to arrange payment. Check your inbox for a confirmation email."}
          </p>
          {ref && (
            <p className="font-mono text-xs text-ink/40 mb-8">
              Order ref: {ref}
            </p>
          )}
          <Link
            href="/"
            className="font-mono text-sm text-accent hover:text-ink transition-colors"
          >
            ← Back to home
          </Link>

          {/* ── Account upsell — only when not signed in ──────────────── */}
          {!session?.user && (
            <div className="mt-12 border border-border rounded-[2px] p-6 bg-card">
              <p className="font-mono text-[10px] text-ink/40 uppercase tracking-widest mb-3">
                Track your order
              </p>
              <p className="text-sm text-secondary mb-4 leading-relaxed">
                Create a free account to track order status, view history, and
                speed up future checkouts.
              </p>
              <Link
                href="/auth/register"
                className="inline-block bg-ink text-page font-mono text-sm py-2.5 px-5 rounded-[2px] hover:opacity-90 transition-opacity"
              >
                Create account →
              </Link>
            </div>
          )}

          {/* ── Signed-in — link to account ───────────────────────────── */}
          {session?.user && (
            <div className="mt-12">
              <Link
                href="/account/orders"
                className="font-mono text-sm text-accent hover:text-ink transition-colors"
              >
                View in my orders →
              </Link>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
