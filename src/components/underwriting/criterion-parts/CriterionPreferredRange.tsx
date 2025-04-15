
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Criterion } from "../types";

interface CriterionPreferredRangeProps {
  criterion: Criterion;
  minValue: string;
  maxValue: string;
  rangeValues: number[];
  onMinValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRangeUpdate: () => void;
  onSliderChange: (values: number[]) => void;
}

export const CriterionPreferredRange: React.FC<CriterionPreferredRangeProps> = ({
  criterion,
  minValue,
  maxValue,
  rangeValues,
  onMinValueChange,
  onMaxValueChange,
  onRangeUpdate,
  onSliderChange,
}) => {
  return (
    <div className="mt-3 pt-3 border-t border-gray-800/30">
      <div className="flex justify-between items-center mb-2">
        <div className="text-xs font-medium">Preferred Range {criterion.unit ? `(${criterion.unit})` : ''}</div>
        {criterion.preferredMin !== undefined && criterion.preferredMax !== undefined && (
          <div className="text-xs text-blue-400">
            Current: {criterion.preferredMin} - {criterion.preferredMax} {criterion.unit || ''}
          </div>
        )}
      </div>
      <div className="mb-3">
        <Slider
          value={rangeValues}
          min={criterion.min || 0}
          max={criterion.max || 100}
          step={(criterion.max - criterion.min) / 100}
          className="my-4"
          onValueChange={onSliderChange}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{criterion.min}{criterion.unit || ''}</span>
          <span>{criterion.max}{criterion.unit || ''}</span>
        </div>
      </div>
      <div className="grid grid-cols-9 gap-2 items-center">
        <span className="text-xs text-muted-foreground col-span-1">Min:</span>
        <Input
          value={minValue}
          onChange={onMinValueChange}
          className="h-7 text-xs col-span-3"
          placeholder={`Min ${criterion.unit || ''}`}
        />
        <span className="text-xs text-muted-foreground col-span-1">Max:</span>
        <Input
          value={maxValue}
          onChange={onMaxValueChange}
          className="h-7 text-xs col-span-3"
          placeholder={`Max ${criterion.unit || ''}`}
        />
        <Button 
          variant="outline" 
          size="sm" 
          className="h-7 text-xs whitespace-nowrap col-span-1"
          onClick={onRangeUpdate}
        >
          Set
        </Button>
      </div>
    </div>
  );
};
