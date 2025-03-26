
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
  Legend 
} from "recharts";
import IntelligenceAnalyticsCard from "@/components/IntelligenceAnalyticsCard";
import CustomTooltip from "./CustomTooltip";

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
            onTimeFilterChange={setTimeFilter}
          >
            <BarChart 
              width={450} 
              height={220} 
              data={structureData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
              <XAxis dataKey="type" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="workingCapital" name="Working Capital" fill="#33bbef" />
              <Bar dataKey="expansion" name="Expansion" fill="#8B5CF6" />
              <Bar dataKey="equipment" name="Equipment" fill="#10b981" />
            </BarChart>
          </IntelligenceAnalyticsCard>

          <IntelligenceAnalyticsCard 
            title="Loan Default Rates By Structure"
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          >
            <BarChart 
              width={450} 
              height={220} 
              data={structureData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
              <XAxis dataKey="type" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="rate" fill="#33bbef" />
            </BarChart>
          </IntelligenceAnalyticsCard>

          <IntelligenceAnalyticsCard 
            title="Loan Term Preferences By Structure"
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          >
            <LineChart 
              width={450} 
              height={220} 
              data={structureLoanTermData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="llc" 
                name="LLC" 
                stroke="#33bbef" 
                strokeWidth={2}
                dot={{ r: 3 }} 
              />
              <Line 
                type="monotone" 
                dataKey="corporate" 
                name="Corporate" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ r: 3 }} 
              />
              <Line 
                type="monotone" 
                dataKey="partnership" 
                name="Partnership" 
                stroke="#F97316" 
                strokeWidth={2}
                dot={{ r: 3 }} 
              />
            </LineChart>
          </IntelligenceAnalyticsCard>

          <IntelligenceAnalyticsCard 
            title="Loan Application And Approval Trends"
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          >
            <BarChart 
              width={450} 
              height={220} 
              data={structureData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
              <XAxis dataKey="type" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="workingCapital" name="Approved" fill="#33bbef" />
              <Bar dataKey="equipment" name="Rejected" fill="#F97316" />
            </BarChart>
          </IntelligenceAnalyticsCard>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessStructureSection;
