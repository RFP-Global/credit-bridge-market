
import React from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CriteriaGroup as CriteriaGroupType } from "./types";
import { CriteriaSections } from "./criteria-sections/CriteriaSections";
import { CriteriaGroupHeader } from "./criteria-sections/CriteriaGroupHeader";

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
    <Card className="bg-black/40 border-gray-800 mb-4">
      <CardHeader className="pb-3">
        <CriteriaGroupHeader
          name={group.name}
          description={group.description}
          minScore={group.minScore}
          maxScore={group.maxScore}
          getScoreColor={getScoreColor}
        />
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="criteria">
          <AccordionItem value="criteria" className="border-b-0">
            <AccordionTrigger>Criteria</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
