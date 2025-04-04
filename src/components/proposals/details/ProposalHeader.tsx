
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Building, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FinanceProposal } from "@/types/marketplace";

interface ProposalHeaderProps {
  proposal: FinanceProposal;
  demographics: {
    ownership: string;
    founded: string;
    location: string;
    employees: number;
  };
  onBidClick: () => void;
}

const ProposalHeader: React.FC<ProposalHeaderProps> = ({ 
  proposal, 
  demographics, 
  onBidClick 
}) => {
  return (
    <div className="mb-6">
      <Button variant="outline" size="sm" asChild className="mb-4">
        <Link to="/marketplace" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Marketplace
        </Link>
      </Button>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4 flex-grow">
          <div className="flex-grow">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className={`
                ${proposal.status === "OPEN" ? "bg-white/10 text-white" : 
                  proposal.status === "COMPLETED" ? "bg-gray-500/20 text-gray-300" : 
                  "bg-gray-400/10 text-gray-400"}
                rounded-full px-3
              `}>
                {proposal.status}
              </Badge>
              <Badge variant="outline" className="font-mono">
                <Building className="mr-2 h-3 w-3" />
                {demographics.ownership}
              </Badge>
              <Badge variant="outline" className="font-mono">
                <Calendar className="mr-2 h-3 w-3" />
                EST. {demographics.founded}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                {proposal.projectName}: {proposal.facilityType}
              </h1>
              
              {proposal.status === "OPEN" && (
                <Button 
                  onClick={onBidClick} 
                  variant="default" 
                  className="ml-4 bid-button"
                >
                  Submit Bid
                </Button>
              )}
            </div>
            
            <p className="text-gray-400 mt-1">
              <span className="font-semibold">{proposal.industry}</span> • 
              <span className="ml-2">{demographics.location}</span> • 
              <span className="ml-2">{demographics.employees} Employees</span>
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-start md:items-end">
          <div className="flex items-center mb-2">
            <div className="text-xl font-bold mr-2">{proposal.principal}</div>
            <Badge variant="secondary" className="font-mono text-xs">
              {proposal.financingType}
            </Badge>
          </div>
          
          <div className="flex space-x-2 text-sm text-gray-400">
            <span className="flex items-center">
              <DollarSign className="h-3 w-3 mr-1" />
              {proposal.interestRate}
            </span>
            <span>•</span>
            <span>{proposal.term}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalHeader;
