
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
  
  // Calculate score based on actual value and update preferred range
  if (criterion.scoreMapping) {
    const { score, range } = updateScoreFromMapping(criterion, newValue);
    if (range) {
      criterion.preferredMin = range.min;
      criterion.preferredMax = range.max;
    }
  } else if (criterion.actualMin !== undefined && criterion.actualMax !== undefined) {
    updateScoreFromRange(criterion, newValue);
    // Update preferred range based on score
    const scorePercent = (criterion.minScore + criterion.maxScore) / 20; // Convert to 0-1 range
    const range = criterion.actualMax - criterion.actualMin;
    criterion.preferredMin = criterion.actualMin + (range * Math.max(0, scorePercent - 0.2));
    criterion.preferredMax = criterion.actualMin + (range * Math.min(1, scorePercent + 0.2));
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
): { score: number, range: ScoreRange | null } => {
  if (!criterion.scoreMapping) return { score: 5, range: null };
  
  // Find the appropriate score range
  const matchingRange = criterion.scoreMapping.find(
    range => value >= range.min && value <= range.max
  );
  
  if (matchingRange) {
    const baseScore = matchingRange.score;
    criterion.minScore = Math.max(1, baseScore - 1);
    criterion.maxScore = Math.min(10, baseScore + 1);
    return { score: baseScore, range: matchingRange };
  } else if (value < criterion.scoreMapping[0].min) {
    const baseScore = criterion.scoreMapping[0].score;
    criterion.minScore = Math.max(1, baseScore - 1);
    criterion.maxScore = Math.min(10, baseScore + 1);
    return { score: baseScore, range: criterion.scoreMapping[0] };
  } else {
    const lastRange = criterion.scoreMapping[criterion.scoreMapping.length - 1];
    const baseScore = lastRange.score;
    criterion.minScore = Math.max(1, baseScore - 1);
    criterion.maxScore = Math.min(10, baseScore + 1);
    return { score: baseScore, range: lastRange };
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
  
  // Linear interpolation
  const percent = (value - criterion.actualMin) / (criterion.actualMax - criterion.actualMin);
  const idealPercent = criterion.name.toLowerCase().includes('debt') || 
                       criterion.name.toLowerCase().includes('risk') ? 
                       1 - percent : percent; // Invert for metrics where lower is better
  
  const baseScore = 1 + idealPercent * 9; // Scale to 1-10
  criterion.minScore = Math.max(1, baseScore - 1);
  criterion.maxScore = Math.min(10, baseScore + 1);
  
  // Update preferred range based on score
  const range = criterion.actualMax - criterion.actualMin;
  const scorePercent = baseScore / 10;
  criterion.preferredMin = criterion.actualMin + (range * Math.max(0, scorePercent - 0.2));
  criterion.preferredMax = criterion.actualMin + (range * Math.min(1, scorePercent + 0.2));
};

