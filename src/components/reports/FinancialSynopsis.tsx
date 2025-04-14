
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
  
  const getLiquidityAnalysis = () => {
    if (ratios.currentRatio >= 2.0) return "Strong liquidity position";
    if (ratios.currentRatio >= 1.5) return "Adequate liquidity";
    return "Potential liquidity concerns";
  };
  
  const getLeverageAnalysis = () => {
    if (ratios.debtToEBITDA <= 3.0) return "Conservative leverage";
    if (ratios.debtToEBITDA <= 4.5) return "Moderate leverage";
    return "High leverage position";
  };
  
  const getProfitabilityAnalysis = () => {
    if (ratios.operatingMargin >= 0.15) return "Strong profitability";
    if (ratios.operatingMargin >= 0.10) return "Adequate profitability";
    return "Below average profitability";
  };

  return (
    <Card className="bg-black/40 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Business Synopsis</span>
          <Badge className={riskLevel.color}>Risk Score: {riskScore.toFixed(1)}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300">
          The business demonstrates {getLiquidityAnalysis().toLowerCase()} with a current ratio 
          of {ratios.currentRatio.toFixed(2)}x. {getLeverageAnalysis()} is observed with a 
          Debt/EBITDA ratio of {ratios.debtToEBITDA.toFixed(2)}x. Operating performance shows 
          {getProfitabilityAnalysis().toLowerCase()} with an operating margin 
          of {(ratios.operatingMargin * 100).toFixed(1)}%.
        </p>
      </CardContent>
    </Card>
  );
};
