"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Sector, OwnershipType, Tag } from "@/types/company";
import { SECTOR_COLORS } from "@/types/company";

interface FilterChipsProps {
  sectors: Sector[];
  ownershipTypes: OwnershipType[];
  tags: Tag[];
  graduateOnly: boolean;
  showBookmarksOnly: boolean;
  onClearSector: (sector: Sector) => void;
  onClearOwnershipType: (type: OwnershipType) => void;
  onClearTag: (tag: Tag) => void;
  onSetGraduateOnly: (value: boolean) => void;
  onSetShowBookmarksOnly: (value: boolean) => void;
  onClearAll: () => void;
}

export function FilterChips({
  sectors,
  ownershipTypes,
  tags,
  graduateOnly,
  showBookmarksOnly,
  onClearSector,
  onClearOwnershipType,
  onClearTag,
  onSetGraduateOnly,
  onSetShowBookmarksOnly,
  onClearAll,
}: FilterChipsProps) {
  const hasFilters =
    sectors.length > 0 ||
    ownershipTypes.length > 0 ||
    tags.length > 0 ||
    graduateOnly ||
    showBookmarksOnly;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
        Active:
      </span>

      {sectors.map((sector) => (
        <button
          key={sector}
          onClick={() => onClearSector(sector)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-[var(--bg-elevated)] border border-border text-card-foreground hover:border-[var(--accent-primary)] transition-colors group"
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: SECTOR_COLORS[sector] }}
          />
          {sector}
          <X className="h-3 w-3 text-muted-foreground group-hover:text-[var(--accent-primary)]" />
        </button>
      ))}

      {ownershipTypes.map((type) => (
        <button
          key={type}
          onClick={() => onClearOwnershipType(type)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-[var(--bg-elevated)] border border-border text-card-foreground hover:border-[var(--accent-primary)] transition-colors group"
        >
          {type}
          <X className="h-3 w-3 text-muted-foreground group-hover:text-[var(--accent-primary)]" />
        </button>
      ))}

      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onClearTag(tag)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-[var(--bg-elevated)] border border-border text-card-foreground hover:border-[var(--accent-primary)] transition-colors group"
        >
          {tag}
          <X className="h-3 w-3 text-muted-foreground group-hover:text-[var(--accent-primary)]" />
        </button>
      ))}

      {graduateOnly && (
        <button
          onClick={() => onSetGraduateOnly(false)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/30 text-[var(--accent-glow)] hover:bg-[var(--accent-primary)]/30 transition-colors group"
        >
          Graduate Programs
          <X className="h-3 w-3" />
        </button>
      )}

      {showBookmarksOnly && (
        <button
          onClick={() => onSetShowBookmarksOnly(false)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 hover:bg-amber-500/30 transition-colors group"
        >
          Bookmarked
          <X className="h-3 w-3" />
        </button>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="h-7 text-xs text-muted-foreground hover:text-[var(--accent-primary)]"
      >
        Clear all
      </Button>
    </div>
  );
}
