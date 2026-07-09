"use client";

import { useSession, signIn } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function UserIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="6.5" r="2.5" />
      <path d="M3.5 15c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
    </svg>
  );
}

export function AccountButton() {
  const { data: session, status } = useSession();
  const [open, setOpen]         = useState(false);
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const wrapperRef              = useRef<HTMLDivElement>(null);
  const emailRef                = useRef<HTMLInputElement>(null);
  const router                  = useRouter();

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus email field when popover opens
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => emailRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  function handleOpen() {
    setError("");
    setOpen((v) => !v);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!result || result.error) {
      setError("invalid");
      return;
    }

    setOpen(false);
    router.push("/account");
    router.refresh();
  }

  // ── Loading placeholder — prevents layout shift ────────────────────────────
  if (status === "loading") {
    return <div className="h-7 w-7" aria-hidden="true" />;
  }

  // ── Authenticated — simple link with accent dot ────────────────────────────
  if (session?.user) {
    return (
      <Link
        href="/account"
        aria-label="My account"
        className="relative flex h-7 w-7 items-center justify-center rounded text-secondary transition-colors hover:text-primary"
      >
        <UserIcon />
        <span className="pointer-events-none absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent" />
      </Link>
    );
  }

  // ── Not authenticated — icon button + popover ──────────────────────────────
  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={handleOpen}
        aria-label="Sign in"
        aria-expanded={open}
        aria-haspopup="dialog"
        className="flex h-7 w-7 items-center justify-center rounded text-secondary transition-colors hover:text-primary"
      >
        <UserIcon />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Sign in"
          className="absolute right-0 top-full mt-2 z-50 w-[272px] rounded-[2px] border border-border bg-card shadow-lg"
        >
          <div className="p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-4">
              Sign in
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                ref={emailRef}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full border border-border bg-page text-ink font-mono text-sm px-3 py-2.5 rounded-[2px] outline-none focus:border-ink"
              />

              <div className="flex flex-col gap-1">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full border border-border bg-page text-ink font-mono text-sm px-3 py-2.5 rounded-[2px] outline-none focus:border-ink"
                />
                <div className="flex justify-between items-center">
                  {error === "invalid" ? (
                    <p className="font-mono text-[10px] text-red-500 leading-tight">
                      Invalid email or password.
                    </p>
                  ) : (
                    <span />
                  )}
                  <Link
                    href="/auth/reset-password"
                    onClick={() => setOpen(false)}
                    className="font-mono text-[10px] text-secondary hover:text-ink ml-auto"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-ink text-page font-mono text-sm py-2.5 rounded-[2px] hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign in →"}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-border text-center">
              <Link
                href="/auth/register"
                onClick={() => setOpen(false)}
                className="font-mono text-[11px] text-secondary hover:text-ink"
              >
                Create account →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
