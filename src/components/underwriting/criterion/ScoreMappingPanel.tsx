
import React from "react";
import { ScoreMappingTable } from "./ScoreMappingTable";
import { ScoreRange } from "../types";

interface ScoreMappingPanelProps {
  scoreMapping: ScoreRange[];
  unit?: string;
  getScoreColor: (score: number) => string;
}

export const ScoreMappingPanel: React.FC<ScoreMappingPanelProps> = ({
  scoreMapping,
  unit,
  getScoreColor,
}) => {
  return (
    <div className="space-y-2 mt-6">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Score Mapping</span>
      </div>
      <ScoreMappingTable 
        scoreMapping={scoreMapping}
        unit={unit}
        getScoreColor={getScoreColor}
      />
    </div>
  );
};
