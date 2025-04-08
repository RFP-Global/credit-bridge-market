
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { FinanceProposal } from "@/types/marketplace";
import { CompanyDemographics } from "@/types/proposalDetails";

interface ProposalHeaderProps {
  proposal: FinanceProposal;
  demographics: CompanyDemographics;
  onBidClick: () => void;
}

const ProposalHeader: React.FC<ProposalHeaderProps> = ({ 
  proposal, 
  demographics, 
  onBidClick 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleBackClick = () => {
    // Check if we have a valid 'from' path in location state
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      // Default back to marketplace
      navigate("/marketplace");
    }
  };
  
  return (
    <div className="mb-8">
      <Button 
        variant="outline" 
        size="sm" 
        className="mb-4"
        onClick={handleBackClick}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Marketplace
      </Button>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Badge variant="outline" className="text-xs py-0">{proposal.financingType}</Badge>
            <Badge variant="outline" className="text-xs py-0">{proposal.facilityType}</Badge>
            <Badge variant="outline" className="text-xs py-0">{proposal.industry}</Badge>
          </div>
          
          <h1 className="text-2xl font-bold mb-1">{proposal.projectName}</h1>
          <p className="text-sm text-gray-400">{demographics.location} • Founded {demographics.founded}</p>
        </div>
        
        <div className="flex flex-col items-start md:items-end">
          <Button onClick={onBidClick} className="mb-2">
            Submit Bid
          </Button>
          <p className="text-xs text-gray-400">Deadline: {proposal.bidDeadline}</p>
        </div>
      </div>
    </div>
  );
};

export default ProposalHeader;
