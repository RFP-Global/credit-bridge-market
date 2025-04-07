
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Criterion } from "./types";

interface CriterionItemProps {
  criterion: Criterion;
  criterionIndex: number;
  groupIndex: number;
  updateCriterionWeight: (groupIndex: number, criterionIndex: number, newWeight: number) => void;
  updateCriterionScore: (groupIndex: number, criterionIndex: number, newScore: number) => void;
  getScoreColor: (score: number) => string;
  getScoreBackground: (score: number) => string;
}

export const CriterionItem = ({
  criterion,
  criterionIndex,
  groupIndex,
  updateCriterionWeight,
  updateCriterionScore,
  getScoreColor,
  getScoreBackground,
}: CriterionItemProps) => {
  return (
    <div className="space-y-2 border-b border-gray-800/40 pb-4 last:border-0 last:pb-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <div className="flex items-center">
            <div className="font-medium">{criterion.name}</div>
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
          <div className={`font-medium ${getScoreColor(criterion.score)}`}>
            Score: {criterion.score}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Criterion Weight</span>
            <span>{criterion.weight}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6"
              onClick={() => updateCriterionWeight(groupIndex, criterionIndex, Math.max(5, criterion.weight - 5))}
              disabled={criterion.weight <= 5}
            >
              <ChevronDown className="h-3 w-3" />
            </Button>
            <Slider
              value={[criterion.weight]}
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
              onClick={() => updateCriterionWeight(groupIndex, criterionIndex, Math.min(70, criterion.weight + 5))}
              disabled={criterion.weight >= 70}
            >
              <ChevronUp className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Risk Score</span>
            <span>{criterion.score} / 5</span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6"
              onClick={() => updateCriterionScore(groupIndex, criterionIndex, Math.max(1, criterion.score - 1))}
              disabled={criterion.score <= 1}
            >
              <ChevronDown className="h-3 w-3" />
            </Button>
            <div className="flex-1 flex">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  className={`h-6 flex-1 border-r last:border-r-0 border-gray-800 transition-colors ${
                    criterion.score >= value 
                      ? getScoreBackground(value)
                      : 'bg-gray-800/30'
                  }`}
                  onClick={() => updateCriterionScore(groupIndex, criterionIndex, value)}
                />
              ))}
            </div>
            <Button 
              variant="outline" 
              size="icon"
              className="h-6 w-6"
              onClick={() => updateCriterionScore(groupIndex, criterionIndex, Math.min(5, criterion.score + 1))}
              disabled={criterion.score >= 5}
            >
              <ChevronUp className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
