
import { ProfileData } from "@/types/profile";

export interface DealType {
  id: number;
  name: string;
  company: string;
  amount: string;
  status: string;
}

export interface NotificationType {
  id: number;
  text: string;
  time: string;
}

// Generate active deals for a lender
export const generateActiveDeals = (lenderName: string): DealType[] => {
  return [
    { id: 1, name: "Riverside Development", company: "TerraForge Inc.", amount: "$2.4M", status: "Review" },
    { id: 2, name: "Green Energy Initiative", company: "EcoSystems LLC", amount: "$5.7M", status: "Approved" },
    { id: 3, name: "Medical Center Expansion", company: "HealthCore Solutions", amount: "$8.1M", status: "Pending" }
  ];
};

// Generate notifications for a lender
export const generateNotifications = (lenderName: string): NotificationType[] => {
  return [
    { id: 1, text: "New RFP: Downtown Office Complex", time: "2 hours ago" },
    { id: 2, text: "TerraForge Inc. has accepted your term sheet", time: "Yesterday" },
    { id: 3, text: "New industry report available: Real Estate Q2", time: "3 days ago" }
  ];
};

// Calculate company metrics based on profile data
export const calculateCompanyMetrics = (profileData: ProfileData) => {
  // This would normally be calculated from real data
  // For demo purposes, we're using fixed values
  const baseAmount = Math.floor(Math.random() * 150) + 50;
  
  return {
    completedRFPs: 24,
    pendingReviews: 8,
    matchedLenders: 0, // Not applicable for lenders
    baseAmount
  };
};

// Format financing amount for display
export const formatFinancingAmount = (baseAmount: number): string => {
  return `$${baseAmount}.8M`;
};
