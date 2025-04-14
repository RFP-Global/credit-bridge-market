import React from "react";
import { CriteriaGroup as CriteriaGroupType } from "../types";
import { CriterionItem } from "../CriterionItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { LiquidityRatiosSection } from "../LiquidityRatiosSection";
import { LeverageRatiosSection } from "../LeverageRatiosSection";
import { ProfitabilityRatiosSection } from "../ProfitabilityRatiosSection";
import { CashFlowRatiosSection } from "../CashFlowRatiosSection";
import { CoverageRatiosSection } from "../CoverageRatiosSection";
import { TurnoverRatiosSection } from "../TurnoverRatiosSection";

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

export const CriteriaSections: React.FC<CriteriaSectionsProps> = ({
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
  // Helper function to get correct index for specific ratio types
  const getFilteredCriteria = (criteriaNames: string[]) => {
    return group.criteria.filter(c => criteriaNames.includes(c.name));
  };
  
  // Find indices within the full criteria array for each ratio type
  const findCriteriaIndices = (criteria: CriteriaGroupType["criteria"], filteredCriteria: CriteriaGroupType["criteria"]) => {
    return filteredCriteria.map(fc => criteria.findIndex(c => c.name === fc.name));
  };

  const liquidityRatioNames = ["Current Ratio", "Quick Ratio", "Cash Ratio"];
  const leverageRatioNames = ["Debt-to-Equity", "Debt Ratio", "Equity Ratio", "Fixed Charge Coverage Ratio", "Interest Coverage Ratio"];
  const cashFlowRatioNames = ["Operating Cash Flow Ratio", "Debt Service Coverage Ratio"];
  const coverageRatioNames = ["Loan-to-Value Ratio", "Collateral Coverage Ratio", "Leverage Coverage Ratio", "Payback Ratio"];
  const profitabilityRatioNames = ["Net Profit Margin", "Gross Profit Margin", "Operating Margin", "Return on Assets", "Return on Equity"];
  const turnoverRatioNames = ["Accounts Receivable Turnover Ratio", "Inventory Turnover Ratio", "Asset Turnover Ratio"];

  const liquidityRatios = getFilteredCriteria(liquidityRatioNames);
  const leverageRatios = getFilteredCriteria(leverageRatioNames);
  const cashFlowRatios = getFilteredCriteria(cashFlowRatioNames);
  const coverageRatios = getFilteredCriteria(coverageRatioNames);
  const profitabilityRatios = getFilteredCriteria(profitabilityRatioNames);
  const turnoverRatios = getFilteredCriteria(turnoverRatioNames);

  // Get indices for each ratio type
  const liquidityIndices = findCriteriaIndices(group.criteria, liquidityRatios);
  const leverageIndices = findCriteriaIndices(group.criteria, leverageRatios);
  const cashFlowIndices = findCriteriaIndices(group.criteria, cashFlowRatios);
  const coverageIndices = findCriteriaIndices(group.criteria, coverageRatios);
  const profitabilityIndices = findCriteriaIndices(group.criteria, profitabilityRatios);
  const turnoverIndices = findCriteriaIndices(group.criteria, turnoverRatios);

  // Calculate other criteria
  const otherCriteria = group.criteria.filter(c => 
    !liquidityRatioNames.includes(c.name) &&
    !leverageRatioNames.includes(c.name) &&
    !cashFlowRatioNames.includes(c.name) &&
    !coverageRatioNames.includes(c.name) &&
    !profitabilityRatioNames.includes(c.name) &&
    !turnoverRatioNames.includes(c.name)
  );

  const renderSubCategoryHeader = (title: string, criteria: CriteriaGroupType["criteria"]) => {
    if (criteria.length === 0) return null;

    const avgScore = criteria.reduce((sum, c) => sum + (c.minScore + c.maxScore) / 2, 0) / criteria.length;

    return (
      <Card className="bg-gray-900/50 mb-4">
        <CardHeader className="py-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <span className={`text-sm font-medium ${getScoreColor(avgScore)}`}>
              Score: {avgScore.toFixed(1)}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {criteria.map((criterion, idx) => {
            const criterionIndex = group.criteria.findIndex(c => c.name === criterion.name);
            return (
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
            );
          })}
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      {group.name === "Financial Strength" && (
        <>
          {renderSubCategoryHeader("Liquidity Ratios", liquidityRatios)}
          {renderSubCategoryHeader("Leverage Ratios", leverageRatios)}
          {renderSubCategoryHeader("Cash Flow Ratios", cashFlowRatios)}
          {renderSubCategoryHeader("Coverage Ratios", coverageRatios)}
          {renderSubCategoryHeader("Turnover Ratios", turnoverRatios)}
          {renderSubCategoryHeader("Profitability Ratios", profitabilityRatios)}
        </>
      )}

      {otherCriteria.map((criterion, criterionIndex) => {
        const fullCriterionIndex = group.criteria.findIndex(c => c.name === criterion.name);
        return (
          <CriterionItem
            key={criterion.name}
            criterion={criterion}
            criterionIndex={fullCriterionIndex}
            groupIndex={groupIndex}
            updateCriterionWeight={updateCriterionWeight}
            updateCriterionScore={updateCriterionScore}
            updateCriterionRange={updateCriterionRange}
            updateActualMetricValue={updateActualMetricValue}
            toggleCriterionEnabled={toggleCriterionEnabled}
            getScoreColor={getScoreColor}
            getScoreBackground={getScoreBackground}
          />
        );
      })}
    </>
  );
};
