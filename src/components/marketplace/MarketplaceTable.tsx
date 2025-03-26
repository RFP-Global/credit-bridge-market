
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
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
  const viewProposalDetails = (id: string) => {
    toast.info(`Viewing details for proposal ${id}`);
  };

  return (
    <div className="rounded-sm overflow-hidden mb-4 relative border-0">
      <Table>
        <TableHeader className="sticky top-0 z-20">
          <TableRow className="border-gray-700/30 hover:bg-transparent bg-transparent">
            <StaticTableHeader title="" />
            <SortableTableHeader 
              title="RFP CREDIT RATING" 
              field="creditRating" 
              sortField={sortField}
              sortDirection={sortDirection}
              handleSort={handleSort}
            />
            <SortableTableHeader 
              title="PROJECT NAME" 
              field="projectName" 
              sortField={sortField}
              sortDirection={sortDirection}
              handleSort={handleSort}
            />
            <SortableTableHeader 
              title="FACILITY TYPE" 
              field="facilityType" 
              sortField={sortField}
              sortDirection={sortDirection}
              handleSort={handleSort}
            />
            <SortableTableHeader 
              title="NEW FINANCING OR REFINANCING" 
              field="financingType" 
              sortField={sortField}
              sortDirection={sortDirection}
              handleSort={handleSort}
            />
            <StaticTableHeader title="TARGET PRINCIPAL" />
            <SortableTableHeader 
              title="INTEREST RATE TYPE" 
              field="interestRateType" 
              sortField={sortField}
              sortDirection={sortDirection}
              handleSort={handleSort}
            />
            <StaticTableHeader title="TARGET INTEREST RATE" />
            <StaticTableHeader title="TARGET TERM" />
            <SortableTableHeader 
              title="STATUS" 
              field="status" 
              sortField={sortField}
              sortDirection={sortDirection}
              handleSort={handleSort}
            />
            <StaticTableHeader title="BID DEADLINE" />
            <SortableTableHeader 
              title="LENDER PREFERENCES" 
              field="lenderPreferences" 
              sortField={sortField}
              sortDirection={sortDirection}
              handleSort={handleSort}
            />
            <SortableTableHeader 
              title="INDUSTRY" 
              field="industry" 
              sortField={sortField}
              sortDirection={sortDirection}
              handleSort={handleSort}
            />
            <SortableTableHeader 
              title="BID VOLUME" 
              field="bidVolume" 
              sortField={sortField}
              sortDirection={sortDirection}
              handleSort={handleSort}
            />
          </TableRow>
        </TableHeader>
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
  );
};

export default MarketplaceTable;
