
import { useLocation, Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { roundToTenth } from "@/components/underwriting/utils/roundingUtils";
import { FinancialRatios } from "@/types/proposalDetails";
import { getRiskLevelInfo } from "@/components/vdr/utils/borrowerRiskUtils";

interface RatioDetails {
  name: string;
  value: number;
  formula: string;
  weight: number;
  score: number;
}

const BorrowerRatioDetails = () => {
  const location = useLocation();
  const state = location.state as { ratios: FinancialRatios; riskScore: number } | null;

  if (!state?.ratios || state.riskScore === undefined) {
    return <Navigate to="/borrower-underwriting" replace />;
  }

  const { ratios, riskScore } = state;
  const riskLevel = getRiskLevelInfo(riskScore);

  // Safely access ratio values with fallbacks for undefined values
  const safeRatio = (value: number | undefined): number => {
    return typeof value === 'number' ? value : 0;
  };

  const ratioDetails: RatioDetails[] = [
    {
      name: "Debt Service Coverage Ratio",
      value: safeRatio(ratios.debtServiceCoverageRatio),
      formula: "Operating Income / Annual Debt Service",
      weight: 15,
      score: roundToTenth(safeRatio(ratios.debtServiceCoverageRatio) * 2)
    },
    {
      name: "Current Ratio",
      value: safeRatio(ratios.currentRatio),
      formula: "Current Assets / Current Liabilities",
      weight: 10,
      score: roundToTenth(safeRatio(ratios.currentRatio) * 2)
    },
    {
      name: "Quick Ratio",
      value: safeRatio(ratios.quickRatio),
      formula: "(Current Assets - Inventory) / Current Liabilities",
      weight: 10,
      score: roundToTenth(safeRatio(ratios.quickRatio) * 2)
    },
    {
      name: "Debt to EBITDA",
      value: safeRatio(ratios.debtToEBITDA),
      formula: "Total Debt / Operating Income",
      weight: 10,
      score: roundToTenth((10 - safeRatio(ratios.debtToEBITDA)) * 2)
    },
    {
      name: "Operating Cash Flow Ratio",
      value: safeRatio(ratios.operatingCashFlowRatio),
      formula: "Operating Income / Current Liabilities",
      weight: 5,
      score: roundToTenth(safeRatio(ratios.operatingCashFlowRatio) * 2)
    },
    {
      name: "Leverage Ratio",
      value: safeRatio(ratios.leverageRatio),
      formula: "Total Liabilities / Total Assets",
      weight: 5,
      score: roundToTenth((1 - safeRatio(ratios.leverageRatio)) * 10)
    },
    {
      name: "Net Profit Margin",
      value: safeRatio(ratios.netProfitMargin),
      formula: "Net Income / Revenue",
      weight: 7,
      score: roundToTenth(safeRatio(ratios.netProfitMargin) * 10)
    },
    {
      name: "Gross Profit Margin",
      value: safeRatio(ratios.grossProfitMargin),
      formula: "Gross Profit / Revenue",
      weight: 7,
      score: roundToTenth(safeRatio(ratios.grossProfitMargin) * 10)
    },
    {
      name: "Operating Margin",
      value: safeRatio(ratios.operatingMargin),
      formula: "Operating Income / Revenue",
      weight: 7,
      score: roundToTenth(safeRatio(ratios.operatingMargin) * 10)
    },
    {
      name: "Return on Assets",
      value: safeRatio(ratios.returnOnAssets),
      formula: "Net Income / Total Assets",
      weight: 6,
      score: roundToTenth(safeRatio(ratios.returnOnAssets) * 20)
    },
    {
      name: "Return on Equity",
      value: safeRatio(ratios.returnOnEquity),
      formula: "Net Income / Total Equity",
      weight: 6,
      score: roundToTenth(safeRatio(ratios.returnOnEquity) * 20)
    },
    {
      name: "Asset Turnover",
      value: safeRatio(ratios.assetTurnover),
      formula: "Revenue / Total Assets",
      weight: 4,
      score: roundToTenth(safeRatio(ratios.assetTurnover) * 5)
    },
    {
      name: "Inventory Turnover",
      value: safeRatio(ratios.inventoryTurnover),
      formula: "Revenue / Inventory",
      weight: 3,
      score: roundToTenth(safeRatio(ratios.inventoryTurnover) * 0.5)
    },
    {
      name: "Debt to Equity",
      value: safeRatio(ratios.debtToEquity),
      formula: "Total Liabilities / Total Equity",
      weight: 3,
      score: roundToTenth((3 - safeRatio(ratios.debtToEquity)) * 3)
    },
    {
      name: "Equity Ratio",
      value: safeRatio(ratios.equityRatio),
      formula: "Total Equity / Total Assets",
      weight: 2,
      score: roundToTenth(safeRatio(ratios.equityRatio) * 10)
    }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-200 relative">
      <div className="container mx-auto px-6 py-8">
        <div className="border-b border-primary/10 pb-4 mb-6">
          <h1 className="text-2xl font-mono">Financial Ratio Analysis</h1>
          <p className="text-sm text-muted-foreground">
            Detailed breakdown of financial ratios and risk assessment
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="bg-black/40 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Overall Risk Score</span>
                <Badge className={riskLevel.color}>
                  {riskScore.toFixed(1)} - {riskLevel.label}
                </Badge>
              </CardTitle>
            </CardHeader>
          </Card>

          {ratioDetails.map((ratio, index) => (
            <Card key={index} className="bg-black/40 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">{ratio.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Value</p>
                      <p className="text-xl font-semibold">{ratio.value.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Score</p>
                      <p className="text-xl font-semibold">{ratio.score.toFixed(1)} / 10</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Formula</p>
                    <p className="text-sm font-mono bg-gray-900/50 p-2 rounded mt-1">
                      {ratio.formula}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Weight</p>
                    <p className="text-lg font-semibold">{ratio.weight}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BorrowerRatioDetails;
