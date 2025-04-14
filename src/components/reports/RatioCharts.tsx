
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FinancialRatios } from "@/types/proposalDetails";
import { AreaChart, RadarChart, TimeSeriesLineChart } from "@/components/charts";

interface RatioChartsProps {
  ratios: FinancialRatios;
}

export const RatioCharts = ({ ratios }: RatioChartsProps) => {
  const radarData = [
    {
      subject: "Liquidity",
      value: ratios.currentRatio / 3 * 100,
      fullMark: 100,
    },
    {
      subject: "Solvency",
      value: (1 - ratios.debtToEBITDA / 6) * 100,
      fullMark: 100,
    },
    {
      subject: "Profitability",
      value: ratios.operatingMargin * 100,
      fullMark: 100,
    },
    {
      subject: "Coverage",
      value: ratios.interestCoverageRatio / 5 * 100,
      fullMark: 100,
    },
    {
      subject: "Efficiency",
      value: ratios.assetTurnover / 2 * 100,
      fullMark: 100,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="bg-black/40 border-gray-800">
        <CardHeader>
          <CardTitle>Financial Health Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <RadarChart
            data={radarData}
            dataKeys={["value"]}
            height={300}
          />
        </CardContent>
      </Card>
      
      <Card className="bg-black/40 border-gray-800">
        <CardHeader>
          <CardTitle>Key Ratios</CardTitle>
        </CardHeader>
        <CardContent>
          <AreaChart
            data={[
              {
                name: "Current",
                liquidity: ratios.currentRatio,
                coverage: ratios.debtServiceCoverageRatio,
                leverage: ratios.debtToEBITDA,
              }
            ]}
            dataKeys={[
              { key: "liquidity", name: "Liquidity Ratio", color: "#33bbef" },
              { key: "coverage", name: "Coverage Ratio", color: "#10b981" },
              { key: "leverage", name: "Leverage Ratio", color: "#f97316" },
            ]}
            xAxisKey="name"
            height={300}
          />
        </CardContent>
      </Card>
    </div>
  );
};
