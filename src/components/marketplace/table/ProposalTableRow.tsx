
import { useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
      <TableCell className="font-mono text-xs text-center">{proposal.creditRating.toFixed(1)}</TableCell>
      <TableCell className="font-medium text-center">{proposal.projectName}</TableCell>
      <TableCell className="text-center">{proposal.facilityType}</TableCell>
      <TableCell className="text-center">{proposal.financingType}</TableCell>
      <TableCell className="text-center">{proposal.principal}</TableCell>
      <TableCell className="text-center">{proposal.interestRateType}</TableCell>
      <TableCell className="text-center">{proposal.interestRate}</TableCell>
      <TableCell className="text-center">{proposal.term}</TableCell>
      <TableCell className="text-center">
        <Badge className={`
          ${proposal.status === "OPEN" ? "bg-white/10 text-white" : 
            proposal.status === "COMPLETED" ? "bg-gray-500/20 text-gray-300" : 
            "bg-gray-400/10 text-gray-400"}
          rounded-full px-2 text-xs
        `}>
          {proposal.status}
        </Badge>
      </TableCell>
      <TableCell className="text-center">{proposal.bidDeadline}</TableCell>
      <TableCell className="text-center">{proposal.lenderPreferences}</TableCell>
      <TableCell className="text-center">{proposal.industry}</TableCell>
      <TableCell className="text-center">
        <div className="flex items-center justify-center">
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
