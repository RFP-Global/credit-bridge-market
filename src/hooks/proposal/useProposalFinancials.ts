
import { useState, useEffect } from "react";
import { FinanceProposal } from "@/types/marketplace";
import { FinancialRatios } from "@/types/proposalDetails";

export const useProposalFinancials = (proposal: FinanceProposal | null) => {
  const [financialRatios, setFinancialRatios] = useState<FinancialRatios | null>(null);

  useEffect(() => {
    if (proposal) {
      setFinancialRatios({
        debtServiceCoverageRatio: 1.35,
        currentRatio: 1.8,
        quickRatio: 1.2,
        debtToEBITDA: 0.65
      });
    }
  }, [proposal]);

  return { financialRatios };
};
