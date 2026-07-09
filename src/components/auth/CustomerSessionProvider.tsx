"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

function SessionRefresh() {
  const pathname = usePathname();
  const { update } = useSession();
  const updateRef = useRef(update);
  updateRef.current = update;

  useEffect(() => {
    updateRef.current();
  }, [pathname]);

  return null;
}

export function CustomerSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider basePath="/api/auth/customer">
      <SessionRefresh />
      {children}
    </SessionProvider>
  );
}
