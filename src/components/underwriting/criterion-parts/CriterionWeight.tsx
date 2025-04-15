
import React from 'react';
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface CriterionWeightProps {
  weight: number;
  groupIndex: number;
  criterionIndex: number;
  updateCriterionWeight: (groupIndex: number, criterionIndex: number, newWeight: number) => void;
}

export const CriterionWeight: React.FC<CriterionWeightProps> = ({
  weight,
  groupIndex,
  criterionIndex,
  updateCriterionWeight,
}) => {
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
          onClick={() => updateCriterionWeight(groupIndex, criterionIndex, Math.max(5, weight - 5))}
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
          onValueChange={(value) => updateCriterionWeight(groupIndex, criterionIndex, value[0])}
        />
        <Button 
          variant="outline" 
          size="icon"
          className="h-6 w-6"
          onClick={() => updateCriterionWeight(groupIndex, criterionIndex, Math.min(70, weight + 5))}
          disabled={weight >= 70}
        >
          <ChevronUp className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};
