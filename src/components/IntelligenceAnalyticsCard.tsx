
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
    <Card className="bg-black/30 border-green-900 shadow-lg overflow-hidden terminal-card">
      <CardHeader className="p-3 border-b border-green-800 bg-black/40">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-mono text-green-500">{title}</CardTitle>
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
