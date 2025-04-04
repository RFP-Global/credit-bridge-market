
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnterpriseLayout from "@/components/layout/EnterpriseLayout";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileDetails from "@/components/profile/ProfileDetails";
import ProfileForm from "@/components/profile/ProfileForm";
import AccountSidebar from "@/components/profile/AccountSidebar";
import { ProfileData } from "@/types/profile";

const EnterpriseProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock profile data for the enterprise account
  const enterpriseData = {
    id: "1",
    name: "Alex Johnson",
    email: "admin@terraforge.com",
    role: "Administrator",
    companyName: "TerraForge Inc.",
    companySize: "101-500",
    industry: "Commercial Real Estate",
    foundedYear: "2010",
    location: "New York, NY",
    website: "www.terraforge.com",
    description: "TerraForge Inc. is a leading commercial real estate development company focused on sustainable urban development and renovation projects.",
    profileImage: undefined,
    phoneNumber: "+1 (212) 555-7890",
    address: "123 Broadway, New York, NY 10001",
    socialProfiles: {
      linkedin: "linkedin.com/company/terraforge",
      twitter: "twitter.com/terraforge"
    }
  };
  
  // Map to ProfileData format
  const profileData: ProfileData = {
    companyName: enterpriseData.companyName,
    fullName: enterpriseData.name,
    email: enterpriseData.email,
    phone: enterpriseData.phoneNumber,
    address: enterpriseData.address,
    industry: enterpriseData.industry,
    founded: enterpriseData.foundedYear,
    employees: enterpriseData.companySize,
    description: enterpriseData.description,
    // Include original data fields to maintain compatibility
    ...enterpriseData
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Handle form changes here
    console.log("Form changed:", e.target.name, e.target.value);
  };
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  return (
    <EnterpriseLayout 
      title="Enterprise Profile" 
      description="Manage your enterprise account details and preferences."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <ProfileHeader 
            profileData={profileData} 
            isEditing={isEditing} 
            setIsEditing={setIsEditing} 
          />
          
          <Tabs value={isEditing ? "edit" : "details"} className="space-y-6">
            <TabsList className="bg-background/50 border border-primary/20">
              <TabsTrigger 
                value="details" 
                className="font-mono text-xs"
                onClick={() => setIsEditing(false)}
              >
                DETAILS
              </TabsTrigger>
              <TabsTrigger 
                value="edit" 
                className="font-mono text-xs"
                onClick={() => setIsEditing(true)}
              >
                EDIT PROFILE
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <ProfileDetails profileData={profileData} />
            </TabsContent>
            
            <TabsContent value="edit">
              <ProfileForm 
                profileData={profileData}
                handleChange={handleChange}
                handleSave={handleSave}
                isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="md:col-span-1">
          <AccountSidebar profileData={profileData} />
        </div>
      </div>
    </EnterpriseLayout>
  );
};

export default EnterpriseProfile;
