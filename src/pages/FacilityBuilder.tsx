
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Radar, Signal, Check, Building2, DollarSign, FileText, Lightbulb, ArrowRight, TrendingUp, ArrowLeftRight, BadgePercent, Clock } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

// Define the recommendation type
type RecommendationOption = {
  facilityType: string;
  financingType: string;
  term: string;
  interestRateType: string;
  interestRateEstimate: string;
  monthlyCost: string;
  totalCost: string;
  pros: string[];
  cons: string[];
  nextSteps: string[];
  recommended?: boolean;
  riskLevel: string;
  closingTimeframe: string;
};

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
  const [recommendations, setRecommendations] = useState<RecommendationOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<number>(0);

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
    // For now, we'll generate multiple recommendations based on form data and financial metrics
    
    // Parse funding amount to a number for calculations
    const fundingAmountNum = parseInt(data.fundingAmount.replace(/[^0-9]/g, ""), 10) || 0;
    
    // Adjust based on credit score from enterprise profile
    let creditFactor = 1.0;
    const creditScore = enterpriseFinancialMetrics.creditScore;
    if (creditScore >= 750) {
      creditFactor = 0.85;
    } else if (creditScore >= 700 && creditScore < 750) {
      creditFactor = 1.0;
    } else if (creditScore >= 650 && creditScore < 700) {
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
    
    // Generate multiple options based on funding purpose
    const options: RecommendationOption[] = [];
    
    // Option 1: Primary recommendation
    if (data.fundingPurpose === "Real Estate") {
      // Real Estate options
      options.push({
        facilityType: "Commercial Mortgage",
        financingType: "New Financing",
        term: "240 months",
        interestRateType: "Fixed",
        interestRateEstimate: calculateRate(4.5, 6.0, creditFactor),
        monthlyCost: calculateMonthlyCost(fundingAmountNum, 4.75 * creditFactor, 240),
        totalCost: calculateTotalCost(fundingAmountNum, 4.75 * creditFactor, 240),
        pros: [
          "Long-term stable financing",
          "Lower monthly payments",
          "Fixed rate protects against interest rate increases",
          "Tax-deductible interest"
        ],
        cons: [
          "Requires significant documentation",
          "Longer closing process (45-60 days)",
          "May require 20-25% down payment",
          "Higher closing costs than other options"
        ],
        nextSteps: [
          "Prepare property documentation",
          "Get property appraisal",
          "Complete environmental assessment",
          "Post proposal for lender bids"
        ],
        recommended: true,
        riskLevel: "Low",
        closingTimeframe: "45-60 days"
      });
      
      // Second option for real estate
      options.push({
        facilityType: "SBA 504 Loan",
        financingType: "New Financing",
        term: "300 months",
        interestRateType: "Hybrid",
        interestRateEstimate: calculateRate(5.0, 7.0, creditFactor),
        monthlyCost: calculateMonthlyCost(fundingAmountNum, 6.0 * creditFactor, 300),
        totalCost: calculateTotalCost(fundingAmountNum, 6.0 * creditFactor, 300),
        pros: [
          "Only requires 10% down payment",
          "Below-market fixed interest rates",
          "Longer amortization period",
          "Can finance up to 90% of property value"
        ],
        cons: [
          "Complex application process",
          "CDC involvement required",
          "Prepayment penalties may apply",
          "Limited to owner-occupied properties"
        ],
        nextSteps: [
          "Contact local CDC (Certified Development Company)",
          "Prepare SBA-specific documentation",
          "Complete business plan and projections",
          "Post proposal for lender bids"
        ],
        riskLevel: "Low-Medium",
        closingTimeframe: "60-90 days"
      });
      
      // Third option for real estate
      options.push({
        facilityType: "Bridge Loan",
        financingType: "Short-term",
        term: "24 months",
        interestRateType: "Variable",
        interestRateEstimate: calculateRate(7.5, 10.0, creditFactor),
        monthlyCost: calculateMonthlyCost(fundingAmountNum, 8.5 * creditFactor, 24, "interest-only"),
        totalCost: calculateTotalCost(fundingAmountNum, 8.5 * creditFactor, 24, "interest-only"),
        pros: [
          "Quick closing (7-14 days)",
          "Less documentation required",
          "Interest-only payments",
          "Flexible terms and conditions"
        ],
        cons: [
          "Higher interest rates",
          "Short term requires refinancing soon",
          "May have prepayment penalties",
          "Additional fees and closing costs"
        ],
        nextSteps: [
          "Prepare property overview",
          "Develop exit strategy/refinance plan",
          "Secure term sheet from lenders",
          "Post proposal for lender bids"
        ],
        riskLevel: "Medium-High",
        closingTimeframe: "7-14 days"
      });
    } else if (data.fundingPurpose === "Equipment") {
      // Equipment financing options
      options.push({
        facilityType: "Equipment Term Loan",
        financingType: "New Financing",
        term: "60 months",
        interestRateType: "Fixed",
        interestRateEstimate: calculateRate(5.0, 7.0, creditFactor),
        monthlyCost: calculateMonthlyCost(fundingAmountNum, 6.0 * creditFactor, 60),
        totalCost: calculateTotalCost(fundingAmountNum, 6.0 * creditFactor, 60),
        pros: [
          "Fixed monthly payments for budgeting",
          "Tax benefits through depreciation",
          "Build business credit",
          "100% financing possible"
        ],
        cons: [
          "May require down payment",
          "Locked into the equipment for term length",
          "Personal guarantee may be required",
          "Asset depreciates while you're still paying"
        ],
        nextSteps: [
          "Gather equipment specifications and quotes",
          "Prepare financial statements",
          "Document equipment purpose and ROI",
          "Post proposal for lender bids"
        ],
        recommended: true,
        riskLevel: "Low",
        closingTimeframe: "7-14 days"
      });
      
      // Second equipment option
      options.push({
        facilityType: "Equipment Lease",
        financingType: "Operating Lease",
        term: "36 months",
        interestRateType: "Implicit Rate",
        interestRateEstimate: calculateRate(6.0, 8.0, creditFactor),
        monthlyCost: calculateMonthlyCost(fundingAmountNum, 7.0 * creditFactor, 36, "lease"),
        totalCost: calculateTotalCost(fundingAmountNum, 7.0 * creditFactor, 36, "lease"),
        pros: [
          "Lower monthly payments than loans",
          "Potential tax advantages as operating expense",
          "Easier to upgrade at end of term",
          "No down payment required"
        ],
        cons: [
          "Don't own the equipment at the end of term",
          "May have usage restrictions",
          "Early termination penalties",
          "Higher lifetime cost for long-term needs"
        ],
        nextSteps: [
          "Review equipment lease terms",
          "Calculate buy vs. lease comparison",
          "Document equipment needs and specifications",
          "Post proposal for lessor bids"
        ],
        riskLevel: "Low",
        closingTimeframe: "3-7 days"
      });
      
      // Third equipment option
      options.push({
        facilityType: "SBA 7(a) Loan",
        financingType: "New Financing",
        term: "84 months",
        interestRateType: "Variable",
        interestRateEstimate: calculateRate(6.5, 8.5, creditFactor),
        monthlyCost: calculateMonthlyCost(fundingAmountNum, 7.5 * creditFactor, 84),
        totalCost: calculateTotalCost(fundingAmountNum, 7.5 * creditFactor, 84),
        pros: [
          "Longer repayment terms than traditional loans",
          "Lower down payment requirements",
          "Can include installation and training costs",
          "Potential for multiple pieces of equipment"
        ],
        cons: [
          "More documentation and longer process",
          "SBA guarantee fee increases cost",
          "Variable rate may increase over time",
          "Personal guarantee required"
        ],
        nextSteps: [
          "Prepare SBA-required documentation",
          "Document business history and projections",
          "Complete SBA forms and applications",
          "Post proposal for SBA lender bids"
        ],
        riskLevel: "Medium",
        closingTimeframe: "30-45 days"
      });
    } else if (data.fundingPurpose === "Working Capital") {
      // Working capital options
      options.push({
        facilityType: "Business Line of Credit",
        financingType: "Revolving Credit",
        term: "12 months (renewable)",
        interestRateType: "Variable",
        interestRateEstimate: calculateRate(6.5, 9.0, creditFactor),
        monthlyCost: "Varies based on usage",
        totalCost: calculateTotalCost(fundingAmountNum * 0.5, 7.75 * creditFactor, 12),
        pros: [
          "Flexible - only pay interest on what you use",
          "Can draw and repay as needed",
          "Good for managing cash flow fluctuations",
          "Can cover unexpected expenses"
        ],
        cons: [
          "Variable interest rate can increase",
          "May have annual renewal fees",
          "Typically requires strong credit profile",
          "May reduce overall borrowing capacity"
        ],
        nextSteps: [
          "Prepare cash flow projections",
          "Document current working capital needs",
          "Review accounts receivable and payable",
          "Post proposal for lender bids"
        ],
        recommended: true,
        riskLevel: "Medium",
        closingTimeframe: "7-14 days"
      });
      
      // Second working capital option
      options.push({
        facilityType: "Invoice Factoring",
        financingType: "Asset-Based",
        term: "Ongoing",
        interestRateType: "Factor Rate",
        interestRateEstimate: "1.5% - 5% per invoice",
        monthlyCost: calculateFactoringCost(fundingAmountNum),
        totalCost: "Varies by usage",
        pros: [
          "Quick access to cash (24-48 hours)",
          "No debt on balance sheet",
          "Credit quality based on customers, not you",
          "Scales with your business growth"
        ],
        cons: [
          "Higher effective cost than traditional loans",
          "Customer awareness of factoring relationship",
          "Not suitable for all business types",
          "Management of customer relationships"
        ],
        nextSteps: [
          "Review customer payment histories",
          "Prepare accounts receivable aging report",
          "Select invoices for potential factoring",
          "Post proposal for factor bids"
        ],
        riskLevel: "Low",
        closingTimeframe: "1-3 days"
      });
      
      // Third working capital option
      options.push({
        facilityType: "Term Loan",
        financingType: "New Financing",
        term: "36 months",
        interestRateType: "Fixed",
        interestRateEstimate: calculateRate(7.0, 10.0, creditFactor),
        monthlyCost: calculateMonthlyCost(fundingAmountNum, 8.5 * creditFactor, 36),
        totalCost: calculateTotalCost(fundingAmountNum, 8.5 * creditFactor, 36),
        pros: [
          "Predictable monthly payments",
          "Lower interest rates than short-term options",
          "Builds business credit history",
          "No collateral for qualifying businesses"
        ],
        cons: [
          "Less flexible than revolving credit",
          "Fixed borrowing amount",
          "May require personal guarantee",
          "Prepayment penalties possible"
        ],
        nextSteps: [
          "Prepare business plan and use of funds",
          "Review debt service coverage ratio",
          "Document financial projections",
          "Post proposal for lender bids"
        ],
        riskLevel: "Medium",
        closingTimeframe: "14-21 days"
      });
    } else if (data.fundingPurpose === "Expansion") {
      // Expansion options
      if (fundingAmountNum > 1000000) {
        options.push({
          facilityType: "Mezzanine Financing",
          financingType: "Subordinated Debt",
          term: "60 months",
          interestRateType: "Fixed + Equity",
          interestRateEstimate: calculateRate(10.0, 14.0, creditFactor),
          monthlyCost: calculateMonthlyCost(fundingAmountNum, 12.0 * creditFactor, 60, "interest-only"),
          totalCost: calculateTotalCost(fundingAmountNum, 12.0 * creditFactor, 60, "interest-only") + " + Equity Component",
          pros: [
            "Minimal or no collateral required",
            "Interest-only payments preserve cash flow",
            "No monthly principal payments",
            "Less dilutive than pure equity"
          ],
          cons: [
            "Higher interest rates",
            "Equity component can be expensive long-term",
            "Subordinated to senior debt",
            "Complex documentation requirements"
          ],
          nextSteps: [
            "Prepare detailed financial projections",
            "Develop comprehensive business plan",
            "Outline expansion strategy and ROI",
            "Post proposal for mezzanine lender bids"
          ],
          recommended: true,
          riskLevel: "High",
          closingTimeframe: "45-60 days"
        });
        
        options.push({
          facilityType: "Growth Capital Term Loan",
          financingType: "New Financing",
          term: "60 months",
          interestRateType: "Fixed",
          interestRateEstimate: calculateRate(7.5, 11.0, creditFactor),
          monthlyCost: calculateMonthlyCost(fundingAmountNum, 9.0 * creditFactor, 60),
          totalCost: calculateTotalCost(fundingAmountNum, 9.0 * creditFactor, 60),
          pros: [
            "No equity dilution",
            "Predictable payment structure",
            "Works well for proven business models",
            "Builds business credit profile"
          ],
          cons: [
            "May require collateral",
            "Personal guarantees typically required",
            "Monthly principal and interest payments",
            "Less flexible than equity financing"
          ],
          nextSteps: [
            "Prepare expansion plan and timeline",
            "Create detailed use of funds breakdown",
            "Document historical growth metrics",
            "Post proposal for lender bids"
          ],
          riskLevel: "Medium",
          closingTimeframe: "21-30 days"
        });
        
        options.push({
          facilityType: "Private Equity Investment",
          financingType: "Equity",
          term: "3-7 years (exit horizon)",
          interestRateType: "N/A - Equity Returns",
          interestRateEstimate: "20-30% IRR Target",
          monthlyCost: "No debt service",
          totalCost: "Ownership dilution",
          pros: [
            "No debt burden or monthly payments",
            "Strategic guidance and expertise",
            "Access to investor network",
            "Potential for follow-on funding"
          ],
          cons: [
            "Ownership and control dilution",
            "Investor involvement in decisions",
            "Higher return expectations than debt",
            "May have aggressive growth targets"
          ],
          nextSteps: [
            "Develop equity investor presentation",
            "Determine company valuation",
            "Outline governance structure",
            "Post proposal for equity investor consideration"
          ],
          riskLevel: "Medium",
          closingTimeframe: "90-120 days"
        });
      } else {
        // For smaller expansion funding
        options.push({
          facilityType: "SBA 7(a) Loan",
          financingType: "New Financing",
          term: "120 months",
          interestRateType: "Variable",
          interestRateEstimate: calculateRate(6.0, 8.0, creditFactor),
          monthlyCost: calculateMonthlyCost(fundingAmountNum, 7.0 * creditFactor, 120),
          totalCost: calculateTotalCost(fundingAmountNum, 7.0 * creditFactor, 120),
          pros: [
            "Longer repayment terms than conventional loans",
            "Lower down payment requirements",
            "Can be used for multiple purposes",
            "SBA guaranty reduces lender risk"
          ],
          cons: [
            "SBA guarantee fee adds to cost",
            "More documentation required",
            "Longer processing time",
            "Personal guarantees required"
          ],
          nextSteps: [
            "Prepare SBA-required documentation",
            "Create detailed business plan",
            "Document projected ROI on expansion",
            "Post proposal for SBA lender bids"
          ],
          recommended: true,
          riskLevel: "Medium",
          closingTimeframe: "30-45 days"
        });
        
        options.push({
          facilityType: "Term Loan",
          financingType: "New Financing",
          term: "60 months",
          interestRateType: "Fixed",
          interestRateEstimate: calculateRate(6.5, 9.5, creditFactor),
          monthlyCost: calculateMonthlyCost(fundingAmountNum, 8.0 * creditFactor, 60),
          totalCost: calculateTotalCost(fundingAmountNum, 8.0 * creditFactor, 60),
          pros: [
            "Faster approval than SBA options",
            "Predictable payment schedule",
            "Fixed interest rate",
            "Less paperwork than SBA loans"
          ],
          cons: [
            "Shorter term than SBA loans",
            "May require more collateral",
            "Higher monthly payments",
            "Less flexible use of proceeds"
          ],
          nextSteps: [
            "Prepare financial statements",
            "Document expansion plans and projections",
            "Gather collateral documentation",
            "Post proposal for lender bids"
          ],
          riskLevel: "Medium",
          closingTimeframe: "14-21 days"
        });
        
        options.push({
          facilityType: "Business Line of Credit",
          financingType: "Revolving Credit",
          term: "12-24 months (renewable)",
          interestRateType: "Variable",
          interestRateEstimate: calculateRate(7.0, 10.0, creditFactor),
          monthlyCost: "Varies based on usage",
          totalCost: calculateTotalCost(fundingAmountNum * 0.6, 8.5 * creditFactor, 18),
          pros: [
            "Flexible - draw funds as needed",
            "Only pay interest on amounts used",
            "Revolving structure as you repay",
            "Good for phased expansion projects"
          ],
          cons: [
            "Higher interest rates than term loans",
            "Variable rates can increase over time",
            "May have renewal/maintenance fees",
            "Usually lower amounts than term loans"
          ],
          nextSteps: [
            "Document expansion phases and timeline",
            "Prepare cash flow projections",
            "Outline capital needs by project phase",
            "Post proposal for lender bids"
          ],
          riskLevel: "Medium-Low",
          closingTimeframe: "7-14 days"
        });
      }
    } else if (data.fundingPurpose === "Refinancing") {
      // Refinancing options
      options.push({
        facilityType: "Debt Consolidation Loan",
        financingType: "Refinancing",
        term: "84 months",
        interestRateType: "Fixed",
        interestRateEstimate: calculateRate(5.5, 8.0, creditFactor),
        monthlyCost: calculateMonthlyCost(fundingAmountNum, 6.75 * creditFactor, 84),
        totalCost: calculateTotalCost(fundingAmountNum, 6.75 * creditFactor, 84),
        pros: [
          "Simplify multiple debts into one payment",
          "Potentially lower interest rate",
          "Improved cash flow with extended term",
          "Potential interest savings"
        ],
        cons: [
          "May extend overall repayment timeline",
          "Could pay more interest over longer term",
          "May require additional collateral",
          "Prepayment penalties on existing debt"
        ],
        nextSteps: [
          "Document all current debt obligations",
          "Calculate potential savings and breakeven",
          "Prepare current debt payment schedules",
          "Post proposal for lender bids"
        ],
        recommended: true,
        riskLevel: "Low",
        closingTimeframe: "14-30 days"
      });
      
      options.push({
        facilityType: "SBA Debt Refinancing",
        financingType: "Refinancing",
        term: "120 months",
        interestRateType: "Variable",
        interestRateEstimate: calculateRate(6.0, 8.5, creditFactor),
        monthlyCost: calculateMonthlyCost(fundingAmountNum, 7.25 * creditFactor, 120),
        totalCost: calculateTotalCost(fundingAmountNum, 7.25 * creditFactor, 120),
        pros: [
          "Longest available terms for lower payments",
          "Can include working capital component",
          "Lower equity requirements than conventional",
          "Can consolidate multiple loans"
        ],
        cons: [
          "SBA guarantee fees add to cost",
          "Extensive documentation required",
          "Longer processing timeline",
          "Variable rate presents future risk"
        ],
        nextSteps: [
          "Document existing debt structures",
          "Prepare SBA-specific documentation",
          "Calculate debt service coverage ratios",
          "Post proposal for SBA lender bids"
        ],
        riskLevel: "Medium",
        closingTimeframe: "30-60 days"
      });
      
      options.push({
        facilityType: "Cash-Out Refinance",
        financingType: "Refinancing + Cash-Out",
        term: "84 months",
        interestRateType: "Fixed",
        interestRateEstimate: calculateRate(6.5, 9.0, creditFactor),
        monthlyCost: calculateMonthlyCost(fundingAmountNum * 1.2, 7.75 * creditFactor, 84),
        totalCost: calculateTotalCost(fundingAmountNum * 1.2, 7.75 * creditFactor, 84),
        pros: [
          "Access additional capital while refinancing",
          "Single loan with one payment",
          "Potential for improved cash flow",
          "Use cash for growth or other needs"
        ],
        cons: [
          "Higher loan amount increases overall cost",
          "May require additional collateral",
          "Higher debt service requirements",
          "More stringent qualification standards"
        ],
        nextSteps: [
          "Document use of cash-out proceeds",
          "Prepare current debt documentation",
          "Outline business growth plans",
          "Post proposal for lender bids"
        ],
        riskLevel: "Medium-High",
        closingTimeframe: "21-30 days"
      });
    } else {
      // Default/Other options
      options.push({
        facilityType: "Term Loan",
        financingType: "New Financing",
        term: "60 months",
        interestRateType: "Fixed",
        interestRateEstimate: calculateRate(6.5, 9.0, creditFactor),
        monthlyCost: calculateMonthlyCost(fundingAmountNum, 7.75 * creditFactor, 60),
        totalCost: calculateTotalCost(fundingAmountNum, 7.75 * creditFactor, 60),
        pros: [
          "Predictable payment structure",
          "Fixed interest rate for budget stability",
          "Builds business credit profile",
          "Flexible use of funds"
        ],
        cons: [
          "May require collateral",
          "Fixed borrowing amount",
          "Personal guarantee often required",
          "Prepayment penalties may apply"
        ],
        nextSteps: [
          "Prepare detailed use of funds",
          "Gather financial statements",
          "Document business history",
          "Post proposal for lender bids"
        ],
        recommended: true,
        riskLevel: "Medium",
        closingTimeframe: "14-21 days"
      });
      
      options.push({
        facilityType: "Business Line of Credit",
        financingType: "Revolving Credit",
        term: "12 months (renewable)",
        interestRateType: "Variable",
        interestRateEstimate: calculateRate(7.0, 10.0, creditFactor),
        monthlyCost: "Varies based on usage",
        totalCost: "Depends on utilization",
        pros: [
          "Flexible - only pay for what you use",
          "Can draw and repay as needed",
          "Good for varied or uncertain needs",
          "Works well for phased projects"
        ],
        cons: [
          "Variable rate can increase costs",
          "Annual renewal requirements",
          "May have maintenance fees",
          "Typically lower limits than term loans"
        ],
        nextSteps: [
          "Prepare cash flow projections",
          "Document intended use cases",
          "Review existing banking relationships",
          "Post proposal for lender bids"
        ],
        riskLevel: "Medium-Low",
        closingTimeframe: "7-14 days"
      });
      
      options.push({
        facilityType: "SBA 7(a) Loan",
        financingType: "New Financing",
        term: "120 months",
        interestRateType: "Variable",
        interestRateEstimate: calculateRate(6.0, 8.5, creditFactor),
        monthlyCost: calculateMonthlyCost(fundingAmountNum, 7.25 * creditFactor, 120),
        totalCost: calculateTotalCost(fundingAmountNum, 7.25 * creditFactor, 120),
        pros: [
          "Longer terms than conventional loans",
          "Lower down payment requirements",
          "Flexible use of proceeds",
          "Government guarantee reduces lender risk"
        ],
        cons: [
          "More paperwork and documentation",
          "Longer approval process",
          "SBA guarantee fee adds to cost",
          "Personal guarantee required"
        ],
        nextSteps: [
          "Prepare SBA-specific documentation",
          "Develop detailed business plan",
          "Complete SBA forms",
          "Post proposal for SBA lender bids"
        ],
        riskLevel: "Medium",
        closingTimeframe: "30-45 days"
      });
    }
    
    setRecommendations(options);
    setSelectedOption(0); // Default to first option
    setShowRecommendation(true);
    
    toast.success("Multiple financing options generated");
  };
  
  const handleCreateProposal = () => {
    if (!recommendations.length) return;
    
    // In a real app, this would pre-fill the proposal creation form
    // For now, we'll just navigate to the create proposal page
    toast.info("Creating proposal with selected facility option");
    navigate("/create-proposal");
  };
  
  // Helper functions for interest rate and payment calculations
  const calculateRate = (minRate: number, maxRate: number, creditFactor: number): string => {
    const adjustedMinRate = (minRate * creditFactor).toFixed(1);
    const adjustedMaxRate = (maxRate * creditFactor).toFixed(1);
    return `${adjustedMinRate}% - ${adjustedMaxRate}%`;
  };
  
  const calculateMonthlyCost = (amount: number, rate: number, months: number, type: string = "standard"): string => {
    if (type === "interest-only") {
      const monthlyInterest = (amount * (rate/100)) / 12;
      return `$${Math.round(monthlyInterest).toLocaleString()}/mo (interest-only)`;
    } else if (type === "lease") {
      // Simplified lease calculation
      const leaseRate = amount / months * 1.1;
      return `$${Math.round(leaseRate).toLocaleString()}/mo`;
    } else {
      // Standard amortization
      const monthlyRate = rate / 100 / 12;
      const payment = amount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
      return `$${Math.round(payment).toLocaleString()}/mo`;
    }
  };
  
  const calculateTotalCost = (amount: number, rate: number, months: number, type: string = "standard"): string => {
    if (type === "interest-only") {
      const totalInterest = amount * (rate/100) * (months/12);
      return `$${Math.round(amount + totalInterest).toLocaleString()}`;
    } else if (type === "lease") {
      // Simplified lease total cost
      return `$${Math.round(amount * 1.1).toLocaleString()}`;
    } else {
      // Standard amortization
      const monthlyRate = rate / 100 / 12;
      const payment = amount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
      return `$${Math.round(payment * months).toLocaleString()}`;
    }
  };
  
  const calculateFactoringCost = (amount: number): string => {
    // Simplified factoring cost - assuming 3% fee on average
    const monthlyAmount = amount / 12;
    const fee = monthlyAmount * 0.03;
    return `~$${Math.round(fee).toLocaleString()}/mo in fees`;
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
            Enter your funding needs to get personalized facility recommendations
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
                      Generate Recommendations
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          {showRecommendation && recommendations.length > 0 && (
            <div className="col-span-1 lg:col-span-2">
              <Card className="border-primary/20 bg-background/50 backdrop-blur-sm h-full">
                <CardHeader className="bg-primary/10 border-b border-primary/20">
                  <CardTitle className="text-lg font-mono flex items-center">
                    <Lightbulb className="mr-2 h-5 w-5 text-amber-500" />
                    Credit Facility Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {/* Options selection */}
                  <div className="mb-6 overflow-x-auto pb-2">
                    <div className="flex space-x-2 min-w-max">
                      {recommendations.map((option, index) => (
                        <Button 
                          key={`option-${index}`}
                          variant={selectedOption === index ? "default" : "outline"}
                          onClick={() => setSelectedOption(index)}
                          className={`min-w-[200px] justify-start ${option.recommended ? "border-amber-500" : ""}`}
                        >
                          {option.recommended && <Check className="mr-2 h-4 w-4 text-amber-500" />}
                          {option.facilityType}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Selected option details */}
                  <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="details">Facility Details</TabsTrigger>
                      <TabsTrigger value="pros-cons">Pros & Cons</TabsTrigger>
                      <TabsTrigger value="next-steps">Next Steps</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="details" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-sm font-semibold border-b border-primary/20 pb-1">Basic Details</h3>
                          
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-muted-foreground">Facility Type:</p>
                              <p className="text-lg font-semibold">{recommendations[selectedOption].facilityType}</p>
                            </div>
                            
                            <div>
                              <p className="text-sm text-muted-foreground">Financing Type:</p>
                              <p className="text-lg font-semibold">{recommendations[selectedOption].financingType}</p>
                            </div>
                            
                            <div>
                              <p className="text-sm text-muted-foreground">Term:</p>
                              <p className="text-lg font-semibold">{recommendations[selectedOption].term}</p>
                            </div>
                            
                            <div className="flex items-center">
                              <BadgePercent className="h-4 w-4 mr-2 text-primary" />
                              <p className="text-sm text-muted-foreground">Risk Level:</p>
                              <p className="ml-2 text-sm font-medium">{recommendations[selectedOption].riskLevel}</p>
                            </div>
                            
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-primary" />
                              <p className="text-sm text-muted-foreground">Typical Closing Time:</p>
                              <p className="ml-2 text-sm font-medium">{recommendations[selectedOption].closingTimeframe}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-sm font-semibold border-b border-primary/20 pb-1">Cost Information</h3>
                          
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-muted-foreground">Interest Rate Type:</p>
                              <p className="text-lg font-semibold">{recommendations[selectedOption].interestRateType}</p>
                            </div>
                            
                            <div>
                              <p className="text-sm text-muted-foreground">Estimated Interest Rate:</p>
                              <p className="text-lg font-semibold text-primary">{recommendations[selectedOption].interestRateEstimate}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                *Actual rates may vary based on lender offers
                              </p>
                            </div>
                            
                            <div>
                              <p className="text-sm text-muted-foreground">Estimated Monthly Payment:</p>
                              <p className="text-lg font-semibold">{recommendations[selectedOption].monthlyCost}</p>
                            </div>
                            
                            <div>
                              <p className="text-sm text-muted-foreground">Estimated Total Cost:</p>
                              <p className="text-lg font-semibold">{recommendations[selectedOption].totalCost}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="pros-cons" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-sm font-semibold border-b border-primary/20 pb-1">Benefits</h3>
                          
                          <ul className="space-y-2">
                            {recommendations[selectedOption].pros.map((pro, index) => (
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
                            {recommendations[selectedOption].cons.map((con, index) => (
                              <li key={`con-${index}`} className="flex items-start">
                                <span className="h-4 w-4 mr-2 text-yellow-500 mt-1 flex-shrink-0">•</span>
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="next-steps" className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-semibold border-b border-primary/20 pb-1">Next Steps</h3>
                        
                        <ol className="list-decimal ml-4 space-y-3">
                          {recommendations[selectedOption].nextSteps.map((step, index) => (
                            <li key={`step-${index}`} className="pl-2">{step}</li>
                          ))}
                          <li className="pl-2 font-medium">Once your proposal is complete, submit it to the marketplace to receive competitive bids</li>
                        </ol>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="border-t border-primary/20 pt-4">
                  <Button className="w-full" onClick={handleCreateProposal}>
                    Create Proposal with Selected Option
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
