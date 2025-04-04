
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileData } from "@/types/profile";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import ProfileDetails from "@/components/profile/ProfileDetails";
import AccountSidebar from "@/components/profile/AccountSidebar";
import { toast } from "@/hooks/use-toast";
import { Loading } from "@/components/ui/loading";

const EnterpriseProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const navigate = useNavigate();

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
        description: "Please login to access your profile",
        variant: "destructive",
      });
      navigate("/enterprise-login");
    }
  }, [navigate]);

  const handleProfileUpdate = (updatedData: ProfileData) => {
    const currentEnterpriseId = localStorage.getItem('currentEnterpriseId');
    if (currentEnterpriseId) {
      // Update profile in localStorage
      localStorage.setItem(`enterpriseProfile_${currentEnterpriseId}`, JSON.stringify(updatedData));
      setProfileData(updatedData);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated",
      });
      
      setIsEditing(false);
    }
  };

  if (!profileData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loading 
          variant="spinner"
          text="Loading your profile..." 
          centered 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-8">
        <ProfileHeader isEditing={isEditing} setIsEditing={setIsEditing} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {isEditing ? (
              <ProfileForm profileData={profileData} onSave={handleProfileUpdate} />
            ) : (
              <ProfileDetails profileData={profileData} />
            )}
          </div>
          
          <div className="md:col-span-1">
            <AccountSidebar profileData={profileData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseProfile;
