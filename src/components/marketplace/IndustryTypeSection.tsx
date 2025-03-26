
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

interface IndustryTypeSectionProps {
  timeFilter: string;
  setTimeFilter: (filter: string) => void;
  industryStackedData: any[];
  industryData: any[];
  industryLoanTermData: any[];
  industryPieData: any[];
}

const IndustryTypeSection: React.FC<IndustryTypeSectionProps> = ({
  timeFilter,
  setTimeFilter,
  industryStackedData,
  industryData,
  industryLoanTermData,
  industryPieData
}) => {
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
            onTimeFilterChange={setTimeFilter}
          >
            <BarChart
              width={450}
              height={220}
              data={industryStackedData}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis type="number" stroke="#888" />
              <YAxis dataKey="name" type="category" stroke="#888" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="workingCapital" name="Working Capital" stackId="a" fill="#33bbef" />
              <Bar dataKey="expansion" name="Expansion" stackId="a" fill="#8B5CF6" />
              <Bar dataKey="equipment" name="Equipment" stackId="a" fill="#10b981" />
              <Bar dataKey="other" name="Other" stackId="a" fill="#F97316" />
            </BarChart>
          </IntelligenceAnalyticsCard>

          <IntelligenceAnalyticsCard 
            title="Loan Default Rates By Industry"
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          >
            <BarChart 
              width={450} 
              height={220} 
              data={industryData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="value" fill="#33bbef">
                {industryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </IntelligenceAnalyticsCard>

          <IntelligenceAnalyticsCard 
            title="Loan Term Preferences By Industry"
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          >
            <LineChart 
              width={450} 
              height={220} 
              data={industryLoanTermData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="retail" 
                name="Retail" 
                stroke="#F97316" 
                strokeWidth={2}
                dot={{ r: 3 }} 
              />
              <Line 
                type="monotone" 
                dataKey="tech" 
                name="Tech" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ r: 3 }} 
              />
              <Line 
                type="monotone" 
                dataKey="construction" 
                name="Construction" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                dot={{ r: 3 }} 
              />
              <Line 
                type="monotone" 
                dataKey="manufacturing" 
                name="Manufacturing" 
                stroke="#33bbef" 
                strokeWidth={2}
                dot={{ r: 3 }} 
              />
            </LineChart>
          </IntelligenceAnalyticsCard>

          <IntelligenceAnalyticsCard 
            title="Industry-Specific Loan Volume Distribution"
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
        </div>
      </CardContent>
    </Card>
  );
};

export default IndustryTypeSection;
