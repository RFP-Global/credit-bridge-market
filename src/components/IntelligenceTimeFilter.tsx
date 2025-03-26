
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface IntelligenceTimeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const IntelligenceTimeFilter = ({ value, onChange }: IntelligenceTimeFilterProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-8 w-[140px] text-xs">
        <SelectValue placeholder="Select time range" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="last-day">Last Day</SelectItem>
        <SelectItem value="last-week">Last Week</SelectItem>
        <SelectItem value="last-month">Last Month</SelectItem>
        <SelectItem value="last-quarter">Last Quarter</SelectItem>
        <SelectItem value="last-year">Last Year</SelectItem>
        <SelectItem value="all-time">All Time</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default IntelligenceTimeFilter;
