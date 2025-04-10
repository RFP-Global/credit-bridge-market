
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CriteriaGroup } from "./types";

interface CategoryWeightsProps {
  criteriaGroups: CriteriaGroup[];
  updateGroupWeight: (groupIndex: number, newWeight: number) => void;
  getScoreColor: (score: number) => string;
}

export const CategoryWeights = ({
  criteriaGroups,
  updateGroupWeight,
  getScoreColor,
}: CategoryWeightsProps) => {
  return (
    <Card className="w-full md:w-1/3 bg-black/40 border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-mono flex items-center justify-between">
          <span>CATEGORY WEIGHTS</span>
          <Badge variant="outline" className="ml-2 font-mono">100%</Badge>
        </CardTitle>
        <CardDescription>
          Adjust the relative importance of each category
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {criteriaGroups.map((group, groupIndex) => (
          <div key={group.name} className="space-y-1">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">{group.name}</div>
              <div className="flex items-center gap-2">
                <div className={`text-sm font-medium ${getScoreColor((group.minScore + group.maxScore) / 2)}`}>
                  {group.minScore.toFixed(1)}-{group.maxScore.toFixed(1)}
                </div>
                <div className="text-xs text-muted-foreground">{group.weight}%</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-6 w-6"
                onClick={() => updateGroupWeight(groupIndex, Math.max(5, group.weight - 5))}
                disabled={group.weight <= 5}
              >
                <ChevronDown className="h-3 w-3" />
              </Button>
              <Slider
                value={[group.weight]}
                min={5}
                max={50}
                step={5}
                className="flex-1"
                onValueChange={(value) => updateGroupWeight(groupIndex, value[0])}
              />
              <Button 
                variant="outline" 
                size="icon"
                className="h-6 w-6"
                onClick={() => updateGroupWeight(groupIndex, Math.min(50, group.weight + 5))}
                disabled={group.weight >= 50}
              >
                <ChevronUp className="h-3 w-3" />
              </Button>
            </div>
            <Progress value={group.weight} className="h-1.5" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
