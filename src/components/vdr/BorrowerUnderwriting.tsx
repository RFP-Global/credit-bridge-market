
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BorrowerRiskScore } from './borrower-underwriting/BorrowerRiskScore';
import { FinancialInputs } from './borrower-underwriting/FinancialInputs';
import { FinancialRatios } from './borrower-underwriting/FinancialRatios';

const BorrowerUnderwriting = () => {
  const [financialData, setFinancialData] = useState({
    // Income Statement
    revenue: '',
    grossProfit: '',
    operatingIncome: '',
    netIncome: '',
    ebit: '',
    ebitda: '',
    interestExpense: '',
    leasePayments: '',
    
    // Balance Sheet
    totalAssets: '',
    currentAssets: '',
    inventory: '',
    cashAndEquivalents: '',
    accountsReceivable: '',
    totalLiabilities: '',
    currentLiabilities: '',
    totalEquity: '',
    totalDebt: '',
    
    // Cash Flow
    operatingCashFlow: '',
    annualCashInflow: '',
    depreciation: '',
    capex: '',
    workingCapitalChange: '',
    netCreditSales: '',
    cogs: '',
    loanAmount: '',
    collateralValue: '',
    principalPayment: '',
  });

  const [calculatedRatios, setCalculatedRatios] = useState<Record<string, number>>({});
  const [riskScore, setRiskScore] = useState<number | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFinancialData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateRatios = () => {
    // Convert all values to numbers
    const numericalData = Object.entries(financialData).reduce((acc, [key, value]) => {
      acc[key] = parseFloat(value) || 0;
      return acc;
    }, {} as Record<string, number>);

    setCalculatedRatios(numericalData);
    
    // Calculate a simple risk score based on key ratios
    const currentRatio = numericalData.currentAssets / numericalData.currentLiabilities;
    const debtToEquity = numericalData.totalDebt / numericalData.totalEquity;
    const profitMargin = (numericalData.netIncome / numericalData.revenue) * 100;
    
    const score = (
      (Math.min(currentRatio / 2, 1) * 3.33) +
      (Math.min((1 / debtToEquity) * 2, 1) * 3.33) +
      (Math.min(profitMargin / 20, 1) * 3.33)
    );
    
    setRiskScore(score);
    toast.success("Financial ratios calculated successfully");
  };

  return (
    <div className="space-y-6">
      <BorrowerRiskScore 
        riskScore={riskScore} 
        riskLevel={riskScore ? {
          label: riskScore >= 7 ? "Low Risk" : riskScore >= 5 ? "Moderate Risk" : "High Risk",
          color: riskScore >= 7 ? "text-green-500" : riskScore >= 5 ? "text-yellow-500" : "text-red-500"
        } : null}
      />
      
      <FinancialInputs 
        financialData={financialData} 
        onInputChange={handleInputChange} 
      />

      <Button onClick={calculateRatios} className="w-full">
        Calculate Ratios & Risk Score
      </Button>

      {Object.keys(calculatedRatios).length > 0 && (
        <FinancialRatios ratios={calculatedRatios} />
      )}
    </div>
  );
};

export default BorrowerUnderwriting;
