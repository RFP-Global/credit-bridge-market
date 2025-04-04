
import { ProfileData } from "@/types/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AccountSidebarProps {
  profileData: ProfileData;
}

const AccountSidebar = ({ profileData }: AccountSidebarProps) => {
  // Format date to display creation date nicely
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-6">
      <Card className="border border-primary/20 bg-background/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-mono">ACCOUNT SUMMARY</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between py-1 border-b border-primary/10">
            <span className="text-muted-foreground">Status</span>
            <span className="font-mono text-green-500">ACTIVE</span>
          </div>
          <div className="flex justify-between py-1 border-b border-primary/10">
            <span className="text-muted-foreground">Account Type</span>
            <span className="font-mono">ENTERPRISE</span>
          </div>
          <div className="flex justify-between py-1 border-b border-primary/10">
            <span className="text-muted-foreground">Created</span>
            <span>{formattedDate}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-muted-foreground">ID</span>
            <span className="font-mono text-xs">{profileData.id.substring(0, 8)}</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border border-primary/20 bg-background/50 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-mono">ACCOUNT SECURITY</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between py-1 border-b border-primary/10">
            <span className="text-muted-foreground">Two-Factor Auth</span>
            <span className="font-mono text-amber-500">DISABLED</span>
          </div>
          <div className="flex justify-between py-1 border-b border-primary/10">
            <span className="text-muted-foreground">Last Login</span>
            <span>{formattedDate}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-muted-foreground">Password</span>
            <span className="font-mono">••••••••</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSidebar;
