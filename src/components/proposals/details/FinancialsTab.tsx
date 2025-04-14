
import React from "react";
import { LiquidityRatios } from "./financials/LiquidityRatios";
import type { FinancialRatios as FinancialRatiosType } from "@/types/proposalDetails";

interface FinancialsTabProps {
  financialRatios: Partial<FinancialRatiosType>;
}

const FinancialsTab: React.FC<FinancialsTabProps> = ({ financialRatios }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LiquidityRatios ratios={financialRatios} />
      </div>
    </div>
  );
};

export default FinancialsTab;
