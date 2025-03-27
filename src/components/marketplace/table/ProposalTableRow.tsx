
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

  // Common class for all cells to ensure consistent alignment with headers
  const cellClass = "flex-1 text-center px-4 py-2 font-extralight";

  return (
    <TableRow 
      className="border-gray-700/30 hover:bg-gray-800/20 cursor-pointer transition-colors flex w-full"
      onClick={handleViewClick}
    >
      <TableCell className={`font-mono text-xs ${cellClass}`}>{proposal.creditRating.toFixed(1)}</TableCell>
      <TableCell className={cellClass}>{proposal.projectName}</TableCell>
      <TableCell className={cellClass}>{proposal.facilityType}</TableCell>
      <TableCell className={cellClass}>{proposal.financingType}</TableCell>
      <TableCell className={cellClass}>{proposal.principal}</TableCell>
      <TableCell className={cellClass}>{proposal.interestRateType}</TableCell>
      <TableCell className={cellClass}>{proposal.interestRate}</TableCell>
      <TableCell className={cellClass}>{proposal.term}</TableCell>
      <TableCell className={cellClass}>
        <Badge className={`
          ${proposal.status === "OPEN" ? "bg-white/10 text-white" : 
            proposal.status === "COMPLETED" ? "bg-gray-500/20 text-gray-300" : 
            "bg-gray-400/10 text-gray-400"}
          rounded-full px-2 text-xs mx-auto
        `}>
          {proposal.status}
        </Badge>
      </TableCell>
      <TableCell className={cellClass}>{proposal.bidDeadline}</TableCell>
      <TableCell className={cellClass}>{proposal.lenderPreferences}</TableCell>
      <TableCell className={cellClass}>{proposal.industry}</TableCell>
      <TableCell className={cellClass}>
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
