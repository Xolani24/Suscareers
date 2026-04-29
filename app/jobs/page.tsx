import type { Metadata } from "next";
import { ClientLayout } from "@/components/ClientLayout";
import { JobsPage } from "@/components/JobsPage";

export const metadata: Metadata = {
  title: "Careers Hub - Browse Sustainability Job Opportunities",
  description:
    "Explore 100+ sustainability career portals across South Africa. Find opportunities in renewable energy, water management, environmental consulting, and more.",
  alternates: {
    canonical: "https://suscareers.co.za/jobs",
  },
};

export default function Jobs() {
  return (
    <ClientLayout>
      <JobsPage />
    </ClientLayout>
  );
}
