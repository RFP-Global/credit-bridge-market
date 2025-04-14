
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FinancialRatios } from "@/types/proposalDetails";
import { getRiskLevelInfo } from "@/components/vdr/utils/borrowerRiskUtils";

interface FinancialSynopsisProps {
  ratios: FinancialRatios;
  riskScore: number;
}

export const FinancialSynopsis = ({ ratios, riskScore }: FinancialSynopsisProps) => {
  const riskLevel = getRiskLevelInfo(riskScore);
  
  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;
  const formatRatio = (value: number) => value.toFixed(2) + "x";
  
  return (
    <Card className="bg-black/40 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Financial Synopsis</span>
          <Badge className={riskLevel.color}>Risk Score: {riskScore.toFixed(1)}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="font-semibold">Liquidity Analysis</h3>
            <p className="text-gray-300">
              Current ratio of {formatRatio(ratios.currentRatio)} indicates 
              {ratios.currentRatio >= 2 ? " strong" : ratios.currentRatio >= 1.5 ? " adequate" : " weak"} 
              liquidity. Quick ratio at {formatRatio(ratios.quickRatio)} and cash ratio at {formatRatio(ratios.cashRatio)} 
              suggest {ratios.quickRatio >= 1 ? "healthy" : "challenging"} short-term solvency.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Leverage Position</h3>
            <p className="text-gray-300">
              Debt-to-Equity ratio of {formatRatio(ratios.debtToEquity)} represents
              {ratios.debtToEquity <= 1 ? " conservative" : ratios.debtToEquity <= 2 ? " moderate" : " high"} leverage.
              Interest coverage ratio at {formatRatio(ratios.interestCoverageRatio)} shows
              {ratios.interestCoverageRatio >= 3 ? " strong" : " limited"} ability to meet debt obligations.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Profitability Metrics</h3>
            <p className="text-gray-300">
              Operating margin of {formatPercentage(ratios.operatingMargin)} and net profit margin of 
              {formatPercentage(ratios.netProfitMargin)} indicate {ratios.operatingMargin >= 0.15 ? "strong" : 
              ratios.operatingMargin >= 0.1 ? "adequate" : "below average"} operational efficiency.
              ROE at {formatPercentage(ratios.returnOnEquity)} and ROA at {formatPercentage(ratios.returnOnAssets)}.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Cash Flow & Coverage</h3>
            <p className="text-gray-300">
              Operating cash flow ratio of {formatRatio(ratios.operatingCashFlowRatio)} and debt service coverage 
              ratio of {formatRatio(ratios.debtServiceCoverageRatio)} demonstrate
              {ratios.debtServiceCoverageRatio >= 1.25 ? " sufficient" : " tight"} cash flow management.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Operational Efficiency</h3>
          <p className="text-gray-300">
            Asset turnover of {formatRatio(ratios.assetTurnover)}, receivables turnover of 
            {formatRatio(ratios.accountsReceivableTurnover)}, and inventory turnover of 
            {formatRatio(ratios.inventoryTurnover)} reflect the company's operational efficiency
            and working capital management.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
