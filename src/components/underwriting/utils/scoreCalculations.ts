
import { ScoreRange } from "../types";

// Helper function to determine if a criterion should use inverse relationship
export const shouldUseInverseRelationship = (criterionName: string): boolean => {
  return criterionName.toLowerCase().includes('debt') || 
         criterionName.toLowerCase().includes('risk');
};

// Helper function to check if criterion is Debt/EBITDA
export const isDebtEBITDACriterion = (criterionName: string): boolean => {
  return criterionName.toLowerCase().includes('debt/ebitda') || 
         (criterionName.toLowerCase().includes('debt') && 
          criterionName.toLowerCase().includes('ebitda'));
};

export const getScoreFromMetricValue = (
  value: number, 
  scoreMapping?: ScoreRange[],
  actualMin?: number,
  actualMax?: number,
  shouldInvert = false
): number => {
  if (scoreMapping) {
    const matchingRange = scoreMapping.find(range => 
      (value >= (range.min || 0) && value <= (range.max || Infinity)) ||
      (range.min === null && value <= (range.max || Infinity)) ||
      (range.max === null && value >= (range.min || 0))
    );
    
    if (matchingRange) {
      return matchingRange.score;
    }
  }
  
  return calculateScoreFromMetricSingle(value, actualMin, actualMax, shouldInvert);
};

export const getMetricValueFromScore = (
  score: number, 
  scoreMapping?: ScoreRange[],
  actualMin?: number,
  actualMax?: number,
  shouldInvert = false
): number | null => {
  if (scoreMapping) {
    const matchingRange = scoreMapping.find(range => 
      score >= range.score - 0.5 && score < range.score + 0.5
    );
    
    if (matchingRange) {
      const min = matchingRange.min !== null ? matchingRange.min : (actualMin || 0);
      const max = matchingRange.max !== null ? matchingRange.max : (actualMax || 0);
      return (min + max) / 2;
    }
  }
  
  return calculateMetricFromScoreSingle(score, actualMin, actualMax, shouldInvert);
};

export const calculateScoreFromMetricSingle = (
  value: number,
  actualMin?: number,
  actualMax?: number,
  shouldInvert = false
): number => {
  if (actualMin === undefined || actualMax === undefined) {
    return 5; // Default middle score if no range defined
  }
  
  if (shouldInvert) {
    const normalizedValue = (actualMax - value) / (actualMax - actualMin);
    return Math.max(1, Math.min(10, 1 + normalizedValue * 9));
  } else {
    const normalizedValue = (value - actualMin) / (actualMax - actualMin);
    return Math.max(1, Math.min(10, 1 + normalizedValue * 9));
  }
};

export const calculateMetricFromScoreSingle = (
  score: number,
  actualMin?: number,
  actualMax?: number,
  shouldInvert = false
): number => {
  if (actualMin === undefined || actualMax === undefined) {
    return 0;
  }
  
  const range = actualMax - actualMin;
  const normalizedScore = (score - 1) / 9;
  
  if (shouldInvert) {
    return actualMax - (normalizedScore * range);
  } else {
    return actualMin + (normalizedScore * range);
  }
};

export const calculateScoreFromMetricRange = (
  minValue: number, 
  maxValue: number, 
  scoreMapping?: ScoreRange[],
  actualMin?: number,
  actualMax?: number,
  shouldInvert = false
) => {
  if (scoreMapping) {
    const minScore = getScoreFromMetricValue(minValue, scoreMapping, actualMin, actualMax, shouldInvert);
    const maxScore = getScoreFromMetricValue(maxValue, scoreMapping, actualMin, actualMax, shouldInvert);
    return { minScore, maxScore };
  }
  
  if (actualMin !== undefined && actualMax !== undefined) {
    if (shouldInvert) {
      const maxScore = 10;
      const minScore = 1;
      const minPercent = (actualMax - minValue) / (actualMax - actualMin);
      const maxPercent = (actualMax - maxValue) / (actualMax - actualMin);
      
      return {
        minScore: minScore + (maxScore - minScore) * maxPercent,
        maxScore: minScore + (maxScore - minScore) * minPercent
      };
    } else {
      const maxScore = 10;
      const minScore = 1;
      const minPercent = (minValue - actualMin) / (actualMax - actualMin);
      const maxPercent = (maxValue - actualMin) / (actualMax - actualMin);
      
      return {
        minScore: minScore + (maxScore - minScore) * minPercent,
        maxScore: minScore + (maxScore - minScore) * maxPercent
      };
    }
  }
  
  return { minScore: 1, maxScore: 10 };
};

export const calculateMetricFromScoreRange = (
  minScore: number, 
  maxScore: number, 
  scoreMapping?: ScoreRange[],
  actualMin?: number,
  actualMax?: number,
  shouldInvert = false
) => {
  if (scoreMapping) {
    const minValue = getMetricValueFromScore(minScore, scoreMapping, actualMin, actualMax, shouldInvert);
    const maxValue = getMetricValueFromScore(maxScore, scoreMapping, actualMin, actualMax, shouldInvert);
    
    if (minValue !== null && maxValue !== null) {
      return { minValue, maxValue };
    }
  }
  
  if (actualMin !== undefined && actualMax !== undefined) {
    if (shouldInvert) {
      const range = actualMax - actualMin;
      const minPercent = (10 - minScore) / 9;
      const maxPercent = (10 - maxScore) / 9;
      
      return {
        maxValue: actualMax - (range * minPercent),
        minValue: actualMax - (range * maxPercent)
      };
    } else {
      const range = actualMax - actualMin;
      const minPercent = (minScore - 1) / 9;
      const maxPercent = (maxScore - 1) / 9;
      
      return {
        minValue: actualMin + (range * minPercent),
        maxValue: actualMin + (range * maxPercent)
      };
    }
  }
  
  return { minValue: 0, maxValue: 0 };
};
