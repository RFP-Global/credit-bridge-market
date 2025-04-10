
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Info, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Criterion, ScoreRange } from "./types";

interface CriterionItemProps {
  criterion: Criterion;
  criterionIndex: number;
  groupIndex: number;
  updateCriterionWeight: (groupIndex: number, criterionIndex: number, newWeight: number) => void;
  updateCriterionScore: (groupIndex: number, criterionIndex: number, minScore: number, maxScore: number) => void;
  updateCriterionRange?: (groupIndex: number, criterionIndex: number, min: number, max: number) => void;
  updateActualMetricValue?: (groupIndex: number, criterionIndex: number, value: number) => void;
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
        calculateAndUpdateScores(min, max);
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
    
    const newMinScore = Number((1 + minNormalized * 9).toFixed(2));
    const newMaxScore = Number((1 + maxNormalized * 9).toFixed(2));
    
    setMinScoreValue(newMinScore.toFixed(2));
    setMaxScoreValue(newMaxScore.toFixed(2));
    
    updateCriterionScore(groupIndex, criterionIndex, newMinScore, newMaxScore);
  };

  const handleScoreRangeUpdate = () => {
    const minScore = parseFloat(minScoreValue);
    const maxScore = parseFloat(maxScoreValue);
    if (!isNaN(minScore) && !isNaN(maxScore) && minScore <= maxScore) {
      updateCriterionScore(groupIndex, criterionIndex, minScore, maxScore);
      
      // Calculate corresponding preferred range values based on the score values
      const totalRange = criterion.max - criterion.min;
      const minNormalized = (minScore - 1) / 9;
      const maxNormalized = (maxScore - 1) / 9;
      
      const newMin = criterion.min + (minNormalized * totalRange);
      const newMax = criterion.min + (maxNormalized * totalRange);
      
      // Update the range values
      setMinValue(newMin.toFixed(2));
      setMaxValue(newMax.toFixed(2));
      setRangeValues([newMin, newMax]);
      
      // Update the criterion range if the function is available
      if (updateCriterionRange) {
        updateCriterionRange(groupIndex, criterionIndex, newMin, newMax);
      }
    }
  };

  // Handle direct input changes for min and max values (preferred range)
  const handleMinValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinValue(e.target.value);
  };

  const handleMaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxValue(e.target.value);
  };

  // Handle direct input changes for min and max score values
  const handleMinScoreValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinScoreValue(e.target.value);
  };

  const handleMaxScoreValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxScoreValue(e.target.value);
  };

  const avgScore = criterion.minScore !== undefined && criterion.maxScore !== undefined 
    ? (criterion.minScore + criterion.maxScore) / 2 
    : 0;

  const renderScoreMappingTable = (scoreMapping: ScoreRange[]) => {
    return (
      <div className="w-full">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-900/60">
              <th className="py-1.5 px-2 text-left border-b border-gray-700">Range</th>
              <th className="py-1.5 px-2 text-left border-b border-gray-700">Score</th>
              {scoreMapping[0].riskLevel && <th className="py-1.5 px-2 text-left border-b border-gray-700">Risk Level</th>}
            </tr>
          </thead>
          <tbody>
            {scoreMapping.map((range, idx) => (
              <tr key={`mapping-row-${idx}`} className="border-b border-gray-800/40 last:border-0">
                <td className="py-1.5 px-2">
                  {idx === 0 ? 
                    `≥ ${range.min}${criterion.actualUnit || ''}` : 
                    idx === scoreMapping.length - 1 ? 
                    `< ${range.min}${criterion.actualUnit || ''}` : 
                    `${range.min} - ${range.max}${criterion.actualUnit || ''}`}
                </td>
                <td className={`py-1.5 px-2 ${getScoreColor(range.score)}`}>
                  {range.score}
                </td>
                {scoreMapping[0].riskLevel && (
                  <td className="py-1.5 px-2 text-gray-300">
                    {range.riskLevel}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-2 border-b border-gray-800/40 pb-4 last:border-0 last:pb-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <div className="flex items-center">
            <div className="font-medium">{criterion.name}</div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 ml-1.5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[250px] text-xs">
                  {criterion.description}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="text-xs text-muted-foreground ml-3">
              Current value: {criterion.value}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-xs text-muted-foreground">
            Weight: {criterion.weight}%
          </div>
          {criterion.scoreMapping && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent side="left" className="w-auto max-w-[300px] p-3 bg-gray-950 border border-gray-800">
                <div className="text-xs font-semibold mb-2 text-gray-300">Score Mapping for {criterion.name}</div>
                {criterion.scoreMapping && renderScoreMappingTable(criterion.scoreMapping)}
              </PopoverContent>
            </Popover>
          )}
          <div className={`font-medium ${getScoreColor(avgScore)}`}>
            Score: {criterion.minScore !== undefined ? criterion.minScore.toFixed(1) : "0.0"}-{criterion.maxScore !== undefined ? criterion.maxScore.toFixed(1) : "0.0"}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Criterion Weight</span>
            <span>{criterion.weight}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6"
              onClick={() => updateCriterionWeight(groupIndex, criterionIndex, Math.max(5, criterion.weight - 5))}
              disabled={criterion.weight <= 5}
            >
              <ChevronDown className="h-3 w-3" />
            </Button>
            <Slider
              value={[criterion.weight]}
              min={5}
              max={70}
              step={5}
              className="flex-1"
              onValueChange={(value) => updateCriterionWeight(groupIndex, criterionIndex, value[0])}
            />
            <Button 
              variant="outline" 
              size="icon"
              className="h-6 w-6"
              onClick={() => updateCriterionWeight(groupIndex, criterionIndex, Math.min(70, criterion.weight + 5))}
              disabled={criterion.weight >= 70}
            >
              <ChevronUp className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Risk Score Range</span>
            <span>{criterion.minScore !== undefined ? criterion.minScore.toFixed(1) : "0.0"}-{criterion.maxScore !== undefined ? criterion.maxScore.toFixed(1) : "0.0"}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2">
              <span className="text-xs text-muted-foreground">Min:</span>
              <Input
                value={minScoreValue}
                onChange={handleMinScoreValueChange}
                className="h-7 text-xs"
                placeholder="Min score"
              />
            </div>
            <div className="flex flex-1 items-center gap-2">
              <span className="text-xs text-muted-foreground">Max:</span>
              <Input
                value={maxScoreValue}
                onChange={handleMaxScoreValueChange}
                className="h-7 text-xs"
                placeholder="Max score"
              />
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs"
              onClick={handleScoreRangeUpdate}
            >
              Set Range
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-800/30">
        <div className="text-xs font-medium mb-2">Preferred Range {criterion.unit ? `(${criterion.unit})` : ''}</div>
        
        <div className="mb-3">
          <Slider
            value={rangeValues}
            min={criterion.min || 0}
            max={criterion.max || 100}
            step={(criterion.max - criterion.min) / 100}
            className="my-4"
            onValueChange={handleRangeSliderUpdate}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{criterion.min}{criterion.unit || ''}</span>
            <span>{criterion.max}{criterion.unit || ''}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center gap-2">
            <span className="text-xs text-muted-foreground">Min:</span>
            <Input
              value={minValue}
              onChange={handleMinValueChange}
              className="h-7 text-xs"
              placeholder={`Min ${criterion.unit || ''}`}
            />
          </div>
          <div className="flex flex-1 items-center gap-2">
            <span className="text-xs text-muted-foreground">Max:</span>
            <Input
              value={maxValue}
              onChange={handleMaxValueChange}
              className="h-7 text-xs"
              placeholder={`Max ${criterion.unit || ''}`}
            />
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 text-xs"
            onClick={handleRangeUpdate}
          >
            Set Range
          </Button>
        </div>
        {criterion.preferredMin !== undefined && criterion.preferredMax !== undefined && (
          <div className="mt-2 text-xs text-blue-400">
            Current preferred range: {criterion.preferredMin} - {criterion.preferredMax} {criterion.unit || ''}
          </div>
        )}
      </div>
    </div>
  );
};
