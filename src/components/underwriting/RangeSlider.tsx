
import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { ScoreRange } from "./types";

interface RangeSliderProps {
  minValue: number;
  maxValue: number;
  currentValue: [number, number];
  unit?: string;
  scoreMapping?: ScoreRange[];
  onChange: (values: [number, number]) => void;
  getScoreColor: (score: number) => string;
  getScoreBackground: (score: number) => string;
}

export const RangeSlider = ({
  minValue,
  maxValue,
  currentValue,
  unit,
  scoreMapping,
  onChange,
  getScoreColor,
  getScoreBackground,
}: RangeSliderProps) => {
  const formatValue = (value: number) => {
    if (unit === "$" || unit === "$M") {
      return `${unit}${value}`;
    }
    return `${value}${unit || ""}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatValue(minValue)}</span>
        <span>{formatValue(maxValue)}</span>
      </div>
      
      <Slider
        value={currentValue}
        min={minValue}
        max={maxValue}
        step={(maxValue - minValue) / 100}
        className="flex-1"
        onValueChange={(values) => onChange([values[0], values[1]])}
      />
      
      {scoreMapping && (
        <div className="flex mt-4">
          {scoreMapping.map((range, idx) => {
            const width = ((range.max - range.min) / (maxValue - minValue)) * 100;
            return (
              <div 
                key={idx}
                className={`h-2 ${getScoreBackground(range.score)}`}
                style={{ width: `${width}%` }}
                title={`${range.min}-${range.max}: Score ${range.score}`}
              />
            );
          })}
        </div>
      )}
      
      <div className="flex justify-between mt-2">
        <span className="text-sm">Current range: {formatValue(currentValue[0])} - {formatValue(currentValue[1])}</span>
      </div>
    </div>
  );
};
