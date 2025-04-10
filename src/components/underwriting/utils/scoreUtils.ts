
// This file now re-exports all the utility functions from the separate files
import { updateCriterionWeight, updateGroupWeight } from './weightUtils';
import { updateCriterionScore, recalculateScores } from './scoreCalculationUtils';
import { updateCriterionRange } from './rangeUtils';
import { updateActualMetricValue } from './metricValueUtils';
import { toggleCriterionEnabled } from './criteriaUtils';

export {
  updateCriterionWeight,
  updateGroupWeight,
  updateCriterionScore,
  updateCriterionRange,
  updateActualMetricValue,
  recalculateScores,
  toggleCriterionEnabled
};
