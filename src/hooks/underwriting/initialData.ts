import { CriteriaGroup, ScoreThreshold } from "@/components/underwriting/types";

export const initialScoreThresholds: ScoreThreshold[] = [
  { threshold: 9, color: "text-green-500" },
  { threshold: 7, color: "text-blue-500" },
  { threshold: 5, color: "text-yellow-500" },
  { threshold: 0, color: "text-red-500" }
];

export const initialCriteriaGroups: CriteriaGroup[] = [
  {
    name: "Financial Strength",
    description: "Key financial ratios and metrics",
    weight: 30,
    minScore: 1,
    maxScore: 10,
    criteria: [
      {
        name: "Liquidity Ratios",
        description: "Measures of short-term liquidity",
        value: "Moderate",
        weight: 25,
        minScore: 1,
        maxScore: 10,
        min: 0,
        max: 3,
        step: 0.1,
        unit: "ratio",
        enabled: true,
        scoreMapping: [
          { min: 0, max: 0.5, score: 1, riskLevel: "High Risk" },
          { min: 0.5, max: 1, score: 3, riskLevel: "Moderate Risk" },
          { min: 1, max: 1.5, score: 7, riskLevel: "Low Risk" },
          { min: 1.5, max: 3, score: 10, riskLevel: "Very Low Risk" }
        ],
        subcriteria: [
          {
            name: "Current Ratio",
            description: "Current Assets / Current Liabilities",
            target: ">= 1.5",
            weight: 35
          },
          {
            name: "Quick Ratio",
            description: "(Current Assets - Inventory) / Current Liabilities",
            target: ">= 1.0",
            weight: 35
          },
          {
            name: "Cash Ratio",
            description: "Cash & Equivalents / Current Liabilities",
            target: ">= 0.5",
            weight: 30
          }
        ]
      },
      {
        name: "Leverage Ratios",
        description: "Measures of financial leverage and solvency",
        value: "Moderate",
        weight: 25,
        minScore: 1,
        maxScore: 10,
        min: 0,
        max: 5,
        step: 0.1,
        unit: "ratio",
        enabled: true,
        scoreMapping: [
          { min: 0, max: 1, score: 10, riskLevel: "Very Low Risk" },
          { min: 1, max: 2, score: 7, riskLevel: "Low Risk" },
          { min: 2, max: 3, score: 4, riskLevel: "Moderate Risk" },
          { min: 3, max: 5, score: 1, riskLevel: "High Risk" }
        ],
        subcriteria: [
          {
            name: "Debt-to-Equity Ratio",
            description: "Total Debt / Total Equity",
            target: "<= 2.0",
            weight: 25
          },
          {
            name: "Debt Ratio",
            description: "Total Liabilities / Total Assets",
            target: "<= 0.6",
            weight: 25
          },
          {
            name: "Equity Ratio",
            description: "Total Equity / Total Assets",
            target: ">= 0.4",
            weight: 20
          },
          {
            name: "Interest Coverage Ratio",
            description: "EBIT / Interest Expense",
            target: ">= 2.0",
            weight: 15
          },
          {
            name: "Fixed Charge Coverage Ratio",
            description: "(EBIT + Lease Payments) / (Interest + Lease Payments)",
            target: ">= 1.5",
            weight: 15
          }
        ]
      },
      {
        name: "Profitability Ratios",
        description: "Measures of operational effectiveness",
        value: "Moderate",
        weight: 20,
        minScore: 1,
        maxScore: 10,
        min: -20,
        max: 40,
        step: 1,
        unit: "%",
        enabled: true,
        scoreMapping: [
          { min: 20, max: 40, score: 10, riskLevel: "Very Low Risk" },
          { min: 10, max: 20, score: 7, riskLevel: "Low Risk" },
          { min: 0, max: 10, score: 4, riskLevel: "Moderate Risk" },
          { min: -20, max: 0, score: 1, riskLevel: "High Risk" }
        ],
        subcriteria: [
          {
            name: "Net Profit Margin",
            description: "Net Income / Revenue",
            target: ">= 10%",
            weight: 20
          },
          {
            name: "Gross Margin",
            description: "Gross Profit / Revenue",
            target: ">= 30%",
            weight: 20
          },
          {
            name: "Operating Margin",
            description: "Operating Income / Revenue",
            target: ">= 15%",
            weight: 20
          },
          {
            name: "Return on Assets (ROA)",
            description: "Net Income / Total Assets",
            target: ">= 5%",
            weight: 20
          },
          {
            name: "Return on Equity (ROE)",
            description: "Net Income / Total Equity",
            target: ">= 15%",
            weight: 20
          }
        ]
      },
      {
        name: "Cash Flow & Coverage Ratios",
        description: "Measures of cash flow adequacy and debt service capability",
        value: "Moderate",
        weight: 15,
        minScore: 1,
        maxScore: 10,
        min: 0,
        max: 2,
        step: 0.1,
        unit: "ratio",
        enabled: true,
        scoreMapping: [
          { min: 1.5, max: 2, score: 10, riskLevel: "Very Low Risk" },
          { min: 1.25, max: 1.5, score: 7, riskLevel: "Low Risk" },
          { min: 1, max: 1.25, score: 4, riskLevel: "Moderate Risk" },
          { min: 0, max: 1, score: 1, riskLevel: "High Risk" }
        ],
        subcriteria: [
          {
            name: "Operating Cash Flow Ratio",
            description: "Operating Cash Flow / Current Liabilities",
            target: ">= 1.0",
            weight: 15
          },
          {
            name: "Debt Service Coverage Ratio",
            description: "EBITDA / (Principal + Interest)",
            target: ">= 1.25",
            weight: 20
          },
          {
            name: "Free Cash Flow to Firm",
            description: "EBIT × (1 - Tax Rate) + Depreciation - CapEx - ΔWorking Capital",
            target: "> 0",
            weight: 15
          },
          {
            name: "Loan-to-Value Ratio",
            description: "Loan Amount / Collateral Value",
            target: "<= 80%",
            weight: 15
          },
          {
            name: "Collateral Coverage Ratio",
            description: "Collateral Value / Loan Amount",
            target: ">= 1.25",
            weight: 20
          },
          {
            name: "Leverage Coverage Ratio",
            description: "EBITDA / Total Debt",
            target: ">= 0.2",
            weight: 15
          }
        ]
      },
      {
        name: "Efficiency Ratios",
        description: "Measures of operational efficiency",
        value: "Moderate",
        weight: 15,
        minScore: 1,
        maxScore: 10,
        min: 0,
        max: 20,
        step: 0.1,
        unit: "turns",
        enabled: true,
        scoreMapping: [
          { min: 10, max: 20, score: 10, riskLevel: "Very Low Risk" },
          { min: 6, max: 10, score: 7, riskLevel: "Low Risk" },
          { min: 3, max: 6, score: 4, riskLevel: "Moderate Risk" },
          { min: 0, max: 3, score: 1, riskLevel: "High Risk" }
        ],
        subcriteria: [
          {
            name: "Accounts Receivable Turnover",
            description: "Net Credit Sales / Average Accounts Receivable",
            target: ">= 4",
            weight: 35
          },
          {
            name: "Inventory Turnover",
            description: "COGS / Average Inventory",
            target: ">= 6",
            weight: 35
          },
          {
            name: "Asset Turnover Ratio",
            description: "Revenue / Total Assets",
            target: ">= 1",
            weight: 30
          }
        ]
      }
    ]
  },
  {
    name: "Business Stability",
    description: "Evaluates the operational stability of the business",
    weight: 20,
    minScore: 3.3,
    maxScore: 3.5,
    criteria: [
      {
        name: "Years in Business",
        description: "Number of years since company founding",
        value: "14 years",
        weight: 35,
        minScore: 4,
        maxScore: 4,
        min: 1,
        max: 5,
        step: 1,
        actualMin: 0,
        actualMax: 30,
        actualValue: 14,
        actualUnit: " years",
        enabled: true,
        scoreMapping: [
          { min: 15.00, max: 30.00, score: 10, riskLevel: "Exceptional" },
          { min: 10.00, max: 14.99, score: 9, riskLevel: "Very Strong" },
          { min: 7.00, max: 9.99, score: 8, riskLevel: "Strong" },
          { min: 5.00, max: 6.99, score: 7, riskLevel: "Good" },
          { min: 3.00, max: 4.99, score: 6, riskLevel: "Moderate" },
          { min: 2.00, max: 2.99, score: 5, riskLevel: "Acceptable" },
          { min: 1.00, max: 1.99, score: 4, riskLevel: "Weak" },
          { min: 0.50, max: 0.99, score: 3, riskLevel: "Very Weak" },
          { min: 0.25, max: 0.49, score: 2, riskLevel: "High Risk" },
          { min: 0, max: 0.24, score: 1, riskLevel: "Severe Risk" }
        ]
      },
      {
        name: "Revenue Concentration",
        description: "Dependency on key customers",
        value: "32%",
        weight: 25,
        minScore: 3,
        maxScore: 3,
        min: 1,
        max: 5,
        step: 1,
        actualMin: 0,
        actualMax: 100,
        actualValue: 32,
        actualUnit: "%",
        enabled: true,
        scoreMapping: [
          { min: 0, max: 10, score: 10, riskLevel: "Highly Diversified" },
          { min: 10, max: 15, score: 9, riskLevel: "Very Diversified" },
          { min: 15, max: 20, score: 8, riskLevel: "Well Diversified" },
          { min: 20, max: 25, score: 7, riskLevel: "Good Diversification" },
          { min: 25, max: 30, score: 6, riskLevel: "Moderate Diversification" },
          { min: 30, max: 40, score: 5, riskLevel: "Acceptable Diversification" },
          { min: 40, max: 50, score: 4, riskLevel: "Limited Diversification" },
          { min: 50, max: 60, score: 3, riskLevel: "Poor Diversification" },
          { min: 60, max: 75, score: 2, riskLevel: "Very Concentrated" },
          { min: 75, max: 100, score: 1, riskLevel: "Extremely Concentrated" }
        ]
      },
      {
        name: "Geographic Footprint",
        description: "Regional diversity of operations",
        value: "7 states",
        weight: 40,
        minScore: 3,
        maxScore: 3,
        min: 1,
        max: 5,
        step: 1,
        actualMin: 0,
        actualMax: 20,
        actualValue: 7,
        actualUnit: " states",
        enabled: true,
        scoreMapping: [
          { min: 12, max: 50, score: 10, riskLevel: "National/International" },
          { min: 10, max: 11.99, score: 9, riskLevel: "Multi-Regional" },
          { min: 8, max: 9.99, score: 8, riskLevel: "Broad Regional" },
          { min: 7, max: 7.99, score: 7, riskLevel: "Regional" },
          { min: 5, max: 6.99, score: 6, riskLevel: "Limited Regional" },
          { min: 3, max: 4.99, score: 5, riskLevel: "Multi-State" },
          { min: 2, max: 2.99, score: 4, riskLevel: "Dual-State" },
          { min: 1, max: 1.99, score: 3, riskLevel: "Single State" },
          { min: 0.5, max: 0.99, score: 2, riskLevel: "Metropolitan Area" },
          { min: 0, max: 0.49, score: 1, riskLevel: "Local Only" }
        ]
      }
    ]
  },
  {
    name: "Competitive Positioning",
    description: "Evaluates market position relative to competitors",
    weight: 15,
    minScore: 4.3,
    maxScore: 4.4,
    criteria: [
      {
        name: "Market Share",
        description: "Percentage of total addressable market",
        value: "7%",
        weight: 30,
        minScore: 4,
        maxScore: 4,
        min: 1,
        max: 5,
        step: 1,
        actualMin: 0,
        actualMax: 25,
        actualValue: 7,
        actualUnit: "%",
        enabled: true,
        scoreMapping: [
          { min: 0, max: 1, score: 1 },
          { min: 1, max: 3, score: 2 },
          { min: 3, max: 5, score: 3 },
          { min: 5, max: 10, score: 4 },
          { min: 10, max: 100, score: 5 }
        ]
      },
      {
        name: "Differentiation Score",
        description: "Uniqueness of product/service offering",
        value: "High",
        weight: 35,
        minScore: 5,
        maxScore: 5,
        min: 1,
        max: 5,
        step: 1,
        actualMin: 1,
        actualMax: 10,
        actualValue: 8,
        actualUnit: "",
        enabled: true,
        scoreMapping: [
          { min: 1, max: 3, score: 1 },
          { min: 3, max: 5, score: 2 },
          { min: 5, max: 6, score: 3 },
          { min: 6, max: 8, score: 4 },
          { min: 8, max: 10, score: 5 }
        ]
      },
      {
        name: "Barrier to Entry Score",
        description: "Difficulty for new competitors to enter market",
        value: "Medium-High",
        weight: 35,
        minScore: 4,
        maxScore: 4,
        min: 1,
        max: 5,
        step: 1,
        actualMin: 1,
        actualMax: 10,
        actualValue: 7,
        actualUnit: "",
        enabled: true,
        scoreMapping: [
          { min: 1, max: 3, score: 1 },
          { min: 3, max: 5, score: 2 },
          { min: 5, max: 6, score: 3 },
          { min: 6, max: 8, score: 4 },
          { min: 8, max: 10, score: 5 }
        ]
      }
    ]
  },
  {
    name: "Management Strength",
    description: "Assesses the experience and capability of leadership team",
    weight: 15,
    minScore: 4.8,
    maxScore: 4.9,
    criteria: [
      {
        name: "Leadership Depth",
        description: "Experience level of management team",
        value: "Very High",
        weight: 40,
        minScore: 5,
        maxScore: 5,
        min: 1,
        max: 5,
        step: 1,
        actualMin: 1,
        actualMax: 10,
        actualValue: 9,
        actualUnit: "",
        enabled: true,
        scoreMapping: [
          { min: 1, max: 3, score: 1 },
          { min: 3, max: 5, score: 2 },
          { min: 5, max: 6, score: 3 },
          { min: 6, max: 8, score: 4 },
          { min: 8, max: 10, score: 5 }
        ]
      },
      {
        name: "Ownership/Management Alignment",
        description: "Alignment between ownership and management",
        value: "High",
        weight: 30,
        minScore: 5,
        maxScore: 5,
        min: 1,
        max: 5,
        step: 1,
        actualMin: 1,
        actualMax: 10,
        actualValue: 8,
        actualUnit: "",
        enabled: true,
        scoreMapping: [
          { min: 1, max: 3, score: 1 },
          { min: 3, max: 5, score: 2 },
          { min: 5, max: 6, score: 3 },
          { min: 6, max: 8, score: 4 },
          { min: 8, max: 10, score: 5 }
        ]
      },
      {
        name: "Succession Plan",
        description: "Quality of transition planning",
        value: "Moderate",
        weight: 30,
        minScore: 4,
        maxScore: 4,
        min: 1,
        max: 5,
        step: 1,
        actualMin: 1,
        actualMax: 10,
        actualValue: 7,
        actualUnit: "",
        enabled: true,
        scoreMapping: [
          { min: 1, max: 3, score: 1 },
          { min: 3, max: 5, score: 2 },
          { min: 5, max: 6, score: 3 },
          { min: 6, max: 8, score: 4 },
          { min: 8, max: 10, score: 5 }
        ]
      }
    ]
  },
  {
    name: "Industry & Market Risk",
    description: "Evaluates sector-specific risks and market dynamics",
    weight: 25,
    minScore: 3.6,
    maxScore: 3.7,
    criteria: [
      {
        name: "Industry Volatility",
        description: "Historical stability of the industry",
        value: "Moderate",
        weight: 30,
        minScore: 3,
        maxScore: 3,
        min: 1,
        max: 5,
        step: 1,
        actualMin: 0,
        actualMax: 10,
        actualValue: 3,
        actualUnit: "",
        enabled: true,
        scoreMapping: [
          { min: 0, max: 2, score: 5 },
          { min: 2, max: 4, score: 4 },
          { min: 4, max: 6, score: 3 },
          { min: 6, max: 8, score: 2 },
          { min: 8, max: 10, score: 1 }
        ]
      },
      {
        name: "Market Growth",
        description: "Projected growth rate of target market",
        value: "Growing/Predictable",
        weight: 40,
        minScore: 4,
        maxScore: 4,
        min: 1,
        max: 5,
        step: 1,
        actualMin: 0,
        actualMax: 10,
        actualValue: 4,
        actualUnit: "",
        enabled: true,
        scoreMapping: [
          { min: 0, max: 2, score: 5 },
          { min: 2, max: 4, score: 4 },
          { min: 4, max: 6, score: 3 },
          { min: 6, max: 8, score: 2 },
          { min: 8, max: 10, score: 1 }
        ]
      },
      {
        name: "Regulatory Risk",
        description: "Exposure to regulatory changes",
        value: "Moderate-High",
        weight: 30,
        minScore: 3,
        maxScore: 3,
        min: 1,
        max: 5,
        step: 1,
        actualMin: 0,
        actualMax: 10,
        actualValue: 3,
        actualUnit: "",
        enabled: true,
        scoreMapping: [
          { min: 0, max: 2, score: 5 },
          { min: 2, max: 4, score: 4 },
          { min: 4, max: 6, score: 3 },
          { min: 6, max: 8, score: 2 },
          { min: 8, max: 10, score: 1 }
        ]
      }
    ]
  },
  {
    name: "Covenant Health",
    description: "Compliance with existing loan covenants",
    weight: 15,
    minScore: 4.7,
    maxScore: 4.8,
    criteria: [
      {
        name: "Covenant Compliance",
        description: "Historical compliance with financial covenants",
        value: "High",
        weight: 40,
        minScore: 5,
        maxScore: 5,
        min: 1,
        max: 5,
        step: 1,
        actualMin: 0,
        actualMax: 10,
        actualValue: 5,
        actualUnit: "",
        enabled: true,
        scoreMapping: [
          { min: 0, max: 2, score: 5 },
          { min: 2, max: 4, score: 4 },
          { min: 4, max: 6, score: 3 },
          { min: 6, max: 8, score: 2 },
          { min: 8, max: 10, score: 1 }
        ]
      },
      {
        name: "Primary Banking Relationship",
        description: "Strength of primary banking relationship",
        value: "Strong",
        weight: 20,
        minScore: 5,
        maxScore: 5,
        min: 1,
        max: 5,
        step: 1,
        actualMin: 0,
        actualMax: 10,
        actualValue: 5,
        actualUnit: "",
        enabled: true,
        scoreMapping: [
          { min: 0, max: 2, score: 5 },
          { min: 2, max: 4, score: 4 },
          { min: 4, max: 6, score: 3 },
          { min: 6, max: 8, score: 2 },
          { min: 8, max: 10, score: 1 }
        ]
      },
      {
        name: "Payment History",
        description: "Historical payment performance",
        value: "Excellent",
        weight: 20,
        minScore: 5,
        maxScore: 5,
        min: 1,
        max: 5,
        step: 1,
        actualMin: 0,
        actualMax: 10,
        actualValue: 5,
        actualUnit: "",
        enabled: true,
        scoreMapping: [
          { min: 0, max: 2, score: 5 },
          { min: 2, max: 4, score: 4 },
          { min: 4, max: 6, score: 3 },
          { min: 6, max: 8, score: 2 },
          { min: 8, max: 10, score: 1 }
        ]
      },
      {
        name: "Covenant Flexibility",
        description: "Flexibility within existing covenant structure",
        value: "Medium",
        weight: 20,
        minScore: 4,
        maxScore: 4,
        min: 1,
        max: 5,
        step: 1,
        actualMin: 0,
        actualMax: 10,
        actualValue: 4,
        actualUnit: "",
        enabled: true,
        scoreMapping: [
          { min: 0, max: 2, score: 5 },
          { min: 2, max: 4, score: 4 },
          { min: 4, max: 6, score: 3 },
          { min: 6, max: 8, score: 2 },
          { min: 8, max: 10, score: 1 }
        ]
      }
    ]
  }
];
