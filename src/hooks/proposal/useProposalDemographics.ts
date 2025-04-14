
import { useState, useEffect } from "react";
import { FinanceProposal } from "@/types/marketplace";
import { CompanyDemographics } from "@/types/proposalDetails";

export const useProposalDemographics = (proposal: FinanceProposal | null) => {
  const [demographics, setDemographics] = useState<CompanyDemographics | null>(null);

  useEffect(() => {
    if (proposal) {
      setDemographics({
        founded: "2011",
        employees: 85,
        ownership: "Private",
        industrySubsector: proposal.industry + " Services",
        location: "Chicago, IL",
        annualRevenue: "$8.5M",
        totalAssets: "$12.4M",
        totalLiabilities: "$5.2M",
        netWorth: "$7.2M",
        publiclyTraded: false,
        keyExecutives: ["Jane Smith, CEO", "Michael Chen, CFO", "Robert Williams, COO"]
      });
    }
  }, [proposal]);

  return { demographics };
};
