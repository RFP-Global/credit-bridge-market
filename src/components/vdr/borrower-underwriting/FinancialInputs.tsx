
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
  return (
    <Card className="bg-black/40 border-gray-800">
      <CardHeader className="flex flex-row items-center border-b border-gray-800">
        <FileSpreadsheet className="mr-2 h-4 w-4 text-primary" />
        <CardTitle className="text-sm font-mono">FINANCIAL DATA INPUT</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(financialData).map(([field, value]) => (
            <div key={field} className="space-y-2">
              <label className="text-xs text-gray-400 uppercase">
                {field.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <Input
                type="number"
                value={value}
                onChange={(e) => onInputChange(field, e.target.value)}
                className="bg-black/20"
                placeholder="Enter value..."
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
