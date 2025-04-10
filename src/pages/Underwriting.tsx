
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, FileSpreadsheet, Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LenderHeader from "@/components/lender/LenderHeader";
import LenderSidebar from "@/components/lender/LenderSidebar";
import { AlgorithmTab } from "@/components/underwriting/AlgorithmTab";
import { AlgorithmSettings } from "@/components/underwriting/AlgorithmSettings";
import { UnderwritingPreferences } from "@/components/underwriting/UnderwritingPreferences";
import { useUnderwritingState } from "@/hooks/useUnderwritingState";
import { 
  updateCriterionWeight, 
  updateGroupWeight, 
  updateCriterionScore, 
  updateCriterionRange,
  updateActualMetricValue
} from "@/components/underwriting/utils/scoreUtils";
import {
  getScoreColor,
  getScoreBackground,
  getRiskLevel
} from "@/components/underwriting/utils/styleUtils";

const Underwriting = () => {
  const {
    activeTab,
    setActiveTab,
    totalScore,
    setTotalScore,
    scoreThresholds,
    criteriaGroups,
    setCriteriaGroups
  } = useUnderwritingState();

  // Create handler functions that use the utility functions
  const handleUpdateCriterionWeight = (groupIndex: number, criterionIndex: number, newWeight: number) => {
    updateCriterionWeight(criteriaGroups, groupIndex, criterionIndex, newWeight, setCriteriaGroups, setTotalScore);
  };

  const handleUpdateGroupWeight = (groupIndex: number, newWeight: number) => {
    updateGroupWeight(criteriaGroups, groupIndex, newWeight, setCriteriaGroups, setTotalScore);
  };

  const handleUpdateCriterionScore = (groupIndex: number, criterionIndex: number, newScore: number) => {
    updateCriterionScore(criteriaGroups, groupIndex, criterionIndex, newScore, setCriteriaGroups, setTotalScore);
  };

  const handleUpdateCriterionRange = (groupIndex: number, criterionIndex: number, min: number, max: number) => {
    updateCriterionRange(criteriaGroups, groupIndex, criterionIndex, min, max, setCriteriaGroups, setTotalScore);
  };
  
  const handleUpdateActualMetricValue = (groupIndex: number, criterionIndex: number, value: number) => {
    updateActualMetricValue(criteriaGroups, groupIndex, criterionIndex, value, setCriteriaGroups, setTotalScore);
  };

  // Create wrapper functions for style utilities that use the state
  const handleGetScoreColor = (score: number) => getScoreColor(score, scoreThresholds);
  const handleGetScoreBackground = (score: number) => getScoreBackground(score);
  
  return (
    <div className="min-h-screen bg-black text-gray-200 relative grid-bg">
      <LenderHeader />
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-6">
          <LenderSidebar />
          
          <main className="flex-1">
            <div className="border-b border-primary/10 pb-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-mono">Underwriting Engine</h1>
                <p className="text-sm text-muted-foreground">
                  Customize borrower metric ranges and scoring criteria for your lending preferences
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-black/40 border border-primary/20 rounded-md p-3 flex flex-col items-center">
                  <div className="text-xs text-muted-foreground mb-1">RISK PREFERENCE</div>
                  <div className={`text-2xl font-bold ${handleGetScoreColor(totalScore)}`}>
                    {totalScore.toFixed(2)}
                  </div>
                  <Badge variant="outline" className={`mt-1 text-xs ${getRiskLevel(totalScore).color}`}>
                    {getRiskLevel(totalScore).label}
                  </Badge>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="w-[200px] text-xs">
                        Risk Score Scale:<br />
                        1-2.49: High Risk<br />
                        2.5-3.49: Medium-High Risk<br />
                        3.5-4.49: Moderate Risk<br />
                        4.5-5: Low Risk
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="bg-background/50 mb-4">
                <TabsTrigger value="preferences" className="font-mono text-xs flex items-center">
                  <FileSpreadsheet className="h-3.5 w-3.5 mr-2" />
                  UNDERWRITING PREFERENCES
                </TabsTrigger>
                <TabsTrigger value="algorithm" className="font-mono text-xs flex items-center">
                  <Settings className="h-3.5 w-3.5 mr-2" />
                  RISK ALGORITHM
                </TabsTrigger>
                <TabsTrigger value="settings" className="font-mono text-xs">
                  ALGORITHM SETTINGS
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="preferences" className="space-y-6">
                <UnderwritingPreferences />
              </TabsContent>
              
              <TabsContent value="algorithm" className="space-y-6">
                <AlgorithmTab 
                  criteriaGroups={criteriaGroups}
                  updateGroupWeight={handleUpdateGroupWeight}
                  updateCriterionWeight={handleUpdateCriterionWeight}
                  updateCriterionScore={handleUpdateCriterionScore}
                  updateCriterionRange={handleUpdateCriterionRange}
                  updateActualMetricValue={handleUpdateActualMetricValue}
                  getScoreColor={handleGetScoreColor}
                  getScoreBackground={handleGetScoreBackground}
                />
              </TabsContent>
              
              <TabsContent value="settings">
                <AlgorithmSettings />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Underwriting;
