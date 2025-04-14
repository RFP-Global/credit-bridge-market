
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FinancialRatios } from "@/types/proposalDetails";
import { toast } from "sonner";
import { calculateOverallRiskScore, calculateRatioScore, getRiskLevel } from './utils/borrowerRiskUtils';
import { BorrowerRiskScore } from './borrower-underwriting/BorrowerRiskScore';
import { FinancialInputs } from './borrower-underwriting/FinancialInputs';
import { LiquidityRatios } from '../proposals/details/financials/LiquidityRatios';

const BorrowerUnderwriting = () => {
  const navigate = useNavigate();
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
      operatingCashFlowRatio: data.operatingIncome / (data.currentLiabilities || 1),
      leverageRatio: data.totalLiabilities / (data.totalAssets || 1),
      netProfitMargin: data.netIncome / (data.revenue || 1),
      grossProfitMargin: data.grossProfit / (data.revenue || 1),
      operatingMargin: data.operatingIncome / (data.revenue || 1),
      returnOnAssets: data.netIncome / (data.totalAssets || 1),
      returnOnEquity: data.netIncome / (data.totalEquity || 1),
      assetTurnover: data.revenue / (data.totalAssets || 1),
      inventoryTurnover: data.revenue / (data.inventory || 1),
      debtToEquity: data.totalLiabilities / (data.totalEquity || 1),
      equityRatio: data.totalEquity / (data.totalAssets || 1),
    };

    const ratiosRecord: Record<string, number> = {
      debtServiceCoverageRatio: calculatedRatios.debtServiceCoverageRatio,
      currentRatio: calculatedRatios.currentRatio,
      quickRatio: calculatedRatios.quickRatio,
      debtToEBITDA: calculatedRatios.debtToEBITDA,
      operatingCashFlowRatio: calculatedRatios.operatingCashFlowRatio,
      leverageRatio: calculatedRatios.leverageRatio,
      netProfitMargin: calculatedRatios.netProfitMargin,
      grossProfitMargin: calculatedRatios.grossProfitMargin,
      operatingMargin: calculatedRatios.operatingMargin,
      returnOnAssets: calculatedRatios.returnOnAssets,
      returnOnEquity: calculatedRatios.returnOnEquity,
      assetTurnover: calculatedRatios.assetTurnover,
      inventoryTurnover: calculatedRatios.inventoryTurnover,
      debtToEquity: calculatedRatios.debtToEquity,
      equityRatio: calculatedRatios.equityRatio
    };

    const score = calculateOverallRiskScore(ratiosRecord);
    setRiskScore(score);
    setRatios(calculatedRatios);
    toast.success("Financial ratios and risk score calculated successfully");
    
    navigate('/borrower-ratio-details', {
      state: { ratios: calculatedRatios, riskScore: score }
    });
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
