
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
  
  // Only update score if it's based on a numeric value
  const currentValue = criterion.actualValue || 
                      (criterion.value ? parseFloat(criterion.value.replace(/[^0-9.-]+/g, "")) : NaN);
  
  if (!isNaN(currentValue)) {
    updateScoreBasedOnRange(criterion, currentValue, min, max);
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
  if (currentValue >= min && currentValue <= max) {
    // Value is in the preferred range
    const baseScore = 8 + (2 * (1 - (max - currentValue) / (max - min)));
    criterion.minScore = Math.max(1, baseScore - 1.5);
    criterion.maxScore = Math.min(10, baseScore + 1.5);
  } else if (currentValue < min) {
    // Value is below preferred range
    const distance = (min - currentValue) / min;
    const baseScore = 6 - (distance * 4);
    criterion.minScore = Math.max(1, baseScore - 1.5);
    criterion.maxScore = Math.min(10, baseScore + 1.5);
  } else {
    // Value is above preferred range
    const distance = (currentValue - max) / max;
    const baseScore = 6 - (distance * 4);
    criterion.minScore = Math.max(1, baseScore - 1.5);
    criterion.maxScore = Math.min(10, baseScore + 1.5);
  }
};
