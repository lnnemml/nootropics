"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function SessionRefresh() {
  const pathname = usePathname();
  const { update } = useSession();

  useEffect(() => {
    update();
  }, [pathname, update]);

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
