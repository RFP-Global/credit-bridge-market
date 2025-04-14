
import { Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { CriteriaGroup } from "./types";
import PreferredRangeControls from "./PreferredRangeControls";
import { useState } from "react";

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
  const [minValue, setMinValue] = useState(group.minScore.toString());
  const [maxValue, setMaxValue] = useState(group.maxScore.toString());
  const [rangeValues, setRangeValues] = useState<number[]>([
    group.minScore,
    group.maxScore
  ]);

  const handleRangeUpdate = () => {
    const min = parseFloat(minValue);
    const max = parseFloat(maxValue);
    if (!isNaN(min) && !isNaN(max) && min <= max && min >= 1 && max <= 10) {
      group.minScore = parseFloat(min.toFixed(1));
      group.maxScore = parseFloat(max.toFixed(1));
      setRangeValues([min, max]);
      updateGroupWeight(groupIndex, group.weight);
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">{group.name}</div>
        <div className="flex items-center gap-2">
          <div className={`text-sm font-medium ${getScoreColor((group.minScore + group.maxScore) / 2)}`}>
            {group.minScore.toFixed(1)}-{group.maxScore.toFixed(1)}
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

      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-6 w-6"
            onClick={() => updateGroupWeight(groupIndex, Math.max(1, group.weight - 1))}
            disabled={group.weight <= 1 || group.locked}
          >
            -
          </Button>
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
            +
          </Button>
        </div>

        <PreferredRangeControls
          minValue={minValue}
          maxValue={maxValue}
          onMinChange={setMinValue}
          onMaxChange={setMaxValue}
          onSliderChange={(values) => {
            setRangeValues(values);
            setMinValue(values[0].toFixed(1));
            setMaxValue(values[1].toFixed(1));
          }}
          onUpdateRange={handleRangeUpdate}
          sliderValue={rangeValues}
          min={1}
          max={10}
        />
      </div>
      
      <Progress value={group.weight} className="h-1.5" />
    </div>
  );
};

