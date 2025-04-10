
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
}

export const RangeValueSlider = ({
  actualMinValue,
  actualMaxValue,
  actualMin,
  actualMax,
  actualUnit,
  name,
  onRangeUpdate,
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
    }
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
