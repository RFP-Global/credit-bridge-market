
import React from "react";
import { Info } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Criterion } from "../types";

interface CriterionHeaderProps {
  criterion: Criterion;
  groupIndex: number;
  criterionIndex: number;
  toggleCriterionEnabled?: (groupIndex: number, criterionIndex: number, enabled: boolean) => void;
  getScoreColor: (score: number) => string;
}

export const CriterionHeader: React.FC<CriterionHeaderProps> = ({
  criterion,
  groupIndex,
  criterionIndex,
  toggleCriterionEnabled,
  getScoreColor,
}) => {
  const avgScore = criterion.minScore !== undefined && criterion.maxScore !== undefined 
    ? (criterion.minScore + criterion.maxScore) / 2 
    : 0;

  const handleToggleEnabled = (checked: boolean) => {
    if (toggleCriterionEnabled) {
      toggleCriterionEnabled(groupIndex, criterionIndex, checked);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
      <div>
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            {toggleCriterionEnabled && (
              <Checkbox 
                id={`criterion-${groupIndex}-${criterionIndex}`} 
                checked={criterion.enabled}
                onCheckedChange={handleToggleEnabled}
              />
            )}
            <div className="font-medium">{criterion.name}</div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 ml-1.5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[250px] text-xs">
                {criterion.description}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="text-xs text-muted-foreground ml-3">
            Current value: {criterion.value}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="text-xs text-muted-foreground">
          Weight: {criterion.weight}%
        </div>
        <div className={`font-medium ${getScoreColor(avgScore)}`}>
          Score: {criterion.minScore !== undefined ? criterion.minScore.toFixed(1) : "0.0"}-
                {criterion.maxScore !== undefined ? criterion.maxScore.toFixed(1) : "0.0"}
        </div>
      </div>
    </div>
  );
};
