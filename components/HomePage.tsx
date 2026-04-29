"use client";

import Link from "next/link";
import {
  ArrowRight,
  Leaf,
  Droplets,
  Zap,
  Mountain,
  Building2,
  GraduationCap,
  Users,
  TrendingUp,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import companies from "@/data/companies.json";
import type { Company } from "@/types/company";
import { SECTOR_COLORS } from "@/types/company";

const typedCompanies = companies as Company[];

const FEATURED_SECTORS = [
  {
    name: "Water & Sanitation",
    icon: Droplets,
    description: "Manage South Africa's most precious resource",
    color: SECTOR_COLORS["Water & Sanitation"],
  },
  {
    name: "Energy",
    icon: Zap,
    description: "Power the nation's renewable transition",
    color: SECTOR_COLORS["Energy"],
  },
  {
    name: "Mining",
    icon: Mountain,
    description: "Sustainable extraction and rehabilitation",
    color: SECTOR_COLORS["Mining"],
  },
  {
    name: "ESG & Sustainability",
    icon: TrendingUp,
    description: "Drive corporate environmental responsibility",
    color: SECTOR_COLORS["ESG & Sustainability"],
  },
  {
    name: "NGO & Conservation",
    icon: Leaf,
    description: "Protect our natural heritage",
    color: SECTOR_COLORS["NGO & Conservation"],
  },
  {
    name: "Consulting",
    icon: Building2,
    description: "Shape environmental policy and compliance",
    color: SECTOR_COLORS["Consulting"],
  },
];

export function HomePage() {
  const featuredCompanies = typedCompanies.filter((c) => c.featured).slice(0, 6);
  const totalCompanies = typedCompanies.length;
  const graduateProgramCount = typedCompanies.filter(
    (c) => c.graduateProgram
  ).length;
  const sectorCount = new Set(typedCompanies.map((c) => c.sector)).size;

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge
              variant="secondary"
              className="mb-6 bg-[var(--accent-primary)]/10 text-[var(--accent-glow)] border-[var(--accent-primary)]/20"
            >
              <Leaf className="h-3 w-3 mr-1" />
              South Africa&apos;s Green Careers Platform
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Where{" "}
              <span className="text-[var(--accent-primary)]">Green Careers</span>{" "}
              Begin
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Discover sustainability, renewable energy, water management, and
              environmental career opportunities across South Africa. Connect with
              leading employers in the green economy.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[var(--accent-primary)] hover:bg-[var(--accent-glow)] text-white px-8"
              >
                <Link href="/jobs">
                  Explore Opportunities
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border hover:bg-[var(--bg-elevated)]"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-[var(--accent-primary)] mb-2">
                {totalCompanies}+
              </div>
              <div className="text-sm text-muted-foreground">
                Career Portals Listed
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-2">
                {graduateProgramCount}
              </div>
              <div className="text-sm text-muted-foreground">
                Graduate Programs
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-amber-400 mb-2">
                {sectorCount}
              </div>
              <div className="text-sm text-muted-foreground">
                Industry Sectors
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">
                9
              </div>
              <div className="text-sm text-muted-foreground">
                Provinces Covered
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Explore Key Sectors
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              South Africa&apos;s sustainability sector spans diverse industries. Find
              your niche in the green economy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_SECTORS.map((sector) => {
              const Icon = sector.icon;
              const count = typedCompanies.filter(
                (c) => c.sector === sector.name
              ).length;

              return (
                <Link
                  key={sector.name}
                  href={`/jobs?sector=${encodeURIComponent(sector.name)}`}
                  className="card-glow group bg-card border border-border rounded-xl p-6 block"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${sector.color}20` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: sector.color }} />
                  </div>
                  <h3 className="font-semibold text-card-foreground mb-2 flex items-center gap-2">
                    {sector.name}
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent-primary)]" />
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {sector.description}
                  </p>
                  <div className="text-xs text-[var(--accent-primary)] font-medium">
                    {count} companies
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Companies Section */}
      <section className="py-20 bg-card/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Featured Employers
              </h2>
              <p className="text-muted-foreground">
                Leading organisations driving South Africa&apos;s sustainability
                agenda
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="hidden sm:flex border-border hover:bg-[var(--bg-elevated)]"
            >
              <Link href="/jobs">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCompanies.map((company) => (
              <div
                key={company.id}
                className="card-glow bg-card border border-border rounded-xl p-5"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-[var(--bg-elevated)] flex items-center justify-center shrink-0">
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
                      className="absolute inset-0 items-center justify-center font-semibold text-sm text-[var(--text-secondary)] hidden"
                      style={{ backgroundColor: "var(--bg-elevated)" }}
                    >
                      {company.name
                        .split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-card-foreground truncate">
                      {company.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor:
                            SECTOR_COLORS[
                              company.sector as keyof typeof SECTOR_COLORS
                            ],
                        }}
                      />
                      <span className="text-sm text-muted-foreground truncate">
                        {company.sector}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {company.description}
                </p>

                <div className="flex items-center justify-between">
                  {company.graduateProgram && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-[var(--accent-primary)]/20 text-[var(--accent-glow)]"
                    >
                      <GraduationCap className="h-3 w-3 mr-1" />
                      Graduate Program
                    </Badge>
                  )}
                  <a
                    href={company.careersUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--accent-primary)] hover:text-[var(--accent-glow)] font-medium flex items-center gap-1 ml-auto"
                    data-track="featured-visit-careers"
                  >
                    Careers
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button
              asChild
              variant="outline"
              className="border-border hover:bg-[var(--bg-elevated)]"
            >
              <Link href="/jobs">
                View All Companies
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why SusCareers Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why SusCareers?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We connect talent with purpose-driven organisations shaping South
              Africa&apos;s sustainable future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[var(--accent-primary)]/10 flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-[var(--accent-primary)]" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">
                Verified Employers
              </h3>
              <p className="text-sm text-muted-foreground">
                Direct links to career portals of legitimate South African
                organisations in the sustainability sector.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">
                Graduate Opportunities
              </h3>
              <p className="text-sm text-muted-foreground">
                Easily find organisations offering graduate programs, internships,
                and entry-level positions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-amber-400" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">
                SA Focused
              </h3>
              <p className="text-sm text-muted-foreground">
                Tailored specifically for the South African market, covering SOEs,
                private sector, NGOs, and government.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--accent-primary)]/10 to-[var(--accent-purple)]/10 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start Your Green Career?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Explore our comprehensive database of sustainability employers and take
            the first step towards a meaningful career.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[var(--accent-primary)] hover:bg-[var(--accent-glow)] text-white px-8"
          >
            <Link href="/jobs">
              Browse All Opportunities
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
