"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import UTMCapture from "@/components/UTMCapture";

export function MarketingShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && (
        <>
          <Suspense fallback={null}>
            <UTMCapture />
          </Suspense>
          <NavBar />
        </>
      )}
      <main className="flex-1">{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}
