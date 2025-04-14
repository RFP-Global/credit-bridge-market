
import React from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CriterionItem } from "./CriterionItem";
import { LiquidityRatiosSection } from "./LiquidityRatiosSection";
import { LeverageRatiosSection } from "./LeverageRatiosSection";
import { ProfitabilityRatiosSection } from "./ProfitabilityRatiosSection";
import { CashFlowRatiosSection } from "./CashFlowRatiosSection";
import { CoverageRatiosSection } from "./CoverageRatiosSection";
import { TurnoverRatiosSection } from "./TurnoverRatiosSection";
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

  // Calculate other criteria (those not in any specific category)
  const otherCriteria = group.criteria.filter(c => 
    !liquidityRatioNames.includes(c.name) &&
    !leverageRatioNames.includes(c.name) &&
    !cashFlowRatioNames.includes(c.name) &&
    !coverageRatioNames.includes(c.name) &&
    !profitabilityRatioNames.includes(c.name) &&
    !turnoverRatioNames.includes(c.name)
  );

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
              {group.name === "Financial Strength" && liquidityRatios.length > 0 && (
                <LiquidityRatiosSection
                  criteria={liquidityRatios}
                  groupIndex={groupIndex}
                  updateCriterionWeight={(groupIdx, criterionIdx, newWeight) => {
                    updateCriterionWeight(groupIdx, liquidityIndices[criterionIdx], newWeight);
                  }}
                  updateCriterionScore={(groupIdx, criterionIdx, minScore, maxScore) => {
                    updateCriterionScore(groupIdx, liquidityIndices[criterionIdx], minScore, maxScore);
                  }}
                  updateCriterionRange={updateCriterionRange && ((groupIdx, criterionIdx, min, max) => {
                    updateCriterionRange(groupIdx, liquidityIndices[criterionIdx], min, max);
                  })}
                  updateActualMetricValue={updateActualMetricValue && ((groupIdx, criterionIdx, value) => {
                    updateActualMetricValue(groupIdx, liquidityIndices[criterionIdx], value);
                  })}
                  toggleCriterionEnabled={toggleCriterionEnabled && ((groupIdx, criterionIdx, enabled) => {
                    toggleCriterionEnabled(groupIdx, liquidityIndices[criterionIdx], enabled);
                  })}
                  getScoreColor={getScoreColor}
                  getScoreBackground={getScoreBackground}
                />
              )}
              
              {group.name === "Financial Strength" && leverageRatios.length > 0 && (
                <LeverageRatiosSection
                  criteria={leverageRatios}
                  groupIndex={groupIndex}
                  updateCriterionWeight={(groupIdx, criterionIdx, newWeight) => {
                    updateCriterionWeight(groupIdx, leverageIndices[criterionIdx], newWeight);
                  }}
                  updateCriterionScore={(groupIdx, criterionIdx, minScore, maxScore) => {
                    updateCriterionScore(groupIdx, leverageIndices[criterionIdx], minScore, maxScore);
                  }}
                  updateCriterionRange={updateCriterionRange && ((groupIdx, criterionIdx, min, max) => {
                    updateCriterionRange(groupIdx, leverageIndices[criterionIdx], min, max);
                  })}
                  updateActualMetricValue={updateActualMetricValue && ((groupIdx, criterionIdx, value) => {
                    updateActualMetricValue(groupIdx, leverageIndices[criterionIdx], value);
                  })}
                  toggleCriterionEnabled={toggleCriterionEnabled && ((groupIdx, criterionIdx, enabled) => {
                    toggleCriterionEnabled(groupIdx, leverageIndices[criterionIdx], enabled);
                  })}
                  getScoreColor={getScoreColor}
                  getScoreBackground={getScoreBackground}
                />
              )}

              {group.name === "Financial Strength" && cashFlowRatios.length > 0 && (
                <CashFlowRatiosSection
                  criteria={cashFlowRatios}
                  groupIndex={groupIndex}
                  updateCriterionWeight={(groupIdx, criterionIdx, newWeight) => {
                    updateCriterionWeight(groupIdx, cashFlowIndices[criterionIdx], newWeight);
                  }}
                  updateCriterionScore={(groupIdx, criterionIdx, minScore, maxScore) => {
                    updateCriterionScore(groupIdx, cashFlowIndices[criterionIdx], minScore, maxScore);
                  }}
                  updateCriterionRange={updateCriterionRange && ((groupIdx, criterionIdx, min, max) => {
                    updateCriterionRange(groupIdx, cashFlowIndices[criterionIdx], min, max);
                  })}
                  updateActualMetricValue={updateActualMetricValue && ((groupIdx, criterionIdx, value) => {
                    updateActualMetricValue(groupIdx, cashFlowIndices[criterionIdx], value);
                  })}
                  toggleCriterionEnabled={toggleCriterionEnabled && ((groupIdx, criterionIdx, enabled) => {
                    toggleCriterionEnabled(groupIdx, cashFlowIndices[criterionIdx], enabled);
                  })}
                  getScoreColor={getScoreColor}
                  getScoreBackground={getScoreBackground}
                />
              )}
              
              {group.name === "Financial Strength" && coverageRatios.length > 0 && (
                <CoverageRatiosSection
                  criteria={coverageRatios}
                  groupIndex={groupIndex}
                  updateCriterionWeight={(groupIdx, criterionIdx, newWeight) => {
                    updateCriterionWeight(groupIdx, coverageIndices[criterionIdx], newWeight);
                  }}
                  updateCriterionScore={(groupIdx, criterionIdx, minScore, maxScore) => {
                    updateCriterionScore(groupIdx, coverageIndices[criterionIdx], minScore, maxScore);
                  }}
                  updateCriterionRange={updateCriterionRange && ((groupIdx, criterionIdx, min, max) => {
                    updateCriterionRange(groupIdx, coverageIndices[criterionIdx], min, max);
                  })}
                  updateActualMetricValue={updateActualMetricValue && ((groupIdx, criterionIdx, value) => {
                    updateActualMetricValue(groupIdx, coverageIndices[criterionIdx], value);
                  })}
                  toggleCriterionEnabled={toggleCriterionEnabled && ((groupIdx, criterionIdx, enabled) => {
                    toggleCriterionEnabled(groupIdx, coverageIndices[criterionIdx], enabled);
                  })}
                  getScoreColor={getScoreColor}
                  getScoreBackground={getScoreBackground}
                />
              )}

              {group.name === "Financial Strength" && turnoverRatios.length > 0 && (
                <TurnoverRatiosSection
                  criteria={turnoverRatios}
                  groupIndex={groupIndex}
                  updateCriterionWeight={(groupIdx, criterionIdx, newWeight) => {
                    updateCriterionWeight(groupIdx, turnoverIndices[criterionIdx], newWeight);
                  }}
                  updateCriterionScore={(groupIdx, criterionIdx, minScore, maxScore) => {
                    updateCriterionScore(groupIdx, turnoverIndices[criterionIdx], minScore, maxScore);
                  }}
                  updateCriterionRange={updateCriterionRange && ((groupIdx, criterionIdx, min, max) => {
                    updateCriterionRange(groupIdx, turnoverIndices[criterionIdx], min, max);
                  })}
                  updateActualMetricValue={updateActualMetricValue && ((groupIdx, criterionIdx, value) => {
                    updateActualMetricValue(groupIdx, turnoverIndices[criterionIdx], value);
                  })}
                  toggleCriterionEnabled={toggleCriterionEnabled && ((groupIdx, criterionIdx, enabled) => {
                    toggleCriterionEnabled(groupIdx, turnoverIndices[criterionIdx], enabled);
                  })}
                  getScoreColor={getScoreColor}
                  getScoreBackground={getScoreBackground}
                />
              )}

              {group.name === "Financial Strength" && profitabilityRatios.length > 0 && (
                <ProfitabilityRatiosSection
                  criteria={profitabilityRatios}
                  groupIndex={groupIndex}
                  updateCriterionWeight={(groupIdx, criterionIdx, newWeight) => {
                    updateCriterionWeight(groupIdx, profitabilityIndices[criterionIdx], newWeight);
                  }}
                  updateCriterionScore={(groupIdx, criterionIdx, minScore, maxScore) => {
                    updateCriterionScore(groupIdx, profitabilityIndices[criterionIdx], minScore, maxScore);
                  }}
                  updateCriterionRange={updateCriterionRange && ((groupIdx, criterionIdx, min, max) => {
                    updateCriterionRange(groupIdx, profitabilityIndices[criterionIdx], min, max);
                  })}
                  updateActualMetricValue={updateActualMetricValue && ((groupIdx, criterionIdx, value) => {
                    updateActualMetricValue(groupIdx, profitabilityIndices[criterionIdx], value);
                  })}
                  toggleCriterionEnabled={toggleCriterionEnabled && ((groupIdx, criterionIdx, enabled) => {
                    toggleCriterionEnabled(groupIdx, profitabilityIndices[criterionIdx], enabled);
                  })}
                  getScoreColor={getScoreColor}
                  getScoreBackground={getScoreBackground}
                />
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
