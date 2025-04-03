
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileEdit } from "lucide-react";

interface ProfileHeaderProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const ProfileHeader = ({ isEditing, setIsEditing }: ProfileHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <Link 
          to="/enterprise-dashboard" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mr-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-mono">Enterprise Profile</h1>
      </div>
      
      <Button 
        variant={isEditing ? "default" : "outline"}
        onClick={() => setIsEditing(!isEditing)}
        className="font-mono text-xs"
      >
        {isEditing ? (
          <>Cancel Editing</>
        ) : (
          <>
            <FileEdit className="h-4 w-4 mr-2" />
            Edit Profile
          </>
        )}
      </Button>
    </div>
  );
};

export default ProfileHeader;
