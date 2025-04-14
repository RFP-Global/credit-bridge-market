
import { CriteriaGroup } from "../types";
import { recalculateScores } from "./scoreCalculationUtils";

/**
 * Updates the preferred range for a criterion and recalculates scores.
 */
export const updateCriterionRange = (
  criteriaGroups: CriteriaGroup[],
  groupIndex: number, 
  criterionIndex: number, 
  min: number, 
  max: number,
  setCriteriaGroups: React.Dispatch<React.SetStateAction<CriteriaGroup[]>>,
  setMinTotalScore: React.Dispatch<React.SetStateAction<number>>,
  setMaxTotalScore: React.Dispatch<React.SetStateAction<number>>
) => {
  const newGroups = [...criteriaGroups];
  const criterion = newGroups[groupIndex].criteria[criterionIndex];
  
  criterion.preferredMin = min;
  criterion.preferredMax = max;
  
  // Find matching score range if available
  if (criterion.scoreMapping) {
    const matchingRange = criterion.scoreMapping.find(
      range => min >= range.min && max <= range.max
    );
    
    if (matchingRange) {
      criterion.minScore = Math.max(1, matchingRange.score - 1);
      criterion.maxScore = Math.min(10, matchingRange.score + 1);
    } else {
      // Interpolate between ranges
      updateScoreBasedOnRange(criterion, (min + max) / 2, min, max);
    }
  } else {
    updateScoreBasedOnRange(criterion, (min + max) / 2, min, max);
  }
  
  recalculateScores(newGroups, setMinTotalScore, setMaxTotalScore);
  setCriteriaGroups(newGroups);
};

/**
 * Helper function to calculate scores based on where the value falls relative to the preferred range.
 */
const updateScoreBasedOnRange = (
  criterion: CriteriaGroup['criteria'][0],
  currentValue: number,
  min: number,
  max: number
) => {
  if (!criterion.actualMin || !criterion.actualMax) return;
  
  const rangePercent = (max - min) / (criterion.actualMax - criterion.actualMin);
  const midPoint = (min + max) / 2;
  const valuePercent = (midPoint - criterion.actualMin) / (criterion.actualMax - criterion.actualMin);
  
  // Adjust for metrics where lower is better
  const adjustedPercent = criterion.name.toLowerCase().includes('debt') || 
                         criterion.name.toLowerCase().includes('risk') ? 
                         1 - valuePercent : valuePercent;
  
  const baseScore = 1 + (adjustedPercent * 9);
  criterion.minScore = Math.max(1, baseScore - 1);
  criterion.maxScore = Math.min(10, baseScore + 1);
  
  if (criterion.actualValue !== undefined) {
    criterion.actualValue = currentValue;
    criterion.value = criterion.actualUnit ? 
      `${criterion.actualUnit}${currentValue}` : 
      currentValue.toString();
  }
};
