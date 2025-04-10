
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CriterionWeightControlsProps {
  weight: number;
  onWeightChange: (weight: number) => void;
}

export const CriterionWeightControls = ({
  weight,
  onWeightChange,
}: CriterionWeightControlsProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Criterion Weight</span>
        <span>{weight}%</span>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-6 w-6"
          onClick={() => onWeightChange(Math.max(5, weight - 5))}
          disabled={weight <= 5}
        >
          <ChevronDown className="h-3 w-3" />
        </Button>
        <Slider
          value={[weight]}
          min={5}
          max={70}
          step={5}
          className="flex-1"
          onValueChange={(value) => onWeightChange(value[0])}
        />
        <Button 
          variant="outline" 
          size="icon"
          className="h-6 w-6"
          onClick={() => onWeightChange(Math.min(70, weight + 5))}
          disabled={weight >= 70}
        >
          <ChevronUp className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};
