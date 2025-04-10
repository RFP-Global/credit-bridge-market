
import { ScoreRange } from "../types";
import { ValueSlider } from "./ValueSlider";
import { RangeValueSlider } from "./RangeValueSlider";
import { MetricRangeInfo } from "./MetricRangeInfo";

interface MetricSliderProps {
  actualValue?: number;
  actualMinValue?: number;
  actualMaxValue?: number;
  actualMin?: number;
  actualMax?: number;
  actualUnit?: string;
  name: string;
  scoreMapping?: ScoreRange[];
  getScoreColor: (score: number) => string;
  onValueUpdate: (value: number) => void;
  onRangeUpdate?: (min: number, max: number) => void;
}

export const MetricSlider = ({
  actualValue,
  actualMinValue,
  actualMaxValue,
  actualMin,
  actualMax,
  actualUnit,
  name,
  scoreMapping,
  getScoreColor,
  onValueUpdate,
  onRangeUpdate,
}: MetricSliderProps) => {
  // If actualMin or actualMax is undefined, don't render anything
  if (actualMin === undefined || actualMax === undefined) {
    return null;
  }

  // Determine if we're in range mode
  const rangeMode = onRangeUpdate !== undefined;

  return (
    <div className="space-y-2 mt-3">
      {rangeMode ? (
        <RangeValueSlider
          actualMinValue={actualMinValue}
          actualMaxValue={actualMaxValue}
          actualMin={actualMin}
          actualMax={actualMax}
          actualUnit={actualUnit}
          name={name}
          onRangeUpdate={onRangeUpdate}
        />
      ) : (
        <ValueSlider
          actualValue={actualValue}
          actualMin={actualMin}
          actualMax={actualMax}
          actualUnit={actualUnit}
          name={name}
          getScoreColor={getScoreColor}
          onValueUpdate={onValueUpdate}
        />
      )}
      
      <MetricRangeInfo
        actualMin={actualMin}
        actualMax={actualMax}
        actualUnit={actualUnit}
      />
    </div>
  );
};
