
import { FinanceProposal } from "@/types/marketplace";
import { constructionProposals } from "./constructionProposals";
import { realEstateProposals } from "./realEstateProposals";
import { technologyProposals } from "./technologyProposals";
import { manufacturingProposals } from "./manufacturingProposals";
import { retailProposals } from "./retailProposals";
import { energyProposals } from "./energyProposals";
import { healthcareProposals } from "./healthcareProposals";
import { otherProposals } from "./otherProposals";

/**
 * Combined finance proposals from all industry sectors
 */
export const financeProposals: FinanceProposal[] = [
  ...constructionProposals,
  ...realEstateProposals,
  ...technologyProposals,
  ...manufacturingProposals,
  ...retailProposals,
  ...energyProposals,
  ...healthcareProposals,
  ...otherProposals
];

/**
 * Get finance proposals by industry
 * @param industry The industry to filter by
 * @returns Array of finance proposals for the specified industry
 */
export const getProposalsByIndustry = (industry: string): FinanceProposal[] => {
  switch (industry) {
    case "Construction":
      return constructionProposals;
    case "Real Estate":
      return realEstateProposals;
    case "Technology":
      return technologyProposals;
    case "Manufacturing":
      return manufacturingProposals;
    case "Retail":
      return retailProposals;
    case "Energy":
      return energyProposals;
    case "Healthcare":
      return healthcareProposals;
    default:
      return otherProposals;
  }
};

/**
 * Get all unique industries from the proposals
 * @returns Array of unique industry names
 */
export const getUniqueIndustries = (): string[] => {
  return [
    "Construction",
    "Real Estate",
    "Technology",
    "Manufacturing",
    "Retail",
    "Energy",
    "Healthcare",
    "Wholesale",
    "Hospitality",
    "Agriculture"
  ];
};

/**
 * Get all unique facility types from the proposals
 * @returns Array of unique facility types
 */
export const getUniqueFacilityTypes = (): string[] => {
  const facilityTypes = new Set<string>();
  financeProposals.forEach(proposal => {
    facilityTypes.add(proposal.facilityType);
  });
  return Array.from(facilityTypes);
};

/**
 * Get completed proposals
 * @returns Array of completed finance proposals
 */
export const getCompletedProposals = (): FinanceProposal[] => {
  return financeProposals.filter(proposal => proposal.status === "COMPLETED");
};

/**
 * Get open proposals
 * @returns Array of open finance proposals
 */
export const getOpenProposals = (): FinanceProposal[] => {
  return financeProposals.filter(proposal => proposal.status === "OPEN");
};

/**
 * Get expired proposals
 * @returns Array of expired finance proposals
 */
export const getExpiredProposals = (): FinanceProposal[] => {
  return financeProposals.filter(proposal => proposal.status === "EXPIRED");
};

/**
 * Get proposal by ID
 * @param id Proposal ID
 * @returns Finance proposal with matching ID or undefined if not found
 */
export const getProposalById = (id: string): FinanceProposal | undefined => {
  return financeProposals.find(proposal => proposal.id === id);
};
