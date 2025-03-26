
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Network } from "lucide-react";
import IntelligenceAnalyticsCard from "@/components/IntelligenceAnalyticsCard";
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
import { CustomTooltip } from "@/components/charts/CustomTooltip";

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
  return (
    <Card className="bg-black/20 border-green-900 shadow-lg">
      <CardHeader className="p-3 border-b border-green-900 bg-black/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-mono text-green-500 flex items-center">
          <Network className="h-4 w-4 mr-2" />
          ENTITY_STRUCTURE_ANALYSIS
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <IntelligenceAnalyticsCard 
            title="LOAN_USAGE//BY_STRUCTURE"
            timeFilter={timeFilter}
            onTimeFilterChange={onTimeFilterChange}
          >
            <BarChart 
              width={450} 
              height={220} 
              data={structureData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#0f3328" vertical={false} />
              <XAxis dataKey="type" stroke="#3dcd8b" />
              <YAxis stroke="#3dcd8b" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="workingCapital" name="Working Capital" fill="#33bbef" />
              <Bar dataKey="expansion" name="Expansion" fill="#8B5CF6" />
              <Bar dataKey="equipment" name="Equipment" fill="#10b981" />
            </BarChart>
          </IntelligenceAnalyticsCard>

          <IntelligenceAnalyticsCard 
            title="DEFAULT_RATE//STRUCTURE"
            timeFilter={timeFilter}
            onTimeFilterChange={onTimeFilterChange}
          >
            <BarChart 
              width={450} 
              height={220} 
              data={structureData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#0f3328" vertical={false} />
              <XAxis dataKey="type" stroke="#3dcd8b" />
              <YAxis stroke="#3dcd8b" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="rate" name="Default Rate" fill="#33bbef" />
            </BarChart>
          </IntelligenceAnalyticsCard>

          <IntelligenceAnalyticsCard 
            title="LOAN_TERM//STRUCTURE_PREFS"
            timeFilter={timeFilter}
            onTimeFilterChange={onTimeFilterChange}
          >
            <LineChart 
              width={450} 
              height={220} 
              data={structureLoanTermData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#0f3328" />
              <XAxis dataKey="month" stroke="#3dcd8b" />
              <YAxis stroke="#3dcd8b" />
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
            title="APPROVAL_TREND//BY_STRUCTURE"
            timeFilter={timeFilter}
            onTimeFilterChange={onTimeFilterChange}
          >
            <BarChart 
              width={450} 
              height={220} 
              data={structureData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#0f3328" vertical={false} />
              <XAxis dataKey="type" stroke="#3dcd8b" />
              <YAxis stroke="#3dcd8b" />
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

export default BusinessStructureAnalytics;
