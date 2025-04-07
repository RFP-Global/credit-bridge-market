
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { UnderwritingCategoryCard } from "./UnderwritingCategoryCard";
import { UnderwritingCategory } from "./types";
import { getScoreColor } from "./utils/styleUtils";

export const UnderwritingPreferences = () => {
  const [categories, setCategories] = useState<UnderwritingCategory[]>([
    {
      name: "Business Stability",
      metrics: [
        { name: "Years in Business", score: 7, weighting: 40 },
        { name: "Revenue Concentration", score: 3, weighting: 30 },
        { name: "Competitive Positioning", score: 7, weighting: 30 }
      ],
      totalScore: 5.65
    },
    {
      name: "Competitive Positioning",
      metrics: [
        { name: "Competitor Count Score", score: 6, weighting: 25 },
        { name: "Differentiation Score", score: 8, weighting: 25 },
        { name: "Customer Retention Score", score: 4, weighting: 25 },
        { name: "Barriers to Entry Score", score: 8, weighting: 25 }
      ],
      totalScore: 6.50
    },
    {
      name: "Collateral Strength",
      metrics: [
        { name: "Loan-to-Value Ratio", value: "66.67%", score: 6, weighting: 50 },
        { name: "Collateral Type", value: "Accounts Receivable (High Credit Quality)", score: 8, weighting: 30 },
        { name: "Loan Repayment Priority & Security", value: "Unsecured Debt", score: 3, weighting: 20 }
      ],
      totalScore: 6.00
    },
    {
      name: "Industry & Market Risk",
      metrics: [
        { name: "Industry Stability", formula: "Revenue Volatility Score", score: 7, weighting: 40 },
        { name: "Market Demand", formula: "Demand Predictability Score", score: 6, weighting: 40 },
        { name: "Regulator Risk", formula: "Regulatory Stability Score", score: 5, weighting: 20 }
      ],
      totalScore: 6.20
    },
    {
      name: "Banking & Relationship",
      metrics: [
        { name: "Primary Banking Stability", score: 6, weighting: 30 },
        { name: "# of Active Banking Relationships", score: 8, weighting: 20 },
        { name: "# of Missed Payments / Defaults", score: 2, weighting: 20 },
        { name: "Covenant Violations / Loan Modifications", score: 8, weighting: 20 },
        { name: "Banking Product Breadth", score: 8, weighting: 10 }
      ],
      totalScore: 6.2
    }
  ]);

  // Calculate overall score
  const overallScore = categories.reduce((sum, category) => sum + category.totalScore, 0) / categories.length;

  // Determine risk level based on overall score
  const getRiskLevel = (score: number) => {
    if (score >= 7) return { level: "Low Risk", color: "bg-green-500/20 text-green-500 border-green-500/20" };
    if (score >= 5) return { level: "Moderate Risk", color: "bg-blue-500/20 text-blue-500 border-blue-500/20" };
    if (score >= 3) return { level: "Medium-High Risk", color: "bg-yellow-500/20 text-yellow-500 border-yellow-500/20" };
    return { level: "High Risk", color: "bg-red-500/20 text-red-500 border-red-500/20" };
  };

  const riskLevel = getRiskLevel(overallScore);

  const updateCategoryScore = (categoryIndex: number, newScore: number) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].totalScore = parseFloat(newScore.toFixed(2));
    setCategories(updatedCategories);
  };

  const getScoreColorClass = (score: number) => {
    if (score >= 8) return 'text-green-500';
    if (score >= 6) return 'text-blue-500';
    if (score >= 4) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
        <div className="w-full md:w-2/3">
          <Card className="bg-black/40 border-gray-800">
            <CardHeader>
              <CardTitle className="text-sm font-mono">UNDERWRITING SCORECARD</CardTitle>
              <CardDescription>
                Custom risk assessment model with category-specific weights and scoring metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="font-medium">Overall Risk Score:</div>
                  <div className="text-2xl font-bold text-blue-500">{overallScore.toFixed(2)}</div>
                  <Badge variant="outline" className={`${riskLevel.color}`}>
                    {riskLevel.level}
                  </Badge>
                </div>
                <div>
                  <Badge className="bg-blue-600">Current Model: v2.1</Badge>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-4 mb-4">
                {categories.map((category, index) => (
                  <div key={index} className="bg-gray-800/50 p-3 rounded-md">
                    <div className="text-xs text-muted-foreground mb-1">
                      {category.name.toUpperCase()}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className={`text-xl font-bold ${getScoreColorClass(category.totalScore)}`}>
                        {category.totalScore.toFixed(2)}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0"
                        onClick={() => {
                          const newScore = Math.max(1, Math.min(10, category.totalScore - 0.5));
                          updateCategoryScore(index, newScore);
                        }}
                      >
                        -
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => {
                          const newScore = Math.max(1, Math.min(10, category.totalScore + 0.5));
                          updateCategoryScore(index, newScore);
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-1/3">
          <Card className="bg-black/40 border-gray-800">
            <CardHeader>
              <CardTitle className="text-sm font-mono">SCORING SCALE</CardTitle>
              <CardDescription>
                Reference for scoring metrics and risk levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">8-10: Excellent</span>
                  </div>
                  <span className="text-sm text-green-500">Low Risk</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">6-7.9: Good</span>
                  </div>
                  <span className="text-sm text-blue-500">Moderate Risk</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-sm">4-5.9: Fair</span>
                  </div>
                  <span className="text-sm text-yellow-500">Medium-High Risk</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm">1-3.9: Poor</span>
                  </div>
                  <span className="text-sm text-red-500">High Risk</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue={categories[0].name} className="space-y-6">
        <TabsList className="bg-background/50">
          {categories.map((category, index) => (
            <TabsTrigger key={index} value={category.name} className="font-mono text-xs">
              {category.name.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map((category, index) => (
          <TabsContent key={index} value={category.name} className="space-y-6">
            <Card className="bg-black/40 border-gray-800 mb-4">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">Adjust Category Score</div>
                  <div className={`font-bold ${getScoreColorClass(category.totalScore)}`}>
                    {category.totalScore.toFixed(2)} / 10
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs">1</span>
                  <Slider
                    value={[category.totalScore]}
                    min={1}
                    max={10}
                    step={0.1}
                    className="flex-1"
                    onValueChange={(value) => updateCategoryScore(index, value[0])}
                  />
                  <span className="text-xs">10</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>High Risk</span>
                  <span>Medium-High Risk</span>
                  <span>Moderate Risk</span>
                  <span>Low Risk</span>
                </div>
              </CardContent>
            </Card>
            <UnderwritingCategoryCard category={category} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
