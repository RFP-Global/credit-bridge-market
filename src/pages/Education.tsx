import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Book, Filter, Download, Building, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import FullscreenButton from "@/components/FullscreenButton";
import RadarScreen from "@/components/RadarScreen";
import FacilityDetailsDialog from "@/components/education/FacilityDetailsDialog";

const creditFacilityTypes = [
  {
    id: "term-loan",
    title: "Term Loans",
    description: "Standard fixed-rate, fixed-term financing solution",
    content: `Term loans are traditional lending arrangements where a business borrows a fixed amount of money and repays it with interest over a predetermined period. They provide predictable payment schedules, making them ideal for long-term investments like equipment purchases, business expansions, or refinancing existing debt. Term loans typically offer lower interest rates than lines of credit but require collateral and strong credit history.`,
    riskLevel: "Low to Medium",
    typicalTerms: "1-10 years",
    interestRates: "4-12%",
    bestFor: "Established businesses with solid financial history",
    commonProviders: "Commercial banks, credit unions, SBA"
  },
  {
    id: "revolving-credit",
    title: "Revolving Credit Facilities",
    description: "Flexible funding with variable borrowing and repayment",
    content: `Revolving credit facilities provide businesses with access to a predetermined credit limit that can be borrowed against, repaid, and borrowed again as needed. Unlike term loans, borrowers only pay interest on the amount they use. These facilities offer exceptional flexibility for managing cash flow fluctuations, seasonal inventory needs, or unexpected expenses. However, they typically come with higher interest rates than term loans and may include maintenance fees.`,
    riskLevel: "Medium",
    typicalTerms: "1-5 years (renewable)",
    interestRates: "6-15%",
    bestFor: "Businesses with variable cash flow needs",
    commonProviders: "Commercial banks, online lenders"
  },
  {
    id: "equipment-financing",
    title: "Equipment Financing",
    description: "Asset-based lending specifically for equipment acquisition",
    content: `Equipment financing is designed specifically for the purchase of business equipment, with the equipment itself serving as collateral. This structure typically allows for higher approval rates and lower interest rates than unsecured loans. Equipment loans generally cover 80-100% of the equipment value with terms that match the expected useful life of the asset. For businesses requiring up-to-date equipment without large cash outlays, equipment leasing offers an alternative option with potential tax advantages.`,
    riskLevel: "Low",
    typicalTerms: "3-7 years (based on equipment life)",
    interestRates: "5-10%",
    bestFor: "Businesses requiring specialized equipment",
    commonProviders: "Equipment manufacturers, specialized lenders, banks"
  },
  {
    id: "sba-loans",
    title: "SBA Loans",
    description: "Government-guaranteed financing with favorable terms",
    content: `Small Business Administration (SBA) loans are partially guaranteed by the U.S. government, reducing risk for lenders and enabling them to offer more favorable terms to small businesses. SBA loans typically feature lower down payments, longer repayment terms, and competitive interest rates compared to conventional business loans. The most common programs include the 7(a) Loan Program for general business purposes, CDC/504 Loans for major fixed assets, and Microloans for smaller amounts. While offering excellent terms, SBA loans require extensive documentation and longer approval timelines.`,
    riskLevel: "Low to Medium",
    typicalTerms: "Up to 25 years (depending on purpose)",
    interestRates: "5-8%",
    bestFor: "Small businesses that may not qualify for conventional financing",
    commonProviders: "SBA-approved banks and credit unions"
  },
  {
    id: "commercial-mortgage",
    title: "Commercial Mortgages",
    description: "Real estate financing for business property acquisition",
    content: `Commercial mortgages are loans secured by commercial real estate, allowing businesses to finance property purchases or refinance existing property loans. These loans typically require a down payment of 15-35% and offer terms ranging from 5-20 years with amortization schedules extending up to 30 years. Commercial mortgages generally have lower interest rates than unsecured business loans due to the real estate collateral but include closing costs, appraisal fees, and stringent qualification requirements.`,
    riskLevel: "Low",
    typicalTerms: "5-20 years",
    interestRates: "4-7%",
    bestFor: "Businesses purchasing or refinancing commercial property",
    commonProviders: "Commercial banks, specialized mortgage lenders"
  },
  {
    id: "venture-debt",
    title: "Venture Debt",
    description: "Specialized financing for venture-backed companies",
    content: `Venture debt is a specialized financing option for startups and growth-stage companies that have already raised venture capital. This debt financing complements equity funding, providing additional capital without the dilution associated with raising more equity. Venture debt typically includes both an interest component and equity warrants, allowing lenders to participate in the company's potential upside. While more expensive than traditional bank loans, venture debt offers higher amounts with fewer covenants for companies that may not yet qualify for conventional financing.`,
    riskLevel: "High",
    typicalTerms: "3-4 years",
    interestRates: "10-15% (plus warrants)",
    bestFor: "Venture-backed startups and growth companies",
    commonProviders: "Specialized venture debt funds, select banks"
  },
  {
    id: "invoice-financing",
    title: "Invoice Financing",
    description: "Short-term funding based on accounts receivable",
    content: `Invoice financing allows businesses to borrow against their outstanding invoices, converting accounts receivable into immediate cash flow. This can be structured as either factoring (selling invoices to a lender who collects from customers) or invoice discounting (borrowing against invoices while maintaining customer relationships). This financing option improves cash flow without increasing debt and doesn't require collateral beyond the invoices themselves. However, it typically carries higher fees than traditional loans and may affect customer relationships if structured as factoring.`,
    riskLevel: "Medium",
    typicalTerms: "30-120 days (invoice terms)",
    interestRates: "1-5% monthly fee",
    bestFor: "B2B companies with cash flow constraints",
    commonProviders: "Specialized factors, online platforms, select banks"
  },
  {
    id: "merchant-cash-advance",
    title: "Merchant Cash Advance",
    description: "Future sales-based financing with flexible repayment",
    content: `Merchant cash advances (MCAs) provide upfront capital in exchange for a portion of future credit card or debit card sales. Rather than fixed monthly payments, businesses repay through a percentage of daily or weekly sales, creating a natural alignment with cash flow. MCAs offer rapid approval and funding with minimal paperwork and no collateral requirements. However, they rank among the most expensive financing options, with effective annual percentage rates sometimes exceeding 50% when converted from their factor rate pricing structure.`,
    riskLevel: "High",
    typicalTerms: "3-18 months",
    interestRates: "Factor rates 1.1-1.5",
    bestFor: "Retail and service businesses with high card transaction volume",
    commonProviders: "Specialized MCA providers, some online lenders"
  }
];

