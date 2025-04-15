
import React from "react";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { CustomBadge } from "@/components/ui/custom-badge";
import { CriteriaGroup as CriteriaGroupType } from "./types";
import { CollapsibleTrigger } from "@/components/ui/collapsible";

interface CriteriaGroupHeaderProps {
  group: CriteriaGroupType;
  groupIndex: number;
  getScoreColor: (score: number) => string;
}

export const CriteriaGroupHeader: React.FC<CriteriaGroupHeaderProps> = ({
  group,
  getScoreColor,
}) => {
  // Calculate the average score to determine the color
  const avgScore = (group.minScore + group.maxScore) / 2;

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
      <CollapsibleTrigger className="flex items-center text-left">
        <div>
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
        </div>
      </CollapsibleTrigger>
      <div className="flex items-center space-x-2">
        <div className={`font-medium ${getScoreColor(avgScore)}`}>
          Score: {group.minScore?.toFixed(1) || "0.0"}-{group.maxScore?.toFixed(1) || "0.0"}
        </div>
        <CustomBadge 
          variant={
            avgScore >= 9 ? "success" : 
            avgScore >= 7 ? "secondary" :
            avgScore >= 5 ? "warning" : "destructive"
          } 
          className="text-xs px-1.5 py-0"
        >
          {avgScore >= 9 ? "Low Risk" : 
           avgScore >= 7 ? "Moderate Risk" : 
           avgScore >= 5 ? "Medium-High Risk" : "High Risk"}
        </CustomBadge>
      </div>
    </div>
  );
};
