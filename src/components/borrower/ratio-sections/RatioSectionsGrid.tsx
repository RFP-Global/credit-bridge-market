
import { RatioSection } from "./RatioSection";

interface RatioSectionsGridProps {
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

const RatioSectionsGrid = ({ ratioGroups }: RatioSectionsGridProps) => {
  return (
    <div className="grid gap-6">
      {ratioGroups.map((group, index) => (
        <RatioSection
          key={index}
          title={group.title}
          description={group.description}
          ratios={group.ratios}
        />
      ))}
    </div>
  );
};

export default RatioSectionsGrid;
