
import { CriteriaGroup } from "../types";

export const getFilteredCriteria = (criteria: CriteriaGroup["criteria"], criteriaNames: string[]) => {
  return criteria.filter(c => criteriaNames.includes(c.name));
};

export const findCriteriaIndices = (criteria: CriteriaGroup["criteria"], filteredCriteria: CriteriaGroup["criteria"]) => {
  return filteredCriteria.map(fc => criteria.findIndex(c => c.name === fc.name));
};

export const ratioNames = {
  liquidityRatios: ["Current Ratio", "Quick Ratio", "Cash Ratio"],
  leverageRatios: ["Debt-to-Equity", "Debt Ratio", "Equity Ratio", "Fixed Charge Coverage Ratio", "Interest Coverage Ratio"],
  cashFlowRatios: ["Operating Cash Flow Ratio", "Debt Service Coverage Ratio"],
  coverageRatios: ["Loan-to-Value Ratio", "Collateral Coverage Ratio", "Leverage Coverage Ratio", "Payback Ratio"],
  profitabilityRatios: ["Net Profit Margin", "Gross Profit Margin", "Operating Margin", "Return on Assets", "Return on Equity"],
  turnoverRatios: ["Accounts Receivable Turnover Ratio", "Inventory Turnover Ratio", "Asset Turnover Ratio"]
};

export const toggleCriterionEnabled = (
  criteriaGroups: CriteriaGroup[], 
  groupIndex: number, 
  criterionIndex: number, 
  enabled: boolean,
  setCriteriaGroups: React.Dispatch<React.SetStateAction<CriteriaGroup[]>>,
  setMinTotalScore: React.Dispatch<React.SetStateAction<number>>,
  setMaxTotalScore: React.Dispatch<React.SetStateAction<number>>
) => {
  const updatedGroups = [...criteriaGroups];
  
  // Update the enabled state for the specific criterion
  updatedGroups[groupIndex].criteria[criterionIndex].enabled = enabled;

  // Recalculate scores if needed based on the enabled/disabled state
  if (!enabled) {
    // When disabling, we might need to adjust scores or weights
    // This is a simple implementation - you might need to adjust this based on your exact requirements
    const totalGroupWeight = updatedGroups[groupIndex].criteria
      .filter(c => c.enabled)
      .reduce((sum, c) => sum + c.weight, 0);
    
    if (totalGroupWeight === 0) {
      // If all criteria in a group are disabled, you might want to set the group weight to 0
      updatedGroups[groupIndex].weight = 0;
    }
  }

  // Update state with the modified groups
  setCriteriaGroups(updatedGroups);
  
  // Recalculate the min and max total scores
  // This is a placeholder - you'll need to implement the actual score calculation
  const minScore = calculateMinTotalScore(updatedGroups);
  const maxScore = calculateMaxTotalScore(updatedGroups);
  
  setMinTotalScore(minScore);
  setMaxTotalScore(maxScore);
};

// Helper functions to calculate min and max total scores
const calculateMinTotalScore = (groups: CriteriaGroup[]): number => {
  let weightedSum = 0;
  let totalWeight = 0;
  
  groups.forEach(group => {
    if (group.weight > 0) {
      let groupMinScore = 0;
      let groupTotalWeight = 0;
      
      group.criteria.forEach(criterion => {
        if (criterion.enabled && criterion.weight > 0 && criterion.minScore !== undefined) {
          groupMinScore += criterion.minScore * criterion.weight;
          groupTotalWeight += criterion.weight;
        }
      });
      
      if (groupTotalWeight > 0) {
        weightedSum += (groupMinScore / groupTotalWeight) * group.weight;
        totalWeight += group.weight;
      }
    }
  });
  
  return totalWeight > 0 ? weightedSum / totalWeight : 0;
};

const calculateMaxTotalScore = (groups: CriteriaGroup[]): number => {
  let weightedSum = 0;
  let totalWeight = 0;
  
  groups.forEach(group => {
    if (group.weight > 0) {
      let groupMaxScore = 0;
      let groupTotalWeight = 0;
      
      group.criteria.forEach(criterion => {
        if (criterion.enabled && criterion.weight > 0 && criterion.maxScore !== undefined) {
          groupMaxScore += criterion.maxScore * criterion.weight;
          groupTotalWeight += criterion.weight;
        }
      });
      
      if (groupTotalWeight > 0) {
        weightedSum += (groupMaxScore / groupTotalWeight) * group.weight;
        totalWeight += group.weight;
      }
    }
  });
  
  return totalWeight > 0 ? weightedSum / totalWeight : 0;
};
