
import { RangeSlider } from "@/components/ui/range-slider";
import { useState, useEffect } from "react";
import { ScoreRange } from "../types";
import { MetricRangeInputs } from "./MetricRangeInputs";
import { MetricValueInput } from "./MetricValueInput";
import { MetricSingleSlider } from "./MetricSingleSlider";

interface MetricSliderProps {
  actualValue?: number;
  actualMinValue?: number;
  actualMaxValue?: number;
  actualMin?: number;
  actualMax?: number;
  actualUnit?: string;
  name: string;
  scoreMapping?: ScoreRange[];
  getScoreColor: (score: number) => string;
  onValueUpdate: (value: number) => void;
  onRangeUpdate?: (min: number, max: number) => void;
}

export const MetricSlider = ({
  actualValue,
  actualMinValue,
  actualMaxValue,
  actualMin,
  actualMax,
  actualUnit,
  name,
  scoreMapping,
  getScoreColor,
  onValueUpdate,
  onRangeUpdate,
}: MetricSliderProps) => {
  const [inputValue, setInputValue] = useState(actualValue?.toString() || "");
  const [minInputValue, setMinInputValue] = useState(actualMinValue?.toString() || "");
  const [maxInputValue, setMaxInputValue] = useState(actualMaxValue?.toString() || "");
  
  const [rangeValues, setRangeValues] = useState<[number, number]>(
    [actualMinValue || actualValue || (actualMin || 0), 
     actualMaxValue || actualValue || (actualMax || 1)]
  );

  useEffect(() => {
    if (actualValue !== undefined) {
      setInputValue(actualValue.toString());
    }
    if (actualMinValue !== undefined) {
      setMinInputValue(actualMinValue.toString());
    }
    if (actualMaxValue !== undefined) {
      setMaxInputValue(actualMaxValue.toString());
    }
  }, [actualValue, actualMinValue, actualMaxValue]);

  const handleValueUpdate = () => {
    if (inputValue) {
      const value = parseFloat(inputValue);
      if (!isNaN(value)) {
        onValueUpdate(value);
      }
    }
  };

  const handleRangeUpdate = () => {
    if (onRangeUpdate && minInputValue && maxInputValue) {
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
      
      if (onRangeUpdate) {
        onRangeUpdate(values[0], values[1]);
      }
    }
  };

  if (actualMin === undefined || actualMax === undefined) {
    return null;
  }

  const rangeMode = onRangeUpdate !== undefined;

  return (
    <div className="space-y-2 mt-3">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Actual {name} {rangeMode ? "Range" : "Value"}</span>
        {rangeMode ? (
          <span className="flex gap-2">
            <span>{getFormattedValue(rangeValues[0])}</span>
            <span>-</span>
            <span>{getFormattedValue(rangeValues[1])}</span>
          </span>
        ) : (
          <span>{getFormattedValue(actualValue)}</span>
        )}
      </div>
      
      {rangeMode ? (
        <div>
          <RangeSlider
            value={rangeValues}
            min={actualMin}
            max={actualMax}
            step={(actualMax - actualMin) / 100}
            className="my-4"
            onValueChange={handleRangeSliderChange}
          />
          <MetricRangeInputs 
            minInputValue={minInputValue}
            maxInputValue={maxInputValue}
            actualUnit={actualUnit}
            onMinChange={setMinInputValue}
            onMaxChange={setMaxInputValue}
            onRangeUpdate={handleRangeUpdate}
          />
        </div>
      ) : (
        <>
          <MetricSingleSlider 
            actualValue={actualValue || 0}
            actualMin={actualMin}
            actualMax={actualMax}
            onValueUpdate={onValueUpdate}
          />
          
          <MetricValueInput 
            inputValue={inputValue}
            actualUnit={actualUnit}
            onValueChange={setInputValue}
            onValueUpdate={handleValueUpdate}
          />
        </>
      )}
      
      <div className="text-xs text-muted-foreground mt-2">
        <span>Range: {actualMin} - {actualMax} {actualUnit || ''}</span>
      </div>
    </div>
  );
};
