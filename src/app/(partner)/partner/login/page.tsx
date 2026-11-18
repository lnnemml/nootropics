import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { affiliatesEnabled } from "@/lib/affiliate/flag";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Partner sign in",
};

export default function PartnerLoginPage() {
  // Rendered alongside the layout, so without this the copy below reaches the layout's 404 in the
  // RSC payload.
  if (!affiliatesEnabled()) notFound();

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm border border-border rounded-[2px] bg-card p-8">
        <p className="font-mono text-xs text-accent uppercase tracking-widest mb-4">{"NORA Partners"}</p>
        <h1 className="mb-1 text-2xl font-semibold text-ink">{"Partner sign in"}</h1>
        <p className="mb-6 text-sm text-secondary">
          {"Enter your partner email and we will send you a sign-in link."}
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
