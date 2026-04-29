"use client";

import { ExternalLink, Bookmark, GraduationCap, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Company } from "@/types/company";
import { SECTOR_COLORS, OWNERSHIP_COLORS } from "@/types/company";
import { cn } from "@/lib/utils";

interface CompanyCardProps {
  company: Company;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onClick: () => void;
  animationDelay?: number;
}

function CompanyLogo({
  company,
  size = "md",
}: {
  company: Company;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-lg",
  };

  const initials = company.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "relative rounded-lg overflow-hidden bg-[var(--bg-elevated)] flex items-center justify-center shrink-0",
        sizeClasses[size]
      )}
    >
      <img
        src={company.logo}
        alt={`${company.name} logo`}
        className="w-full h-full object-contain p-1"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          const fallback = target.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = "flex";
        }}
      />
      <div
        className="absolute inset-0 items-center justify-center font-semibold text-[var(--text-secondary)] hidden"
        style={{ backgroundColor: "var(--bg-elevated)" }}
      >
        {initials}
      </div>
    </div>
  );
}

export function CompanyCard({
  company,
  isBookmarked,
  onToggleBookmark,
  onClick,
  animationDelay = 0,
}: CompanyCardProps) {
  const sectorColor = SECTOR_COLORS[company.sector];
  const ownershipStyle = OWNERSHIP_COLORS[company.ownershipType];

  return (
    <article
      className="card-glow bg-card border border-border rounded-xl p-5 cursor-pointer animate-fade-slide-up relative group"
      style={{ animationDelay: `${animationDelay}ms` }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View details for ${company.name}`}
    >
      {/* Featured badge */}
      {company.featured && (
        <div className="absolute -top-px -right-px">
          <div className="bg-[var(--accent-primary)] text-white text-xs font-medium px-3 py-1 rounded-bl-lg rounded-tr-xl">
            Featured
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <CompanyLogo company={company} />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-card-foreground truncate pr-8 text-balance">
            {company.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: sectorColor }}
              aria-hidden="true"
            />
            <span className="text-sm text-muted-foreground truncate">
              {company.sector}
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 w-8 p-0 shrink-0 absolute top-4 right-4",
            isBookmarked && "text-[var(--accent-primary)]"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark();
          }}
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <Bookmark
            className={cn("h-4 w-4", isBookmarked && "fill-current")}
          />
        </Button>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
        <MapPin className="h-3.5 w-3.5 shrink-0" />
        <span className="truncate">{company.location}</span>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Badge
          variant="secondary"
          className={cn("text-xs font-medium", ownershipStyle.bg, ownershipStyle.text)}
        >
          {company.ownershipType}
        </Badge>
        {company.graduateProgram && (
          <Badge
            variant="secondary"
            className="text-xs font-medium bg-[var(--accent-primary)]/20 text-[var(--accent-glow)]"
          >
            <GraduationCap className="h-3 w-3 mr-1" />
            Graduate Program
          </Badge>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {company.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs rounded-md bg-[var(--bg-elevated)] text-muted-foreground"
          >
            {tag}
          </span>
        ))}
        {company.tags.length > 4 && (
          <span className="px-2 py-0.5 text-xs rounded-md bg-[var(--bg-elevated)] text-muted-foreground">
            +{company.tags.length - 4}
          </span>
        )}
      </div>

      {/* CTA */}
      <Button
        variant="default"
        size="sm"
        className="w-full bg-[var(--accent-primary)] hover:bg-[var(--accent-glow)] text-white"
        onClick={(e) => {
          e.stopPropagation();
          window.open(company.careersUrl, "_blank", "noopener,noreferrer");
        }}
        data-track="visit-careers-portal"
      >
        <ExternalLink className="h-4 w-4 mr-2" />
        Visit Careers Portal
      </Button>
    </article>
  );
}

export { CompanyLogo };
