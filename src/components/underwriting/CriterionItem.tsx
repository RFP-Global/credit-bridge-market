
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Criterion } from "./types";

interface CriterionItemProps {
  criterion: Criterion;
  criterionIndex: number;
  groupIndex: number;
  updateCriterionWeight: (groupIndex: number, criterionIndex: number, newWeight: number) => void;
  updateCriterionScore: (groupIndex: number, criterionIndex: number, newScore: number) => void;
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
  const [minValue, setMinValue] = useState(criterion.preferredMin?.toString() || "");
  const [maxValue, setMaxValue] = useState(criterion.preferredMax?.toString() || "");
  const [actualValue, setActualValue] = useState(criterion.actualValue?.toString() || "");

  useEffect(() => {
    if (criterion.actualValue !== undefined) {
      setActualValue(criterion.actualValue.toString());
    }
  }, [criterion.actualValue]);

  const handleRangeUpdate = () => {
    if (updateCriterionRange && minValue && maxValue) {
      const min = parseFloat(minValue);
      const max = parseFloat(maxValue);
      if (!isNaN(min) && !isNaN(max) && min <= max) {
        updateCriterionRange(groupIndex, criterionIndex, min, max);
      }
    }
  };

  const handleActualValueUpdate = () => {
    if (updateActualMetricValue && actualValue) {
      const value = parseFloat(actualValue);
      if (!isNaN(value)) {
        updateActualMetricValue(groupIndex, criterionIndex, value);
      }
    }
  };

  // Helper function to format actual value display with unit
  const getFormattedActualValue = () => {
    if (criterion.actualValue === undefined) return "";
    const formatted = criterion.actualUnit === "$" || criterion.actualUnit === "$M" 
      ? `${criterion.actualUnit}${criterion.actualValue}` 
      : `${criterion.actualValue}${criterion.actualUnit || ""}`;
    return formatted;
  };

  const renderActualMetricSlider = () => {
    if (criterion.actualMin === undefined || criterion.actualMax === undefined || criterion.actualValue === undefined) {
      return null;
    }

    return (
      <div className="space-y-2 mt-3">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Actual {criterion.name} Value</span>
          <span>{getFormattedActualValue()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-6 w-6"
            onClick={() => {
              if (updateActualMetricValue && criterion.actualValue !== undefined && criterion.actualMin !== undefined) {
                const step = criterion.actualMax && criterion.actualMin 
                  ? (criterion.actualMax - criterion.actualMin) / 20 
                  : 0.1;
                const newValue = Math.max(criterion.actualMin, criterion.actualValue - step);
                updateActualMetricValue(groupIndex, criterionIndex, parseFloat(newValue.toFixed(2)));
              }
            }}
          >
            <ChevronDown className="h-3 w-3" />
          </Button>
          <Slider
            value={[criterion.actualValue]}
            min={criterion.actualMin}
            max={criterion.actualMax}
            step={(criterion.actualMax - criterion.actualMin) / 100}
            className="flex-1"
            onValueChange={(value) => {
              if (updateActualMetricValue) {
                updateActualMetricValue(groupIndex, criterionIndex, parseFloat(value[0].toFixed(2)));
              }
            }}
          />
          <Button 
            variant="outline" 
            size="icon"
            className="h-6 w-6"
            onClick={() => {
              if (updateActualMetricValue && criterion.actualValue !== undefined && criterion.actualMax !== undefined) {
                const step = criterion.actualMax && criterion.actualMin 
                  ? (criterion.actualMax - criterion.actualMin) / 20 
                  : 0.1;
                const newValue = Math.min(criterion.actualMax, criterion.actualValue + step);
                updateActualMetricValue(groupIndex, criterionIndex, parseFloat(newValue.toFixed(2)));
              }
            }}
          >
            <ChevronUp className="h-3 w-3" />
          </Button>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex flex-1 items-center gap-2">
            <span className="text-xs text-muted-foreground">Value:</span>
            <Input
              value={actualValue}
              onChange={(e) => setActualValue(e.target.value)}
              className="h-7 text-xs"
              placeholder={`Value ${criterion.actualUnit || ''}`}
            />
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 text-xs"
            onClick={handleActualValueUpdate}
          >
            Set Value
          </Button>
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          <span>Range: {criterion.actualMin} - {criterion.actualMax} {criterion.actualUnit || ''}</span>
        </div>
        {criterion.scoreMapping && (
          <div className="text-xs text-blue-400 mt-1">
            Score mapping: 
            {criterion.scoreMapping.map((range, idx) => (
              <span key={idx} className="ml-1">
                {range.min}-{range.max}: {range.score}{idx < criterion.scoreMapping!.length - 1 ? "," : ""}
              </span>
            ))}
          </div>
        )}
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
          <div className={`font-medium ${getScoreColor(criterion.score)}`}>
            Score: {criterion.score}
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
            <span>Risk Score</span>
            <span>{criterion.score} / 5</span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6"
              onClick={() => updateCriterionScore(groupIndex, criterionIndex, Math.max(1, criterion.score - 1))}
              disabled={criterion.score <= 1}
            >
              <ChevronDown className="h-3 w-3" />
            </Button>
            <div className="flex-1 flex">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  className={`h-6 flex-1 border-r last:border-r-0 border-gray-800 transition-colors ${
                    criterion.score >= value 
                      ? getScoreBackground(value)
                      : 'bg-gray-800/30'
                  }`}
                  onClick={() => updateCriterionScore(groupIndex, criterionIndex, value)}
                />
              ))}
            </div>
            <Button 
              variant="outline" 
              size="icon"
              className="h-6 w-6"
              onClick={() => updateCriterionScore(groupIndex, criterionIndex, Math.min(5, criterion.score + 1))}
              disabled={criterion.score >= 5}
            >
              <ChevronUp className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {renderActualMetricSlider()}

      <div className="mt-3 pt-3 border-t border-gray-800/30">
        <div className="text-xs font-medium mb-2">Preferred Range {criterion.unit ? `(${criterion.unit})` : ''}</div>
        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center gap-2">
            <span className="text-xs text-muted-foreground">Min:</span>
            <Input
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
              className="h-7 text-xs"
              placeholder={`Min ${criterion.unit || ''}`}
            />
          </div>
          <div className="flex flex-1 items-center gap-2">
            <span className="text-xs text-muted-foreground">Max:</span>
            <Input
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
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
