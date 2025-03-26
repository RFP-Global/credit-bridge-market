
import { ArrowUpDown } from "lucide-react";
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
  return (
    <TableHead 
      className="text-center text-xs font-medium text-cyan-400 cursor-pointer hover:text-white bg-transparent sticky top-0 z-10"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center justify-center">
        {title}
        <ArrowUpDown className="ml-1 h-3 w-3" />
      </div>
    </TableHead>
  );
};

export default SortableTableHeader;