const lenderTypes = [
  {
    id: "commercial-banks",
    title: "Commercial Banks",
    description: "Traditional financial institutions offering a range of lending options",
    content: `Commercial banks represent the most traditional lending source, offering various business financing options including term loans, lines of credit, equipment financing, and commercial mortgages. They typically provide the most competitive interest rates and terms but maintain the strictest qualification criteria, including strong credit scores, established business history, and substantial collateral. The application process is comprehensive, often requiring detailed financial documentation and taking several weeks for approval.`,
    strengthsWeaknesses: "Low rates and established relationships, but strict requirements and slow processes",
    typicalProducts: "Term loans, lines of credit, commercial mortgages",
    bestForBusinesses: "Established businesses with strong financials and collateral"
  },
  {
    id: "credit-unions",
    title: "Credit Unions",
    description: "Member-owned financial cooperatives with community focus",
    content: `Credit unions are member-owned financial cooperatives that often provide more personalized service and slightly better rates than commercial banks. Business lending at credit unions has increased significantly, though their offerings may be more limited than large banks. Credit unions typically focus on serving specific communities or regions, and businesses must qualify for membership. While approval criteria remain stringent, credit unions sometimes take a more holistic approach to lending decisions, considering factors beyond just credit scores and financial statements.`,
    strengthsWeaknesses: "Competitive rates and personalized service, but membership requirements and potentially limited product range",
    typicalProducts: "Business loans, lines of credit, vehicle loans",
    bestForBusinesses: "Small to medium-sized local businesses with community ties"
  },
  {
    id: "sba-lenders",
    title: "SBA Lenders",
    description: "Institutions offering government-backed small business loans",
    content: `SBA lenders are financial institutions approved to offer Small Business Administration guaranteed loans. These lenders—including banks, credit unions, and specialized institutions—provide loans partially guaranteed by the federal government, reducing lender risk and enabling more favorable terms for borrowers. SBA loans feature lower down payments, longer terms, and competitive rates, but require extensive documentation and longer approval timelines. The most active lenders achieve "Preferred Lender" status, allowing them to approve SBA loans with less SBA oversight, potentially accelerating the process.`,
    strengthsWeaknesses: "Favorable terms and accessibility, but extensive paperwork and longer approval times",
    typicalProducts: "7(a) loans, CDC/504 loans, microloans",
    bestForBusinesses: "Growing small businesses that may not qualify for conventional financing"
  },
  {
    id: "online-lenders",
    title: "Online Lenders",
    description: "Digital-first financing platforms with streamlined processes",
    content: `Online lenders leverage technology to streamline the application, underwriting, and funding processes, often providing approval decisions within hours and funding within days. These lenders typically offer more flexible qualification criteria than traditional banks, considering alternative data points beyond credit scores and financial statements. While online lenders provide exceptional convenience and accessibility, this comes at a cost—interest rates and fees are typically higher than traditional financing sources, sometimes significantly so.`,
    strengthsWeaknesses: "Fast approval and minimal documentation, but higher rates and potentially predatory practices",
    typicalProducts: "Term loans, lines of credit, invoice financing",
    bestForBusinesses: "Growing businesses needing quick capital or those with less-than-perfect credit"
  },
  {
    id: "cdfi",
    title: "Community Development Financial Institutions (CDFIs)",
    description: "Mission-driven lenders focused on economic development",
    content: `Community Development Financial Institutions (CDFIs) are specialized lenders dedicated to delivering responsible, affordable financing to disadvantaged communities and underserved markets. These mission-driven organizations prioritize economic development and often provide technical assistance alongside capital. CDFIs offer competitive rates and more flexible qualification criteria, focusing on business potential and community impact rather than strictly financial metrics. Though loan amounts are typically smaller than commercial bank offerings, CDFIs represent an important financing source for businesses in underserved areas.`,
    strengthsWeaknesses: "Mission-aligned lending and technical assistance, but potentially smaller loan amounts",
    typicalProducts: "Microloans, small business loans, community development loans",
    bestForBusinesses: "Small businesses in underserved communities or with social impact goals"
  },
  {
    id: "venture-capital",
    title: "Venture Capital Firms",
    description: "Equity investors providing capital for high-growth startups",
    content: `Venture capital firms invest in high-growth potential startups and early-stage companies in exchange for equity ownership. Unlike lenders, venture capitalists become partial owners of the business, sharing both risk and potential rewards. VC funding typically targets companies with innovative products or services, substantial addressable markets, and strong growth trajectories. This funding source provides significant capital without debt obligations but dilutes founder ownership and often comes with expectations for rapid scaling and eventual exit through acquisition or public offering.`,
    strengthsWeaknesses: "Large funding amounts and strategic guidance, but equity dilution and growth pressure",
    typicalProducts: "Seed funding, Series A/B/C investments, venture debt",
    bestForBusinesses: "High-growth startups with scalable business models"
  },
  {
    id: "equipment-financiers",
    title: "Equipment Financiers",
    description: "Specialized lenders focusing on equipment acquisition",
    content: `Equipment financiers specialize in providing capital specifically for equipment purchases, with the equipment itself serving as collateral. These specialized lenders—including equipment manufacturers, dealers, and independent finance companies—understand specific industries and equipment types, often enabling more accurate valuations and appropriate terms. Equipment financing typically covers 80-100% of equipment costs with terms matching the asset's useful life. For businesses seeking to avoid ownership commitments, many equipment financiers also offer leasing options with potential tax advantages.`,
    strengthsWeaknesses: "Specialized industry knowledge and asset-focused underwriting, but limited to equipment purchases",
    typicalProducts: "Equipment loans, leases, and lease-to-own arrangements",
    bestForBusinesses: "Businesses regularly upgrading equipment or requiring specialized machinery"
  },
  {
    id: "asset-based-lenders",
    title: "Asset-Based Lenders",
    description: "Financing secured by business assets beyond just equipment",
    content: `Asset-based lenders provide financing secured by business assets such as accounts receivable, inventory, equipment, and real estate. These lenders focus more on asset quality than business credit profiles, making them accessible to companies with strong assets but challenging financial histories. Asset-based lending typically structures as a revolving line of credit with borrowing capacity directly tied to the value of eligible collateral. While offering flexibility, this financing approach requires detailed reporting and often includes regular asset audits to verify collateral value.`,
    strengthsWeaknesses: "Asset-focused underwriting and flexibility, but extensive reporting requirements",
    typicalProducts: "Asset-based lines of credit, accounts receivable financing",
    bestForBusinesses: "Asset-rich businesses with fluctuating capital needs"
  }
];

