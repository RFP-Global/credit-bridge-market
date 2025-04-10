
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

interface ValueSliderProps {
  actualValue?: number;
  actualMin?: number;
  actualMax?: number;
  actualUnit?: string;
  name: string;
  getScoreColor: (score: number) => string;
  onValueUpdate: (value: number) => void;
}

export const ValueSlider = ({
  actualValue,
  actualMin,
  actualMax,
  actualUnit,
  name,
  getScoreColor,
  onValueUpdate,
}: ValueSliderProps) => {
  const [inputValue, setInputValue] = useState(actualValue?.toString() || "");
  
  useEffect(() => {
    if (actualValue !== undefined) {
      setInputValue(actualValue.toString());
    }
  }, [actualValue]);

  const handleValueUpdate = () => {
    if (inputValue) {
      const value = parseFloat(inputValue);
      if (!isNaN(value)) {
        onValueUpdate(value);
      }
    }
  };

  const getFormattedValue = (value?: number) => {
    if (value === undefined) return "";
    return actualUnit === "$" || actualUnit === "$M" 
      ? `${actualUnit}${value}` 
      : `${value}${actualUnit || ""}`;
  };

  if (actualMin === undefined || actualMax === undefined) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Actual {name} Value</span>
        <span>{getFormattedValue(actualValue)}</span>
      </div>
      
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
    </div>
  );
};
