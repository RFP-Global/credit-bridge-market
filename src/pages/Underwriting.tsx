import { useState } from "react";
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
import { CriteriaGroup } from "@/components/underwriting/types";

const Underwriting = () => {
  const [activeTab, setActiveTab] = useState<string>("preferences");
  const [totalScore, setTotalScore] = useState(4.45);
  
  const [criteriaGroups, setCriteriaGroups] = useState<CriteriaGroup[]>([
    {
      name: "Financial Strength",
      description: "Measures the overall financial health of the borrower",
      weight: 25,
      score: 4.10,
      criteria: [
        {
          name: "EBITDA",
          description: "Earnings Before Interest, Taxes, Depreciation, and Amortization",
          value: "$4.5M",
          weight: 40,
          score: 4,
          min: 1,
          max: 5,
          step: 1,
          unit: "$M",
          preferredMin: 3.5,
          preferredMax: 10
        },
        {
          name: "Debt/EBITDA",
          description: "Ratio of total debt to EBITDA",
          value: "3.6x",
          weight: 25,
          score: 3,
          min: 1,
          max: 5,
          step: 1,
          unit: "x",
          preferredMin: 2.0,
          preferredMax: 4.0
        },
        {
          name: "Current Ratio",
          description: "Current assets divided by current liabilities",
          value: "1.8x",
          weight: 20,
          score: 4,
          min: 1,
          max: 5,
          step: 1,
          unit: "x",
          preferredMin: 1.5,
          preferredMax: 3.0
        },
        {
          name: "Revenue Growth",
          description: "Year-over-year revenue growth",
          value: "$10.5M",
          weight: 15,
          score: 5,
          min: 1,
          max: 5,
          step: 1,
          unit: "%",
          preferredMin: 5,
          preferredMax: 25
        }
      ]
    },
    {
      name: "Business Stability",
      description: "Evaluates the operational stability of the business",
      weight: 20,
      score: 3.4,
      criteria: [
        {
          name: "Years in Business",
          description: "Number of years since company founding",
          value: "14 years",
          weight: 35,
          score: 4,
          min: 1,
          max: 5,
          step: 1
        },
        {
          name: "Revenue Concentration",
          description: "Dependency on key customers",
          value: "32%",
          weight: 25,
          score: 3,
          min: 1,
          max: 5,
          step: 1
        },
        {
          name: "Geographic Footprint",
          description: "Regional diversity of operations",
          value: "7 states",
          weight: 40,
          score: 3,
          min: 1,
          max: 5,
          step: 1
        }
      ]
    },
    {
      name: "Competitive Positioning",
      description: "Evaluates market position relative to competitors",
      weight: 15,
      score: 4.35,
      criteria: [
        {
          name: "Market Share",
          description: "Percentage of total addressable market",
          value: "7%",
          weight: 30,
          score: 4,
          min: 1,
          max: 5,
          step: 1
        },
        {
          name: "Differentiation Score",
          description: "Uniqueness of product/service offering",
          value: "High",
          weight: 35,
          score: 5,
          min: 1,
          max: 5,
          step: 1
        },
        {
          name: "Barrier to Entry Score",
          description: "Difficulty for new competitors to enter market",
          value: "Medium-High",
          weight: 35,
          score: 4,
          min: 1,
          max: 5,
          step: 1
        }
      ]
    },
    {
      name: "Management Strength",
      description: "Assesses the experience and capability of leadership team",
      weight: 15,
      score: 4.8,
      criteria: [
        {
          name: "Leadership Depth",
          description: "Experience level of management team",
          value: "Very High",
          weight: 40,
          score: 5,
          min: 1,
          max: 5,
          step: 1
        },
        {
          name: "Ownership/Management Alignment",
          description: "Alignment between ownership and management",
          value: "High",
          weight: 30,
          score: 5,
          min: 1,
          max: 5,
          step: 1
        },
        {
          name: "Succession Plan",
          description: "Quality of transition planning",
          value: "Moderate",
          weight: 30,
          score: 4,
          min: 1,
          max: 5,
          step: 1
        }
      ]
    },
    {
      name: "Industry & Market Risk",
      description: "Evaluates sector-specific risks and market dynamics",
      weight: 25,
      score: 3.6,
      criteria: [
        {
          name: "Industry Volatility",
          description: "Historical stability of the industry",
          value: "Moderate",
          weight: 30,
          score: 3,
          min: 1,
          max: 5,
          step: 1
        },
        {
          name: "Market Growth",
          description: "Projected growth rate of target market",
          value: "Growing/Predictable",
          weight: 40,
          score: 4,
          min: 1,
          max: 5,
          step: 1
        },
        {
          name: "Regulatory Risk",
          description: "Exposure to regulatory changes",
          value: "Moderate-High",
          weight: 30,
          score: 3,
          min: 1,
          max: 5,
          step: 1
        }
      ]
    },
    {
      name: "Covenant Health",
      description: "Compliance with existing loan covenants",
      weight: 15,
      score: 4.7,
      criteria: [
        {
          name: "Covenant Compliance",
          description: "Historical compliance with financial covenants",
          value: "High",
          weight: 40,
          score: 5,
          min: 1,
          max: 5,
          step: 1
        },
        {
          name: "Primary Banking Relationship",
          description: "Strength of primary banking relationship",
          value: "Strong",
          weight: 20,
          score: 5,
          min: 1,
          max: 5,
          step: 1
        },
        {
          name: "Payment History",
          description: "Historical payment performance",
          value: "Excellent",
          weight: 20,
          score: 5,
          min: 1,
          max: 5,
          step: 1
        },
        {
          name: "Covenant Flexibility",
          description: "Flexibility within existing covenant structure",
          value: "Medium",
          weight: 20,
          score: 4,
          min: 1,
          max: 5,
          step: 1
        }
      ]
    }
  ]);

  const updateCriterionWeight = (groupIndex: number, criterionIndex: number, newWeight: number) => {
    const newGroups = [...criteriaGroups];
    newGroups[groupIndex].criteria[criterionIndex].weight = newWeight;
    
    const group = newGroups[groupIndex];
    const totalOtherWeight = group.criteria.reduce((sum, criterion, idx) => 
      idx === criterionIndex ? sum : sum + criterion.weight, 0);
    
    const remainingWeight = 100 - newWeight;
    if (totalOtherWeight > 0) {
      const ratio = remainingWeight / totalOtherWeight;
      group.criteria.forEach((criterion, idx) => {
        if (idx !== criterionIndex) {
          criterion.weight = Math.round(criterion.weight * ratio);
        }
      });
      
      const adjustedTotal = group.criteria.reduce((sum, criterion) => sum + criterion.weight, 0);
      if (adjustedTotal !== 100) {
        const diff = 100 - adjustedTotal;
        let maxIdx = -1;
        let maxWeight = -1;
        
        for (let i = 0; i < group.criteria.length; i++) {
          if (i !== criterionIndex && group.criteria[i].weight > maxWeight) {
            maxWeight = group.criteria[i].weight;
            maxIdx = i;
          }
        }
        
        if (maxIdx >= 0) {
          group.criteria[maxIdx].weight += diff;
        }
      }
    }
    
    recalculateScores(newGroups);
    setCriteriaGroups(newGroups);
  };

  const updateGroupWeight = (groupIndex: number, newWeight: number) => {
    const newGroups = [...criteriaGroups];
    newGroups[groupIndex].weight = newWeight;
    
    const totalOtherWeight = newGroups.reduce((sum, group, idx) => 
      idx === groupIndex ? sum : sum + group.weight, 0);
    
    const remainingWeight = 100 - newWeight;
    if (totalOtherWeight > 0) {
      const ratio = remainingWeight / totalOtherWeight;
      newGroups.forEach((group, idx) => {
        if (idx !== groupIndex) {
          group.weight = Math.round(group.weight * ratio);
        }
      });
      
      const adjustedTotal = newGroups.reduce((sum, group) => sum + group.weight, 0);
      if (adjustedTotal !== 100) {
        const diff = 100 - adjustedTotal;
        let maxIdx = -1;
        let maxWeight = -1;
        
        for (let i = 0; i < newGroups.length; i++) {
          if (i !== groupIndex && newGroups[i].weight > maxWeight) {
            maxWeight = newGroups[i].weight;
            maxIdx = i;
          }
        }
        
        if (maxIdx >= 0) {
          newGroups[maxIdx].weight += diff;
        }
      }
    }
    
    recalculateScores(newGroups);
    setCriteriaGroups(newGroups);
  };

  const updateCriterionScore = (groupIndex: number, criterionIndex: number, newScore: number) => {
    const newGroups = [...criteriaGroups];
    newGroups[groupIndex].criteria[criterionIndex].score = newScore;
    recalculateScores(newGroups);
    setCriteriaGroups(newGroups);
  };

  const updateCriterionRange = (groupIndex: number, criterionIndex: number, min: number, max: number) => {
    const newGroups = [...criteriaGroups];
    const criterion = newGroups[groupIndex].criteria[criterionIndex];
    
    criterion.preferredMin = min;
    criterion.preferredMax = max;
    
    // Automatically adjust score based on how well the current value fits in the range
    const currentValue = parseFloat(criterion.value.replace(/[^0-9.-]+/g, ""));
    if (!isNaN(currentValue)) {
      if (currentValue >= min && currentValue <= max) {
        // Value is within range - higher score
        criterion.score = 4 + (1 - (max - currentValue) / (max - min));
        if (criterion.score > 5) criterion.score = 5;
      } else if (currentValue < min) {
        // Value is below range
        const distance = (min - currentValue) / min;
        criterion.score = 3 - (distance * 2);
        if (criterion.score < 1) criterion.score = 1;
      } else {
        // Value is above range
        const distance = (currentValue - max) / max;
        criterion.score = 3 - (distance * 2);
        if (criterion.score < 1) criterion.score = 1;
      }
      criterion.score = parseFloat(criterion.score.toFixed(1));
    }
    
    recalculateScores(newGroups);
    setCriteriaGroups(newGroups);
  };

  const recalculateScores = (groups: CriteriaGroup[]) => {
    groups.forEach(group => {
      let weightSum = 0;
      let scoreSum = 0;
      
      group.criteria.forEach(criterion => {
        scoreSum += criterion.score * criterion.weight;
        weightSum += criterion.weight;
      });
      
      group.score = weightSum > 0 ? parseFloat((scoreSum / weightSum).toFixed(2)) : 0;
    });
    
    let totalWeightedScore = 0;
    let totalWeight = 0;
    
    groups.forEach(group => {
      totalWeightedScore += group.score * group.weight;
      totalWeight += group.weight;
    });
    
    setTotalScore(parseFloat((totalWeightedScore / totalWeight).toFixed(2)));
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return "text-green-500";
    if (score >= 3.5) return "text-blue-500";
    if (score >= 2.5) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBackground = (score: number) => {
    if (score >= 4.5) return "bg-green-500";
    if (score >= 3.5) return "bg-blue-500";
    if (score >= 2.5) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getRiskLevel = (score: number) => {
    if (score >= 4.5) return { label: "Low Risk", color: "bg-green-500/20 text-green-500 border-green-500/20" };
    if (score >= 3.5) return { label: "Moderate Risk", color: "bg-blue-500/20 text-blue-500 border-blue-500/20" };
    if (score >= 2.5) return { label: "Medium-High Risk", color: "bg-yellow-500/20 text-yellow-500 border-yellow-500/20" };
    return { label: "High Risk", color: "bg-red-500/20 text-red-500 border-red-500/20" };
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 relative grid-bg">
      <div className="absolute inset-0 z-0">
        <div className="radar-pulse bg-blue-500/10"></div>
        <div className="radar-pulse bg-blue-500/10" style={{ animationDelay: "1s" }}></div>
        <div className="radar-pulse bg-blue-500/10" style={{ animationDelay: "2s" }}></div>
      </div>
      
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
                  <div className={`text-2xl font-bold ${getScoreColor(totalScore)}`}>
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
                  updateGroupWeight={updateGroupWeight}
                  updateCriterionWeight={updateCriterionWeight}
                  updateCriterionScore={updateCriterionScore}
                  updateCriterionRange={updateCriterionRange}
                  getScoreColor={getScoreColor}
                  getScoreBackground={getScoreBackground}
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