const Education = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("facilities");
  const [timeFilter, setTimeFilter] = useState("all-time");
  const [selectedFacility, setSelectedFacility] = useState<typeof creditFacilityTypes[0] | null>(null);
  const [selectedLender, setSelectedLender] = useState<typeof lenderTypes[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleFacilityClick = (facility: typeof creditFacilityTypes[0]) => {
    setSelectedFacility(facility);
    setSelectedLender(null);
    setDialogOpen(true);
  };

  const handleLenderClick = (lender: typeof lenderTypes[0]) => {
    setSelectedLender(lender);
    setSelectedFacility(null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCreateProposal = (facilityId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(`/facility-builder?template=${facilityId}`);
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 overflow-x-hidden">
      <Navbar />
      <FullscreenButton />
      <RadarScreen className="z-0" />
      <div className="scanline z-10"></div>
      
      <div className="container mx-auto px-4 py-8 mt-16 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Book className="h-6 w-6 text-cyan-400" />
            <h1 className="text-2xl font-mono text-gray-200">Education Center</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              className="flex items-center h-8 bg-black/40 border-cyan-700/50 text-cyan-300 hover:bg-cyan-950/30 font-mono text-xs"
            >
              <Filter className="h-3.5 w-3.5 mr-2" />
              Filters
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center h-8 bg-black/40 border-cyan-700/50 text-cyan-300 hover:bg-cyan-950/30 font-mono text-xs"
            >
              <Download className="h-3.5 w-3.5 mr-2" />
              Export Resources
            </Button>
          </div>
        </div>

        <Tabs 
          defaultValue="facilities" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 bg-black/50 border border-cyan-800/30 h-12 mb-6">
            <TabsTrigger 
              value="facilities" 
              className="font-mono data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-400"
            >
              Credit Facility Types
            </TabsTrigger>
            <TabsTrigger 
              value="providers" 
              className="font-mono data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-400"
            >
              Credit Providers
            </TabsTrigger>
          </TabsList>

          {activeTab === "facilities" && (
            <ScrollArea className="h-[calc(100vh-220px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                {creditFacilityTypes.map((facility) => (
                  <Card 
                    key={facility.id} 
                    className="bg-black/60 border-cyan-800/30 backdrop-blur-sm hover:bg-black/80 hover:border-cyan-700/50 transition-all cursor-pointer"
                    onClick={() => handleFacilityClick(facility)}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-cyan-300">{facility.title}</CardTitle>
                        <Badge className="bg-cyan-900/30 text-cyan-300 border border-cyan-700/50">
                          {facility.riskLevel}
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-400">
                        {facility.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-300">{facility.content.substring(0, 150)}...</p>
                      
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="details" className="border-cyan-800/30">
                          <AccordionTrigger className="text-sm text-cyan-300 hover:text-cyan-200">
                            Facility Details
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Typical Terms:</span>
                                <span className="text-gray-200">{facility.typicalTerms}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Interest Rates:</span>
                                <span className="text-gray-200">{facility.interestRates}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Best For:</span>
                                <span className="text-gray-200">{facility.bestFor}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Common Providers:</span>
                                <span className="text-gray-200">{facility.commonProviders}</span>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={(e) => handleCreateProposal(facility.id, e)}
                        variant="cyan"
                        className="w-full bg-gradient-to-r from-black/60 to-cyan-950/60 hover:from-cyan-950/60 hover:to-black/60 border border-cyan-800/50 text-cyan-300 font-mono text-xs"
                      >
                        <Code className="h-4 w-4 mr-2" />
                        Create Proposal Using This Template
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}

          {activeTab === "providers" && (
            <ScrollArea className="h-[calc(100vh-220px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                {lenderTypes.map((lender) => (
                  <Card 
                    key={lender.id} 
                    className="bg-black/60 border-cyan-800/30 backdrop-blur-sm hover:bg-black/80 hover:border-cyan-700/50 transition-all cursor-pointer"
                    onClick={() => handleLenderClick(lender)}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-cyan-300">{lender.title}</CardTitle>
                        <Badge className="bg-emerald-900/30 text-emerald-300 border border-emerald-700/50">
                          Provider
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-400">
                        {lender.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-300">{lender.content.substring(0, 150)}...</p>
                      
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="details" className="border-cyan-800/30">
                          <AccordionTrigger className="text-sm text-cyan-300 hover:text-cyan-200">
                            Provider Details
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 text-sm">
                              <div className="flex flex-col">
                                <span className="text-gray-400">Strengths & Weaknesses:</span>
                                <span className="text-gray-200">{lender.strengthsWeaknesses}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-gray-400">Typical Products:</span>
                                <span className="text-gray-200">{lender.typicalProducts}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-gray-400">Best For Businesses:</span>
                                <span className="text-gray-200">{lender.bestForBusinesses}</span>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </Tabs>
      </div>
      
      {/* Details Dialog */}
      <FacilityDetailsDialog
        isOpen={dialogOpen}
        onClose={handleCloseDialog}
        facility={selectedFacility}
        lender={selectedLender}
      />
    </div>
  );
};

export default Education;
