
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CategoryDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryName: string;
  categoryScore: number;
  components: {
    name: string;
    score: number;
    description?: string;
  }[];
}

const CategoryDetailsModal: React.FC<CategoryDetailsModalProps> = ({
  open,
  onOpenChange,
  categoryName,
  categoryScore,
  components,
}) => {
  const getScoreColorClass = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-blue-500";
    if (score >= 40) return "text-yellow-500";
    return "text-red-500";
  };

  const getProgressColorClass = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-blue-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/80 border border-gray-800 max-w-2xl">
        <DialogHeader className="border-b border-gray-800 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg">{categoryName} Details</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription className="mt-2">
            Overall Category Score: <span className={getScoreColorClass(categoryScore)}>{categoryScore}%</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="grid gap-4">
            {components.map((component, index) => (
              <div key={index} className="border border-gray-800 rounded-md p-4 bg-black/40">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">{component.name}</div>
                  <div className={`font-semibold ${getScoreColorClass(component.score)}`}>
                    {component.score}%
                  </div>
                </div>
                
                {component.description && (
                  <p className="text-sm text-gray-400 mb-3">{component.description}</p>
                )}
                
                <Progress 
                  value={component.score} 
                  className="h-2" 
                />
                
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDetailsModal;
