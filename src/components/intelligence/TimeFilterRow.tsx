
import { Button } from "@/components/ui/button";

interface TimeFilterRowProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const TimeFilterRow = ({ activeFilter, onFilterChange }: TimeFilterRowProps) => {
  const filters = [
    { value: "last-year", label: "Last Year" },
    { value: "6-months", label: "6 Months" },
    { value: "last-month", label: "Last Month" },
    { value: "last-week", label: "Last Week" },
    { value: "today", label: "Today" },
  ];
  
  return (
    <div className="flex space-x-2 text-xs text-gray-600 font-mono border-b border-gray-800 pb-2">
      {filters.map((filter) => (
        <span 
          key={filter.value}
          className={`px-1 cursor-pointer ${activeFilter === filter.value ? 'border-b border-green-500 text-green-500' : ''}`}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </span>
      ))}
    </div>
  );
};
