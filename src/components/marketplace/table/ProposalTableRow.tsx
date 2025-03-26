
import { Eye, CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TableRow, TableCell } from "@/components/ui/table";
import { FinanceProposal } from "@/types/marketplace";
import { useNavigate } from "react-router-dom";

interface ProposalTableRowProps {
  proposal: FinanceProposal;
  onViewDetails: (id: string) => void;
}

const ProposalTableRow = ({ proposal, onViewDetails }: ProposalTableRowProps) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    // Call the onViewDetails function for backward compatibility
    onViewDetails(proposal.id);
    // Navigate to the proposal details page
    navigate(`/proposal/${proposal.id}`);
  };

  return (
    <TableRow 
      key={proposal.id} 
      className="border-gray-700/30 hover:bg-gray-800/20 bg-black/20 backdrop-blur-sm cursor-pointer"
      onClick={handleViewDetails}
    >
      <TableCell className="text-center py-3">
        <div className="flex justify-center items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700/50"
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click from triggering
              handleViewDetails();
            }}
          >
            <Eye className="h-5 w-5" />
          </Button>
        </div>
      </TableCell>
      <TableCell className="text-center py-3">
        <div className="flex justify-center items-center gap-2">
          <CircleHelp className="h-5 w-5 text-gray-400" />
          <span className="font-mono">{proposal.creditRating}</span>
        </div>
      </TableCell>
      <TableCell className="text-center py-3 font-mono">
        {proposal.projectName}
      </TableCell>
      <TableCell className="text-center py-3 font-mono">
        {proposal.facilityType}
      </TableCell>
      <TableCell className="text-center py-3 font-mono">
        {proposal.financingType}
      </TableCell>
      <TableCell className="text-center py-3 font-mono">
        {proposal.principal}
      </TableCell>
      <TableCell className="text-center py-3 font-mono">
        {proposal.interestRateType}
      </TableCell>
      <TableCell className="text-center py-3 font-mono">
        {proposal.interestRate}
      </TableCell>
      <TableCell className="text-center py-3 font-mono">
        {proposal.term}
      </TableCell>
      <TableCell className="text-center py-3">
        <Badge 
          className={`
            ${proposal.status === "OPEN" ? "bg-white/10 text-white" : 
              proposal.status === "COMPLETED" ? "bg-gray-500/20 text-gray-300" : 
              "bg-gray-400/10 text-gray-400"}
            rounded-full px-3 font-mono
          `}
        >
          {proposal.status}
        </Badge>
      </TableCell>
      <TableCell className="text-center py-3 font-mono">
        {proposal.bidDeadline}
      </TableCell>
      <TableCell className="text-center py-3 font-mono">
        {proposal.lenderPreferences}
      </TableCell>
      <TableCell className="text-center py-3 font-mono">
        {proposal.industry}
      </TableCell>
      <TableCell className="text-center py-3">
        <Progress value={proposal.bidVolume} className="h-2 w-32 bg-cyan-950/40" />
      </TableCell>
    </TableRow>
  );
};

export default ProposalTableRow;
