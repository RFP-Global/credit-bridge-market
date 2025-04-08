
import { Enterprise } from "@/types/enterprises";
import { Lender } from "@/types/lenders";
import { FinanceProposal } from "@/types/marketplace";

/**
 * Calculate compatibility score between a lender and an enterprise
 * @param lender The lender data
 * @param enterprise The enterprise data
 * @returns A score from 0-100 representing compatibility
 */
export const calculateEnterpriseCompatibility = (
  lender: Lender | null,
  enterprise: Enterprise
): {
  score: number;
  breakdown: {
    category: string;
    score: number;
    weight: number;
  }[];
} => {
  // If no lender data is available, return a neutral score
  if (!lender) {
    return { 
      score: 50, 
      breakdown: [
        { category: "Industry Match", score: 50, weight: 0.25 },
        { category: "Deal Size", score: 50, weight: 0.25 },
        { category: "Geographic", score: 50, weight: 0.25 },
        { category: "Business Type", score: 50, weight: 0.25 }
      ] 
    };
  }

  // Calculate industry match score
  const industryScore = lender.industries?.some(
    industry => industry === enterprise.industry || 
    enterprise.specialties.includes(industry)
  ) ? 100 : 
  lender.industries?.some(
    industry => enterprise.specialties.some(
      specialty => specialty.toLowerCase().includes(industry.toLowerCase()) || 
      industry.toLowerCase().includes(specialty.toLowerCase())
    )
  ) ? 70 : 30;

  // Calculate deal size match
  let dealSizeScore = 50;
  if (enterprise.avgDealSize && lender.minimumDeal) {
    const enterpriseDealSizeNum = parseFloat(enterprise.avgDealSize.replace(/[^\d.]/g, ''));
    const lenderMinDealNum = parseFloat(lender.minimumDeal.replace(/[^\d.]/g, ''));
    
    if (!isNaN(enterpriseDealSizeNum) && !isNaN(lenderMinDealNum)) {
      if (enterpriseDealSizeNum >= lenderMinDealNum) {
        dealSizeScore = 100;
      } else if (enterpriseDealSizeNum >= lenderMinDealNum * 0.7) {
        dealSizeScore = 70;
      } else {
        dealSizeScore = 30;
      }
    }
  }

  // Calculate geographic match
  const geographicScore = lender.preferredRegions.includes("National") ? 100 :
    lender.preferredRegions.some(region => 
      enterprise.headquarters.includes(region) || 
      region.includes(enterprise.headquarters.split(",")[1]?.trim())
    ) ? 100 : 40;

  // Business type match - comparing lender specialties with enterprise industry/specialties
  const businessTypeScore = lender.specialties.some(
    specialty => enterprise.industry === specialty || 
    enterprise.specialties.includes(specialty)
  ) ? 100 : 
  lender.specialties.some(
    specialty => enterprise.specialties.some(
      enterpriseSpecialty => 
        enterpriseSpecialty.toLowerCase().includes(specialty.toLowerCase()) || 
        specialty.toLowerCase().includes(enterpriseSpecialty.toLowerCase())
    )
  ) ? 75 : 30;

  // Define the breakdown with weights
  const breakdown = [
    { category: "Industry Match", score: industryScore, weight: 0.25 },
    { category: "Deal Size", score: dealSizeScore, weight: 0.25 },
    { category: "Geographic", score: geographicScore, weight: 0.25 },
    { category: "Business Type", score: businessTypeScore, weight: 0.25 }
  ];

  // Calculate weighted average
  const overallScore = Math.round(
    breakdown.reduce((sum, item) => sum + (item.score * item.weight), 0)
  );

  return {
    score: overallScore,
    breakdown
  };
};

/**
 * Get a descriptive label and color for a compatibility score
 */
export const getCompatibilityLabel = (score: number): { label: string; color: string } => {
  if (score >= 85) return { label: "EXCELLENT MATCH", color: "bg-green-500/20 text-green-500" };
  if (score >= 70) return { label: "GOOD MATCH", color: "bg-blue-500/20 text-blue-500" };
  if (score >= 50) return { label: "MODERATE MATCH", color: "bg-yellow-500/20 text-yellow-500" };
  return { label: "LOW MATCH", color: "bg-red-500/20 text-red-500" };
};
