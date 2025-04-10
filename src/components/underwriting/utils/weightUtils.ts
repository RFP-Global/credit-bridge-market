
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
 */
export const updateGroupWeight = (
  criteriaGroups: CriteriaGroup[],
  groupIndex: number, 
  newWeight: number,
  setCriteriaGroups: React.Dispatch<React.SetStateAction<CriteriaGroup[]>>,
  setMinTotalScore: React.Dispatch<React.SetStateAction<number>>,
  setMaxTotalScore: React.Dispatch<React.SetStateAction<number>>
) => {
  const newGroups = [...criteriaGroups];
  newGroups[groupIndex].weight = newWeight;
  
  const totalOtherWeight = newGroups.reduce((sum, group, idx) => 
    idx === groupIndex ? sum : sum + group.weight, 0);
  
  const remainingWeight = 100 - newWeight;
  if (totalOtherWeight > 0) {
    const ratio = remainingWeight / totalOtherWeight;
    newGroups.forEach((group, idx) => {
      if (idx !== groupIndex) {
        group.weight = Math.round(group.weight * ratio);
      }
    });
    
    // Adjust for rounding errors at the group level
    redistributeGroupRoundingDifference(newGroups, groupIndex);
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
