
import React from 'react';
import { CriteriaGroup } from "./types";

interface CategoryScoreBreakdownProps {
  criteriaGroups: CriteriaGroup[];
  getScoreColor: (score: number) => string;
  getScoreBackground: (score: number) => string;
  totalScore: number;
}

export const CategoryScoreBreakdown: React.FC<CategoryScoreBreakdownProps> = ({
  criteriaGroups,
  getScoreColor,
  getScoreBackground,
  totalScore,
}) => {
  return (
    <div className="lg:col-span-2 p-6">
      <h3 className="text-sm font-medium text-gray-400 mb-4">CATEGORY SCORE BREAKDOWN</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {criteriaGroups.map((group) => (
          <div key={group.name} className="bg-black/30 rounded-md p-3 border border-gray-800/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-primary/10 text-primary">
                  {group.weight}%
                </div>
                <span className="text-sm font-medium">{group.name}</span>
              </div>
              <div className={`text-sm font-bold ${getScoreColor(group.score)}`}>
                {group.score.toFixed(2)}
              </div>
            </div>
            <div className="w-full h-1.5 bg-gray-800/50 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getScoreBackground(group.score)}`}
                style={{ width: `${(group.score / 10) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-800/50 flex items-center justify-between">
        <span className="text-sm font-medium">Total Score</span>
        <div className={`text-lg font-bold ${getScoreColor(totalScore)}`}>
          {totalScore.toFixed(2)}
        </div>
      </div>
    </div>
  );
};
