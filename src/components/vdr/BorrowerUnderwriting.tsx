
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FinancialRatios } from "@/types/proposalDetails";
import { toast } from "sonner";
import { calculateOverallRiskScore, calculateRatioScore, getRiskLevel } from './utils/borrowerRiskUtils';
import { BorrowerRiskScore } from './borrower-underwriting/BorrowerRiskScore';
import { FinancialInputs } from './borrower-underwriting/FinancialInputs';
import { LiquidityRatios } from '../proposals/details/financials/LiquidityRatios';

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

  const handleInputChange = (field: string, value: string) => {
    setFinancialData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateRatios = () => {
    const data = Object.entries(financialData).reduce((acc, [key, value]) => {
      acc[key] = parseFloat(value) || 0;
      return acc;
    }, {} as Record<string, number>);

    const calculatedRatios: FinancialRatios = {
      debtServiceCoverageRatio: data.operatingIncome / (data.annualDebtService || 1),
      currentRatio: data.currentAssets / (data.currentLiabilities || 1),
      quickRatio: (data.currentAssets - data.inventory) / (data.currentLiabilities || 1),
      debtToEBITDA: data.totalDebt / (data.operatingIncome || 1),
    };

    const ratioRecord: Record<string, number> = {};
    Object.entries(calculatedRatios).forEach(([key, value]) => {
      ratioRecord[key] = value;
    });

    const score = calculateOverallRiskScore(ratioRecord);
    setRiskScore(score);
    setRatios(calculatedRatios);
    toast.success("Financial ratios and risk score calculated successfully");
  };

  const riskLevel = riskScore ? getRiskLevel(riskScore) : null;

  return (
    <div className="space-y-6">
      <BorrowerRiskScore riskScore={riskScore} riskLevel={riskLevel} />
      
      <FinancialInputs 
        financialData={financialData} 
        onInputChange={handleInputChange} 
      />

      <Button onClick={calculateRatios} className="w-full">
        Calculate Ratios & Risk Score
      </Button>

      {ratios && (
        <LiquidityRatios ratios={ratios} />
      )}
    </div>
  );
};

export default BorrowerUnderwriting;
