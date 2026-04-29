"use client";

import { CompanyCard } from "./CompanyCard";
import type { Company } from "@/types/company";

interface CompanyGridProps {
  companies: Company[];
  bookmarks: string[];
  onToggleBookmark: (companyId: string) => void;
  onSelectCompany: (company: Company) => void;
}

export function CompanyGrid({
  companies,
  bookmarks,
  onToggleBookmark,
  onSelectCompany,
}: CompanyGridProps) {
  if (companies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-card-foreground mb-2">
          No companies found
        </h3>
        <p className="text-muted-foreground max-w-sm">
          Try adjusting your filters or search terms to find sustainability career
          opportunities.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {companies.map((company, index) => (
        <CompanyCard
          key={company.id}
          company={company}
          isBookmarked={bookmarks.includes(company.id)}
          onToggleBookmark={() => onToggleBookmark(company.id)}
          onClick={() => onSelectCompany(company)}
          animationDelay={index * 50}
        />
      ))}
    </div>
  );
}
