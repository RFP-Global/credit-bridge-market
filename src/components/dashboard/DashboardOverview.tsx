
import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProfileData } from "@/types/profile";

interface DealType {
  id: number;
  name: string;
  amount: string;
  status: string;
}

interface DashboardOverviewProps {
  profileData: ProfileData;
  activeDeals: DealType[];
  metrics: {
    matchedLenders: number;
    financingAmount: string;
    completedRFPs: number;
    pendingReviews: number;
  };
}

const DashboardOverview = ({ profileData, activeDeals, metrics }: DashboardOverviewProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-background/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono">ACTIVE RFPS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-mono">{activeDeals.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Seeking capital</p>
          </CardContent>
        </Card>
        <Card className="bg-background/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono">MATCHED LENDERS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-mono">{metrics.matchedLenders}</div>
            <p className="text-xs text-muted-foreground mt-1">Interested in your RFPs</p>
          </CardContent>
        </Card>
        <Card className="bg-background/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono">FINANCING SECURED</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-mono">{metrics.financingAmount}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all RFPs</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-background/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-sm font-mono">ACTIVE RFPS</CardTitle>
          <CardDescription>Your current financing requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeDeals.map(deal => (
              <div key={deal.id} className="border-b border-primary/10 pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-mono text-sm">{deal.name}</h3>
                    <p className="text-xs text-muted-foreground">{profileData.companyName}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 font-mono ${
                      deal.status === "Approved" ? "bg-green-100 text-green-800" : 
                      deal.status === "Review" ? "bg-amber-100 text-amber-800" : 
                      deal.status === "Pending" ? "bg-blue-100 text-blue-800" :
                      "bg-blue-100 text-blue-800"
                    }`}>
                      {deal.status}
                    </span>
                    <p className="text-xs font-mono mt-1">{deal.amount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full font-mono text-xs rounded-none" asChild>
            <Link to="/proposals-dashboard">
              VIEW ALL RFPS
              <ArrowUpRight className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="bg-background/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-sm font-mono">PERFORMANCE METRICS</CardTitle>
          <CardDescription>Your financing activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Completed RFPs</span>
                </div>
                <div className="text-2xl font-mono">{metrics.completedRFPs}</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-sm">Pending Review</span>
                </div>
                <div className="text-2xl font-mono">{metrics.pendingReviews}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
