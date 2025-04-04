
import { useParams, useNavigate } from "react-router-dom";
import EnterpriseLayout from "@/components/layout/EnterpriseLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building, ArrowLeft, Calendar, DollarSign, Globe, 
  Briefcase, Clock, BarChart, Tag, Bookmark, Award, 
  CreditCard, Lightbulb, CheckCircle, MapPin
} from "lucide-react";
import { getLenderById } from "@/data/lendersData";
import { toast } from "@/hooks/use-toast";

const LenderProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const lender = getLenderById(id || "");

  if (!lender) {
    return (
      <EnterpriseLayout>
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <Building className="h-16 w-16 text-primary/20 mb-4" />
          <h2 className="text-2xl font-mono mb-2">Lender Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The lender profile you're looking for doesn't exist or has been removed.
          </p>
          <Button 
            variant="outline" 
            onClick={() => navigate("/lenders")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Lenders
          </Button>
        </div>
      </EnterpriseLayout>
    );
  }

  const handleConnectRequest = () => {
    toast({
      title: "Connection Request Sent",
      description: `Your request to connect with ${lender.code} has been submitted.`,
    });
  };

  return (
    <EnterpriseLayout
      title="Lender Profile"
      description="Detailed information about this financial institution."
    >
      <div className="container mx-auto px-0 py-0">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate("/lenders")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Lenders
        </Button>

        <div className="space-y-6">
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-mono">{lender.code}</CardTitle>
                  <CardDescription className="mt-2">{lender.description}</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  className="rounded-none font-mono text-xs border-primary/20"
                  onClick={handleConnectRequest}
                >
                  REQUEST CONNECTION
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-primary/60" />
                    <div>
                      <p className="text-sm text-muted-foreground">Funding Capacity</p>
                      <p className="font-mono">{lender.fundingCapacity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tag className="h-5 w-5 text-primary/60" />
                    <div>
                      <p className="text-sm text-muted-foreground">Minimum Deal Size</p>
                      <p className="font-mono">{lender.minimumDeal}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary/60" />
                    <div>
                      <p className="text-sm text-muted-foreground">Years in Business</p>
                      <p className="font-mono">{lender.yearsInBusiness}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary/60" />
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. Processing Time</p>
                      <p className="font-mono">{lender.avgProcessingTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary/60" />
                    <div>
                      <p className="text-sm text-muted-foreground">Success Rate</p>
                      <p className="font-mono">{lender.successRate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-primary/60" />
                    <div>
                      <p className="text-sm text-muted-foreground">Interest Rates</p>
                      <p className="font-mono">{lender.interestRates}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-semibold mb-2 flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" /> Specialties
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {lender.specialties.map((specialty, index) => (
                      <span key={index} className="bg-primary/10 px-2 py-0.5 text-xs font-mono">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-2 flex items-center">
                    <Globe className="h-4 w-4 mr-2" /> Preferred Regions
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {lender.preferredRegions.map((region, index) => (
                      <span key={index} className="bg-primary/10 px-2 py-0.5 text-xs font-mono">
                        {region}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-2 flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2" /> Industries Served
                </h3>
                <div className="flex flex-wrap gap-1">
                  {lender.industries?.map((industry, index) => (
                    <span key={index} className="bg-primary/10 px-2 py-0.5 text-xs font-mono">
                      {industry}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2 flex items-center">
                  <Bookmark className="h-4 w-4 mr-2" /> Loan Types
                </h3>
                <div className="flex flex-wrap gap-1">
                  {lender.loanTypes?.map((loanType, index) => (
                    <span key={index} className="bg-primary/10 px-2 py-0.5 text-xs font-mono">
                      {loanType}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg font-mono">Recent Transactions</CardTitle>
              <CardDescription>Sample deals completed by this lender</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lender.recentDeals?.map((deal) => (
                  <Card key={deal.id} className="bg-primary/5">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Project</p>
                          <p className="font-mono text-sm">{deal.projectType}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Amount</p>
                          <p className="font-mono text-sm">{deal.amount}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Term</p>
                          <p className="font-mono text-sm">{deal.term}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Location</p>
                          <p className="font-mono text-sm flex items-center">
                            <MapPin className="h-3 w-3 mr-1" /> {deal.location}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Date Completed</p>
                          <p className="font-mono text-sm">{new Date(deal.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pt-2 pb-6">
              <p className="text-xs text-muted-foreground text-center max-w-md">
                These transactions are representative of the lender's activity and do not constitute a guarantee of similar terms for your project.
              </p>
            </CardFooter>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg font-mono">Typical Terms and Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold mb-1">Loan Terms</h3>
                  <p className="text-sm">{lender.typicalTerms}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Processing Timeline</h3>
                  <p className="text-sm">{lender.avgProcessingTime}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Approval Process</h3>
                  <p className="text-sm">
                    All applications undergo a comprehensive underwriting process. The lender's credit committee reviews each proposal to ensure alignment with their investment strategy.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Documentation Requirements</h3>
                  <p className="text-sm">
                    Standard documentation includes financial statements, business plans, property information, and credit history. Additional documents may be required depending on the loan type and project specifics.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end pt-2">
              <Button 
                variant="outline" 
                className="rounded-none font-mono text-xs border-primary/20"
                onClick={handleConnectRequest}
              >
                REQUEST CONNECTION
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </EnterpriseLayout>
  );
};

export default LenderProfile;
