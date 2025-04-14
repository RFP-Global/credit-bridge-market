
import { useProposalBasicDetails } from "./proposal/useProposalBasicDetails";
import { useProposalFinancials } from "./proposal/useProposalFinancials";
import { useProposalDemographics } from "./proposal/useProposalDemographics";
import { useProposalCreditHistory } from "./proposal/useProposalCreditHistory";
import { useProposalCompatibility } from "./proposal/useProposalCompatibility";
import { useCategoryDetails } from "./proposal/useCategoryDetails";

export const useProposalDetails = (id: string | undefined) => {
  const { proposal, loading, handleBid } = useProposalBasicDetails(id);
  const { financialRatios } = useProposalFinancials(proposal);
  const { demographics } = useProposalDemographics(proposal);
  const { creditHistory } = useProposalCreditHistory(proposal);
  const { compatibility } = useProposalCompatibility(proposal);
  const { 
    categoryModalOpen, 
    selectedCategory, 
    setCategoryModalOpen, 
    handleCategoryClick 
  } = useCategoryDetails();

  return {
    proposal,
    financialRatios,
    demographics,
    creditHistory,
    compatibility,
    loading,
    categoryModalOpen,
    selectedCategory,
    setCategoryModalOpen,
    handleCategoryClick,
    handleBid
  };
};
