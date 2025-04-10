
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { CriteriaGroup } from "./types";
import { useState, useEffect } from "react";
import { toast } from "sonner";

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
  
  const [totalWeight, setTotalWeight] = useState<number>(
    criteriaGroups.reduce((sum, group) => sum + group.weight, 0)
  );

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editAllValues, setEditAllValues] = useState<{ [key: number]: string }>(
    criteriaGroups.reduce((acc, group, index) => {
      acc[index] = group.weight.toString();
      return acc;
    }, {} as { [key: number]: string })
  );

  useEffect(() => {
    // Update total weight when criteriaGroups change
    const total = criteriaGroups.reduce((sum, group) => sum + group.weight, 0);
    setTotalWeight(total);
    
    // Update input values when criteriaGroups change
    setInputValues(
      criteriaGroups.reduce((acc, group, index) => {
        acc[index] = group.weight.toString();
        return acc;
      }, {} as { [key: number]: string })
    );
    
    // Update edit all values when criteriaGroups change
    setEditAllValues(
      criteriaGroups.reduce((acc, group, index) => {
        acc[index] = group.weight.toString();
        return acc;
      }, {} as { [key: number]: string })
    );
  }, [criteriaGroups]);

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
      
      if (isNaN(numValue)) {
        toast.error("Please enter a valid number");
      } else if (numValue < 5 || numValue > 50) {
        toast.error("Weight must be between 5% and 50%");
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, groupIndex: number) => {
    if (e.key === 'Enter') {
      handleInputBlur(groupIndex);
    }
  };

  const handleEditAllChange = (groupIndex: number, value: string) => {
    setEditAllValues((prev) => ({
      ...prev,
      [groupIndex]: value
    }));
  };

  const calculateEditAllTotal = () => {
    return Object.values(editAllValues).reduce((sum, value) => {
      const numValue = parseInt(value, 10);
      return sum + (isNaN(numValue) ? 0 : numValue);
    }, 0);
  };

  const handleSaveAllWeights = () => {
    const editAllTotal = calculateEditAllTotal();
    
    if (editAllTotal !== 100) {
      toast.error("Total weights must sum to 100%");
      return;
    }
    
    // Check if all values are valid (between 5 and 50)
    const hasInvalidValues = Object.values(editAllValues).some(value => {
      const numValue = parseInt(value, 10);
      return isNaN(numValue) || numValue < 5 || numValue > 50;
    });
    
    if (hasInvalidValues) {
      toast.error("All weights must be between 5% and 50%");
      return;
    }
    
    // Apply all changes one by one
    Object.entries(editAllValues).forEach(([indexStr, valueStr]) => {
      const groupIndex = parseInt(indexStr, 10);
      const newWeight = parseInt(valueStr, 10);
      updateGroupWeight(groupIndex, newWeight);
    });
    
    setIsEditing(false);
    toast.success("Category weights updated successfully");
  };

  const handleCancelEdit = () => {
    setEditAllValues(
      criteriaGroups.reduce((acc, group, index) => {
        acc[index] = group.weight.toString();
        return acc;
      }, {} as { [key: number]: string })
    );
    setIsEditing(false);
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center justify-between">
        <span>CATEGORY WEIGHTS</span>
        <div className="flex items-center gap-2">
          <Badge 
            variant={totalWeight === 100 ? "outline" : "destructive"} 
            className="font-mono"
          >
            {totalWeight}%
          </Badge>
          {!isEditing ? (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-6 text-xs"
              onClick={() => setIsEditing(true)}
            >
              Edit All
            </Button>
          ) : (
            <div className="flex items-center gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-6 text-xs"
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
              <Button 
                variant={calculateEditAllTotal() === 100 ? "default" : "destructive"}
                size="sm" 
                className="h-6 text-xs"
                onClick={handleSaveAllWeights}
              >
                Save ({calculateEditAllTotal()}%)
              </Button>
            </div>
          )}
        </div>
      </h3>
      
      {isEditing ? (
        <div className="bg-gray-900/50 p-4 rounded-md mb-4 border border-gray-800">
          <div className="mb-2 text-sm text-gray-400">Edit all category weights (total must equal 100%)</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {criteriaGroups.map((group, groupIndex) => (
              <div key={group.name} className="flex items-center gap-3">
                <div className="text-sm font-medium flex-grow">{group.name}</div>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={editAllValues[groupIndex]}
                    onChange={(e) => handleEditAllChange(groupIndex, e.target.value)}
                    className="w-16 h-8 px-2 py-1 text-sm text-center"
                  />
                  <div className="text-xs text-muted-foreground">%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      
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
