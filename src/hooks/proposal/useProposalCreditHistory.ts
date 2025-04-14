
import { useState, useEffect } from "react";
import { FinanceProposal } from "@/types/marketplace";
import { CreditHistory } from "@/types/proposalDetails";

export const useProposalCreditHistory = (proposal: FinanceProposal | null) => {
  const [creditHistory, setCreditHistory] = useState<CreditHistory | null>(null);

  useEffect(() => {
    if (proposal) {
      setCreditHistory({
        creditScore: proposal.creditRating * 100,
        paymentHistory: 98,
        delinquencies: 0,
        bankruptcies: 0,
        taxLiens: 0,
        judgments: 0,
        outstandingDebt: "$3.8M",
        utilizationRatio: 0.45,
        previousLoans: 3,
        defaultRate: 0
      });
    }
  }, [proposal]);

  return { creditHistory };
};
