
import { CriteriaGroup } from "../types";
import { recalculateScores } from "./scoreCalculationUtils";

const roundToTenth = (value: number) => parseFloat(value.toFixed(1));

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
  
  // Round min and max to tenth decimal place
  criterion.preferredMin = roundToTenth(min);
  criterion.preferredMax = roundToTenth(max);
  
  // Find matching score range if available
  if (criterion.scoreMapping) {
    const matchingRange = criterion.scoreMapping.find(
      range => min >= range.min && min < range.max
    );
    
    if (matchingRange) {
      criterion.minScore = roundToTenth(matchingRange.score);
      criterion.maxScore = roundToTenth(matchingRange.score);
    } else {
      // Interpolate between ranges
      updateScoreBasedOnRange(criterion, roundToTenth((min + max) / 2), min, max);
    }
  } else {
    updateScoreBasedOnRange(criterion, roundToTenth((min + max) / 2), min, max);
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
  
  const roundToTenth = (value: number) => parseFloat(value.toFixed(1));
  
  const rangePercent = roundToTenth((max - min) / (criterion.actualMax - criterion.actualMin));
  const midPoint = roundToTenth((min + max) / 2);
  const valuePercent = roundToTenth((midPoint - criterion.actualMin) / (criterion.actualMax - criterion.actualMin));
  
  // Adjust for metrics where lower is better
  const adjustedPercent = criterion.name.toLowerCase().includes('debt') || 
                         criterion.name.toLowerCase().includes('risk') ? 
                         roundToTenth(1 - valuePercent) : valuePercent;
  
  const baseScore = roundToTenth(1 + (adjustedPercent * 9));
  criterion.minScore = roundToTenth(Math.max(1, baseScore - 1));
  criterion.maxScore = roundToTenth(Math.min(10, baseScore + 1));
  
  if (criterion.actualValue !== undefined) {
    criterion.actualValue = roundToTenth(currentValue);
    criterion.value = criterion.actualUnit ? 
      `${criterion.actualUnit}${roundToTenth(currentValue)}` : 
      roundToTenth(currentValue).toString();
  }
};
