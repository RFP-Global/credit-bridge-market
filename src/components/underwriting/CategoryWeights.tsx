
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { CriteriaGroup } from "./types";
import { useState } from "react";

interface CategoryWeightsProps {
  criteriaGroups: CriteriaGroup[];
  updateGroupWeight: (groupIndex: number, newWeight: number) => void;
  getScoreColor: (score: number) => string;
}

export const CategoryWeights = ({
  criteriaGroups,
  updateGroupWeight,
  getScoreColor,
}: CategoryWeightsProps) => {
  const [inputValues, setInputValues] = useState<{ [key: number]: string }>(
    criteriaGroups.reduce((acc, _, index) => {
      acc[index] = criteriaGroups[index].weight.toString();
      return acc;
    }, {} as { [key: number]: string })
  );

  const handleInputChange = (groupIndex: number, value: string) => {
    // Update the input field value
    setInputValues((prev) => ({
      ...prev,
      [groupIndex]: value
    }));
  };

  const handleInputBlur = (groupIndex: number) => {
    const numValue = parseInt(inputValues[groupIndex], 10);
    if (!isNaN(numValue) && numValue >= 5 && numValue <= 50) {
      // Only update if value is valid
      updateGroupWeight(groupIndex, numValue);
    } else {
      // Reset to current weight if invalid
      setInputValues((prev) => ({
        ...prev,
        [groupIndex]: criteriaGroups[groupIndex].weight.toString()
      }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, groupIndex: number) => {
    if (e.key === 'Enter') {
      handleInputBlur(groupIndex);
    }
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center justify-between">
        <span>CATEGORY WEIGHTS</span>
        <Badge variant="outline" className="ml-2 font-mono">100%</Badge>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {criteriaGroups.map((group, groupIndex) => (
          <div key={group.name} className="space-y-1">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">{group.name}</div>
              <div className="flex items-center gap-2">
                <div className={`text-sm font-medium ${getScoreColor((group.minScore + group.maxScore) / 2)}`}>
                  {group.minScore !== undefined && group.maxScore !== undefined ? 
                    `${group.minScore.toFixed(1)}-${group.maxScore.toFixed(1)}` : 
                    "N/A"}
                </div>
                <div className="text-xs text-muted-foreground">{group.weight}%</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-6 w-6"
                onClick={() => updateGroupWeight(groupIndex, Math.max(5, group.weight - 5))}
                disabled={group.weight <= 5}
              >
                <ChevronDown className="h-3 w-3" />
              </Button>
              <Slider
                value={[group.weight]}
                min={5}
                max={50}
                step={5}
                className="flex-1"
                onValueChange={(value) => updateGroupWeight(groupIndex, value[0])}
              />
              <Input
                type="text"
                value={inputValues[groupIndex]}
                onChange={(e) => handleInputChange(groupIndex, e.target.value)}
                onBlur={() => handleInputBlur(groupIndex)}
                onKeyDown={(e) => handleKeyDown(e, groupIndex)}
                className="w-14 h-6 px-2 py-1 text-xs text-center"
                min={5}
                max={50}
              />
              <Button 
                variant="outline" 
                size="icon"
                className="h-6 w-6"
                onClick={() => updateGroupWeight(groupIndex, Math.min(50, group.weight + 5))}
                disabled={group.weight >= 50}
              >
                <ChevronUp className="h-3 w-3" />
              </Button>
            </div>
            <Progress value={group.weight} className="h-1.5" />
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-800/50 flex items-center justify-between">
        <span className="text-sm font-medium">Total Score Range</span>
        <div className="text-lg font-bold">
          {criteriaGroups.reduce((min, group) => min + group.minScore * group.weight / 100, 0).toFixed(1)}-
          {criteriaGroups.reduce((max, group) => max + group.maxScore * group.weight / 100, 0).toFixed(1)}
        </div>
      </div>
    </div>
  );
};
