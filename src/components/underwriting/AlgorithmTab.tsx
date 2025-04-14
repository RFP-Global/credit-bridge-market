
import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CriteriaGroup } from "./CriteriaGroup";
import { CriteriaGroup as CriteriaGroupType } from "./types";

interface AlgorithmTabProps {
  criteriaGroups: CriteriaGroupType[];
  updateGroupWeight: (groupIndex: number, newWeight: number) => void;
  updateCriterionWeight: (groupIndex: number, criterionIndex: number, newWeight: number) => void;
  updateCriterionScore: (groupIndex: number, criterionIndex: number, minScore: number, maxScore: number) => void;
  toggleCriterionEnabled?: (groupIndex: number, criterionIndex: number, enabled: boolean) => void;
  getScoreColor: (score: number) => string;
  getScoreBackground: (score: number) => string;
}

export const AlgorithmTab: React.FC<AlgorithmTabProps> = ({
  criteriaGroups,
  updateGroupWeight,
  updateCriterionWeight,
  updateCriterionScore,
  toggleCriterionEnabled,
  getScoreColor,
  getScoreBackground
}) => {
  return (
    <Tabs defaultValue="categories" className="space-y-6">
      <TabsContent value="categories" className="space-y-6">
        {criteriaGroups.map((group, groupIndex) => (
          <CriteriaGroup 
            key={groupIndex}
            group={group}
            groupIndex={groupIndex}
            updateCriterionWeight={updateCriterionWeight}
            updateCriterionScore={updateCriterionScore}
            toggleCriterionEnabled={toggleCriterionEnabled}
            getScoreColor={getScoreColor}
            getScoreBackground={getScoreBackground}
          />
        ))}
      </TabsContent>
    </Tabs>
  );
};
