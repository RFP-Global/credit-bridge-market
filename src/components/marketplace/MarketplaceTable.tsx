
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { FinanceProposal } from "@/types/marketplace";
import { Radar } from "lucide-react";
import ProposalTableRow from "./table/ProposalTableRow";
import EmptyTableRow from "./table/EmptyTableRow";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface MarketplaceTableProps {
  proposals: FinanceProposal[];
  sortField: keyof FinanceProposal | "";
  sortDirection: "asc" | "desc";
  handleSort: (field: keyof FinanceProposal) => void;
  columnFilters: Record<string, string>;
  setColumnFilters: (filters: Record<string, string>) => void;
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
  const [tempFilters, setTempFilters] = useState<Record<string, string>>({});

  const viewProposalDetails = (id: string) => {
    navigate(`/proposal/${id}`);
  };

  const handleFilterChange = (column: string, value: string) => {
    setTempFilters(prev => ({ ...prev, [column]: value }));
  };

  const applyFilter = (column: string) => {
    setColumnFilters({
      ...columnFilters,
      [column]: tempFilters[column] || ""
    });
  };

  const clearFilter = (column: string) => {
    const newFilters = { ...columnFilters };
    delete newFilters[column];
    setColumnFilters(newFilters);
    
    const newTempFilters = { ...tempFilters };
    delete newTempFilters[column];
    setTempFilters(newTempFilters);
  };

  const columnConfig = [
    { key: "creditRating", label: "CREDIT RATING" },
    { key: "projectName", label: "PROJECT NAME" },
    { key: "facilityType", label: "FACILITY TYPE" },
    { key: "financingType", label: "FINANCING TYPE" },
    { key: "principal", label: "TARGET PRINCIPAL" },
    { key: "interestRateType", label: "INTEREST RATE TYPE" },
    { key: "interestRate", label: "TARGET INTEREST RATE" },
    { key: "term", label: "TARGET TERM" },
    { key: "status", label: "STATUS" },
    { key: "bidDeadline", label: "BID DEADLINE" },
    { key: "lenderPreferences", label: "LENDER PREFERENCES" },
    { key: "industry", label: "INDUSTRY" },
    { key: "bidVolume", label: "BID VOLUME" }
  ];

  return (
    <div className="mb-4 relative font-typewriter">
      {/* Separate fixed header */}
      <div className="sticky top-0 z-20 bg-black/90 border-b border-gray-700/30 mb-1">
        <div className="flex w-full">
          {columnConfig.map((column) => (
            <div key={column.key} className="flex-1 text-center text-xs font-medium text-cyan-400 px-4 py-3 relative">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center mb-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`h-5 w-5 p-0 rounded-full hover:bg-cyan-400/20 ${columnFilters[column.key] ? 'text-cyan-400' : 'text-gray-500'}`}
                      >
                        <Radar className="h-3.5 w-3.5" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-3 bg-black/90 border-gray-700/50 backdrop-blur-sm">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm text-cyan-400">Filter {column.label}</h4>
                        <Input
                          placeholder="Filter value..."
                          value={tempFilters[column.key] || ""}
                          onChange={(e) => handleFilterChange(column.key, e.target.value)}
                          className="bg-black/30 border-gray-700/50 text-gray-300"
                        />
                        <div className="flex justify-between pt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => clearFilter(column.key)}
                            className="border-gray-700/50 text-gray-300 hover:bg-gray-800"
                          >
                            Clear
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => applyFilter(column.key)}
                            className="bg-cyan-500/80 hover:bg-cyan-600 text-black"
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                {column.label}
              </div>
            </div>
          ))}
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
