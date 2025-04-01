
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FinanceProposal } from "@/types/marketplace";
import TableHeader from "./table/TableHeader";
import TableContent from "./table/TableContent";
import { columnConfig } from "./table/ColumnConfig";

interface MarketplaceTableProps {
  proposals: FinanceProposal[];
  sortField: keyof FinanceProposal | "";
  sortDirection: "asc" | "desc";
  handleSort: (field: keyof FinanceProposal) => void;
  columnFilters: Record<string, string[]>;
  setColumnFilters: (filters: Record<string, string[]>) => void;
}

const MarketplaceTable = ({
  proposals,
  sortField,
  sortDirection,
  handleSort,
  columnFilters,
  setColumnFilters,
}: MarketplaceTableProps) => {
  const navigate = useNavigate();
  const [tempFilters, setTempFilters] = useState<Record<string, string[]>>({});
  
  // Get all unique values for a specific column from the original proposals
  const getColumnValues = (column: keyof FinanceProposal, allProposals: FinanceProposal[]) => {
    const values = [...new Set(allProposals.map(p => String(p[column])))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
    return values;
  };
  
  // For all available proposals, compute unique values for each column
  const [columnValuesMap, setColumnValuesMap] = useState<Record<string, string[]>>({});
  
  // Initialize column values when proposals change
  useEffect(() => {
    const valueMap: Record<string, string[]> = {};
    columnConfig.forEach(column => {
      valueMap[column.key] = getColumnValues(column.key as keyof FinanceProposal, proposals);
    });
    setColumnValuesMap(valueMap);
  }, [proposals]);

  // Initialize tempFilters with current columnFilters
  useEffect(() => {
    setTempFilters(prevTempFilters => {
      const newTempFilters = { ...prevTempFilters };
      Object.entries(columnFilters).forEach(([column, values]) => {
        if (!newTempFilters[column]) {
          newTempFilters[column] = [...values];
        }
      });
      return newTempFilters;
    });
  }, [columnFilters]);

  const viewProposalDetails = (id: string) => {
    navigate(`/proposal/${id}`);
  };

  return (
    <div className="mb-4 relative font-typewriter">
      {/* Table Header with Filter/Sort controls */}
      <TableHeader 
        columnConfig={columnConfig}
        columnValuesMap={columnValuesMap}
        sortField={sortField}
        sortDirection={sortDirection}
        handleSort={handleSort}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />

      {/* Table Content/Body */}
      <TableContent 
        proposals={proposals}
        onViewDetails={viewProposalDetails}
      />
    </div>
  );
};

export default MarketplaceTable;
