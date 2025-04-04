
import { ProfileData } from "@/types/profile";

/**
 * Generate active deals/RFPs for a company
 */
export const generateActiveDeals = (companyName: string) => {
  const dealTypes = ["Equipment Financing", "Expansion Capital", "Working Capital", "Inventory Financing", "Debt Refinancing"];
  const amounts = ["$1.2M", "$850K", "$3.5M", "$500K", "$2.1M"];
  const statuses = ["Review", "Draft", "Pending", "Approved"];
  
  // Generate 1-3 deals randomly but deterministically based on company name
  const numDeals = (companyName.length % 3) + 1;
  const deals = [];
  
  for (let i = 0; i < numDeals; i++) {
    const nameSum = Array.from(companyName).reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const dealIndex = (nameSum + i) % dealTypes.length;
    const amountIndex = (nameSum + i * 2) % amounts.length;
    const statusIndex = (nameSum + i * 3) % statuses.length;
    
    deals.push({
      id: i + 1,
      name: dealTypes[dealIndex],
      amount: amounts[amountIndex],
      status: statuses[statusIndex]
    });
  }
  
  return deals;
};

/**
 * Generate notifications for a company
 */
export const generateNotifications = (companyName: string) => {
  const notificationTypes = [
    "New lender match: Global Capital", 
    "Your RFP needs additional documents", 
    "New industry report available",
    `${companyName} profile has been verified`,
    "Financing opportunity alert"
  ];
  
  const times = ["2 hours ago", "Yesterday", "3 days ago"];
  
  // Generate 2-4 notifications
  const nameSum = Array.from(companyName).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const numNotifications = (nameSum % 3) + 2;
  const notifications = [];
  
  for (let i = 0; i < numNotifications; i++) {
    const noteIndex = (nameSum + i) % notificationTypes.length;
    const timeIndex = (nameSum + i * 2) % times.length;
    
    notifications.push({
      id: i + 1,
      text: notificationTypes[noteIndex],
      time: times[timeIndex]
    });
  }
  
  return notifications;
};

/**
 * Calculate metrics based on company profile
 */
export const calculateCompanyMetrics = (profileData: ProfileData) => {
  // Calculate metrics based on company name (to get consistent but different values)
  const nameValue = Array.from(profileData.companyName).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  
  return {
    completedRFPs: (nameValue % 5) + 1,
    pendingReviews: (nameValue % 3) + 1,
    matchedLenders: (nameValue % 8) + 2,
    baseAmount: 1.5 + (nameValue % 10) * 0.5, // Between 1.5M and 6M
  };
};

export const formatFinancingAmount = (baseAmount: number): string => {
  return `$${baseAmount.toFixed(1)}M`;
};
