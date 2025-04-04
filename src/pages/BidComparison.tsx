
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { 
  ArrowLeft, Signal, Radar, Table as TableIcon, 
  DollarSign, ChevronRight, CheckCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

interface Bid {
  id: string;
  amount: string;
  interestRate: string;
  interestRateType: "Fixed" | "Floating";
  term: string;
  facilityType: string;
  status: "Under Review" | "Approved" | "Rejected";
  submittedDate: string;
  additionalTerms: string;
  features?: string[];
}

interface Proposal {
  id: string;
  name: string;
  industry: string;
  status: string;
  principal: string;
}

const BidComparison = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Function to calculate total cost of a loan
  const calculateTotalCost = (amount: string, interestRate: string, term: string): string => {
    // Parse the input values
    const principal = parseFloat(amount.replace(/[^0-9.]/g, '')) * 1000000; // Convert $XM to a number
    const rate = parseFloat(interestRate.replace('%', '')) / 100; // Convert percentage to decimal
    const months = parseInt(term.split(' ')[0]); // Extract months from "XX months"
    
    // For simplified calculation (ignoring compounding), we'll use the formula:
    // Total = Principal + (Principal * Rate * Term in years)
    const years = months / 12;
    const interest = principal * rate * years;
    const total = principal + interest;
    
    // Format the result
    return `$${(total / 1000000).toFixed(2)}M`;
  };
  
  useEffect(() => {
    // Simulate API call to get proposal details
    const fetchProposalDetails = () => {
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
        };
        
        // Enhanced mock data for bids with more details for comparison
        const mockBids: Bid[] = [
          {
            id: "BID-001",
            amount: mockProposal.principal,
            interestRate: "5.75%",
            interestRateType: "Fixed",
            term: "60 months",
            facilityType: "Term Loan",
            status: "Under Review",
            submittedDate: "2023-11-15",
            additionalTerms: "No prepayment penalty after 24 months",
            features: [
              "Annual review of terms",
              "No collateral required",
              "Option to increase credit line after 1 year"
            ]
          },
          {
            id: "BID-002",
            amount: mockProposal.principal,
            interestRate: "5.50%",
            interestRateType: "Floating",
            term: "48 months",
            facilityType: "Revolving Credit",
            status: "Under Review",
            submittedDate: "2023-11-16",
            additionalTerms: "Includes optional line of credit",
            features: [
              "Fixed rate guarantee",
              "Flexible payment schedule",
              "Dedicated account manager"
            ]
          },
          {
            id: "BID-003",
            amount: id === "RFP-2023-001" ? "$2.2M" : 
                   id === "RFP-2023-002" ? "$5.5M" : 
                   id === "RFP-2023-003" ? "$7.8M" : 
                   "$0",
            interestRate: "6.00%",
            interestRateType: "Fixed",
            term: "72 months",
            facilityType: "Bridge Loan",
            status: "Under Review",
            submittedDate: "2023-11-18",
            additionalTerms: "Fixed rate for first 36 months",
            features: [
              "Quarterly performance reviews",
              "Low early repayment fees",
              "Business growth advisory services included"
            ]
          }
        ];
        
        // Check if specific bids were requested via URL params
        const queryParams = new URLSearchParams(location.search);
        const selectedBidIds = queryParams.get('bids')?.split(',');
        
        if (selectedBidIds && selectedBidIds.length > 0) {
          // Filter to only show selected bids
          const filteredBids = mockBids.filter(bid => selectedBidIds.includes(bid.id));
          setBids(filteredBids.length > 0 ? filteredBids : mockBids);
        } else {
          setBids(mockBids);
        }
        
        setProposal(mockProposal);
        setLoading(false);
      }, 500);
    };
    
    fetchProposalDetails();
  }, [id, location.search]);
  
  const handleAcceptBid = (bidId: string) => {
    toast({
      title: "Bid Accepted",
      description: `You've accepted bid ${bidId}. The lender will be notified.`,
    });
    navigate(`/proposal-bids/${id}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative grid-bg">
      <div className="absolute inset-0 z-0">
        <div className="radar-pulse bg-blue-500/10"></div>
        <div className="radar-pulse bg-blue-500/10" style={{ animationDelay: "1s" }}></div>
        <div className="radar-pulse bg-blue-500/10" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <div className="scanline z-10"></div>
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs mr-2" 
            onClick={() => navigate(`/proposal-bids/${id}`)}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Proposal
          </Button>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse">Loading bids for comparison...</div>
          </div>
        ) : proposal ? (
          <>
            <div className="border-b border-primary/10 pb-4 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-mono">Bid Comparison</h1>
                  <p className="text-sm text-muted-foreground">
                    {proposal.name} · ID: {proposal.id} · Principal: {proposal.principal}
                  </p>
                </div>
                <Badge className="bg-primary/20 text-primary rounded-full px-2 py-1 text-xs font-mono">
                  SIDE BY SIDE COMPARISON
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="flex overflow-x-auto pb-4">
                <div className="flex-shrink-0 w-40 mr-4">
                  <div className="h-12 flex items-center">
                    <span className="font-mono text-sm text-muted-foreground">BID DETAILS</span>
                  </div>
                  <div className="font-mono text-sm mb-6 h-12 flex items-center">
                    <span>Bid ID</span>
                  </div>
                  <div className="font-mono text-sm mb-6 h-12 flex items-center">
                    <span>Amount</span>
                  </div>
                  <div className="font-mono text-sm mb-6 h-12 flex items-center">
                    <span>Interest Rate</span>
                  </div>
                  <div className="font-mono text-sm mb-6 h-12 flex items-center">
                    <span>Interest Rate Type</span>
                  </div>
                  <div className="font-mono text-sm mb-6 h-12 flex items-center">
                    <span>Term</span>
                  </div>
                  <div className="font-mono text-sm mb-6 h-12 flex items-center">
                    <span>Facility Type</span>
                  </div>
                  <div className="font-mono text-sm mb-6 h-12 flex items-center">
                    <span>Total Cost</span>
                  </div>
                  <div className="font-mono text-sm mb-6 h-12 flex items-center">
                    <span>Submission Date</span>
                  </div>
                  <div className="font-mono text-sm mb-6">
                    <span>Additional Terms</span>
                  </div>
                  <div className="font-mono text-sm mb-6">
                    <span>Features</span>
                  </div>
                  <div className="font-mono text-sm mb-6 h-12 flex items-center">
                    <span>Action</span>
                  </div>
                </div>
                
                {bids.map((bid) => (
                  <div key={bid.id} className="flex-shrink-0 w-80 bg-background/50 border border-primary/20 rounded-lg p-4 mr-4">
                    <div className="h-12 flex items-center justify-between border-b border-primary/10">
                      <Badge className={`
                        ${bid.status === "Approved" ? "bg-green-500/20 text-green-300" : 
                          bid.status === "Rejected" ? "bg-red-500/20 text-red-300" : 
                          "bg-amber-500/20 text-amber-300"}
                        rounded-full px-2 text-xs mb-2
                      `}>
                        {bid.status}
                      </Badge>
                      <TableIcon className="h-4 w-4 text-primary" />
                    </div>
                    
                    <div className="font-mono text-lg mb-6 h-12 flex items-center">{bid.id}</div>
                    <div className="font-mono text-lg mb-6 h-12 flex items-center">{bid.amount}</div>
                    <div className="font-mono text-lg mb-6 h-12 flex items-center text-green-400">{bid.interestRate}</div>
                    <div className="font-mono text-lg mb-6 h-12 flex items-center">
                      <Badge className={`
                        ${bid.interestRateType === "Fixed" ? "bg-blue-500/20 text-blue-300" : "bg-purple-500/20 text-purple-300"}
                        rounded-full px-2 py-1
                      `}>
                        {bid.interestRateType}
                      </Badge>
                    </div>
                    <div className="font-mono text-lg mb-6 h-12 flex items-center">{bid.term}</div>
                    <div className="font-mono text-lg mb-6 h-12 flex items-center">
                      <Badge className="bg-gray-500/20 text-gray-300 rounded-full px-2 py-1">
                        {bid.facilityType}
                      </Badge>
                    </div>
                    <div className="font-mono text-lg mb-6 h-12 flex items-center text-amber-400 font-bold">
                      {calculateTotalCost(bid.amount, bid.interestRate, bid.term)}
                      <DollarSign className="h-4 w-4 ml-1 text-amber-400" />
                    </div>
                    <div className="font-mono text-sm mb-6 h-12 flex items-center text-muted-foreground">{bid.submittedDate}</div>
                    
                    <div className="mb-6 min-h-24">
                      <p className="text-sm font-extralight">{bid.additionalTerms}</p>
                    </div>
                    
                    <div className="mb-6 min-h-32">
                      <ul className="list-disc list-inside space-y-1">
                        {bid.features?.map((feature, index) => (
                          <li key={index} className="text-sm font-extralight flex items-start">
                            <ChevronRight className="h-3 w-3 mt-0.5 mr-1 flex-shrink-0 text-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="h-12 flex items-center">
                      <Button
                        onClick={() => handleAcceptBid(bid.id)}
                        className="w-full rounded-none font-mono text-xs"
                        variant="outline"
                        disabled={bid.status !== "Under Review"}
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Accept This Bid
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <Button
                  onClick={() => navigate(`/proposal-bids/${id}`)}
                  variant="outline"
                  className="rounded-none font-mono text-xs"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Return to Proposal Details
                </Button>
              </div>
            </div>
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
      </div>
    </div>
  );
};

export default BidComparison;
