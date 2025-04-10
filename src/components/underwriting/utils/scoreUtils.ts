
import { CriteriaGroup } from "../types";

export const updateCriterionWeight = (
  criteriaGroups: CriteriaGroup[],
  groupIndex: number, 
  criterionIndex: number, 
  newWeight: number,
  setCriteriaGroups: React.Dispatch<React.SetStateAction<CriteriaGroup[]>>,
  setTotalScore: React.Dispatch<React.SetStateAction<number>>
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
  
  recalculateScores(newGroups, setTotalScore);
  setCriteriaGroups(newGroups);
};

export const updateGroupWeight = (
  criteriaGroups: CriteriaGroup[],
  groupIndex: number, 
  newWeight: number,
  setCriteriaGroups: React.Dispatch<React.SetStateAction<CriteriaGroup[]>>,
  setTotalScore: React.Dispatch<React.SetStateAction<number>>
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
  
  recalculateScores(newGroups, setTotalScore);
  setCriteriaGroups(newGroups);
};

export const updateCriterionScore = (
  criteriaGroups: CriteriaGroup[],
  groupIndex: number, 
  criterionIndex: number, 
  newScore: number,
  setCriteriaGroups: React.Dispatch<React.SetStateAction<CriteriaGroup[]>>,
  setTotalScore: React.Dispatch<React.SetStateAction<number>>
) => {
  const newGroups = [...criteriaGroups];
  newGroups[groupIndex].criteria[criterionIndex].score = newScore;
  recalculateScores(newGroups, setTotalScore);
  setCriteriaGroups(newGroups);
};

export const updateCriterionRange = (
  criteriaGroups: CriteriaGroup[],
  groupIndex: number, 
  criterionIndex: number, 
  min: number, 
  max: number,
  setCriteriaGroups: React.Dispatch<React.SetStateAction<CriteriaGroup[]>>,
  setTotalScore: React.Dispatch<React.SetStateAction<number>>
) => {
  const newGroups = [...criteriaGroups];
  const criterion = newGroups[groupIndex].criteria[criterionIndex];
  
  criterion.preferredMin = min;
  criterion.preferredMax = max;
  
  const currentValue = parseFloat(criterion.value.replace(/[^0-9.-]+/g, ""));
  if (!isNaN(currentValue)) {
    if (currentValue >= min && currentValue <= max) {
      criterion.score = 4 + (1 - (max - currentValue) / (max - min));
      if (criterion.score > 5) criterion.score = 5;
    } else if (currentValue < min) {
      const distance = (min - currentValue) / min;
      criterion.score = 3 - (distance * 2);
      if (criterion.score < 1) criterion.score = 1;
    } else {
      const distance = (currentValue - max) / max;
      criterion.score = 3 - (distance * 2);
      if (criterion.score < 1) criterion.score = 1;
    }
    criterion.score = parseFloat(criterion.score.toFixed(1));
  }
  
  recalculateScores(newGroups, setTotalScore);
  setCriteriaGroups(newGroups);
};

export const updateActualMetricValue = (
  criteriaGroups: CriteriaGroup[],
  groupIndex: number, 
  criterionIndex: number, 
  newValue: number,
  setCriteriaGroups: React.Dispatch<React.SetStateAction<CriteriaGroup[]>>,
  setTotalScore: React.Dispatch<React.SetStateAction<number>>
) => {
  const newGroups = [...criteriaGroups];
  const criterion = newGroups[groupIndex].criteria[criterionIndex];
  
  criterion.actualValue = newValue;
  
  // Calculate score based on actual value and score mapping
  if (criterion.scoreMapping) {
    // Find the appropriate score range
    const matchingRange = criterion.scoreMapping.find(
      range => newValue >= range.min && newValue <= range.max
    );
    
    if (matchingRange) {
      criterion.score = matchingRange.score;
    } else if (newValue < criterion.scoreMapping[0].min) {
      // If value is below the lowest range
      if (criterion.name === "Debt/EBITDA") {
        // For Debt/EBITDA, lower values are better
        criterion.score = criterion.scoreMapping[0].score;
      } else {
        criterion.score = criterion.scoreMapping[0].score;
      }
    } else if (newValue > criterion.scoreMapping[criterion.scoreMapping.length - 1].max) {
      // If value is above the highest range
      if (criterion.name === "Debt/EBITDA") {
        // For Debt/EBITDA, higher values are worse
        criterion.score = criterion.scoreMapping[criterion.scoreMapping.length - 1].score;
      } else {
        criterion.score = criterion.scoreMapping[criterion.scoreMapping.length - 1].score;
      }
    }
  } else if (criterion.actualMin !== undefined && criterion.actualMax !== undefined) {
    // Simple linear interpolation if no explicit mapping
    const percent = (newValue - criterion.actualMin) / (criterion.actualMax - criterion.actualMin);
    const idealPercent = criterion.name.toLowerCase().includes('debt') || 
                         criterion.name.toLowerCase().includes('risk') ? 
                         1 - percent : percent; // Invert for metrics where lower is better
    
    criterion.score = 1 + idealPercent * 4; // Scale to 1-5
    criterion.score = parseFloat(criterion.score.toFixed(1));
  }
  
  recalculateScores(newGroups, setTotalScore);
  setCriteriaGroups(newGroups);
};

export const recalculateScores = (
  groups: CriteriaGroup[], 
  setTotalScore: React.Dispatch<React.SetStateAction<number>>
) => {
  groups.forEach(group => {
    let weightSum = 0;
    let scoreSum = 0;
    
    group.criteria.forEach(criterion => {
      scoreSum += criterion.score * criterion.weight;
      weightSum += criterion.weight;
    });
    
    group.score = weightSum > 0 ? parseFloat((scoreSum / weightSum).toFixed(2)) : 0;
  });
  
  let totalWeightedScore = 0;
  let totalWeight = 0;
  
  groups.forEach(group => {
    totalWeightedScore += group.score * group.weight;
    totalWeight += group.weight;
  });
  
  setTotalScore(parseFloat((totalWeightedScore / totalWeight).toFixed(2)));
};
