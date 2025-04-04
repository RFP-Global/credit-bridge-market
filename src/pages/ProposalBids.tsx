
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  BarChart3, FileText, ArrowLeft, Signal, Radar, 
  Bell, Settings, Building, CreditCard, ShoppingCart, Users, CheckCircle, Clock, DollarSign, ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface Bid {
  id: string;
  amount: string;
  interestRate: string;
  term: string;
  status: "Under Review" | "Approved" | "Rejected";
  submittedDate: string;
  additionalTerms: string;
}

interface WinningTerms {
  amount: string;
  interestRate: string;
  term: string;
  additionalTerms: string;
}

interface Proposal {
  id: string;
  name: string;
  industry: string;
  status: string;
  principal: string;
  bidDeadline: string;
  description?: string;
  winningTerms?: WinningTerms;
}

const ProposalBids = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Mock data for the selected proposal
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to get proposal details
    const fetchProposalDetails = () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        // Mock data for the proposal
        const mockProposal: Proposal = {
          id: id || "",
          name: id === "RFP-2023-001" ? "Riverside Development" : 
                id === "RFP-2023-002" ? "Green Energy Initiative" : 
                id === "RFP-2023-003" ? "Medical Center Expansion" : 
                "Unknown Project",
          industry: id === "RFP-2023-001" ? "Commercial Real Estate" : 
                   id === "RFP-2023-002" ? "Renewable Energy" : 
                   id === "RFP-2023-003" ? "Healthcare" : 
                   "Other",
          status: "OPEN",
          principal: id === "RFP-2023-001" ? "$2.4M" : 
                    id === "RFP-2023-002" ? "$5.7M" : 
                    id === "RFP-2023-003" ? "$8.1M" : 
                    "$0",
          bidDeadline: id === "RFP-2023-001" ? "2023-12-31" : 
                      id === "RFP-2023-002" ? "2023-12-15" : 
                      id === "RFP-2023-003" ? "2024-01-15" : 
                      "N/A",
          description: "This project aims to create a sustainable and modern development that meets the highest environmental standards while delivering exceptional returns for investors.",
          winningTerms: {
            amount: id === "RFP-2023-001" ? "$2.4M" : 
                   id === "RFP-2023-002" ? "$5.7M" : 
                   id === "RFP-2023-003" ? "$8.1M" : 
                   "$0",
            interestRate: "5.50%",
            term: "60 months",
            additionalTerms: "No prepayment penalty after 24 months, includes optional line of credit"
          }
        };
        
        // Mock data for bids
        const mockBids: Bid[] = [
          {
            id: "BID-001",
            amount: mockProposal.principal,
            interestRate: "5.75%",
            term: "60 months",
            status: "Under Review",
            submittedDate: "2023-11-15",
            additionalTerms: "No prepayment penalty after 24 months"
          },
          {
            id: "BID-002",
            amount: mockProposal.principal,
            interestRate: "5.50%",
            term: "48 months",
            status: "Under Review",
            submittedDate: "2023-11-16",
            additionalTerms: "Includes optional line of credit"
          },
          {
            id: "BID-003",
            amount: id === "RFP-2023-001" ? "$2.2M" : 
                   id === "RFP-2023-002" ? "$5.5M" : 
                   id === "RFP-2023-003" ? "$7.8M" : 
                   "$0",
            interestRate: "6.00%",
            term: "72 months",
            status: "Under Review",
            submittedDate: "2023-11-18",
            additionalTerms: "Fixed rate for first 36 months"
          }
        ];
        
        setProposal(mockProposal);
        setBids(mockBids);
        setLoading(false);
      }, 500);
    };
    
    fetchProposalDetails();
  }, [id]);
  
  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "Successfully logged out of your enterprise account",
    });
    navigate("/");
  };
  
  const handleAcceptBid = (bidId: string) => {
    toast({
      title: "Bid Accepted",
      description: `You've accepted bid ${bidId}. The lender will be notified.`,
    });
    
    // Update the bids list to mark this bid as approved
    setBids(prevBids => 
      prevBids.map(bid => 
        bid.id === bidId 
          ? { ...bid, status: "Approved" } 
          : bid
      )
    );
  };
  
  const handleRejectBid = (bidId: string) => {
    toast({
      title: "Bid Rejected",
      description: `You've rejected bid ${bidId}. The lender will be notified.`,
    });
    
    // Update the bids list to mark this bid as rejected
    setBids(prevBids => 
      prevBids.map(bid => 
        bid.id === bidId 
          ? { ...bid, status: "Rejected" } 
          : bid
      )
    );
  };

  const handleCompareBids = () => {
    // This would navigate to a bid comparison page
    navigate(`/bid-comparison/${id}`);
    toast({
      title: "Navigating to Bid Comparison",
      description: "This would take you to a page where you can compare bids side by side.",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative grid-bg">
      <div className="absolute inset-0 z-0">
        <div className="radar-pulse bg-blue-500/10"></div>
        <div className="radar-pulse bg-blue-500/10" style={{ animationDelay: "1s" }}></div>
        <div className="radar-pulse bg-blue-500/10" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <div className="scanline z-10"></div>
      
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="relative mr-2">
                  <Radar className="h-6 w-6 text-primary" />
                  <Signal className="h-4 w-4 text-primary/70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <span className="font-mono text-xl">RFP GLOBAL</span>
              </Link>
              <span className="ml-4 text-xs font-mono text-foreground/60 border-l border-primary/20 pl-4">ENTERPRISE PORTAL</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-primary/10 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
              </button>
              <button className="p-2 rounded-full hover:bg-primary/10">
                <Settings className="h-5 w-5" />
              </button>
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-none font-mono border-primary/30 text-xs"
                onClick={handleLogout}
              >
                LOGOUT
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-64 space-y-6">
            <Card className="border border-primary/20 bg-background/50 backdrop-blur-sm overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono">ENTERPRISE ACCOUNT</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono">TF</div>
                  <div>
                    <p className="font-mono text-sm">TERRAFORGE INC.</p>
                    <p className="text-xs text-muted-foreground">admin@terraforge.com</p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground pt-2 border-t border-primary/10">
                  <p className="flex justify-between py-1"><span>Account Level:</span> <span className="font-mono">ENTERPRISE</span></p>
                  <p className="flex justify-between py-1"><span>Active Proposals:</span> <span className="font-mono">7</span></p>
                  <p className="flex justify-between py-1"><span>Total Financing:</span> <span className="font-mono">$28.5M</span></p>
                </div>
              </CardContent>
            </Card>
            
            <nav className="space-y-1">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3"
                onClick={() => navigate("/enterprise-dashboard")}
              >
                <BarChart3 className="h-4 w-4 mr-3" />
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3 bg-primary/5 text-primary border-l-2 border-primary"
                onClick={() => navigate("/proposals-dashboard")}
              >
                <FileText className="h-4 w-4 mr-3" />
                Proposals
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3"
                onClick={() => navigate("/marketplace")}
              >
                <ShoppingCart className="h-4 w-4 mr-3" />
                Marketplace
              </Button>
              <Button variant="ghost" className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3">
                <Building className="h-4 w-4 mr-3" />
                Lenders
              </Button>
              <Button variant="ghost" className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3">
                <CreditCard className="h-4 w-4 mr-3" />
                Financing
              </Button>
              <Button variant="ghost" className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3">
                <Users className="h-4 w-4 mr-3" />
                Team
              </Button>
            </nav>
          </aside>
          
          <main className="flex-1">
            <div className="flex items-center mb-6">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs mr-2" 
                onClick={() => navigate("/proposals-dashboard")}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Proposals
              </Button>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-pulse">Loading proposal details...</div>
              </div>
            ) : proposal ? (
              <>
                <div className="border-b border-primary/10 pb-4 mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl font-mono">{proposal.name}</h1>
                      <p className="text-sm text-muted-foreground">ID: {proposal.id} · {proposal.industry}</p>
                    </div>
                    <Badge className="bg-white/10 text-white rounded-full px-2 py-1 text-xs font-mono">
                      {proposal.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full border-primary/40 hover:bg-primary/10 font-mono flex justify-between items-center"
                    onClick={handleCompareBids}
                  >
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded mr-3">
                        <DollarSign className="h-5 w-5" />
                      </div>
                      COMPARE BIDS SIDE BY SIDE
                    </div>
                    <ArrowUpRight className="h-5 w-5" />
                  </Button>
                </div>
                
                {proposal.description && (
                  <Card className="border-primary/20 bg-background/50 mb-6">
                    <CardHeader>
                      <CardTitle className="text-sm font-mono">PROJECT DESCRIPTION</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-extralight">{proposal.description}</p>
                    </CardContent>
                  </Card>
                )}
                
                <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-sm font-mono">RECEIVED BIDS</CardTitle>
                    <CardDescription>Financing offers from lenders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">BID ID</TableHead>
                          <TableHead>AMOUNT</TableHead>
                          <TableHead>INTEREST</TableHead>
                          <TableHead>TERM</TableHead>
                          <TableHead>SUBMITTED</TableHead>
                          <TableHead>STATUS</TableHead>
                          <TableHead>ACTIONS</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bids.map((bid) => (
                          <TableRow key={bid.id}>
                            <TableCell className="font-mono text-xs">{bid.id}</TableCell>
                            <TableCell className="font-mono font-extralight">{bid.amount}</TableCell>
                            <TableCell className="font-mono font-extralight">{bid.interestRate}</TableCell>
                            <TableCell className="font-mono font-extralight">{bid.term}</TableCell>
                            <TableCell className="font-mono text-xs font-extralight">{bid.submittedDate}</TableCell>
                            <TableCell>
                              <Badge className={`
                                ${bid.status === "Approved" ? "bg-green-500/20 text-green-300" : 
                                  bid.status === "Rejected" ? "bg-red-500/20 text-red-300" : 
                                  "bg-amber-500/20 text-amber-300"}
                                rounded-full px-2 text-xs
                              `}>
                                {bid.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-1">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className={`font-extralight text-xs h-7 px-2 ${bid.status !== "Under Review" ? "opacity-50 cursor-not-allowed" : ""}`}
                                  onClick={() => bid.status === "Under Review" && handleAcceptBid(bid.id)}
                                  disabled={bid.status !== "Under Review"}
                                >
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Accept
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className={`font-extralight text-xs h-7 px-2 ${bid.status !== "Under Review" ? "opacity-50 cursor-not-allowed" : ""}`}
                                  onClick={() => bid.status === "Under Review" && handleRejectBid(bid.id)}
                                  disabled={bid.status !== "Under Review"}
                                >
                                  <Clock className="h-3 w-3 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="text-center py-12">
                <p>Proposal not found.</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4" 
                  onClick={() => navigate("/proposals-dashboard")}
                >
                  Return to Proposals
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProposalBids;
