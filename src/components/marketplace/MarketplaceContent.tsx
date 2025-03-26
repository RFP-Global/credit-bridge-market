
import { FinanceProposal } from "@/types/marketplace";
import MarketplaceTable from "@/components/marketplace/MarketplaceTable";

interface MarketplaceContentProps {
  proposals: FinanceProposal[];
  sortField: keyof FinanceProposal | "";
  sortDirection: "asc" | "desc";
  handleSort: (field: keyof FinanceProposal) => void;
}

const MarketplaceContent = ({
  proposals,
  sortField,
  sortDirection,
  handleSort,
}: MarketplaceContentProps) => {
  return (
    <MarketplaceTable 
      proposals={proposals}
      sortField={sortField}
      sortDirection={sortDirection}
      handleSort={handleSort}
    />
  );
};

export default MarketplaceContent;
