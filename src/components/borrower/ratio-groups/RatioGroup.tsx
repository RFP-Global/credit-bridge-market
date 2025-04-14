
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RatioItemProps {
  name: string;
  value: number;
  score: number;
  formula: string;
  weight: number;
}

interface RatioGroupProps {
  title: string;
  description: string;
  ratios: RatioItemProps[];
}

export const RatioGroup = ({ title, description, ratios }: RatioGroupProps) => {
  const formatRatioValue = (value: number) => {
    return value.toFixed(2);
  };

  return (
    <Card className="bg-black/40 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <span>{title}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {ratios.map((ratio, index) => (
          <div key={index} className="space-y-4 p-4 rounded-lg bg-gray-900/30">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold flex items-center gap-2">
                  {ratio.name}
                  <span className="text-primary font-mono text-sm">
                    ({formatRatioValue(ratio.value)})
                  </span>
                </h4>
                <p className="text-sm text-gray-400 mt-1 font-mono">{ratio.formula}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Score: {ratio.score.toFixed(1)} / 10</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-400">Weight:</div>
              <div className="h-2 flex-1 rounded-full bg-gray-800">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${ratio.weight}%` }}
                />
              </div>
              <div className="text-sm font-semibold">{ratio.weight}%</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
