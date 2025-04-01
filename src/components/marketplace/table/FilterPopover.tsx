
import { useState, useEffect } from "react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Radar, ArrowUp, ArrowDown } from "lucide-react";
import { FinanceProposal } from "@/types/marketplace";

interface FilterPopoverProps {
  column: {
    key: string;
    label: string;
  };
  columnValues: string[];
  sortField: keyof FinanceProposal | "";
  sortDirection: "asc" | "desc";
  handleSort: (field: keyof FinanceProposal) => void;
  columnFilters: Record<string, string[]>;
  setColumnFilters: (filters: Record<string, string[]>) => void;
}

const FilterPopover = ({
  column,
  columnValues,
  sortField,
  sortDirection,
  handleSort,
  columnFilters,
  setColumnFilters,
}: FilterPopoverProps) => {
  const [tempFilters, setTempFilters] = useState<string[]>([]);

  // Initialize tempFilters with current columnFilters when opened
  useEffect(() => {
    setTempFilters(columnFilters[column.key] || []);
  }, [columnFilters, column.key]);

  // Check if a value is selected in the filter
  const isValueSelected = (value: string) => {
    return tempFilters.includes(value);
  };

  // Toggle a single value in the filter
  const toggleValue = (value: string) => {
    setTempFilters(prev => {
      return prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value];
    });
  };

  // Select all values for a column
  const selectAll = () => {
    setTempFilters([...columnValues]);
  };

  // Clear all values for a column
  const selectNone = () => {
    setTempFilters([]);
  };

  // Apply filter for a column
  const applyFilter = () => {
    setColumnFilters({
      ...columnFilters,
      [column.key]: [...tempFilters]
    });
  };

  // Clear filter for a column
  const clearFilter = () => {
    const newFilters = { ...columnFilters };
    delete newFilters[column.key];
    setColumnFilters(newFilters);
    setTempFilters([]);
  };

  return (
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
            <ToggleGroup 
              type="single" 
              variant="outline" 
              className="flex justify-between border-gray-700/50 rounded-md p-0.5 bg-black/50 w-full"
            >
              <ToggleGroupItem 
                value="asc" 
                size="sm"
                className={`flex-1 text-xs h-8 ${sortField === column.key && sortDirection === 'asc' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'text-gray-400'}`}
                onClick={() => {
                  if (sortField === column.key && sortDirection === 'asc') {
                    // Unset the sort if it's already set to this field and direction
                    handleSort("" as keyof FinanceProposal);
                  } else {
                    // Set the field and direction
                    handleSort(column.key as keyof FinanceProposal);
                    if (sortDirection !== 'asc') {
                      // Force asc
                      handleSort(column.key as keyof FinanceProposal);
                    }
                  }
                }}
              >
                <ArrowUp className="h-3 w-3 mr-1" /> Ascending
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="desc" 
                size="sm"
                className={`flex-1 text-xs h-8 ${sortField === column.key && sortDirection === 'desc' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'text-gray-400'}`}
                onClick={() => {
                  if (sortField === column.key && sortDirection === 'desc') {
                    // Unset the sort if it's already set to this field and direction
                    handleSort("" as keyof FinanceProposal);
                  } else {
                    // Set the field
                    handleSort(column.key as keyof FinanceProposal);
                    // If we're already on this field but in asc, this will toggle to desc
                    // If we're on a different field, we need to toggle twice to get to desc
                    if (sortField !== column.key) {
                      handleSort(column.key as keyof FinanceProposal);
                    }
                  }
                }}
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
              onClick={selectAll}
              className="border-gray-700/50 text-gray-300 hover:bg-gray-800 text-xs"
            >
              Select All
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={selectNone}
              className="border-gray-700/50 text-gray-300 hover:bg-gray-800 text-xs"
            >
              Select None
            </Button>
          </div>
          
          <ScrollArea className="h-[200px] pr-4">
            <div className="space-y-2">
              {columnValues.map((value, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`${column.key}-${index}`} 
                    checked={isValueSelected(value)}
                    onCheckedChange={() => toggleValue(value)}
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
              onClick={clearFilter}
              className="border-gray-700/50 text-gray-300 hover:bg-gray-800"
            >
              Clear
            </Button>
            <Button 
              size="sm" 
              onClick={applyFilter}
              className="bg-cyan-500/80 hover:bg-cyan-600 text-black"
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterPopover;
