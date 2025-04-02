
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Book, Info, Settings, FileText, Database, Code } from "lucide-react";
import FacilityStatistics from './FacilityStatistics';

interface FacilityDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  facility: {
    id: string;
    title: string;
    description: string;
    content: string;
    riskLevel: string;
    typicalTerms: string;
    interestRates: string;
    bestFor: string;
    commonProviders: string;
    mechanics?: string;
  } | null;
}

const facilityMechanics: Record<string, string> = {
  "term-loan": `
    # How Term Loans Work
    
    Term loans follow a straightforward process:
    
    1. **Application & Underwriting**: The borrower submits financial documentation for review, including business financials, credit history, and collateral information.
    
    2. **Approval & Terms Setting**: Upon approval, the lender establishes specific terms including:
       - Principal amount
       - Interest rate (fixed or variable)
       - Repayment schedule
       - Loan term (maturity date)
       - Collateral requirements
       - Covenants (financial requirements the business must maintain)
    
    3. **Disbursement**: The full loan amount is transferred to the borrower in a lump sum.
    
    4. **Amortization**: Most term loans use amortization schedules where each payment consists of both principal and interest, with earlier payments having higher interest portions.
    
    5. **Repayment**: The borrower makes regular (typically monthly) payments according to the amortization schedule until maturity.
    
    6. **Maturity**: At the end of the loan term, all principal and interest must be paid in full, unless refinanced.
    
    Term loans often include prepayment penalties to compensate lenders for lost interest if repaid early. Financial covenants require businesses to maintain specific financial ratios and performance metrics throughout the loan term.
  `,
  "revolving-credit": `
    # How Revolving Credit Facilities Work
    
    Revolving credit facilities operate as flexible borrowing arrangements:
    
    1. **Credit Limit Establishment**: The lender approves a maximum credit limit based on the borrower's creditworthiness and financial condition.
    
    2. **Draw Period**: During the term of the facility (typically 1-5 years), the borrower can:
       - Draw funds as needed up to the credit limit
       - Repay borrowed amounts
       - Re-borrow previously repaid amounts
    
    3. **Interest Calculation**: Interest accrues only on the outstanding balance, not the entire credit limit.
    
    4. **Payment Structure**: Typically includes:
       - Minimum monthly payments (often interest-only)
       - Principal payments that free up available credit
       - Option to pay in full at any time
    
    5. **Maintenance & Monitoring**: Facilities often require:
       - Commitment fees on unused portions
       - Regular financial reporting
       - Periodic credit reviews and possible limit adjustments
    
    6. **Renewal or Termination**: At the end of the term, the facility may be:
       - Renewed with similar or adjusted terms
       - Converted to a term loan for remaining balance
       - Terminated, requiring full repayment
    
    Unlike term loans, revolving facilities provide ongoing access to capital with fluctuating balances, making them ideal for managing seasonal cash flow needs, funding working capital, or providing emergency liquidity.
  `,
  "equipment-financing": `
    # How Equipment Financing Works
    
    Equipment financing utilizes the financed equipment as collateral in a streamlined process:
    
    1. **Equipment Selection & Quote**: The business selects specific equipment and obtains a quote from the vendor.
    
    2. **Application**: The business applies for financing, providing:
       - Equipment specifications and quote
       - Business financials
       - Credit history
    
    3. **Equipment Valuation**: The lender assesses:
       - Equipment value and useful life
       - Depreciation schedule
       - Resale potential (liquidation value)
    
    4. **Approval & Structure**: Upon approval, the lender establishes:
       - Loan amount (typically 80-100% of equipment cost)
       - Interest rate
       - Term (aligned with equipment useful life)
       - Ownership structure (loan vs. lease)
    
    5. **Funding**: The lender pays the vendor directly for the equipment.
    
    6. **Repayment**: Fixed monthly payments that include:
       - Principal amortization
       - Interest charges
       - Any applicable fees
    
    7. **Ownership Transfer**: At the end of the term:
       - For loans, the business receives clear title
       - For leases, ownership may transfer after a final payment or the business may return the equipment
    
    Equipment financing simplifies the underwriting process because the equipment serves as built-in collateral, reducing lender risk. The equipment itself generates the revenue that helps repay the financing.
  `,
  "sba-loans": `
    # How SBA Loans Work
    
    SBA loans operate through a partnership between commercial lenders and the Small Business Administration:
    
    1. **Application Through Approved Lender**: Businesses apply through SBA-approved lenders (banks, credit unions, or specialized lenders).
    
    2. **Dual Underwriting Process**:
       - The lender evaluates the application using its commercial lending standards
       - The SBA reviews to confirm program eligibility
    
    3. **Government Guarantee**:
       - The SBA provides a partial guarantee to the lender (typically 50-85% of the loan amount)
       - This guarantee reduces lender risk, enabling them to approve loans that might otherwise be declined
    
    4. **Standardized Programs**:
       - 7(a) Loans: General business purposes with guarantees up to $5 million
       - CDC/504 Loans: Real estate and major equipment financing through a Certified Development Company
       - Microloans: Smaller amounts (up to $50,000) for startups and very small businesses
    
    5. **Mandated Terms**:
       - Capped interest rates (typically Prime + 2.25-4.75%)
       - Extended maturity periods (up to 10 years for working capital, 25 years for real estate)
       - Limits on fees lenders can charge
    
    6. **Documentation & Compliance**:
       - Extensive paperwork requirements
       - Regular reporting to both lender and SBA
       - Restrictions on use of funds
    
    7. **Disbursement & Repayment**:
       - Structured disbursement based on approved use of funds
       - Monthly payments with strict adherence to agreed terms
    
    SBA loans combine commercial lending practices with government support, making capital accessible to small businesses that might not qualify for conventional financing.
  `,
  "commercial-mortgage": `
    # How Commercial Mortgages Work
    
    Commercial mortgages finance business properties through a structured process:
    
    1. **Property Identification & Valuation**:
       - Business identifies commercial property
       - Professional appraisal determines market value
       - Environmental and property condition assessments
    
    2. **Application & Underwriting**: Lender evaluates:
       - Property value and income-generating potential
       - Business financial health and credit profile
       - Debt Service Coverage Ratio (DSCR)
       - Loan-to-Value ratio (LTV) - typically 65-85%
    
    3. **Approval & Terms**:
       - Loan amount and down payment requirement (15-35%)
       - Interest rate (fixed or variable)
       - Term (typically 5-10 years)
       - Amortization period (often 15-30 years)
       - Balloon payment timing
    
    4. **Closing Process**:
       - Property title search and insurance
       - Legal documentation and recording of mortgage lien
       - Payment of closing costs (2-5% of loan amount)
    
    5. **Repayment Structure**:
       - Regular monthly payments (principal and interest)
       - Potential balloon payment at term end
       - Refinancing option at term end
    
    6. **Covenant Requirements**:
       - Insurance maintenance
       - Property tax payments
       - Financial performance metrics
       - Regular property condition reports
    
    Unlike residential mortgages, commercial mortgages typically have shorter terms with balloon payments, stricter underwriting based on property income potential, and higher interest rates reflecting increased risk.
  `,
  "venture-debt": `
    # How Venture Debt Works
    
    Venture debt combines elements of traditional debt with equity features:
    
    1. **Venture Capital Prerequisite**: Companies typically must first secure venture capital equity investment, establishing credibility and valuation benchmarks.
    
    2. **Dual-Component Structure**:
       - **Term Loan Component**: Traditional debt structure with:
         - Principal amount (typically 30-50% of last equity round)
         - Interest payments (higher than traditional bank loans)
         - Fixed repayment schedule (usually 3-4 years)
       
       - **Equity Component**: Warrants giving the lender right to:
         - Purchase company stock at set price
         - Convert a portion of debt value to equity
         - Typically represents 5-20% of loan value
    
    3. **Draw Period**: Companies often have a 6-12 month window to draw down the committed capital in tranches.
    
    4. **Interest-Only Period**: Many venture debt facilities offer 6-12 months of interest-only payments before principal repayment begins.
    
    5. **Covenant Structure**:
       - Performance-based covenants linked to business metrics
       - Financial monitoring requirements
       - Material adverse change clauses
    
    6. **Repayment Dynamics**:
       - Monthly payments combining principal and interest
       - Option for early repayment (sometimes with prepayment penalties)
       - Potential for refinancing with subsequent equity rounds
    
    7. **Exit Scenarios**:
       - Warrant execution at company exit (acquisition or IPO)
       - Potential warrant redemption negotiations
       - Loan repayment from exit proceeds
    
    Venture debt extends a company's runway between equity rounds while causing less dilution than additional equity funding, but requires careful cash flow management to service the debt obligations.
  `,
  "invoice-financing": `
    # How Invoice Financing Works
    
    Invoice financing converts accounts receivable into immediate cash flow through two main structures:
    
    ## Invoice Factoring
    
    1. **Invoice Sale**: Business sells unpaid invoices to a factoring company.
    
    2. **Initial Payment**: Factor provides advance funding of 70-90% of invoice value.
    
    3. **Customer Payment Collection**: Factor takes over collection process and communicates directly with customers.
    
    4. **Final Payment**: When customer pays the invoice:
       - Factor retains agreed-upon fee (typically 1-5% of invoice value)
       - Factor remits remaining balance to business
    
    5. **Recourse Provisions**: Many factoring arrangements include recourse, requiring the business to buy back unpaid invoices after a specified period.
    
    ## Invoice Discounting
    
    1. **Invoice Collateralization**: Business retains ownership of invoices but uses them as collateral for a line of credit.
    
    2. **Advance Rate**: Lender provides 80-90% of eligible invoice value.
    
    3. **Customer Relationship Management**: Business maintains customer relationships and handles collections.
    
    4. **Repayment Mechanism**: Business repays the advance plus fees when customers pay invoices.
    
    5. **Fee Structure**: Typically combines:
       - Discount fee (interest on advanced amount)
       - Service fee for administration
    
    ## Common Elements
    
    - **Invoice Verification**: Lenders verify invoice authenticity and customer creditworthiness.
    
    - **Customer Concentration Limits**: Caps on percentage of funding from any single customer.
    
    - **Aging Restrictions**: Only invoices within certain aging parameters (typically <90 days) qualify.
    
    - **Ongoing Monitoring**: Regular reporting on accounts receivable aging and collections.
    
    Invoice financing provides immediate liquidity without creating traditional debt, making it particularly valuable for businesses with long payment cycles or rapid growth.
  `,
  "merchant-cash-advance": `
    # How Merchant Cash Advances Work
    
    Merchant cash advances provide upfront capital in exchange for future sales revenue:
    
    1. **Advance Structure**: Provider gives business a lump sum upfront in exchange for a percentage of future sales.
    
    2. **Factor Rate Pricing**: Instead of interest rates, MCAs use factor rates:
       - Typically range from 1.1 to 1.5
       - Factor rate multiplied by advance amount equals total repayment
       - E.g., $100,000 advance with 1.3 factor rate = $130,000 total repayment
    
    3. **Holdback Mechanism**: Automatic collection of a fixed percentage (typically 8-30%) of daily credit/debit card sales until repayment is complete.
    
    4. **Variable Repayment Timeline**:
       - No fixed maturity date
       - Repayment speed fluctuates with business sales volume
       - Higher sales = faster repayment; lower sales = slower repayment
    
    5. **Underwriting Focus**:
       - Payment processing statements
       - Daily credit card transaction volume
       - Business bank statements
       - Time in business (minimum requirements)
    
    6. **Retrieval Methods**:
       - **Split Funding**: Payment processor automatically diverts percentage of each transaction
       - **ACH Withdrawals**: Fixed daily or weekly withdrawals from business bank account
    
    7. **Renewal Options**: Many providers offer renewals once 50-80% of the original advance is repaid.
    
    MCAs provide rapid funding (often within 24-48 hours) with minimal documentation requirements, making them accessible to businesses with limited credit history or collateral. However, when converted to APR terms, their effective cost often exceeds 50-100%, making them significantly more expensive than traditional financing options.
  `
};

