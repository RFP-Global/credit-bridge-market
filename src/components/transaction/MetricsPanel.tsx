
import { BarChart3, Percent, Calculator, DollarSign, Building, MessageCircle, TrendingUp } from "lucide-react";

interface MetricsPanelProps {
  transactionDetails: any;
}

const MetricsPanel = ({ transactionDetails }: MetricsPanelProps) => {
  const metrics = transactionDetails?.metrics;
  
  if (!metrics) return null;
  
  return (
    <div className="bg-black/50 border border-gray-800/50 rounded-lg p-5">
      <h2 className="text-lg font-medium text-cyan-300 mb-4 border-b border-gray-800/50 pb-2">
        Transaction Metrics
      </h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Calculator className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Debt Service Coverage</p>
              <p className="text-sm">{metrics.debtServiceCoverageRatio}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Percent className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Loan to Value</p>
              <p className="text-sm">{metrics.loanToValueRatio}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Interest Coverage</p>
              <p className="text-sm">{metrics.interestCoverageRatio}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <DollarSign className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Net Operating Income</p>
              <p className="text-sm">{metrics.netOperatingIncome}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Building className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Capital Expenditures</p>
              <p className="text-sm">{metrics.capitalExpenditures}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Funding Efficiency</p>
              <p className="text-sm">{metrics.fundingEfficiency}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <MessageCircle className="h-4 w-4 text-cyan-400" />
          <div>
            <p className="text-xs text-gray-400">Negotiation Rounds</p>
            <p className="text-sm">{metrics.negotiationRounds}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;
