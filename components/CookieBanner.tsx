"use client";

import { Cookie, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CookieBannerProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function CookieBanner({ onAccept, onDecline }: CookieBannerProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="cookie-banner rounded-xl border border-border p-5 shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center">
                <Cookie className="h-5 w-5 text-[var(--accent-primary)]" />
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-card-foreground mb-1">
                Cookie Preferences
              </h3>
              <p className="text-sm text-muted-foreground">
                We use cookies to enhance your experience. Essential cookies are always active.
                Analytics cookies help us improve our platform.{" "}
                <Link
                  href="/privacy"
                  className="text-[var(--accent-primary)] hover:underline"
                >
                  Learn more
                </Link>
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={onDecline}
                className="flex-1 sm:flex-none border-border hover:bg-[var(--bg-elevated)]"
              >
                Essential Only
              </Button>
              <Button
                size="sm"
                onClick={onAccept}
                className="flex-1 sm:flex-none bg-[var(--accent-primary)] hover:bg-[var(--accent-glow)] text-white"
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
