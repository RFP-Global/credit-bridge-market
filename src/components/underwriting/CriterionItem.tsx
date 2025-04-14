import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { CriterionWeight } from "./criterion/CriterionWeight";
import { ScoreMappingTable } from "./criterion/ScoreMappingTable";
import { SubRatioPreferences } from "./criterion/SubRatioPreferences";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

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

  const handleSubRatioScoreUpdate = (subRatioIndex: number, minScore: string, maxScore: string) => {
    // Update the score for the specific sub-ratio
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
      <div className="absolute top-2 right-2">
        <Checkbox
          id={`criterion-${criterionIndex}`}
          checked={criterion.enabled}
          onCheckedChange={(checked) => toggleCriterionEnabled(groupIndex, criterionIndex, !!checked)}
        />
      </div>

      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-medium">{criterion.name}</h3>
            <p className="text-xs text-muted-foreground">{criterion.description}</p>
          </div>
          <CriterionWeight
            weight={criterion.weight}
            groupIndex={groupIndex}
            criterionIndex={criterionIndex}
            updateCriterionWeight={updateCriterionWeight}
          />
        </div>
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

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Score Range</span>
            <span>{criterion.minScore}-{criterion.maxScore}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2">
              <span className="text-xs text-muted-foreground">Min:</span>
              <Input
                value={criterion.minScore.toString()}
                onChange={(e) => {
                  const newMinScore = parseFloat(e.target.value);
                  updateCriterionScore(
                    groupIndex,
                    criterionIndex,
                    newMinScore,
                    criterion.maxScore
                  );
                }}
                className="h-7 text-xs"
                placeholder="Min score"
              />
            </div>
            <div className="flex flex-1 items-center gap-2">
              <span className="text-xs text-muted-foreground">Max:</span>
              <Input
                value={criterion.maxScore.toString()}
                onChange={(e) => {
                  const newMaxScore = parseFloat(e.target.value);
                  updateCriterionScore(
                    groupIndex,
                    criterionIndex,
                    criterion.minScore,
                    newMaxScore
                  );
                }}
                className="h-7 text-xs"
                placeholder="Max score"
              />
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs"
              onClick={() => updateCriterionScore(
                groupIndex,
                criterionIndex,
                criterion.minScore,
                criterion.maxScore
              )}
            >
              Set Score
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Preferred Range</span>
            <span>{criterion.preferredMin}-{criterion.preferredMax}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2">
              <span className="text-xs text-muted-foreground">Min:</span>
              <Input
                value={criterion.preferredMin?.toString() || ""}
                onChange={(e) => {
                  const newMin = parseFloat(e.target.value);
                  updateCriterionRange(
                    groupIndex,
                    criterionIndex,
                    newMin,
                    criterion.preferredMax || 0
                  );
                }}
                className="h-7 text-xs"
                placeholder="Min range"
              />
            </div>
            <div className="flex flex-1 items-center gap-2">
              <span className="text-xs text-muted-foreground">Max:</span>
              <Input
                value={criterion.preferredMax?.toString() || ""}
                onChange={(e) => {
                  const newMax = parseFloat(e.target.value);
                  updateCriterionRange(
                    groupIndex,
                    criterionIndex,
                    criterion.preferredMin || 0,
                    newMax
                  );
                }}
                className="h-7 text-xs"
                placeholder="Max range"
              />
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs"
              onClick={() => updateCriterionRange(
                groupIndex,
                criterionIndex,
                criterion.min,
                criterion.max
              )}
            >
              Set Range
            </Button>
          </div>
        </div>

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

        <ScoreMappingTable 
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
