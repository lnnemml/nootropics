"use client";

import { useActionState } from "react";
import { requestPartnerLoginLink, type PartnerLoginState } from "./actions";

const initialState: PartnerLoginState = null;

export function LoginForm() {
  const [state, formAction, pending] = useActionState(requestPartnerLoginLink, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-secondary">{"Email"}</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          autoFocus
          required
          className="border border-border rounded-[2px] bg-page px-3 py-2.5 font-sans text-[14px] text-ink focus:outline-none focus:border-accent transition-colors"
        />
      </label>

      {state ? (
        <p className="text-sm text-secondary" role="status">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-[2px] bg-ink px-6 py-3 font-sans text-[15px] font-medium text-page transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {pending ? "Sending…" : "Email me a sign-in link"}
      </button>
    </form>
  );
}
