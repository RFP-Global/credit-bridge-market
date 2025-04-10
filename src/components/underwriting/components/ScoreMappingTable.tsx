
import { ScoreRange } from "../types";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface ScoreMappingTableProps {
  scoreMapping: ScoreRange[];
  getScoreColor: (score: number) => string;
  actualUnit?: string;
}

export const ScoreMappingTable = ({ scoreMapping, getScoreColor, actualUnit }: ScoreMappingTableProps) => {
  return (
    <div className="w-full">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-gray-900/60">
            <th className="py-1.5 px-2 text-left border-b border-gray-700">Range</th>
            <th className="py-1.5 px-2 text-left border-b border-gray-700">Score</th>
          </tr>
        </thead>
        <tbody>
          {scoreMapping.map((range, idx) => (
            <tr key={`mapping-row-${idx}`} className="border-b border-gray-800/40 last:border-0">
              <td className="py-1.5 px-2">
                {idx === 0 ? 
                  `≤ ${range.max}${actualUnit || ''}` : 
                  idx === scoreMapping.length - 1 ? 
                  `> ${range.min}${actualUnit || ''}` : 
                  `${range.min} - ${range.max}${actualUnit || ''}`}
              </td>
              <td className={`py-1.5 px-2 ${getScoreColor(range.score)}`}>
                {range.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
