
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CategoryWeightsHeaderProps {
  totalWeight: number;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  handleCancelEdit: () => void;
  handleSaveAllWeights: () => void;
  editAllTotal: number;
}

export const CategoryWeightsHeader = ({
  totalWeight,
  isEditing,
  setIsEditing,
  handleCancelEdit,
  handleSaveAllWeights,
  editAllTotal
}: CategoryWeightsHeaderProps) => {
  return (
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
              variant={editAllTotal === 100 ? "default" : "destructive"}
              size="sm" 
              className="h-6 text-xs"
              onClick={handleSaveAllWeights}
            >
              Save ({editAllTotal}%)
            </Button>
          </div>
        )}
      </div>
    </h3>
  );
};
