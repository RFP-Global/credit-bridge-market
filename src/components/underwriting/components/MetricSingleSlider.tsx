
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MetricSingleSliderProps {
  actualValue: number;
  actualMin: number;
  actualMax: number;
  onValueUpdate: (value: number) => void;
}

export const MetricSingleSlider = ({
  actualValue,
  actualMin,
  actualMax,
  onValueUpdate
}: MetricSingleSliderProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="icon" 
        className="h-6 w-6"
        onClick={() => {
          const step = actualMax && actualMin 
            ? (actualMax - actualMin) / 20 
            : 0.1;
          const newValue = Math.max(actualMin, actualValue - step);
          onValueUpdate(parseFloat(newValue.toFixed(2)));
        }}
      >
        <ChevronDown className="h-3 w-3" />
      </Button>
      <Slider
        value={[actualValue]}
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
          const step = actualMax && actualMin 
            ? (actualMax - actualMin) / 20 
            : 0.1;
          const newValue = Math.min(actualMax, actualValue + step);
          onValueUpdate(parseFloat(newValue.toFixed(2)));
        }}
      >
        <ChevronUp className="h-3 w-3" />
      </Button>
    </div>
  );
};
