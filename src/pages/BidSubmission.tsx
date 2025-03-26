
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Building, DollarSign, Percent, Calendar, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { financeProposals } from "@/data/marketplaceProposals";
import { FinanceProposal } from "@/types/marketplace";
import Navbar from "@/components/Navbar";

const BidSubmission = () => {
  const { id } = useParams<{ id: string }>();
  const [proposal, setProposal] = useState<FinanceProposal | null>(null);
  const [acceptOriginalTerms, setAcceptOriginalTerms] = useState(true);
  const [principal, setPrincipal] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [term, setTerm] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      // Find the proposal in our data
      const foundProposal = financeProposals.find(p => p.id === id);
      if (foundProposal) {
        setProposal(foundProposal);
        // Initialize with the original terms
        setPrincipal(foundProposal.principal.replace(/[^0-9.]/g, ""));
        setInterestRate(foundProposal.interestRate.replace(/[^0-9.]/g, ""));
        setTerm(foundProposal.term.split(" ")[0]);
      }
      setLoading(false);
    }
  }, [id]);

  const handleSubmitBid = () => {
    // In a real application, this would submit to an API
    toast({
      title: "Bid Submitted Successfully",
      description: `Your bid for ${proposal?.projectName} has been submitted for review.`,
      variant: "default",
    });
    
    // Redirect back to the marketplace
    navigate("/marketplace");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-gray-200">
        <Navbar />
        <div className="container mx-auto px-4 py-6 pt-24">
          <div className="flex items-center justify-center h-[80vh]">
            <div className="animate-pulse">Loading proposal details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen bg-black text-gray-200">
        <Navbar />
        <div className="container mx-auto px-4 py-6 pt-24">
          <div className="flex flex-col items-center justify-center h-[80vh]">
            <h1 className="text-2xl mb-4">Proposal Not Found</h1>
            <Button asChild>
              <Link to="/marketplace">Return to Marketplace</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 pt-24">
        {/* Back button and header */}
        <div className="mb-6">
          <Button variant="outline" size="sm" asChild className="mb-4">
            <Link to={`/proposal/${id}`} className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Proposal
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Submit Bid for {proposal.projectName}
              </h1>
              <p className="text-gray-400 mt-1">
                <span className="font-semibold">{proposal.industry}</span> • 
                <span className="ml-2">{proposal.facilityType}</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Original proposal summary */}
          <Card className="bg-black border-gray-800">
            <CardHeader className="border-b border-gray-800">
              <CardTitle className="text-sm font-mono">ORIGINAL PROPOSAL TERMS</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2 text-gray-400" />
                    <p className="text-xs text-gray-400">FACILITY TYPE</p>
                  </div>
                  <p className="font-semibold">{proposal.facilityType}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                    <p className="text-xs text-gray-400">PRINCIPAL</p>
                  </div>
                  <p className="font-semibold">{proposal.principal}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Percent className="h-4 w-4 mr-2 text-gray-400" />
                    <p className="text-xs text-gray-400">INTEREST RATE</p>
                  </div>
                  <p className="font-semibold">{proposal.interestRate}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <p className="text-xs text-gray-400">TERM</p>
                  </div>
                  <p className="font-semibold">{proposal.term}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-xs text-gray-400">FINANCING TYPE</p>
                  </div>
                  <p className="font-semibold">{proposal.financingType}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <p className="text-xs text-gray-400">BID DEADLINE</p>
                  </div>
                  <p className="font-semibold">{proposal.bidDeadline}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Bid submission form */}
          <Card className="lg:col-span-2 bg-black border-gray-800">
            <CardHeader className="border-b border-gray-800">
              <CardTitle className="text-sm font-mono">YOUR BID TERMS</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue={acceptOriginalTerms ? "accept" : "custom"} className="w-full mb-6">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger 
                    value="accept" 
                    className="font-mono text-xs"
                    onClick={() => setAcceptOriginalTerms(true)}
                  >
                    ACCEPT ORIGINAL TERMS
                  </TabsTrigger>
                  <TabsTrigger 
                    value="custom" 
                    className="font-mono text-xs"
                    onClick={() => setAcceptOriginalTerms(false)}
                  >
                    PROPOSE CUSTOM TERMS
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="accept">
                  <div className="space-y-4">
                    <div className="flex items-center text-green-500 mb-4">
                      <Check className="h-5 w-5 mr-2" />
                      <p>You are accepting the original terms as proposed.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="original-principal" className="text-xs text-gray-400 mb-2 block">PRINCIPAL</Label>
                        <Input 
                          id="original-principal" 
                          value={proposal.principal} 
                          disabled 
                          className="bg-gray-900/50 border-gray-700"
                        />
                      </div>
                      <div>
                        <Label htmlFor="original-interest" className="text-xs text-gray-400 mb-2 block">INTEREST RATE</Label>
                        <Input 
                          id="original-interest" 
                          value={proposal.interestRate} 
                          disabled 
                          className="bg-gray-900/50 border-gray-700"
                        />
                      </div>
                      <div>
                        <Label htmlFor="original-term" className="text-xs text-gray-400 mb-2 block">TERM</Label>
                        <Input 
                          id="original-term" 
                          value={proposal.term} 
                          disabled 
                          className="bg-gray-900/50 border-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="custom">
                  <div className="space-y-4">
                    <div className="flex items-center text-blue-400 mb-4">
                      <Percent className="h-5 w-5 mr-2" />
                      <p>You are proposing custom terms for this request.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="custom-principal" className="text-xs text-gray-400 mb-2 block">PRINCIPAL ($)</Label>
                        <Input 
                          id="custom-principal" 
                          value={principal} 
                          onChange={(e) => setPrincipal(e.target.value)} 
                          className="bg-gray-900/50 border-gray-700"
                          placeholder="1,000,000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="custom-interest" className="text-xs text-gray-400 mb-2 block">INTEREST RATE (%)</Label>
                        <Input 
                          id="custom-interest" 
                          value={interestRate} 
                          onChange={(e) => setInterestRate(e.target.value)} 
                          className="bg-gray-900/50 border-gray-700"
                          placeholder="4.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="custom-term" className="text-xs text-gray-400 mb-2 block">TERM (MONTHS)</Label>
                        <Input 
                          id="custom-term" 
                          value={term} 
                          onChange={(e) => setTerm(e.target.value)} 
                          className="bg-gray-900/50 border-gray-700"
                          placeholder="36"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="notes" className="text-xs text-gray-400 mb-2 block">ADDITIONAL NOTES</Label>
                  <Textarea 
                    id="notes" 
                    value={additionalNotes} 
                    onChange={(e) => setAdditionalNotes(e.target.value)} 
                    className="bg-gray-900/50 border-gray-700 min-h-[120px]"
                    placeholder="Add any additional notes or terms for your bid proposal..."
                  />
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button 
                    variant="outline" 
                    className="mr-4"
                    onClick={() => navigate(`/proposal/${id}`)}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSubmitBid} 
                    className="bid-button"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Submit Bid
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BidSubmission;
