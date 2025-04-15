
import React from "react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { CriteriaGroupHeader } from "./CriteriaGroupHeader";
import { CriteriaSections } from "./criteria-sections/CriteriaSections";
import { CriteriaGroup as CriteriaGroupType } from "./types";

interface CriteriaGroupProps {
  group: CriteriaGroupType;
  groupIndex: number;
  updateCriterionWeight: (groupIndex: number, criterionIndex: number, newWeight: number) => void;
  updateCriterionScore: (groupIndex: number, criterionIndex: number, minScore: number, maxScore: number) => void;
  updateCriterionRange?: (groupIndex: number, criterionIndex: number, min: number, max: number) => void;
  updateActualMetricValue?: (groupIndex: number, criterionIndex: number, value: number) => void;
  toggleCriterionEnabled?: (groupIndex: number, criterionIndex: number, enabled: boolean) => void;
  getScoreColor: (score: number) => string;
  getScoreBackground: (score: number) => string;
}

export const CriteriaGroup: React.FC<CriteriaGroupProps> = ({
  group,
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
    <Collapsible className="border border-gray-800 rounded-md p-4 space-y-4">
      <CriteriaGroupHeader 
        group={group} 
        groupIndex={groupIndex}
        getScoreColor={getScoreColor}
      />
      <CollapsibleContent className="space-y-4">
        <CriteriaSections
          group={group}
          groupIndex={groupIndex}
          updateCriterionWeight={updateCriterionWeight}
          updateCriterionScore={updateCriterionScore}
          updateCriterionRange={updateCriterionRange}
          updateActualMetricValue={updateActualMetricValue}
          toggleCriterionEnabled={toggleCriterionEnabled}
          getScoreColor={getScoreColor}
          getScoreBackground={getScoreBackground}
        />
      </CollapsibleContent>
    </Collapsible>
  );
};
