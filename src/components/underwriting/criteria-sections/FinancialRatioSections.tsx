
import React from "react";
import { CriteriaGroup as CriteriaGroupType } from "../types";
import { LiquidityRatiosSection } from "../LiquidityRatiosSection";
import { LeverageRatiosSection } from "../LeverageRatiosSection";
import { ProfitabilityRatiosSection } from "../ProfitabilityRatiosSection";
import { CashFlowRatiosSection } from "../CashFlowRatiosSection";
import { CoverageRatiosSection } from "../CoverageRatiosSection";
import { TurnoverRatiosSection } from "../TurnoverRatiosSection";
import { getFilteredCriteria, findCriteriaIndices, ratioNames } from "../utils/criteriaUtils";

interface FinancialRatioSectionsProps {
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

export const FinancialRatioSections: React.FC<FinancialRatioSectionsProps> = ({
  group,
  groupIndex,
  ...props
}) => {
  const {
    liquidityRatios,
    leverageRatios,
    cashFlowRatios,
    coverageRatios,
    profitabilityRatios,
    turnoverRatios
  } = ratioNames;

  const renderRatioSection = (criteria: CriteriaGroupType["criteria"], Component: React.FC<any>) => {
    const indices = findCriteriaIndices(group.criteria, criteria);
    return (
      <Component
        criteria={criteria}
        groupIndex={groupIndex}
        {...props}
        updateCriterionWeight={(groupIdx, criterionIdx, newWeight) => {
          props.updateCriterionWeight(groupIdx, indices[criterionIdx], newWeight);
        }}
        updateCriterionScore={(groupIdx, criterionIdx, minScore, maxScore) => {
          props.updateCriterionScore(groupIdx, indices[criterionIdx], minScore, maxScore);
        }}
        updateCriterionRange={props.updateCriterionRange && ((groupIdx, criterionIdx, min, max) => {
          props.updateCriterionRange!(groupIdx, indices[criterionIdx], min, max);
        })}
        updateActualMetricValue={props.updateActualMetricValue && ((groupIdx, criterionIdx, value) => {
          props.updateActualMetricValue!(groupIdx, indices[criterionIdx], value);
        })}
        toggleCriterionEnabled={props.toggleCriterionEnabled && ((groupIdx, criterionIdx, enabled) => {
          props.toggleCriterionEnabled!(groupIdx, indices[criterionIdx], enabled);
        })}
      />
    );
  };

  // Only show sections if criteria exist and we're in the Financial Strength group
  if (group.name !== "Financial Strength") return null;

  const filteredLiquidityRatios = getFilteredCriteria(group.criteria, liquidityRatios);
  const filteredLeverageRatios = getFilteredCriteria(group.criteria, leverageRatios);
  const filteredCashFlowRatios = getFilteredCriteria(group.criteria, cashFlowRatios);
  const filteredCoverageRatios = getFilteredCriteria(group.criteria, coverageRatios);
  const filteredProfitabilityRatios = getFilteredCriteria(group.criteria, profitabilityRatios);
  const filteredTurnoverRatios = getFilteredCriteria(group.criteria, turnoverRatios);

  return (
    <>
      {filteredLiquidityRatios.length > 0 && renderRatioSection(filteredLiquidityRatios, LiquidityRatiosSection)}
      {filteredLeverageRatios.length > 0 && renderRatioSection(filteredLeverageRatios, LeverageRatiosSection)}
      {filteredCashFlowRatios.length > 0 && renderRatioSection(filteredCashFlowRatios, CashFlowRatiosSection)}
      {filteredCoverageRatios.length > 0 && renderRatioSection(filteredCoverageRatios, CoverageRatiosSection)}
      {filteredProfitabilityRatios.length > 0 && renderRatioSection(filteredProfitabilityRatios, ProfitabilityRatiosSection)}
      {filteredTurnoverRatios.length > 0 && renderRatioSection(filteredTurnoverRatios, TurnoverRatiosSection)}
    </>
  );
};
