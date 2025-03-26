
import { useMemo } from "react";
import { FinanceProposal } from "@/types/marketplace";

export const useFilterExtraction = (proposals: FinanceProposal[]) => {
  // Extract unique facility types
  const facilityTypes = useMemo(() => 
    [...new Set(proposals.map(p => p.facilityType))], 
    []
  );
  
  // Extract unique industries
  const industries = useMemo(() => 
    [...new Set(proposals.map(p => p.industry))], 
    []
  );

  return {
    facilityTypes,
    industries
  };
};
