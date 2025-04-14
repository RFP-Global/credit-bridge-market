
import { RatioGroup } from "../ratio-groups/RatioGroup";

interface RatioDetailsGridProps {
  ratioGroups: Array<{
    title: string;
    description: string;
    ratios: Array<{
      name: string;
      value: number;
      formula: string;
      weight: number;
      score: number;
    }>;
  }>;
}

const RatioDetailsGrid = ({ ratioGroups }: RatioDetailsGridProps) => {
  return (
    <div className="grid gap-6">
      {ratioGroups.map((group, index) => (
        <RatioGroup
          key={index}
          title={group.title}
          description={group.description}
          ratios={group.ratios}
        />
      ))}
    </div>
  );
};

export default RatioDetailsGrid;
