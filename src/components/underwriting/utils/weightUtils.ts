
import { CriteriaGroup } from "../types";
import { recalculateScores } from "./scoreCalculationUtils";

/**
 * Updates the weight of a specific criterion within a group and redistributes remaining weights.
 */
export const updateCriterionWeight = (
  criteriaGroups: CriteriaGroup[],
  groupIndex: number, 
  criterionIndex: number, 
  newWeight: number,
  setCriteriaGroups: React.Dispatch<React.SetStateAction<CriteriaGroup[]>>,
  setMinTotalScore: React.Dispatch<React.SetStateAction<number>>,
  setMaxTotalScore: React.Dispatch<React.SetStateAction<number>>
) => {
  const newGroups = [...criteriaGroups];
  newGroups[groupIndex].criteria[criterionIndex].weight = newWeight;
  
  const group = newGroups[groupIndex];
  const totalOtherWeight = group.criteria.reduce((sum, criterion, idx) => 
    idx === criterionIndex ? sum : sum + criterion.weight, 0);
  
  const remainingWeight = 100 - newWeight;
  if (totalOtherWeight > 0) {
    const ratio = remainingWeight / totalOtherWeight;
    group.criteria.forEach((criterion, idx) => {
      if (idx !== criterionIndex) {
        criterion.weight = Math.round(criterion.weight * ratio);
      }
    });
    
    // Adjust for rounding errors
    redistributeRoundingDifference(group.criteria, criterionIndex);
  }
  
  recalculateScores(newGroups, setMinTotalScore, setMaxTotalScore);
  setCriteriaGroups(newGroups);
};

/**
 * Updates the weight of a criteria group and redistributes remaining weights among other groups.
 * Ensures the total weight always equals exactly 100%.
 * 
 * This version allows for more flexible weight distribution with fewer restrictions,
 * allowing weights between 1% and 99%.
 */
export const updateGroupWeight = (
  criteriaGroups: CriteriaGroup[],
  groupIndex: number, 
  newWeight: number,
  setCriteriaGroups: React.Dispatch<React.SetStateAction<CriteriaGroup[]>>,
  setMinTotalScore: React.Dispatch<React.SetStateAction<number>>,
  setMaxTotalScore: React.Dispatch<React.SetStateAction<number>>
) => {
  // Ensure weight is at least 1%
  newWeight = Math.max(1, Math.min(99, newWeight));
  
  const newGroups = [...criteriaGroups];
  const oldWeight = newGroups[groupIndex].weight;
  newGroups[groupIndex].weight = newWeight;
  
  // Get all other groups that we can adjust
  const adjustableGroups = newGroups.map((g, idx) => ({ 
    idx, 
    weight: g.weight,
    isTarget: idx === groupIndex
  })).filter(g => !g.isTarget && g.weight > 0);
  
  // If no adjustable groups, we need to revert the change
  if (adjustableGroups.length === 0) {
    newGroups[groupIndex].weight = oldWeight;
    setCriteriaGroups(newGroups);
    return;
  }
  
  // Calculate how much weight to distribute
  const weightDifference = oldWeight - newWeight;  // Positive if reducing, negative if increasing
  
  if (weightDifference !== 0) {
    // Distribute the weight difference proportionally among adjustable groups
    const totalAdjustableWeight = adjustableGroups.reduce((sum, g) => sum + g.weight, 0);
    
    let remainingDifference = weightDifference;
    adjustableGroups.forEach((g, idx) => {
      if (idx === adjustableGroups.length - 1) {
        // Last group gets any remaining difference to ensure total is exactly 100%
        const newAdjustedWeight = newGroups[g.idx].weight + remainingDifference;
        // Ensure it's at least 1%
        if (newAdjustedWeight >= 1) {
          newGroups[g.idx].weight = newAdjustedWeight;
          remainingDifference = 0;
        } else {
          // If it would go below minimum, only adjust partially
          const possibleAdjustment = newGroups[g.idx].weight - 1;
          newGroups[g.idx].weight = 1;
          remainingDifference -= possibleAdjustment;
        }
      } else {
        // For all but the last group, distribute proportionally
        const proportion = g.weight / totalAdjustableWeight;
        const weightAdjustment = Math.round(weightDifference * proportion);
        const newAdjustedWeight = newGroups[g.idx].weight + weightAdjustment;
        
        // Ensure it's at least 1%
        if (newAdjustedWeight >= 1) {
          newGroups[g.idx].weight = newAdjustedWeight;
          remainingDifference -= weightAdjustment;
        } else {
          // If it would go below minimum, only adjust partially
          const possibleAdjustment = newGroups[g.idx].weight - 1;
          newGroups[g.idx].weight = 1;
          remainingDifference -= possibleAdjustment;
        }
      }
    });
    
    // If we couldn't distribute all the weight difference, we need to adjust the target group
    if (remainingDifference !== 0) {
      newGroups[groupIndex].weight = oldWeight - remainingDifference;
    }
  }
  
  // Final check to ensure total is exactly 100%
  const totalWeight = newGroups.reduce((sum, group) => sum + group.weight, 0);
  if (totalWeight !== 100) {
    // Find the group with the largest weight that isn't the target group to make the adjustment
    let largestGroupIdx = -1;
    let largestWeight = -1;
    
    for (let i = 0; i < newGroups.length; i++) {
      if (i !== groupIndex && newGroups[i].weight > largestWeight) {
        largestWeight = newGroups[i].weight;
        largestGroupIdx = i;
      }
    }
    
    if (largestGroupIdx >= 0) {
      newGroups[largestGroupIdx].weight += (100 - totalWeight);
    } else {
      // If no other group can be adjusted, adjust the target group
      newGroups[groupIndex].weight += (100 - totalWeight);
    }
  }
  
  recalculateScores(newGroups, setMinTotalScore, setMaxTotalScore);
  setCriteriaGroups(newGroups);
};

/**
 * Helper function to redistribute any rounding difference to ensure total weight is 100%.
 */
const redistributeRoundingDifference = (
  criteria: CriteriaGroup['criteria'], 
  excludeIndex: number
) => {
  const adjustedTotal = criteria.reduce((sum, criterion) => sum + criterion.weight, 0);
  if (adjustedTotal !== 100) {
    const diff = 100 - adjustedTotal;
    let maxIdx = -1;
    let maxWeight = -1;
    
    for (let i = 0; i < criteria.length; i++) {
      if (i !== excludeIndex && criteria[i].weight > maxWeight) {
        maxWeight = criteria[i].weight;
        maxIdx = i;
      }
    }
    
    if (maxIdx >= 0) {
      criteria[maxIdx].weight += diff;
    }
  }
};

/**
 * Helper function to redistribute any rounding difference across groups to ensure total weight is 100%.
 * This function is kept for backward compatibility but is no longer needed with the improved updateGroupWeight.
 */
const redistributeGroupRoundingDifference = (
  groups: CriteriaGroup[], 
  excludeIndex: number
) => {
  const adjustedTotal = groups.reduce((sum, group) => sum + group.weight, 0);
  if (adjustedTotal !== 100) {
    const diff = 100 - adjustedTotal;
    let maxIdx = -1;
    let maxWeight = -1;
    
    for (let i = 0; i < groups.length; i++) {
      if (i !== excludeIndex && groups[i].weight > maxWeight) {
        maxWeight = groups[i].weight;
        maxIdx = i;
      }
    }
    
    if (maxIdx >= 0) {
      groups[maxIdx].weight += diff;
    }
  }
};
