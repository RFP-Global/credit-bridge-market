
import { ProfileData } from "@/types/profile";

interface ProfileDetailsProps {
  profileData: ProfileData;
}

const ProfileDetails = ({ profileData }: ProfileDetailsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xs text-muted-foreground mb-1 font-mono">ORGANIZATION</h3>
          <p className="font-mono">{profileData.companyName}</p>
        </div>
        
        <div>
          <h3 className="text-xs text-muted-foreground mb-1 font-mono">REPRESENTATIVE</h3>
          <p className="font-mono">{profileData.fullName}</p>
        </div>
        
        <div>
          <h3 className="text-xs text-muted-foreground mb-1 font-mono">EMAIL</h3>
          <p className="font-mono">{profileData.email}</p>
        </div>
        
        <div>
          <h3 className="text-xs text-muted-foreground mb-1 font-mono">PHONE</h3>
          <p className="font-mono">{profileData.phone}</p>
        </div>
        
        <div className="md:col-span-2">
          <h3 className="text-xs text-muted-foreground mb-1 font-mono">ADDRESS</h3>
          <p className="font-mono">{profileData.address}</p>
        </div>
        
        <div>
          <h3 className="text-xs text-muted-foreground mb-1 font-mono">INDUSTRY</h3>
          <p className="font-mono">{profileData.industry}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-xs text-muted-foreground mb-1 font-mono">FOUNDED</h3>
            <p className="font-mono">{profileData.founded}</p>
          </div>
          
          <div>
            <h3 className="text-xs text-muted-foreground mb-1 font-mono">EMPLOYEES</h3>
            <p className="font-mono">{profileData.employees}</p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-xs text-muted-foreground mb-1 font-mono">COMPANY DESCRIPTION</h3>
        <p className="font-mono text-sm leading-relaxed">{profileData.description}</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
