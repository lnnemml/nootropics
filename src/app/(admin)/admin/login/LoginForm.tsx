"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = null;

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input
        name="password"
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        autoFocus
        required
        className="border border-border bg-card text-ink font-mono text-sm px-4 py-3 rounded-[2px] outline-none focus:border-ink"
      />
      {state?.error && (
        <p className="font-mono text-xs text-red-500" role="alert">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="bg-ink text-page font-mono text-sm py-3 rounded-[2px] hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
