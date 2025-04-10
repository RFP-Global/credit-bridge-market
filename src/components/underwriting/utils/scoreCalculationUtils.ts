
import { CriteriaGroup } from "../types";

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
      minScoreSum += criterion.minScore * criterion.weight;
      maxScoreSum += criterion.maxScore * criterion.weight;
      weightSum += criterion.weight;
    });
    
    if (weightSum > 0) {
      group.minScore = parseFloat((minScoreSum / weightSum).toFixed(2));
      group.maxScore = parseFloat((maxScoreSum / weightSum).toFixed(2));
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
    totalMinWeightedScore += group.minScore * group.weight;
    totalMaxWeightedScore += group.maxScore * group.weight;
    totalWeight += group.weight;
  });
  
  if (totalWeight > 0) {
    setMinTotalScore(parseFloat((totalMinWeightedScore / totalWeight).toFixed(2)));
    setMaxTotalScore(parseFloat((totalMaxWeightedScore / totalWeight).toFixed(2)));
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
  newGroups[groupIndex].criteria[criterionIndex].minScore = newMinScore;
  newGroups[groupIndex].criteria[criterionIndex].maxScore = newMaxScore;
  recalculateScores(newGroups, setMinTotalScore, setMaxTotalScore);
  setCriteriaGroups(newGroups);
};
