
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
    cash: '',
    interestExpense: '',
    fixedCharges: '',
    collateralValue: '',
    accountsReceivable: '',
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
      // Liquidity Ratios
      currentRatio: data.currentAssets / (data.currentLiabilities || 1),
      quickRatio: (data.currentAssets - data.inventory) / (data.currentLiabilities || 1),
      cashRatio: data.cash / (data.currentLiabilities || 1),
      
      // Leverage Ratios
      debtToEquity: data.totalLiabilities / (data.totalEquity || 1),
      leverageRatio: data.totalLiabilities / (data.totalAssets || 1),
      equityRatio: data.totalEquity / (data.totalAssets || 1),
      interestCoverageRatio: data.operatingIncome / (data.interestExpense || 1),
      fixedChargeCoverageRatio: (data.operatingIncome + data.fixedCharges) / ((data.fixedCharges || 0) + (data.interestExpense || 1)),
      
      // Profitability Ratios
      netProfitMargin: data.netIncome / (data.revenue || 1),
      grossProfitMargin: data.grossProfit / (data.revenue || 1),
      operatingMargin: data.operatingIncome / (data.revenue || 1),
      returnOnAssets: data.netIncome / (data.totalAssets || 1),
      returnOnEquity: data.netIncome / (data.totalEquity || 1),
      
      // Cash Flow Ratios
      operatingCashFlowRatio: data.operatingIncome / (data.currentLiabilities || 1),
      debtServiceCoverageRatio: data.operatingIncome / (data.annualDebtService || 1),
      freeCashFlowToFirm: data.operatingIncome - 0.1 * data.totalAssets, // Simplified FCFF calculation
      
      // Coverage & Repayment Ratios
      loanToValueRatio: data.totalDebt / (data.collateralValue || 1),
      collateralCoverageRatio: data.collateralValue / (data.totalDebt || 1),
      leverageCoverageRatio: data.operatingIncome / (data.totalDebt || 1),
      paybackPeriod: data.totalDebt / (data.operatingIncome || 1),
      
      // Efficiency & Operational Ratios
      accountsReceivableTurnover: data.revenue / (data.accountsReceivable || 1),
      inventoryTurnover: data.revenue / (data.inventory || 1),
      assetTurnover: data.revenue / (data.totalAssets || 1),
      
      // Legacy ratio
      debtToEBITDA: data.totalDebt / (data.operatingIncome || 1)
    };

    // Create a record for risk score calculation
    const ratiosRecord: Record<string, number> = Object.entries(calculatedRatios).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, number>);

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
