
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CheckCircle, Clock } from "lucide-react";

interface DealProps {
  id: number;
  name: string;
  company: string;
  amount: string;
  status: string;
}

const OverviewTab = () => {
  const activeDeals = [
    { id: 1, name: "Riverside Development", company: "TerraForge Inc.", amount: "$2.4M", status: "Review" },
    { id: 2, name: "Green Energy Initiative", company: "EcoSystems LLC", amount: "$5.7M", status: "Approved" },
    { id: 3, name: "Medical Center Expansion", company: "HealthCore Solutions", amount: "$8.1M", status: "Pending" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="ACTIVE DEALS" value="12" subtext="+3 from last month" />
        <MetricCard title="AVAILABLE RFPs" value="37" subtext="+8 in the last 7 days" />
        <MetricCard title="PORTFOLIO VALUE" value="$145.8M" subtext="Across all active deals" />
      </div>
      
      <ActiveDealsCard deals={activeDeals} />
      
      <PerformanceMetricsCard />
    </div>
  );
};

const MetricCard = ({ title, value, subtext }: { title: string; value: string; subtext: string }) => {
  return (
    <Card className="bg-background/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-mono">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-mono">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
      </CardContent>
    </Card>
  );
};

const ActiveDealsCard = ({ deals }: { deals: DealProps[] }) => {
  return (
    <Card className="bg-background/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-sm font-mono">ACTIVE DEALS</CardTitle>
        <CardDescription>Your current financing deals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deals.map(deal => (
            <div key={deal.id} className="border-b border-primary/10 pb-3 last:border-0 last:pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-mono text-sm">{deal.name}</h3>
                  <p className="text-xs text-muted-foreground">{deal.company}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 font-mono ${
                    deal.status === "Approved" ? "bg-green-100 text-green-800" : 
                    deal.status === "Review" ? "bg-amber-100 text-amber-800" : 
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
        <Button variant="outline" size="sm" className="w-full font-mono text-xs rounded-none">
          VIEW ALL DEALS
          <ArrowUpRight className="ml-2 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const PerformanceMetricsCard = () => {
  return (
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
                <span className="text-sm">Accepted Deals</span>
              </div>
              <div className="text-2xl font-mono">24</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-amber-500 mr-2" />
                <span className="text-sm">Pending Review</span>
              </div>
              <div className="text-2xl font-mono">8</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewTab;
