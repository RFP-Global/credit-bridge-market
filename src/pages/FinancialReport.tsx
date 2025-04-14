
import { useLocation, Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FinancialRatios } from "@/types/proposalDetails";
import { FinancialSynopsis } from "@/components/reports/FinancialSynopsis";
import { RatioCharts } from "@/components/reports/RatioCharts";
import { RatioBreakdown } from "@/components/reports/RatioBreakdown";

const FinancialReport = () => {
  const location = useLocation();
  const state = location.state as { ratios: FinancialRatios; riskScore: number } | null;

  if (!state?.ratios || state.riskScore === undefined) {
    return <Navigate to="/borrower-underwriting" replace />;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto space-y-6">
        <Card className="bg-black/40 border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl font-mono">Financial Analysis Report</CardTitle>
          </CardHeader>
        </Card>
        
        <FinancialSynopsis ratios={state.ratios} riskScore={state.riskScore} />
        <RatioCharts ratios={state.ratios} />
        <RatioBreakdown ratios={state.ratios} />
      </div>
    </div>
  );
};

export default FinancialReport;
