
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { financeProposals } from "@/data/marketplaceProposals";
import { FinanceProposal } from "@/types/marketplace";

export const useProposalBasicDetails = (id: string | undefined) => {
  const navigate = useNavigate();
  const [proposal, setProposal] = useState<FinanceProposal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundProposal = financeProposals.find(p => p.id === id);
      if (foundProposal) {
        setProposal(foundProposal);
      }
      setLoading(false);
    }
  }, [id]);

  const handleBid = () => {
    navigate(`/proposal/${id}/bid`);
  };

  return {
    proposal,
    loading,
    handleBid
  };
};
