
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface MetricRangeInputsProps {
  minInputValue: string;
  maxInputValue: string;
  actualUnit?: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  onRangeUpdate: () => void;
}

export const MetricRangeInputs = ({
  minInputValue,
  maxInputValue,
  actualUnit,
  onMinChange,
  onMaxChange,
  onRangeUpdate
}: MetricRangeInputsProps) => {
  return (
    <div className="flex items-center gap-3 mt-2">
      <div className="flex flex-1 items-center gap-2">
        <span className="text-xs text-muted-foreground">Min:</span>
        <Input
          value={minInputValue}
          onChange={(e) => onMinChange(e.target.value)}
          className="h-7 text-xs"
          placeholder={`Min ${actualUnit || ''}`}
        />
      </div>
      <div className="flex flex-1 items-center gap-2">
        <span className="text-xs text-muted-foreground">Max:</span>
        <Input
          value={maxInputValue}
          onChange={(e) => onMaxChange(e.target.value)}
          className="h-7 text-xs"
          placeholder={`Max ${actualUnit || ''}`}
        />
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        className="h-7 text-xs"
        onClick={onRangeUpdate}
      >
        Set Range
      </Button>
    </div>
  );
};
