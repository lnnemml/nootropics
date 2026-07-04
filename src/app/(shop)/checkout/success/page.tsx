import { Container } from "@/components/layout/Container";
import Link from "next/link";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; order?: string }>;
}) {
  const { ref, order } = await searchParams;

  return (
    <main className="py-24">
      <Container>
        <div className="max-w-[560px]">
          <p className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
            Order received
          </p>
          <h1 className="font-display text-[clamp(32px,4vw,48px)] font-semibold text-ink mb-6 leading-tight">
            {"You're confirmed."}
          </h1>
          <p className="text-ink/70 mb-4">
            {"We'll be in touch within one business day to arrange payment. Check your inbox for a confirmation email."}
          </p>
          {order && (
            <p className="font-mono text-sm text-ink mb-2">
              Order <span className="text-accent">{order}</span>
            </p>
          )}
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
        </div>
      </Container>
    </main>
  );
}
