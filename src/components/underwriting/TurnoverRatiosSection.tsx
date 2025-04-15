
import React from "react";
import { Criterion } from "@/components/underwriting/types";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { CriterionItem } from "./CriterionItem";

interface TurnoverRatiosSectionProps {
  criteria: Criterion[];
  groupIndex: number;
  updateCriterionWeight: (groupIndex: number, criterionIndex: number, newWeight: number) => void;
  updateCriterionScore: (groupIndex: number, criterionIndex: number, minScore: number, maxScore: number) => void;
  updateCriterionRange?: (groupIndex: number, criterionIndex: number, min: number, max: number) => void;
  updateActualMetricValue?: (groupIndex: number, criterionIndex: number, value: number) => void;
  toggleCriterionEnabled?: (groupIndex: number, criterionIndex: number, enabled: boolean) => void;
  getScoreColor: (score: number) => string;
  getScoreBackground: (score: number) => string;
}

export const TurnoverRatiosSection: React.FC<TurnoverRatiosSectionProps> = ({
  criteria,
  groupIndex,
  updateCriterionWeight,
  updateCriterionScore,
  updateCriterionRange,
  updateActualMetricValue,
  toggleCriterionEnabled,
  getScoreColor,
  getScoreBackground
}) => {
  return (
    <Collapsible className="border border-gray-800 rounded-md p-4 space-y-2">
      <CollapsibleTrigger className="flex items-center justify-between w-full">
        <h4 className="text-sm font-medium">Turnover Ratios</h4>
        <ChevronDown className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 pt-4">
        {criteria.map((criterion, criterionIndex) => (
          <CriterionItem
            key={criterion.name}
            criterion={criterion}
            criterionIndex={criterionIndex}
            groupIndex={groupIndex}
            updateCriterionWeight={updateCriterionWeight}
            updateCriterionScore={updateCriterionScore}
            updateCriterionRange={updateCriterionRange}
            updateActualMetricValue={updateActualMetricValue}
            toggleCriterionEnabled={toggleCriterionEnabled}
            getScoreColor={getScoreColor}
            getScoreBackground={getScoreBackground}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};