const FacilityDetailsDialog: React.FC<FacilityDetailsProps> = ({ 
  isOpen, 
  onClose, 
  facility 
}) => {
  if (!facility) return null;

  // Get the mechanics for this facility type
  const mechanics = facilityMechanics[facility.id] || "";
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-black/90 border-cyan-800/50 text-gray-200 max-w-4xl max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl text-cyan-300 font-mono flex items-center gap-2">
              <Book className="h-5 w-5" />
              {facility.title}
            </DialogTitle>
            <Badge className="bg-cyan-900/30 text-cyan-300 border border-cyan-700/50">
              {facility.riskLevel}
            </Badge>
          </div>
          <DialogDescription className="text-gray-400">
            {facility.description}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh]">
          <div className="space-y-6 pr-4">
            {/* Overview Section */}
            <div className="space-y-3">
              <h3 className="text-lg text-cyan-300 font-mono flex items-center gap-2">
                <Info className="h-4 w-4" />
                Overview
              </h3>
              <p className="text-gray-300 leading-relaxed">{facility.content}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <h4 className="text-cyan-400/80 text-sm font-semibold">Typical Terms</h4>
                  <p className="text-gray-300">{facility.typicalTerms}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-cyan-400/80 text-sm font-semibold">Interest Rates</h4>
                  <p className="text-gray-300">{facility.interestRates}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-cyan-400/80 text-sm font-semibold">Best For</h4>
                  <p className="text-gray-300">{facility.bestFor}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-cyan-400/80 text-sm font-semibold">Common Providers</h4>
                  <p className="text-gray-300">{facility.commonProviders}</p>
                </div>
              </div>
            </div>
            
            {/* Statistics Section */}
            <FacilityStatistics 
              facilityId={facility.id} 
              facilityTitle={facility.title}
            />
            
            {/* Mechanics Section - Improved Design */}
            <div className="space-y-6 border-t border-cyan-800/30 pt-6">
              <h3 className="text-2xl text-cyan-300 font-mono flex items-center gap-2">
                <Settings className="h-5 w-5 text-cyan-400" />
                Detailed Mechanics
              </h3>
              
              <div className="bg-gradient-to-b from-cyan-950/30 to-black/20 rounded-lg border border-cyan-800/30 shadow-lg overflow-hidden">
                <div className="p-6 text-gray-200 leading-relaxed">
                  {mechanics.split('\n').map((line, i) => {
                    if (line.startsWith('# ')) {
                      return (
                        <div key={i} className="flex items-center gap-2 mb-4 mt-6 border-b border-cyan-800/30 pb-2">
                          <FileText className="h-5 w-5 text-cyan-400" />
                          <h3 className="text-xl text-cyan-300 font-mono">{line.replace('# ', '')}</h3>
                        </div>
                      );
                    } else if (line.startsWith('## ')) {
                      return (
                        <div key={i} className="flex items-center gap-2 mt-4 mb-2">
                          <Database className="h-4 w-4 text-cyan-400/80" />
                          <h4 className="text-lg text-cyan-400 font-mono">{line.replace('## ', '')}</h4>
                        </div>
                      );
                    } else if (line.match(/^\d+\. \*\*/)) {
                      // Numbered list items with bold starts
                      return (
                        <div key={i} className="flex gap-2 my-3 pl-2 border-l-2 border-cyan-700/30">
                          <span className="text-cyan-400/90 font-mono">{line.split('.')[0]}.</span>
                          <div className="flex-1">
                            <span 
                              dangerouslySetInnerHTML={{ 
                                __html: line.split('.')[1].replace(/\*\*(.*?)\*\*/g, '<span class="font-semibold text-cyan-100">$1</span>') 
                              }} 
                            />
                          </div>
                        </div>
                      );
                    } else if (line.startsWith('- **')) {
                      // Bullet items with bold starts
                      return (
                        <div key={i} className="flex gap-2 my-2 ml-4 bg-cyan-900/10 p-2 rounded-md">
                          <span className="text-cyan-400/90">•</span>
                          <div className="flex-1">
                            <span 
                              dangerouslySetInnerHTML={{ 
                                __html: line.substring(2).replace(/\*\*(.*?)\*\*/g, '<span class="font-semibold text-cyan-200">$1</span>') 
                              }} 
                            />
                          </div>
                        </div>
                      );
                    } else if (line.trim() === '') {
                      return <div key={i} className="h-2" />;
                    } else {
                      return (
                        <p key={i} className="my-2 text-gray-300 leading-relaxed">
                          {line}
                        </p>
                      );
                    }
                  })}
                </div>
              </div>
              
              {/* Footer with code icon */}
              <div className="flex justify-end pt-2">
                <div className="flex items-center text-xs text-cyan-500/60">
                  <Code className="h-3 w-3 mr-1" />
                  <span>Facility mechanics documentation</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default FacilityDetailsDialog;
