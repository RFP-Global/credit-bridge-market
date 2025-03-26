
import { Eye, CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TableRow, TableCell } from "@/components/ui/table";
import { FinanceProposal } from "@/types/marketplace";

interface ProposalTableRowProps {
  proposal: FinanceProposal;
  onViewDetails: (id: string) => void;
}

const ProposalTableRow = ({ proposal, onViewDetails }: ProposalTableRowProps) => {
  return (
    <TableRow key={proposal.id} className="border-gray-700 hover:bg-gray-800/20">
      <TableCell className="text-center py-3">
        <div className="flex justify-center items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700/50"
            onClick={() => onViewDetails(proposal.id)}
          >
            <Eye className="h-5 w-5" />
          </Button>
        </div>
      </TableCell>
      <TableCell className="text-center py-3">
        <div className="flex justify-center items-center gap-2">
          <CircleHelp className="h-5 w-5 text-gray-400" />
          <span>{proposal.creditRating}</span>
        </div>
      </TableCell>
      <TableCell className="text-center py-3">
        {proposal.projectName}
      </TableCell>
      <TableCell className="text-center py-3">
        {proposal.facilityType}
      </TableCell>
      <TableCell className="text-center py-3">
        {proposal.financingType}
      </TableCell>
      <TableCell className="text-center py-3">
        {proposal.principal}
      </TableCell>
      <TableCell className="text-center py-3">
        {proposal.interestRateType}
      </TableCell>
      <TableCell className="text-center py-3">
        {proposal.interestRate}
      </TableCell>
      <TableCell className="text-center py-3">
        {proposal.term}
      </TableCell>
      <TableCell className="text-center py-3">
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
      <TableCell className="text-center py-3">
        {proposal.bidDeadline}
      </TableCell>
      <TableCell className="text-center py-3">
        {proposal.lenderPreferences}
      </TableCell>
      <TableCell className="text-center py-3">
        {proposal.industry}
      </TableCell>
      <TableCell className="text-center py-3">
        <Progress value={proposal.bidVolume} className="h-2 w-32 bg-cyan-950/40" />
      </TableCell>
    </TableRow>
  );
};

export default ProposalTableRow;
