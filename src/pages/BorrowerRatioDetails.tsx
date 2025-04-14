import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { roundToTenth } from "@/components/underwriting/utils/roundingUtils";
import { FinancialRatios } from "@/types/proposalDetails";
import { getRiskLevelInfo } from "@/components/vdr/utils/borrowerRiskUtils";
import { RatioGroup } from "@/components/borrower/ratio-groups/RatioGroup";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import RatioDetailsHeader from "@/components/borrower/ratio-details/RatioDetailsHeader";
import RiskScoreCard from "@/components/borrower/ratio-details/RiskScoreCard";
import RatioDetailsGrid from "@/components/borrower/ratio-details/RatioDetailsGrid";

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
      title: "Liquidity Ratios",
      description: "Measures the company's ability to pay off its short-term debts",
      ratios: [
        {
          name: "Current Ratio",
          value: safeRatio(ratios.currentRatio),
          formula: "Current Assets / Current Liabilities",
          weight: 12,
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
          name: "Cash Ratio",
          value: safeRatio(ratios.cashRatio),
          formula: "Cash / Current Liabilities",
          weight: 8,
          score: roundToTenth(safeRatio(ratios.cashRatio) * 2)
        }
      ]
    },
    {
      title: "Leverage Ratios",
      description: "Indicates how much the company is using debt to finance its operations",
      ratios: [
        {
          name: "Debt-to-Equity Ratio",
          value: safeRatio(ratios.debtToEquity),
          formula: "Total Debt / Total Equity",
          weight: 10,
          score: roundToTenth((3 - safeRatio(ratios.debtToEquity)) * 3)
        },
        {
          name: "Debt Ratio",
          value: safeRatio(ratios.leverageRatio),
          formula: "Total Debt / Total Assets",
          weight: 8,
          score: roundToTenth((1 - safeRatio(ratios.leverageRatio)) * 10)
        },
        {
          name: "Equity Ratio",
          value: safeRatio(ratios.equityRatio),
          formula: "Total Equity / Total Assets",
          weight: 7,
          score: roundToTenth(safeRatio(ratios.equityRatio) * 10)
        },
        {
          name: "Interest Coverage Ratio",
          value: safeRatio(ratios.interestCoverageRatio),
          formula: "EBIT / Interest Expenses",
          weight: 8,
          score: roundToTenth(safeRatio(ratios.interestCoverageRatio))
        },
        {
          name: "Fixed Charge Coverage Ratio",
          value: safeRatio(ratios.fixedChargeCoverageRatio),
          formula: "(EBIT + Fixed Charges) / (Fixed Charges + Interest)",
          weight: 7,
          score: roundToTenth(safeRatio(ratios.fixedChargeCoverageRatio))
        }
      ]
    },
    {
      title: "Profitability Ratios",
      description: "Shows how well the company generates profit relative to its revenue and resources",
      ratios: [
        {
          name: "Net Profit Margin",
          value: safeRatio(ratios.netProfitMargin),
          formula: "Net Income / Revenue",
          weight: 8,
          score: roundToTenth(safeRatio(ratios.netProfitMargin) * 10)
        },
        {
          name: "Gross Margin",
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
          name: "Return on Assets (ROA)",
          value: safeRatio(ratios.returnOnAssets),
          formula: "Net Income / Total Assets",
          weight: 8,
          score: roundToTenth(safeRatio(ratios.returnOnAssets) * 20)
        },
        {
          name: "Return on Equity (ROE)",
          value: safeRatio(ratios.returnOnEquity),
          formula: "Net Income / Total Equity",
          weight: 8,
          score: roundToTenth(safeRatio(ratios.returnOnEquity) * 20)
        }
      ]
    },
    {
      title: "Cash Flow Ratios",
      description: "Evaluates the company's ability to generate and manage cash flow",
      ratios: [
        {
          name: "Operating Cash Flow Ratio",
          value: safeRatio(ratios.operatingCashFlowRatio),
          formula: "Operating Cash Flow / Current Liabilities",
          weight: 10,
          score: roundToTenth(safeRatio(ratios.operatingCashFlowRatio) * 2)
        },
        {
          name: "Debt Service Coverage Ratio",
          value: safeRatio(ratios.debtServiceCoverageRatio),
          formula: "Operating Income / Total Debt Service",
          weight: 12,
          score: roundToTenth(safeRatio(ratios.debtServiceCoverageRatio) * 2)
        },
        {
          name: "Free Cash Flow to Firm",
          value: safeRatio(ratios.freeCashFlowToFirm),
          formula: "Operating Cash Flow - CapEx",
          weight: 8,
          score: roundToTenth(safeRatio(ratios.freeCashFlowToFirm) * 0.1)
        }
      ]
    },
    {
      title: "Coverage & Repayment Ratios",
      description: "Assesses the company's ability to meet its debt obligations",
      ratios: [
        {
          name: "Loan-to-Value Ratio",
          value: safeRatio(ratios.loanToValueRatio),
          formula: "Loan Amount / Asset Value",
          weight: 10,
          score: roundToTenth((1 - safeRatio(ratios.loanToValueRatio)) * 10)
        },
        {
          name: "Collateral Coverage Ratio",
          value: safeRatio(ratios.collateralCoverageRatio),
          formula: "Collateral Value / Loan Amount",
          weight: 10,
          score: roundToTenth(safeRatio(ratios.collateralCoverageRatio) * 2)
        },
        {
          name: "Leverage Coverage Ratio",
          value: safeRatio(ratios.leverageCoverageRatio),
          formula: "EBITDA / (Principal + Interest Payments)",
          weight: 8,
          score: roundToTenth(safeRatio(ratios.leverageCoverageRatio) * 2)
        },
        {
          name: "Payback Period",
          value: safeRatio(ratios.paybackPeriod),
          formula: "Initial Investment / Annual Cash Flow",
          weight: 8,
          score: roundToTenth((10 - safeRatio(ratios.paybackPeriod)) * 1)
        }
      ]
    },
    {
      title: "Efficiency & Operational Ratios",
      description: "Measures how effectively the company uses its resources",
      ratios: [
        {
          name: "Accounts Receivable Turnover",
          value: safeRatio(ratios.accountsReceivableTurnover),
          formula: "Net Credit Sales / Average Accounts Receivable",
          weight: 6,
          score: roundToTenth(safeRatio(ratios.accountsReceivableTurnover) * 0.5)
        },
        {
          name: "Inventory Turnover",
          value: safeRatio(ratios.inventoryTurnover),
          formula: "Cost of Goods Sold / Average Inventory",
          weight: 6,
          score: roundToTenth(safeRatio(ratios.inventoryTurnover) * 0.5)
        },
        {
          name: "Asset Turnover Ratio",
          value: safeRatio(ratios.assetTurnover),
          formula: "Revenue / Average Total Assets",
          weight: 6,
          score: roundToTenth(safeRatio(ratios.assetTurnover) * 2)
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <div className="container mx-auto px-6 py-8">
        <RatioDetailsHeader />
        <RiskScoreCard riskScore={riskScore} riskLevel={riskLevel} />
        <RatioDetailsGrid ratioGroups={ratioGroups} />
      </div>
    </div>
  );
};

export default BorrowerRatioDetails;
