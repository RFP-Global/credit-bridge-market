
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import IntelligenceAnalyticsCard from "@/components/IntelligenceAnalyticsCard";
import IndustryStackedBarChart from "@/components/charts/IndustryStackedBarChart";
import IndustryBarChart from "@/components/charts/IndustryBarChart";
import TimeSeriesLineChart from "@/components/charts/TimeSeriesLineChart";
import BusinessSizePieChart from "@/components/charts/BusinessSizePieChart";
import { COLORS } from "@/components/charts/ChartUtils";

interface IndustryTypeAnalyticsProps {
  timeFilter: string;
  onTimeFilterChange: (value: string) => void;
  industryStackedData: any[];
  industryData: any[];
  industryLoanTermData: any[];
  industryPieData: any[];
}

const IndustryTypeAnalytics = ({ 
  timeFilter, 
  onTimeFilterChange,
  industryStackedData,
  industryData,
  industryLoanTermData,
  industryPieData
}: IndustryTypeAnalyticsProps) => {
  const industryLines = [
    { dataKey: "retail", name: "Retail", color: "#F97316" },
    { dataKey: "tech", name: "Tech", color: "#10b981" },
    { dataKey: "construction", name: "Construction", color: "#8B5CF6" },
    { dataKey: "manufacturing", name: "Manufacturing", color: "#33bbef" }
  ];

  return (
    <Card className="bg-black/20 border-gray-800 shadow-lg">
      <CardHeader className="p-3 border-b border-gray-800 bg-black/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-cyan-400 flex items-center">
          Industry Type Analytics
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
            title="Loan Usage Trends by Industry"
            timeFilter={timeFilter}
            onTimeFilterChange={onTimeFilterChange}
          >
            <IndustryStackedBarChart data={industryStackedData} />
          </IntelligenceAnalyticsCard>

          <IntelligenceAnalyticsCard 
            title="Loan Default Rates By Industry"
            timeFilter={timeFilter}
            onTimeFilterChange={onTimeFilterChange}
          >
            <IndustryBarChart data={industryData} />
          </IntelligenceAnalyticsCard>

          <IntelligenceAnalyticsCard 
            title="Loan Term Preferences By Industry"
            timeFilter={timeFilter}
            onTimeFilterChange={onTimeFilterChange}
          >
            <TimeSeriesLineChart data={industryLoanTermData} lines={industryLines} />
          </IntelligenceAnalyticsCard>

          <IntelligenceAnalyticsCard 
            title="Industry-Specific Loan Volume Distribution"
            timeFilter={timeFilter}
            onTimeFilterChange={onTimeFilterChange}
          >
            <BusinessSizePieChart data={industryPieData} colors={COLORS} />
          </IntelligenceAnalyticsCard>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndustryTypeAnalytics;
