
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
  const liquidityRatios = group.name === "Financial Strength" 
    ? group.criteria.filter(c => ["Current Ratio", "Quick Ratio", "Cash Ratio"].includes(c.name))
    : [];

  const leverageRatios = group.name === "Financial Strength"
    ? group.criteria.filter(c => [
        "Debt-to-Equity", 
        "Debt Ratio", 
        "Equity Ratio", 
        "Fixed Charge Coverage Ratio",
        "Interest Coverage Ratio"
      ].includes(c.name))
    : [];

  const cashFlowRatios = group.name === "Financial Strength"
    ? group.criteria.filter(c => [
        "Operating Cash Flow Ratio",
        "Debt Service Coverage Ratio"
      ].includes(c.name))
    : [];

  const profitabilityRatios = group.name === "Financial Strength"
    ? group.criteria.filter(c => [
        "Net Profit Margin",
        "Gross Profit Margin",
        "Operating Margin",
        "Return on Assets",
        "Return on Equity"
      ].includes(c.name))
    : [];
  
  const otherCriteria = group.name === "Financial Strength"
    ? group.criteria.filter(c => 
        !["Current Ratio", "Quick Ratio", "Cash Ratio"].includes(c.name) &&
        !["Debt-to-Equity", "Debt Ratio", "Equity Ratio", "Fixed Charge Coverage Ratio", "Interest Coverage Ratio"].includes(c.name) &&
        !["Operating Cash Flow Ratio", "Debt Service Coverage Ratio"].includes(c.name) &&
        !["Net Profit Margin", "Gross Profit Margin", "Operating Margin", "Return on Assets", "Return on Equity"].includes(c.name)
      )
    : group.criteria;

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
                  updateCriterionWeight={updateCriterionWeight}
                  updateCriterionScore={updateCriterionScore}
                  updateCriterionRange={updateCriterionRange}
                  updateActualMetricValue={updateActualMetricValue}
                  toggleCriterionEnabled={toggleCriterionEnabled}
                  getScoreColor={getScoreColor}
                  getScoreBackground={getScoreBackground}
                />
              )}
              
              {group.name === "Financial Strength" && leverageRatios.length > 0 && (
                <LeverageRatiosSection
                  criteria={leverageRatios}
                  groupIndex={groupIndex}
                  updateCriterionWeight={updateCriterionWeight}
                  updateCriterionScore={updateCriterionScore}
                  updateCriterionRange={updateCriterionRange}
                  updateActualMetricValue={updateActualMetricValue}
                  toggleCriterionEnabled={toggleCriterionEnabled}
                  getScoreColor={getScoreColor}
                  getScoreBackground={getScoreBackground}
                />
              )}

              {group.name === "Financial Strength" && cashFlowRatios.length > 0 && (
                <CashFlowRatiosSection
                  criteria={cashFlowRatios}
                  groupIndex={groupIndex}
                  updateCriterionWeight={updateCriterionWeight}
                  updateCriterionScore={updateCriterionScore}
                  updateCriterionRange={updateCriterionRange}
                  updateActualMetricValue={updateActualMetricValue}
                  toggleCriterionEnabled={toggleCriterionEnabled}
                  getScoreColor={getScoreColor}
                  getScoreBackground={getScoreBackground}
                />
              )}

              {group.name === "Financial Strength" && profitabilityRatios.length > 0 && (
                <ProfitabilityRatiosSection
                  criteria={profitabilityRatios}
                  groupIndex={groupIndex}
                  updateCriterionWeight={updateCriterionWeight}
                  updateCriterionScore={updateCriterionScore}
                  updateCriterionRange={updateCriterionRange}
                  updateActualMetricValue={updateActualMetricValue}
                  toggleCriterionEnabled={toggleCriterionEnabled}
                  getScoreColor={getScoreColor}
                  getScoreBackground={getScoreBackground}
                />
              )}

              {otherCriteria.map((criterion, criterionIndex) => (
                <CriterionItem
                  key={criterionIndex}
                  criterion={criterion}
                  criterionIndex={criterionIndex + 
                    (group.name === "Financial Strength" ? 
                      liquidityRatios.length + leverageRatios.length + cashFlowRatios.length + profitabilityRatios.length : 
                      0
                    )}
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
