
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { FinanceProposal } from "@/types/marketplace";
import ProposalTableRow from "./table/ProposalTableRow";
import EmptyTableRow from "./table/EmptyTableRow";
import { ArrowDown, ArrowUp } from "lucide-react";

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
  const navigate = useNavigate();

  const viewProposalDetails = (id: string) => {
    navigate(`/proposal/${id}`);
  };

  // Function to render column header with sort indicators
  const renderColumnHeader = (field: keyof FinanceProposal, title: string) => {
    return (
      <div 
        className="font-mono text-xs text-center text-cyan-400 flex-1 px-4 py-3 cursor-pointer hover:text-white flex items-center justify-center"
        onClick={() => handleSort(field)}
      >
        {title}
        {sortField === field && (
          <span className="ml-1">
            {sortDirection === "asc" ? (
              <ArrowUp className="h-3 w-3 inline" />
            ) : (
              <ArrowDown className="h-3 w-3 inline" />
            )}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="mb-4 relative">
      {/* Separate fixed header */}
      <div className="sticky top-0 z-20 bg-black/90 border-b border-gray-700/30 mb-1">
        <div className="flex w-full">
          {renderColumnHeader("creditRating", "CREDIT RATING")}
          {renderColumnHeader("projectName", "PROJECT NAME")}
          {renderColumnHeader("facilityType", "FACILITY TYPE")}
          {renderColumnHeader("financingType", "FINANCING TYPE")}
          {renderColumnHeader("principal", "TARGET PRINCIPAL")}
          {renderColumnHeader("interestRateType", "INTEREST RATE TYPE")}
          {renderColumnHeader("interestRate", "TARGET INTEREST RATE")}
          {renderColumnHeader("term", "TARGET TERM")}
          {renderColumnHeader("status", "STATUS")}
          {renderColumnHeader("bidDeadline", "BID DEADLINE")}
          {renderColumnHeader("lenderPreferences", "LENDER PREFERENCES")}
          {renderColumnHeader("industry", "INDUSTRY")}
          {renderColumnHeader("bidVolume", "BID VOLUME")}
        </div>
      </div>

      {/* Scrollable table content */}
      <div className="rounded-sm overflow-hidden border-0">
        <Table>
          <TableBody>
            {proposals.length > 0 ? (
              proposals.map((proposal) => (
                <ProposalTableRow 
                  key={proposal.id}
                  proposal={proposal} 
                  onViewDetails={viewProposalDetails} 
                />
              ))
            ) : (
              <EmptyTableRow />
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MarketplaceTable;
