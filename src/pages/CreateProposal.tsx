import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Radar, Signal, Bell, Settings, ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { financeProposals } from "@/data/marketplaceProposals";
import { FinanceProposal } from "@/types/marketplace";

const CreateProposal = () => {
  const navigate = useNavigate();
  
  // Form state
  const [projectName, setProjectName] = useState("");
  const [industry, setIndustry] = useState("");
  const [facilityType, setFacilityType] = useState("");
  const [financingType, setFinancingType] = useState("");
  const [principalAmount, setPrincipalAmount] = useState("");
  const [bidDeadline, setBidDeadline] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [projectTerms, setProjectTerms] = useState("");
  const [collateralDetails, setCollateralDetails] = useState("");
  const [interestRateType, setInterestRateType] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [term, setTerm] = useState("");
  const [lenderPreferences, setLenderPreferences] = useState("");

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your proposal draft has been saved",
    });
  };

  const handleSubmitProposal = () => {
    // Form validation
    if (!projectName || !industry || !facilityType || !financingType || !principalAmount || !bidDeadline) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }

    // Create new proposal object
    const newProposal: FinanceProposal = {
      id: `PROP-${Math.floor(Math.random() * 100000)}`,
      creditRating: Math.floor(Math.random() * 5) + 1,
      projectName,
      facilityType,
      financingType: financingType === "Refinancing" ? "Refinancing" : "New Financing",
      principal: principalAmount,
      interestRateType: interestRateType === "Floating" ? "Floating" : "Fixed",
      interestRate: interestRate || "TBD",
      term: term || "TBD",
      status: "OPEN",
      bidDeadline,
      lenderPreferences: lenderPreferences || projectTerms || "No specific preferences",
      industry,
      bidVolume: 0
    };

    // In a real app, we'd send this to an API
    // For demonstration purposes, we'll add it to our local data
    // (Note: this change won't persist on page refresh as it's just in-memory)
    financeProposals.unshift(newProposal);

    toast({
      title: "Proposal Published",
      description: "Your proposal has been published to the marketplace",
    });
    navigate("/marketplace");
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "Successfully logged out of your enterprise account",
    });
    navigate("/");
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
      
      <main className="container mx-auto px-6 py-8 relative z-10">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-4"
            onClick={() => navigate("/proposals-dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Proposals
          </Button>
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-mono">Create New Proposal</h1>
              <p className="text-sm text-muted-foreground">Create a new RFP to seek financing from qualified lenders.</p>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="font-mono text-xs"
                onClick={handleSaveDraft}
              >
                <Save className="h-4 w-4 mr-2" />
                SAVE DRAFT
              </Button>
              <Button 
                className="font-mono text-xs"
                onClick={handleSubmitProposal}
              >
                PUBLISH PROPOSAL
              </Button>
            </div>
          </div>
          
          <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm font-mono">PROPOSAL DETAILS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="projectName">Project Name <span className="text-red-500">*</span></Label>
                  <Input 
                    id="projectName" 
                    placeholder="e.g. Riverside Development" 
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="industry">Industry <span className="text-red-500">*</span></Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Commercial Real Estate">Commercial Real Estate</SelectItem>
                      <SelectItem value="Residential Real Estate">Residential Real Estate</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Renewable Energy">Renewable Energy</SelectItem>
                      <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Hospitality">Hospitality</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="facilityType">Facility Type <span className="text-red-500">*</span></Label>
                  <Select value={facilityType} onValueChange={setFacilityType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select facility type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Term Loan">Term Loan</SelectItem>
                      <SelectItem value="Construction Loan">Construction Loan</SelectItem>
                      <SelectItem value="Bridge Loan">Bridge Loan</SelectItem>
                      <SelectItem value="Mezzanine Financing">Mezzanine Financing</SelectItem>
                      <SelectItem value="Equipment Financing">Equipment Financing</SelectItem>
                      <SelectItem value="Real Estate Acquisition">Real Estate Acquisition</SelectItem>
                      <SelectItem value="Working Capital">Working Capital</SelectItem>
                      <SelectItem value="Project Finance">Project Finance</SelectItem>
                      <SelectItem value="Credit Line">Credit Line</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="financingType">Financing Type <span className="text-red-500">*</span></Label>
                  <Select value={financingType} onValueChange={setFinancingType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select financing type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Debt">Debt</SelectItem>
                      <SelectItem value="Equity">Equity</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                      <SelectItem value="Sale-Leaseback">Sale-Leaseback</SelectItem>
                      <SelectItem value="Revenue-Based">Revenue-Based</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="principalAmount">Principal Amount <span className="text-red-500">*</span></Label>
                  <Input 
                    id="principalAmount" 
                    placeholder="e.g. $5,000,000" 
                    value={principalAmount}
                    onChange={(e) => setPrincipalAmount(e.target.value)}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="bidDeadline">Bid Deadline <span className="text-red-500">*</span></Label>
                  <Input 
                    id="bidDeadline" 
                    type="date"
                    value={bidDeadline}
                    onChange={(e) => setBidDeadline(e.target.value)}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="projectLocation">Project Location</Label>
                  <Input 
                    id="projectLocation" 
                    placeholder="e.g. Chicago, IL" 
                    value={projectLocation}
                    onChange={(e) => setProjectLocation(e.target.value)}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="interestRateType">Interest Rate Type</Label>
                  <Select value={interestRateType} onValueChange={setInterestRateType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select interest rate type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fixed">Fixed</SelectItem>
                      <SelectItem value="Floating">Floating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="interestRate">Target Interest Rate</Label>
                  <Input 
                    id="interestRate" 
                    placeholder="e.g. 5.25%" 
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="term">Term</Label>
                  <Input 
                    id="term" 
                    placeholder="e.g. 60 months" 
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <Label htmlFor="projectDescription">Project Description</Label>
                <Textarea 
                  id="projectDescription" 
                  placeholder="Describe your project in detail..." 
                  className="min-h-32"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="projectTerms">Financing Terms</Label>
                <Textarea 
                  id="projectTerms" 
                  placeholder="Describe preferred loan terms, rates, duration, etc..." 
                  className="min-h-24"
                  value={projectTerms}
                  onChange={(e) => setProjectTerms(e.target.value)}
                />
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="collateralDetails">Collateral Details</Label>
                <Textarea 
                  id="collateralDetails" 
                  placeholder="Describe any collateral being offered..." 
                  className="min-h-24"
                  value={collateralDetails}
                  onChange={(e) => setCollateralDetails(e.target.value)}
                />
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="lenderPreferences">Lender Preferences</Label>
                <Textarea 
                  id="lenderPreferences" 
                  placeholder="Describe any preferences for lender qualifications..." 
                  className="min-h-24"
                  value={lenderPreferences}
                  onChange={(e) => setLenderPreferences(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreateProposal;
