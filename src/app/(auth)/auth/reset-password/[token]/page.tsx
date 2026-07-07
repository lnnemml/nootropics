import { resetPassword } from "@/app/actions/customerAuth";
import { redirect } from "next/navigation";

export default async function ResetPasswordTokenPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { token } = await params;
  const { error } = await searchParams;

  async function handleReset(formData: FormData) {
    "use server";
    const result = await resetPassword(token, formData);
    if (result?.error) {
      redirect(
        `/auth/reset-password/${token}?error=${encodeURIComponent(result.error)}`
      );
    }
    // resetPassword calls customerSignIn which throws NEXT_REDIRECT — propagates here
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-page">
      <div className="w-full max-w-[360px] px-6">
        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">NORA</p>
        <h1 className="text-2xl font-semibold text-ink mb-1 tracking-tight">New password</h1>
        <p className="text-sm text-secondary mb-8">Choose a password — at least 8 characters.</p>
        <form action={handleReset} className="flex flex-col gap-4">
          <input
            name="password" type="password" placeholder="New password"
            required autoComplete="new-password"
            className="border border-border bg-card text-ink font-mono text-sm px-4 py-3 rounded-[2px] outline-none focus:border-ink"
          />
          <input
            name="confirm" type="password" placeholder="Confirm new password"
            required autoComplete="new-password"
            className="border border-border bg-card text-ink font-mono text-sm px-4 py-3 rounded-[2px] outline-none focus:border-ink"
          />
          {error && (
            <p className="font-mono text-xs text-red-500">{decodeURIComponent(error)}</p>
          )}
          <button
            type="submit"
            className="bg-ink text-page font-mono text-sm py-3 rounded-[2px] hover:opacity-90 transition-opacity"
          >
            Set new password →
          </button>
        </form>
      </div>
    </main>
  );
}
