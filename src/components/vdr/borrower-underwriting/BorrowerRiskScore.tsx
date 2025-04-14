
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomBadge } from "@/components/ui/custom-badge";
import { Progress } from "@/components/ui/progress";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BorrowerRiskScoreProps {
  riskScore: number | null;
  riskLevel: { label: string; color: string } | null;
}

export const BorrowerRiskScore = ({ riskScore, riskLevel }: BorrowerRiskScoreProps) => {
  return (
    <Card className="bg-black/40 border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-mono">RISK SCORE</CardTitle>
        {riskScore && riskLevel && (
          <div className="flex items-center gap-3">
            <div className="text-xl font-bold">{riskScore.toFixed(2)}</div>
            <CustomBadge variant="outline" className={`${riskLevel.color}`}>
              {riskLevel.label}
            </CustomBadge>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 cursor-help">
                    <Info className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">Score Scale</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="text-xs">
                    1-4.99: High Risk<br />
                    5-6.99: Medium-High Risk<br />
                    7-8.99: Moderate Risk<br />
                    9-10: Low Risk
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {riskScore && (
            <Progress 
              value={(riskScore / 10) * 100} 
              className="h-2 bg-gray-800"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
