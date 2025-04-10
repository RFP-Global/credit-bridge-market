import { ScoreThreshold, CriteriaGroup } from "@/components/underwriting/types";

export const initialScoreThresholds: ScoreThreshold[] = [
  { threshold: 4.5, color: "text-green-500" },
  { threshold: 3.5, color: "text-blue-500" },
  { threshold: 2.5, color: "text-yellow-500" },
  { threshold: 0, color: "text-red-500" }
];

export const initialCriteriaGroups: CriteriaGroup[] = [
  {
    name: "Financial Strength",
    description: "Measures the overall financial health of the borrower",
    weight: 25,
    minScore: 4.0,
    maxScore: 4.2,
    criteria: [
      {
        name: "DSCR Ratio",
        description: "Debt Service Coverage Ratio - measures ability to service debt",
        value: "1.8x",
        weight: 40,
        minScore: 4,
        maxScore: 4,
        min: 1,
        max: 5,
        step: 1,
        unit: "x",
        preferredMin: 1.5,
        preferredMax: 3.0,
        actualMin: 0,
        actualMax: 5,
        actualValue: 1.8,
        actualUnit: "x",
        scoreMapping: [
          { min: 3.00, max: 100, score: 10, riskLevel: "Exceptional" },
          { min: 2.50, max: 2.99, score: 9, riskLevel: "Very Strong" },
          { min: 2.00, max: 2.49, score: 8, riskLevel: "Strong" },
          { min: 1.75, max: 1.99, score: 7, riskLevel: "Good" },
          { min: 1.50, max: 1.74, score: 6, riskLevel: "Moderate" },
          { min: 1.25, max: 1.49, score: 5, riskLevel: "Acceptable" },
          { min: 1.10, max: 1.24, score: 4, riskLevel: "Weak" },
          { min: 1.00, max: 1.09, score: 3, riskLevel: "Very Weak" },
          { min: 0.75, max: 0.99, score: 2, riskLevel: "High Risk" },
          { min: 0, max: 0.75, score: 1, riskLevel: "Severe Risk" }
        ]
      },
      {
        name: "Debt/EBITDA",
        description: "Ratio of total debt to EBITDA",
        value: "3.6x",
        weight: 25,
        minScore: 4,
        maxScore: 4,
        min: 1,
        max: 5,
        step: 1,
        unit: "x",
        preferredMin: 2.0,
        preferredMax: 4.0,
        actualMin: 0,
        actualMax: 10,
        actualValue: 3.6,
        actualUnit: "x",
        scoreMapping: [
          { min: 0, max: 1.00, score: 5 },
          { min: 1.01, max: 2.00, score: 4.5 },
          { min: 2.01, max: 3.00, score: 4 },
          { min: 3.01, max: 4.00, score: 3.5 },
          { min: 4.01, max: 5.00, score: 3 },
          { min: 5.01, max: 6.00, score: 2.5 },
          { min: 6.01, max: 7.00, score: 2 },
          { min: 7.01, max: 8.00, score: 1.5 },
          { min: 8.01, max: 10.00, score: 1 },
          { min: 10.01, max: 100, score: 0.5 }
        ]
      },
      {
        name: "Current Ratio",
        description: "Current assets divided by current liabilities",
        value: "1.8x",
        weight: 20,
        minScore: 4,
        maxScore: 4,
        min: 1,
        max: 5,
        step: 1,
        unit: "x",
        preferredMin: 1.5,
        preferredMax: 3.0,
        actualMin: 0.5,
        actualMax: 3,
        actualValue: 1.8,
        actualUnit: "x",
        scoreMapping: [
          { min: 0, max: 1, score: 1 },
          { min: 1, max: 1.25, score: 2 },
          { min: 1.25, max: 1.5, score: 3 },
          { min: 1.5, max: 2, score: 4 },
          { min: 2, max: 5, score: 5 }
        ]
      },
      {
        name: "Revenue Growth",
        description: "Year-over-year revenue growth",
        value: "10.5%",
        weight: 15,
        minScore: 5,
        maxScore: 5,
        min: 1,
        max: 5,
        step: 1,
        unit: "%",
        preferredMin: 5,
        preferredMax: 25,
        actualMin: -10,
        actualMax: 30,
        actualValue: 10.5,
        actualUnit: "%",
        scoreMapping: [
          { min: -100, max: 0, score: 1 },
          { min: 0, max: 3, score: 2 },
          { min: 3, max: 7, score: 3 },
          { min: 7, max: 15, score: 4 },
          { min: 15, max: 100, score: 5 }
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
        scoreMapping: [
          { min: 0, max: 2, score: 1 },
          { min: 2, max: 5, score: 2 },
          { min: 5, max: 10, score: 3 },
          { min: 10, max: 15, score: 4 },
          { min: 15, max: 100, score: 5 }
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
        scoreMapping: [
          { min: 0, max: 15, score: 5 },
          { min: 15, max: 25, score: 4 },
          { min: 25, max: 40, score: 3 },
          { min: 40, max: 60, score: 2 },
          { min: 60, max: 100, score: 1 }
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
        scoreMapping: [
          { min: 0, max: 1, score: 1 },
          { min: 1, max: 3, score: 2 },
          { min: 3, max: 7, score: 3 },
          { min: 7, max: 12, score: 4 },
          { min: 12, max: 50, score: 5 }
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
