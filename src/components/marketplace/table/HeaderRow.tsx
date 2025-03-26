
import { ArrowUpDown } from "lucide-react";
import { FinanceProposal } from "@/types/marketplace";

interface HeaderRowProps {
  sortField: keyof FinanceProposal | "";
  sortDirection: "asc" | "desc";
  handleSort: (field: keyof FinanceProposal) => void;
}

const HeaderRow = ({
  sortField,
  sortDirection,
  handleSort,
}: HeaderRowProps) => {
  const renderSortableHeader = (title: string, field: keyof FinanceProposal) => (
    <div 
      className="text-center text-xs font-medium text-cyan-400 cursor-pointer hover:text-white"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center justify-center">
        {title}
        <ArrowUpDown className="ml-1 h-3 w-3" />
      </div>
    </div>
  );

  const renderStaticHeader = (title: string) => (
    <div className="text-center text-xs font-medium text-cyan-400">
      {title}
    </div>
  );

  return (
    <div className="grid grid-cols-14 gap-2 sticky top-0 z-10 bg-transparent/0 py-3">
      <div className="col-span-1"></div>
      {renderSortableHeader("RFP CREDIT RATING", "creditRating")}
      {renderSortableHeader("PROJECT NAME", "projectName")}
      {renderSortableHeader("FACILITY TYPE", "facilityType")}
      {renderSortableHeader("NEW FINANCING OR REFINANCING", "financingType")}
      {renderStaticHeader("TARGET PRINCIPAL")}
      {renderSortableHeader("INTEREST RATE TYPE", "interestRateType")}
      {renderStaticHeader("TARGET INTEREST RATE")}
      {renderStaticHeader("TARGET TERM")}
      {renderSortableHeader("STATUS", "status")}
      {renderStaticHeader("BID DEADLINE")}
      {renderSortableHeader("LENDER PREFERENCES", "lenderPreferences")}
      {renderSortableHeader("INDUSTRY", "industry")}
      {renderSortableHeader("BID VOLUME", "bidVolume")}
    </div>
  );
};

export default HeaderRow;
