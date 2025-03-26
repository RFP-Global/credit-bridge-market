
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface IntelligenceTimeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const IntelligenceTimeFilter = ({ value, onChange }: IntelligenceTimeFilterProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-8 w-[120px] text-xs bg-black/60 border-green-800 text-green-400 font-mono">
        <SelectValue placeholder="Last Year" />
      </SelectTrigger>
      <SelectContent className="bg-black/90 border-green-800 text-green-400 font-mono">
        <SelectItem value="last-day">LAST_DAY</SelectItem>
        <SelectItem value="last-week">LAST_WEEK</SelectItem>
        <SelectItem value="last-month">LAST_MONTH</SelectItem>
        <SelectItem value="last-quarter">LAST_QUARTER</SelectItem>
        <SelectItem value="last-year">LAST_YEAR</SelectItem>
        <SelectItem value="all-time">ALL_TIME</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default IntelligenceTimeFilter;
