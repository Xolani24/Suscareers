"use client";

import Link from "next/link";
import { Leaf, Mail, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[var(--accent-primary)] flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-card-foreground">SusCareers</span>
                <span className="text-xs text-muted-foreground block -mt-0.5">
                  Sustainability Talent Hub
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Where green careers begin. Connecting South African talent with sustainability opportunities.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>South Africa</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-[var(--accent-primary)] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="text-sm text-muted-foreground hover:text-[var(--accent-primary)] transition-colors"
                >
                  Careers Hub
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-[var(--accent-primary)] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-sm text-muted-foreground hover:text-[var(--accent-primary)] transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-[var(--accent-primary)] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Sectors */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4 text-sm uppercase tracking-wider">
              Key Sectors
            </h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Renewable Energy</li>
              <li className="text-sm text-muted-foreground">Water & Sanitation</li>
              <li className="text-sm text-muted-foreground">Environmental Consulting</li>
              <li className="text-sm text-muted-foreground">Mining & Resources</li>
              <li className="text-sm text-muted-foreground">ESG & Sustainability</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-4 text-sm uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-[var(--accent-primary)] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-[var(--accent-primary)] transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-sm text-muted-foreground hover:text-[var(--accent-primary)] transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
            <div className="mt-4">
              <Link
                href="/contact"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[var(--accent-primary)] transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>info@suscareers.co.za</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              &copy; {currentYear} SusCareers. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground text-center sm:text-right">
              SusCareers is an information platform and is not a registered recruitment agency.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
