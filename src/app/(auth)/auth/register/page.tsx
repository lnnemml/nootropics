import { registerCustomer } from "@/app/actions/customerAuth";
import Link from "next/link";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center bg-page">
      <div className="w-full max-w-[360px] px-6">
        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-2">
          NORA
        </p>
        <h1 className="text-2xl font-semibold text-ink mb-1 tracking-tight">
          Create account
        </h1>
        <p className="text-sm text-secondary mb-8">
          Already have one?{" "}
          <Link href="/auth/signin" className="text-ink underline underline-offset-2">
            Sign in
          </Link>
        </p>
        <form action={registerCustomer} className="flex flex-col gap-4">
          <input
            name="name" type="text" placeholder="Name (optional)"
            autoComplete="name"
            className="border border-border bg-card text-ink font-mono text-sm px-4 py-3 rounded-[2px] outline-none focus:border-ink"
          />
          <input
            name="email" type="email" placeholder="Email"
            required autoComplete="email"
            className="border border-border bg-card text-ink font-mono text-sm px-4 py-3 rounded-[2px] outline-none focus:border-ink"
          />
          <input
            name="password" type="password" placeholder="Password (8+ characters)"
            required autoComplete="new-password"
            className="border border-border bg-card text-ink font-mono text-sm px-4 py-3 rounded-[2px] outline-none focus:border-ink"
          />
          <input
            name="confirm" type="password" placeholder="Confirm password"
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
            Create account →
          </button>
        </form>
      </div>
    </main>
  );
}
