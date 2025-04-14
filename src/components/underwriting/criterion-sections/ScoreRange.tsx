
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ScoreRangeProps {
  minScore: string;
  maxScore: string;
  onMinScoreChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxScoreChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateRange: () => void;
}

export const ScoreRange: React.FC<ScoreRangeProps> = ({
  minScore,
  maxScore,
  onMinScoreChange,
  onMaxScoreChange,
  onUpdateRange,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Risk Score Range</span>
        <span>{minScore}-{maxScore}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2">
          <span className="text-xs text-muted-foreground">Min:</span>
          <Input
            value={minScore}
            onChange={onMinScoreChange}
            className="h-7 text-xs"
            placeholder="Min score"
          />
        </div>
        <div className="flex flex-1 items-center gap-2">
          <span className="text-xs text-muted-foreground">Max:</span>
          <Input
            value={maxScore}
            onChange={onMaxScoreChange}
            className="h-7 text-xs"
            placeholder="Max score"
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
