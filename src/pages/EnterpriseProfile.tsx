
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import ProfileDetails from "@/components/profile/ProfileDetails";
import AccountSidebar from "@/components/profile/AccountSidebar";
import { ProfileData } from "@/types/profile";

const EnterpriseProfile = () => {
  // In a real app, we would fetch this data from an API
  const [profileData, setProfileData] = useState<ProfileData>({
    companyName: "TerraForge Inc.",
    fullName: "Alex Johnson",
    email: "alex@terraforge.com",
    phone: "+1 (555) 123-4567",
    address: "123 Innovation Way, Tech City, CA 94105",
    industry: "Renewable Energy",
    founded: "2015",
    employees: "50-200",
    description: "TerraForge Inc. is a leader in renewable energy solutions, specializing in innovative solar and wind power technologies."
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate saving profile data
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your enterprise profile has been updated successfully",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <div className="container mx-auto px-6 py-10">
        <ProfileHeader isEditing={isEditing} setIsEditing={setIsEditing} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border border-primary/20 bg-background/50 backdrop-blur-sm">
              <CardHeader className="border-b border-primary/10 pb-4">
                <CardTitle className="font-mono text-sm">ENTERPRISE DETAILS</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {isEditing ? (
                  <ProfileForm 
                    profileData={profileData} 
                    handleChange={handleChange} 
                    handleSave={handleSave} 
                    isLoading={isLoading}
                  />
                ) : (
                  <ProfileDetails profileData={profileData} />
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <AccountSidebar profileData={profileData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseProfile;
