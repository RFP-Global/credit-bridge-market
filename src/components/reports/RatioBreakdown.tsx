
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FinancialRatios } from "@/types/proposalDetails";
import { Badge } from "@/components/ui/badge";

interface RatioBreakdownProps {
  ratios: FinancialRatios;
}

export const RatioBreakdown = ({ ratios }: RatioBreakdownProps) => {
  const getRatioStatus = (value: number, thresholds: [number, number]) => {
    if (value >= thresholds[1]) return { color: "bg-green-500/20 text-green-500", label: "Strong" };
    if (value >= thresholds[0]) return { color: "bg-yellow-500/20 text-yellow-500", label: "Adequate" };
    return { color: "bg-red-500/20 text-red-500", label: "Weak" };
  };

  const ratioGroups = [
    {
      title: "Liquidity Ratios",
      items: [
        { name: "Current Ratio", value: ratios.currentRatio, format: "x", thresholds: [1.5, 2.0] },
        { name: "Quick Ratio", value: ratios.quickRatio, format: "x", thresholds: [1.0, 1.5] },
        { name: "Cash Ratio", value: ratios.cashRatio, format: "x", thresholds: [0.5, 1.0] },
      ]
    },
    {
      title: "Leverage Ratios",
      items: [
        { name: "Debt/EBITDA", value: ratios.debtToEBITDA, format: "x", thresholds: [4.5, 3.0], inverse: true },
        { name: "Interest Coverage", value: ratios.interestCoverageRatio, format: "x", thresholds: [2.0, 3.0] },
      ]
    },
    {
      title: "Profitability Ratios",
      items: [
        { name: "Operating Margin", value: ratios.operatingMargin, format: "%", thresholds: [0.10, 0.15] },
        { name: "Return on Assets", value: ratios.returnOnAssets, format: "%", thresholds: [0.05, 0.10] },
        { name: "Return on Equity", value: ratios.returnOnEquity, format: "%", thresholds: [0.10, 0.15] },
      ]
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {ratioGroups.map((group, idx) => (
        <Card key={idx} className="bg-black/40 border-gray-800">
          <CardHeader>
            <CardTitle>{group.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {group.items.map((item, i) => {
              const status = getRatioStatus(
                item.inverse ? -item.value : item.value,
                item.inverse ? [-item.thresholds[1], -item.thresholds[0]] : item.thresholds
              );
              return (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-gray-400">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">
                      {item.format === "%" ? (item.value * 100).toFixed(1) + "%" : item.value.toFixed(2) + item.format}
                    </span>
                    <Badge variant="outline" className={status.color}>
                      {status.label}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
