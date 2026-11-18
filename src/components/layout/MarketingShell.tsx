"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import UTMCapture from "@/components/UTMCapture";

export function MarketingShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isStandalone = isAdmin || pathname.startsWith("/go") || pathname.startsWith("/partner");

  return (
    <>
      {/* /go is where paid traffic lands, so it needs UTM + ?ref capture even without the nav */}
      {!isAdmin && (
        <Suspense fallback={null}>
          <UTMCapture />
        </Suspense>
      )}
      {!isStandalone && <NavBar />}
      <main className="flex-1">{children}</main>
      {!isStandalone && <Footer />}
    </>
  );
}
