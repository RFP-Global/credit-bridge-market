
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface DealType {
  id: number;
  name: string;
  amount: string;
  status: string;
}

interface ActiveRFPsTabProps {
  companyName: string;
  activeDeals: DealType[];
}

const ActiveRFPsTab = ({ companyName, activeDeals }: ActiveRFPsTabProps) => {
  return (
    <div className="space-y-4">
      <Card className="bg-background/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-sm font-mono">ALL ACTIVE RFPS</CardTitle>
          <CardDescription>Manage your financing requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeDeals.length > 0 ? (
              activeDeals.map(deal => (
                <div key={deal.id} className="border-b border-primary/10 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-mono text-sm">{deal.name}</h3>
                      <p className="text-xs text-muted-foreground">{companyName}</p>
                      <p className="text-xs mt-1">Created on {new Date().toLocaleDateString()}</p>
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
                  <div className="mt-3 flex justify-end">
                    <Button variant="ghost" size="sm" className="text-xs">View Details</Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No active RFPs found.</p>
                <Button className="mt-4" asChild>
                  <Link to="/create-proposal">Create Your First RFP</Link>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full font-mono text-xs rounded-none" asChild>
            <Link to="/proposals-dashboard">
              GO TO RFP DASHBOARD
              <ArrowUpRight className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ActiveRFPsTab;
