
import { Link } from "react-router-dom";
import { BarChart3, Building, CircleDollarSign, CreditCard, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProfileData } from "@/types/profile";

interface DashboardSidebarProps {
  profileData: ProfileData;
  activePage: string;
  financingAmount: string;
  activeDealsCount: number;
}

const DashboardSidebar = ({ 
  profileData, 
  activePage, 
  financingAmount,
  activeDealsCount
}: DashboardSidebarProps) => {
  return (
    <aside className="w-full md:w-64 space-y-6">
      <Card className="bg-background/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="pb-3">
          <h3 className="text-sm font-mono">ENTERPRISE ACCOUNT</h3>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono">
              {profileData.companyName.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-mono text-sm">{profileData.companyName.toUpperCase()}</p>
              <p className="text-xs text-muted-foreground">{profileData.email}</p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground pt-2 border-t border-primary/10">
            <p className="flex justify-between py-1"><span>Industry:</span> <span className="font-mono">{profileData.industry.toUpperCase()}</span></p>
            <p className="flex justify-between py-1"><span>Active RFPs:</span> <span className="font-mono">{activeDealsCount}</span></p>
            <p className="flex justify-between py-1"><span>Total Financing:</span> <span className="font-mono">{financingAmount}</span></p>
          </div>
        </CardContent>
      </Card>
      
      <nav className="space-y-1">
        <Button 
          variant="ghost" 
          className={`w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3 ${activePage === 'dashboard' ? 'bg-primary/5 text-primary border-l-2 border-primary' : ''}`}
        >
          <BarChart3 className="h-4 w-4 mr-3" />
          Dashboard
        </Button>
        <Button 
          variant="ghost" 
          className={`w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3 ${activePage === 'proposals' ? 'bg-primary/5 text-primary border-l-2 border-primary' : ''}`} 
          asChild
        >
          <Link to="/proposals-dashboard">
            <FileText className="h-4 w-4 mr-3" />
            My RFPs
          </Link>
        </Button>
        <Button 
          variant="ghost" 
          className={`w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3 ${activePage === 'create' ? 'bg-primary/5 text-primary border-l-2 border-primary' : ''}`}
          asChild
        >
          <Link to="/create-proposal">
            <CreditCard className="h-4 w-4 mr-3" />
            Create RFP
          </Link>
        </Button>
        <Button 
          variant="ghost" 
          className={`w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3 ${activePage === 'profile' ? 'bg-primary/5 text-primary border-l-2 border-primary' : ''}`}
          asChild
        >
          <Link to="/enterprise-profile">
            <Building className="h-4 w-4 mr-3" />
            Company Profile
          </Link>
        </Button>
        <Button 
          variant="ghost" 
          className={`w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3 ${activePage === 'transactions' ? 'bg-primary/5 text-primary border-l-2 border-primary' : ''}`}
          asChild
        >
          <Link to="/transaction-archive">
            <CircleDollarSign className="h-4 w-4 mr-3" />
            Transactions
          </Link>
        </Button>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
