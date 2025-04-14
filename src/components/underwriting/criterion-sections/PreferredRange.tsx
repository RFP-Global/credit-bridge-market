
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface PreferredRangeProps {
  criterion: {
    unit?: string;
    min: number;
    max: number;
    preferredMin?: number;
    preferredMax?: number;
  };
  rangeValues: number[];
  minValue: string;
  maxValue: string;
  onRangeSliderChange: (values: number[]) => void;
  onMinValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateRange: () => void;
}

export const PreferredRange: React.FC<PreferredRangeProps> = ({
  criterion,
  rangeValues,
  minValue,
  maxValue,
  onRangeSliderChange,
  onMinValueChange,
  onMaxValueChange,
  onUpdateRange,
}) => {
  return (
    <div className="mt-3 pt-3 border-t border-gray-800/30">
      <div className="text-xs font-medium mb-2">
        Preferred Range {criterion.unit ? `(${criterion.unit})` : ''}
      </div>
      
      <div className="mb-3">
        <Slider
          value={rangeValues}
          min={criterion.min || 0}
          max={criterion.max || 100}
          step={(criterion.max - criterion.min) / 100}
          className="my-4"
          onValueChange={onRangeSliderChange}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{criterion.min}{criterion.unit || ''}</span>
          <span>{criterion.max}{criterion.unit || ''}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2">
          <span className="text-xs text-muted-foreground">Min:</span>
          <Input
            value={minValue}
            onChange={onMinValueChange}
            className="h-7 text-xs"
            placeholder={`Min ${criterion.unit || ''}`}
          />
        </div>
        <div className="flex flex-1 items-center gap-2">
          <span className="text-xs text-muted-foreground">Max:</span>
          <Input
            value={maxValue}
            onChange={onMaxValueChange}
            className="h-7 text-xs"
            placeholder={`Max ${criterion.unit || ''}`}
          />
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-7 text-xs"
          onClick={onUpdateRange}
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
  );
};
