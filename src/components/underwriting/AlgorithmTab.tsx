
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CriteriaGroup } from "./CriteriaGroup";
import { CategoryWeights } from "./CategoryWeights";
import { CriteriaGroup as CriteriaGroupType } from "./types";

interface AlgorithmTabProps {
  criteriaGroups: CriteriaGroupType[];
  updateGroupWeight: (groupIndex: number, newWeight: number) => void;
  updateCriterionWeight: (groupIndex: number, criterionIndex: number, newWeight: number) => void;
  updateCriterionScore: (groupIndex: number, criterionIndex: number, minScore: number, maxScore: number) => void;
  updateCriterionRange?: (groupIndex: number, criterionIndex: number, min: number, max: number) => void;
  updateActualMetricValue?: (groupIndex: number, criterionIndex: number, value: number) => void;
  toggleCriterionEnabled?: (groupIndex: number, criterionIndex: number, enabled: boolean) => void;
  getScoreColor: (score: number) => string;
  getScoreBackground: (score: number) => string;
}

export const AlgorithmTab: React.FC<AlgorithmTabProps> = ({
  criteriaGroups,
  updateGroupWeight,
  updateCriterionWeight,
  updateCriterionScore,
  updateCriterionRange,
  updateActualMetricValue,
  toggleCriterionEnabled,
  getScoreColor,
  getScoreBackground
}) => {
  return (
    <Tabs defaultValue="categories" className="space-y-6">
      <TabsList className="bg-black/40 border-gray-800">
        <TabsTrigger value="categories" className="data-[state=active]:bg-gray-800/50">Categories</TabsTrigger>
        <TabsTrigger value="weights" className="data-[state=active]:bg-gray-800/50">Weightings</TabsTrigger>
      </TabsList>
      
      <TabsContent value="categories" className="space-y-6">
        {criteriaGroups.map((group, groupIndex) => (
          <CriteriaGroup 
            key={groupIndex}
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
        ))}
      </TabsContent>
      
      <TabsContent value="weights">
        <CategoryWeights 
          criteriaGroups={criteriaGroups}
          updateGroupWeight={updateGroupWeight}
          getScoreColor={getScoreColor}
        />
      </TabsContent>
    </Tabs>
  );
};
