
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CriteriaGroup } from "./types";

interface RiskScoreBreakdownProps {
  criteriaGroups: CriteriaGroup[];
  getScoreColor: (score: number) => string;
  getScoreBackground: (score: number) => string;
}

export const RiskScoreBreakdown = ({
  criteriaGroups,
  getScoreColor,
  getScoreBackground,
}: RiskScoreBreakdownProps) => {
  return (
    <Card className="w-full md:w-2/3 bg-black/40 border-gray-800">
      <CardHeader className="pb-2 border-b border-gray-800">
        <CardTitle className="text-sm font-mono">RISK SCORE BREAKDOWN</CardTitle>
        <CardDescription>
          Current risk score calculation based on category weights
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {criteriaGroups.map((group) => (
            <div key={group.name} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium bg-primary/10">
                {group.weight}%
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm font-medium">{group.name}</div>
                  <div className={`text-sm font-bold ${getScoreColor(group.score)}`}>
                    {group.score.toFixed(2)}
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-800/50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getScoreBackground(group.score)}`}
                    style={{ width: `${(group.score / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
