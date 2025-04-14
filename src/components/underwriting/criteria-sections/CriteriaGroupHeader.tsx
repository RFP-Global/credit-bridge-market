
import React from "react";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { CustomBadge } from "@/components/ui/custom-badge";

interface CriteriaGroupHeaderProps {
  name: string;
  description: string;
  minScore: number;
  maxScore: number;
  getScoreColor: (score: number) => string;
}

export const CriteriaGroupHeader: React.FC<CriteriaGroupHeaderProps> = ({
  name,
  description,
  minScore,
  maxScore,
  getScoreColor,
}) => {
  // Calculate the average score to determine the color
  const avgScore = (minScore + maxScore) / 2;

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
      <div>
        <div className="flex items-center">
          <div className="font-medium">{name}</div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 ml-1.5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[250px] text-xs">
                {description}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className={`font-medium ${getScoreColor(avgScore)}`}>
          Score: {minScore?.toFixed(1) || "0.0"}-{maxScore?.toFixed(1) || "0.0"}
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
