
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RangeSlider } from "@/components/ui/range-slider";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { ScoreRange } from "../types";

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
      ) : (
        <>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6"
              onClick={() => {
                if (actualMin !== undefined) {
                  const step = actualMax && actualMin 
                    ? (actualMax - actualMin) / 20 
                    : 0.1;
                  const newValue = Math.max(actualMin, (actualValue || 0) - step);
                  onValueUpdate(parseFloat(newValue.toFixed(2)));
                }
              }}
            >
              <ChevronDown className="h-3 w-3" />
            </Button>
            <Slider
              value={[actualValue || 0]}
              min={actualMin}
              max={actualMax}
              step={(actualMax - actualMin) / 100}
              className="flex-1"
              onValueChange={(value) => {
                onValueUpdate(parseFloat(value[0].toFixed(2)));
              }}
            />
            <Button 
              variant="outline" 
              size="icon"
              className="h-6 w-6"
              onClick={() => {
                if (actualMax !== undefined) {
                  const step = actualMax && actualMin 
                    ? (actualMax - actualMin) / 20 
                    : 0.1;
                  const newValue = Math.min(actualMax, (actualValue || 0) + step);
                  onValueUpdate(parseFloat(newValue.toFixed(2)));
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
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="h-7 text-xs"
                placeholder={`Value ${actualUnit || ''}`}
              />
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs"
              onClick={handleValueUpdate}
            >
              Set Value
            </Button>
          </div>
        </>
      )}
      
      <div className="text-xs text-muted-foreground mt-2">
        <span>Range: {actualMin} - {actualMax} {actualUnit || ''}</span>
      </div>
    </div>
  );
};
