
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { 
  BarChart, 
  Bar, 
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

interface BusinessStructureAnalyticsProps {
  timeFilter: string;
  onTimeFilterChange: (value: string) => void;
  structureData: any[];
  structureTermsData: any[];
  structureApprovalData: any[];
  colors: Record<string, string>;
}

const BusinessStructureAnalytics = ({ 
  timeFilter, 
  onTimeFilterChange,
  structureData,
  structureTermsData,
  structureApprovalData,
  colors
}: BusinessStructureAnalyticsProps) => {
  const [expanded, setExpanded] = useState(true);

  if (!expanded) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded mb-3 p-2">
        <div 
          className="flex items-center justify-between cursor-pointer" 
          onClick={() => setExpanded(true)}
        >
          <h3 className="text-sm font-mono text-gray-300">Loan Volume by Business Structure</h3>
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
        <h3 className="text-sm font-mono text-gray-300">Loan Volume by Business Structure</h3>
        <ChevronDown className="h-4 w-4 text-gray-500 transform rotate-180" />
      </div>
      
      <div className="p-3">
        <TimeFilterRow activeFilter={timeFilter} onFilterChange={onTimeFilterChange} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          <IntelligenceCard title="Loan Usage Trends by Industry" timeFilter={timeFilter}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={structureData} margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                <XAxis dataKey="type" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="workingCapital" name="Working Capital" fill={colors.workingCapital} />
                <Bar dataKey="expansion" name="Expansion" fill={colors.expansion} />
                <Bar dataKey="equipment" name="Equipment" fill={colors.equipment} />
              </BarChart>
            </ResponsiveContainer>
          </IntelligenceCard>

          <IntelligenceCard title="Loan Default Rates By Industry" timeFilter={timeFilter}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={structureData} margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                <XAxis dataKey="type" stroke="#888" />
                <YAxis stroke="#888" domain={[0, 12]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="rate" name="Default Rate %" fill={colors.equipment}>
                  {structureData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={
                        index === 0 ? colors.llc : 
                        index === 1 ? colors.corporate : 
                        colors.partnership
                      } 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </IntelligenceCard>

          <IntelligenceCard title="Loan Term Preferences By Industry" timeFilter={timeFilter}>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={structureTermsData} margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
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
                  dataKey="llc" 
                  name="LLC" 
                  stroke={colors.llc} 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="corporate" 
                  name="Corporate" 
                  stroke={colors.corporate} 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="partnership" 
                  name="Partnership" 
                  stroke={colors.partnership} 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </IntelligenceCard>

          <IntelligenceCard title="Loan Application And Approval Trends" timeFilter={timeFilter}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={structureApprovalData} margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                <XAxis dataKey="type" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="approved" name="Approved" fill={colors.approved} />
                <Bar dataKey="rejected" name="Rejected" fill={colors.rejected} />
              </BarChart>
            </ResponsiveContainer>
          </IntelligenceCard>
        </div>
      </div>
    </div>
  );
};

export default BusinessStructureAnalytics;
