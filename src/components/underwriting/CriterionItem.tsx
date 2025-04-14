
import React, { useState, useEffect } from "react";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Criterion } from "./types";
import { CriterionHeader } from "./criterion/CriterionHeader";
import { CriterionWeight } from "./criterion/CriterionWeight";
import { ScoreMappingTable } from "./criterion/ScoreMappingTable";
import { PreferredRange } from "./criterion/PreferredRange";
import { ScoreRange } from "./criterion/ScoreRange";

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

export const CriterionItem: React.FC<CriterionItemProps> = ({
  criterion,
  criterionIndex,
  groupIndex,
  updateCriterionWeight,
  updateCriterionScore,
  updateCriterionRange,
  updateActualMetricValue,
  toggleCriterionEnabled,
  getScoreColor,
  getScoreBackground,
}) => {
  const [minValue, setMinValue] = useState(criterion.preferredMin?.toString() || "");
  const [maxValue, setMaxValue] = useState(criterion.preferredMax?.toString() || "");
  const [minScoreValue, setMinScoreValue] = useState(criterion.minScore?.toString() || "0");
  const [maxScoreValue, setMaxScoreValue] = useState(criterion.maxScore?.toString() || "0");
  const [rangeValues, setRangeValues] = useState<number[]>([
    criterion.preferredMin || criterion.min,
    criterion.preferredMax || criterion.max
  ]);

  useEffect(() => {
    if (criterion.preferredMin !== undefined) {
      setMinValue(criterion.preferredMin.toString());
      setRangeValues(prev => [criterion.preferredMin!, prev[1]]);
    }
    if (criterion.preferredMax !== undefined) {
      setMaxValue(criterion.preferredMax.toString());
      setRangeValues(prev => [prev[0], criterion.preferredMax!]);
    }
    if (criterion.minScore !== undefined) {
      setMinScoreValue(criterion.minScore.toString());
    }
    if (criterion.maxScore !== undefined) {
      setMaxScoreValue(criterion.maxScore.toString());
    }
  }, [criterion.preferredMin, criterion.preferredMax, criterion.minScore, criterion.maxScore]);

  const handleRangeUpdate = (min: string, max: string) => {
    if (updateCriterionRange && min && max) {
      const minVal = parseFloat(min);
      const maxVal = parseFloat(max);
      if (!isNaN(minVal) && !isNaN(maxVal) && minVal <= maxVal) {
        updateCriterionRange(groupIndex, criterionIndex, minVal, maxVal);
        setRangeValues([minVal, maxVal]);
        calculateAndUpdateScores(minVal, maxVal);
      }
    }
  };

  const handleRangeSliderUpdate = (values: number[]) => {
    if (values.length === 2 && updateCriterionRange) {
      setRangeValues(values);
      setMinValue(values[0].toString());
      setMaxValue(values[1].toString());
      updateCriterionRange(groupIndex, criterionIndex, values[0], values[1]);
      calculateAndUpdateScores(values[0], values[1]);
    }
  };

  const calculateAndUpdateScores = (min: number, max: number) => {
    const totalRange = criterion.max - criterion.min;
    const minNormalized = (min - criterion.min) / totalRange;
    const maxNormalized = (max - criterion.min) / totalRange;
    
    const newMinScore = Math.max(1, Math.min(10, Number((1 + minNormalized * 9).toFixed(2))));
    const newMaxScore = Math.max(1, Math.min(10, Number((1 + maxNormalized * 9).toFixed(2))));
    
    setMinScoreValue(newMinScore.toFixed(2));
    setMaxScoreValue(newMaxScore.toFixed(2));
    
    updateCriterionScore(groupIndex, criterionIndex, newMinScore, newMaxScore);
  };

  const handleScoreRangeUpdate = () => {
    const minScore = parseFloat(minScoreValue);
    const maxScore = parseFloat(maxScoreValue);
    if (!isNaN(minScore) && !isNaN(maxScore) && minScore <= maxScore) {
      const cappedMinScore = Math.max(1, Math.min(10, minScore));
      const cappedMaxScore = Math.max(1, Math.min(10, maxScore));
      
      updateCriterionScore(groupIndex, criterionIndex, cappedMinScore, cappedMaxScore);
      
      const totalRange = criterion.max - criterion.min;
      const minNormalized = (cappedMinScore - 1) / 9;
      const maxNormalized = (cappedMaxScore - 1) / 9;
      
      const newMin = criterion.min + (minNormalized * totalRange);
      const newMax = criterion.min + (maxNormalized * totalRange);
      
      setMinValue(newMin.toFixed(2));
      setMaxValue(newMax.toFixed(2));
      setRangeValues([newMin, newMax]);
      
      if (updateCriterionRange) {
        updateCriterionRange(groupIndex, criterionIndex, newMin, newMax);
      }
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CriterionWeight
              weight={criterion.weight}
              groupIndex={groupIndex}
              criterionIndex={criterionIndex}
              updateCriterionWeight={updateCriterionWeight}
            />
            
            <ScoreRange
              minScore={minScoreValue}
              maxScore={maxScoreValue}
              onMinScoreValueChange={(e) => setMinScoreValue(e.target.value)}
              onMaxScoreValueChange={(e) => setMaxScoreValue(e.target.value)}
              onScoreRangeUpdate={handleScoreRangeUpdate}
            />
          </div>

          <PreferredRange
            min={criterion.min}
            max={criterion.max}
            step={(criterion.max - criterion.min) / 100}
            unit={criterion.unit}
            preferredMin={criterion.preferredMin}
            preferredMax={criterion.preferredMax}
            rangeValues={rangeValues}
            onRangeUpdate={handleRangeUpdate}
            onRangeSliderUpdate={handleRangeSliderUpdate}
            minValue={minValue}
            maxValue={maxValue}
            onMinValueChange={(e) => setMinValue(e.target.value)}
            onMaxValueChange={(e) => setMaxValue(e.target.value)}
          />

          {criterion.scoreMapping && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="mt-2">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  View Score Mapping
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3 bg-gray-950 border border-gray-800">
                <div className="text-xs font-semibold mb-2 text-gray-300">
                  Score Mapping for {criterion.name}
                </div>
                <ScoreMappingTable
                  scoreMapping={criterion.scoreMapping}
                  unit={criterion.actualUnit}
                  getScoreColor={getScoreColor}
                />
              </PopoverContent>
            </Popover>
          )}
        </>
      )}
    </div>
  );
};
