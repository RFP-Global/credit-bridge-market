import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { UnderwritingCategoryCard } from "./UnderwritingCategoryCard";
import { UnderwritingCategory, UnderwritingMetric } from "./types";
import { getScoreColor } from "./utils/styleUtils";
import CategoryDetailsModal from "../proposals/details/CategoryDetailsModal";
import { roundToTenth } from "./utils/roundingUtils";

export const UnderwritingPreferences = () => {
  const [selectedCategory, setSelectedCategory] = useState<UnderwritingCategory | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [categories, setCategories] = useState<UnderwritingCategory[]>([
    {
      name: "Financial Strength",
      metrics: [
        { name: "EBITDA", value: "7", minScore: 7, maxScore: 8, weighting: 40, description: "Earnings Before Interest, Taxes, Depreciation, and Amortization" },
        { name: "Debt/EBITDA", value: "5", minScore: 4.5, maxScore: 5.5, weighting: 25, description: "Ratio of total debt to EBITDA" },
        { name: "Current Ratio", value: "6", minScore: 5.5, maxScore: 6.5, weighting: 20, description: "Current assets divided by current liabilities" },
        { name: "Revenue Growth", value: "8", minScore: 7.5, maxScore: 8.5, weighting: 15, description: "Year-over-year revenue growth" }
      ],
      minTotalScore: 6.0,
      maxTotalScore: 7.0
    },
    {
      name: "Business Stability",
      metrics: [
        { name: "Years in Business", value: "7", minScore: 6.5, maxScore: 7.5, weighting: 40 },
        { name: "Revenue Concentration", value: "3", minScore: 2.5, maxScore: 3.5, weighting: 30 },
        { name: "Competitive Positioning", value: "7", minScore: 6.5, maxScore: 7.5, weighting: 30 }
      ],
      minTotalScore: 5.2,
      maxTotalScore: 6.1
    },
    {
      name: "Competitive Positioning",
      metrics: [
        { name: "Competitor Count Score", value: "6", minScore: 5.5, maxScore: 6.5, weighting: 25 },
        { name: "Differentiation Score", value: "8", minScore: 7.5, maxScore: 8.5, weighting: 25 },
        { name: "Customer Retention Score", value: "4", minScore: 3.5, maxScore: 4.5, weighting: 25 },
        { name: "Barriers to Entry Score", value: "8", minScore: 7.5, maxScore: 8.5, weighting: 25 }
      ],
      minTotalScore: 6.0,
      maxTotalScore: 7.0
    },
    {
      name: "Collateral Strength",
      metrics: [
        { name: "Loan-to-Value Ratio", value: "66.67%", minScore: 5.5, maxScore: 6.5, weighting: 50 },
        { name: "Collateral Type", value: "Accounts Receivable (High Credit Quality)", minScore: 7.5, maxScore: 8.5, weighting: 30 },
        { name: "Loan Repayment Priority & Security", value: "Unsecured Debt", minScore: 2.5, maxScore: 3.5, weighting: 20 }
      ],
      minTotalScore: 5.5,
      maxTotalScore: 6.5
    },
    {
      name: "Industry & Market Risk",
      metrics: [
        { name: "Industry Stability", formula: "Revenue Volatility Score", minScore: 6.5, maxScore: 7.5, weighting: 40 },
        { name: "Market Demand", formula: "Demand Predictability Score", minScore: 5.5, maxScore: 6.5, weighting: 40 },
        { name: "Regulator Risk", formula: "Regulatory Stability Score", minScore: 4.5, maxScore: 5.5, weighting: 20 }
      ],
      minTotalScore: 5.7,
      maxTotalScore: 6.7
    },
    {
      name: "Banking & Relationship",
      metrics: [
        { name: "Primary Banking Stability", value: "6", minScore: 5.5, maxScore: 6.5, weighting: 30 },
        { name: "# of Active Banking Relationships", value: "8", minScore: 7.5, maxScore: 8.5, weighting: 20 },
        { name: "# of Missed Payments / Defaults", value: "2", minScore: 1.5, maxScore: 2.5, weighting: 20 },
        { name: "Covenant Violations / Loan Modifications", value: "8", minScore: 7.5, maxScore: 8.5, weighting: 20 },
        { name: "Banking Product Breadth", value: "8", minScore: 7.5, maxScore: 8.5, weighting: 10 }
      ],
      minTotalScore: 5.7,
      maxTotalScore: 6.7
    }
  ]);

  const overallMinScore = categories.reduce((sum, category) => sum + category.minTotalScore, 0) / categories.length;
  const overallMaxScore = categories.reduce((sum, category) => sum + category.maxTotalScore, 0) / categories.length;
  const overallScore = (overallMinScore + overallMaxScore) / 2;

  const getRiskLevel = (score: number) => {
    if (score >= 7) return { level: "Low Risk", color: "bg-green-500/20 text-green-500 border-green-500/20" };
    if (score >= 5) return { level: "Moderate Risk", color: "bg-blue-500/20 text-blue-500 border-blue-500/20" };
    if (score >= 3) return { level: "Medium-High Risk", color: "bg-yellow-500/20 text-yellow-500 border-yellow-500/20" };
    return { level: "High Risk", color: "bg-red-500/20 text-red-500 border-red-500/20" };
  };

  const riskLevel = getRiskLevel(overallScore);

  const updateCategoryScore = (categoryIndex: number, newScore: number) => {
    const updatedCategories = [...categories];
    const currentAvg = roundToTenth((updatedCategories[categoryIndex].minTotalScore + updatedCategories[categoryIndex].maxTotalScore) / 2);
    const diff = roundToTenth(newScore - currentAvg);
    
    updatedCategories[categoryIndex].minTotalScore = roundToTenth(updatedCategories[categoryIndex].minTotalScore + diff);
    updatedCategories[categoryIndex].maxTotalScore = roundToTenth(updatedCategories[categoryIndex].maxTotalScore + diff);
    
    setCategories(updatedCategories);
  };

  const updateMetricScore = (categoryIndex: number, metricIndex: number, newScore: number) => {
    const updatedCategories = [...categories];
    const category = updatedCategories[categoryIndex];
    
    const metric = category.metrics[metricIndex];
    const oldAvg = roundToTenth((metric.minScore + metric.maxScore) / 2);
    const diff = roundToTenth(newScore - oldAvg);
    
    metric.minScore = roundToTenth(Math.max(1, metric.minScore + diff));
    metric.maxScore = roundToTenth(Math.min(10, metric.maxScore + diff));
    
    const totalWeightedMinScore = roundToTenth(category.metrics.reduce(
      (sum, metric) => sum + roundToTenth(metric.minScore * metric.weighting), 0
    ));
    
    const totalWeightedMaxScore = roundToTenth(category.metrics.reduce(
      (sum, metric) => sum + roundToTenth(metric.maxScore * metric.weighting), 0
    ));
    
    const totalWeighting = category.metrics.reduce(
      (sum, metric) => sum + metric.weighting, 0
    );
    
    category.minTotalScore = roundToTenth(totalWeightedMinScore / totalWeighting);
    category.maxTotalScore = roundToTenth(totalWeightedMaxScore / totalWeighting);
    
    setCategories(updatedCategories);
  };

  const getScoreColorClass = (score: number) => {
    if (score >= 8) return 'text-green-500';
    if (score >= 6) return 'text-blue-500';
    if (score >= 4) return 'text-yellow-500';
    return 'text-red-500';
  };

  const openCategoryDetails = (category: UnderwritingCategory) => {
    setSelectedCategory(category);
    setDetailsModalOpen(true);
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
                  <div className="text-2xl font-bold text-blue-500">
                    {overallMinScore.toFixed(2)}-{overallMaxScore.toFixed(2)}
                  </div>
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
                  <div 
                    key={index} 
                    className="bg-gray-800/50 p-3 rounded-md cursor-pointer hover:bg-gray-700/50 transition-colors"
                    onClick={() => openCategoryDetails(category)}
                  >
                    <div className="text-xs text-muted-foreground mb-1">
                      {category.name.toUpperCase()}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className={`text-xl font-bold ${getScoreColorClass((category.minTotalScore + category.maxTotalScore) / 2)}`}>
                        {category.minTotalScore.toFixed(2)}-{category.maxTotalScore.toFixed(2)}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          const avgScore = (category.minTotalScore + category.maxTotalScore) / 2;
                          const newScore = Math.max(1, Math.min(10, avgScore - 0.5));
                          updateCategoryScore(index, newScore);
                        }}
                      >
                        -
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          const avgScore = (category.minTotalScore + category.maxTotalScore) / 2;
                          const newScore = Math.max(1, Math.min(10, avgScore + 0.5));
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
                  <div className={`font-bold ${getScoreColorClass((category.minTotalScore + category.maxTotalScore) / 2)}`}>
                    {category.minTotalScore.toFixed(2)}-{category.maxTotalScore.toFixed(2)} / 10
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs">1</span>
                  <Slider
                    value={[(category.minTotalScore + category.maxTotalScore) / 2]}
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

            <Card className="bg-black/40 border-gray-800 mb-4">
              <CardHeader className="py-3 border-b border-gray-800">
                <CardTitle className="text-base font-semibold">Adjust Individual Metrics</CardTitle>
              </CardHeader>
              <CardContent className="py-4">
                <div className="space-y-6">
                  {category.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="space-y-2 border-b border-gray-800/40 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{metric.name}</div>
                        <div className="flex items-center gap-3">
                          <div className="text-xs text-muted-foreground">
                            Weight: {metric.weighting}%
                          </div>
                          <div className={`font-medium ${getScoreColorClass((metric.minScore + metric.maxScore) / 2)}`}>
                            Score: {metric.minScore.toFixed(1)}-{metric.maxScore.toFixed(1)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Metric Score</span>
                          <span>{metric.minScore.toFixed(1)}-{metric.maxScore.toFixed(1)} / 10</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-6 w-6 p-0"
                            onClick={() => {
                              const avgScore = (metric.minScore + metric.maxScore) / 2;
                              const newScore = Math.max(1, avgScore - 1);
                              updateMetricScore(index, metricIndex, newScore);
                            }}
                          >
                            -
                          </Button>
                          <Slider
                            value={[(metric.minScore + metric.maxScore) / 2]}
                            min={1}
                            max={10}
                            step={1}
                            className="flex-1"
                            onValueChange={(value) => updateMetricScore(index, metricIndex, value[0])}
                          />
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => {
                              const avgScore = (metric.minScore + metric.maxScore) / 2;
                              const newScore = Math.min(10, avgScore + 1);
                              updateMetricScore(index, metricIndex, newScore);
                            }}
                          >
                            +
                          </Button>
                        </div>
                        <div className="flex gap-1 mt-1">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                            <button
                              key={value}
                              className={`h-1.5 flex-1 rounded-full transition-colors ${
                                (metric.minScore + metric.maxScore) / 2 >= value 
                                  ? value >= 8 ? 'bg-green-500' : 
                                    value >= 6 ? 'bg-blue-500' : 
                                    value >= 4 ? 'bg-yellow-500' : 'bg-red-500'
                                  : 'bg-gray-800/30'
                              }`}
                              onClick={() => updateMetricScore(index, metricIndex, value)}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {metric.value && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Current value: {metric.value}
                        </div>
                      )}
                      {metric.formula && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Formula: {metric.formula}
                        </div>
                      )}
                      {metric.description && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Description: {metric.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <UnderwritingCategoryCard category={category} />
          </TabsContent>
        ))}
      </Tabs>

      {selectedCategory && (
        <CategoryDetailsModal
          open={detailsModalOpen}
          onOpenChange={setDetailsModalOpen}
          categoryName={selectedCategory.name}
          categoryScore={(selectedCategory.minTotalScore + selectedCategory.maxTotalScore) / 2}
          components={selectedCategory.metrics.map(metric => ({
            name: metric.name,
            score: (metric.minScore + metric.maxScore) / 2,
            description: metric.description
          }))}
        />
      )}
    </div>
  );
};
