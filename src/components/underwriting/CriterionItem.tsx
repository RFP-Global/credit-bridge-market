
import React, { useState } from "react";
import { Criterion, ScoreRange } from "./types";
import { CriterionHeader } from "./components/CriterionHeader";
import { CriterionWeightControls } from "./components/CriterionWeightControls";
import { RangeScoreSlider } from "./components/RangeScoreSlider";
import { CriterionScore } from "./components/CriterionScore";
import { MetricSlider } from "./components/MetricSlider";
import { PreferredRangeControls } from "./components/PreferredRangeControls";
import { debtEBITDAScoreMapping } from "./constants/debtEBITDAScoreMapping";
import { 
  isDebtEBITDACriterion, 
  shouldUseInverseRelationship,
  getScoreFromMetricValue,
  getMetricValueFromScore,
  calculateScoreFromMetricRange,
  calculateMetricFromScoreRange
} from "./utils/scoreCalculations";

interface CriterionItemProps {
  criterion: Criterion;
  criterionIndex: number;
  groupIndex: number;
  updateCriterionWeight: (groupIndex: number, criterionIndex: number, newWeight: number) => void;
  updateCriterionScore: (groupIndex: number, criterionIndex: number, newScore: number) => void;
  updateCriterionRange?: (groupIndex: number, criterionIndex: number, min: number, max: number) => void;
  updateActualMetricValue?: (groupIndex: number, criterionIndex: number, value: number) => void;
  updateActualMetricRange?: (groupIndex: number, criterionIndex: number, min: number, max: number) => void;
  getScoreColor: (score: number) => string;
  getScoreBackground: (score: number) => string;
}

