import { CriteriaGroup } from "@/components/underwriting/types";

export const industryMarketRiskGroup: CriteriaGroup = {
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
};
