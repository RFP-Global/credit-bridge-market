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
    onViewDetails(proposal.id);
    navigate(`/proposal/${proposal.id}`);
  };

  return (
    <TableRow 
      key={proposal.id} 
      className="border-none hover:bg-gray-800/20 bg-transparent/0"
    >
      <TableCell className="text-center py-3 border-none">
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
      </TableCell>
      <TableCell className="text-center py-3 border-none">
        <div className="flex justify-center items-center gap-2">
          <CircleHelp className="h-5 w-5 text-gray-400" />
          <span>{proposal.creditRating}</span>
        </div>
      </TableCell>
      <TableCell className="text-center py-3 border-none">
        {proposal.projectName}
      </TableCell>
      <TableCell className="text-center py-3 border-none">
        {proposal.facilityType}
      </TableCell>
      <TableCell className="text-center py-3 border-none">
        {proposal.financingType}
      </TableCell>
      <TableCell className="text-center py-3 border-none">
        {proposal.principal}
      </TableCell>
      <TableCell className="text-center py-3 border-none">
        {proposal.interestRateType}
      </TableCell>
      <TableCell className="text-center py-3 border-none">
        {proposal.interestRate}
      </TableCell>
      <TableCell className="text-center py-3 border-none">
        {proposal.term}
      </TableCell>
      <TableCell className="text-center py-3 border-none">
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
      </TableCell>
      <TableCell className="text-center py-3 border-none">
        {proposal.bidDeadline}
      </TableCell>
      <TableCell className="text-center py-3 border-none">
        {proposal.lenderPreferences}
      </TableCell>
      <TableCell className="text-center py-3 border-none">
        {proposal.industry}
      </TableCell>
      <TableCell className="text-center py-3 border-none">
        <Progress value={proposal.bidVolume} className="h-2 w-32 bg-cyan-950/40" />
      </TableCell>
    </TableRow>
  );
};

export default ProposalTableRow;
