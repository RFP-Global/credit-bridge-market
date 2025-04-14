
import { CriteriaGroup } from "../types";

const roundToTenth = (value: number) => parseFloat(value.toFixed(1));

/**
 * Recalculates min and max scores for all groups and updates the total score.
 */
export const recalculateScores = (
  groups: CriteriaGroup[], 
  setMinTotalScore: React.Dispatch<React.SetStateAction<number>>,
  setMaxTotalScore: React.Dispatch<React.SetStateAction<number>>
) => {
  // First calculate group scores
  groups.forEach(group => {
    let weightSum = 0;
    let minScoreSum = 0;
    let maxScoreSum = 0;
    
    // Only include enabled criteria
    const enabledCriteria = group.criteria.filter(criterion => criterion.enabled);
    
    enabledCriteria.forEach(criterion => {
      minScoreSum += roundToTenth(criterion.minScore) * criterion.weight;
      maxScoreSum += roundToTenth(criterion.maxScore) * criterion.weight;
      weightSum += criterion.weight;
    });
    
    if (weightSum > 0) {
      group.minScore = roundToTenth(minScoreSum / weightSum);
      group.maxScore = roundToTenth(Math.min(10, (maxScoreSum / weightSum)));
    } else {
      group.minScore = 0;
      group.maxScore = 0;
    }
  });
  
  // Then calculate total scores
  let totalMinWeightedScore = 0;
  let totalMaxWeightedScore = 0;
  let totalWeight = 0;
  
  groups.forEach(group => {
    totalMinWeightedScore += roundToTenth(group.minScore) * group.weight;
    totalMaxWeightedScore += roundToTenth(group.maxScore) * group.weight;
    totalWeight += group.weight;
  });
  
  if (totalWeight > 0) {
    setMinTotalScore(roundToTenth(totalMinWeightedScore / totalWeight));
    setMaxTotalScore(roundToTenth(Math.min(10, (totalMaxWeightedScore / totalWeight))));
  }
};

/**
 * Updates the score range for a specific criterion.
 */
export const updateCriterionScore = (
  criteriaGroups: CriteriaGroup[],
  groupIndex: number, 
  criterionIndex: number, 
  newMinScore: number,
  newMaxScore: number,
  setCriteriaGroups: React.Dispatch<React.SetStateAction<CriteriaGroup[]>>,
  setMinTotalScore: React.Dispatch<React.SetStateAction<number>>,
  setMaxTotalScore: React.Dispatch<React.SetStateAction<number>>
) => {
  const newGroups = [...criteriaGroups];
  const criterion = newGroups[groupIndex].criteria[criterionIndex];
  
  // Ensure scores are between 1 and 10 and update the criterion
  criterion.minScore = roundToTenth(Math.max(1, Math.min(10, newMinScore)));
  criterion.maxScore = roundToTenth(Math.max(1, Math.min(10, newMaxScore)));
  
  if (criterion.minScore > criterion.maxScore) {
    [criterion.minScore, criterion.maxScore] = [criterion.maxScore, criterion.minScore];
  }

  // Update preferred range based on score if scoreMapping exists
  if (criterion.scoreMapping) {
    const minRange = criterion.scoreMapping.find(r => r.score === Math.floor(criterion.minScore));
    const maxRange = criterion.scoreMapping.find(r => r.score === Math.ceil(criterion.maxScore));
    
    if (minRange && maxRange) {
      criterion.preferredMin = minRange.min;
      criterion.preferredMax = maxRange.max;
    }
  }

  recalculateScores(newGroups, setMinTotalScore, setMaxTotalScore);
  setCriteriaGroups(newGroups);
};

