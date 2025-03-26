
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from 'lucide-react';
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  Bar, 
  Line, 
  Pie, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell, 
} from "recharts";
import IntelligenceAnalyticsCard from "@/components/IntelligenceAnalyticsCard";
import CustomTooltip from "./CustomTooltip";
import { renderCustomizedLabel, COLORS } from "./ChartUtils";
import TreemapChart from "@/components/charts/TreemapChart";

interface BusinessSizeSectionProps {
  timeFilter: string;
  setTimeFilter: (filter: string) => void;
  loanRequestData: any[];
  pieBusinessSizeData: any[];
  timeSeriesData: any[];
  loanApprovalData: any[];
}

const BusinessSizeSection: React.FC<BusinessSizeSectionProps> = ({
  timeFilter,
  setTimeFilter,
  loanRequestData,
  pieBusinessSizeData,
  timeSeriesData,
  loanApprovalData
}) => {
  // Industry loan request data with 7 industries
  const industryLoanRequestData = [
    { name: 'Manufacturing', size: 350 },
    { name: 'Construction', size: 300 },
    { name: 'Technology', size: 280 },
    { name: 'Retail', size: 220 },
    { name: 'Healthcare', size: 180 },
    { name: 'Financial Services', size: 150 },
    { name: 'Hospitality', size: 120 }
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
            title="Loan Request Size by Industry"
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          >
            <TreemapChart data={industryLoanRequestData} />
          </IntelligenceAnalyticsCard>

          <IntelligenceAnalyticsCard 
            title="Loan Default Distribution By Business Size"
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          >
            <PieChart width={450} height={220}>
              <Pie
                data={pieBusinessSizeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={50}
                fill="#8884d8"
                dataKey="value"
                label={renderCustomizedLabel}
              >
                {pieBusinessSizeData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke="rgba(0,0,0,0.3)"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right"
                wrapperStyle={{ right: 10, top: 0, fontSize: '12px' }}
              />
            </PieChart>
          </IntelligenceAnalyticsCard>

          <IntelligenceAnalyticsCard 
            title="Loan Terms By Business Size"
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          >
            <LineChart 
              width={450} 
              height={220} 
              data={timeSeriesData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="small" 
                name="Small Business" 
                stroke="#33bbef" 
                strokeWidth={2}
                dot={{ r: 4 }} 
              />
              <Line 
                type="monotone" 
                dataKey="medium" 
                name="Medium Business" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ r: 4 }} 
              />
              <Line 
                type="monotone" 
                dataKey="large" 
                name="Large Business" 
                stroke="#F97316" 
                strokeWidth={2}
                dot={{ r: 4 }} 
              />
            </LineChart>
          </IntelligenceAnalyticsCard>

          <IntelligenceAnalyticsCard 
            title="Loan Approval and Rejection Rates"
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          >
            <BarChart 
              width={450} 
              height={220} 
              data={loanApprovalData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
              <XAxis dataKey="category" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="approved" name="Approved" fill="#10b981" />
              <Bar dataKey="rejected" name="Rejected" fill="#F97316" />
            </BarChart>
          </IntelligenceAnalyticsCard>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessSizeSection;
