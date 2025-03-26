
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import IntelligenceAnalyticsCard from "@/components/IntelligenceAnalyticsCard";
import GeoMap from "@/components/GeoMap";

interface GeographyAnalyticsProps {
  timeFilter: string;
  onTimeFilterChange: (value: string) => void;
}

const GeographyAnalytics = ({ 
  timeFilter, 
  onTimeFilterChange 
}: GeographyAnalyticsProps) => {
  return (
    <Card className="bg-black/20 border-gray-800 shadow-lg">
      <CardHeader className="p-3 border-b border-gray-800 bg-black/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-cyan-400 flex items-center">
          Geography
          <ChevronDown className="ml-2 h-4 w-4" />
        </CardTitle>
        <div className="flex space-x-2 text-xs text-gray-400">
          <span className="border-b border-cyan-400 px-1">Last Year</span>
          <span className="px-1">6 Months</span>
          <span className="px-1">Last Month</span>
          <span className="px-1">Last Week</span>
          <span className="px-1">Today</span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <IntelligenceAnalyticsCard 
          title="Loan Demand by Region"
          timeFilter={timeFilter}
          onTimeFilterChange={onTimeFilterChange}
        >
          <GeoMap timeFilter={timeFilter} />
        </IntelligenceAnalyticsCard>
      </CardContent>
    </Card>
  );
};

export default GeographyAnalytics;
