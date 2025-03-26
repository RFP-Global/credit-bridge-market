
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { FinanceProposal } from "@/types/marketplace";
import { Radar, Check, ArrowDown, ArrowUp, ArrowDownAZ, ArrowUpAZ, ArrowDownZA, ArrowUpZA } from "lucide-react";
import ProposalTableRow from "./table/ProposalTableRow";
import EmptyTableRow from "./table/EmptyTableRow";
import SortableTableHeader from "./table/SortableTableHeader";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState, useEffect, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

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
  
  // For each column config, generate available options from all proposals
  const columnConfig = useMemo(() => [
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
  ], []);
  
  // For all available proposals, compute unique values for each column
  const [columnValuesMap, setColumnValuesMap] = useState<Record<string, string[]>>({});
  
  // Initialize column values when proposals change
  useEffect(() => {
    const valueMap: Record<string, string[]> = {};
    columnConfig.forEach(column => {
      valueMap[column.key] = getColumnValues(column.key as keyof FinanceProposal, proposals);
    });
    setColumnValuesMap(valueMap);
  }, [proposals, columnConfig]);

  const viewProposalDetails = (id: string) => {
    navigate(`/proposal/${id}`);
  };

  // Check if a value is selected in the filter
  const isValueSelected = (column: string, value: string) => {
    return tempFilters[column]?.includes(value) || false;
  };

  // Toggle a single value in the filter
  const toggleValue = (column: string, value: string) => {
    setTempFilters(prev => {
      const currentValues = prev[column] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return { ...prev, [column]: newValues };
    });
  };

  // Select all values for a column
  const selectAll = (column: string) => {
    setTempFilters(prev => ({
      ...prev,
      [column]: [...columnValuesMap[column]]
    }));
  };

  // Clear all values for a column
  const selectNone = (column: string) => {
    setTempFilters(prev => ({
      ...prev,
      [column]: []
    }));
  };

  // Apply filter for a column
  const applyFilter = (column: string) => {
    setColumnFilters({
      ...columnFilters,
      [column]: tempFilters[column] || []
    });
  };

  // Clear filter for a column
  const clearFilter = (column: string) => {
    const newFilters = { ...columnFilters };
    delete newFilters[column];
    setColumnFilters(newFilters);
    
    const newTempFilters = { ...tempFilters };
    delete newTempFilters[column];
    setTempFilters(newTempFilters);
  };

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

  // Simple sort handler with notification
  const handleSortWithNotification = (field: keyof FinanceProposal, direction?: "asc" | "desc") => {
    // If direction is specified, we'll set that direction
    if (direction) {
      if (sortField === field && sortDirection === direction) {
        // If already sorting by this field and direction, clear sort
        handleSort("" as keyof FinanceProposal);
        toast.info(`Cleared sorting`);
      } else {
        // Set field and handle direction toggle if needed
        handleSort(field);
        if (sortField === field && sortDirection !== direction) {
          // Toggle once more to get desired direction
          handleSort(field);
        } else if (sortField !== field && sortDirection !== direction) {
          // Toggle once more to get desired direction after setting new field
          handleSort(field);
        }
        toast.info(`Sorted by ${field} ${direction === 'asc' ? 'ascending' : 'descending'}`);
      }
    } else {
      // Just toggle as normal
      handleSort(field);
      toast.info(`Toggled sort on ${field}`);
    }
  };

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
                        className={`h-5 w-5 p-0 rounded-full hover:bg-cyan-400/20 ${
                          columnFilters[column.key]?.length > 0 || sortField === column.key ? 'text-cyan-400' : 'text-gray-500'
                        }`}
                      >
                        <Radar className="h-3.5 w-3.5" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-3 bg-black/90 border-gray-700/50 backdrop-blur-sm">
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-cyan-400">Filter {column.label}</h4>
                        
                        {/* Sort Options */}
                        <div>
                          <h5 className="text-xs text-gray-400 mb-1">Sort</h5>
                          <ToggleGroup type="single" variant="outline" className="flex justify-between border-gray-700/50 rounded-md p-0.5 bg-black/50 w-full">
                            <ToggleGroupItem 
                              value="asc" 
                              size="sm"
                              className={`flex-1 text-xs h-8 ${sortField === column.key && sortDirection === 'asc' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'text-gray-400'}`}
                              onClick={() => handleSortWithNotification(column.key as keyof FinanceProposal, 'asc')}
                            >
                              <ArrowUp className="h-3 w-3 mr-1" /> Ascending
                            </ToggleGroupItem>
                            <ToggleGroupItem 
                              value="desc" 
                              size="sm"
                              className={`flex-1 text-xs h-8 ${sortField === column.key && sortDirection === 'desc' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'text-gray-400'}`}
                              onClick={() => handleSortWithNotification(column.key as keyof FinanceProposal, 'desc')}
                            >
                              <ArrowDown className="h-3 w-3 mr-1" /> Descending
                            </ToggleGroupItem>
                          </ToggleGroup>
                        </div>

                        <Separator className="bg-gray-700/30" />
                        
                        <div className="flex justify-between">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => selectAll(column.key)}
                            className="border-gray-700/50 text-gray-300 hover:bg-gray-800 text-xs"
                          >
                            Select All
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => selectNone(column.key)}
                            className="border-gray-700/50 text-gray-300 hover:bg-gray-800 text-xs"
                          >
                            Select None
                          </Button>
                        </div>
                        
                        <ScrollArea className="h-[200px] pr-4">
                          <div className="space-y-2">
                            {columnValuesMap[column.key]?.map((value, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`${column.key}-${index}`} 
                                  checked={isValueSelected(column.key, value)}
                                  onCheckedChange={() => toggleValue(column.key, value)}
                                  className="data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                                />
                                <label 
                                  htmlFor={`${column.key}-${index}`}
                                  className="text-sm text-gray-300 truncate"
                                >
                                  {value}
                                </label>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                        
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
                  
                  {/* Add dropdown menu for quick sort */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 p-0 ml-1 rounded-full hover:bg-cyan-400/20 text-gray-500 hover:text-cyan-400"
                      >
                        {sortField === column.key ? (
                          sortDirection === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                        ) : (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      className="w-48 bg-black/90 border-gray-700/50 backdrop-blur-sm text-xs"
                      align="end"
                    >
                      <DropdownMenuItem 
                        className={`${sortField === column.key && sortDirection === 'asc' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300'}`}
                        onClick={() => handleSortWithNotification(column.key as keyof FinanceProposal, 'asc')}
                      >
                        <ArrowUpAZ className="h-3.5 w-3.5 mr-2" /> Sort A → Z
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className={`${sortField === column.key && sortDirection === 'desc' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300'}`}
                        onClick={() => handleSortWithNotification(column.key as keyof FinanceProposal, 'desc')}
                      >
                        <ArrowDownZA className="h-3.5 w-3.5 mr-2" /> Sort Z → A
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-700/30" />
                      <DropdownMenuItem 
                        className="text-gray-300"
                        onClick={() => {
                          handleSort("" as keyof FinanceProposal);
                          toast.info(`Cleared sorting on ${column.key}`);
                        }}
                      >
                        <ArrowUpDown className="h-3.5 w-3.5 mr-2" /> Clear Sort
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center">
                  {column.label}
                  {sortField === column.key && (
                    <span className="ml-1 text-cyan-400">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
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
