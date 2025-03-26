
import { Eye, CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FinanceProposal } from "@/types/marketplace";
import { useNavigate } from "react-router-dom";

interface ProposalRowProps {
  proposal: FinanceProposal;
  onViewDetails: (id: string) => void;
}

const ProposalRow = ({ proposal, onViewDetails }: ProposalRowProps) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    onViewDetails(proposal.id);
    navigate(`/proposal/${proposal.id}`);
  };

  return (
    <div className="grid grid-cols-14 gap-2 py-3 hover:bg-gray-800/20 rounded-sm">
      <div className="flex justify-center items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700/50"
          onClick={handleViewDetails}
        >
          <Eye className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex justify-center items-center gap-2">
        <CircleHelp className="h-5 w-5 text-gray-400" />
        <span>{proposal.creditRating}</span>
      </div>
      <div className="text-center flex items-center justify-center">
        {proposal.projectName}
      </div>
      <div className="text-center flex items-center justify-center">
        {proposal.facilityType}
      </div>
      <div className="text-center flex items-center justify-center">
        {proposal.financingType}
      </div>
      <div className="text-center flex items-center justify-center">
        {proposal.principal}
      </div>
      <div className="text-center flex items-center justify-center">
        {proposal.interestRateType}
      </div>
      <div className="text-center flex items-center justify-center">
        {proposal.interestRate}
      </div>
      <div className="text-center flex items-center justify-center">
        {proposal.term}
      </div>
      <div className="text-center flex items-center justify-center">
        <Badge 
          className={`
            ${proposal.status === "OPEN" ? "bg-white/10 text-white" : 
              proposal.status === "COMPLETED" ? "bg-gray-500/20 text-gray-300" : 
              "bg-gray-400/10 text-gray-400"}
            rounded-full px-3
          `}
        >
          {proposal.status}
        </Badge>
      </div>
      <div className="text-center flex items-center justify-center">
        {proposal.bidDeadline}
      </div>
      <div className="text-center flex items-center justify-center">
        {proposal.lenderPreferences}
      </div>
      <div className="text-center flex items-center justify-center">
        {proposal.industry}
      </div>
      <div className="text-center flex items-center justify-center">
        <Progress value={proposal.bidVolume} className="h-2 w-32 bg-cyan-950/40" />
      </div>
    </div>
  );
};

export default ProposalRow;
