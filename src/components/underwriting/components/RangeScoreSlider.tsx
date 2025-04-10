
import { useState, useEffect } from "react";
import { RangeSlider } from "@/components/ui/range-slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScoreRange } from "../types";

interface RangeScoreSliderProps {
  minValue: number;
  maxValue: number;
  initialMin: number;
  initialMax: number;
  step?: number;
  onRangeChange: (min: number, max: number) => void;
  scoreMapping?: ScoreRange[];
}

export const RangeScoreSlider = ({
  minValue,
  maxValue,
  initialMin,
  initialMax,
  step = 0.1,
  onRangeChange,
  scoreMapping
}: RangeScoreSliderProps) => {
  const [range, setRange] = useState<[number, number]>([initialMin, initialMax]);
  const [minInput, setMinInput] = useState(initialMin.toString());
  const [maxInput, setMaxInput] = useState(initialMax.toString());

  useEffect(() => {
    setMinInput(range[0].toFixed(1));
    setMaxInput(range[1].toFixed(1));
  }, [range]);

  // Update range if initialMin or initialMax change from parent
  useEffect(() => {
    if (initialMin !== range[0] || initialMax !== range[1]) {
      setRange([initialMin, initialMax]);
    }
  }, [initialMin, initialMax]);

  const handleSliderChange = (value: number[]) => {
    if (value.length === 2) {
      const newRange: [number, number] = [value[0], value[1]];
      setRange(newRange);
      onRangeChange(newRange[0], newRange[1]);
    }
  };

  const handleManualChange = () => {
    const min = parseFloat(minInput);
    const max = parseFloat(maxInput);
    
    if (!isNaN(min) && !isNaN(max) && min <= max && min >= minValue && max <= maxValue) {
      const newRange: [number, number] = [min, max];
      setRange(newRange);
      onRangeChange(min, max);
    }
  };

  // Get description for the score if mapping exists
  const getRiskLevel = (score: number): string => {
    if (!scoreMapping) return "";
    
    const mapping = scoreMapping.find(range => 
      score >= range.score - 0.5 && score < range.score + 0.5
    );
    
    return mapping?.description || "";
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Risk Score Range</span>
        <span className="flex gap-2">
          <span className="text-gray-700">{range[0].toFixed(1)}</span>
          <span>-</span>
          <span className="text-gray-700">{range[1].toFixed(1)}</span>
        </span>
      </div>
      
      <RangeSlider
        value={range}
        min={minValue}
        max={maxValue}
        step={step}
        onValueChange={handleSliderChange}
        className="my-4"
      />
      
      <div className="flex items-center gap-2">
        <Input
          value={minInput}
          onChange={(e) => setMinInput(e.target.value)}
          className="h-8 text-xs"
          type="number"
          min={minValue}
          max={range[1]}
          step={step}
        />
        <span className="text-xs text-muted-foreground">to</span>
        <Input
          value={maxInput}
          onChange={(e) => setMaxInput(e.target.value)}
          className="h-8 text-xs"
          type="number"
          min={range[0]}
          max={maxValue}
          step={step}
        />
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs"
          onClick={handleManualChange}
        >
          Apply
        </Button>
      </div>
      
      {scoreMapping && (
        <div className="mt-1 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-700">{getRiskLevel(range[0])}</span>
            <span className="text-gray-700">{getRiskLevel(range[1])}</span>
          </div>
        </div>
      )}
    </div>
  );
};

