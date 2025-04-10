
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
  onValueUpdate: (value: number) => void;
  onRangeUpdate?: (min: number, max: number) => void;
  isDualSlider?: boolean;
  inverseRelationship?: boolean;
  isDebtEBITDA?: boolean;
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
  onValueUpdate,
  onRangeUpdate,
  isDualSlider = false,
  inverseRelationship = false,
  isDebtEBITDA = false
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
      if (rangeValues[0] !== actualMinValue) {
        setRangeValues(prev => [actualMinValue, prev[1]]);
      }
    }
    if (actualMaxValue !== undefined) {
      setMaxInputValue(actualMaxValue.toString());
      if (rangeValues[1] !== actualMaxValue) {
        setRangeValues(prev => [prev[0], actualMaxValue]);
      }
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
      : name.toLowerCase().includes('ratio') || name.toLowerCase().includes('debt/ebitda')
        ? `${value}${actualUnit === 'x' ? actualUnit : actualUnit || ''}`
        : `${value}${actualUnit || ""}`;
  };

  const getRiskLevel = (value: number): string => {
    if (!scoreMapping) return "";
    
    const mapping = scoreMapping.find(range => 
      (value >= (range.min || 0) && value <= (range.max || Infinity)) ||
      (range.min === null && value <= (range.max || Infinity)) ||
      (range.max === null && value >= (range.min || 0))
    );
    
    return mapping?.description || "";
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

  const rangeMode = onRangeUpdate !== undefined || isDualSlider;

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
            className={`my-4 ${isDebtEBITDA ? "bg-blue-950/30" : ""}`}
            onValueChange={handleRangeSliderChange}
            colorClass={isDebtEBITDA ? "bg-blue-600" : undefined}
          />
          <MetricRangeInputs 
            minInputValue={minInputValue}
            maxInputValue={maxInputValue}
            actualUnit={actualUnit}
            onMinChange={setMinInputValue}
            onMaxChange={setMaxInputValue}
            onRangeUpdate={handleRangeUpdate}
          />
          
          {scoreMapping && (
            <div className="mt-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-700">
                  {getRiskLevel(rangeValues[0])}
                </span>
                <span className="text-gray-700">
                  {getRiskLevel(rangeValues[1])}
                </span>
              </div>
            </div>
          )}
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
