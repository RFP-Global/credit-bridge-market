
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Building, DollarSign, Percent, Calendar, Check, X, Upload, Info, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { financeProposals } from "@/data/marketplace";
import { FinanceProposal } from "@/types/marketplace";
import Navbar from "@/components/Navbar";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

const BidSubmission = () => {
  const { id } = useParams<{ id: string }>();
  const [proposal, setProposal] = useState<FinanceProposal | null>(null);
  const [acceptOriginalTerms, setAcceptOriginalTerms] = useState(true);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [daysLeft, setDaysLeft] = useState(0);
  
  const [principal, setPrincipal] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [term, setTerm] = useState("");
  const [loanType, setLoanType] = useState("");
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const foundProposal = financeProposals.find(p => p.id === id);
      if (foundProposal) {
        setProposal(foundProposal);
        setPrincipal(foundProposal.principal.replace(/[^0-9.]/g, ""));
        setInterestRate(foundProposal.interestRate.replace(/[^0-9.]/g, ""));
        setTerm(foundProposal.term.split(" ")[0]);
        setLoanType(foundProposal.facilityType);
        
        const deadlineDate = new Date(foundProposal.bidDeadline);
        const today = new Date();
        const diffTime = deadlineDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysLeft(diffDays > 0 ? diffDays : 0);
      }
      setLoading(false);
    }
  }, [id]);

  const handleSubmitBid = () => {
    toast({
      title: "Bid Submitted Successfully",
      description: `Your bid for ${proposal?.projectName} has been submitted for review.`,
      variant: "default",
    });
    
    navigate("/marketplace");
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your bid draft has been saved. You can continue later.",
      variant: "default",
    });
  };

  const handleNextStep = () => {
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePreviousStep = () => {
    setStep(1);
    window.scrollTo(0, 0);
  };

  const handleApplyProposalTerms = () => {
    setAcceptOriginalTerms(true);
    toast({
      title: "Original Terms Applied",
      description: "You are now using the original proposal terms.",
      variant: "default",
    });
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
    <div className="min-h-screen bg-black text-gray-200 relative">
      <div className="absolute inset-0 bg-grid-pattern bg-grid-size opacity-20 pointer-events-none" />
      
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 pt-24 relative z-10">
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
            <Link to="/marketplace" className="hover:text-white">Marketplace</Link>
            <span>&gt;</span>
            <span>Place a Bid</span>
            <span>&gt;</span>
            <span className="text-white">Step {step}</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                {step === 1 ? "Proposal Details" : "Bid Details"}
              </h1>
              <p className="text-gray-400 mt-1">
                <span className="font-semibold">{proposal.industry}</span> • 
                <span className="ml-2">{daysLeft} days left</span>
              </p>
            </div>

            {step === 1 && (
              <Button 
                variant="outline" 
                className="self-start" 
                onClick={handleApplyProposalTerms}
              >
                Apply Proposal Terms
              </Button>
            )}
          </div>
        </div>
        
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="loan-type" className="text-xs text-gray-400 mb-2 block">Type of Loan</Label>
                  <Input 
                    id="loan-type" 
                    value={proposal.facilityType}
                    readOnly
                    className="bg-gray-900/50 border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="loan-amount" className="text-xs text-gray-400 mb-2 block">Loan Target Size</Label>
                  <Input 
                    id="loan-amount" 
                    value={proposal.principal}
                    readOnly
                    className="bg-gray-900/50 border-gray-700"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="interest-rate" className="text-xs text-gray-400 mb-2 block">Loan Target Interest Rate</Label>
                  <Input 
                    id="interest-rate" 
                    value={proposal.interestRate}
                    readOnly
                    className="bg-gray-900/50 border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="term" className="text-xs text-gray-400 mb-2 block">Period</Label>
                  <Input 
                    id="term" 
                    value={proposal.term}
                    readOnly
                    className="bg-gray-900/50 border-gray-700"
                  />
                </div>
              </div>

              <Card className="bg-black border-gray-800">
                <CardHeader className="border-b border-gray-800 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-mono">Supplementary Info</CardTitle>
                  <Info className="h-5 w-5 text-gray-400" />
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <Label className="text-sm">Case Studies</Label>
                        <Button variant="outline" size="sm" className="text-xs h-8">
                          <Upload className="h-3.5 w-3.5 mr-1" />
                          Add from Portfolio
                        </Button>
                      </div>
                      
                      <div className="bg-black border border-gray-700 border-dashed rounded-md p-3 flex items-center space-x-4">
                        <div className="border border-gray-700 rounded p-2 flex items-center justify-center h-20 w-20">
                          <Upload className="h-6 w-6 text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-300">
                            Drag and drop case studies or click to upload examples of similar work you've completed.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm mb-3 block">Additional Documents</Label>
                      <div className="bg-black border border-gray-700 border-dashed rounded-md p-3 flex items-center space-x-4">
                        <div className="border border-gray-700 rounded p-2 flex items-center justify-center h-20 w-20">
                          <FileText className="h-6 w-6 text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-300">
                            Upload any additional documents that might be relevant to your bid.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="additional-info" className="text-sm mb-3 block">Additional Information</Label>
                      <Textarea 
                        id="additional-info" 
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        placeholder="Add any additional information that might be relevant to your bid..."
                        className="bg-gray-900/50 border-gray-700 min-h-[120px]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="bg-black border-gray-800">
                <CardHeader className="border-b border-gray-800 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-mono">Bid Details</CardTitle>
                  <Info className="h-5 w-5 text-gray-400" />
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
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="original-type" className="text-xs text-gray-400 mb-2 block">Type of Loan</Label>
                            <Input 
                              id="original-type" 
                              value={proposal.facilityType} 
                              disabled 
                              className="bg-gray-900/50 border-gray-700"
                            />
                          </div>
                          <div>
                            <Label htmlFor="original-principal" className="text-xs text-gray-400 mb-2 block">Loan Target Size</Label>
                            <Input 
                              id="original-principal" 
                              value={proposal.principal} 
                              disabled 
                              className="bg-gray-900/50 border-gray-700"
                            />
                          </div>
                          <div>
                            <Label htmlFor="original-interest" className="text-xs text-gray-400 mb-2 block">Loan Target Interest Rate</Label>
                            <Input 
                              id="original-interest" 
                              value={proposal.interestRate} 
                              disabled 
                              className="bg-gray-900/50 border-gray-700"
                            />
                          </div>
                          <div>
                            <Label htmlFor="original-term" className="text-xs text-gray-400 mb-2 block">Period</Label>
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
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="custom-type" className="text-xs text-gray-400 mb-2 block">Type of Loan</Label>
                            <Input 
                              id="custom-type" 
                              value={loanType} 
                              onChange={(e) => setLoanType(e.target.value)}
                              className="bg-gray-900/50 border-gray-700"
                              placeholder="e.g. Term Loan"
                            />
                          </div>
                          <div>
                            <Label htmlFor="custom-principal" className="text-xs text-gray-400 mb-2 block">Loan Target Size ($)</Label>
                            <Input 
                              id="custom-principal" 
                              value={principal} 
                              onChange={(e) => setPrincipal(e.target.value)} 
                              className="bg-gray-900/50 border-gray-700"
                              placeholder="1,000,000"
                            />
                          </div>
                          <div>
                            <Label htmlFor="custom-interest" className="text-xs text-gray-400 mb-2 block">Loan Target Interest Rate (%)</Label>
                            <Input 
                              id="custom-interest" 
                              value={interestRate} 
                              onChange={(e) => setInterestRate(e.target.value)} 
                              className="bg-gray-900/50 border-gray-700"
                              placeholder="4.5"
                            />
                          </div>
                          <div>
                            <Label htmlFor="custom-term" className="text-xs text-gray-400 mb-2 block">Period (MONTHS)</Label>
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
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-6">
            <Card className="bg-black border-gray-800">
              <CardHeader className="border-b border-gray-800">
                <CardTitle className="text-lg font-mono">Review Your Bid</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    <div>
                      <h3 className="text-sm font-semibold mb-2 text-gray-400">Loan Details</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Type:</span>
                          <span>{acceptOriginalTerms ? proposal.facilityType : loanType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Amount:</span>
                          <span>{acceptOriginalTerms ? proposal.principal : `$${principal}`}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Interest Rate:</span>
                          <span>{acceptOriginalTerms ? proposal.interestRate : `${interestRate}%`}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Term:</span>
                          <span>{acceptOriginalTerms ? proposal.term : `${term} months`}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold mb-2 text-gray-400">Company Information</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Industry:</span>
                          <span>{proposal.industry}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Financing Type:</span>
                          <span>{proposal.financingType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Credit Rating:</span>
                          <span>{proposal.creditRating}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Bid Deadline:</span>
                          <span>{proposal.bidDeadline}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold mb-2 text-gray-400">Additional Information</h3>
                      <p className="text-sm bg-gray-900/30 p-3 rounded-md">
                        {additionalInfo || "No additional information provided."}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div className="flex justify-end mt-6 space-x-4">
          {step === 1 && (
            <>
              <Button 
                variant="outline" 
                onClick={() => navigate(`/proposal/${id}`)}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button variant="outline" onClick={handleSaveDraft}>
                Save Draft
              </Button>
              <Button onClick={handleNextStep}>
                Next
              </Button>
            </>
          )}
          
          {step === 2 && (
            <>
              <Button 
                variant="outline" 
                onClick={handlePreviousStep}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button variant="outline" onClick={handleSaveDraft}>
                Save Draft
              </Button>
              <Button onClick={handleSubmitBid}>
                <Check className="mr-2 h-4 w-4" />
                Submit Bid
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BidSubmission;
