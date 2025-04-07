
import { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CriterionItem } from "./CriterionItem";
import { CriteriaGroup as CriteriaGroupType, Criterion } from "./types";

interface CriteriaGroupProps {
  group: CriteriaGroupType;
  groupIndex: number;
  updateGroupWeight: (groupIndex: number, newWeight: number) => void;
  updateCriterionWeight: (groupIndex: number, criterionIndex: number, newWeight: number) => void;
  updateCriterionScore: (groupIndex: number, criterionIndex: number, newScore: number) => void;
  getScoreColor: (score: number) => string;
  getScoreBackground: (score: number) => string;
}

export const CriteriaGroup = ({
  group,
  groupIndex,
  updateGroupWeight,
  updateCriterionWeight,
  updateCriterionScore,
  getScoreColor,
  getScoreBackground,
}: CriteriaGroupProps) => {
  return (
    <AccordionItem 
      key={group.name} 
      value={group.name}
      className="border border-gray-800 rounded-md overflow-hidden bg-black/40 px-0"
    >
      <AccordionTrigger className="px-6 py-4 hover:bg-gray-900/20 [&[data-state=open]>div>svg]:rotate-180">
        <div className="flex items-center justify-between w-full pr-2">
          <div className="flex items-center">
            <span className="font-semibold">{group.name}</span>
            <Badge className="ml-3" variant="outline">
              {group.weight}%
            </Badge>
          </div>
          <div className="flex items-center">
            <span className={`font-bold mr-2 ${getScoreColor(group.score)}`}>
              {group.score.toFixed(2)}
            </span>
            <ChevronDown className="h-4 w-4 transition-transform duration-200" />
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-4 pt-2 px-6">
        <div className="text-sm text-muted-foreground mb-4">
          {group.description}
        </div>
        <div className="space-y-6">
          {group.criteria.map((criterion, criterionIndex) => (
            <CriterionItem
              key={criterion.name}
              criterion={criterion}
              criterionIndex={criterionIndex}
              groupIndex={groupIndex}
              updateCriterionWeight={updateCriterionWeight}
              updateCriterionScore={updateCriterionScore}
              getScoreColor={getScoreColor}
              getScoreBackground={getScoreBackground}
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
