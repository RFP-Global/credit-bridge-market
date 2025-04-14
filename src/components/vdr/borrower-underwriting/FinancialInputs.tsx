
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileSpreadsheet } from "lucide-react";

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
              type="number"
              value={financialData[field] || ''}
              onChange={(e) => onInputChange(field, e.target.value)}
              className="bg-black/20"
              placeholder="Enter value..."
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
