
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import IntelligenceAnalyticsCard from "@/components/IntelligenceAnalyticsCard";
import BusinessSizeBarChart from "@/components/charts/BusinessSizeBarChart";
import BusinessSizePieChart from "@/components/charts/BusinessSizePieChart";
import TimeSeriesLineChart from "@/components/charts/TimeSeriesLineChart";
import ApprovalRateBarChart from "@/components/charts/ApprovalRateBarChart";
import { COLORS } from "@/components/charts/ChartUtils";

interface BusinessSizeAnalyticsProps {
  timeFilter: string;
  onTimeFilterChange: (value: string) => void;
  loanRequestData: any[];
  pieBusinessSizeData: any[];
  timeSeriesData: any[];
  loanApprovalData: any[];
}

const BusinessSizeAnalytics = ({ 
  timeFilter, 
  onTimeFilterChange,
  loanRequestData,
  pieBusinessSizeData,
  timeSeriesData,
  loanApprovalData
}: BusinessSizeAnalyticsProps) => {
  const timeSeriesLines = [
    { dataKey: "small", name: "Small Business", color: "#33bbef" },
    { dataKey: "medium", name: "Medium Business", color: "#10b981" },
    { dataKey: "large", name: "Large Business", color: "#F97316" }
  ];

  return (
    <Card className="bg-black/20 border-gray-800 shadow-lg">
      <CardHeader className="p-3 border-b border-gray-800 bg-black/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-cyan-400 flex items-center">
          Business Size Analytics
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
            title="Loan Request Patterns by Size"
            timeFilter={timeFilter}
            onTimeFilterChange={onTimeFilterChange}
          >
            <BusinessSizeBarChart data={loanRequestData} />
          </IntelligenceAnalyticsCard>

          <IntelligenceAnalyticsCard 
            title="Loan Default Distribution By Business Size"
            timeFilter={timeFilter}
            onTimeFilterChange={onTimeFilterChange}
          >
            <BusinessSizePieChart data={pieBusinessSizeData} colors={COLORS} />
          </IntelligenceAnalyticsCard>

          <IntelligenceAnalyticsCard 
            title="Loan Terms By Business Size"
            timeFilter={timeFilter}
            onTimeFilterChange={onTimeFilterChange}
          >
            <TimeSeriesLineChart data={timeSeriesData} lines={timeSeriesLines} />
          </IntelligenceAnalyticsCard>

          <IntelligenceAnalyticsCard 
            title="Loan Approval and Rejection Rates"
            timeFilter={timeFilter}
            onTimeFilterChange={onTimeFilterChange}
          >
            <ApprovalRateBarChart data={loanApprovalData} />
          </IntelligenceAnalyticsCard>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessSizeAnalytics;
