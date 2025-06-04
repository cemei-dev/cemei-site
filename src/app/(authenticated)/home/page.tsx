"use client";

import AccomplishmentSection from "@/components/molecules/AccomplishmentSection/accomplishmentSection";
import InvestmentSection from "@/components/molecules/InvestmentSection/investmentSection";
import ManagementPanel from "@/components/molecules/ManagementPanel/managementPanel";

export default function Home() {
  return (
    <div className="container flex h-full w-full flex-col gap-20">
      <ManagementPanel />
      <InvestmentSection />
      <AccomplishmentSection />
    </div>
  );
}
