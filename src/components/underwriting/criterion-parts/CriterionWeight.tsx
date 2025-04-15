
import React from 'react';
import { Input } from "@/components/ui/input";

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
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      updateCriterionWeight(groupIndex, criterionIndex, value);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Weight</span>
        <span>{weight}%</span>
      </div>
      <div className="flex items-center">
        <Input
          type="number"
          value={weight}
          onChange={handleWeightChange}
          min={0}
          max={100}
          className="h-7 text-xs"
        />
      </div>
    </div>
  );
};
