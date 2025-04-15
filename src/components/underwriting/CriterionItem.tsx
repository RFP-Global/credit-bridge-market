
import React, { useState, useEffect } from "react";
import { Criterion } from "./types";
import { CriterionHeader } from "./criterion-parts/CriterionHeader";
import { CriterionWeight } from "./criterion-parts/CriterionWeight";
import { CriterionScoreRange } from "./criterion-parts/CriterionScoreRange";
import { CriterionPreferredRange } from "./criterion-parts/CriterionPreferredRange";

interface CriterionItemProps {
  criterion: Criterion;
  criterionIndex: number;
  groupIndex: number;
  updateCriterionWeight: (groupIndex: number, criterionIndex: number, newWeight: number) => void;
  updateCriterionScore: (groupIndex: number, criterionIndex: number, minScore: number, maxScore: number) => void;
  updateCriterionRange?: (groupIndex: number, criterionIndex: number, min: number, max: number) => void;
  updateActualMetricValue?: (groupIndex: number, criterionIndex: number, value: number) => void;
  toggleCriterionEnabled?: (groupIndex: number, criterionIndex: number, enabled: boolean) => void;
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
  toggleCriterionEnabled,
  getScoreColor,
  getScoreBackground,
}: CriterionItemProps) => {
  const [minValue, setMinValue] = useState(criterion.preferredMin !== undefined ? criterion.preferredMin.toString() : "");
  const [maxValue, setMaxValue] = useState(criterion.preferredMax !== undefined ? criterion.preferredMax.toString() : "");
  const [minScoreValue, setMinScoreValue] = useState(criterion.minScore !== undefined ? criterion.minScore.toString() : "0");
  const [maxScoreValue, setMaxScoreValue] = useState(criterion.maxScore !== undefined ? criterion.maxScore.toString() : "0");
  const [rangeValues, setRangeValues] = useState<number[]>([
    criterion.preferredMin !== undefined ? criterion.preferredMin : criterion.min || 0,
    criterion.preferredMax !== undefined ? criterion.preferredMax : criterion.max || 100
  ]);

  useEffect(() => {
    if (criterion.preferredMin !== undefined) {
      setMinValue(criterion.preferredMin.toString());
      setRangeValues(prev => [criterion.preferredMin!, prev[1]]);
    }
  }, [criterion.preferredMin]);

  useEffect(() => {
    if (criterion.preferredMax !== undefined) {
      setMaxValue(criterion.preferredMax.toString());
      setRangeValues(prev => [prev[0], criterion.preferredMax!]);
    }
  }, [criterion.preferredMax]);

  useEffect(() => {
    if (criterion.minScore !== undefined) {
      setMinScoreValue(criterion.minScore.toString());
    }
    if (criterion.maxScore !== undefined) {
      setMaxScoreValue(criterion.maxScore.toString());
    }
  }, [criterion.minScore, criterion.maxScore]);

  const handleRangeUpdate = () => {
    if (updateCriterionRange && minValue && maxValue) {
      const min = parseFloat(minValue);
      const max = parseFloat(maxValue);
      if (!isNaN(min) && !isNaN(max) && min <= max) {
        updateCriterionRange(groupIndex, criterionIndex, min, max);
        setRangeValues([min, max]);
      }
    }
  };

  const handleRangeSliderUpdate = (values: number[]) => {
    if (values.length === 2 && updateCriterionRange) {
      setRangeValues(values);
      setMinValue(values[0].toString());
      setMaxValue(values[1].toString());
      updateCriterionRange(groupIndex, criterionIndex, values[0], values[1]);
    }
  };

  const handleScoreRangeUpdate = () => {
    const minScore = parseFloat(minScoreValue);
    const maxScore = parseFloat(maxScoreValue);
    if (!isNaN(minScore) && !isNaN(maxScore) && minScore <= maxScore) {
      updateCriterionScore(groupIndex, criterionIndex, minScore, maxScore);
    }
  };

  return (
    <div className={`space-y-2 border-b border-gray-800/40 pb-4 last:border-0 last:pb-0 ${!criterion.enabled ? 'opacity-60' : ''}`}>
      <CriterionHeader 
        criterion={criterion}
        groupIndex={groupIndex}
        criterionIndex={criterionIndex}
        toggleCriterionEnabled={toggleCriterionEnabled}
        getScoreColor={getScoreColor}
      />
      
      {criterion.enabled && (
        <>
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4">
                <CriterionWeight 
                  weight={criterion.weight}
                  groupIndex={groupIndex}
                  criterionIndex={criterionIndex}
                  updateCriterionWeight={updateCriterionWeight}
                />
              </div>
              
              <div className="col-span-8">
                <CriterionScoreRange 
                  minScoreValue={minScoreValue}
                  maxScoreValue={maxScoreValue}
                  onMinScoreChange={(e) => setMinScoreValue(e.target.value)}
                  onMaxScoreChange={(e) => setMaxScoreValue(e.target.value)}
                  onUpdateRange={handleScoreRangeUpdate}
                />
              </div>
            </div>

            <CriterionPreferredRange 
              criterion={criterion}
              minValue={minValue}
              maxValue={maxValue}
              rangeValues={rangeValues}
              onMinValueChange={(e) => setMinValue(e.target.value)}
              onMaxValueChange={(e) => setMaxValue(e.target.value)}
              onRangeUpdate={handleRangeUpdate}
              onSliderChange={handleRangeSliderUpdate}
            />
          </div>
        </>
      )}
    </div>
  );
};
