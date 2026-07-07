import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  async function handleLogin(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: "/admin",
      });
    } catch (err) {
      if (err instanceof AuthError) {
        redirect("/admin/login?error=invalid");
      }
      throw err;
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-page">
      <div className="w-full max-w-[360px] px-6">
        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-6">
          NORA Admin
        </p>
        <form action={handleLogin} className="flex flex-col gap-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="border border-border bg-card text-ink font-mono text-sm px-4 py-3 rounded-[2px] outline-none focus:border-ink"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="border border-border bg-card text-ink font-mono text-sm px-4 py-3 rounded-[2px] outline-none focus:border-ink"
          />
          {error && (
            <p className="font-mono text-xs text-red-500">Invalid credentials</p>
          )}
          <button
            type="submit"
            className="bg-ink text-page font-mono text-sm py-3 rounded-[2px] hover:opacity-90 transition-opacity"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
