
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
import IndustryBarChart from "@/components/charts/IndustryBarChart";
import IndustryStackedBarChart from "@/components/charts/IndustryStackedBarChart";

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

  // Industry pie data
  const industryPieData = [
    { name: 'Manufacturing', value: 22 },
    { name: 'Construction', value: 26 },
    { name: 'Technology', value: 20 },
    { name: 'Retail', value: 18 },
    { name: 'Healthcare', value: 14 }
  ];

  // Industry terms data for line chart
  const industryTermsData = [
    { month: 'Jan', manufacturing: 22, construction: 20, technology: 25, retail: 15, healthcare: 18 },
    { month: 'Feb', manufacturing: 24, construction: 25, technology: 22, retail: 18, healthcare: 20 },
    { month: 'Mar', manufacturing: 28, construction: 22, technology: 18, retail: 20, healthcare: 25 },
    { month: 'Apr', manufacturing: 30, construction: 18, technology: 15, retail: 25, healthcare: 22 },
    { month: 'May', manufacturing: 35, construction: 15, technology: 20, retail: 22, healthcare: 18 },
    { month: 'Jun', manufacturing: 42, construction: 20, technology: 25, retail: 18, healthcare: 22 }
  ];

  // Industry approval data
  const industryApprovalData = [
    { name: 'Manufacturing', approved: 65, rejected: 35 },
    { name: 'Construction', approved: 58, rejected: 42 },
    { name: 'Technology', approved: 75, rejected: 25 },
    { name: 'Retail', approved: 62, rejected: 38 },
    { name: 'Healthcare', approved: 70, rejected: 30 }
  ];

  return (
    <Card className="bg-black/20 border-gray-800 shadow-lg">
      <CardHeader className="p-3 border-b border-gray-800 bg-black/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-cyan-400 flex items-center">
          Industry Analytics
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
            title="Industry Distribution"
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          >
            <PieChart width={450} height={220}>
              <Pie
                data={industryPieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={50}
                fill="#8884d8"
                dataKey="value"
                label={renderCustomizedLabel}
              >
                {industryPieData.map((entry, index) => (
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
            title="Loan Terms By Industry"
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          >
            <LineChart 
              width={450} 
              height={220} 
              data={industryTermsData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="manufacturing" 
                name="Manufacturing" 
                stroke="#33bbef" 
                strokeWidth={2}
                dot={{ r: 4 }} 
              />
              <Line 
                type="monotone" 
                dataKey="construction" 
                name="Construction" 
                stroke="#0ea5e9" 
                strokeWidth={2}
                dot={{ r: 4 }} 
              />
              <Line 
                type="monotone" 
                dataKey="technology" 
                name="Technology" 
                stroke="#38bdf8" 
                strokeWidth={2}
                dot={{ r: 4 }} 
              />
              <Line 
                type="monotone" 
                dataKey="retail" 
                name="Retail" 
                stroke="#0284c7" 
                strokeWidth={2}
                dot={{ r: 4 }} 
              />
              <Line 
                type="monotone" 
                dataKey="healthcare" 
                name="Healthcare" 
                stroke="#7dd3fc" 
                strokeWidth={2}
                dot={{ r: 4 }} 
              />
            </LineChart>
          </IntelligenceAnalyticsCard>

          <IntelligenceAnalyticsCard 
            title="Loan Approval and Rejection by Industry"
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          >
            <BarChart 
              width={450} 
              height={220} 
              data={industryApprovalData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="approved" name="Approved" fill="#33bbef" />
              <Bar dataKey="rejected" name="Rejected" fill="#0284c7" />
            </BarChart>
          </IntelligenceAnalyticsCard>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessSizeSection;
