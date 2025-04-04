
import { ProfileData } from "@/types/profile";

interface ProfileDetailsProps {
  profileData: ProfileData;
}

const ProfileDetails = ({ profileData }: ProfileDetailsProps) => {
  return (
    <div className="border border-primary/20 bg-background/50 backdrop-blur-sm p-6 space-y-6">
      <div className="border-b border-primary/10 pb-4">
        <h2 className="text-xl font-mono">{profileData.companyName}</h2>
        <p className="text-sm text-muted-foreground mt-1">{profileData.industry}</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-3">
          <h3 className="font-mono text-sm text-muted-foreground">COMPANY INFORMATION</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Representative</p>
              <p>{profileData.fullName}</p>
            </div>
            
            <div>
              <p className="text-xs text-muted-foreground">Email Address</p>
              <p>{profileData.email}</p>
            </div>
            
            <div>
              <p className="text-xs text-muted-foreground">Phone Number</p>
              <p>{profileData.phone || "Not provided"}</p>
            </div>
            
            <div>
              <p className="text-xs text-muted-foreground">Company Address</p>
              <p>{profileData.address || "Not provided"}</p>
            </div>
            
            <div>
              <p className="text-xs text-muted-foreground">Year Founded</p>
              <p>{profileData.founded || "Not provided"}</p>
            </div>
            
            <div>
              <p className="text-xs text-muted-foreground">Number of Employees</p>
              <p>{profileData.employees || "Not provided"}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="font-mono text-sm text-muted-foreground">COMPANY DESCRIPTION</h3>
          <p className="text-sm">{profileData.description || "No description provided."}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
