
import { CriteriaGroup } from "@/components/underwriting/types";
import { liquidityRatios } from "./ratios/liquidityRatios";
import { leverageRatios } from "./ratios/leverageRatios";
import { profitabilityRatios } from "./ratios/profitabilityRatios";
import { cashFlowRatios } from "./ratios/cashFlowRatios";
import { coverageRatios } from "./ratios/coverageRatios";
import { turnoverRatios } from "./ratios/turnoverRatios";

// Calculate the min and max scores based on the criteria
const calculateGroupScores = (criteria: any[]) => {
  let minScoreSum = 0;
  let maxScoreSum = 0;
  let weightSum = 0;
  
  criteria.forEach(criterion => {
    minScoreSum += criterion.minScore * criterion.weight;
    maxScoreSum += criterion.maxScore * criterion.weight;
    weightSum += criterion.weight;
  });
  
  const minScore = parseFloat((minScoreSum / weightSum).toFixed(2));
  const maxScore = parseFloat((maxScoreSum / weightSum).toFixed(2));
  
  return { minScore, maxScore };
};

// Combine all ratios
const allRatios = [
  ...liquidityRatios,
  ...leverageRatios,
  ...cashFlowRatios,
  ...coverageRatios,
  ...turnoverRatios,
  ...profitabilityRatios
];

// Calculate the overall scores
const { minScore, maxScore } = calculateGroupScores(allRatios);

export const financialStrengthGroup: CriteriaGroup = {
  name: "Financial Strength",
  description: "Measures the overall financial health of the borrower",
  weight: 25,
  minScore,
  maxScore,
  locked: false,
  criteria: [
    ...liquidityRatios,
    ...leverageRatios,
    ...cashFlowRatios,
    ...coverageRatios,
    ...turnoverRatios,
    ...profitabilityRatios
  ]
};
