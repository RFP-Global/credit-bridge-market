
import { ArrowUp, ArrowDown } from "lucide-react";
import { FinanceProposal } from "@/types/marketplace";
import FilterPopover from "./FilterPopover";

interface TableHeaderProps {
  columnConfig: Array<{key: string, label: string}>;
  columnValuesMap: Record<string, string[]>;
  sortField: keyof FinanceProposal | "";
  sortDirection: "asc" | "desc";
  handleSort: (field: keyof FinanceProposal) => void;
  columnFilters: Record<string, string[]>;
  setColumnFilters: (filters: Record<string, string[]>) => void;
}

const TableHeader = ({
  columnConfig,
  columnValuesMap,
  sortField,
  sortDirection,
  handleSort,
  columnFilters,
  setColumnFilters,
}: TableHeaderProps) => {
  return (
    <div className="sticky top-0 z-20 bg-black/90 border-b border-gray-700/30 mb-1">
      <div className="flex w-full">
        {columnConfig.map((column) => (
          <div key={column.key} className="flex-1 text-center text-xs font-medium text-cyan-400 px-4 py-3 relative">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center mb-1">
                <FilterPopover
                  column={column}
                  columnValues={columnValuesMap[column.key] || []}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  handleSort={handleSort}
                  columnFilters={columnFilters}
                  setColumnFilters={setColumnFilters}
                />
              </div>
              {column.label}
              {sortField === column.key && (
                <div className="absolute -right-1 top-3">
                  {sortDirection === 'asc' ? (
                    <ArrowUp className="h-3 w-3 text-cyan-400" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-cyan-400" />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableHeader;
