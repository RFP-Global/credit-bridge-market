
import { Criterion } from "@/components/underwriting/types";

export const cashFlowRatios: Criterion[] = [
  {
    name: "Operating Cash Flow Ratio",
    description: "Measures a company's ability to pay current liabilities with cash generated from operations",
    value: "1.5x",
    weight: 20,
    minScore: 4,
    maxScore: 4,
    min: 0.5,
    max: 3.0,
    step: 0.1,
    unit: "x",
    preferredMin: 1.2,
    preferredMax: 2.5,
    actualMin: 0,
    actualMax: 5,
    actualValue: 1.5,
    actualUnit: "x",
    enabled: true,
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
    name: "Debt Service Coverage Ratio",
    description: "Measures a company's ability to pay its debt obligations from operating income",
    value: "1.5x",
    weight: 15,
    minScore: 4,
    maxScore: 4,
    min: 0.5,
    max: 3.0,
    step: 0.1,
    unit: "x",
    preferredMin: 1.2,
    preferredMax: 2.5,
    actualMin: 0,
    actualMax: 5,
    actualValue: 1.5,
    actualUnit: "x",
    enabled: true,
    scoreMapping: [
      { min: 3.00, max: 100, score: 10, riskLevel: "Exceptional Debt Serviceability" },
      { min: 2.50, max: 2.99, score: 9, riskLevel: "Very Strong Debt Serviceability" },
      { min: 2.00, max: 2.49, score: 8, riskLevel: "Strong Debt Serviceability" },
      { min: 1.75, max: 1.99, score: 7, riskLevel: "Good Debt Serviceability" },
      { min: 1.50, max: 1.74, score: 6, riskLevel: "Moderate Debt Serviceability" },
      { min: 1.25, max: 1.49, score: 5, riskLevel: "Acceptable Debt Serviceability" },
      { min: 1.10, max: 1.24, score: 4, riskLevel: "Weak Debt Serviceability" },
      { min: 1.00, max: 1.09, score: 3, riskLevel: "Very Weak Debt Serviceability" },
      { min: 0.75, max: 0.99, score: 2, riskLevel: "High Debt Service Risk" },
      { min: 0, max: 0.75, score: 1, riskLevel: "Critical Debt Service Risk" }
    ]
  }
];
