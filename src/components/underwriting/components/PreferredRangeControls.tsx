
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PreferredRangeControlsProps {
  initialMin?: number;
  initialMax?: number;
  unit?: string;
  preferredMin?: number;
  preferredMax?: number;
  onRangeUpdate: (min: number, max: number) => void;
}

export const PreferredRangeControls = ({
  initialMin,
  initialMax,
  unit,
  preferredMin,
  preferredMax,
  onRangeUpdate,
}: PreferredRangeControlsProps) => {
  const [minValue, setMinValue] = useState(initialMin?.toString() || "");
  const [maxValue, setMaxValue] = useState(initialMax?.toString() || "");

  const handleRangeUpdate = () => {
    if (minValue && maxValue) {
      const min = parseFloat(minValue);
      const max = parseFloat(maxValue);
      if (!isNaN(min) && !isNaN(max) && min <= max) {
        onRangeUpdate(min, max);
      }
    }
  };

  return (
    <div className="mt-3 pt-3 border-t border-gray-800/30">
      <div className="text-xs font-medium mb-2">Preferred Range {unit ? `(${unit})` : ''}</div>
      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2">
          <span className="text-xs text-muted-foreground">Min:</span>
          <Input
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
            className="h-7 text-xs"
            placeholder={`Min ${unit || ''}`}
          />
        </div>
        <div className="flex flex-1 items-center gap-2">
          <span className="text-xs text-muted-foreground">Max:</span>
          <Input
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
            className="h-7 text-xs"
            placeholder={`Max ${unit || ''}`}
          />
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-7 text-xs"
          onClick={handleRangeUpdate}
        >
          Set Range
        </Button>
      </div>
      {preferredMin !== undefined && preferredMax !== undefined && (
        <div className="mt-2 text-xs text-blue-400">
          Current preferred range: {preferredMin} - {preferredMax} {unit || ''}
        </div>
      )}
    </div>
  );
};
