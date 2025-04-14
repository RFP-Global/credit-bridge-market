
import { useState, useEffect } from "react";
import { FinanceProposal } from "@/types/marketplace";
import { UnderwritingCompatibility } from "@/types/proposalDetails";

export const useProposalCompatibility = (proposal: FinanceProposal | null) => {
  const [compatibility, setCompatibility] = useState<UnderwritingCompatibility | null>(null);

  useEffect(() => {
    if (proposal) {
      const creditRating = proposal.creditRating;
      const baseScore = (creditRating / 10) * 100;
      
      const financialStrength = Math.min(100, Math.max(20, baseScore + Math.random() * 20 - 10));
      const businessStability = Math.min(100, Math.max(20, baseScore + Math.random() * 20 - 10));
      const competitivePosition = Math.min(100, Math.max(20, baseScore + Math.random() * 20 - 10));
      const collateralStrength = Math.min(100, Math.max(20, baseScore + Math.random() * 20 - 10));
      const industryRisk = Math.min(100, Math.max(20, baseScore + Math.random() * 20 - 10));
      const bankingRelationship = Math.min(100, Math.max(20, baseScore + Math.random() * 20 - 10));
      
      const overallScore = Math.round(
        (financialStrength + businessStability + competitivePosition + 
         collateralStrength + industryRisk + bankingRelationship) / 6
      );
      
      setCompatibility({
        overallScore,
        categoryScores: {
          financialStrength: Math.round(financialStrength),
          businessStability: Math.round(businessStability),
          competitivePosition: Math.round(competitivePosition),
          collateralStrength: Math.round(collateralStrength),
          industryRisk: Math.round(industryRisk),
          bankingRelationship: Math.round(bankingRelationship)
        },
        criteriaFit: [
          { 
            name: "Funding Range", 
            matches: true, 
            yourCriteria: "$250K - $10M", 
            dealValue: proposal.principal 
          },
          { 
            name: "Industry", 
            matches: true, 
            yourCriteria: "All Industries", 
            dealValue: proposal.industry 
          },
          { 
            name: "Credit Rating", 
            matches: creditRating >= 6, 
            yourCriteria: "6.0+", 
            dealValue: creditRating.toFixed(1) 
          },
          { 
            name: "Term Length", 
            matches: true, 
            yourCriteria: "12-60 Months", 
            dealValue: proposal.term 
          },
          { 
            name: "Facility Type", 
            matches: true, 
            yourCriteria: "All Types", 
            dealValue: proposal.facilityType 
          }
        ]
      });
    }
  }, [proposal]);

  return { compatibility };
};
