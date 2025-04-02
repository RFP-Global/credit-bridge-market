
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Radar, Signal, Check, Building2, DollarSign, FileText, Lightbulb, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import RadarScreen from "@/components/RadarScreen";

// Form schema definition with business name and credit score removed
const formSchema = z.object({
  industry: z.string().min(1, "Please select an industry"),
  yearsFounded: z.string().min(1, "Please enter years in business"),
  annualRevenue: z.string().min(1, "Please enter annual revenue"),
  fundingAmount: z.string().min(1, "Please enter funding amount"),
  fundingPurpose: z.string().min(1, "Please select funding purpose"),
  fundingTimeline: z.string().min(1, "Please select funding timeline"),
  additionalInfo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Mock financial metrics that would come from enterprise profile
const enterpriseFinancialMetrics = {
  creditScore: 735,
  businessName: "Quantum Solutions Inc.",
  profitMargin: "12.8%",
  debtToEquityRatio: "1.3",
  workingCapitalRatio: "2.4",
  accountsReceivable: "$685,000",
  quickRatio: "1.7",
  assetTurnoverRatio: "2.1",
  inventoryTurnover: "8.3",
  operatingCashFlow: "$1.2M"
};

const FacilityBuilder = () => {
  const navigate = useNavigate();
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [recommendation, setRecommendation] = useState<{
    facilityType: string;
    financingType: string;
    term: string;
    interestRateType: string;
    interestRateEstimate: string;
    pros: string[];
    cons: string[];
    nextSteps: string[];
  } | null>(null);

  // Initialize form without business name and credit score
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: "",
      yearsFounded: "",
      annualRevenue: "",
      fundingAmount: "",
      fundingPurpose: "",
      fundingTimeline: "",
      additionalInfo: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    // In a real app, this would call an API with AI to generate recommendations
    // For now, we'll generate a recommendation based on the form data and financial metrics
    
    // Simple facility type recommendation logic based on purpose and amount
    let facilityType = "Term Loan";
    let financingType = "New Financing";
    let term = "60 months";
    let interestRateType = "Fixed";
    let interestRateEstimate = "5.5% - 7.5%";
    
    const fundingAmountNum = parseInt(data.fundingAmount.replace(/[^0-9]/g, ""), 10);
    
    if (data.fundingPurpose === "Real Estate") {
      facilityType = "Real Estate Acquisition";
      term = "120 months";
      interestRateEstimate = "4.5% - 6.0%";
    } else if (data.fundingPurpose === "Equipment") {
      facilityType = "Equipment Financing";
      term = "36 months";
      interestRateEstimate = "5.0% - 7.0%";
    } else if (data.fundingPurpose === "Working Capital") {
      facilityType = "Working Capital";
      term = "24 months";
      interestRateEstimate = "6.5% - 9.0%";
    } else if (data.fundingPurpose === "Expansion") {
      if (fundingAmountNum > 1000000) {
        facilityType = "Mezzanine Financing";
        interestRateType = "Floating";
        interestRateEstimate = "8.0% - 12.0%";
      } else {
        facilityType = "Term Loan";
      }
    } else if (data.fundingPurpose === "Refinancing") {
      facilityType = "Refinancing";
      financingType = "Refinancing";
    }
    
    // Adjust based on credit score from enterprise profile
    let creditFactor = 1.0;
    const creditScore = enterpriseFinancialMetrics.creditScore;
    if (creditScore >= 750) {
      creditFactor = 0.85;
    } else if (creditScore >= 700 && creditScore <= 749) {
      creditFactor = 1.0;
    } else if (creditScore >= 650 && creditScore <= 699) {
      creditFactor = 1.2;
    } else if (creditScore < 650) {
      creditFactor = 1.5;
    }
    
    // Further adjust based on financial metrics
    const workingCapitalRatio = parseFloat(enterpriseFinancialMetrics.workingCapitalRatio);
    const debtToEquityRatio = parseFloat(enterpriseFinancialMetrics.debtToEquityRatio);
    
    if (workingCapitalRatio > 2.0) {
      creditFactor *= 0.95; // Better liquidity = lower rates
    }
    
    if (debtToEquityRatio > 2.0) {
      creditFactor *= 1.1; // Higher leverage = higher rates
    }
    
    // Adjust interest rate based on credit factor
    const [minRate, maxRate] = interestRateEstimate.split(" - ").map(r => parseFloat(r.replace("%", "")));
    const adjustedMinRate = (minRate * creditFactor).toFixed(1);
    const adjustedMaxRate = (maxRate * creditFactor).toFixed(1);
    interestRateEstimate = `${adjustedMinRate}% - ${adjustedMaxRate}%`;
    
    // Set recommendation with pros and cons
    setRecommendation({
      facilityType,
      financingType,
      term,
      interestRateType,
      interestRateEstimate,
      pros: [
        `Well-suited for ${data.fundingPurpose.toLowerCase()} projects`,
        `Competitive rates based on your ${enterpriseFinancialMetrics.creditScore} credit score`,
        `Timeline aligns with your ${data.fundingTimeline} funding needs`,
        `Optimized for your ${enterpriseFinancialMetrics.workingCapitalRatio} working capital ratio`
      ],
      cons: [
        data.fundingTimeline === "Immediate (< 30 days)" 
          ? "Expedited funding may result in higher rates"
          : "Standard processing times may apply",
        fundingAmountNum > 1000000 
          ? "Large funding amount may require additional documentation"
          : "Standard documentation requirements apply",
        enterpriseFinancialMetrics.debtToEquityRatio > 1.5
          ? "Higher debt-to-equity ratio may affect financing terms"
          : "Debt-to-equity ratio is within acceptable range"
      ],
      nextSteps: [
        "Review and refine the proposal details",
        "Prepare financial documentation for submission",
        "Post your proposal to the marketplace to receive bids",
      ],
    });
    
    setShowRecommendation(true);
    
    toast.success("Recommendation generated successfully");
  };
  
  const handleCreateProposal = () => {
    if (!recommendation) return;
    
    // In a real app, this would pre-fill the proposal creation form
    // For now, we'll just navigate to the create proposal page
    toast.info("Creating proposal with recommended details");
    navigate("/create-proposal");
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative grid-bg">
      <Navbar />
      
      <RadarScreen className="z-0" />
      
      <div className="scanline z-10"></div>
      
      <main className="container mx-auto px-4 py-8 relative z-20 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-mono mb-2 flex items-center">
            <Building2 className="mr-2" />
            Credit Facility Builder
          </h1>
          <p className="text-muted-foreground">
            Enter your funding needs to get a personalized facility recommendation
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className={`col-span-1 ${showRecommendation ? 'lg:col-span-1' : 'lg:col-span-2'}`}>
            <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-mono flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Business & Funding Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Financial Metrics Section */}
                <div className="p-4 border border-primary/20 bg-primary/5 rounded-md">
                  <h3 className="text-sm font-semibold border-b border-primary/20 pb-1 mb-4 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                    Enterprise Financial Metrics
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                    <div>
                      <p className="text-xs text-muted-foreground">Business Name</p>
                      <p className="font-medium">{enterpriseFinancialMetrics.businessName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Credit Score</p>
                      <p className="font-medium">{enterpriseFinancialMetrics.creditScore}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Profit Margin</p>
                      <p className="font-medium">{enterpriseFinancialMetrics.profitMargin}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Working Capital Ratio</p>
                      <p className="font-medium">{enterpriseFinancialMetrics.workingCapitalRatio}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Debt-to-Equity</p>
                      <p className="font-medium">{enterpriseFinancialMetrics.debtToEquityRatio}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Quick Ratio</p>
                      <p className="font-medium">{enterpriseFinancialMetrics.quickRatio}</p>
                    </div>
                  </div>
                </div>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold border-b border-primary/20 pb-1">Business Information</h3>
                      
                      <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Industry</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select industry" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Commercial Real Estate">Commercial Real Estate</SelectItem>
                                <SelectItem value="Residential Real Estate">Residential Real Estate</SelectItem>
                                <SelectItem value="Healthcare">Healthcare</SelectItem>
                                <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                                <SelectItem value="Retail">Retail</SelectItem>
                                <SelectItem value="Technology">Technology</SelectItem>
                                <SelectItem value="Hospitality">Hospitality</SelectItem>
                                <SelectItem value="Renewable Energy">Renewable Energy</SelectItem>
                                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="yearsFounded"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Years in Business</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 5" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="annualRevenue"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Annual Revenue</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., $2,500,000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold border-b border-primary/20 pb-1">Funding Requirements</h3>
                      
                      <FormField
                        control={form.control}
                        name="fundingAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Funding Amount</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., $500,000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="fundingPurpose"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Funding Purpose</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select purpose" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Working Capital">Working Capital</SelectItem>
                                <SelectItem value="Equipment">Equipment Purchase</SelectItem>
                                <SelectItem value="Real Estate">Real Estate Acquisition</SelectItem>
                                <SelectItem value="Expansion">Business Expansion</SelectItem>
                                <SelectItem value="Refinancing">Debt Refinancing</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="fundingTimeline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Funding Timeline</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select timeline" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Immediate (< 30 days)">Immediate ({"<"} 30 days)</SelectItem>
                                <SelectItem value="Short-term (1-3 months)">Short-term (1-3 months)</SelectItem>
                                <SelectItem value="Medium-term (3-6 months)">Medium-term (3-6 months)</SelectItem>
                                <SelectItem value="Long-term (6+ months)">Long-term (6+ months)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="additionalInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Information (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Provide any additional details that may help with your recommendation" 
                                className="min-h-24"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Generate Recommendation
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          {showRecommendation && recommendation && (
            <div className="col-span-1 lg:col-span-2">
              <Card className="border-primary/20 bg-background/50 backdrop-blur-sm h-full">
                <CardHeader className="bg-primary/10 border-b border-primary/20">
                  <CardTitle className="text-lg font-mono flex items-center">
                    <Lightbulb className="mr-2 h-5 w-5 text-amber-500" />
                    Recommended Credit Facility
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold border-b border-primary/20 pb-1">Facility Details</h3>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Facility Type:</p>
                          <p className="text-lg font-semibold">{recommendation.facilityType}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Financing Type:</p>
                          <p className="text-lg font-semibold">{recommendation.financingType}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Term:</p>
                          <p className="text-lg font-semibold">{recommendation.term}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold border-b border-primary/20 pb-1">Rate Information</h3>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Interest Rate Type:</p>
                          <p className="text-lg font-semibold">{recommendation.interestRateType}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Estimated Interest Rate:</p>
                          <p className="text-lg font-semibold text-primary">{recommendation.interestRateEstimate}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            *Actual rates may vary based on lender offers
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold border-b border-primary/20 pb-1">Benefits</h3>
                      
                      <ul className="space-y-2">
                        {recommendation.pros.map((pro, index) => (
                          <li key={`pro-${index}`} className="flex items-start">
                            <Check className="h-4 w-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold border-b border-primary/20 pb-1">Considerations</h3>
                      
                      <ul className="space-y-2">
                        {recommendation.cons.map((con, index) => (
                          <li key={`con-${index}`} className="flex items-start">
                            <span className="h-4 w-4 mr-2 text-yellow-500 mt-1 flex-shrink-0">•</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold border-b border-primary/20 pb-1">Next Steps</h3>
                    
                    <ol className="list-decimal ml-4 space-y-2">
                      {recommendation.nextSteps.map((step, index) => (
                        <li key={`step-${index}`}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-primary/20 pt-4">
                  <Button className="w-full" onClick={handleCreateProposal}>
                    Create Proposal with these Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FacilityBuilder;
