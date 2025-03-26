
import { ArrowDown, ArrowUp, ArrowsUpDown } from "lucide-react";
import { TableHead } from "@/components/ui/table";
import { FinanceProposal } from "@/types/marketplace";

interface SortableTableHeaderProps {
  title: string;
  field: keyof FinanceProposal;
  sortField: keyof FinanceProposal | "";
  sortDirection: "asc" | "desc";
  handleSort: (field: keyof FinanceProposal) => void;
}

const SortableTableHeader = ({
  title,
  field,
  sortField,
  sortDirection,
  handleSort,
}: SortableTableHeaderProps) => {
  const isCurrentSortField = sortField === field;
  
  return (
    <TableHead 
      className={`text-center text-xs font-medium cursor-pointer hover:text-white bg-transparent sticky top-0 z-10 transition-colors duration-150 ${
        isCurrentSortField ? 'text-white' : 'text-cyan-400'
      }`}
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center justify-center">
        {title}
        <span className="ml-1">
          {isCurrentSortField ? (
            sortDirection === "asc" ? (
              <ArrowUp className="h-3 w-3" />
            ) : (
              <ArrowDown className="h-3 w-3" />
            )
          ) : (
            <ArrowsUpDown className="h-3 w-3 opacity-70" />
          )}
        </span>
      </div>
    </TableHead>
  );
};

export default SortableTableHeader;