export const CriterionItem = ({
  criterion,
  criterionIndex,
  groupIndex,
  updateCriterionWeight,
  updateCriterionScore,
  updateCriterionRange,
  updateActualMetricValue,
  updateActualMetricRange,
  getScoreColor,
  getScoreBackground,
}: CriterionItemProps) => {
  const [lastUpdated, setLastUpdated] = useState<'metric' | 'score' | null>(null);

  const isDebtEBITDA = isDebtEBITDACriterion(criterion.name);
  const shouldInvert = shouldUseInverseRelationship(criterion.name);

  // Get the proper score mapping
  const scoreMapping = isDebtEBITDA 
    ? debtEBITDAScoreMapping 
    : criterion.scoreMapping;

  // Handle score range slider changes
  const handleScoreRangeChange = (minScore: number, maxScore: number) => {
    setLastUpdated('score');
    
    const averageScore = (minScore + maxScore) / 2;
    updateCriterionScore(groupIndex, criterionIndex, averageScore);
    
    if (criterion.actualMin !== undefined && criterion.actualMax !== undefined && updateActualMetricRange) {
      const metricValues = calculateMetricFromScoreRange(
        minScore, 
        maxScore, 
        scoreMapping,
        criterion.actualMin,
        criterion.actualMax,
        shouldInvert
      );
      
      if (metricValues) {
        const minValue = parseFloat(metricValues.minValue.toFixed(2));
        const maxValue = parseFloat(metricValues.maxValue.toFixed(2));
        updateActualMetricRange(groupIndex, criterionIndex, minValue, maxValue);
      }
    }
  };

  // Handle metric range slider changes  
  const handleMetricRangeChange = (minValue: number, maxValue: number) => {
    setLastUpdated('metric');
    
    if (updateActualMetricRange) {
      updateActualMetricRange(groupIndex, criterionIndex, minValue, maxValue);
    }
    
    const scores = calculateScoreFromMetricRange(
      minValue, 
      maxValue, 
      scoreMapping,
      criterion.actualMin,
      criterion.actualMax,
      shouldInvert
    );
    
    if (scores) {
      const averageScore = (scores.minScore + scores.maxScore) / 2;
      updateCriterionScore(groupIndex, criterionIndex, parseFloat(averageScore.toFixed(1)));
    }
  };

  // All non-weight metrics will use dual slider
  const shouldUseDualSlider = criterion.actualMin !== undefined && criterion.actualMax !== undefined;

  // Handle direct score updates from CriterionScore component
  const handleDirectScoreUpdate = (newScore: number) => {
    setLastUpdated('score');
    updateCriterionScore(groupIndex, criterionIndex, newScore);
    
    // Only update metric values for EBITDA if we have actual min and max defined
    if (isDebtEBITDA && criterion.actualMin !== undefined && criterion.actualMax !== undefined && updateActualMetricValue) {
      const metricValue = getMetricValueFromScore(
        newScore, 
        scoreMapping,
        criterion.actualMin,
        criterion.actualMax,
        shouldInvert
      );
      
      if (metricValue !== null) {
        updateActualMetricValue(groupIndex, criterionIndex, parseFloat(metricValue.toFixed(2)));
      }
    }
  };

  // Handle criterion range update
  const handleCriterionRangeUpdate = (min: number, max: number) => {
    if (updateCriterionRange) {
      updateCriterionRange(groupIndex, criterionIndex, min, max);
    }
  };

  return (
    <div className="space-y-2 border-b border-gray-800/40 pb-4 last:border-0 last:pb-0">
      <CriterionHeader
        name={criterion.name}
        description={criterion.description}
        value={criterion.value}
        weight={criterion.weight}
        score={criterion.score}
        scoreMapping={scoreMapping}
        getScoreColor={getScoreColor}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CriterionWeightControls
          weight={criterion.weight}
          onWeightChange={(newWeight) => 
            updateCriterionWeight(groupIndex, criterionIndex, newWeight)
          }
        />
        
        <div className="space-y-2">
          {updateCriterionRange && (
            <RangeScoreSlider
              minValue={1}
              maxValue={10}
              initialMin={criterion.minScore || criterion.score}
              initialMax={criterion.maxScore || criterion.score}
              step={0.1}
              onRangeChange={handleScoreRangeChange}
              scoreMapping={scoreMapping}
              isDebtEBITDA={isDebtEBITDA}
            />
          )}
        </div>
      </div>

      <CriterionScore
        score={criterion.score}
        onScoreUpdate={handleDirectScoreUpdate}
        isDebtEBITDA={isDebtEBITDA}
        actualMetricValue={criterion.actualValue}
        actualMetricMin={criterion.actualMin}
        actualMetricMax={criterion.actualMax}
      />

      {(updateActualMetricValue || updateActualMetricRange) && (
        <MetricSlider
          actualValue={criterion.actualValue}
          actualMinValue={criterion.actualMinValue}
          actualMaxValue={criterion.actualMaxValue}
          actualMin={criterion.actualMin}
          actualMax={criterion.actualMax}
          actualUnit={criterion.actualUnit}
          name={criterion.name}
          scoreMapping={scoreMapping}
          onValueUpdate={(value) => {
            if (updateActualMetricValue) {
              setLastUpdated('metric');
              updateActualMetricValue(groupIndex, criterionIndex, value);
              
              // For EBITDA metrics, also update the score based on the metric value
              if (isDebtEBITDA) {
                const calculatedScore = getScoreFromMetricValue(
                  value, 
                  scoreMapping,
                  criterion.actualMin,
                  criterion.actualMax,
                  shouldInvert
                );
                updateCriterionScore(groupIndex, criterionIndex, calculatedScore);
              }
            }
          }}
          onRangeUpdate={handleMetricRangeChange}
          isDualSlider={shouldUseDualSlider}
          inverseRelationship={shouldInvert}
          isDebtEBITDA={isDebtEBITDA}
        />
      )}

      <PreferredRangeControls
        initialMin={criterion.preferredMin}
        initialMax={criterion.preferredMax}
        unit={criterion.unit}
        preferredMin={criterion.preferredMin}
        preferredMax={criterion.preferredMax}
        onRangeUpdate={handleCriterionRangeUpdate}
      />
    </div>
  );
};
