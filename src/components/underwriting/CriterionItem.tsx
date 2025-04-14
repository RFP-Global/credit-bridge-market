
import React, { useState, useEffect } from "react";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Criterion, ScoreRange } from "./types";
import { CriterionHeader } from "./criterion-sections/CriterionHeader";
import { CriterionWeight } from "./criterion-sections/CriterionWeight";
import { ScoreRange as ScoreRangeComponent } from "./criterion-sections/ScoreRange";

interface CriterionItemProps {
  criterion: Criterion;
  criterionIndex: number;
  groupIndex: number;
  updateCriterionWeight: (groupIndex: number, criterionIndex: number, newWeight: number) => void;
  updateCriterionScore: (groupIndex: number, criterionIndex: number, minScore: number, maxScore: number) => void;
  toggleCriterionEnabled?: (groupIndex: number, criterionIndex: number, enabled: boolean) => void;
  getScoreColor: (score: number) => string;
  getScoreBackground: (score: number) => string;
}

export const CriterionItem: React.FC<CriterionItemProps> = ({
  criterion,
  criterionIndex,
  groupIndex,
  updateCriterionWeight,
  updateCriterionScore,
  toggleCriterionEnabled,
  getScoreColor,
  getScoreBackground,
}) => {
  const [minScoreValue, setMinScoreValue] = useState(criterion.minScore !== undefined ? criterion.minScore.toString() : "0");
  const [maxScoreValue, setMaxScoreValue] = useState(criterion.maxScore !== undefined ? criterion.maxScore.toString() : "0");

  useEffect(() => {
    if (criterion.minScore !== undefined) {
      setMinScoreValue(criterion.minScore.toString());
    }
    if (criterion.maxScore !== undefined) {
      setMaxScoreValue(criterion.maxScore.toString());
    }
  }, [criterion.minScore, criterion.maxScore]);

  const handleScoreRangeUpdate = () => {
    const minScore = parseFloat(minScoreValue);
    const maxScore = parseFloat(maxScoreValue);
    if (!isNaN(minScore) && !isNaN(maxScore) && minScore <= maxScore) {
      updateCriterionScore(groupIndex, criterionIndex, minScore, maxScore);
    }
  };

  const getActualRange = () => {
    if (!criterion.scoreMapping) return null;

    const minScoreMapping = criterion.scoreMapping.find(r => r.score === Math.floor(criterion.minScore));
    const maxScoreMapping = criterion.scoreMapping.find(r => r.score === Math.ceil(criterion.maxScore));

    if (minScoreMapping && maxScoreMapping) {
      return {
        low: minScoreMapping.min,
        high: maxScoreMapping.max === 100 ? maxScoreMapping.min : maxScoreMapping.max,
        unit: criterion.actualUnit
      };
    }
    return null;
  };

  const renderScoreMappingTable = (scoreMapping: ScoreRange[]) => {
    return (
      <div className="w-full">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-900/60">
              <th className="py-1.5 px-2 text-left border-b border-gray-700">Range</th>
              <th className="py-1.5 px-2 text-left border-b border-gray-700">Score</th>
              {scoreMapping[0].riskLevel && <th className="py-1.5 px-2 text-left border-b border-gray-700">Risk Level</th>}
            </tr>
          </thead>
          <tbody>
            {scoreMapping.map((range, idx) => (
              <tr key={`mapping-row-${idx}`} className="border-b border-gray-800/40 last:border-0">
                <td className="py-1.5 px-2">
                  {idx === 0 ? 
                    `≥ ${range.min}${criterion.actualUnit || ''}` : 
                    idx === scoreMapping.length - 1 ? 
                    `< ${range.min}${criterion.actualUnit || ''}` : 
                    `${range.min} - ${range.max}${criterion.actualUnit || ''}`}
                </td>
                <td className={`py-1.5 px-2 ${getScoreColor(range.score)}`}>
                  {range.score}
                </td>
                {scoreMapping[0].riskLevel && (
                  <td className="py-1.5 px-2 text-gray-300">
                    {range.riskLevel}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className={`space-y-2 border-b border-gray-800/40 pb-4 last:border-0 last:pb-0 ${!criterion.enabled ? 'opacity-60' : ''}`}>
      <CriterionHeader
        criterion={criterion}
        groupIndex={groupIndex}
        criterionIndex={criterionIndex}
        toggleCriterionEnabled={toggleCriterionEnabled}
        avgScore={(criterion.minScore + criterion.maxScore) / 2}
        getScoreColor={getScoreColor}
      />
      
      {criterion.enabled && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CriterionWeight
              weight={criterion.weight}
              onUpdateWeight={(newWeight) => updateCriterionWeight(groupIndex, criterionIndex, newWeight)}
            />
            
            <ScoreRangeComponent
              minScore={minScoreValue}
              maxScore={maxScoreValue}
              actualRange={getActualRange()}
              onMinScoreChange={(e) => setMinScoreValue(e.target.value)}
              onMaxScoreChange={(e) => setMaxScoreValue(e.target.value)}
              onUpdateRange={handleScoreRangeUpdate}
            />
          </div>

          {criterion.scoreMapping && (
            <div className="mt-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="left" className="w-auto max-w-[300px] p-3 bg-gray-950 border border-gray-800">
                  <div className="text-xs font-semibold mb-2 text-gray-300">Score Mapping for {criterion.name}</div>
                  {criterion.scoreMapping && renderScoreMappingTable(criterion.scoreMapping)}
                </PopoverContent>
              </Popover>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export type { CriterionItemProps };
