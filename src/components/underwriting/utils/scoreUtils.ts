
import { CriteriaGroup, ScoreRange } from "../types";

// Debt/EBITDA scoring mapping
const debtEBITDAScoreMapping: ScoreRange[] = [
  { min: null, max: 1.0, score: 10, description: "Minimal Leverage" },
  { min: 1.01, max: 2.0, score: 9, description: "Low Leverage" },
  { min: 2.01, max: 3.0, score: 8, description: "Very Manageable" },
  { min: 3.01, max: 4.0, score: 7, description: "Moderate Risk" },
  { min: 4.01, max: 5.0, score: 6, description: "Slightly Elevated Risk" },
  { min: 5.01, max: 6.0, score: 5, description: "Cautionary" },
  { min: 6.01, max: 7.0, score: 4, description: "High Risk" },
  { min: 7.01, max: 8.0, score: 3, description: "Very High Risk" },
  { min: 8.01, max: 10.0, score: 2, description: "Distressed Leverage" },
  { min: 10.01, max: null, score: 1, description: "Unsustainable" }
];

// Helper function to determine if a criterion should use inverse relationship
const shouldUseInverseRelationship = (criterionName: string): boolean => {
  return criterionName.toLowerCase().includes('debt') || 
         criterionName.toLowerCase().includes('risk');
};

// Helper function to check if criterion is Debt/EBITDA
const isDebtEBITDACriterion = (criterionName: string): boolean => {
  return criterionName.toLowerCase().includes('debt/ebitda') || 
         (criterionName.toLowerCase().includes('debt') && 
          criterionName.toLowerCase().includes('ebitda'));
};

