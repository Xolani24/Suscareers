"use client";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { CookieBanner } from "./CookieBanner";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import Script from "next/script";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const { showBanner, canUseAnalytics, acceptAll, declineNonEssential } =
    useCookieConsent();

  return (
    <>
      {/* Google Analytics - only loaded after consent */}
      {canUseAnalytics && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `}
          </Script>
        </>
      )}

      <div className="shadow-monarch-bg min-h-screen flex flex-col relative">
        {/* Background glow orbs */}
        <div className="glow-orb glow-orb-1 dark:block hidden" />
        <div className="glow-orb glow-orb-2 dark:block hidden" />
        <div className="glow-orb glow-orb-3 dark:block hidden" />

        <Header />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />

        {showBanner && (
          <CookieBanner onAccept={acceptAll} onDecline={declineNonEssential} />
        )}
      </div>
    </>
  );
}
