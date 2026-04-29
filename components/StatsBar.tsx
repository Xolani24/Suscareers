"use client";

import { Building2, GraduationCap, Bookmark, Filter } from "lucide-react";
import type { Company } from "@/types/company";

interface StatsBarProps {
  filteredCount: number;
  totalCount: number;
  graduateProgramCount: number;
  bookmarkCount: number;
  activeFilterCount: number;
}

export function StatsBar({
  filteredCount,
  totalCount,
  graduateProgramCount,
  bookmarkCount,
  activeFilterCount,
}: StatsBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-border">
        <Building2 className="h-4 w-4 text-[var(--accent-primary)]" />
        <span className="text-card-foreground font-medium">{filteredCount}</span>
        <span className="text-muted-foreground">
          of {totalCount} companies
        </span>
      </div>

      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-border">
        <GraduationCap className="h-4 w-4 text-emerald-400" />
        <span className="text-card-foreground font-medium">
          {graduateProgramCount}
        </span>
        <span className="text-muted-foreground hidden sm:inline">
          with graduate programs
        </span>
      </div>

      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-border">
        <Bookmark className="h-4 w-4 text-amber-400" />
        <span className="text-card-foreground font-medium">{bookmarkCount}</span>
        <span className="text-muted-foreground hidden sm:inline">bookmarked</span>
      </div>

      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20">
          <Filter className="h-4 w-4 text-[var(--accent-primary)]" />
          <span className="text-[var(--accent-glow)] font-medium">
            {activeFilterCount}
          </span>
          <span className="text-[var(--accent-glow)]/80 hidden sm:inline">
            filters active
          </span>
        </div>
      )}
    </div>
  );
}
