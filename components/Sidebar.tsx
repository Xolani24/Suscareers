"use client";

import { ChevronDown, GraduationCap, Bookmark, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Sector, OwnershipType, Tag } from "@/types/company";
import { SECTOR_COLORS } from "@/types/company";
import type { SortOption } from "@/hooks/useFilter";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarProps {
  filters: {
    sectors: Sector[];
    ownershipTypes: OwnershipType[];
    tags: Tag[];
    graduateOnly: boolean;
    showBookmarksOnly: boolean;
    sortBy: SortOption;
  };
  onToggleSector: (sector: Sector) => void;
  onToggleOwnershipType: (type: OwnershipType) => void;
  onToggleTag: (tag: Tag) => void;
  onSetGraduateOnly: (value: boolean) => void;
  onSetShowBookmarksOnly: (value: boolean) => void;
  onSetSortBy: (value: SortOption) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  bookmarkCount: number;
  isOpen?: boolean;
  onClose?: () => void;
}

const SECTORS: Sector[] = [
  "Water & Sanitation",
  "Energy",
  "Mining",
  "Consulting",
  "Government",
  "Logistics & Ports",
  "Manufacturing",
  "NGO & Conservation",
  "ESG & Sustainability",
  "Infrastructure & Engineering",
  "Financial Services",
  "Job Board",
];

const OWNERSHIP_TYPES: OwnershipType[] = [
  "State-Owned",
  "Private",
  "Public Entity",
  "NGO",
];

const COMMON_TAGS: Tag[] = [
  "Engineering",
  "Environmental",
  "Graduate Program",
  "Internship",
  "Experienced",
  "Renewables",
  "ESG",
  "Conservation",
  "Research",
  "Mining",
];

export function Sidebar({
  filters,
  onToggleSector,
  onToggleOwnershipType,
  onToggleTag,
  onSetGraduateOnly,
  onSetShowBookmarksOnly,
  onSetSortBy,
  onClearFilters,
  hasActiveFilters,
  bookmarkCount,
  isOpen = true,
  onClose,
}: SidebarProps) {
  const [sectorsOpen, setSectorsOpen] = useState(true);
  const [ownershipOpen, setOwnershipOpen] = useState(true);
  const [tagsOpen, setTagsOpen] = useState(false);

  return (
    <aside
      className={cn(
        "bg-card border-r border-border p-5 h-full overflow-y-auto",
        "lg:w-72 lg:shrink-0",
        "fixed lg:relative inset-0 z-50 lg:z-auto",
        "lg:translate-x-0 transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Mobile close button */}
      <div className="flex items-center justify-between mb-6 lg:hidden">
        <h2 className="text-lg font-semibold text-card-foreground">Filters</h2>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Header */}
      <div className="hidden lg:flex items-center justify-between mb-6">
        <h2 className="text-sm font-semibold text-card-foreground uppercase tracking-wider font-mono">
          Filters
        </h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-7 text-xs text-[var(--accent-primary)] hover:text-[var(--accent-glow)]"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Sort */}
      <div className="mb-6">
        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-mono mb-2 block">
          Sort by
        </Label>
        <Select value={filters.sortBy} onValueChange={(v) => onSetSortBy(v as SortOption)}>
          <SelectTrigger className="w-full bg-[var(--bg-elevated)] border-border">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured First</SelectItem>
            <SelectItem value="a-z">A - Z</SelectItem>
            <SelectItem value="z-a">Z - A</SelectItem>
            <SelectItem value="sector">By Sector</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quick Filters */}
      <div className="mb-6 space-y-3">
        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-mono block">
          Quick Filters
        </Label>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="graduate"
            checked={filters.graduateOnly}
            onCheckedChange={(checked) => onSetGraduateOnly(!!checked)}
          />
          <label
            htmlFor="graduate"
            className="flex items-center gap-2 text-sm text-card-foreground cursor-pointer"
          >
            <GraduationCap className="h-4 w-4 text-[var(--accent-primary)]" />
            Graduate Programs Only
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="bookmarks"
            checked={filters.showBookmarksOnly}
            onCheckedChange={(checked) => onSetShowBookmarksOnly(!!checked)}
          />
          <label
            htmlFor="bookmarks"
            className="flex items-center gap-2 text-sm text-card-foreground cursor-pointer"
          >
            <Bookmark className="h-4 w-4 text-[var(--accent-primary)]" />
            Bookmarked ({bookmarkCount})
          </label>
        </div>
      </div>

      {/* Sectors */}
      <Collapsible open={sectorsOpen} onOpenChange={setSectorsOpen} className="mb-4">
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-mono">
          Sectors
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              sectorsOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-2">
          {SECTORS.map((sector) => (
            <div key={sector} className="flex items-center space-x-2">
              <Checkbox
                id={`sector-${sector}`}
                checked={filters.sectors.includes(sector)}
                onCheckedChange={() => onToggleSector(sector)}
              />
              <label
                htmlFor={`sector-${sector}`}
                className="flex items-center gap-2 text-sm text-card-foreground cursor-pointer flex-1"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: SECTOR_COLORS[sector] }}
                />
                <span className="truncate">{sector}</span>
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Ownership Type */}
      <Collapsible open={ownershipOpen} onOpenChange={setOwnershipOpen} className="mb-4">
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-mono">
          Ownership
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              ownershipOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-2">
          {OWNERSHIP_TYPES.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`ownership-${type}`}
                checked={filters.ownershipTypes.includes(type)}
                onCheckedChange={() => onToggleOwnershipType(type)}
              />
              <label
                htmlFor={`ownership-${type}`}
                className="text-sm text-card-foreground cursor-pointer"
              >
                {type}
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Tags */}
      <Collapsible open={tagsOpen} onOpenChange={setTagsOpen} className="mb-4">
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-mono">
          Career Areas
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              tagsOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-2">
          {COMMON_TAGS.map((tag) => (
            <div key={tag} className="flex items-center space-x-2">
              <Checkbox
                id={`tag-${tag}`}
                checked={filters.tags.includes(tag)}
                onCheckedChange={() => onToggleTag(tag)}
              />
              <label
                htmlFor={`tag-${tag}`}
                className="text-sm text-card-foreground cursor-pointer"
              >
                {tag}
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Mobile clear button */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          className="w-full mt-4 lg:hidden border-border"
          onClick={onClearFilters}
        >
          Clear All Filters
        </Button>
      )}
    </aside>
  );
}
