
import { useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { FinanceProposal } from "@/types/marketplace";

interface ProposalTableRowProps {
  proposal: FinanceProposal;
  onViewDetails: (id: string) => void;
}

const ProposalTableRow = ({ proposal, onViewDetails }: ProposalTableRowProps) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    onViewDetails(proposal.id);
  };

  const handleBidClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/proposal/${proposal.id}/bid`);
  };

  return (
    <TableRow 
      className="border-gray-700/30 hover:bg-gray-800/20 cursor-pointer transition-colors"
      onClick={handleViewClick}
    >
      <TableCell className="py-1">
        <Button 
          variant="outline" 
          size="sm"
          className="px-2 py-1 h-8 text-xs"
          onClick={handleBidClick}
        >
          Bid <ArrowRightIcon className="ml-1 h-3 w-3" />
        </Button>
      </TableCell>
      <TableCell className="font-mono text-xs">{proposal.creditRating.toFixed(1)}</TableCell>
      <TableCell className="font-medium">{proposal.projectName}</TableCell>
      <TableCell>{proposal.facilityType}</TableCell>
      <TableCell>{proposal.financingType}</TableCell>
      <TableCell>{proposal.principal}</TableCell>
      <TableCell>{proposal.interestRateType}</TableCell>
      <TableCell>{proposal.interestRate}</TableCell>
      <TableCell>{proposal.term}</TableCell>
      <TableCell>
        <Badge className={`
          ${proposal.status === "OPEN" ? "bg-white/10 text-white" : 
            proposal.status === "COMPLETED" ? "bg-gray-500/20 text-gray-300" : 
            "bg-gray-400/10 text-gray-400"}
          rounded-full px-2 text-xs
        `}>
          {proposal.status}
        </Badge>
      </TableCell>
      <TableCell>{proposal.bidDeadline}</TableCell>
      <TableCell>{proposal.lenderPreferences}</TableCell>
      <TableCell>{proposal.industry}</TableCell>
      <TableCell>
        <div className="flex items-center">
          <div className="w-16 bg-gray-700/50 h-1 rounded-full overflow-hidden mr-2">
            <div 
              className="bg-cyan-400/80 h-full rounded-full"
              style={{ width: `${proposal.bidVolume}%` }}
            />
          </div>
          <span className="text-xs">{proposal.bidVolume}%</span>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ProposalTableRow;
