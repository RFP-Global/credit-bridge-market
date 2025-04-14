
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface PreferredRangeProps {
  min: number;
  max: number;
  step: number;
  unit?: string;
  preferredMin?: number;
  preferredMax?: number;
  rangeValues: number[];
  onRangeUpdate: (min: string, max: string) => void;
  onRangeSliderUpdate: (values: number[]) => void;
  minValue: string;
  maxValue: string;
  onMinValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PreferredRange: React.FC<PreferredRangeProps> = ({
  min,
  max,
  step,
  unit,
  preferredMin,
  preferredMax,
  rangeValues,
  onRangeUpdate,
  onRangeSliderUpdate,
  minValue,
  maxValue,
  onMinValueChange,
  onMaxValueChange,
}) => {
  return (
    <div className="mt-3 pt-3 border-t border-gray-800/30">
      <div className="text-xs font-medium mb-2">Preferred Range {unit ? `(${unit})` : ''}</div>
      
      <div className="mb-3">
        <Slider
          value={rangeValues}
          min={min}
          max={max}
          step={step}
          className="my-4"
          onValueChange={onRangeSliderUpdate}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{min}{unit || ''}</span>
          <span>{max}{unit || ''}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2">
          <span className="text-xs text-muted-foreground">Min:</span>
          <Input
            value={minValue}
            onChange={onMinValueChange}
            className="h-7 text-xs"
            placeholder={`Min ${unit || ''}`}
          />
        </div>
        <div className="flex flex-1 items-center gap-2">
          <span className="text-xs text-muted-foreground">Max:</span>
          <Input
            value={maxValue}
            onChange={onMaxValueChange}
            className="h-7 text-xs"
            placeholder={`Max ${unit || ''}`}
          />
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-7 text-xs"
          onClick={() => onRangeUpdate(minValue, maxValue)}
        >
          Set Range
        </Button>
      </div>
      {preferredMin !== undefined && preferredMax !== undefined && (
        <div className="mt-2 text-xs text-blue-400">
          Current preferred range: {preferredMin} - {preferredMax} {unit || ''}
        </div>
      )}
    </div>
  );
};
