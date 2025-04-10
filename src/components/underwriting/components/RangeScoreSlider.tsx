
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
  isDebtEBITDA?: boolean;
}

export const RangeScoreSlider = ({
  minValue,
  maxValue,
  initialMin,
  initialMax,
  step = 0.1,
  onRangeChange,
  scoreMapping,
  isDebtEBITDA = false
}: RangeScoreSliderProps) => {
  const [range, setRange] = useState<[number, number]>([initialMin, initialMax]);
  const [minInput, setMinInput] = useState(initialMin.toFixed(1));
  const [maxInput, setMaxInput] = useState(initialMax.toFixed(1));
  const [isSliderChanging, setIsSliderChanging] = useState(false);
  
  // Update inputs on range change
  useEffect(() => {
    if (!isSliderChanging) {
      setMinInput(range[0].toFixed(1));
      setMaxInput(range[1].toFixed(1));
    }
  }, [range, isSliderChanging]);

  // Update range if initialMin or initialMax change from parent
  useEffect(() => {
    if (initialMin !== range[0] || initialMax !== range[1]) {
      setRange([initialMin, initialMax]);
      setMinInput(initialMin.toFixed(1));
      setMaxInput(initialMax.toFixed(1));
    }
  }, [initialMin, initialMax]);

  const handleSliderChange = (value: number[]) => {
    if (value.length === 2) {
      const minValue = parseFloat(value[0].toFixed(1));
      const maxValue = parseFloat(value[1].toFixed(1));
      
      // Ensure min doesn't exceed max
      if (minValue <= maxValue) {
        const newRange: [number, number] = [minValue, maxValue];
        setRange(newRange);
        onRangeChange(newRange[0], newRange[1]);
      }
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

  const handleSliderChangeStart = () => {
    setIsSliderChanging(true);
  };

  const handleSliderChangeEnd = () => {
    setIsSliderChanging(false);
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
        onValueCommit={handleSliderChangeEnd}
        className={`my-4 ${isDebtEBITDA ? "bg-blue-950/30" : ""}`}
        colorClass={isDebtEBITDA ? "bg-blue-600" : undefined}
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
