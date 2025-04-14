
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FinancialRatios } from "@/types/proposalDetails";
import { RadarChart, AreaChart } from "@/components/charts";

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
      value: (1 - ratios.debtToEquity / 4) * 100,
      fullMark: 100,
    },
    {
      subject: "Profitability",
      value: ratios.operatingMargin * 200,
      fullMark: 100,
    },
    {
      subject: "Coverage",
      value: ratios.debtServiceCoverageRatio * 40,
      fullMark: 100,
    },
    {
      subject: "Efficiency",
      value: ratios.assetTurnover * 50,
      fullMark: 100,
    }
  ];

  const keyRatios = [
    {
      name: "Current",
      liquidity: ratios.currentRatio,
      leverage: ratios.debtToEquity,
      profitability: ratios.operatingMargin * 100,
      coverage: ratios.debtServiceCoverageRatio,
      efficiency: ratios.assetTurnover,
    }
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
          <CardTitle>Key Performance Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <AreaChart
            data={keyRatios}
            dataKeys={[
              { key: "liquidity", name: "Liquidity", color: "#33bbef" },
              { key: "leverage", name: "Leverage", color: "#f97316" },
              { key: "profitability", name: "Profitability", color: "#10b981" },
              { key: "coverage", name: "Coverage", color: "#8b5cf6" },
              { key: "efficiency", name: "Efficiency", color: "#ec4899" },
            ]}
            xAxisKey="name"
            height={300}
          />
        </CardContent>
      </Card>
    </div>
  );
};
