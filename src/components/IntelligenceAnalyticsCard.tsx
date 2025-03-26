
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import IntelligenceTimeFilter from "./IntelligenceTimeFilter";

interface IntelligenceAnalyticsCardProps {
  title: string;
  description?: string;
  timeFilter: string;
  onTimeFilterChange: (value: string) => void;
  children: React.ReactNode;
}

const IntelligenceAnalyticsCard = ({
  title,
  description,
  timeFilter,
  onTimeFilterChange,
  children
}: IntelligenceAnalyticsCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          <IntelligenceTimeFilter value={timeFilter} onChange={onTimeFilterChange} />
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="w-full flex items-center justify-center">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default IntelligenceAnalyticsCard;
