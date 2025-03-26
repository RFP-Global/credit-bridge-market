
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Cpu } from "lucide-react";
import IntelligenceAnalyticsCard from "@/components/IntelligenceAnalyticsCard";
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
  ResponsiveContainer 
} from "recharts";
import { renderCustomizedLabel, COLORS } from "@/components/charts/ChartUtils";
import { CustomTooltip } from "@/components/charts/CustomTooltip";

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
  return (
    <Card className="bg-black/20 border-green-900 shadow-lg">
      <CardHeader className="p-3 border-b border-green-900 bg-black/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-mono text-green-500 flex items-center">
          <Cpu className="h-4 w-4 mr-2" />
          INDUSTRY_ANALYTICS
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
            title="LOAN_USAGE//BY_INDUSTRY"
            timeFilter={timeFilter}
            onTimeFilterChange={onTimeFilterChange}
          >
            <BarChart
              width={450}
              height={220}
              data={industryStackedData}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#0f3328" />
              <XAxis type="number" stroke="#3dcd8b" />
              <YAxis dataKey="name" type="category" stroke="#3dcd8b" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="workingCapital" name="Working Capital" stackId="a" fill="#33bbef" />
              <Bar dataKey="expansion" name="Expansion" stackId="a" fill="#8B5CF6" />
              <Bar dataKey="equipment" name="Equipment" stackId="a" fill="#10b981" />
              <Bar dataKey="other" name="Other" stackId="a" fill="#F97316" />
            </BarChart>
          </IntelligenceAnalyticsCard>

          <IntelligenceAnalyticsCard 
            title="DEFAULT_RATE//INDUSTRY"
            timeFilter={timeFilter}
            onTimeFilterChange={onTimeFilterChange}
          >
            <BarChart 
              width={450} 
              height={220} 
              data={industryData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#0f3328" vertical={false} />
              <XAxis dataKey="name" stroke="#3dcd8b" />
              <YAxis stroke="#3dcd8b" />
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
            title="LOAN_TERM//INDUSTRY_PREFS"
            timeFilter={timeFilter}
            onTimeFilterChange={onTimeFilterChange}
          >
            <LineChart 
              width={450} 
              height={220} 
              data={industryLoanTermData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#0f3328" />
              <XAxis dataKey="month" stroke="#3dcd8b" />
              <YAxis stroke="#3dcd8b" />
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
            title="LOAN_VOLUME//INDUSTRY_DIST"
            timeFilter={timeFilter}
            onTimeFilterChange={onTimeFilterChange}
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

export default IndustryTypeAnalytics;
