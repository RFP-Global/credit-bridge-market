import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { FinanceProposal } from "@/types/marketplace";
import SortableTableHeader from "./table/SortableTableHeader";
import StaticTableHeader from "./table/StaticTableHeader";
import ProposalTableRow from "./table/ProposalTableRow";
import EmptyTableRow from "./table/EmptyTableRow";

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

  return (
    <div className="mb-4 relative font-typewriter">
      {/* Separate fixed header */}
      <div className="sticky top-0 z-20 bg-black/90 border-b border-gray-700/30 mb-1">
        <div className="flex w-full">
          <div className="font-mono text-xs text-center text-cyan-400 flex-1 px-4 py-3">CREDIT RATING</div>
          <div className="font-medium text-center text-cyan-400 flex-1 px-4 py-3">PROJECT NAME</div>
          <div className="text-center text-cyan-400 flex-1 px-4 py-3">FACILITY TYPE</div>
          <div className="text-center text-cyan-400 flex-1 px-4 py-3">FINANCING TYPE</div>
          <div className="text-center text-cyan-400 flex-1 px-4 py-3">TARGET PRINCIPAL</div>
          <div className="text-center text-cyan-400 flex-1 px-4 py-3">INTEREST RATE TYPE</div>
          <div className="text-center text-cyan-400 flex-1 px-4 py-3">TARGET INTEREST RATE</div>
          <div className="text-center text-cyan-400 flex-1 px-4 py-3">TARGET TERM</div>
          <div className="text-center text-cyan-400 flex-1 px-4 py-3">STATUS</div>
          <div className="text-center text-cyan-400 flex-1 px-4 py-3">BID DEADLINE</div>
          <div className="text-center text-cyan-400 flex-1 px-4 py-3">LENDER PREFERENCES</div>
          <div className="text-center text-cyan-400 flex-1 px-4 py-3">INDUSTRY</div>
          <div className="text-center text-cyan-400 flex-1 px-4 py-3">BID VOLUME</div>
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
