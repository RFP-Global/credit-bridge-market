
import React, { useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, Legend, CartesianGrid } from 'recharts';
import { historicalTransactions } from '@/data/transactionArchiveData';
import { 
  BarChart3, 
  TrendingUp, 
  Timer, 
  Building2, 
  Landmark 
} from 'lucide-react';
import { COLORS } from '@/components/charts/ChartUtils';
import CustomTooltip from '@/components/charts/CustomTooltip';

interface FacilityStatisticsProps {
  facilityId: string;
  facilityTitle: string;
}

const FacilityStatistics: React.FC<FacilityStatisticsProps> = ({ facilityId, facilityTitle }) => {
  // Calculate statistics based on historical transaction data
  const statistics = useMemo(() => {
    // Normalize facility type names for matching
    const normalizeFacilityType = (type: string) => {
      const typeMap: Record<string, string> = {
        'term-loan': 'Term Loans',
        'revolving-credit': 'Revolving Credit',
        'equipment-financing': 'Equipment Finance',
        'sba-loans': 'SBA Loan',
        'commercial-mortgage': 'Commercial Mortgage',
        'venture-debt': 'Venture Debt',
        'invoice-financing': 'Invoice Financing',
        'merchant-cash-advance': 'Merchant Cash Advance',
      };
      return typeMap[facilityId] || facilityTitle;
    };

    const normalizedFacilityType = normalizeFacilityType(facilityId);
    
    // Filter transactions for this facility type
    const facilityTransactions = historicalTransactions.filter(
      t => t.facilityType === normalizedFacilityType
    );
    
    if (facilityTransactions.length === 0) {
      return {
        transactionCount: 0,
        averageInterestRate: "N/A",
        averageTerm: "N/A",
        rateTermData: [],
        businessTypes: [],
        lenderTypes: []
      };
    }

    // Calculate interest rates
    const interestRates = facilityTransactions.map(t => 
      parseFloat(t.interestRate.replace('%', ''))
    );
    const averageInterestRate = (
      interestRates.reduce((sum, rate) => sum + rate, 0) / interestRates.length
    ).toFixed(2);

    // Process term lengths
    const termLengths = facilityTransactions.map(t => {
      const term = t.term;
      const termValue = parseInt(term.split(' ')[0]);
      const termUnit = term.split(' ')[1];
      
      // Normalize to months
      if (termUnit.includes('year')) {
        return termValue * 12;
      }
      return termValue;
    });
    
    const avgTermMonths = Math.round(
      termLengths.reduce((sum, term) => sum + term, 0) / termLengths.length
    );
    
    // Format average term
    let averageTerm = `${avgTermMonths} months`;
    if (avgTermMonths >= 12 && avgTermMonths % 12 === 0) {
      averageTerm = `${avgTermMonths / 12} years`;
    } else if (avgTermMonths >= 12) {
      averageTerm = `${Math.floor(avgTermMonths / 12)} years, ${avgTermMonths % 12} months`;
    }

    // Count business types and expand to more types
    const businessTypeCounts: Record<string, number> = {};
    facilityTransactions.forEach(t => {
      businessTypeCounts[t.businessType] = (businessTypeCounts[t.businessType] || 0) + 1;
    });
    
    const businessTypes = Object.entries(businessTypeCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8); // Show up to 8 business types
    
    // Count lender types instead of specific lenders
    const lenderTypeCounts: Record<string, number> = {
      "Commercial Bank": 0,
      "Credit Union": 0,
      "SBA Lender": 0, 
      "Online Lender": 0,
      "Venture Capital": 0,
      "Equipment Financier": 0,
      "CDFI": 0
    };
    
    facilityTransactions.forEach(t => {
      // Categorize lenders by type based on naming patterns
      const lenderName = t.winningLender.toLowerCase();
      if (lenderName.includes("bank")) {
        lenderTypeCounts["Commercial Bank"]++;
      } else if (lenderName.includes("credit") || lenderName.includes("union")) {
        lenderTypeCounts["Credit Union"]++;
      } else if (lenderName.includes("sba") || t.facilityType === "SBA Loan") {
        lenderTypeCounts["SBA Lender"]++;
      } else if (lenderName.includes("online") || lenderName.includes("tech") || lenderName.includes("digital")) {
        lenderTypeCounts["Online Lender"]++;
      } else if (lenderName.includes("venture") || lenderName.includes("capital") || t.facilityType === "Venture Debt") {
        lenderTypeCounts["Venture Capital"]++;
      } else if (lenderName.includes("equipment") || lenderName.includes("leasing")) {
        lenderTypeCounts["Equipment Financier"]++;
      } else if (lenderName.includes("community") || lenderName.includes("development")) {
        lenderTypeCounts["CDFI"]++;
      } else {
        // Default to commercial bank if can't categorize
        lenderTypeCounts["Commercial Bank"]++;
      }
    });
    
    const lenderTypes = Object.entries(lenderTypeCounts)
      .filter(([_, count]) => count > 0)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Create interest rate vs term length scatter data
    const rateTermData = facilityTransactions.map(t => {
      // Parse interest rate
      const rate = parseFloat(t.interestRate.replace('%', ''));
      
      // Parse term
      const term = t.term;
      const termValue = parseInt(term.split(' ')[0]);
      const termUnit = term.split(' ')[1];
      
      // Convert term to years
      let termYears = termValue;
      if (termUnit.includes('month')) {
        termYears = Math.round(termValue / 12 * 10) / 10; // Round to 1 decimal
      }
      
      return {
        name: t.companyName,
        interestRate: rate,
        termYears: termYears, 
        principal: t.principal
      };
    });

    return {
      transactionCount: facilityTransactions.length,
      averageInterestRate: `${averageInterestRate}%`,
      averageTerm: averageTerm,
      rateTermData,
      businessTypes,
      lenderTypes
    };
  }, [facilityId, facilityTitle]);

  if (statistics.transactionCount === 0) {
    return (
      <div className="border border-cyan-800/30 rounded-lg p-5 bg-black/50 mt-6">
        <h3 className="text-lg text-cyan-300 font-mono flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5" />
          Historical Statistics
        </h3>
        <div className="text-cyan-50/70 text-center py-8">
          No historical transaction data available for this facility type.
        </div>
      </div>
    );
  }

  return (
    <div className="border border-cyan-800/30 rounded-lg p-5 bg-black/50 mt-6">
      <h3 className="text-lg text-cyan-300 font-mono flex items-center gap-2 mb-4">
        <BarChart3 className="h-5 w-5" />
        Historical Statistics
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-cyan-950/20 border border-cyan-800/20 rounded p-4 flex items-center">
          <TrendingUp className="text-cyan-400 h-8 w-8 mr-4" />
          <div>
            <p className="text-gray-400 text-xs">Average Interest Rate</p>
            <p className="text-xl text-cyan-100 font-mono">{statistics.averageInterestRate}</p>
          </div>
        </div>

        <div className="bg-cyan-950/20 border border-cyan-800/20 rounded p-4 flex items-center">
          <Timer className="text-cyan-400 h-8 w-8 mr-4" />
          <div>
            <p className="text-gray-400 text-xs">Average Term Length</p>
            <p className="text-xl text-cyan-100 font-mono">{statistics.averageTerm}</p>
          </div>
        </div>

        <div className="bg-cyan-950/20 border border-cyan-800/20 rounded p-4 flex items-center">
          <BarChart3 className="text-cyan-400 h-8 w-8 mr-4" />
          <div>
            <p className="text-gray-400 text-xs">Historical Transactions</p>
            <p className="text-xl text-cyan-100 font-mono">{statistics.transactionCount}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <h4 className="text-sm text-cyan-300 mb-2 flex items-center gap-1">
            <TrendingUp className="h-4 w-4" /> Interest Rate vs. Term Length Distribution
          </h4>
          <div className="bg-cyan-950/10 border border-cyan-800/20 rounded p-3 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={statistics.rateTermData}
                margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                <XAxis 
                  dataKey="interestRate" 
                  label={{ value: 'Interest Rate (%)', position: 'bottom', fill: '#94a3b8', style: { fontSize: '12px' } }}
                  type="number"
                  domain={[0, 15]}
                  ticks={[0, 3, 6, 9, 12, 15]}
                  stroke="#94a3b8" 
                  fontSize={12}
                />
                <YAxis 
                  dataKey="termYears" 
                  label={{ value: 'Term Length (years)', angle: -90, position: 'left', fill: '#94a3b8', style: { fontSize: '12px' } }}
                  type="number"
                  domain={[0, 20]}
                  ticks={[0, 5, 10, 15, 20]}
                  stroke="#94a3b8" 
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="termYears"
                  name="Term (Years)"
                  stroke="#33bbef"
                  strokeWidth={0}
                  dot={{ r: 4, fill: "#38bdf8" }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm text-cyan-300 mb-2 flex items-center gap-1">
            <Building2 className="h-4 w-4" /> Most Common Business Types
          </h4>
          <div className="bg-cyan-950/10 border border-cyan-800/20 rounded p-3 h-64">
            {statistics.businessTypes.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={statistics.businessTypes} 
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                >
                  <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    width={100}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Transactions" 
                    fill="#33bbef"
                  >
                    {statistics.businessTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No business type data available
              </div>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm text-cyan-300 mb-2 flex items-center gap-1">
            <Landmark className="h-4 w-4" /> Most Common Lender Types
          </h4>
          <div className="bg-cyan-950/10 border border-cyan-800/20 rounded p-3 h-64">
            {statistics.lenderTypes.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={statistics.lenderTypes} 
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
                >
                  <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    stroke="#94a3b8" 
                    fontSize={12}
                    width={120}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Transactions" 
                    fill="#38bdf8"
                  >
                    {statistics.lenderTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No lender type data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityStatistics;
