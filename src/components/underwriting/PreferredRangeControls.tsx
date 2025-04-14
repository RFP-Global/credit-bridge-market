
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface PreferredRangeControlsProps {
  minValue: string;
  maxValue: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  onSliderChange: (values: number[]) => void;
  onUpdateRange: () => void;
  sliderValue: number[];
  min: number;
  max: number;
}

const PreferredRangeControls: React.FC<PreferredRangeControlsProps> = ({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  onSliderChange,
  onUpdateRange,
  sliderValue,
  min,
  max
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Preferred Range</span>
        <span>{minValue}-{maxValue}</span>
      </div>
      <Slider
        value={sliderValue}
        min={min}
        max={max}
        step={0.1}
        className="my-4"
        onValueChange={onSliderChange}
      />
      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2">
          <span className="text-xs text-muted-foreground">Min:</span>
          <Input
            value={minValue}
            onChange={(e) => onMinChange(e.target.value)}
            className="h-7 text-xs"
            placeholder="Min value"
          />
        </div>
        <div className="flex flex-1 items-center gap-2">
          <span className="text-xs text-muted-foreground">Max:</span>
          <Input
            value={maxValue}
            onChange={(e) => onMaxChange(e.target.value)}
            className="h-7 text-xs"
            placeholder="Max value"
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
    </div>
  );
};

export default PreferredRangeControls;
