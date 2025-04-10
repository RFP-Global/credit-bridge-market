
import React, { useState, useEffect } from "react";
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
import { Criterion, ScoreRange } from "./types";
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

// Add Debt/EBITDA specific mapping
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

  // Add state to track the most recent slider that was updated
  const [lastUpdated, setLastUpdated] = useState<'metric' | 'score' | null>(null);

  // Determine if this is a Debt/EBITDA criterion
  const isDebtEBITDA = criterion.name.toLowerCase().includes('debt/ebitda') || 
                      (criterion.name.toLowerCase().includes('debt') && 
                       criterion.name.toLowerCase().includes('ebitda'));

  // Apply custom score mapping based on criterion type
  const scoreMapping = isDebtEBITDA 
    ? debtEBITDAScoreMapping 
    : criterion.scoreMapping;

  // Determine if criterion requires inverse relationship (higher value = lower score)
  const shouldInvert = criterion.name.toLowerCase().includes('debt') || 
                       criterion.name.toLowerCase().includes('risk');

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

  // Find appropriate score from a metric value using scoreMapping
  const getScoreFromMetricValue = (value: number): number => {
    if (scoreMapping) {
      const matchingRange = scoreMapping.find(range => 
        (value >= (range.min || 0) && value <= (range.max || 100)) ||
        (range.min === null && value <= (range.max || 100)) ||
        (range.max === null && value >= (range.min || 0))
      );
      
      if (matchingRange) {
        return matchingRange.score;
      }
    }
    
    // Fallback calculation if no match found in score mapping
    return calculateScoreFromMetricSingle(value);
  };

  // Find appropriate metric value from a score using scoreMapping
  const getMetricValueFromScore = (score: number): number | null => {
    if (scoreMapping) {
      const matchingRange = scoreMapping.find(range => 
        score >= range.score - 0.5 && score < range.score + 0.5
      );
      
      if (matchingRange) {
        // Use the midpoint of the range as the representative value
        const min = matchingRange.min !== null ? matchingRange.min : (criterion.actualMin || 0);
        const max = matchingRange.max !== null ? matchingRange.max : (criterion.actualMax || 0);
        return (min + max) / 2;
      }
    }
    
    // Fallback calculation if no match found in score mapping
    return calculateMetricFromScoreSingle(score);
  };

  // Calculate score from metric value
  const calculateScoreFromMetricSingle = (value: number): number => {
    if (criterion.actualMin === undefined || criterion.actualMax === undefined) {
      return criterion.score;
    }
    
    if (shouldInvert) {
      // For metrics where lower is better (e.g., debt ratios)
      // High metric value = low score, Low metric value = high score
      const normalizedValue = (criterion.actualMax - value) / (criterion.actualMax - criterion.actualMin);
      return Math.max(1, Math.min(10, 1 + normalizedValue * 9));
    } else {
      // For metrics where higher is better
      // High metric value = high score, Low metric value = low score
      const normalizedValue = (value - criterion.actualMin) / (criterion.actualMax - criterion.actualMin);
      return Math.max(1, Math.min(10, 1 + normalizedValue * 9));
    }
  };

  // Calculate metric value from score
  const calculateMetricFromScoreSingle = (score: number): number => {
    if (criterion.actualMin === undefined || criterion.actualMax === undefined) {
      return criterion.actualValue || 0;
    }
    
    const range = criterion.actualMax - criterion.actualMin;
    const normalizedScore = (score - 1) / 9; // Convert score 1-10 to percentage
    
    if (shouldInvert) {
      // For metrics where lower is better
      // High score = low metric value, Low score = high metric value
      return criterion.actualMax - (normalizedScore * range);
    } else {
      // For metrics where higher is better
      // High score = high metric value, Low score = low metric value
      return criterion.actualMin + (normalizedScore * range);
    }
  };

  // Calculate score range from metric range
  const calculateScoreFromMetricRange = (minValue: number, maxValue: number) => {
    // If we have a scoreMapping, use that for direct mapping
    if (scoreMapping) {
      const minScore = getScoreFromMetricValue(minValue);
      const maxScore = getScoreFromMetricValue(maxValue);
      return { minScore, maxScore };
    }
    
    if (criterion.actualMin !== undefined && criterion.actualMax !== undefined) {
      if (shouldInvert) {
        // For metrics where lower is better (e.g., debt ratios)
        // High metric value = low score, Low metric value = high score
        const maxScore = 10;
        const minScore = 1;
        // Calculate percentage between min and max
        const minPercent = (criterion.actualMax - minValue) / (criterion.actualMax - criterion.actualMin);
        const maxPercent = (criterion.actualMax - maxValue) / (criterion.actualMax - criterion.actualMin);
        
        return {
          minScore: minScore + (maxScore - minScore) * maxPercent,
          maxScore: minScore + (maxScore - minScore) * minPercent
        };
      } else {
        // For metrics where higher is better
        // High metric value = high score, Low metric value = low score
        const maxScore = 10;
        const minScore = 1;
        // Calculate percentage between min and max
        const minPercent = (minValue - criterion.actualMin) / (criterion.actualMax - criterion.actualMin);
        const maxPercent = (maxValue - criterion.actualMin) / (criterion.actualMax - criterion.actualMin);
        
        return {
          minScore: minScore + (maxScore - minScore) * minPercent,
          maxScore: minScore + (maxScore - minScore) * maxPercent
        };
      }
    }
    
    return { minScore: 1, maxScore: 10 };
  };

  // Calculate metric range from score range
  const calculateMetricFromScoreRange = (minScore: number, maxScore: number) => {
    // If we have a scoreMapping, use that for direct mapping
    if (scoreMapping) {
      const minValue = getMetricValueFromScore(minScore);
      const maxValue = getMetricValueFromScore(maxScore);
      
      if (minValue !== null && maxValue !== null) {
        return { minValue, maxValue };
      }
    }
    
    if (criterion.actualMin !== undefined && criterion.actualMax !== undefined) {
      if (shouldInvert) {
        // For metrics where lower is better
        // High score = low metric value, Low score = high metric value
        const range = criterion.actualMax - criterion.actualMin;
        const minPercent = (10 - minScore) / 9; // Convert score 1-10 to percentage
        const maxPercent = (10 - maxScore) / 9;
        
        return {
          maxValue: criterion.actualMax - (range * minPercent),
          minValue: criterion.actualMax - (range * maxPercent)
        };
      } else {
        // For metrics where higher is better
        // High score = high metric value, Low score = low metric value
        const range = criterion.actualMax - criterion.actualMin;
        const minPercent = (minScore - 1) / 9; // Convert score 1-10 to percentage
        const maxPercent = (maxScore - 1) / 9;
        
        return {
          minValue: criterion.actualMin + (range * minPercent),
          maxValue: criterion.actualMin + (range * maxPercent)
        };
      }
    }
    
    return { minValue: 0, maxValue: 0 };
  };

  // Handle updates from risk score slider
  const handleScoreRangeChange = (minScore: number, maxScore: number) => {
    setLastUpdated('score');
    
    // Update risk score display
    const averageScore = (minScore + maxScore) / 2;
    updateCriterionScore(groupIndex, criterionIndex, averageScore);
    
    // Only update metric values if we have actual min and max defined
    if (criterion.actualMin !== undefined && criterion.actualMax !== undefined && updateActualMetricRange) {
      const metricValues = calculateMetricFromScoreRange(minScore, maxScore);
      if (metricValues) {
        // Round to 2 decimal places for better UX
        const minValue = parseFloat(metricValues.minValue.toFixed(2));
        const maxValue = parseFloat(metricValues.maxValue.toFixed(2));
        updateActualMetricRange(groupIndex, criterionIndex, minValue, maxValue);
      }
    }
  };

  // Handle updates from metric slider
  const handleMetricRangeChange = (minValue: number, maxValue: number) => {
    setLastUpdated('metric');
    
    // Update the actual metric values
    if (updateActualMetricRange) {
      updateActualMetricRange(groupIndex, criterionIndex, minValue, maxValue);
    }
    
    // Calculate and update the corresponding score
    const scores = calculateScoreFromMetricRange(minValue, maxValue);
    if (scores) {
      // Use the average score for display
      const averageScore = (scores.minScore + scores.maxScore) / 2;
      updateCriterionScore(groupIndex, criterionIndex, parseFloat(averageScore.toFixed(1)));
    }
  };

  // Determine if this criterion should use a dual slider
  // All non-weight metrics will use dual slider
  const shouldUseDualSlider = criterion.actualMin !== undefined && criterion.actualMax !== undefined;

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
          {scoreMapping && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent side="left" className="w-auto max-w-[300px] p-3 bg-gray-950 border border-gray-800">
                <div className="text-xs font-semibold mb-2 text-gray-300">Score Mapping for {criterion.name}</div>
                <ScoreMappingTable 
                  scoreMapping={scoreMapping}
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
              onRangeChange={handleScoreRangeChange}
              getScoreColor={getScoreColor}
              scoreMapping={scoreMapping}
              inverseRelationship={shouldInvert}
            />
          )}
        </div>
      </div>

      <CriterionScore
        score={criterion.score}
        getScoreColor={getScoreColor}
        getScoreBackground={getScoreBackground}
        onScoreUpdate={(newScore) => updateCriterionScore(groupIndex, criterionIndex, newScore)}
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
          getScoreColor={getScoreColor}
          onValueUpdate={(value) => {
            if (updateActualMetricValue) {
              updateActualMetricValue(groupIndex, criterionIndex, value);
            }
          }}
          onRangeUpdate={updateActualMetricRange ? 
            (min, max) => handleMetricRangeChange(min, max) : 
            undefined}
          isDualSlider={shouldUseDualSlider}
          inverseRelationship={shouldInvert}
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
