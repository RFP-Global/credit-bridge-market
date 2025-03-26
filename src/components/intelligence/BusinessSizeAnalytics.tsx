
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Server } from "lucide-react";
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
  return (
    <Card className="bg-black/20 border-green-900 shadow-lg">
      <CardHeader className="p-3 border-b border-green-900 bg-black/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-mono text-green-500 flex items-center">
          <Server className="h-4 w-4 mr-2" />
          BUSINESS_SIZE_ANALYTICS
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
            title="LOAN_REQUEST//BY_SIZE"
            timeFilter={timeFilter}
            onTimeFilterChange={onTimeFilterChange}
          >
            <BarChart 
              width={450} 
              height={220} 
              data={loanRequestData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#0f3328" vertical={false} />
              <XAxis dataKey="name" stroke="#3dcd8b" />
              <YAxis stroke="#3dcd8b" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="pending" name="Pending" fill="#33bbef" />
              <Bar dataKey="approved" name="Approved" fill="#10b981" />
              <Bar dataKey="rejected" name="Rejected" fill="#F97316" />
            </BarChart>
          </IntelligenceAnalyticsCard>

          <IntelligenceAnalyticsCard 
            title="LOAN_DEFAULT//SIZE_DISTRIB"
            timeFilter={timeFilter}
            onTimeFilterChange={onTimeFilterChange}
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
            title="LOAN_TERM//SIZE_TRACKING"
            timeFilter={timeFilter}
            onTimeFilterChange={onTimeFilterChange}
          >
            <LineChart 
              width={450} 
              height={220} 
              data={timeSeriesData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#0f3328" />
              <XAxis dataKey="month" stroke="#3dcd8b" />
              <YAxis stroke="#3dcd8b" />
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
            title="APPROVAL_RATE//SIZE_ANALYSIS"
            timeFilter={timeFilter}
            onTimeFilterChange={onTimeFilterChange}
          >
            <BarChart 
              width={450} 
              height={220} 
              data={loanApprovalData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#0f3328" vertical={false} />
              <XAxis dataKey="category" stroke="#3dcd8b" />
              <YAxis stroke="#3dcd8b" />
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

export default BusinessSizeAnalytics;
