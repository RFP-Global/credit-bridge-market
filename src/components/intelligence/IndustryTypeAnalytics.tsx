import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  LineChart, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell,
  ResponsiveContainer
} from "recharts";
import { TimeFilterRow } from "@/components/intelligence/TimeFilterRow";
import { IntelligenceCard } from "@/components/intelligence/IntelligenceCard";
import TreemapChart from "@/components/charts/TreemapChart";

interface IndustryTypeAnalyticsProps {
  timeFilter: string;
  onTimeFilterChange: (value: string) => void;
  industryStackedData: any[];
  industryDefaultRateData: any[];
  industryTermsData: any[];
  industryPieData: any[];
  industryLoanRequestData: any[];
  colors: Record<string, string>;
}

const IndustryTypeAnalytics = ({ 
  timeFilter, 
  onTimeFilterChange,
  industryStackedData,
  industryDefaultRateData,
  industryTermsData,
  industryPieData,
  industryLoanRequestData,
  colors
}: IndustryTypeAnalyticsProps) => {
  const [expanded, setExpanded] = useState(true);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text 
        x={x} 
        y={y} 
        fill="#ffffff" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (!expanded) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded mb-3 p-2">
        <div 
          className="flex items-center justify-between cursor-pointer" 
          onClick={() => setExpanded(true)}
        >
          <h3 className="text-sm font-mono text-gray-300">Industry Type Analytics</h3>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded mb-3">
      <div 
        className="flex items-center justify-between p-2 cursor-pointer border-b border-gray-800" 
        onClick={() => setExpanded(false)}
      >
        <h3 className="text-sm font-mono text-gray-300">Industry Type Analytics</h3>
        <ChevronDown className="h-4 w-4 text-gray-500 transform rotate-180" />
      </div>
      
      <div className="p-3">
        <TimeFilterRow activeFilter={timeFilter} onFilterChange={onTimeFilterChange} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          <IntelligenceCard title="Loan Request By Industry" timeFilter={timeFilter}>
            <ResponsiveContainer width="100%" height={220}>
              <TreemapChart data={industryLoanRequestData} />
            </ResponsiveContainer>
          </IntelligenceCard>

          <IntelligenceCard title="Loan Default Rates By Industry" timeFilter={timeFilter}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={industryDefaultRateData} margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" domain={[0, 12]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="value" name="Default Rate %" fill={colors.equipment}>
                  {industryDefaultRateData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={
                        index === 0 ? colors.retail : 
                        index === 1 ? colors.tech : 
                        index === 2 ? colors.construction : 
                        index === 3 ? colors.healthcare : 
                        colors.manufacturing
                      } 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </IntelligenceCard>

          <IntelligenceCard title="Loan Term Preferences By Industry" timeFilter={timeFilter}>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={industryTermsData} margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" domain={[0, 50]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="retail" 
                  name="Retail" 
                  stroke={colors.retail} 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="tech" 
                  name="Tech" 
                  stroke={colors.tech} 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="construction" 
                  name="Construction" 
                  stroke={colors.construction} 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="healthcare" 
                  name="Healthcare" 
                  stroke={colors.healthcare} 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="manufacturing" 
                  name="Manufacturing" 
                  stroke={colors.manufacturing} 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </IntelligenceCard>

          <IntelligenceCard title="Industry-Specific Loan Volume Distribution" timeFilter={timeFilter}>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={industryPieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {industryPieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={
                        index === 0 ? colors.manufacturing : 
                        index === 1 ? colors.construction : 
                        index === 2 ? colors.tech : 
                        index === 3 ? colors.retail : 
                        colors.healthcare
                      } 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{ fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </IntelligenceCard>
        </div>
      </div>
    </div>
  );
};

export default IndustryTypeAnalytics;
