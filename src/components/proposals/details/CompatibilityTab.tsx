
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Shield, Zap, CheckCircle, AlertCircle } from "lucide-react";
import { getCompatibilityScore } from "@/components/underwriting/utils/styleUtils";
import { UnderwritingCompatibility } from "@/types/proposalDetails";

interface CompatibilityTabProps {
  compatibility: UnderwritingCompatibility;
  onCategoryClick: (categoryName: string, categoryScore: number) => void;
}

const CompatibilityTab: React.FC<CompatibilityTabProps> = ({ 
  compatibility, 
  onCategoryClick 
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 bg-black/40 border border-gray-800 rounded-md p-6">
          <div className="flex items-center mb-6">
            <Shield className="h-5 w-5 mr-2 text-primary" />
            <h3 className="text-lg font-medium">Compatibility Match</h3>
          </div>
          
          <div className="flex flex-col items-center justify-center space-y-4 py-6">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="#1a1a1a" 
                  strokeWidth="10" 
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke={compatibility.overallScore >= 80 ? "#10b981" : 
                         compatibility.overallScore >= 60 ? "#3b82f6" : 
                         compatibility.overallScore >= 40 ? "#f59e0b" : "#ef4444"} 
                  strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 45 * compatibility.overallScore / 100} ${2 * Math.PI * 45 * (1 - compatibility.overallScore / 100)}`}
                  strokeDashoffset={2 * Math.PI * 45 * 0.25}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl font-bold">{compatibility.overallScore}%</div>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-400">Compatibility Score</p>
              <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getCompatibilityScore(compatibility.overallScore).color}`}>
                {getCompatibilityScore(compatibility.overallScore).label}
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-span-1 md:col-span-2 bg-black/40 border border-gray-800 rounded-md p-6">
          <div className="flex items-center mb-6">
            <Zap className="h-5 w-5 mr-2 text-primary" />
            <h3 className="text-lg font-medium">Category Scores</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm cursor-pointer hover:text-primary transition-colors" 
                   onClick={() => onCategoryClick("Financial Strength", compatibility.categoryScores.financialStrength)}>
                  Financial Strength
                </p>
                <p className="text-sm font-semibold">{compatibility.categoryScores.financialStrength}%</p>
              </div>
              <Progress 
                value={compatibility.categoryScores.financialStrength} 
                className="h-2" 
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm cursor-pointer hover:text-primary transition-colors" 
                   onClick={() => onCategoryClick("Business Stability", compatibility.categoryScores.businessStability)}>
                  Business Stability
                </p>
                <p className="text-sm font-semibold">{compatibility.categoryScores.businessStability}%</p>
              </div>
              <Progress 
                value={compatibility.categoryScores.businessStability} 
                className="h-2"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm cursor-pointer hover:text-primary transition-colors" 
                   onClick={() => onCategoryClick("Competitive Position", compatibility.categoryScores.competitivePosition)}>
                  Competitive Position
                </p>
                <p className="text-sm font-semibold">{compatibility.categoryScores.competitivePosition}%</p>
              </div>
              <Progress 
                value={compatibility.categoryScores.competitivePosition} 
                className="h-2"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm cursor-pointer hover:text-primary transition-colors" 
                   onClick={() => onCategoryClick("Collateral Strength", compatibility.categoryScores.collateralStrength)}>
                  Collateral Strength
                </p>
                <p className="text-sm font-semibold">{compatibility.categoryScores.collateralStrength}%</p>
              </div>
              <Progress 
                value={compatibility.categoryScores.collateralStrength} 
                className="h-2"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm cursor-pointer hover:text-primary transition-colors" 
                   onClick={() => onCategoryClick("Industry & Market Risk", compatibility.categoryScores.industryRisk)}>
                  Industry & Market Risk
                </p>
                <p className="text-sm font-semibold">{compatibility.categoryScores.industryRisk}%</p>
              </div>
              <Progress 
                value={compatibility.categoryScores.industryRisk} 
                className="h-2"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm cursor-pointer hover:text-primary transition-colors" 
                   onClick={() => onCategoryClick("Banking Relationship", compatibility.categoryScores.bankingRelationship)}>
                  Banking & Relationship
                </p>
                <p className="text-sm font-semibold">{compatibility.categoryScores.bankingRelationship}%</p>
              </div>
              <Progress 
                value={compatibility.categoryScores.bankingRelationship} 
                className="h-2"
              />
            </div>
          </div>
        </div>
      </div>
      
      <LendingCriteriaMatch criteriaFit={compatibility.criteriaFit} />
      <CompatibilityNotes overallScore={compatibility.overallScore} />
    </div>
  );
};

// Separate the Lending Criteria Match component
const LendingCriteriaMatch: React.FC<{ criteriaFit: Array<any> }> = ({ criteriaFit }) => {
  return (
    <div className="bg-black/40 border border-gray-800 rounded-md p-6">
      <h3 className="text-lg font-medium mb-4">Lending Criteria Match</h3>
      <div className="space-y-4">
        {criteriaFit.map((criteria, index) => (
          <div key={index} className="flex items-center justify-between border-b border-gray-800 pb-3 last:border-0 last:pb-0">
            <div className="flex items-center">
              {criteria.matches ? (
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              ) : (
                <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
              )}
              <div>
                <p className="text-sm font-medium">{criteria.name}</p>
                <p className="text-xs text-gray-400">Your criteria: {criteria.yourCriteria}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{criteria.dealValue}</p>
              {!criteria.matches && <p className="text-xs text-yellow-500">Mismatch</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Separate the Compatibility Notes component
const CompatibilityNotes: React.FC<{ overallScore: number }> = ({ overallScore }) => {
  return (
    <div className="bg-black/40 border border-gray-800 rounded-md p-6">
      <h3 className="text-lg font-medium mb-4">Compatibility Notes</h3>
      <p className="text-sm text-gray-300 mb-4">
        This deal has been analyzed using your compatibility preferences. The compatibility 
        score reflects the alignment between your lending criteria and this opportunity's 
        characteristics.
      </p>
      <p className="text-sm text-gray-300">
        {overallScore >= 80 
          ? "This opportunity is a strong match for your lending criteria. We recommend proceeding with this deal based on your compatibility assessment."
          : overallScore >= 60
          ? "This opportunity is a good match overall, though there are some areas that may need additional review before proceeding."
          : overallScore >= 40
          ? "This opportunity shows moderate alignment with your criteria. Several important factors require careful consideration."
          : "This opportunity has significant misalignment with your lending preferences. We recommend caution before proceeding."}
      </p>
    </div>
  );
};

export default CompatibilityTab;
