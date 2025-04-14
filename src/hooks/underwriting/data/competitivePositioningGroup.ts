import { CriteriaGroup, ScoreRange } from "@/components/underwriting/types";

export const competitivePositioningGroup: CriteriaGroup = {
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
};
