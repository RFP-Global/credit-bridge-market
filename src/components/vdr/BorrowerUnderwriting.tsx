import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FinancialRatios } from "@/types/proposalDetails";
import { toast } from "sonner";
import { 
  calculateOverallRiskScore, 
  calculateRatioScore, 
  getScoreColor, 
  getScoreBackground, 
  getRiskLevel 
} from './utils/borrowerRiskUtils';
import { Badge } from '@/components/ui/badge';

const BorrowerUnderwriting = () => {
  const [financialData, setFinancialData] = useState({
    revenue: '',
    grossProfit: '',
    operatingIncome: '',
    netIncome: '',
    totalAssets: '',
    currentAssets: '',
    inventory: '',
    totalLiabilities: '',
    currentLiabilities: '',
    totalEquity: '',
    totalDebt: '',
    annualDebtService: '',
  });

  const [ratios, setRatios] = useState<FinancialRatios | null>(null);
  const [riskScore, setRiskScore] = useState<number | null>(null);

  const calculateRatios = () => {
    const data = Object.entries(financialData).reduce((acc, [key, value]) => {
      acc[key] = parseFloat(value) || 0;
      return acc;
    }, {} as Record<string, number>);

    const calculatedRatios: FinancialRatios = {
      debtServiceCoverageRatio: data.operatingIncome / (data.annualDebtService || 1),
      currentRatio: data.currentAssets / (data.currentLiabilities || 1),
      quickRatio: (data.currentAssets - data.inventory) / (data.currentLiabilities || 1),
      interestCoverageRatio: data.operatingIncome / (data.annualDebtService || 1),
      debtToEBITDA: data.totalDebt / (data.operatingIncome || 1),
      returnOnEquity: data.netIncome / (data.totalEquity || 1),
      grossMargin: data.grossProfit / (data.revenue || 1),
      operatingMargin: data.operatingIncome / (data.revenue || 1),
      netProfitMargin: data.netIncome / (data.revenue || 1),
      assetTurnover: data.revenue / (data.totalAssets || 1),
      inventoryTurnover: data.revenue / (data.inventory || 1),
      daysReceivablesOutstanding: 0,
      daysPayablesOutstanding: 0,
      workingCapitalTurnover: data.revenue / ((data.currentAssets - data.currentLiabilities) || 1),
      zScore: 0,
    };

    // Convert to Record<string, number> to pass to calculateOverallRiskScore
    const ratioRecord: Record<string, number> = {};
    Object.entries(calculatedRatios).forEach(([key, value]) => {
      ratioRecord[key] = value;
    });

    const score = calculateOverallRiskScore(ratioRecord);
    setRiskScore(score);
    setRatios(calculatedRatios);
    toast.success("Financial ratios and risk score calculated successfully");
  };

  const handleInputChange = (field: string, value: string) => {
    setFinancialData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatRatio = (value: number): string => {
    return value.toFixed(2);
  };

  const riskLevel = riskScore ? getRiskLevel(riskScore) : null;

  return (
    <div className="space-y-6">
      <Card className="bg-black/40 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-mono">FINANCIAL DATA INPUT</CardTitle>
          {riskScore && (
            <div className="flex items-center gap-3">
              <div className="text-sm">Risk Score:</div>
              <div className={`text-xl font-bold ${getScoreColor(riskScore)}`}>
                {riskScore.toFixed(2)}
              </div>
              <Badge variant="outline" className={`${riskLevel?.color}`}>
                {riskLevel?.label}
              </Badge>
            </div>
          )}
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(financialData).map(([field, value]) => (
            <div key={field} className="space-y-2">
              <label className="text-xs text-gray-400 uppercase">
                {field.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <Input
                type="number"
                value={value}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className="bg-black/20"
                placeholder="Enter value..."
              />
            </div>
          ))}
          <div className="md:col-span-3">
            <Button onClick={calculateRatios} className="w-full">
              Calculate Ratios & Risk Score
            </Button>
          </div>
        </CardContent>
      </Card>

      {ratios && (
        <Card className="bg-black/40 border-gray-800">
          <CardHeader>
            <CardTitle className="text-sm font-mono">CALCULATED RATIOS</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(ratios).map(([ratio, value]) => (
              <div key={ratio} className="space-y-1">
                <p className="text-xs text-gray-400 mb-1">
                  {ratio.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
                </p>
                <p className={`font-semibold ${getScoreColor(calculateRatioScore(ratio, value))}`}>
                  {formatRatio(value)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BorrowerUnderwriting;
