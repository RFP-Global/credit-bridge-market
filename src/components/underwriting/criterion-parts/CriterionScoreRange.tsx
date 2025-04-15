
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CriterionScoreRangeProps {
  minScoreValue: string;
  maxScoreValue: string;
  onMinScoreChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxScoreChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateRange: () => void;
}

export const CriterionScoreRange: React.FC<CriterionScoreRangeProps> = ({
  minScoreValue,
  maxScoreValue,
  onMinScoreChange,
  onMaxScoreChange,
  onUpdateRange,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Risk Score Range</span>
        <span>{minScoreValue}-{maxScoreValue}</span>
      </div>
      <div className="grid grid-cols-9 gap-2 items-center">
        <span className="text-xs text-muted-foreground col-span-1">Min:</span>
        <Input
          value={minScoreValue}
          onChange={onMinScoreChange}
          className="h-7 text-xs col-span-3"
          placeholder="Min score"
        />
        <span className="text-xs text-muted-foreground col-span-1">Max:</span>
        <Input
          value={maxScoreValue}
          onChange={onMaxScoreChange}
          className="h-7 text-xs col-span-3"
          placeholder="Max score"
        />
        <Button 
          variant="outline" 
          size="sm" 
          className="h-7 text-xs whitespace-nowrap col-span-1"
          onClick={onUpdateRange}
        >
          Set
        </Button>
      </div>
    </div>
  );
};
