
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Book, CheckCircle2, Code, Database, FileText, Info, Settings, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// Import facility mechanics data from FacilityDetailsDialog
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

// Facility titles mapping
const facilityTitles: Record<string, string> = {
  "term-loan": "Term Loan",
  "revolving-credit": "Revolving Credit Facility",
  "equipment-financing": "Equipment Financing",
  "sba-loans": "SBA Loans",
  "commercial-mortgage": "Commercial Mortgage",
  "venture-debt": "Venture Debt",
  "invoice-financing": "Invoice Financing",
  "merchant-cash-advance": "Merchant Cash Advance"
};

const FacilityMechanics: React.FC = () => {
  const navigate = useNavigate();
  const { facilityId } = useParams<{ facilityId: string }>();
  const [mechanicsContent, setMechanicsContent] = useState<string>("");
  const [facilityTitle, setFacilityTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [animateIn, setAnimateIn] = useState<boolean>(false);

  useEffect(() => {
    if (facilityId && facilityMechanics[facilityId]) {
      setMechanicsContent(facilityMechanics[facilityId]);
      setFacilityTitle(facilityTitles[facilityId] || "Credit Facility");
      
      // Simulate loading for smooth animation
      const timer = setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => setAnimateIn(true), 100);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      navigate('/education');
    }
  }, [facilityId, navigate]);

  const goBack = () => {
    navigate('/education');
  };

  // Function to render mechanics content with styled elements
  const renderMechanicsContent = () => {
    if (!mechanicsContent) return null;

    return mechanicsContent.split('\n').map((line, i) => {
      if (line.startsWith('# ')) {
        return (
          <div 
            key={i} 
            className={`
              bg-gradient-to-r from-cyan-900/80 to-cyan-800/40 rounded-xl p-6 mb-8 mt-6 
              shadow-lg border border-cyan-700/50 flex items-center gap-4 transform transition-all
              ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              transition-all duration-500 ease-out delay-[300ms]
            `}
          >
            <Zap className="h-8 w-8 text-cyan-300 flex-shrink-0" />
            <h1 className="text-2xl md:text-3xl text-cyan-100 font-mono font-bold">
              {line.replace('# ', '')}
            </h1>
          </div>
        );
      } else if (line.startsWith('## ')) {
        return (
          <div 
            key={i} 
            className={`
              flex items-center gap-3 mt-8 mb-4 bg-cyan-900/30 p-4 rounded-lg 
              border-l-4 border-cyan-500 transform 
              ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              transition-all duration-500 ease-out delay-[400ms]
            `}
          >
            <Target className="h-6 w-6 text-cyan-400" />
            <h2 className="text-xl text-cyan-300 font-mono font-semibold">
              {line.replace('## ', '')}
            </h2>
          </div>
        );
      } else if (line.match(/^\d+\. \*\*/)) {
        const number = line.split('.')[0];
        const content = line.substring(number.length + 2);
        const delay = 500 + (parseInt(number) * 100);
        
        return (
          <div 
            key={i} 
            className={`
              flex gap-5 my-6 p-5 bg-cyan-950/70 rounded-xl border-l-2 border-cyan-600/70 
              shadow-md transition-all hover:bg-cyan-900/40 transform
              ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              transition-all duration-500 ease-out delay-[${delay}ms]
            `}
          >
            <div className="bg-gradient-to-br from-cyan-700 to-cyan-900 text-cyan-100 h-10 w-10 rounded-full flex items-center justify-center font-mono text-lg font-bold shadow-md">
              {number}
            </div>
            <div className="flex-1 pt-1">
              <span 
                className="text-gray-200 text-lg"
                dangerouslySetInnerHTML={{ 
                  __html: content.replace(/\*\*(.*?)\*\*/g, '<span class="font-semibold text-cyan-200">$1</span>') 
                }} 
              />
            </div>
          </div>
        );
      } else if (line.startsWith('- **')) {
        return (
          <div 
            key={i} 
            className={`
              flex gap-3 my-4 ml-6 bg-cyan-900/20 p-4 rounded-lg border-l-2 
              border-cyan-700/40 hover:bg-cyan-900/30 transition-all transform
              ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              transition-all duration-500 ease-out delay-[600ms]
            `}
          >
            <CheckCircle2 className="text-cyan-400 h-5 w-5 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <span 
                className="text-gray-200"
                dangerouslySetInnerHTML={{ 
                  __html: line.substring(2).replace(/\*\*(.*?)\*\*/g, '<span class="font-semibold text-cyan-200">$1</span>') 
                }} 
              />
            </div>
          </div>
        );
      } else if (line.trim() === '') {
        return <div key={i} className="h-3" />;
      } else {
        return (
          <p 
            key={i} 
            className={`
              my-4 text-gray-300 leading-relaxed text-lg pl-4 transform
              ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              transition-all duration-500 ease-out delay-[500ms]
            `}
          >
            {line}
          </p>
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className={`
        fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md z-10 border-b border-cyan-800/30
        ${animateIn ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}
        transition-all duration-500 ease-out
      `}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Button 
              onClick={goBack}
              variant="ghost" 
              className="text-cyan-300 hover:bg-cyan-900/30 hover:text-cyan-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Education
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Book className="h-5 w-5 text-cyan-400" />
            <span className="text-cyan-300 font-mono text-sm">FACILITY MECHANICS</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-28 pb-16">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="h-12 w-12 rounded-full border-4 border-cyan-500/30 border-t-cyan-500 animate-spin"></div>
            <p className="mt-4 text-cyan-400 font-mono">Loading facility mechanics...</p>
          </div>
        ) : (
          <>
            <div className={`
              bg-gradient-to-r from-cyan-900/50 to-cyan-800/20 rounded-2xl p-8 mb-8 
              shadow-lg border border-cyan-700/30 flex flex-col items-center
              ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              transition-all duration-500 ease-out
            `}>
              <div className="flex items-center space-x-3 mb-3">
                <Settings className="h-6 w-6 text-cyan-400" />
                <h2 className="text-xl font-semibold text-cyan-300">Understanding</h2>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-center text-cyan-100 font-mono mb-4">
                {facilityTitle}
              </h1>
              <p className="text-lg text-center text-gray-300 max-w-3xl">
                A comprehensive breakdown of how this financing mechanism works, including key processes, 
                participant roles, and important considerations for borrowers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1 order-2 md:order-1">
                <div className={`
                  bg-black/60 rounded-xl p-5 border border-cyan-800/30 sticky top-28
                  ${animateIn ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
                  transition-all duration-500 ease-out delay-[200ms]
                `}>
                  <h3 className="text-lg font-semibold text-cyan-300 flex items-center gap-2 mb-4">
                    <FileText className="h-5 w-5" />
                    Quick Reference
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded bg-cyan-900/20 border border-cyan-800/30 hover:bg-cyan-900/30 transition-colors">
                      <div className="font-semibold text-cyan-200 mb-1">Common Use Cases</div>
                      <div className="text-gray-300">When and why businesses typically use this facility</div>
                    </div>
                    <div className="p-3 rounded bg-cyan-900/20 border border-cyan-800/30 hover:bg-cyan-900/30 transition-colors">
                      <div className="font-semibold text-cyan-200 mb-1">Key Participants</div>
                      <div className="text-gray-300">The parties involved in structuring and managing the facility</div>
                    </div>
                    <div className="p-3 rounded bg-cyan-900/20 border border-cyan-800/30 hover:bg-cyan-900/30 transition-colors">
                      <div className="font-semibold text-cyan-200 mb-1">Documentation</div>
                      <div className="text-gray-300">Essential paperwork and agreements</div>
                    </div>
                    <div className="p-3 rounded bg-cyan-900/20 border border-cyan-800/30 hover:bg-cyan-900/30 transition-colors">
                      <div className="font-semibold text-cyan-200 mb-1">Timeline</div>
                      <div className="text-gray-300">Typical process duration from application to funding</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-3 order-1 md:order-2">
                <div className="bg-black/60 rounded-xl border border-cyan-800/30 overflow-hidden">
                  <ScrollArea className="h-[65vh] md:h-auto md:max-h-[75vh]">
                    <div className="p-6 md:p-8">
                      {renderMechanicsContent()}
                      
                      <div className="mt-12 mb-6 pt-6 border-t border-cyan-900/30 flex justify-end">
                        <div className="flex items-center text-xs text-cyan-500/60">
                          <Code className="h-3 w-3 mr-1" />
                          <span>Facility mechanics documentation</span>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FacilityMechanics;
