
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScoreRange } from "./ScoreRange";
import { Calculator } from "lucide-react";

interface SubRatioPreference {
  name: string;
  description: string;
  target: string;
  weight: number;
  minScore: string;
  maxScore: string;
}

interface SubRatioPreferencesProps {
  isOpen: boolean;
  onClose: () => void;
  criterionName: string;
  subratios: SubRatioPreference[];
  onScoreRangeUpdate: (subRatioIndex: number, minScore: string, maxScore: string) => void;
}

export const SubRatioPreferences: React.FC<SubRatioPreferencesProps> = ({
  isOpen,
  onClose,
  criterionName,
  subratios,
  onScoreRangeUpdate,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-black/90 border-gray-800">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            <DialogTitle className="text-lg font-mono">{criterionName} Preferences</DialogTitle>
          </div>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          {subratios.map((subratio, index) => (
            <div key={subratio.name} className="p-4 rounded-lg bg-black/40 border border-gray-800 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{subratio.name}</h3>
                  <p className="text-sm text-muted-foreground">{subratio.description}</p>
                </div>
                <span className="text-xs text-primary px-2 py-1 rounded-full border border-primary">
                  Target: {subratio.target}
                </span>
              </div>
              <ScoreRange
                minScore={subratio.minScore}
                maxScore={subratio.maxScore}
                onMinScoreValueChange={(e) => {
                  const newMinScore = e.target.value;
                  onScoreRangeUpdate(index, newMinScore, subratio.maxScore);
                }}
                onMaxScoreValueChange={(e) => {
                  const newMaxScore = e.target.value;
                  onScoreRangeUpdate(index, subratio.minScore, newMaxScore);
                }}
                onScoreRangeUpdate={() => {}}
              />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
