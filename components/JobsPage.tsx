"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./SearchBar";
import { Sidebar } from "./Sidebar";
import { CompanyGrid } from "./CompanyGrid";
import { CompanyModal } from "./CompanyModal";
import { StatsBar } from "./StatsBar";
import { FilterChips } from "./FilterChips";
import { useFilter } from "@/hooks/useFilter";
import { useBookmarks } from "@/hooks/useBookmarks";
import companies from "@/data/companies.json";
import type { Company, Sector } from "@/types/company";

const typedCompanies = companies as Company[];

export function JobsPage() {
  const searchParams = useSearchParams();
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { bookmarks, toggleBookmark, isBookmarked, bookmarkCount } = useBookmarks();

  const {
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
  } = useFilter(typedCompanies, bookmarks);

  // Handle URL search params for sector filtering
  useEffect(() => {
    const sectorParam = searchParams.get("sector");
    if (sectorParam && !filters.sectors.includes(sectorParam as Sector)) {
      toggleSector(sectorParam as Sector);
    }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const graduateProgramCount = typedCompanies.filter(
    (c) => c.graduateProgram
  ).length;

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-card/50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Careers Hub
              </h1>
              <p className="text-muted-foreground">
                Browse sustainability career portals across South Africa
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full lg:w-96">
              <SearchBar value={filters.search} onChange={setSearch} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-20">
              <Sidebar
                filters={filters}
                onToggleSector={toggleSector}
                onToggleOwnershipType={toggleOwnershipType}
                onToggleTag={toggleTag}
                onSetGraduateOnly={setGraduateOnly}
                onSetShowBookmarksOnly={setShowBookmarksOnly}
                onSetSortBy={setSortBy}
                onClearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
                bookmarkCount={bookmarkCount}
              />
            </div>
          </div>

          {/* Sidebar - Mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <div className="lg:hidden">
            <Sidebar
              filters={filters}
              onToggleSector={toggleSector}
              onToggleOwnershipType={toggleOwnershipType}
              onToggleTag={toggleTag}
              onSetGraduateOnly={setGraduateOnly}
              onSetShowBookmarksOnly={setShowBookmarksOnly}
              onSetSortBy={setSortBy}
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
              bookmarkCount={bookmarkCount}
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                className="w-full border-border justify-between"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </span>
                {activeFilterCount > 0 && (
                  <span className="bg-[var(--accent-primary)] text-white text-xs px-2 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Stats Bar */}
            <div className="mb-4">
              <StatsBar
                filteredCount={filteredCompanies.length}
                totalCount={typedCompanies.length}
                graduateProgramCount={graduateProgramCount}
                bookmarkCount={bookmarkCount}
                activeFilterCount={activeFilterCount}
              />
            </div>

            {/* Filter Chips */}
            <div className="mb-6">
              <FilterChips
                sectors={filters.sectors}
                ownershipTypes={filters.ownershipTypes}
                tags={filters.tags}
                graduateOnly={filters.graduateOnly}
                showBookmarksOnly={filters.showBookmarksOnly}
                onClearSector={clearSector}
                onClearOwnershipType={clearOwnershipType}
                onClearTag={clearTag}
                onSetGraduateOnly={setGraduateOnly}
                onSetShowBookmarksOnly={setShowBookmarksOnly}
                onClearAll={clearFilters}
              />
            </div>

            {/* Company Grid */}
            <CompanyGrid
              companies={filteredCompanies}
              bookmarks={bookmarks}
              onToggleBookmark={toggleBookmark}
              onSelectCompany={setSelectedCompany}
            />
          </div>
        </div>
      </div>

      {/* Company Modal */}
      <CompanyModal
        company={selectedCompany}
        isOpen={!!selectedCompany}
        onClose={() => setSelectedCompany(null)}
        isBookmarked={selectedCompany ? isBookmarked(selectedCompany.id) : false}
        onToggleBookmark={() => {
          if (selectedCompany) {
            toggleBookmark(selectedCompany.id);
          }
        }}
      />
    </div>
  );
}
