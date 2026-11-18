import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-page">
      <div className="w-full max-w-[360px] px-6">
        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-6">
          {"NORA Admin"}
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
