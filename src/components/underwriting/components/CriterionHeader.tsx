
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { ScoreRange } from "../types";
import { ScoreMappingTable } from "./ScoreMappingTable";

interface CriterionHeaderProps {
  name: string;
  description?: string;
  value?: string;
  weight: number;
  score: number;
  scoreMapping?: ScoreRange[];
  getScoreColor: (score: number) => string;
}

export const CriterionHeader = ({
  name,
  description,
  value,
  weight,
  score,
  scoreMapping,
  getScoreColor,
}: CriterionHeaderProps) => {
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
          <div className="text-xs text-muted-foreground ml-3">
            Current value: {value}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="text-xs text-muted-foreground">
          Weight: {weight}%
        </div>
        {scoreMapping && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="left" className="w-auto max-w-[300px] p-3 bg-gray-950 border border-gray-800">
              <div className="text-xs font-semibold mb-2 text-gray-300">Score Mapping for {name}</div>
              <ScoreMappingTable 
                scoreMapping={scoreMapping}
                getScoreColor={getScoreColor}
                actualUnit={undefined}
              />
            </PopoverContent>
          </Popover>
        )}
        <div className={`font-medium ${getScoreColor(score)}`}>
          Score: {score}
        </div>
      </div>
    </div>
  );
};
