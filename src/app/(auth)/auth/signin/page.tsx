import { customerSignIn } from "@/lib/customer-auth";
import { resendVerificationEmail } from "@/app/actions/customerAuth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{
    callbackUrl?: string;
    error?: string;
    email?: string;
    registered?: string;
    verified?: string;
    reset?: string;
  }>;
}) {
  const { callbackUrl, error, email: emailParam, registered, verified, reset } =
    await searchParams;

  async function handleSignIn(formData: FormData) {
    "use server";
    const email      = (formData.get("email") as string)?.toLowerCase();
    const password   = formData.get("password") as string;
    const redirectTo = (formData.get("callbackUrl") as string) || "/account";

    // Pre-check: unverified email — give a helpful message
    const user = await db.query.users.findFirst({ where: eq(users.email, email) });
    if (user && user.passwordHash && !user.emailVerified) {
      redirect(
        `/auth/signin?error=EMAIL_NOT_VERIFIED&email=${encodeURIComponent(email)}&callbackUrl=${encodeURIComponent(redirectTo)}`
      );
    }

    try {
      await customerSignIn("credentials", { email, password, redirectTo });
    } catch (err) {
      if (err instanceof AuthError) {
        redirect(
          `/auth/signin?error=invalid&callbackUrl=${encodeURIComponent(redirectTo)}`
        );
      }
      throw err;
    }
  }

  // ── Status banners ─────────────────────────────────────────────────────────

  let banner: { type: "info" | "success" | "error"; message: string } | null = null;

  if (registered === "1") {
    banner = {
      type: "info",
      message: "Account created. Check your inbox to verify your email before signing in.",
    };
  } else if (verified === "1") {
    banner = { type: "success", message: "Email verified. Sign in below." };
  } else if (reset === "1") {
    banner = { type: "success", message: "Password updated. Sign in with your new password." };
  } else if (error === "exists") {
    banner = {
      type: "info",
      message: "An account with this email already exists. Sign in below.",
    };
  } else if (error === "invalid_token") {
    banner = { type: "error", message: "This verification link is invalid." };
  } else if (error === "expired_token") {
    banner = {
      type: "error",
      message: "This verification link has expired. Request a new one below.",
    };
  }

  const bannerClass =
    banner?.type === "success"
      ? "bg-accent/10 text-accent border border-accent/20"
      : banner?.type === "error"
      ? "bg-red-50 text-red-600 border border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-900"
      : "bg-card border border-border text-secondary";

  return (
    <main className="min-h-screen flex items-center justify-center bg-page">
      <div className="w-full max-w-[360px] px-6">
        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">
          NORA
        </p>
        <h1 className="text-2xl font-semibold text-ink mb-1 tracking-tight">
          Sign in
        </h1>
        <p className="text-sm text-secondary mb-6">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-ink underline underline-offset-2">
            Create one
          </Link>
        </p>

        {/* Status banner */}
        {banner && (
          <p className={`font-mono text-xs px-3 py-2.5 rounded-[2px] mb-5 leading-relaxed ${bannerClass}`}>
            {banner.message}
          </p>
        )}

        {/* Unverified email — resend form */}
        {error === "EMAIL_NOT_VERIFIED" && (
          <div className="mb-5 p-3 border border-border rounded-[2px] bg-card">
            <p className="font-mono text-xs text-secondary mb-3 leading-relaxed">
              Please verify your email before signing in. Didn&apos;t receive it?
            </p>
            <form action={resendVerificationEmail}>
              <input type="hidden" name="email" value={emailParam ?? ""} />
              <button
                type="submit"
                className="font-mono text-xs text-accent underline underline-offset-2"
              >
                Resend verification email →
              </button>
            </form>
          </div>
        )}

        {/* Sign-in form */}
        <form action={handleSignIn} className="flex flex-col gap-4">
          <input
            type="hidden"
            name="callbackUrl"
            value={callbackUrl ?? "/account"}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            defaultValue={emailParam ?? ""}
            required
            autoComplete="email"
            className="border border-border bg-card text-ink font-mono text-sm px-4 py-3 rounded-[2px] outline-none focus:border-ink"
          />
          <div className="flex flex-col gap-1">
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              autoComplete="current-password"
              className="border border-border bg-card text-ink font-mono text-sm px-4 py-3 rounded-[2px] outline-none focus:border-ink"
            />
            <div className="flex justify-end">
              <Link
                href="/auth/reset-password"
                className="font-mono text-xs text-secondary hover:text-ink"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          {error === "invalid" && (
            <p className="font-mono text-xs text-red-500">
              Invalid email or password.
            </p>
          )}
          <button
            type="submit"
            className="bg-ink text-page font-mono text-sm py-3 rounded-[2px] hover:opacity-90 transition-opacity"
          >
            Sign in →
          </button>
        </form>
      </div>
    </main>
  );
}
