
import React from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CriterionItem } from "./CriterionItem";
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
    <Card className="bg-black/40 border-gray-800 mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">{group.name}</CardTitle>
          <div className={`text-base font-bold ${getScoreColor((group.minScore + group.maxScore) / 2)}`}>
            {group.minScore?.toFixed(1) || "0.0"}-{group.maxScore?.toFixed(1) || "0.0"}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="criteria">
          <AccordionItem value="criteria" className="border-b-0">
            <AccordionTrigger>Criteria</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              {group.criteria.map((criterion, criterionIndex) => (
                <CriterionItem
                  key={criterionIndex}
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
