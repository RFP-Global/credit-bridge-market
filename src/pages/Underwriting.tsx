
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp, Info, Save } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LenderHeader from "@/components/lender/LenderHeader";
import LenderSidebar from "@/components/lender/LenderSidebar";

interface CriteriaGroup {
  name: string;
  description: string;
  weight: number;
  criteria: Criterion[];
  score: number;
}

interface Criterion {
  name: string;
  description: string;
  value: number | string;
  weight: number;
  score: number;
  min?: number;
  max?: number;
  step?: number;
}

const Underwriting = () => {
  const [activeTab, setActiveTab] = useState<string>("algorithm");
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
          step: 1
        },
        {
          name: "Debt/EBITDA",
          description: "Ratio of total debt to EBITDA",
          value: "3.6x",
          weight: 25,
          score: 3,
          min: 1,
          max: 5,
          step: 1
        },
        {
          name: "Current Ratio",
          description: "Current assets divided by current liabilities",
          value: "1.8x",
          weight: 20,
          score: 4,
          min: 1,
          max: 5,
          step: 1
        },
        {
          name: "Revenue Growth",
          description: "Year-over-year revenue growth",
          value: "$10.5M",
          weight: 15,
          score: 5,
          min: 1,
          max: 5,
          step: 1
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
    
    // Adjust other weights in the same group to maintain total of 100
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
      
      // Adjust for rounding errors
      const adjustedTotal = group.criteria.reduce((sum, criterion) => sum + criterion.weight, 0);
      if (adjustedTotal !== 100) {
        const diff = 100 - adjustedTotal;
        // Find the largest weight that's not the one we just changed and adjust it
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
    
    // Adjust other weights to maintain total of 100
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
      
      // Adjust for rounding errors
      const adjustedTotal = newGroups.reduce((sum, group) => sum + group.weight, 0);
      if (adjustedTotal !== 100) {
        const diff = 100 - adjustedTotal;
        // Find the largest weight that's not the one we just changed and adjust it
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

  const recalculateScores = (groups: CriteriaGroup[]) => {
    // Recalculate group scores
    groups.forEach(group => {
      let weightSum = 0;
      let scoreSum = 0;
      
      group.criteria.forEach(criterion => {
        scoreSum += criterion.score * criterion.weight;
        weightSum += criterion.weight;
      });
      
      group.score = weightSum > 0 ? parseFloat((scoreSum / weightSum).toFixed(2)) : 0;
    });
    
    // Recalculate total score
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
                  Customize your risk assessment algorithm and scoring criteria
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-black/40 border border-primary/20 rounded-md p-3 flex flex-col items-center">
                  <div className="text-xs text-muted-foreground mb-1">OVERALL RISK SCORE</div>
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
                <TabsTrigger value="algorithm" className="font-mono text-xs">
                  RISK ALGORITHM
                </TabsTrigger>
                <TabsTrigger value="history" className="font-mono text-xs">
                  SCORING HISTORY
                </TabsTrigger>
                <TabsTrigger value="settings" className="font-mono text-xs">
                  ALGORITHM SETTINGS
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="algorithm" className="space-y-6">
                <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
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
                              <div className={`text-sm font-medium ${getScoreColor(group.score)}`}>
                                {group.score.toFixed(2)}
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
                  
                  <Card className="w-full md:w-2/3 bg-black/40 border-gray-800">
                    <CardHeader className="pb-2 border-b border-gray-800">
                      <CardTitle className="text-sm font-mono">RISK SCORE BREAKDOWN</CardTitle>
                      <CardDescription>
                        Current risk score calculation based on category weights
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        {criteriaGroups.map((group, index) => (
                          <div key={group.name} className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium bg-primary/10">
                              {group.weight}%
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <div className="text-sm font-medium">{group.name}</div>
                                <div className={`text-sm font-bold ${getScoreColor(group.score)}`}>
                                  {group.score.toFixed(2)}
                                </div>
                              </div>
                              <div className="w-full h-2 bg-gray-800/50 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${getScoreBackground(group.score)}`}
                                  style={{ width: `${(group.score / 5) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {criteriaGroups.map((group, groupIndex) => (
                    <AccordionItem 
                      key={group.name} 
                      value={group.name}
                      className="border border-gray-800 rounded-md overflow-hidden bg-black/40 px-0"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:bg-gray-900/20 [&[data-state=open]>div>svg]:rotate-180">
                        <div className="flex items-center justify-between w-full pr-2">
                          <div className="flex items-center">
                            <span className="font-semibold">{group.name}</span>
                            <Badge className="ml-3" variant="outline">
                              {group.weight}%
                            </Badge>
                          </div>
                          <div className="flex items-center">
                            <span className={`font-bold mr-2 ${getScoreColor(group.score)}`}>
                              {group.score.toFixed(2)}
                            </span>
                            <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 pt-2 px-6">
                        <div className="text-sm text-muted-foreground mb-4">
                          {group.description}
                        </div>
                        <div className="space-y-6">
                          {group.criteria.map((criterion, criterionIndex) => (
                            <div key={criterion.name} className="space-y-2 border-b border-gray-800/40 pb-4 last:border-0 last:pb-0">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                <div>
                                  <div className="flex items-center">
                                    <div className="font-medium">{criterion.name}</div>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Info className="h-3.5 w-3.5 ml-1.5 text-muted-foreground" />
                                        </TooltipTrigger>
                                        <TooltipContent side="top" className="max-w-[250px] text-xs">
                                          {criterion.description}
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                    <div className="text-xs text-muted-foreground ml-3">
                                      Current value: {criterion.value}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className="text-xs text-muted-foreground">
                                    Weight: {criterion.weight}%
                                  </div>
                                  <div className={`font-medium ${getScoreColor(criterion.score)}`}>
                                    Score: {criterion.score}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Criterion Weight</span>
                                    <span>{criterion.weight}%</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button 
                                      variant="outline" 
                                      size="icon" 
                                      className="h-6 w-6"
                                      onClick={() => updateCriterionWeight(groupIndex, criterionIndex, Math.max(5, criterion.weight - 5))}
                                      disabled={criterion.weight <= 5}
                                    >
                                      <ChevronDown className="h-3 w-3" />
                                    </Button>
                                    <Slider
                                      value={[criterion.weight]}
                                      min={5}
                                      max={70}
                                      step={5}
                                      className="flex-1"
                                      onValueChange={(value) => updateCriterionWeight(groupIndex, criterionIndex, value[0])}
                                    />
                                    <Button 
                                      variant="outline" 
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() => updateCriterionWeight(groupIndex, criterionIndex, Math.min(70, criterion.weight + 5))}
                                      disabled={criterion.weight >= 70}
                                    >
                                      <ChevronUp className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Risk Score</span>
                                    <span>{criterion.score} / 5</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button 
                                      variant="outline" 
                                      size="icon" 
                                      className="h-6 w-6"
                                      onClick={() => updateCriterionScore(groupIndex, criterionIndex, Math.max(1, criterion.score - 1))}
                                      disabled={criterion.score <= 1}
                                    >
                                      <ChevronDown className="h-3 w-3" />
                                    </Button>
                                    <div className="flex-1 flex">
                                      {[1, 2, 3, 4, 5].map((value) => (
                                        <button
                                          key={value}
                                          className={`h-6 flex-1 border-r last:border-r-0 border-gray-800 transition-colors ${
                                            criterion.score >= value 
                                              ? getScoreBackground(value)
                                              : 'bg-gray-800/30'
                                          }`}
                                          onClick={() => updateCriterionScore(groupIndex, criterionIndex, value)}
                                        />
                                      ))}
                                    </div>
                                    <Button 
                                      variant="outline" 
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() => updateCriterionScore(groupIndex, criterionIndex, Math.min(5, criterion.score + 1))}
                                      disabled={criterion.score >= 5}
                                    >
                                      <ChevronUp className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                <div className="flex justify-end mt-8">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Save className="mr-2 h-4 w-4" />
                    Save Algorithm Configuration
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="history">
                <Card className="bg-black/40 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-sm font-mono">SCORING HISTORY</CardTitle>
                    <CardDescription>
                      Review previous scoring algorithm versions and changes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        {[
                          { date: "2023-12-15", score: 4.45, description: "Increased weight of Financial Strength, reduced Industry Risk" },
                          { date: "2023-11-01", score: 4.32, description: "Adjusted Management Strength criteria weights" },
                          { date: "2023-09-22", score: 4.21, description: "Initial algorithm configuration" }
                        ].map((item, i) => (
                          <div key={i} className="flex items-start border-b border-gray-800/40 pb-4 last:border-0 last:pb-0">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mr-4 ${getScoreBackground(item.score)}`}>
                              {item.score}
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col md:flex-row md:items-center justify-between mb-1">
                                <div className="font-medium">Algorithm v{3-i}.0</div>
                                <div className="text-sm text-muted-foreground">{item.date}</div>
                              </div>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="ml-2">
                              Restore
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card className="bg-black/40 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-sm font-mono">ALGORITHM SETTINGS</CardTitle>
                    <CardDescription>
                      Configure global settings for the risk assessment algorithm
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <div className="font-medium">Risk Threshold Settings</div>
                          <div className="grid gap-3">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                                <span className="text-sm">Low Risk Threshold</span>
                              </div>
                              <div className="text-sm">≥ 4.5</div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                                <span className="text-sm">Moderate Risk Threshold</span>
                              </div>
                              <div className="text-sm">≥ 3.5</div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                                <span className="text-sm">Medium-High Risk Threshold</span>
                              </div>
                              <div className="text-sm">≥ 2.5</div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                                <span className="text-sm">High Risk Threshold</span>
                              </div>
                              <div className="text-sm">< 2.5</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="font-medium">Auto-Reject Settings</div>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <label className="text-sm" htmlFor="auto-reject">Auto-reject applications below score</label>
                              <select id="auto-reject" className="h-9 bg-background border border-input rounded-md px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                                <option>2.5</option>
                                <option>3.0</option>
                                <option>3.5</option>
                                <option>None</option>
                              </select>
                            </div>
                            <div className="flex items-center justify-between">
                              <label className="text-sm" htmlFor="auto-approve">Auto-approve applications above score</label>
                              <select id="auto-approve" className="h-9 bg-background border border-input rounded-md px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                                <option>None</option>
                                <option>4.0</option>
                                <option>4.5</option>
                                <option>4.8</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="font-medium">Algorithm Version Control</div>
                        <div className="flex items-center justify-between p-3 border border-gray-800 rounded-md">
                          <div>
                            <div className="font-medium">Current Version: v3.0</div>
                            <div className="text-sm text-muted-foreground">Last updated: December 15, 2023</div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Export Configuration</Button>
                            <Button variant="outline" size="sm">Import Configuration</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-8 space-x-2">
                      <Button variant="outline">Reset to Defaults</Button>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Save className="mr-2 h-4 w-4" />
                        Save Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Underwriting;
