
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
      // Use the midpoint of the range as the representative value
      const min = matchingRange.min !== null ? matchingRange.min : (actualMin || 0);
      const max = matchingRange.max !== null ? matchingRange.max : (actualMax || 10);
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
    // For metrics where lower is better (like debt)
    // Protect against division by zero
    if (actualMax === actualMin) return 5;
    
    const normalizedValue = Math.max(0, Math.min(1, (actualMax - value) / (actualMax - actualMin)));
    return Math.max(1, Math.min(10, 1 + normalizedValue * 9));
  } else {
    // For metrics where higher is better
    // Protect against division by zero
    if (actualMax === actualMin) return 5;
    
    const normalizedValue = Math.max(0, Math.min(1, (value - actualMin) / (actualMax - actualMin)));
    return Math.max(1, Math.min(10, 1 + normalizedValue * 9));
  }
};

export const calculateMetricFromScoreSingle = (
  score: number,
  actualMin?: number,
  actualMax?: number,
  shouldInvert = false
): number | null => {
  if (actualMin === undefined || actualMax === undefined) {
    return null;
  }
  
  const range = actualMax - actualMin;
  // Normalize the score to a 0-1 range
  const normalizedScore = Math.max(0, Math.min(1, (score - 1) / 9));
  
  if (shouldInvert) {
    // For metrics where lower is better
    return actualMax - (normalizedScore * range);
  } else {
    // For metrics where higher is better
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
    
    // Ensure proper order of scores based on relationship
    if (shouldInvert) {
      return { 
        minScore: Math.min(minScore, maxScore),
        maxScore: Math.max(minScore, maxScore)
      };
    } else {
      return { 
        minScore: Math.min(minScore, maxScore), 
        maxScore: Math.max(minScore, maxScore) 
      };
    }
  }
  
  if (actualMin !== undefined && actualMax !== undefined) {
    if (shouldInvert) {
      // For metrics where lower is better
      const normalizedMin = Math.max(0, Math.min(1, (actualMax - maxValue) / (actualMax - actualMin)));
      const normalizedMax = Math.max(0, Math.min(1, (actualMax - minValue) / (actualMax - actualMin)));
      
      return {
        minScore: Math.max(1, Math.min(10, 1 + Math.min(normalizedMin, normalizedMax) * 9)),
        maxScore: Math.max(1, Math.min(10, 1 + Math.max(normalizedMin, normalizedMax) * 9))
      };
    } else {
      // For metrics where higher is better
      const normalizedMin = Math.max(0, Math.min(1, (minValue - actualMin) / (actualMax - actualMin)));
      const normalizedMax = Math.max(0, Math.min(1, (maxValue - actualMin) / (actualMax - actualMin)));
      
      return {
        minScore: Math.max(1, Math.min(10, 1 + Math.min(normalizedMin, normalizedMax) * 9)),
        maxScore: Math.max(1, Math.min(10, 1 + Math.max(normalizedMin, normalizedMax) * 9))
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
  if (minScore > maxScore) {
    // Swap if min is greater than max
    [minScore, maxScore] = [maxScore, minScore];
  }
  
  if (scoreMapping) {
    // For each score, find the corresponding metric value
    const minValue = getMetricValueFromScore(minScore, scoreMapping, actualMin, actualMax, shouldInvert);
    const maxValue = getMetricValueFromScore(maxScore, scoreMapping, actualMin, actualMax, shouldInvert);
    
    if (minValue !== null && maxValue !== null) {
      // For metrics that have an inverse relationship, swap the values
      if (shouldInvert && minValue < maxValue) {
        return { minValue: maxValue, maxValue: minValue };
      }
      if (!shouldInvert && minValue > maxValue) {
        return { minValue: maxValue, maxValue: minValue };
      }
      
      return { minValue, maxValue };
    }
  }
  
  if (actualMin !== undefined && actualMax !== undefined) {
    const range = actualMax - actualMin;
    
    // Normalize scores to 0-1 range
    const minPercent = Math.max(0, Math.min(1, (minScore - 1) / 9));
    const maxPercent = Math.max(0, Math.min(1, (maxScore - 1) / 9));
    
    if (shouldInvert) {
      // For metrics where lower is better (higher value = lower score)
      return {
        maxValue: actualMax - (minPercent * range),
        minValue: actualMax - (maxPercent * range)
      };
    } else {
      // For metrics where higher is better (higher value = higher score)
      return {
        minValue: actualMin + (minPercent * range),
        maxValue: actualMin + (maxPercent * range)
      };
    }
  }
  
  return { minValue: 0, maxValue: 0 };
};
