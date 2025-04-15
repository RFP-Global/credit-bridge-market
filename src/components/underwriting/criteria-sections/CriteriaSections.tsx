
import React from "react";
import { CriteriaGroup as CriteriaGroupType } from "../types";
import { FinancialRatioSections } from "./FinancialRatioSections";
import { CriterionItem } from "../CriterionItem";
import { ratioNames } from "../utils/criteriaUtils";

interface CriteriaSectionsProps {
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

export const CriteriaSections: React.FC<CriteriaSectionsProps> = (props) => {
  const { group, groupIndex } = props;
  
  // Calculate other criteria by excluding all ratio criteria
  const allRatioNames = Object.values(ratioNames).flat();
  const otherCriteria = group.criteria.filter(c => !allRatioNames.includes(c.name));

  return (
    <>
      <FinancialRatioSections {...props} />
      
      {otherCriteria.map((criterion) => {
        const fullCriterionIndex = group.criteria.findIndex(c => c.name === criterion.name);
        return (
          <CriterionItem
            key={criterion.name}
            criterion={criterion}
            criterionIndex={fullCriterionIndex}
            groupIndex={groupIndex}
            updateCriterionWeight={props.updateCriterionWeight}
            updateCriterionScore={props.updateCriterionScore}
            updateCriterionRange={props.updateCriterionRange}
            updateActualMetricValue={props.updateActualMetricValue}
            toggleCriterionEnabled={props.toggleCriterionEnabled}
            getScoreColor={props.getScoreColor}
            getScoreBackground={props.getScoreBackground}
          />
        );
      })}
    </>
  );
};
