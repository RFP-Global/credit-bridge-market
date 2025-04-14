
import { CriteriaGroup } from "@/components/underwriting/types";
import { liquidityRatios } from "./ratios/liquidityRatios";
import { leverageRatios } from "./ratios/leverageRatios";
import { profitabilityRatios } from "./ratios/profitabilityRatios";
import { cashFlowRatios } from "./ratios/cashFlowRatios";
import { coverageRatios } from "./ratios/coverageRatios";

export const financialStrengthGroup: CriteriaGroup = {
  name: "Financial Strength",
  description: "Measures the overall financial health of the borrower",
  weight: 25,
  minScore: 4.0,
  maxScore: 4.2,
  criteria: [
    ...liquidityRatios,
    ...leverageRatios,
    ...cashFlowRatios,
    ...coverageRatios,
    ...profitabilityRatios
  ]
};
