
import { Lock, Unlock } from "lucide-react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { CriteriaGroup } from "./types";

interface CategoryWeightItemProps {
  group: CriteriaGroup;
  groupIndex: number;
  inputValue: string;
  handleInputChange: (groupIndex: number, value: string) => void;
  handleInputBlur: (groupIndex: number) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, groupIndex: number) => void;
  updateGroupWeight: (groupIndex: number, newWeight: number) => void;
  getScoreColor: (score: number) => string;
  toggleLock?: (groupIndex: number) => void;
}

export const CategoryWeightItem = ({
  group,
  groupIndex,
  inputValue,
  handleInputChange,
  handleInputBlur,
  handleKeyDown,
  updateGroupWeight,
  getScoreColor,
  toggleLock
}: CategoryWeightItemProps) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">{group.name}</div>
        <div className="flex items-center gap-2">
          <div className={`text-sm font-medium ${getScoreColor((group.minScore + group.maxScore) / 2)}`}>
            {group.minScore !== undefined && group.maxScore !== undefined ? 
              `${group.minScore.toFixed(1)}-${group.maxScore.toFixed(1)}` : 
              "N/A"}
          </div>
          <div className="text-xs text-muted-foreground">{group.weight}%</div>
          {toggleLock && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => toggleLock(groupIndex)}
            >
              {group.locked ? (
                <Lock className="h-3 w-3" />
              ) : (
                <Unlock className="h-3 w-3" />
              )}
            </Button>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-6 w-6"
          onClick={() => updateGroupWeight(groupIndex, Math.max(1, group.weight - 1))}
          disabled={group.weight <= 1 || group.locked}
        >
          <ChevronDown className="h-3 w-3" />
        </Button>
        <Slider
          value={[group.weight]}
          min={1}
          max={99}
          step={1}
          className="flex-1"
          onValueChange={(value) => updateGroupWeight(groupIndex, value[0])}
          disabled={group.locked}
        />
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(groupIndex, e.target.value)}
          onBlur={() => handleInputBlur(groupIndex)}
          onKeyDown={(e) => handleKeyDown(e, groupIndex)}
          className="w-14 h-6 px-2 py-1 text-xs text-center"
          min={1}
          max={99}
          disabled={group.locked}
        />
        <Button 
          variant="outline" 
          size="icon"
          className="h-6 w-6"
          onClick={() => updateGroupWeight(groupIndex, Math.min(99, group.weight + 1))}
          disabled={group.weight >= 99 || group.locked}
        >
          <ChevronUp className="h-3 w-3" />
        </Button>
      </div>
      <Progress value={group.weight} className="h-1.5" />
    </div>
  );
};
