
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MetricValueInputProps {
  inputValue: string;
  actualUnit?: string;
  onValueChange: (value: string) => void;
  onValueUpdate: () => void;
}

export const MetricValueInput = ({
  inputValue,
  actualUnit,
  onValueChange,
  onValueUpdate
}: MetricValueInputProps) => {
  return (
    <div className="flex items-center gap-3 mt-2">
      <div className="flex flex-1 items-center gap-2">
        <span className="text-xs text-muted-foreground">Value:</span>
        <Input
          value={inputValue}
          onChange={(e) => onValueChange(e.target.value)}
          className="h-7 text-xs"
          placeholder={`Value ${actualUnit || ''}`}
        />
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        className="h-7 text-xs"
        onClick={onValueUpdate}
      >
        Set Value
      </Button>
    </div>
  );
};
