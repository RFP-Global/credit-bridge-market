
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar, DollarSign, Building, Percent, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { financeProposals } from "@/data/marketplace";
import { useToast } from "@/hooks/use-toast";

import Navbar from "@/components/Navbar";

const BidSubmission = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [proposal, setProposal] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [bidRate, setBidRate] = useState(5);
  const [bidTerm, setBidTerm] = useState("");
  const [bidNotes, setBidNotes] = useState("");
  const [fundingSpeed, setFundingSpeed] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProposal = async () => {
      // Simulate API call
      setTimeout(() => {
        const found = financeProposals.find(p => p.id === id);
        if (found) {
          setProposal(found);
          setBidAmount(found.principal.replace(/[^0-9.]/g, ""));
          setBidRate(parseFloat(found.interestRate.replace("%", "")));
          setBidTerm(found.term.split(" ")[0]); // Extract numeric part
        }
        setLoading(false);
      }, 500);
    };

    fetchProposal();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Validate form
    if (!bidAmount || !bidRate || !bidTerm || !fundingSpeed) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      setSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Bid Submitted",
        description: "Your bid has been successfully submitted.",
      });
      setSubmitting(false);
      navigate("/marketplace");
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <div className="flex items-center justify-center h-[70vh]">
            <div className="text-center">
              <div className="animate-spin mb-4 h-8 w-8 border-t-2 border-b-2 border-primary rounded-full mx-auto"></div>
              <p className="text-muted-foreground">Loading proposal details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <h1 className="text-2xl font-bold mb-4">Proposal Not Found</h1>
            <p className="text-muted-foreground mb-6">The proposal you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/marketplace">Return to Marketplace</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto px-4 py-6 pt-24">
        <Button variant="outline" size="sm" asChild className="mb-6">
          <Link to={`/proposal/${id}`} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Proposal Details
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold">Submit Bid for {proposal.projectName}</CardTitle>
                  <Badge variant="outline">{proposal.financingType}</Badge>
                </div>
                <CardDescription>
                  Complete the form below to submit your bid for this financing opportunity.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="bidAmount" className="text-sm">Bid Amount</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="bidAmount"
                            type="text"
                            className="pl-9"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            placeholder="Enter bid amount"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="bidRate" className="text-sm">Interest Rate (%)</Label>
                          <span className="text-sm font-semibold">{bidRate.toFixed(2)}%</span>
                        </div>
                        <Slider
                          id="bidRate"
                          min={1}
                          max={15}
                          step={0.1}
                          value={[bidRate]}
                          onValueChange={(value) => setBidRate(value[0])}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1.00%</span>
                          <span>15.00%</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="bidTerm" className="text-sm">Term (Months)</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="bidTerm"
                            type="text"
                            className="pl-9"
                            value={bidTerm}
                            onChange={(e) => setBidTerm(e.target.value)}
                            placeholder="Enter term in months"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm">Funding Speed</Label>
                        <RadioGroup value={fundingSpeed} onValueChange={setFundingSpeed} className="grid grid-cols-3 gap-4">
                          <div>
                            <RadioGroupItem value="standard" id="standard" className="peer sr-only" />
                            <Label
                              htmlFor="standard"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <span className="text-sm font-medium">Standard</span>
                              <span className="text-xs text-muted-foreground">14-30 days</span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem value="expedited" id="expedited" className="peer sr-only" />
                            <Label
                              htmlFor="expedited"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <span className="text-sm font-medium">Expedited</span>
                              <span className="text-xs text-muted-foreground">7-14 days</span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem value="priority" id="priority" className="peer sr-only" />
                            <Label
                              htmlFor="priority"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <span className="text-sm font-medium">Priority</span>
                              <span className="text-xs text-muted-foreground">3-7 days</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bidNotes" className="text-sm">Additional Notes (Optional)</Label>
                      <Textarea
                        id="bidNotes"
                        value={bidNotes}
                        onChange={(e) => setBidNotes(e.target.value)}
                        placeholder="Enter any additional information or terms for your bid"
                        className="min-h-[120px]"
                      />
                    </div>

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Important Information</AlertTitle>
                      <AlertDescription>
                        By submitting this bid, you agree to the terms and conditions of RFP Global's bidding process. Your bid will be binding if accepted by the borrower.
                      </AlertDescription>
                    </Alert>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button type="submit" disabled={submitting} className="w-full md:w-auto">
                      {submitting ? (
                        <>
                          <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-current rounded-full"></div>
                          Processing...
                        </>
                      ) : (
                        "Submit Bid"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Proposal Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Project Name</p>
                    <p className="font-semibold">{proposal.projectName}</p>
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Principal</p>
                      <p className="font-semibold">{proposal.principal}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Interest Rate</p>
                      <p className="font-semibold">{proposal.interestRate}</p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Facility Type</p>
                      <p className="font-semibold">{proposal.facilityType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Term</p>
                      <p className="font-semibold">{proposal.term}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Industry</p>
                      <div className="flex items-center">
                        <Building className="h-3 w-3 mr-1" />
                        <p className="font-semibold">{proposal.industry}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Credit Rating</p>
                      <p className="font-semibold">{proposal.creditRating.toFixed(1)}/10</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Bidding Progress</p>
                    <Progress value={proposal.bidVolume} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{proposal.bidVolume}% Complete</span>
                      <span>Target: 100%</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Bid Deadline</p>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <p className="font-semibold">{proposal.bidDeadline}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Competitive Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Average Interest Rate</p>
                    <div className="flex items-center">
                      <Percent className="h-3 w-3 mr-1" />
                      <p className="font-semibold">{(parseFloat(proposal.interestRate.replace("%", "")) - 0.25).toFixed(2)}%</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Number of Bids</p>
                    <p className="font-semibold">{Math.floor(Math.random() * 10) + 2}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Lowest Bid</p>
                    <p className="font-semibold">{(parseFloat(proposal.interestRate.replace("%", "")) - 0.5).toFixed(2)}%</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Highest Bid</p>
                    <p className="font-semibold">{(parseFloat(proposal.interestRate.replace("%", "")) + 1).toFixed(2)}%</p>
                  </div>

                  <Alert className="bg-secondary/50">
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      Your bid is competitive if it falls within or below the average interest rate range.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate(`/proposal/${id}`)}>
                  View Full Details
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidSubmission;
