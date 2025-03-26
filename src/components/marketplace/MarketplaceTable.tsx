
import { toast } from "sonner";
import { FinanceProposal } from "@/types/marketplace";
import ProposalRow from "./table/ProposalRow";
import HeaderRow from "./table/HeaderRow";
import EmptyResults from "./table/EmptyResults";

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
    <div className="relative mb-4">
      <HeaderRow 
        sortField={sortField}
        sortDirection={sortDirection}
        handleSort={handleSort}
      />
      
      <div className="mt-2">
        {proposals.length > 0 ? (
          proposals.map((proposal) => (
            <ProposalRow 
              key={proposal.id}
              proposal={proposal} 
              onViewDetails={viewProposalDetails} 
            />
          ))
        ) : (
          <EmptyResults />
        )}
      </div>
    </div>
  );
};

export default MarketplaceTable;
