
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RangeSlider } from "@/components/ui/range-slider";
import { useState, useEffect } from "react";

interface RangeValueSliderProps {
  actualMinValue?: number;
  actualMaxValue?: number;
  actualMin?: number;
  actualMax?: number;
  actualUnit?: string;
  name: string;
  onRangeUpdate: (min: number, max: number) => void;
  onRiskScoreRangeUpdate?: (min: number, max: number) => void;
  isEbitda?: boolean;
}

export const RangeValueSlider = ({
  actualMinValue,
  actualMaxValue,
  actualMin,
  actualMax,
  actualUnit,
  name,
  onRangeUpdate,
  onRiskScoreRangeUpdate,
  isEbitda = false,
}: RangeValueSliderProps) => {
  const [minInputValue, setMinInputValue] = useState(actualMinValue?.toString() || "");
  const [maxInputValue, setMaxInputValue] = useState(actualMaxValue?.toString() || "");
  
  const [rangeValues, setRangeValues] = useState<[number, number]>([
    actualMinValue || (actualMin || 0), 
    actualMaxValue || (actualMax || 1)
  ]);

  useEffect(() => {
    if (actualMinValue !== undefined) {
      setMinInputValue(actualMinValue.toString());
    }
    if (actualMaxValue !== undefined) {
      setMaxInputValue(actualMaxValue.toString());
    }
  }, [actualMinValue, actualMaxValue]);

  const handleRangeUpdate = () => {
    if (minInputValue && maxInputValue) {
      const min = parseFloat(minInputValue);
      const max = parseFloat(maxInputValue);
      if (!isNaN(min) && !isNaN(max) && min <= max) {
        onRangeUpdate(min, max);
        
        // If this is EBITDA and we have a risk score update handler, update risk scores in tandem
        if (isEbitda && onRiskScoreRangeUpdate) {
          // Map EBITDA range to risk score range (1-10)
          const minScore = mapEbitdaToRiskScore(min, actualMin || 0, actualMax || 1);
          const maxScore = mapEbitdaToRiskScore(max, actualMin || 0, actualMax || 1);
          onRiskScoreRangeUpdate(minScore, maxScore);
        }
      }
    }
  };

  const getFormattedValue = (value?: number) => {
    if (value === undefined) return "";
    return actualUnit === "$" || actualUnit === "$M" 
      ? `${actualUnit}${value}` 
      : `${value}${actualUnit || ""}`;
  };

  const handleRangeSliderChange = (values: number[]) => {
    if (values.length === 2) {
      setRangeValues([values[0], values[1]]);
      setMinInputValue(values[0].toFixed(2));
      setMaxInputValue(values[1].toFixed(2));
      onRangeUpdate(values[0], values[1]);
      
      // If this is EBITDA and we have a risk score update handler, update risk scores in tandem
      if (isEbitda && onRiskScoreRangeUpdate) {
        // Map EBITDA range to risk score range (1-10)
        const minScore = mapEbitdaToRiskScore(values[0], actualMin || 0, actualMax || 1);
        const maxScore = mapEbitdaToRiskScore(values[1], actualMin || 0, actualMax || 1);
        onRiskScoreRangeUpdate(minScore, maxScore);
      }
    }
  };

  // Helper function to map EBITDA values to risk scores (1-10)
  const mapEbitdaToRiskScore = (ebitdaValue: number, minEbitda: number, maxEbitda: number): number => {
    // Calculate percentage of the range
    const percentage = (ebitdaValue - minEbitda) / (maxEbitda - minEbitda);
    // Map to risk score range (1-10)
    const riskScore = 1 + (percentage * 9);
    // Round to 1 decimal place
    return Math.round(riskScore * 10) / 10;
  };

  if (actualMin === undefined || actualMax === undefined) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Actual {name} Range</span>
        <span>
          {getFormattedValue(rangeValues[0])} - {getFormattedValue(rangeValues[1])}
        </span>
      </div>
      
      <RangeSlider
        value={rangeValues}
        min={actualMin}
        max={actualMax}
        step={(actualMax - actualMin) / 100}
        className="my-4"
        onValueChange={handleRangeSliderChange}
      />
      
      <div className="flex items-center gap-3 mt-2">
        <div className="flex flex-1 items-center gap-2">
          <span className="text-xs text-muted-foreground">Min:</span>
          <Input
            value={minInputValue}
            onChange={(e) => setMinInputValue(e.target.value)}
            className="h-7 text-xs"
            placeholder={`Min ${actualUnit || ''}`}
          />
        </div>
        <div className="flex flex-1 items-center gap-2">
          <span className="text-xs text-muted-foreground">Max:</span>
          <Input
            value={maxInputValue}
            onChange={(e) => setMaxInputValue(e.target.value)}
            className="h-7 text-xs"
            placeholder={`Max ${actualUnit || ''}`}
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
    </div>
  );
};
