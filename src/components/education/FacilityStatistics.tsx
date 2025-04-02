
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, PieChart, Pie, Legend } from 'recharts';
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
        interestRateData: [],
        termData: [],
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

    // Count business types
    const businessTypeCounts: Record<string, number> = {};
    facilityTransactions.forEach(t => {
      businessTypeCounts[t.businessType] = (businessTypeCounts[t.businessType] || 0) + 1;
    });
    
    const businessTypes = Object.entries(businessTypeCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
    
    // Count lender types
    const lenderCounts: Record<string, number> = {};
    facilityTransactions.forEach(t => {
      lenderCounts[t.winningLender] = (lenderCounts[t.winningLender] || 0) + 1;
    });
    
    const lenderTypes = Object.entries(lenderCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    // Create interest rate distribution data
    const interestRanges = [
      { range: "<3%", count: 0 },
      { range: "3-4%", count: 0 },
      { range: "4-5%", count: 0 },
      { range: "5-6%", count: 0 },
      { range: "6-7%", count: 0 },
      { range: ">7%", count: 0 }
    ];
    
    interestRates.forEach(rate => {
      if (rate < 3) interestRanges[0].count++;
      else if (rate < 4) interestRanges[1].count++;
      else if (rate < 5) interestRanges[2].count++;
      else if (rate < 6) interestRanges[3].count++;
      else if (rate < 7) interestRanges[4].count++;
      else interestRanges[5].count++;
    });
    
    const interestRateData = interestRanges.filter(r => r.count > 0);

    // Create term length distribution data
    const termRanges = [
      { range: "<1 year", count: 0 },
      { range: "1-3 years", count: 0 },
      { range: "3-5 years", count: 0 },
      { range: "5-10 years", count: 0 },
      { range: ">10 years", count: 0 }
    ];
    
    termLengths.forEach(months => {
      if (months < 12) termRanges[0].count++;
      else if (months < 36) termRanges[1].count++;
      else if (months < 60) termRanges[2].count++;
      else if (months < 120) termRanges[3].count++;
      else termRanges[4].count++;
    });
    
    const termData = termRanges.filter(r => r.count > 0);

    return {
      transactionCount: facilityTransactions.length,
      averageInterestRate: `${averageInterestRate}%`,
      averageTerm: averageTerm,
      interestRateData,
      termData,
      businessTypes,
      lenderTypes
    };
  }, [facilityId, facilityTitle]);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-sm text-cyan-300 mb-2 flex items-center gap-1">
            <TrendingUp className="h-4 w-4" /> Interest Rate Distribution
          </h4>
          <div className="bg-cyan-950/10 border border-cyan-800/20 rounded p-3 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statistics.interestRateData} margin={{ top: 5, right: 20, bottom: 30, left: 0 }}>
                <XAxis dataKey="range" stroke="#94a3b8" fontSize={12} tickMargin={5} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Transactions" barSize={30}>
                  {statistics.interestRateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h4 className="text-sm text-cyan-300 mb-2 flex items-center gap-1">
            <Timer className="h-4 w-4" /> Term Length Distribution
          </h4>
          <div className="bg-cyan-950/10 border border-cyan-800/20 rounded p-3 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statistics.termData} margin={{ top: 5, right: 20, bottom: 30, left: 0 }}>
                <XAxis dataKey="range" stroke="#94a3b8" fontSize={12} tickMargin={5} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Transactions" barSize={30}>
                  {statistics.termData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
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
                <PieChart>
                  <Pie
                    data={statistics.businessTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    labelLine={false}
                    label={renderCustomizedLabel}
                  >
                    {statistics.businessTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
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
            <Landmark className="h-4 w-4" /> Most Common Lenders
          </h4>
          <div className="bg-cyan-950/10 border border-cyan-800/20 rounded p-3 h-64">
            {statistics.lenderTypes.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statistics.lenderTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    labelLine={false}
                    label={renderCustomizedLabel}
                  >
                    {statistics.lenderTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No lender data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityStatistics;
