"use client";

import { SessionProvider } from "next-auth/react";

export function CustomerSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider basePath="/api/auth/customer">
      {children}
    </SessionProvider>
  );
}
