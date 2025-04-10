
import { Input } from "@/components/ui/input";
import { CriteriaGroup } from "./types";
import { Button } from "@/components/ui/button";
import { calculateEditAllTotal, validateEditWeights } from "./utils/editWeightsUtils";
import { toast } from "sonner";

interface CategoryWeightEditFormProps {
  criteriaGroups: CriteriaGroup[];
  editAllValues: { [key: number]: string };
  handleEditAllChange: (groupIndex: number, value: string) => void;
  handleSaveAllWeights: () => void;
  handleCancelEdit: () => void;
}

export const CategoryWeightEditForm = ({
  criteriaGroups,
  editAllValues,
  handleEditAllChange,
  handleSaveAllWeights,
  handleCancelEdit,
}: CategoryWeightEditFormProps) => {
  const totalWeight = calculateEditAllTotal(editAllValues);
  
  return (
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
      <div className="flex items-center gap-1 mt-4 justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          className="h-6 text-xs"
          onClick={handleCancelEdit}
        >
          Cancel
        </Button>
        <Button 
          variant={totalWeight === 100 ? "default" : "destructive"}
          size="sm" 
          className="h-6 text-xs"
          onClick={handleSaveAllWeights}
        >
          Save ({totalWeight}%)
        </Button>
      </div>
    </div>
  );
};
