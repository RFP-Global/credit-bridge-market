
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Criterion } from "../types";
import { toast } from "@/hooks/use-toast";

interface CriterionPreferredRangeProps {
  criterion: Criterion;
  minValue: string;
  maxValue: string;
  rangeValues: number[];
  onMinValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRangeUpdate: () => void;
  onSliderChange: (values: number[]) => void;
}

export const CriterionPreferredRange: React.FC<CriterionPreferredRangeProps> = ({
  criterion,
  minValue,
  maxValue,
  rangeValues,
  onMinValueChange,
  onMaxValueChange,
  onRangeUpdate,
  onSliderChange,
}) => {
  // Helper function to render discrete value labels for integer scales
  const renderValueLabels = () => {
    if (criterion.min === 1 && criterion.max === 3 && criterion.step === 1) {
      return (
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>1 - Low</span>
          <span>2 - Medium</span>
          <span>3 - High</span>
        </div>
      );
    }
    
    return (
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{criterion.min}{criterion.unit || ''}</span>
        <span>{criterion.max}{criterion.unit || ''}</span>
      </div>
    );
  };

  const handleSetRangeWithToast = () => {
    onRangeUpdate();
    toast({
      title: criterion.singleSlider ? "Value updated" : "Range updated",
      description: `Preferred ${criterion.singleSlider ? "value" : "range"} has been set for ${criterion.name}`,
      variant: "default",
    });
  };

  return (
    <div className="mt-3 pt-3 border-t border-border/40">
      <div className="text-xs font-medium mb-2">
        {criterion.singleSlider ? "Preferred Value" : "Preferred Range"} {criterion.unit ? `(${criterion.unit})` : ''}
      </div>
      <div className="mb-3">
        <Slider
          value={criterion.singleSlider ? [Number(minValue)] : rangeValues}
          min={criterion.min || 0}
          max={criterion.max || 100}
          step={criterion.step}
          className="my-4"
          onValueChange={onSliderChange}
        />
        {renderValueLabels()}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2">
          <span className="text-xs text-muted-foreground">{criterion.singleSlider ? "Value:" : "Min:"}</span>
          <Input
            value={minValue}
            onChange={onMinValueChange}
            className="h-7 text-xs bg-secondary/70 border-border/40"
            placeholder={criterion.singleSlider ? `Value ${criterion.unit || ''}` : `Min ${criterion.unit || ''}`}
          />
        </div>
        {!criterion.singleSlider && (
          <div className="flex flex-1 items-center gap-2">
            <span className="text-xs text-muted-foreground">Max:</span>
            <Input
              value={maxValue}
              onChange={onMaxValueChange}
              className="h-7 text-xs bg-secondary/70 border-border/40"
              placeholder={`Max ${criterion.unit || ''}`}
            />
          </div>
        )}
        <Button 
          variant="outline" 
          size="sm" 
          className="h-7 text-xs"
          onClick={handleSetRangeWithToast}
        >
          Set {criterion.singleSlider ? "Value" : "Range"}
        </Button>
      </div>
      {criterion.preferredMin !== undefined && (
        <div className="mt-2 text-xs text-primary">
          Current preferred {criterion.singleSlider ? "value" : "range"}: {criterion.preferredMin}
          {!criterion.singleSlider && criterion.preferredMax !== undefined && ` - ${criterion.preferredMax}`} 
          {criterion.unit || ''}
        </div>
      )}
    </div>
  );
};
