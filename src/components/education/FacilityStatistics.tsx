
import React, { useMemo } from 'react';
import { historicalTransactions } from '@/data/transactionArchiveData';
import { 
  BarChart3, 
  TrendingUp, 
  Timer, 
} from 'lucide-react';

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

    return {
      transactionCount: facilityTransactions.length,
      averageInterestRate: `${averageInterestRate}%`,
      averageTerm: averageTerm,
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
    </div>
  );
};

export default FacilityStatistics;
