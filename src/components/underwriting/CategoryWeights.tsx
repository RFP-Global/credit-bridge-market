import { useState, useEffect } from "react";
import { toast } from "sonner";
import { CriteriaGroup } from "./types";
import { CategoryWeightsHeader } from "./CategoryWeightsHeader";
import { CategoryWeightEditForm } from "./CategoryWeightEditForm";
import { CategoryWeightItem } from "./CategoryWeightItem";
import { calculateEditAllTotal, validateEditWeights } from "./utils/editWeightsUtils";

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
    const total = criteriaGroups.reduce((sum, group) => sum + group.weight, 0);
    setTotalWeight(total);
    
    setInputValues(
      criteriaGroups.reduce((acc, group, index) => {
        acc[index] = group.weight.toString();
        return acc;
      }, {} as { [key: number]: string })
    );
    
    setEditAllValues(
      criteriaGroups.reduce((acc, group, index) => {
        acc[index] = group.weight.toString();
        return acc;
      }, {} as { [key: number]: string })
    );
  }, [criteriaGroups]);

  const handleInputChange = (groupIndex: number, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [groupIndex]: value
    }));
  };

  const handleInputBlur = (groupIndex: number) => {
    const numValue = parseInt(inputValues[groupIndex], 10);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 99) {
      updateGroupWeight(groupIndex, numValue);
    } else {
      setInputValues((prev) => ({
        ...prev,
        [groupIndex]: criteriaGroups[groupIndex].weight.toString()
      }));
      
      if (isNaN(numValue)) {
        toast.error("Please enter a valid number");
      } else if (numValue < 1 || numValue > 99) {
        toast.error("Weight must be between 1% and 99%");
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

  const handleSaveAllWeights = () => {
    if (!validateEditWeights(editAllValues)) {
      return;
    }
    
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

  const toggleLock = (groupIndex: number) => {
    const group = criteriaGroups[groupIndex];
    if (!group.locked && totalWeight !== 100) {
      toast.error("Total weight must be 100% before locking a category");
      return;
    }
    
    const newGroups = [...criteriaGroups];
    newGroups[groupIndex] = {
      ...newGroups[groupIndex],
      locked: !newGroups[groupIndex].locked
    };
    
    setInputValues((prev) => ({
      ...prev,
      [groupIndex]: newGroups[groupIndex].weight.toString()
    }));
    
    toast.success(`${group.name} weight ${group.locked ? 'unlocked' : 'locked'}`);
  };

  const editAllTotal = calculateEditAllTotal(editAllValues);

  return (
    <div>
      <CategoryWeightsHeader 
        totalWeight={totalWeight}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleCancelEdit={handleCancelEdit}
        handleSaveAllWeights={handleSaveAllWeights}
        editAllTotal={editAllTotal}
      />
      
      {isEditing ? (
        <CategoryWeightEditForm 
          criteriaGroups={criteriaGroups}
          editAllValues={editAllValues}
          handleEditAllChange={handleEditAllChange}
          handleSaveAllWeights={handleSaveAllWeights}
          handleCancelEdit={handleCancelEdit}
        />
      ) : null}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {criteriaGroups.map((group, groupIndex) => (
          <CategoryWeightItem
            key={group.name}
            group={group}
            groupIndex={groupIndex}
            inputValue={inputValues[groupIndex]}
            handleInputChange={handleInputChange}
            handleInputBlur={handleInputBlur}
            handleKeyDown={handleKeyDown}
            updateGroupWeight={(groupIndex, newWeight) => {
              if (!group.locked) {
                updateGroupWeight(groupIndex, newWeight);
              }
            }}
            getScoreColor={getScoreColor}
            toggleLock={toggleLock}
          />
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
