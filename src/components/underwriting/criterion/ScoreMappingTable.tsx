
import React from "react";
import { ScoreRange } from "../types";

interface ScoreMappingTableProps {
  scoreMapping: ScoreRange[];
  unit?: string;
  getScoreColor: (score: number) => string;
}

export const ScoreMappingTable: React.FC<ScoreMappingTableProps> = ({
  scoreMapping,
  unit,
  getScoreColor,
}) => {
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
                  `≥ ${range.min}${unit || ''}` : 
                  idx === scoreMapping.length - 1 ? 
                  `< ${range.min}${unit || ''}` : 
                  `${range.min} - ${range.max}${unit || ''}`}
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
