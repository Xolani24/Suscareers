"use client";

import { useState, useEffect, useCallback } from "react";

const CONSENT_KEY = "suscareers-cookie-consent";

type ConsentStatus = "pending" | "accepted" | "declined";

interface CookieConsent {
  analytics: boolean;
  functional: boolean;
  timestamp: number;
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [status, setStatus] = useState<ConsentStatus>("pending");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load consent from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CookieConsent;
        setConsent(parsed);
        setStatus(parsed.analytics ? "accepted" : "declined");
      }
    } catch (error) {
      console.error("Failed to load cookie consent:", error);
    }
    setIsLoaded(true);
  }, []);

  const acceptAll = useCallback(() => {
    const newConsent: CookieConsent = {
      analytics: true,
      functional: true,
      timestamp: Date.now(),
    };
    setConsent(newConsent);
    setStatus("accepted");
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent));
    } catch (error) {
      console.error("Failed to save cookie consent:", error);
    }
  }, []);

  const declineNonEssential = useCallback(() => {
    const newConsent: CookieConsent = {
      analytics: false,
      functional: true,
      timestamp: Date.now(),
    };
    setConsent(newConsent);
    setStatus("declined");
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent));
    } catch (error) {
      console.error("Failed to save cookie consent:", error);
    }
  }, []);

  const resetConsent = useCallback(() => {
    setConsent(null);
    setStatus("pending");
    try {
      localStorage.removeItem(CONSENT_KEY);
    } catch (error) {
      console.error("Failed to reset cookie consent:", error);
    }
  }, []);

  return {
    consent,
    status,
    isLoaded,
    showBanner: isLoaded && status === "pending",
    canUseAnalytics: consent?.analytics ?? false,
    acceptAll,
    declineNonEssential,
    resetConsent,
  };
}
