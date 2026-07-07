import { customerSignIn } from "@/lib/customer-auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const { callbackUrl, error } = await searchParams;

  async function handleSignIn(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const redirectTo = (formData.get("callbackUrl") as string) || "/account";
    try {
      await customerSignIn("resend", { email, redirectTo });
    } catch (err) {
      if (err instanceof AuthError) {
        redirect(
          `/auth/signin?error=send_failed&callbackUrl=${encodeURIComponent(redirectTo)}`
        );
      }
      throw err; // NEXT_REDIRECT is a throw — must re-throw
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-page">
      <div className="w-full max-w-[360px] px-6">
        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">
          NORA
        </p>
        <h1 className="text-2xl font-semibold text-ink mb-1 tracking-tight">
          Sign in
        </h1>
        <p className="text-sm text-secondary mb-8">
          Enter your email — we&apos;ll send you a sign-in link.
        </p>
        <form action={handleSignIn} className="flex flex-col gap-4">
          <input type="hidden" name="callbackUrl" value={callbackUrl ?? "/account"} />
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            autoComplete="email"
            className="border border-border bg-card text-ink font-mono text-sm px-4 py-3 rounded-[2px] outline-none focus:border-ink"
          />
          {error && (
            <p className="font-mono text-xs text-red-500">
              {error === "send_failed"
                ? "Failed to send email — try again."
                : "Something went wrong — try again."}
            </p>
          )}
          <button
            type="submit"
            className="bg-ink text-page font-mono text-sm py-3 rounded-[2px] hover:opacity-90 transition-opacity"
          >
            Send sign-in link →
          </button>
        </form>
      </div>
    </main>
  );
}
