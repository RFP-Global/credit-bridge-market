import { useLocation, Navigate } from "react-router-dom";
import { FinancialRatios } from "@/types/proposalDetails";
import { FinancialSynopsis } from "@/components/reports/FinancialSynopsis";
import { RatioBreakdown } from "@/components/reports/RatioBreakdown";
import { Button } from "@/components/ui/button";
import { Printer, FileText } from "lucide-react";

const FinancialReport = () => {
  const location = useLocation();
  const state = location.state as { ratios: FinancialRatios; riskScore: number } | null;

  if (!state?.ratios || state.riskScore === undefined) {
    return <Navigate to="/borrower-underwriting" replace />;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background p-6 print:p-4 print:bg-white">
      <div className="container mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between print:hidden mb-4">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-semibold">Financial Analysis Report</h1>
          </div>
          <Button onClick={handlePrint} variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print Report
          </Button>
        </div>
        
        <div className="grid gap-6 print:gap-4">
          <FinancialSynopsis ratios={state.ratios} riskScore={state.riskScore} />
          <RatioBreakdown ratios={state.ratios} />
        </div>
      </div>

      <style>{`
        @media print {
          @page {
            margin: 1cm;
            size: A4;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FinancialReport;
