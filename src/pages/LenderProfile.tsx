
import { useState, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building, ArrowLeft, Calendar, DollarSign, Globe, 
  Briefcase, Clock, BarChart, Tag, Bookmark, Award, 
  CreditCard, Lightbulb, CheckCircle, MapPin, Search
} from "lucide-react";
import { getLenderById } from "@/data/lendersData";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LenderProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the previous page from location state, default to lenders page if not available
  const goBack = () => {
    const previousPage = location.state?.from || "/lenders";
    navigate(previousPage);
  };
  
  const lender = getLenderById(id || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [projectTypeFilter, setProjectTypeFilter] = useState("all");

  if (!lender) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <Building className="h-16 w-16 text-primary/20 mb-4" />
            <h2 className="text-2xl font-mono mb-2">Lender Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The lender profile you're looking for doesn't exist or has been removed.
            </p>
            <Button 
              variant="outline" 
              onClick={goBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleConnectRequest = () => {
    toast({
      title: "Connection Request Sent",
      description: `Your request to connect with ${lender.code} has been submitted.`,
    });
  };

  // Get unique project types for filter
  const projectTypes = useMemo(() => {
    if (!lender.recentDeals) return [];
    return Array.from(new Set(lender.recentDeals.map(deal => deal.projectType)));
  }, [lender.recentDeals]);

  // Filter and search transactions
  const filteredTransactions = useMemo(() => {
    if (!lender.recentDeals) return [];
    
    return lender.recentDeals.filter(deal => {
      const matchesSearch = searchTerm === "" || 
        deal.projectType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.term.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = projectTypeFilter === "all" || deal.projectType === projectTypeFilter;
      
      return matchesSearch && matchesFilter;
    });
  }, [lender.recentDeals, searchTerm, projectTypeFilter]);

  const handleTransactionClick = (dealId: string) => {
    navigate(`/transaction-details/${dealId}`, { 
      state: { from: `/lender/${id}` } 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={goBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
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
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg font-mono">Transaction History</CardTitle>
                  <CardDescription>Sample deals completed by this lender</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search transactions..."
                      className="pl-8 h-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={projectTypeFilter} onValueChange={setProjectTypeFilter}>
                    <SelectTrigger className="w-[180px] h-9">
                      <SelectValue placeholder="Project Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Project Types</SelectItem>
                      {projectTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Term</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((deal) => (
                      <TableRow 
                        key={deal.id}
                        className="cursor-pointer hover:bg-primary/5"
                        onClick={() => handleTransactionClick(deal.id.toString())}
                      >
                        <TableCell className="font-medium">{deal.projectType}</TableCell>
                        <TableCell className="font-mono">{deal.amount}</TableCell>
                        <TableCell>{deal.term}</TableCell>
                        <TableCell className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" /> {deal.location}
                        </TableCell>
                        <TableCell>{new Date(deal.date).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                        No transactions found matching your filters
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
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
    </div>
  );
};

export default LenderProfile;
