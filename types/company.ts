export type Sector =
  | "Water & Sanitation"
  | "Energy"
  | "Mining"
  | "Consulting"
  | "Government"
  | "Logistics & Ports"
  | "Manufacturing"
  | "NGO & Conservation"
  | "ESG & Sustainability"
  | "Job Board"
  | "Infrastructure & Engineering"
  | "Financial Services";

export type OwnershipType = "Private" | "State-Owned" | "Public Entity" | "NGO";

export type Tag =
  | "Environmental"
  | "HR"
  | "Engineering"
  | "Graduate Program"
  | "Internship"
  | "Experienced"
  | "Renewables"
  | "Water Quality"
  | "EIA"
  | "SHE"
  | "ESG"
  | "Wastewater"
  | "Mining"
  | "Logistics"
  | "Conservation"
  | "Research"
  | "Agriculture"
  | "Waste Management"
  | "Climate"
  | "Finance"
  | "Legal"
  | "IT"
  | "Operations"
  | "Project Management";

export interface Company {
  id: string;
  name: string;
  sector: Sector;
  ownershipType: OwnershipType;
  careersUrl: string;
  location: string;
  tags: Tag[];
  logo: string;
  description: string;
  graduateProgram: boolean;
  featured?: boolean;
}

export const SECTOR_COLORS: Record<Sector, string> = {
  "Water & Sanitation": "#0EA5E9",
  "Energy": "#F59E0B",
  "Mining": "#8B5CF6",
  "Consulting": "#10B981",
  "Government": "#6366F1",
  "Logistics & Ports": "#EC4899",
  "Manufacturing": "#F97316",
  "NGO & Conservation": "#22C55E",
  "ESG & Sustainability": "#14B8A6",
  "Job Board": "#A855F7",
  "Infrastructure & Engineering": "#3B82F6",
  "Financial Services": "#EAB308",
};

export const OWNERSHIP_COLORS: Record<OwnershipType, { bg: string; text: string }> = {
  "State-Owned": { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  "Private": { bg: "bg-blue-500/20", text: "text-blue-400" },
  "Public Entity": { bg: "bg-amber-500/20", text: "text-amber-400" },
  "NGO": { bg: "bg-rose-500/20", text: "text-rose-400" },
};
