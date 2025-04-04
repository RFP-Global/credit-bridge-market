
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { ProfileData } from "@/types/profile";
import { generateActiveDeals, generateNotifications, calculateCompanyMetrics, formatFinancingAmount } from "@/utils/lenderDashboardUtils";

export const useLenderDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock lender profile for demo purposes
  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      const mockProfile: ProfileData = {
        id: "lender-001",
        fullName: "Global Capital Representative",
        companyName: "Global Capital",
        email: "finance@globalcapital.com",
        phone: "555-123-4567",
        industry: "Financial Services",
        address: "123 Finance St, New York, NY",
        size: "Enterprise",
        yearFounded: "1985",
        description: "Global Capital is a leading institutional lender specializing in commercial and development financing."
      };

      setProfileData(mockProfile);
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    toast({
      title: "Logged Out",
      description: "Successfully logged out of your lender account",
    });
    navigate("/");
  };

  // Computed values based on profile data
  const dashboardData = profileData ? {
    activeDeals: generateActiveDeals(profileData.companyName),
    notifications: generateNotifications(profileData.companyName),
    metrics: (() => {
      const metrics = calculateCompanyMetrics(profileData);
      return {
        completedRFPs: metrics.completedRFPs,
        pendingReviews: metrics.pendingReviews,
        matchedLenders: metrics.matchedLenders,
        financingAmount: formatFinancingAmount(metrics.baseAmount)
      };
    })()
  } : null;

  return {
    activeTab,
    setActiveTab,
    profileData,
    isLoading,
    handleLogout,
    dashboardData
  };
};
