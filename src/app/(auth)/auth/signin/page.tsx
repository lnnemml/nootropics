import { customerSignIn } from "@/lib/customer-auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const { callbackUrl, error } = await searchParams;

  async function handleSignIn(formData: FormData) {
    "use server";
    const redirectTo = (formData.get("callbackUrl") as string) || "/account";
    try {
      await customerSignIn("credentials", {
        email:    formData.get("email"),
        password: formData.get("password"),
        redirectTo,
      });
    } catch (err) {
      if (err instanceof AuthError) {
        redirect(
          `/auth/signin?error=invalid&callbackUrl=${encodeURIComponent(redirectTo)}`
        );
      }
      throw err; // NEXT_REDIRECT must be re-thrown
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
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-ink underline underline-offset-2">
            Create one
          </Link>
        </p>
        <form action={handleSignIn} className="flex flex-col gap-4">
          <input type="hidden" name="callbackUrl" value={callbackUrl ?? "/account"} />
          <input
            name="email" type="email" placeholder="Email"
            required autoComplete="email"
            className="border border-border bg-card text-ink font-mono text-sm px-4 py-3 rounded-[2px] outline-none focus:border-ink"
          />
          <div className="flex flex-col gap-1">
            <input
              name="password" type="password" placeholder="Password"
              required autoComplete="current-password"
              className="border border-border bg-card text-ink font-mono text-sm px-4 py-3 rounded-[2px] outline-none focus:border-ink"
            />
            <div className="flex justify-end">
              <Link href="/auth/reset-password" className="font-mono text-xs text-secondary hover:text-ink">
                Forgot password?
              </Link>
            </div>
          </div>
          {error === "invalid" && (
            <p className="font-mono text-xs text-red-500">Invalid email or password.</p>
          )}
          {error === "exists" && (
            <p className="font-mono text-xs text-secondary">
              An account with that email already exists — sign in below.
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
