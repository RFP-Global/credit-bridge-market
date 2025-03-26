
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import IntelligenceAnalyticsCard from "@/components/IntelligenceAnalyticsCard";
import StructureBarChart from "@/components/charts/StructureBarChart";
import TimeSeriesLineChart from "@/components/charts/TimeSeriesLineChart";

interface BusinessStructureAnalyticsProps {
  timeFilter: string;
  onTimeFilterChange: (value: string) => void;
  structureData: any[];
  structureLoanTermData: any[];
}

const BusinessStructureAnalytics = ({ 
  timeFilter, 
  onTimeFilterChange,
  structureData,
  structureLoanTermData
}: BusinessStructureAnalyticsProps) => {
  const structureLines = [
    { dataKey: "llc", name: "LLC", color: "#33bbef" },
    { dataKey: "corporate", name: "Corporate", color: "#10b981" },
    { dataKey: "partnership", name: "Partnership", color: "#F97316" }
  ];

  return (
    <Card className="bg-black/20 border-gray-800 shadow-lg">
      <CardHeader className="p-3 border-b border-gray-800 bg-black/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-cyan-400 flex items-center">
          Loan Volume by Business Structure
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <IntelligenceAnalyticsCard 
            title="Loan Usage Trends by Structure"
            timeFilter={timeFilter}
            onTimeFilterChange={onTimeFilterChange}
          >
            <StructureBarChart data={structureData} />
          </IntelligenceAnalyticsCard>

          <IntelligenceAnalyticsCard 
            title="Loan Default Rates By Structure"
            timeFilter={timeFilter}
            onTimeFilterChange={onTimeFilterChange}
          >
            <StructureBarChart data={structureData} showRate />
          </IntelligenceAnalyticsCard>

          <IntelligenceAnalyticsCard 
            title="Loan Term Preferences By Structure"
            timeFilter={timeFilter}
            onTimeFilterChange={onTimeFilterChange}
          >
            <TimeSeriesLineChart data={structureLoanTermData} lines={structureLines} />
          </IntelligenceAnalyticsCard>

          <IntelligenceAnalyticsCard 
            title="Loan Application And Approval Trends"
            timeFilter={timeFilter}
            onTimeFilterChange={onTimeFilterChange}
          >
            <StructureBarChart data={structureData.map(item => ({
              ...item,
              workingCapital: item.workingCapital, // Use this for "Approved"
              equipment: item.equipment, // Use this for "Rejected"
              expansion: 0 // Hide this bar
            }))} />
          </IntelligenceAnalyticsCard>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessStructureAnalytics;
