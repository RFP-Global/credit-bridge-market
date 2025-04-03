
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ProfileData } from "@/types/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AccountSidebarProps {
  profileData: ProfileData;
}

const AccountSidebar = ({ profileData }: AccountSidebarProps) => {
  return (
    <Card className="border border-primary/20 bg-background/50 backdrop-blur-sm sticky top-20">
      <CardHeader className="border-b border-primary/10 pb-4">
        <CardTitle className="font-mono text-sm">ACCOUNT STATUS</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono">
              {profileData.companyName?.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-mono text-sm">{profileData.companyName}</p>
              <p className="text-xs text-muted-foreground">{profileData.email}</p>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground pt-2 border-t border-primary/10">
            <p className="flex justify-between py-1"><span>Account Level:</span> <span className="font-mono">ENTERPRISE</span></p>
            <p className="flex justify-between py-1"><span>Member Since:</span> <span className="font-mono">APR 2025</span></p>
            <p className="flex justify-between py-1"><span>Status:</span> <span className="font-mono text-green-500">ACTIVE</span></p>
          </div>
          
          <div className="pt-4 space-y-3">
            <Button variant="outline" size="sm" className="w-full font-mono text-xs">
              Account Settings
            </Button>
            <Button variant="outline" size="sm" className="w-full font-mono text-xs">
              Security Settings
            </Button>
            <Link to="/enterprise-dashboard">
              <Button variant="default" size="sm" className="w-full font-mono text-xs">
                Return to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSidebar;
