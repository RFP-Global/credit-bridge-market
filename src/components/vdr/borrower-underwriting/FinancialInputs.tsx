import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileSpreadsheet } from "lucide-react";
import { useEffect } from "react";

interface FinancialData {
  [key: string]: string;
}

interface FinancialInputsProps {
  financialData: FinancialData;
  onInputChange: (field: string, value: string) => void;
}

export const FinancialInputs = ({ financialData, onInputChange }: FinancialInputsProps) => {
  const incomeStatementFields = {
    revenue: 'Revenue',
    grossProfit: 'Gross Profit',
    operatingIncome: 'Operating Income',
    netIncome: 'Net Income',
  };

  const balanceSheetFields = {
    totalAssets: 'Total Assets',
    currentAssets: 'Current Assets',
    inventory: 'Inventory',
    totalLiabilities: 'Total Liabilities',
    currentLiabilities: 'Current Liabilities',
    totalEquity: 'Total Equity',
    totalDebt: 'Total Debt',
  };

  const cashFlowFields = {
    annualDebtService: 'Annual Debt Service',
  };

  useEffect(() => {
    const savedData = localStorage.getItem('financialInputData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.entries(parsedData).forEach(([field, value]) => {
        onInputChange(field, value as string);
      });
    }
  }, [onInputChange]);

  const formatDisplayValue = (value: string) => {
    if (!value) return '';
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return value;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numValue);
  };

  const handleInputChange = (field: string, displayValue: string) => {
    const rawValue = displayValue.replace(/[$,]/g, '');
    const newData = { ...financialData, [field]: rawValue };
    localStorage.setItem('financialInputData', JSON.stringify(newData));
    onInputChange(field, rawValue);
  };

  const renderInputSection = (fields: Record<string, string>, title: string) => (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-primary">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(fields).map(([field, label]) => (
          <div key={field} className="space-y-2">
            <label className="text-xs text-gray-400 uppercase">
              {label}
            </label>
            <Input
              type="text"
              value={formatDisplayValue(financialData[field])}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="bg-black/20 font-mono"
              placeholder="$0"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="bg-black/40 border-gray-800">
      <CardHeader className="flex flex-row items-center border-b border-gray-800">
        <FileSpreadsheet className="mr-2 h-4 w-4 text-primary" />
        <CardTitle className="text-sm font-mono">FINANCIAL DATA INPUT</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-8">
        {renderInputSection(incomeStatementFields, 'Income Statement')}
        {renderInputSection(balanceSheetFields, 'Balance Sheet')}
        {renderInputSection(cashFlowFields, 'Cash Flow Statement')}
      </CardContent>
    </Card>
  );
};
