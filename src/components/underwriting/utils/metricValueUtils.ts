
import { CriteriaGroup, ScoreRange } from "../types";
import { recalculateScores } from "./scoreCalculationUtils";

/**
 * Updates the actual value of a metric and recalculates the corresponding scores.
 */
export const updateActualMetricValue = (
  criteriaGroups: CriteriaGroup[],
  groupIndex: number, 
  criterionIndex: number, 
  newValue: number,
  setCriteriaGroups: React.Dispatch<React.SetStateAction<CriteriaGroup[]>>,
  setMinTotalScore: React.Dispatch<React.SetStateAction<number>>,
  setMaxTotalScore: React.Dispatch<React.SetStateAction<number>>
) => {
  const newGroups = [...criteriaGroups];
  const criterion = newGroups[groupIndex].criteria[criterionIndex];
  
  criterion.actualValue = newValue;
  
  // Update the displayed value string
  updateDisplayValue(criterion, newValue);
  
  // Calculate score based on actual value
  if (criterion.scoreMapping) {
    updateScoreFromMapping(criterion, newValue);
  } else if (criterion.actualMin !== undefined && criterion.actualMax !== undefined) {
    updateScoreFromRange(criterion, newValue);
  }
  
  recalculateScores(newGroups, setMinTotalScore, setMaxTotalScore);
  setCriteriaGroups(newGroups);
};

/**
 * Helper function to update the displayed value string based on the unit.
 */
const updateDisplayValue = (
  criterion: CriteriaGroup['criteria'][0],
  value: number
) => {
  if (criterion.actualUnit) {
    criterion.value = criterion.actualUnit === "$" || criterion.actualUnit === "$M" 
      ? `${criterion.actualUnit}${value}` 
      : `${value}${criterion.actualUnit}`;
  }
};

/**
 * Helper function to update score based on score mapping.
 */
const updateScoreFromMapping = (
  criterion: CriteriaGroup['criteria'][0],
  value: number
) => {
  if (!criterion.scoreMapping) return;
  
  // Find the appropriate score range
  const matchingRange = criterion.scoreMapping.find(
    range => value >= range.min && value <= range.max
  );
  
  if (matchingRange) {
    const baseScore = matchingRange.score;
    criterion.minScore = Math.max(1, baseScore - 1);
    criterion.maxScore = Math.min(10, baseScore + 1);
  } else if (value < criterion.scoreMapping[0].min) {
    // If value is below the lowest range
    const baseScore = criterion.scoreMapping[0].score;
    criterion.minScore = Math.max(1, baseScore - 1);
    criterion.maxScore = Math.min(10, baseScore + 1);
  } else if (value > criterion.scoreMapping[criterion.scoreMapping.length - 1].max) {
    // If value is above the highest range
    const baseScore = criterion.scoreMapping[criterion.scoreMapping.length - 1].score;
    criterion.minScore = Math.max(1, baseScore - 1);
    criterion.maxScore = Math.min(10, baseScore + 1);
  }
};

/**
 * Helper function to update score based on simple range interpolation.
 */
const updateScoreFromRange = (
  criterion: CriteriaGroup['criteria'][0],
  value: number
) => {
  if (criterion.actualMin === undefined || criterion.actualMax === undefined) return;
  
  // Simple linear interpolation
  const percent = (value - criterion.actualMin) / (criterion.actualMax - criterion.actualMin);
  const idealPercent = criterion.name.toLowerCase().includes('debt') || 
                       criterion.name.toLowerCase().includes('risk') ? 
                       1 - percent : percent; // Invert for metrics where lower is better
  
  const baseScore = 1 + idealPercent * 9; // Scale to 1-10
  criterion.minScore = Math.max(1, baseScore - 1.5);
  criterion.maxScore = Math.min(10, baseScore + 1.5);
};
