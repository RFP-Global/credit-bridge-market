
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IntelligenceTimeFilter from "./IntelligenceTimeFilter";

interface IntelligenceAnalyticsCardProps {
  title: string;
  timeFilter: string;
  onTimeFilterChange: (value: string) => void;
  children: React.ReactNode;
}

const IntelligenceAnalyticsCard = ({
  title,
  timeFilter,
  onTimeFilterChange,
  children
}: IntelligenceAnalyticsCardProps) => {
  return (
    <Card className="bg-black/30 border-gray-800 shadow-lg overflow-hidden">
      <CardHeader className="p-3 border-b border-gray-800 bg-black/40">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-cyan-400">{title}</CardTitle>
          <IntelligenceTimeFilter value={timeFilter} onChange={onTimeFilterChange} />
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <div className="w-full flex items-center justify-center">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default IntelligenceAnalyticsCard;
