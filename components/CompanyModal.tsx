"use client";

import { ExternalLink, Bookmark, GraduationCap, MapPin, Building2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Company } from "@/types/company";
import { SECTOR_COLORS, OWNERSHIP_COLORS } from "@/types/company";
import { cn } from "@/lib/utils";
import { CompanyLogo } from "./CompanyCard";

interface CompanyModalProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export function CompanyModal({
  company,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
}: CompanyModalProps) {
  if (!company) return null;

  const sectorColor = SECTOR_COLORS[company.sector];
  const ownershipStyle = OWNERSHIP_COLORS[company.ownershipType];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-card border-border p-0 overflow-hidden">
        {/* Header gradient */}
        <div
          className="h-2 w-full"
          style={{
            background: `linear-gradient(90deg, ${sectorColor} 0%, var(--accent-purple) 100%)`,
          }}
        />

        <div className="p-6">
          <DialogHeader className="mb-6">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-[var(--bg-elevated)] flex items-center justify-center shrink-0">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="w-full h-full object-contain p-2"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div
                  className="absolute inset-0 items-center justify-center font-bold text-xl text-[var(--text-secondary)] hidden"
                  style={{ backgroundColor: "var(--bg-elevated)" }}
                >
                  {company.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-xl font-bold text-card-foreground mb-2 text-balance">
                  {company.name}
                </DialogTitle>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: sectorColor }}
                    aria-hidden="true"
                  />
                  <span className="text-sm text-muted-foreground">
                    {company.sector}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>{company.location}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-10 w-10 p-0 shrink-0",
                  isBookmarked && "text-[var(--accent-primary)]"
                )}
                onClick={onToggleBookmark}
                aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                <Bookmark
                  className={cn("h-5 w-5", isBookmarked && "fill-current")}
                />
              </Button>
            </div>
          </DialogHeader>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Badge
              variant="secondary"
              className={cn(
                "text-sm font-medium px-3 py-1",
                ownershipStyle.bg,
                ownershipStyle.text
              )}
            >
              <Building2 className="h-3.5 w-3.5 mr-1.5" />
              {company.ownershipType}
            </Badge>
            {company.graduateProgram && (
              <Badge
                variant="secondary"
                className="text-sm font-medium px-3 py-1 bg-[var(--accent-primary)]/20 text-[var(--accent-glow)]"
              >
                <GraduationCap className="h-3.5 w-3.5 mr-1.5" />
                Graduate Program Available
              </Badge>
            )}
            {company.featured && (
              <Badge
                variant="secondary"
                className="text-sm font-medium px-3 py-1 bg-amber-500/20 text-amber-400"
              >
                Featured Employer
              </Badge>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-card-foreground mb-2 uppercase tracking-wide font-mono">
              About
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              {company.description}
            </p>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-card-foreground mb-3 uppercase tracking-wide font-mono">
              Career Areas
            </h4>
            <div className="flex flex-wrap gap-2">
              {company.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-sm rounded-lg bg-[var(--bg-elevated)] text-muted-foreground border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="default"
              size="lg"
              className="flex-1 bg-[var(--accent-primary)] hover:bg-[var(--accent-glow)] text-white"
              onClick={() => {
                window.open(company.careersUrl, "_blank", "noopener,noreferrer");
              }}
              data-track="modal-visit-careers"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Careers Page
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-border hover:bg-[var(--bg-elevated)]"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
