
import { CriteriaGroup } from "../types";
import { recalculateScores } from "./scoreCalculationUtils";

const roundToTenth = (value: number) => parseFloat(value.toFixed(1));

/**
 * Updates criterion scores and recalculates total scores.
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
  
  // Find matching score range if available
  if (criterion.scoreMapping) {
    const ranges = criterion.scoreMapping;
    let minScore = 1;
    let maxScore = 1;

    // Find scores based on min and max values
    for (const range of ranges) {
      if (min >= range.min && min <= (range.max || Infinity)) {
        minScore = range.score;
      }
      if (max >= range.min && max <= (range.max || Infinity)) {
        maxScore = range.score;
      }
    }

    // Ensure scores are between 1 and 10
    criterion.minScore = roundToTenth(Math.max(1, Math.min(10, minScore)));
    criterion.maxScore = roundToTenth(Math.max(1, Math.min(10, maxScore)));
    
    if (criterion.minScore > criterion.maxScore) {
      [criterion.minScore, criterion.maxScore] = [criterion.maxScore, criterion.minScore];
    }
  }
  
  recalculateScores(newGroups, setMinTotalScore, setMaxTotalScore);
  setCriteriaGroups(newGroups);
};

/**
 * Helper function to interpolate a score between 1-10 based on a value's position in a range
 */
const interpolateScore = (value: number, min: number, max: number): number => {
  if (max === min) return 5;
  const percentage = (value - min) / (max - min);
  return 1 + percentage * 9;
};
