
import React, { useState } from "react";
import { Info, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
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
import { Criterion } from "./types";
import { ScoreMappingTable } from "./components/ScoreMappingTable";
import { MetricSlider } from "./components/MetricSlider";
import { CriterionScore } from "./components/CriterionScore";
import { RangeScoreSlider } from "./components/RangeScoreSlider";

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
  const [minValue, setMinValue] = useState(criterion.preferredMin?.toString() || "");
  const [maxValue, setMaxValue] = useState(criterion.preferredMax?.toString() || "");
  const [minScore, setMinScore] = useState(criterion.minScore?.toString() || criterion.score.toString());
  const [maxScore, setMaxScore] = useState(criterion.maxScore?.toString() || criterion.score.toString());
  
  // Check if this is the EBITDA criterion in the Financial Strength section (group index 0, criterion index 0)
  const isEbitdaCriterion = groupIndex === 0 && criterionIndex === 0 && criterion.name === "EBITDA";

  const handleRangeUpdate = () => {
    if (updateCriterionRange && minValue && maxValue) {
      const min = parseFloat(minValue);
      const max = parseFloat(maxValue);
      if (!isNaN(min) && !isNaN(max) && min <= max) {
        updateCriterionRange(groupIndex, criterionIndex, min, max);
      }
    }
  };

  const handleScoreRangeUpdate = () => {
    if (updateCriterionScore) {
      const min = parseFloat(minScore);
      const max = parseFloat(maxScore);
      if (!isNaN(min) && !isNaN(max) && min <= max && min >= 1 && max <= 10) {
        // For now, using the average as the displayed score
        const averageScore = (min + max) / 2;
        updateCriterionScore(groupIndex, criterionIndex, averageScore);
        // In a real implementation, we'd store both min and max separately
      }
    }
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
                <ScoreMappingTable 
                  scoreMapping={criterion.scoreMapping}
                  getScoreColor={getScoreColor}
                  actualUnit={criterion.actualUnit}
                />
              </PopoverContent>
            </Popover>
          )}
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
          {updateCriterionRange && (
            <RangeScoreSlider
              minValue={1}
              maxValue={10}
              initialMin={criterion.minScore || criterion.score}
              initialMax={criterion.maxScore || criterion.score}
              step={0.1}
              onRangeChange={(min, max) => {
                if (updateCriterionRange) {
                  updateCriterionRange(groupIndex, criterionIndex, min, max);
                }
                // Update score to average of min and max
                const averageScore = (min + max) / 2;
                updateCriterionScore(groupIndex, criterionIndex, averageScore);
              }}
              getScoreColor={getScoreColor}
            />
          )}
        </div>
      </div>

      {/* Skip rendering the CriterionScore for EBITDA criterion only */}
      {!isEbitdaCriterion && (
        <CriterionScore
          score={criterion.score}
          getScoreColor={getScoreColor}
          getScoreBackground={getScoreBackground}
          onScoreUpdate={(newScore) => updateCriterionScore(groupIndex, criterionIndex, newScore)}
        />
      )}

      {(updateActualMetricValue || updateActualMetricRange) && (
        <MetricSlider
          actualValue={criterion.actualValue}
          actualMinValue={criterion.actualMinValue}
          actualMaxValue={criterion.actualMaxValue}
          actualMin={criterion.actualMin}
          actualMax={criterion.actualMax}
          actualUnit={criterion.actualUnit}
          name={criterion.name}
          scoreMapping={criterion.scoreMapping}
          getScoreColor={getScoreColor}
          onValueUpdate={(value) => {
            if (updateActualMetricValue) {
              updateActualMetricValue(groupIndex, criterionIndex, value);
            }
          }}
          onRangeUpdate={updateActualMetricRange ? 
            (min, max) => updateActualMetricRange(groupIndex, criterionIndex, min, max) : 
            undefined}
        />
      )}

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

