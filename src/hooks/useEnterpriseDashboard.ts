
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { ProfileData } from "@/types/profile";
import { generateActiveDeals, generateNotifications, calculateCompanyMetrics, formatFinancingAmount } from "@/utils/enterpriseDashboardUtils";

export const useEnterpriseDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the enterprise profile data
  useEffect(() => {
    const currentEnterpriseId = localStorage.getItem('currentEnterpriseId');
    
    if (currentEnterpriseId) {
      const storedProfile = localStorage.getItem(`enterpriseProfile_${currentEnterpriseId}`);
      if (storedProfile) {
        setProfileData(JSON.parse(storedProfile));
      } else {
        // No profile found, redirect to login
        toast({
          title: "Profile Not Found",
          description: "Unable to load your profile information",
          variant: "destructive",
        });
        navigate("/enterprise-login");
      }
    } else {
      // No current enterprise ID, redirect to login
      toast({
        title: "Authentication Required",
        description: "Please login to access your dashboard",
        variant: "destructive",
      });
      navigate("/enterprise-login");
    }
    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentEnterpriseId');
    toast({
      title: "Logged Out",
      description: "Successfully logged out of your enterprise account",
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
