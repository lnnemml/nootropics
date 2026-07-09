"use client";

import { useSession } from "next-auth/react";
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

  // Invisible placeholder during SSR/loading — no layout shift
  if (status === "loading") {
    return <div className="h-7 w-7" aria-hidden="true" />;
  }

  if (session?.user) {
    return (
      <Link
        href="/account"
        aria-label="My account"
        className="relative flex h-7 w-7 items-center justify-center rounded text-secondary transition-colors hover:text-primary"
      >
        <UserIcon />
        {/* Accent dot — indicates active session */}
        <span className="pointer-events-none absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent" />
      </Link>
    );
  }

  return (
    <Link
      href="/auth/signin"
      aria-label="Sign in"
      className="flex h-7 w-7 items-center justify-center rounded text-secondary transition-colors hover:text-primary"
    >
      <UserIcon />
    </Link>
  );
}
