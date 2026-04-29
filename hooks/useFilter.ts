"use client";

import { useState, useMemo, useCallback } from "react";
import type { Company, Sector, OwnershipType, Tag } from "@/types/company";

export type SortOption = "a-z" | "z-a" | "sector" | "featured";

interface FilterState {
  search: string;
  sectors: Sector[];
  ownershipTypes: OwnershipType[];
  tags: Tag[];
  graduateOnly: boolean;
  showBookmarksOnly: boolean;
  sortBy: SortOption;
}

const initialState: FilterState = {
  search: "",
  sectors: [],
  ownershipTypes: [],
  tags: [],
  graduateOnly: false,
  showBookmarksOnly: false,
  sortBy: "featured",
};

export function useFilter(companies: Company[], bookmarks: string[]) {
  const [filters, setFilters] = useState<FilterState>(initialState);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const toggleSector = useCallback((sector: Sector) => {
    setFilters((prev) => ({
      ...prev,
      sectors: prev.sectors.includes(sector)
        ? prev.sectors.filter((s) => s !== sector)
        : [...prev.sectors, sector],
    }));
  }, []);

  const toggleOwnershipType = useCallback((type: OwnershipType) => {
    setFilters((prev) => ({
      ...prev,
      ownershipTypes: prev.ownershipTypes.includes(type)
        ? prev.ownershipTypes.filter((t) => t !== type)
        : [...prev.ownershipTypes, type],
    }));
  }, []);

  const toggleTag = useCallback((tag: Tag) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  }, []);

  const setGraduateOnly = useCallback((graduateOnly: boolean) => {
    setFilters((prev) => ({ ...prev, graduateOnly }));
  }, []);

  const setShowBookmarksOnly = useCallback((showBookmarksOnly: boolean) => {
    setFilters((prev) => ({ ...prev, showBookmarksOnly }));
  }, []);

  const setSortBy = useCallback((sortBy: SortOption) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialState);
  }, []);

  const clearSector = useCallback((sector: Sector) => {
    setFilters((prev) => ({
      ...prev,
      sectors: prev.sectors.filter((s) => s !== sector),
    }));
  }, []);

  const clearOwnershipType = useCallback((type: OwnershipType) => {
    setFilters((prev) => ({
      ...prev,
      ownershipTypes: prev.ownershipTypes.filter((t) => t !== type),
    }));
  }, []);

  const clearTag = useCallback((tag: Tag) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  }, []);

  const filteredCompanies = useMemo(() => {
    let result = [...companies];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (company) =>
          company.name.toLowerCase().includes(searchLower) ||
          company.sector.toLowerCase().includes(searchLower) ||
          company.location.toLowerCase().includes(searchLower) ||
          company.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
          company.description.toLowerCase().includes(searchLower)
      );
    }

    // Sector filter
    if (filters.sectors.length > 0) {
      result = result.filter((company) =>
        filters.sectors.includes(company.sector)
      );
    }

    // Ownership type filter
    if (filters.ownershipTypes.length > 0) {
      result = result.filter((company) =>
        filters.ownershipTypes.includes(company.ownershipType)
      );
    }

    // Tags filter
    if (filters.tags.length > 0) {
      result = result.filter((company) =>
        filters.tags.some((tag) => company.tags.includes(tag))
      );
    }

    // Graduate program filter
    if (filters.graduateOnly) {
      result = result.filter((company) => company.graduateProgram);
    }

    // Bookmarks filter
    if (filters.showBookmarksOnly) {
      result = result.filter((company) => bookmarks.includes(company.id));
    }

    // Sorting
    switch (filters.sortBy) {
      case "a-z":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z-a":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "sector":
        result.sort((a, b) => a.sector.localeCompare(b.sector));
        break;
      case "featured":
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.name.localeCompare(b.name);
        });
        break;
    }

    return result;
  }, [companies, filters, bookmarks]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.sectors.length > 0) count += filters.sectors.length;
    if (filters.ownershipTypes.length > 0) count += filters.ownershipTypes.length;
    if (filters.tags.length > 0) count += filters.tags.length;
    if (filters.graduateOnly) count += 1;
    if (filters.showBookmarksOnly) count += 1;
    return count;
  }, [filters]);

  const hasActiveFilters = activeFilterCount > 0 || filters.search !== "";

  return {
    filters,
    filteredCompanies,
    activeFilterCount,
    hasActiveFilters,
    setSearch,
    toggleSector,
    toggleOwnershipType,
    toggleTag,
    setGraduateOnly,
    setShowBookmarksOnly,
    setSortBy,
    clearFilters,
    clearSector,
    clearOwnershipType,
    clearTag,
  };
}
