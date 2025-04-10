
import { CriteriaGroup } from "../types";

export const updateCriterionWeight = (
  criteriaGroups: CriteriaGroup[],
  groupIndex: number, 
  criterionIndex: number, 
  newWeight: number,
  setCriteriaGroups: React.Dispatch<React.SetStateAction<CriteriaGroup[]>>,
  setMinTotalScore: React.Dispatch<React.SetStateAction<number>>,
  setMaxTotalScore: React.Dispatch<React.SetStateAction<number>>
) => {
  const newGroups = [...criteriaGroups];
  newGroups[groupIndex].criteria[criterionIndex].weight = newWeight;
  
  const group = newGroups[groupIndex];
  const totalOtherWeight = group.criteria.reduce((sum, criterion, idx) => 
    idx === criterionIndex ? sum : sum + criterion.weight, 0);
  
  const remainingWeight = 100 - newWeight;
  if (totalOtherWeight > 0) {
    const ratio = remainingWeight / totalOtherWeight;
    group.criteria.forEach((criterion, idx) => {
      if (idx !== criterionIndex) {
        criterion.weight = Math.round(criterion.weight * ratio);
      }
    });
    
    const adjustedTotal = group.criteria.reduce((sum, criterion) => sum + criterion.weight, 0);
    if (adjustedTotal !== 100) {
      const diff = 100 - adjustedTotal;
      let maxIdx = -1;
      let maxWeight = -1;
      
      for (let i = 0; i < group.criteria.length; i++) {
        if (i !== criterionIndex && group.criteria[i].weight > maxWeight) {
          maxWeight = group.criteria[i].weight;
          maxIdx = i;
        }
      }
      
      if (maxIdx >= 0) {
        group.criteria[maxIdx].weight += diff;
      }
    }
  }
  
  recalculateScores(newGroups, setMinTotalScore, setMaxTotalScore);
  setCriteriaGroups(newGroups);
};

export const updateGroupWeight = (
  criteriaGroups: CriteriaGroup[],
  groupIndex: number, 
  newWeight: number,
  setCriteriaGroups: React.Dispatch<React.SetStateAction<CriteriaGroup[]>>,
  setMinTotalScore: React.Dispatch<React.SetStateAction<number>>,
  setMaxTotalScore: React.Dispatch<React.SetStateAction<number>>
) => {
  const newGroups = [...criteriaGroups];
  newGroups[groupIndex].weight = newWeight;
  
  const totalOtherWeight = newGroups.reduce((sum, group, idx) => 
    idx === groupIndex ? sum : sum + group.weight, 0);
  
  const remainingWeight = 100 - newWeight;
  if (totalOtherWeight > 0) {
    const ratio = remainingWeight / totalOtherWeight;
    newGroups.forEach((group, idx) => {
      if (idx !== groupIndex) {
        group.weight = Math.round(group.weight * ratio);
      }
    });
    
    const adjustedTotal = newGroups.reduce((sum, group) => sum + group.weight, 0);
    if (adjustedTotal !== 100) {
      const diff = 100 - adjustedTotal;
      let maxIdx = -1;
      let maxWeight = -1;
      
      for (let i = 0; i < newGroups.length; i++) {
        if (i !== groupIndex && newGroups[i].weight > maxWeight) {
          maxWeight = newGroups[i].weight;
          maxIdx = i;
        }
      }
      
      if (maxIdx >= 0) {
        newGroups[maxIdx].weight += diff;
      }
    }
  }
  
  recalculateScores(newGroups, setMinTotalScore, setMaxTotalScore);
  setCriteriaGroups(newGroups);
};

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
    if (currentValue >= min && currentValue <= max) {
      const baseScore = 8 + (2 * (1 - (max - currentValue) / (max - min)));
      criterion.minScore = Math.max(1, baseScore - 1.5);
      criterion.maxScore = Math.min(10, baseScore + 1.5);
    } else if (currentValue < min) {
      const distance = (min - currentValue) / min;
      const baseScore = 6 - (distance * 4);
      criterion.minScore = Math.max(1, baseScore - 1.5);
      criterion.maxScore = Math.min(10, baseScore + 1.5);
    } else {
      const distance = (currentValue - max) / max;
      const baseScore = 6 - (distance * 4);
      criterion.minScore = Math.max(1, baseScore - 1.5);
      criterion.maxScore = Math.min(10, baseScore + 1.5);
    }
  }
  
  recalculateScores(newGroups, setMinTotalScore, setMaxTotalScore);
  setCriteriaGroups(newGroups);
};

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
  if (criterion.actualUnit) {
    criterion.value = criterion.actualUnit === "$" || criterion.actualUnit === "$M" 
      ? `${criterion.actualUnit}${newValue}` 
      : `${newValue}${criterion.actualUnit}`;
  }
  
  // Calculate score based on actual value and score mapping
  if (criterion.scoreMapping) {
    // Find the appropriate score range
    const matchingRange = criterion.scoreMapping.find(
      range => newValue >= range.min && newValue <= range.max
    );
    
    if (matchingRange) {
      const baseScore = matchingRange.score;
      criterion.minScore = Math.max(1, baseScore - 1);
      criterion.maxScore = Math.min(10, baseScore + 1);
    } else if (newValue < criterion.scoreMapping[0].min) {
      // If value is below the lowest range
      const baseScore = criterion.scoreMapping[0].score;
      criterion.minScore = Math.max(1, baseScore - 1);
      criterion.maxScore = Math.min(10, baseScore + 1);
    } else if (newValue > criterion.scoreMapping[criterion.scoreMapping.length - 1].max) {
      // If value is above the highest range
      const baseScore = criterion.scoreMapping[criterion.scoreMapping.length - 1].score;
      criterion.minScore = Math.max(1, baseScore - 1);
      criterion.maxScore = Math.min(10, baseScore + 1);
    }
  } else if (criterion.actualMin !== undefined && criterion.actualMax !== undefined) {
    // Simple linear interpolation if no explicit mapping
    const percent = (newValue - criterion.actualMin) / (criterion.actualMax - criterion.actualMin);
    const idealPercent = criterion.name.toLowerCase().includes('debt') || 
                         criterion.name.toLowerCase().includes('risk') ? 
                         1 - percent : percent; // Invert for metrics where lower is better
    
    const baseScore = 1 + idealPercent * 9; // Scale to 1-10
    criterion.minScore = Math.max(1, baseScore - 1.5);
    criterion.maxScore = Math.min(10, baseScore + 1.5);
  }
  
  recalculateScores(newGroups, setMinTotalScore, setMaxTotalScore);
  setCriteriaGroups(newGroups);
};

export const recalculateScores = (
  groups: CriteriaGroup[], 
  setMinTotalScore: React.Dispatch<React.SetStateAction<number>>,
  setMaxTotalScore: React.Dispatch<React.SetStateAction<number>>
) => {
  groups.forEach(group => {
    let weightSum = 0;
    let minScoreSum = 0;
    let maxScoreSum = 0;
    
    group.criteria.forEach(criterion => {
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
