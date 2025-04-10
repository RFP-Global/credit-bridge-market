
interface MetricRangeInfoProps {
  actualMin?: number;
  actualMax?: number;
  actualUnit?: string;
}

export const MetricRangeInfo = ({
  actualMin,
  actualMax,
  actualUnit,
}: MetricRangeInfoProps) => {
  if (actualMin === undefined || actualMax === undefined) {
    return null;
  }
  
  return (
    <div className="text-xs text-muted-foreground mt-2">
      <span>Range: {actualMin} - {actualMax} {actualUnit || ''}</span>
    </div>
  );
};
