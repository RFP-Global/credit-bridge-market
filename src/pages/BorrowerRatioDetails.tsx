
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

  const ratioDetails: RatioDetails[] = [
    {
      name: "Debt Service Coverage Ratio",
      value: ratios.debtServiceCoverageRatio,
      formula: "Operating Income / Annual Debt Service",
      weight: 30,
      score: roundToTenth(ratios.debtServiceCoverageRatio * 2)
    },
    {
      name: "Current Ratio",
      value: ratios.currentRatio,
      formula: "Current Assets / Current Liabilities",
      weight: 25,
      score: roundToTenth(ratios.currentRatio * 2)
    },
    {
      name: "Quick Ratio",
      value: ratios.quickRatio,
      formula: "(Current Assets - Inventory) / Current Liabilities",
      weight: 25,
      score: roundToTenth(ratios.quickRatio * 2)
    },
    {
      name: "Debt to EBITDA",
      value: ratios.debtToEBITDA,
      formula: "Total Debt / Operating Income",
      weight: 20,
      score: roundToTenth((10 - ratios.debtToEBITDA) * 2)
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
