import { CriteriaGroup } from "@/components/underwriting/types";

export const businessStabilityGroup: CriteriaGroup = {
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
};
