
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { BidCard } from "@/components/bids/BidCard";
import { BidDetailsHeader } from "@/components/bids/BidDetailsHeader";
import { fetchProposalDetails } from "@/services/proposalService";
import { Proposal, Bid } from "@/types/bids";

const BidComparison = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadProposalData = async () => {
      try {
        // Check if specific bids were requested via URL params
        const queryParams = new URLSearchParams(location.search);
        const selectedBidIds = queryParams.get('bids')?.split(',');
        
        const result = await fetchProposalDetails(id, selectedBidIds);
        setProposal(result.proposal);
        setBids(result.bids);
      } catch (error) {
        console.error("Error loading proposal data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProposalData();
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
                <BidDetailsHeader />
                
                {bids.map((bid) => (
                  <BidCard 
                    key={bid.id} 
                    bid={bid} 
                    onAccept={handleAcceptBid}
                  />
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
