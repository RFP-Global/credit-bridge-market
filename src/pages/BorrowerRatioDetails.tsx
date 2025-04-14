
import { useLocation, Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { roundToTenth } from "@/components/underwriting/utils/roundingUtils";
import { FinancialRatios } from "@/types/proposalDetails";
import { getRiskLevelInfo } from "@/components/vdr/utils/borrowerRiskUtils";
import { RatioGroup } from "@/components/borrower/ratio-groups/RatioGroup";

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

  const ratioGroups = [
    {
      title: "Liquidity & Coverage",
      description: "Measures the company's ability to meet short-term obligations and debt service requirements",
      ratios: [
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
      ]
    },
    {
      title: "Profitability",
      description: "Evaluates the company's ability to generate earnings and profit margins",
      ratios: [
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
      ]
    },
    {
      title: "Leverage & Capital Structure",
      description: "Assesses the company's financial leverage and capital structure",
      ratios: [
        {
          name: "Debt to EBITDA",
          value: safeRatio(ratios.debtToEBITDA),
          formula: "Total Debt / Operating Income",
          weight: 10,
          score: roundToTenth((10 - safeRatio(ratios.debtToEBITDA)) * 2)
        },
        {
          name: "Leverage Ratio",
          value: safeRatio(ratios.leverageRatio),
          formula: "Total Liabilities / Total Assets",
          weight: 5,
          score: roundToTenth((1 - safeRatio(ratios.leverageRatio)) * 10)
        },
        {
          name: "Debt to Equity",
          value: safeRatio(ratios.debtToEquity),
          formula: "Total Liabilities / Total Equity",
          weight: 3,
          score: roundToTenth((3 - safeRatio(ratios.debtToEquity)) * 3)
        },
      ]
    },
    {
      title: "Efficiency & Returns",
      description: "Measures how effectively the company uses its assets and capital",
      ratios: [
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
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <div className="container mx-auto px-6 py-8">
        <div className="border-b border-primary/10 pb-4 mb-6">
          <h1 className="text-2xl font-mono">Financial Ratio Analysis</h1>
          <p className="text-sm text-muted-foreground">
            Detailed breakdown of financial ratios and risk assessment
          </p>
        </div>

        <Card className="bg-black/40 border-gray-800 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Overall Risk Score</span>
              <Badge className={riskLevel.color}>
                {riskScore.toFixed(1)} - {riskLevel.label}
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>

        <div className="grid gap-6">
          {ratioGroups.map((group, index) => (
            <RatioGroup
              key={index}
              title={group.title}
              description={group.description}
              ratios={group.ratios}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BorrowerRatioDetails;
