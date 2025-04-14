import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { CriterionWeight } from "./criterion/CriterionWeight";
import { CriterionHeader } from "./criterion/CriterionHeader";
import { ScoreRange } from "./criterion/ScoreRange";
import { PreferredRange } from "./criterion/PreferredRange";
import { ScoreMappingPanel } from "./criterion/ScoreMappingPanel";
import { SubRatioPreferences } from "./criterion/SubRatioPreferences";

interface CriterionItemProps {
  criterion: {
    id?: string;
    name: string;
    description: string;
    value: string;
    weight: number;
    minScore: number;
    maxScore: number;
    min: number;
    max: number;
    step: number;
    unit?: string;
    enabled: boolean;
    scoreMapping: {
      min: number;
      max: number;
      score: number;
      riskLevel?: string;
    }[];
    preferredMin?: number;
    preferredMax?: number;
    actualMin?: number;
    actualMax?: number;
    actualValue?: number;
    actualUnit?: string;
    subcriteria?: {
      name: string;
      description: string;
      target: string;
      weight: number;
    }[];
  };
  groupIndex: number;
  criterionIndex: number;
  updateCriterionWeight: (groupIndex: number, criterionIndex: number, newWeight: number) => void;
  updateCriterionScore: (groupIndex: number, criterionIndex: number, minScore: number, maxScore: number) => void;
  updateCriterionRange: (groupIndex: number, criterionIndex: number, min: number, max: number) => void;
  updateActualMetricValue: (groupIndex: number, criterionIndex: number, value: number) => void;
  toggleCriterionEnabled: (groupIndex: number, criterionIndex: number, enabled: boolean) => void;
  getScoreColor: (score: number) => string;
  getScoreBackground: (score: number) => string;
}

export const CriterionItem: React.FC<CriterionItemProps> = ({
  criterion,
  groupIndex,
  criterionIndex,
  updateCriterionWeight,
  updateCriterionScore,
  updateCriterionRange,
  updateActualMetricValue,
  toggleCriterionEnabled,
  getScoreColor,
  getScoreBackground,
}) => {
  const [isSubRatioDialogOpen, setIsSubRatioDialogOpen] = useState(false);
  const [rangeValues, setRangeValues] = useState([
    criterion.preferredMin || criterion.min,
    criterion.preferredMax || criterion.max
  ]);

  const handleSubRatioScoreUpdate = (subRatioIndex: number, minScore: string, maxScore: string) => {
    const newSubcriteria = [...(criterion.subcriteria || [])];
    if (newSubcriteria[subRatioIndex]) {
      updateCriterionScore(
        groupIndex,
        criterionIndex,
        Number(minScore),
        Number(maxScore)
      );
    }
  };

  const isLiquidityRatios = criterion.name === "Liquidity Ratios";

  return (
    <Card className={`bg-black/40 border-gray-800 relative overflow-hidden ${
      criterion.enabled ? "" : "opacity-50"
    }`}>
      <div className="p-4 border-b border-gray-800">
        <CriterionHeader
          criterion={criterion}
          groupIndex={groupIndex}
          criterionIndex={criterionIndex}
          toggleCriterionEnabled={toggleCriterionEnabled}
          getScoreColor={getScoreColor}
        />
      </div>

      <div className="p-4 space-y-6">
        {isLiquidityRatios && criterion.subcriteria && (
          <div 
            className="cursor-pointer p-4 rounded-lg bg-black/20 hover:bg-black/30 transition-colors"
            onClick={() => setIsSubRatioDialogOpen(true)}
          >
            <h4 className="text-sm font-medium mb-2">Configure Sub-Ratios</h4>
            <div className="grid grid-cols-3 gap-4">
              {criterion.subcriteria.map((subratio) => (
                <div key={subratio.name} className="text-xs text-muted-foreground">
                  {subratio.name}
                </div>
              ))}
            </div>
          </div>
        )}

        <ScoreRange
          minScore={criterion.minScore.toString()}
          maxScore={criterion.maxScore.toString()}
          onMinScoreValueChange={(e) => {
            const newMinScore = parseFloat(e.target.value);
            updateCriterionScore(
              groupIndex,
              criterionIndex,
              newMinScore,
              criterion.maxScore
            );
          }}
          onMaxScoreValueChange={(e) => {
            const newMaxScore = parseFloat(e.target.value);
            updateCriterionScore(
              groupIndex,
              criterionIndex,
              criterion.minScore,
              newMaxScore
            );
          }}
          onScoreRangeUpdate={() => updateCriterionScore(
            groupIndex,
            criterionIndex,
            criterion.minScore,
            criterion.maxScore
          )}
        />

        <PreferredRange
          min={criterion.min}
          max={criterion.max}
          step={criterion.step}
          unit={criterion.unit}
          preferredMin={criterion.preferredMin}
          preferredMax={criterion.preferredMax}
          rangeValues={rangeValues}
          onRangeUpdate={(min, max) => {
            updateCriterionRange(
              groupIndex,
              criterionIndex,
              parseFloat(min),
              parseFloat(max)
            );
          }}
          onRangeSliderUpdate={setRangeValues}
          minValue={criterion.preferredMin?.toString() || ""}
          maxValue={criterion.preferredMax?.toString() || ""}
          onMinValueChange={(e) => {
            const newMin = parseFloat(e.target.value);
            updateCriterionRange(
              groupIndex,
              criterionIndex,
              newMin,
              criterion.preferredMax || 0
            );
          }}
          onMaxValueChange={(e) => {
            const newMax = parseFloat(e.target.value);
            updateCriterionRange(
              groupIndex,
              criterionIndex,
              criterion.preferredMin || 0,
              newMax
            );
          }}
        />

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Actual Value</span>
            <span>{criterion.actualValue}{criterion.actualUnit}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2">
              <span className="text-xs text-muted-foreground">Value:</span>
              <Input
                value={criterion.actualValue?.toString() || ""}
                onChange={(e) => {
                  const newValue = parseFloat(e.target.value);
                  updateActualMetricValue(
                    groupIndex,
                    criterionIndex,
                    newValue
                  );
                }}
                className="h-7 text-xs"
                placeholder="Actual value"
              />
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs"
              onClick={() => updateActualMetricValue(
                groupIndex,
                criterionIndex,
                criterion.actualValue || 0
              )}
            >
              Set Value
            </Button>
          </div>
        </div>

        <ScoreMappingPanel 
          scoreMapping={criterion.scoreMapping}
          unit={criterion.unit}
          getScoreColor={getScoreColor}
        />

        {isLiquidityRatios && criterion.subcriteria && (
          <SubRatioPreferences
            isOpen={isSubRatioDialogOpen}
            onClose={() => setIsSubRatioDialogOpen(false)}
            criterionName={criterion.name}
            subratios={criterion.subcriteria.map(sub => ({
              ...sub,
              minScore: criterion.minScore.toString(),
              maxScore: criterion.maxScore.toString()
            }))}
            onScoreRangeUpdate={handleSubRatioScoreUpdate}
          />
        )}
      </div>
    </Card>
  );
};
