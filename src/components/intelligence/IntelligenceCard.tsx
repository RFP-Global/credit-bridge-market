
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface IntelligenceCardProps {
  title: string;
  timeFilter: string;
  children: React.ReactNode;
}

export const IntelligenceCard = ({ title, timeFilter, children }: IntelligenceCardProps) => {
  return (
    <div className="bg-black border border-gray-800 rounded">
      <div className="flex items-center justify-between p-2 border-b border-gray-800">
        <h4 className="text-xs font-mono text-gray-400">{title}</h4>
        <Select defaultValue={timeFilter}>
          <SelectTrigger className="h-6 w-[90px] text-[10px] bg-gray-900 border-gray-700 text-gray-300">
            <SelectValue placeholder="Last Year" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-700 text-gray-300 text-xs">
            <SelectItem value="last-year">Last Year</SelectItem>
            <SelectItem value="6-months">6 Months</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="last-week">Last Week</SelectItem>
            <SelectItem value="today">Today</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="p-2 overflow-hidden">
        {children}
      </div>
    </div>
  );
};
