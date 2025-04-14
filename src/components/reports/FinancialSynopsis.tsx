
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FinancialRatios } from "@/types/proposalDetails";
import { getRiskLevelInfo } from "@/components/vdr/utils/borrowerRiskUtils";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface FinancialSynopsisProps {
  ratios: FinancialRatios;
  riskScore: number;
}

export const FinancialSynopsis = ({ ratios, riskScore }: FinancialSynopsisProps) => {
  const riskLevel = getRiskLevelInfo(riskScore);
  
  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;
  const formatRatio = (value: number) => value.toFixed(2);
  
  const getIndicator = (value: number, threshold: number) => {
    if (value >= threshold) {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    }
    return <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  return (
    <Card className="bg-black/40 border-gray-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">Executive Summary</CardTitle>
          <Badge className={riskLevel.color}>Risk Score: {riskScore.toFixed(1)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Liquidity Position
              {getIndicator(ratios.currentRatio, 2)}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Working Capital Ratio</span>
                <span className="font-mono">{formatRatio(ratios.currentRatio)}x</span>
              </div>
              <div className="flex justify-between">
                <span>Quick Ratio</span>
                <span className="font-mono">{formatRatio(ratios.quickRatio)}x</span>
              </div>
              <div className="flex justify-between">
                <span>Cash Ratio</span>
                <span className="font-mono">{formatRatio(ratios.cashRatio)}x</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Debt Management
              {getIndicator(3 - ratios.debtToEquity, 1.5)}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Debt/Equity</span>
                <span className="font-mono">{formatRatio(ratios.debtToEquity)}x</span>
              </div>
              <div className="flex justify-between">
                <span>Interest Coverage</span>
                <span className="font-mono">{formatRatio(ratios.interestCoverageRatio)}x</span>
              </div>
              <div className="flex justify-between">
                <span>Debt/EBITDA</span>
                <span className="font-mono">{formatRatio(ratios.debtToEBITDA)}x</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Profitability Metrics
              {getIndicator(ratios.operatingMargin, 0.15)}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Operating Margin</span>
                <span className="font-mono">{formatPercentage(ratios.operatingMargin)}</span>
              </div>
              <div className="flex justify-between">
                <span>Net Profit Margin</span>
                <span className="font-mono">{formatPercentage(ratios.netProfitMargin)}</span>
              </div>
              <div className="flex justify-between">
                <span>Return on Equity</span>
                <span className="font-mono">{formatPercentage(ratios.returnOnEquity)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Operational Efficiency
              {getIndicator(ratios.assetTurnover, 1.5)}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Asset Turnover</span>
                <span className="font-mono">{formatRatio(ratios.assetTurnover)}x</span>
              </div>
              <div className="flex justify-between">
                <span>Inventory Turnover</span>
                <span className="font-mono">{formatRatio(ratios.inventoryTurnover)}x</span>
              </div>
              <div className="flex justify-between">
                <span>Receivables Turnover</span>
                <span className="font-mono">{formatRatio(ratios.accountsReceivableTurnover)}x</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Coverage & Repayment
              {getIndicator(ratios.debtServiceCoverageRatio, 1.25)}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Debt Service Coverage</span>
                <span className="font-mono">{formatRatio(ratios.debtServiceCoverageRatio)}x</span>
              </div>
              <div className="flex justify-between">
                <span>Fixed Charge Coverage</span>
                <span className="font-mono">{formatRatio(ratios.fixedChargeCoverageRatio)}x</span>
              </div>
              <div className="flex justify-between">
                <span>Operating Cash Flow</span>
                <span className="font-mono">{formatRatio(ratios.operatingCashFlowRatio)}x</span>
              </div>
            </div>
          </div>
        </div>

        {ratios.debtServiceCoverageRatio < 1.25 && (
          <div className="flex items-center gap-2 text-yellow-500 bg-yellow-500/10 p-3 rounded-md">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">
              Warning: Debt Service Coverage Ratio is below recommended threshold of 1.25x
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
