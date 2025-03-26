
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from 'lucide-react';
import { 
  BarChart, 
  LineChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Cell 
} from "recharts";
import IntelligenceAnalyticsCard from "@/components/IntelligenceAnalyticsCard";
import CustomTooltip from "./CustomTooltip";
import IndustryStackedBarChart from "@/components/charts/IndustryStackedBarChart";

interface BusinessStructureSectionProps {
  timeFilter: string;
  setTimeFilter: (filter: string) => void;
  structureData: any[];
  structureLoanTermData: any[];
}

const BusinessStructureSection: React.FC<BusinessStructureSectionProps> = ({
  timeFilter,
  setTimeFilter,
  structureData,
  structureLoanTermData
}) => {
  // Industry stacked data
  const industryStackedData = [
    { 
      name: 'Manufacturing', 
      workingCapital: 150, 
      expansion: 200, 
      equipment: 350, 
      other: 100 
    },
    { 
      name: 'Construction', 
      workingCapital: 200, 
      expansion: 250, 
      equipment: 300, 
      other: 120 
    },
    { 
      name: 'Technology', 
      workingCapital: 300, 
      expansion: 350, 
      equipment: 200, 
      other: 150 
    },
    { 
      name: 'Retail', 
      workingCapital: 250, 
      expansion: 150, 
      equipment: 180, 
      other: 200 
    },
    { 
      name: 'Healthcare', 
      workingCapital: 180, 
      expansion: 220, 
      equipment: 150, 
      other: 120 
    }
  ];

  // Industry default rate data
  const industryDefaultRateData = [
    { name: 'Retail', value: 2.5, color: '#7dd3fc' },
    { name: 'Tech', value: 10.5, color: '#38bdf8' },
    { name: 'Construction', value: 7.5, color: '#0ea5e9' },
    { name: 'Healthcare', value: 3.0, color: '#0369a1' },
    { name: 'Manufacturing', value: 1.5, color: '#0284c7' }
  ];

  // Industry loan term data
  const industryLoanTermData = [
    { month: 'Jan', retail: 30, tech: 45, construction: 25, healthcare: 20, manufacturing: 35 },
    { month: 'Feb', retail: 35, tech: 50, construction: 30, healthcare: 25, manufacturing: 40 },
    { month: 'Mar', retail: 45, tech: 40, construction: 35, healthcare: 30, manufacturing: 35 },
    { month: 'Apr', retail: 40, tech: 35, construction: 45, healthcare: 20, manufacturing: 30 },
    { month: 'May', retail: 30, tech: 30, construction: 40, healthcare: 25, manufacturing: 35 },
    { month: 'Jun', retail: 35, tech: 25, construction: 30, healthcare: 40, manufacturing: 45 }
  ];

  // Industry approval/rejection data
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
          Industry Usage Analytics
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
            <IndustryStackedBarChart data={industryStackedData} />
          </IntelligenceAnalyticsCard>

          <IntelligenceAnalyticsCard 
            title="Loan Default Rates By Industry"
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          >
            <BarChart 
              width={450} 
              height={220} 
              data={industryDefaultRateData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="value" name="Default Rate %" fill="#33bbef">
                {industryDefaultRateData.map((entry, index) => (
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
                stroke="#7dd3fc" 
                strokeWidth={2}
                dot={{ r: 3 }} 
              />
              <Line 
                type="monotone" 
                dataKey="tech" 
                name="Tech" 
                stroke="#38bdf8" 
                strokeWidth={2}
                dot={{ r: 3 }} 
              />
              <Line 
                type="monotone" 
                dataKey="construction" 
                name="Construction" 
                stroke="#0ea5e9" 
                strokeWidth={2}
                dot={{ r: 3 }} 
              />
              <Line 
                type="monotone" 
                dataKey="healthcare" 
                name="Healthcare" 
                stroke="#0369a1" 
                strokeWidth={2}
                dot={{ r: 3 }} 
              />
              <Line 
                type="monotone" 
                dataKey="manufacturing" 
                name="Manufacturing" 
                stroke="#0284c7" 
                strokeWidth={2}
                dot={{ r: 3 }} 
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

export default BusinessStructureSection;
