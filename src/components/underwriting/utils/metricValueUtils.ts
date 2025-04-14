import { CriteriaGroup, ScoreRange } from "../types";
import { recalculateScores } from "./scoreCalculationUtils";
import { roundToTenth } from './roundingUtils';

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
  
  criterion.actualValue = roundToTenth(newValue);
  
  // Update the displayed value string
  updateDisplayValue(criterion, roundToTenth(newValue));
  
  // Calculate score based on actual value and update preferred range
  if (criterion.scoreMapping) {
    const { score, range } = updateScoreFromMapping(criterion, roundToTenth(newValue));
    if (range) {
      criterion.preferredMin = roundToTenth(range.min);
      criterion.preferredMax = roundToTenth(range.max);
    }
  } else if (criterion.actualMin !== undefined && criterion.actualMax !== undefined) {
    updateScoreFromRange(criterion, roundToTenth(newValue));
    // Update preferred range based on score
    const scorePercent = roundToTenth((criterion.minScore + criterion.maxScore) / 20); // Convert to 0-1 range
    const range = roundToTenth(criterion.actualMax - criterion.actualMin);
    criterion.preferredMin = roundToTenth(criterion.actualMin + (range * Math.max(0, scorePercent - 0.2)));
    criterion.preferredMax = roundToTenth(criterion.actualMin + (range * Math.min(1, scorePercent + 0.2)));
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
      ? `${criterion.actualUnit}${roundToTenth(value)}` 
      : `${roundToTenth(value)}${criterion.actualUnit}`;
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
  
  // Round the value to tenth decimal place
  const roundedValue = roundToTenth(value);
  
  // Find the appropriate score range
  const matchingRange = criterion.scoreMapping.find(
    range => roundedValue >= range.min && roundedValue <= range.max
  );
  
  if (matchingRange) {
    const baseScore = roundToTenth(matchingRange.score);
    criterion.minScore = roundToTenth(Math.max(1, baseScore - 1));
    criterion.maxScore = roundToTenth(Math.min(10, baseScore + 1));
    return { score: baseScore, range: matchingRange };
  } else if (roundedValue < criterion.scoreMapping[0].min) {
    const baseScore = roundToTenth(criterion.scoreMapping[0].score);
    criterion.minScore = roundToTenth(Math.max(1, baseScore - 1));
    criterion.maxScore = roundToTenth(Math.min(10, baseScore + 1));
    return { score: baseScore, range: criterion.scoreMapping[0] };
  } else {
    const lastRange = criterion.scoreMapping[criterion.scoreMapping.length - 1];
    const baseScore = roundToTenth(lastRange.score);
    criterion.minScore = roundToTenth(Math.max(1, baseScore - 1));
    criterion.maxScore = roundToTenth(Math.min(10, baseScore + 1));
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
  
  // Round value to tenth decimal place
  const roundedValue = roundToTenth(value);
  
  // Linear interpolation
  const percent = roundToTenth((roundedValue - criterion.actualMin) / (criterion.actualMax - criterion.actualMin));
  const idealPercent = criterion.name.toLowerCase().includes('debt') || 
                       criterion.name.toLowerCase().includes('risk') ? 
                       roundToTenth(1 - percent) : percent; // Invert for metrics where lower is better
  
  const baseScore = roundToTenth(1 + idealPercent * 9); // Scale to 1-10
  criterion.minScore = roundToTenth(Math.max(1, baseScore - 1));
  criterion.maxScore = roundToTenth(Math.min(10, baseScore + 1));
  
  // Update preferred range based on score
  const range = roundToTenth(criterion.actualMax - criterion.actualMin);
  const scorePercent = roundToTenth(baseScore / 10);
  criterion.preferredMin = roundToTenth(criterion.actualMin + (range * Math.max(0, scorePercent - 0.2)));
  criterion.preferredMax = roundToTenth(criterion.actualMin + (range * Math.min(1, scorePercent + 0.2)));
};
