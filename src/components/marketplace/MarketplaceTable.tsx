
import { Eye, ArrowUpDown, CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FinanceProposal } from "@/types/marketplace";
import { toast } from "sonner";

interface MarketplaceTableProps {
  proposals: FinanceProposal[];
  sortField: keyof FinanceProposal | "";
  sortDirection: "asc" | "desc";
  handleSort: (field: keyof FinanceProposal) => void;
}

const MarketplaceTable = ({
  proposals,
  sortField,
  sortDirection,
  handleSort,
}: MarketplaceTableProps) => {
  // View proposal details function
  const viewProposalDetails = (id: string) => {
    toast.info(`Viewing details for proposal ${id}`);
  };

  return (
    <div className="border border-gray-700 rounded-sm overflow-hidden mb-4 relative">
      <Table>
        <TableHeader className="bg-gray-800/40 sticky top-0 z-10">
          <TableRow className="border-gray-700 hover:bg-transparent">
            <TableHead className="text-center w-16 text-xs font-medium text-cyan-400">
              
            </TableHead>
            <TableHead 
              className="text-center w-24 text-xs font-medium text-cyan-400 cursor-pointer hover:text-white"
              onClick={() => handleSort('creditRating')}
            >
              <div className="flex items-center justify-center">
                RFP CREDIT RATING
                <ArrowUpDown className="ml-1 h-3 w-3" />
              </div>
            </TableHead>
            <TableHead 
              className="text-center text-xs font-medium text-cyan-400 cursor-pointer hover:text-white"
              onClick={() => handleSort('projectName')}
            >
              <div className="flex items-center justify-center">
                PROJECT NAME
                <ArrowUpDown className="ml-1 h-3 w-3" />
              </div>
            </TableHead>
            <TableHead 
              className="text-center text-xs font-medium text-cyan-400 cursor-pointer hover:text-white"
              onClick={() => handleSort('facilityType')}
            >
              <div className="flex items-center justify-center">
                FACILITY TYPE
                <ArrowUpDown className="ml-1 h-3 w-3" />
              </div>
            </TableHead>
            <TableHead 
              className="text-center text-xs font-medium text-cyan-400 cursor-pointer hover:text-white"
              onClick={() => handleSort('financingType')}
            >
              <div className="flex items-center justify-center">
                NEW FINANCING OR REFINANCING
                <ArrowUpDown className="ml-1 h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="text-center text-xs font-medium text-cyan-400">
              TARGET PRINCIPAL
            </TableHead>
            <TableHead 
              className="text-center text-xs font-medium text-cyan-400 cursor-pointer hover:text-white"
              onClick={() => handleSort('interestRateType')}
            >
              <div className="flex items-center justify-center">
                INTEREST RATE TYPE
                <ArrowUpDown className="ml-1 h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="text-center text-xs font-medium text-cyan-400">
              TARGET INTEREST RATE
            </TableHead>
            <TableHead className="text-center text-xs font-medium text-cyan-400">
              TARGET TERM
            </TableHead>
            <TableHead 
              className="text-center text-xs font-medium text-cyan-400 cursor-pointer hover:text-white"
              onClick={() => handleSort('status')}
            >
              <div className="flex items-center justify-center">
                STATUS
                <ArrowUpDown className="ml-1 h-3 w-3" />
              </div>
            </TableHead>
            <TableHead className="text-center text-xs font-medium text-cyan-400">
              BID DEADLINE
            </TableHead>
            <TableHead 
              className="text-center text-xs font-medium text-cyan-400 cursor-pointer hover:text-white"
              onClick={() => handleSort('lenderPreferences')}
            >
              <div className="flex items-center justify-center">
                LENDER PREFERENCES
                <ArrowUpDown className="ml-1 h-3 w-3" />
              </div>
            </TableHead>
            <TableHead 
              className="text-center text-xs font-medium text-cyan-400 cursor-pointer hover:text-white"
              onClick={() => handleSort('industry')}
            >
              <div className="flex items-center justify-center">
                INDUSTRY
                <ArrowUpDown className="ml-1 h-3 w-3" />
              </div>
            </TableHead>
            <TableHead 
              className="text-center text-xs font-medium text-cyan-400 cursor-pointer hover:text-white"
              onClick={() => handleSort('bidVolume')}
            >
              <div className="flex items-center justify-center">
                BID VOLUME
                <ArrowUpDown className="ml-1 h-3 w-3" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proposals.length > 0 ? (
            proposals.map((proposal) => (
              <TableRow key={proposal.id} className="border-gray-700 hover:bg-gray-800/20">
                <TableCell className="text-center py-3">
                  <div className="flex justify-center items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700/50"
                      onClick={() => viewProposalDetails(proposal.id)}
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
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={14} className="text-center py-10 text-gray-400">
                No results found. Try adjusting your filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MarketplaceTable;
