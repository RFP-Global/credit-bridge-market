
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CriterionScoreProps {
  score: number;
  onScoreUpdate: (score: number) => void;
}

export const CriterionScore = ({
  score,
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
