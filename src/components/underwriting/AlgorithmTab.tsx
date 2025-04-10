
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { CategoryWeights } from "./CategoryWeights";
import { RiskScoreBreakdown } from "./RiskScoreBreakdown";
import { CriteriaGroup } from "./CriteriaGroup";
import { CriteriaGroup as CriteriaGroupType } from "./types";

interface AlgorithmTabProps {
  criteriaGroups: CriteriaGroupType[];
  updateGroupWeight: (groupIndex: number, newWeight: number) => void;
  updateCriterionWeight: (groupIndex: number, criterionIndex: number, newWeight: number) => void;
  updateCriterionScore: (groupIndex: number, criterionIndex: number, newScore: number) => void;
  updateCriterionRange?: (groupIndex: number, criterionIndex: number, min: number, max: number) => void;
  updateActualMetricValue?: (groupIndex: number, criterionIndex: number, value: number) => void;
  getScoreColor: (score: number) => string;
  getScoreBackground: (score: number) => string;
}

export const AlgorithmTab = ({
  criteriaGroups,
  updateGroupWeight,
  updateCriterionWeight,
  updateCriterionScore,
  updateCriterionRange,
  updateActualMetricValue,
  getScoreColor,
  getScoreBackground,
}: AlgorithmTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
        <CategoryWeights 
          criteriaGroups={criteriaGroups}
          updateGroupWeight={updateGroupWeight}
          getScoreColor={getScoreColor}
        />
        <RiskScoreBreakdown 
          criteriaGroups={criteriaGroups}
          getScoreColor={getScoreColor}
          getScoreBackground={getScoreBackground}
        />
      </div>
      
      <Accordion type="single" collapsible className="w-full space-y-4">
        {criteriaGroups.map((group, groupIndex) => (
          <CriteriaGroup
            key={group.name}
            group={group}
            groupIndex={groupIndex}
            updateGroupWeight={updateGroupWeight}
            updateCriterionWeight={updateCriterionWeight}
            updateCriterionScore={updateCriterionScore}
            updateCriterionRange={updateCriterionRange}
            updateActualMetricValue={updateActualMetricValue}
            getScoreColor={getScoreColor}
            getScoreBackground={getScoreBackground}
          />
        ))}
      </Accordion>
      
      <div className="flex justify-end mt-8">
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Save className="mr-2 h-4 w-4" />
          Save Algorithm Configuration
        </Button>
      </div>
    </div>
  );
};
