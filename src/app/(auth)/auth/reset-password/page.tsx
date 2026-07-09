import { requestPasswordReset } from "@/app/actions/customerAuth";
import Link from "next/link";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const { sent } = await searchParams;

  async function handleRequest(formData: FormData) {
    "use server";
    await requestPasswordReset(formData);
  }

  if (sent) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-page">
        <div className="w-full max-w-[360px] px-6 text-center">
          <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">NORA</p>
          <h1 className="text-2xl font-semibold text-ink mb-3 tracking-tight">Check your email</h1>
          <p className="text-sm text-secondary leading-relaxed">
            If an account exists for that address, a password reset link was sent.
            The link expires in 1 hour.
          </p>
          <Link href="/auth/signin" className="block mt-6 font-mono text-xs text-secondary hover:text-ink">
            ← Back to sign in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-page">
      <div className="w-full max-w-[360px] px-6">
        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">NORA</p>
        <h1 className="text-2xl font-semibold text-ink mb-1 tracking-tight">Reset password</h1>
        <p className="text-sm text-secondary mb-8">
          Enter your account email — we&apos;ll send a reset link.
        </p>
        <form action={handleRequest} className="flex flex-col gap-4">
          <input
            name="email" type="email" placeholder="Email"
            required autoComplete="email"
            className="border border-border bg-card text-ink font-mono text-sm px-4 py-3 rounded-[2px] outline-none focus:border-ink"
          />
          <button
            type="submit"
            className="bg-ink text-page font-mono text-sm py-3 rounded-[2px] hover:opacity-90 transition-opacity"
          >
            Send reset link →
          </button>
        </form>
        <Link href="/auth/signin" className="block mt-4 font-mono text-xs text-secondary hover:text-ink">
          ← Back to sign in
        </Link>
      </div>
    </main>
  );
}