// Get score mapping for a criterion
const getScoreMappingForCriterion = (criterionName: string, existingMapping?: ScoreRange[]): ScoreRange[] | undefined => {
  if (existingMapping) {
    return existingMapping;
  }
  
  if (isDebtEBITDACriterion(criterionName)) {
    return debtEBITDAScoreMapping;
  }
  
  return undefined;
};

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
  const criterion = newGroups[groupIndex].criteria[criterionIndex];
  
  criterion.score = newScore;
  
  // If this is an actual metric with min/max, update the actual values to reflect the score
  if (criterion.actualMin !== undefined && criterion.actualMax !== undefined && 
      criterion.actualMinValue === undefined && criterion.actualMaxValue === undefined) {
    
    // Check if score should be inverted (higher value = lower score)
    const shouldInvert = shouldUseInverseRelationship(criterion.name);
    
    // Get appropriate score mapping
    const scoreMapping = getScoreMappingForCriterion(criterion.name, criterion.scoreMapping);
    
    if (scoreMapping) {
      // Find the mapping entry closest to our score
      const matchingRange = scoreMapping.find(range => 
        newScore >= range.score - 0.5 && newScore < range.score + 0.5
      );
      
      if (matchingRange) {
        // Use the midpoint of the range as our value
        const min = matchingRange.min !== null ? matchingRange.min : criterion.actualMin;
        const max = matchingRange.max !== null ? matchingRange.max : criterion.actualMax;
        criterion.actualValue = (min + max) / 2;
      }
    } else {
      // Calculate the appropriate actual value based on the score
      const percentage = (newScore - 1) / 9; // convert score 1-10 to 0-1 percentage
      let actualValue;
      
      if (shouldInvert) {
        // For metrics where lower is better (e.g., debt ratios)
        actualValue = criterion.actualMax - (percentage * (criterion.actualMax - criterion.actualMin));
      } else {
        // For metrics where higher is better
        actualValue = criterion.actualMin + (percentage * (criterion.actualMax - criterion.actualMin));
      }
      
      criterion.actualValue = parseFloat(actualValue.toFixed(2));
    }
    
    // Update the displayed value string
    if (criterion.actualUnit) {
      criterion.value = criterion.actualUnit === "$" || criterion.actualUnit === "$M" 
        ? `${criterion.actualUnit}${criterion.actualValue}` 
        : `${criterion.actualValue}${criterion.actualUnit}`;
    }
  }
  
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
  
  // Only update score if it's based on a numeric value
  const currentValue = criterion.actualValue || 
                      (criterion.value ? parseFloat(criterion.value.replace(/[^0-9.-]+/g, "")) : NaN);
  
  if (!isNaN(currentValue)) {
    if (currentValue >= min && currentValue <= max) {
      criterion.score = 8 + (2 * (1 - (max - currentValue) / (max - min)));
      if (criterion.score > 10) criterion.score = 10;
    } else if (currentValue < min) {
      const distance = (min - currentValue) / min;
      criterion.score = 6 - (distance * 4);
      if (criterion.score < 1) criterion.score = 1;
    } else {
      const distance = (currentValue - max) / max;
      criterion.score = 6 - (distance * 4);
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
  
  // Update the displayed value string
  if (criterion.actualUnit) {
    criterion.value = criterion.actualUnit === "$" || criterion.actualUnit === "$M" 
      ? `${criterion.actualUnit}${newValue}` 
      : `${newValue}${criterion.actualUnit}`;
  }
  
  // Get appropriate score mapping
  const scoreMapping = getScoreMappingForCriterion(criterion.name, criterion.scoreMapping);
  
  // Calculate score based on actual value and score mapping
  if (scoreMapping) {
    // Find the appropriate score range
    const matchingRange = scoreMapping.find(
      range => (newValue >= (range.min || 0) && newValue <= (range.max || Infinity)) ||
              (range.min === null && newValue <= (range.max || Infinity)) ||
              (range.max === null && newValue >= (range.min || 0))
    );
    
    if (matchingRange) {
      criterion.score = matchingRange.score;
    } else if (scoreMapping[0].min === null || newValue < (scoreMapping[0].min || 0)) {
      // If value is below the lowest range
      criterion.score = scoreMapping[0].score;
    } else if (scoreMapping[scoreMapping.length - 1].max === null || 
               newValue > (scoreMapping[scoreMapping.length - 1].max || 0)) {
      // If value is above the highest range
      criterion.score = scoreMapping[scoreMapping.length - 1].score;
    }
  } else if (criterion.actualMin !== undefined && criterion.actualMax !== undefined) {
    // Check if this metric should be inverted (lower is better)
    const shouldInvert = shouldUseInverseRelationship(criterion.name);
    
    if (shouldInvert) {
      // For metrics where lower is better (e.g., debt ratios)
      // Low value = high score, High value = low score
      const normalizedValue = (criterion.actualMax - newValue) / (criterion.actualMax - criterion.actualMin);
      criterion.score = 1 + normalizedValue * 9; // Scale to 1-10
    } else {
      // For metrics where higher is better
      // High value = high score, Low value = low score
      const normalizedValue = (newValue - criterion.actualMin) / (criterion.actualMax - criterion.actualMin);
      criterion.score = 1 + normalizedValue * 9; // Scale to 1-10
    }
    
    criterion.score = parseFloat(criterion.score.toFixed(1));
  }
  
  recalculateScores(newGroups, setTotalScore);
  setCriteriaGroups(newGroups);
};

export const updateActualMetricRange = (
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
  
  criterion.actualMinValue = min;
  criterion.actualMaxValue = max;
  
  // Update the displayed value string to show the range
  if (criterion.actualUnit) {
    const formattedMin = criterion.actualUnit === "$" || criterion.actualUnit === "$M" 
      ? `${criterion.actualUnit}${min}` 
      : `${min}${criterion.actualUnit}`;
    
    const formattedMax = criterion.actualUnit === "$" || criterion.actualUnit === "$M" 
      ? `${criterion.actualUnit}${max}` 
      : `${max}${criterion.actualUnit}`;
    
    criterion.value = `${formattedMin} - ${formattedMax}`;
  }
  
  // Calculate score based on the middle point of the range
  const averageValue = (min + max) / 2;
  
  // Get appropriate score mapping
  const scoreMapping = getScoreMappingForCriterion(criterion.name, criterion.scoreMapping);
  
  // Check if this metric should be inverted (lower is better)
  const shouldInvert = shouldUseInverseRelationship(criterion.name);
  
  if (scoreMapping) {
    // Find the appropriate score range for the average value
    const matchingRange = scoreMapping.find(
      range => (averageValue >= (range.min || 0) && averageValue <= (range.max || Infinity)) ||
              (range.min === null && averageValue <= (range.max || Infinity)) ||
              (range.max === null && averageValue >= (range.min || 0))
    );
    
    if (matchingRange) {
      criterion.score = matchingRange.score;
    } else if (scoreMapping[0].min === null || averageValue < (scoreMapping[0].min || 0)) {
      criterion.score = scoreMapping[0].score;
    } else if (scoreMapping[scoreMapping.length - 1].max === null || 
              averageValue > (scoreMapping[scoreMapping.length - 1].max || 0)) {
      criterion.score = scoreMapping[scoreMapping.length - 1].score;
    }
    
    // Also set min/max scores based on endpoints
    const minMatchingRange = scoreMapping.find(
      range => (min >= (range.min || 0) && min <= (range.max || Infinity)) ||
              (range.min === null && min <= (range.max || Infinity)) ||
              (range.max === null && min >= (range.min || 0))
    );
    
    const maxMatchingRange = scoreMapping.find(
      range => (max >= (range.min || 0) && max <= (range.max || Infinity)) ||
              (range.min === null && max <= (range.max || Infinity)) ||
              (range.max === null && max >= (range.min || 0))
    );
    
    criterion.minScore = minMatchingRange ? minMatchingRange.score : scoreMapping[0].score;
    criterion.maxScore = maxMatchingRange ? maxMatchingRange.score : scoreMapping[scoreMapping.length - 1].score;
    
  } else if (criterion.actualMin !== undefined && criterion.actualMax !== undefined) {
    if (shouldInvert) {
      // For metrics where lower is better
      const normalizedValue = (criterion.actualMax - averageValue) / (criterion.actualMax - criterion.actualMin);
      criterion.score = 1 + normalizedValue * 9; // Scale to 1-10
    } else {
      // For metrics where higher is better
      const normalizedValue = (averageValue - criterion.actualMin) / (criterion.actualMax - criterion.actualMin);
      criterion.score = 1 + normalizedValue * 9; // Scale to 1-10
    }
    
    criterion.score = parseFloat(criterion.score.toFixed(1));
    
    // Also update minScore and maxScore if applicable
    if (shouldInvert) {
      criterion.minScore = 1 + ((criterion.actualMax - max) / (criterion.actualMax - criterion.actualMin)) * 9;
      criterion.maxScore = 1 + ((criterion.actualMax - min) / (criterion.actualMax - criterion.actualMin)) * 9;
    } else {
      criterion.minScore = 1 + ((min - criterion.actualMin) / (criterion.actualMax - criterion.actualMin)) * 9;
      criterion.maxScore = 1 + ((max - criterion.actualMin) / (criterion.actualMax - criterion.actualMin)) * 9;
    }
    
    criterion.minScore = parseFloat(criterion.minScore.toFixed(1));
    criterion.maxScore = parseFloat(criterion.maxScore.toFixed(1));
  }
  
  recalculateScores(newGroups, setTotalScore);
  setCriteriaGroups(newGroups);
};

export const updateScoreRange = (
  min: number,
  max: number,
  setScoreRange: React.Dispatch<React.SetStateAction<{ min: number; max: number }>>
) => {
  setScoreRange({ min, max });
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
