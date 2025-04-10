
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CriterionScoreProps {
  score: number;
  getScoreColor: (score: number) => string;
  getScoreBackground: (score: number) => string;
  onScoreUpdate: (score: number) => void;
}

export const CriterionScore = ({
  score,
  getScoreColor,
  getScoreBackground,
  onScoreUpdate,
}: CriterionScoreProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Risk Score</span>
        <span>{score} / 10</span>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-6 w-6"
          onClick={() => onScoreUpdate(Math.max(1, score - 1))}
          disabled={score <= 1}
        >
          <ChevronDown className="h-3 w-3" />
        </Button>
        <div className="flex-1 flex">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <button
              key={value}
              className={`h-6 flex-1 border-r last:border-r-0 border-gray-800 transition-colors ${
                score >= value 
                  ? getScoreBackground(value)
                  : 'bg-gray-800/30'
              }`}
              onClick={() => onScoreUpdate(value)}
            />
          ))}
        </div>
        <Button 
          variant="outline" 
          size="icon"
          className="h-6 w-6"
          onClick={() => onScoreUpdate(Math.min(10, score + 1))}
          disabled={score >= 10}
        >
          <ChevronUp className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};
