import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { CustomerSessionProvider } from "@/components/auth/CustomerSessionProvider";
import { GoogleTagManagerScript, GoogleTagManagerNoscript } from "@/components/analytics/GoogleTagManager";
import { ClarityScript } from "@/components/analytics/ClarityScript";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "NORA — Nootropics Research Alliance",
  description: "Evidence-based nootropics, built for builders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-page text-primary">
        <GoogleTagManagerNoscript />
        {/* Runs synchronously before body renders — prevents dark-mode flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        <CustomerSessionProvider>
          <MarketingShell>{children}</MarketingShell>
        </CustomerSessionProvider>
        <GoogleTagManagerScript />
        <ClarityScript />
        <MetaPixel />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
