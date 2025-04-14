
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
      // Ensure maxScore never exceeds 10
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
    // Ensure maxTotalScore never exceeds 10
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
  // Ensure newMinScore is at least 1 and newMaxScore doesn't exceed 10, and round to 1 decimal place
  newGroups[groupIndex].criteria[criterionIndex].minScore = roundToTenth(Math.max(1, newMinScore));
  newGroups[groupIndex].criteria[criterionIndex].maxScore = roundToTenth(Math.min(10, newMaxScore));
  recalculateScores(newGroups, setMinTotalScore, setMaxTotalScore);
  setCriteriaGroups(newGroups);
};
