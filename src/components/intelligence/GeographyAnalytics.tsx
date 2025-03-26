
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Globe } from "lucide-react";
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
    <Card className="bg-black/20 border-green-900 shadow-lg">
      <CardHeader className="p-3 border-b border-green-900 bg-black/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-mono text-green-500 flex items-center">
          <Globe className="h-4 w-4 mr-2" />
          GEO_INTELLIGENCE
          <ChevronDown className="ml-2 h-4 w-4" />
        </CardTitle>
        <div className="flex space-x-2 text-xs text-green-600 font-mono">
          <span className="border-b border-green-500 px-1">YEAR_BACK</span>
          <span className="px-1">SIX_MONTHS</span>
          <span className="px-1">MONTH_BACK</span>
          <span className="px-1">WEEK_BACK</span>
          <span className="px-1">TODAY</span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <IntelligenceAnalyticsCard 
          title="GEO_LOAN_DEMAND//ANALYSIS"
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
