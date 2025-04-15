
import React from "react";
import { ChevronDown } from "lucide-react";
import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { CriteriaGroup } from "./types";

interface CriteriaGroupHeaderProps {
  group: CriteriaGroup;
  groupIndex: number;
  getScoreColor: (score: number) => string;
}

export const CriteriaGroupHeader: React.FC<CriteriaGroupHeaderProps> = ({
  group,
  groupIndex,
  getScoreColor,
}) => {
  // Calculate the average score to determine the color
  const avgScore = (group.minScore + group.maxScore) / 2;

  return (
    <CollapsibleTrigger className="flex items-center justify-between w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-2">
        <div className="flex items-center">
          <div className="font-medium">{group.name}</div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 ml-1.5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[250px] text-xs">
                {group.description}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`font-medium ${getScoreColor(avgScore)}`}>
            Score: {group.minScore?.toFixed(1) || "0.0"}-{group.maxScore?.toFixed(1) || "0.0"}
          </div>
          <div className="text-xs text-muted-foreground">
            Weight: {group.weight}%
          </div>
        </div>
      </div>
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 ui-expanded:rotate-180" />
    </CollapsibleTrigger>
  );
};
