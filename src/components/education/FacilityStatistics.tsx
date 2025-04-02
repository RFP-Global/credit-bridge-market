
import React, { useMemo } from 'react';
import { historicalTransactions } from '@/data/transactionArchiveData';
import { 
  BarChart3, 
  TrendingUp, 
  Timer, 
  Building2, 
  Landmark 
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
      .slice(0, 8); // Show up to 8 business types

    // Count lender types
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

    return {
      transactionCount: facilityTransactions.length,
      averageInterestRate: `${averageInterestRate}%`,
      averageTerm: averageTerm,
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm text-cyan-300 mb-2 flex items-center gap-1">
            <Building2 className="h-4 w-4" /> Most Common Business Types
          </h4>
          <div className="bg-cyan-950/10 border border-cyan-800/20 rounded p-4 h-64 overflow-auto">
            {statistics.businessTypes.length > 0 ? (
              <ul className="space-y-2">
                {statistics.businessTypes.map((type, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="text-gray-300">{type.name}</span>
                    <div className="flex items-center">
                      <div 
                        className="h-2 bg-cyan-500 mr-2" 
                        style={{ 
                          width: `${(type.value / statistics.businessTypes[0].value) * 100}px`,
                          opacity: 0.3 + (0.7 * (1 - index / statistics.businessTypes.length))
                        }}
                      ></div>
                      <span className="text-cyan-300 font-mono">{type.value}</span>
                    </div>
                  </li>
                ))}
              </ul>
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
          <div className="bg-cyan-950/10 border border-cyan-800/20 rounded p-4 h-64 overflow-auto">
            {statistics.lenderTypes.length > 0 ? (
              <ul className="space-y-2">
                {statistics.lenderTypes.map((type, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="text-gray-300">{type.name}</span>
                    <div className="flex items-center">
                      <div 
                        className="h-2 bg-cyan-400 mr-2" 
                        style={{ 
                          width: `${(type.value / statistics.lenderTypes[0].value) * 100}px`,
                          opacity: 0.3 + (0.7 * (1 - index / statistics.lenderTypes.length))
                        }}
                      ></div>
                      <span className="text-cyan-300 font-mono">{type.value}</span>
                    </div>
                  </li>
                ))}
              </ul>
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
