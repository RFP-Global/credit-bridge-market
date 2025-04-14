
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

interface RatioCategory {
  name: string;
  ratios: {
    name: string;
    value: number | string;
    description: string;
  }[];
}

export interface FinancialRatiosProps {
  ratios: Record<string, number>;
}

export const FinancialRatios = ({ ratios }: FinancialRatiosProps) => {
  const calculateRatios = (): RatioCategory[] => {
    const fd = ratios;
    
    return [
      {
        name: "Liquidity Ratios",
        ratios: [
          {
            name: "Current Ratio",
            value: (fd.currentAssets / fd.currentLiabilities || 0).toFixed(2),
            description: "Measures short-term liquidity"
          },
          {
            name: "Quick Ratio (Acid Test)",
            value: ((fd.currentAssets - fd.inventory) / fd.currentLiabilities || 0).toFixed(2),
            description: "More conservative measure of liquidity"
          },
          {
            name: "Cash Ratio",
            value: (fd.cashAndEquivalents / fd.currentLiabilities || 0).toFixed(2),
            description: "Measures most liquid assets vs. liabilities"
          }
        ]
      },
      {
        name: "Leverage Ratios",
        ratios: [
          {
            name: "Debt-to-Equity Ratio",
            value: (fd.totalDebt / fd.totalEquity || 0).toFixed(2),
            description: "Shows the extent of financial leverage"
          },
          {
            name: "Debt Ratio",
            value: (fd.totalLiabilities / fd.totalAssets || 0).toFixed(2),
            description: "Measures proportion of assets financed with debt"
          },
          {
            name: "Equity Ratio",
            value: (fd.totalEquity / fd.totalAssets || 0).toFixed(2),
            description: "Measures solvency and capital structure"
          },
          {
            name: "Interest Coverage Ratio",
            value: (fd.ebit / fd.interestExpense || 0).toFixed(2),
            description: "Measures ability to service interest payments"
          },
          {
            name: "Fixed Charge Coverage Ratio",
            value: ((fd.ebit + fd.leasePayments) / (fd.interestExpense + fd.leasePayments) || 0).toFixed(2),
            description: "Includes lease obligations with debt service"
          }
        ]
      },
      {
        name: "Profitability Ratios",
        ratios: [
          {
            name: "Net Profit Margin",
            value: ((fd.netIncome / fd.revenue) * 100 || 0).toFixed(2) + "%",
            description: "Shows net income per dollar of sales"
          },
          {
            name: "Gross Margin",
            value: ((fd.grossProfit / fd.revenue) * 100 || 0).toFixed(2) + "%",
            description: "Measures markup on goods sold"
          },
          {
            name: "Operating Margin",
            value: ((fd.operatingIncome / fd.revenue) * 100 || 0).toFixed(2) + "%",
            description: "Core operating efficiency"
          },
          {
            name: "Return on Assets (ROA)",
            value: ((fd.netIncome / fd.totalAssets) * 100 || 0).toFixed(2) + "%",
            description: "Efficiency in asset usage"
          },
          {
            name: "Return on Equity (ROE)",
            value: ((fd.netIncome / fd.totalEquity) * 100 || 0).toFixed(2) + "%",
            description: "Profitability from owner's perspective"
          }
        ]
      },
      {
        name: "Cash Flow & Coverage Ratios",
        ratios: [
          {
            name: "Operating Cash Flow Ratio",
            value: (fd.operatingCashFlow / fd.currentLiabilities || 0).toFixed(2),
            description: "Measures short-term liquidity using cash flow"
          },
          {
            name: "Debt Service Coverage Ratio",
            value: (fd.ebitda / (fd.principalPayment + fd.interestExpense) || 0).toFixed(2),
            description: "Measures ability to repay all debt obligations"
          },
          {
            name: "Free Cash Flow to Firm",
            value: ((fd.ebit * (1 - 0.21) + fd.depreciation - fd.capex - fd.workingCapitalChange) || 0).toFixed(2),
            description: "Measures true cash flow available to all capital providers"
          },
          {
            name: "Loan-to-Value Ratio",
            value: ((fd.loanAmount / fd.collateralValue) * 100 || 0).toFixed(2) + "%",
            description: "Measures collateral adequacy"
          }
        ]
      },
      {
        name: "Efficiency Ratios",
        ratios: [
          {
            name: "Accounts Receivable Turnover",
            value: (fd.netCreditSales / fd.accountsReceivable || 0).toFixed(2),
            description: "How quickly receivables are collected"
          },
          {
            name: "Inventory Turnover",
            value: (fd.cogs / fd.inventory || 0).toFixed(2),
            description: "How efficiently inventory is managed"
          },
          {
            name: "Asset Turnover Ratio",
            value: (fd.revenue / fd.totalAssets || 0).toFixed(2),
            description: "Efficiency in using assets to generate sales"
          }
        ]
      }
    ];
  };

  const ratioCategories = calculateRatios();

  return (
    <Card className="bg-black/40 border-gray-800">
      <CardHeader className="flex flex-row items-center border-b border-gray-800">
        <Calculator className="mr-2 h-4 w-4 text-primary" />
        <CardTitle className="text-sm font-mono">FINANCIAL RATIOS ANALYSIS</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-8">
        {ratioCategories.map((category) => (
          <div key={category.name} className="space-y-4">
            <h3 className="text-sm font-semibold text-primary">{category.name}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {category.ratios.map((ratio) => (
                <div key={ratio.name} className="p-4 rounded-lg bg-black/20 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{ratio.name}</span>
                    <span className="text-lg font-mono text-primary">{ratio.value}</span>
                  </div>
                  <p className="text-xs text-gray-400">{ratio.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
