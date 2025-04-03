import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Book, 
  CheckCircle2, 
  Code, 
  Database, 
  FileText, 
  Info, 
  Settings, 
  Target, 
  Zap,
  ChevronDown,
  AlertTriangle,
  Lightbulb,
  Shield,
  TrendingUp,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Import facility mechanics data from FacilityDetailsDialog with improved step-by-step guidance
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

// Add additional detailed content about each facility type
const additionalContent: Record<string, {
  keyBenefits: string[];
  keyRisks: string[];
  typicalStructure: string;
  documentationRequired: string[];
  bestPractices: string[];
  comparisonWithOtherProducts: string;
  marketTrends: string;
  legalConsiderations: string;
}> = {
  "term-loan": {
    keyBenefits: [
      "Predictable payment schedule for easier budgeting",
      "Fixed interest rates protect against market fluctuations",
      "Longer repayment periods reduce monthly payment burden",
      "One-time funding process with no need to reapply",
      "Lower interest rates compared to short-term financing options"
    ],
    keyRisks: [
      "Fixed repayment obligation regardless of business performance",
      "Collateral requirements place business assets at risk",
      "Prepayment penalties may make early repayment costly",
      "Covenant violations can trigger default events",
      "Inflexible structure if business needs change"
    ],
    typicalStructure: "Term loans typically feature a fixed principal amount with set repayment periods ranging from 1-10 years for working capital and up to 25 years for real estate. Repayment follows an amortization schedule with equal periodic payments combining principal and interest. The interest may be fixed (unchanging) or variable (tied to a reference rate like SOFR or Prime Rate plus a margin).",
    documentationRequired: [
      "Business financial statements (2-3 years)",
      "Personal financial statements for guarantors",
      "Business tax returns (2-3 years)",
      "Personal tax returns for owners (2-3 years)",
      "Business plan for newer businesses",
      "Collateral documentation and appraisals",
      "Accounts receivable and payable aging reports",
      "Legal documentation (articles of incorporation, business licenses)"
    ],
    bestPractices: [
      "Negotiate terms beyond just the interest rate (fees, prepayment, covenants)",
      "Maintain adequate debt service coverage ratio (typically 1.25x or higher)",
      "Establish a relationship with the lender before urgent capital needs",
      "Consider potential future capital needs before accepting restrictive covenants",
      "Review amortization schedule to understand interest-to-principal payment proportions"
    ],
    comparisonWithOtherProducts: "Term loans offer lower interest rates than credit cards or short-term loans but require more documentation and longer approval processes. They provide larger funding amounts than lines of credit but with less flexibility. Unlike equity financing, term loans don't dilute ownership but create fixed payment obligations regardless of business performance.",
    marketTrends: "Recent term loan market trends include the shift from LIBOR to SOFR as the reference rate for variable loans, increased focus on ESG (Environmental, Social, Governance) factors in underwriting, growing competition from fintech lenders offering streamlined application processes, and the emergence of revenue-based financing as an alternative structure for growth-stage businesses.",
    legalConsiderations: "Term loan agreements typically include representations and warranties, affirmative and negative covenants, events of default, and remedies. Key legal considerations include personal guarantee requirements, cross-default provisions with other debt obligations, material adverse change clauses, and collateral perfection requirements under the Uniform Commercial Code."
  },
  "revolving-credit": {
    keyBenefits: [
      "Flexibility to draw funds as needed and repay on your schedule",
      "Interest paid only on borrowed amounts",
      "Ability to re-borrow without reapplying after repayment",
      "Ideal for managing seasonal cash flow fluctuations",
      "Can function as emergency liquidity backup"
    ],
    keyRisks: [
      "Higher interest rates compared to term loans",
      "Commitment fees on unused portions",
      "Potential for overreliance leading to debt spiral",
      "Variable rates create uncertainty in interest expense",
      "Annual renewal requirements with potential for non-renewal"
    ],
    typicalStructure: "Revolving credit facilities establish a maximum borrowing limit with the ability to draw, repay, and reborrow during a commitment period (typically 1-5 years). Borrowers pay interest only on outstanding balances, usually at a variable rate tied to a reference rate plus a margin. Many facilities include commitment fees on unused portions (typically 0.25-0.50% annually) and may have cleanup provisions requiring zero balance periods.",
    documentationRequired: [
      "Business financial statements (2-3 years)",
      "Personal financial statements of guarantors",
      "Accounts receivable aging reports",
      "Inventory listings (for asset-based facilities)",
      "Accounts payable aging",
      "Cash flow projections",
      "Borrowing base certificates (for ongoing monitoring)",
      "Business debt schedule"
    ],
    bestPractices: [
      "Establish clear policies for when to draw on the facility",
      "Monitor covenant compliance continuously",
      "Implement cash flow forecasting to plan draws and repayments",
      "Consider seasonality when negotiating terms",
      "Review borrowing base calculation methodology carefully"
    ],
    comparisonWithOtherProducts: "Revolving credit offers greater flexibility than term loans but typically at higher interest rates. Unlike merchant cash advances, revolving credit provides consistent access to capital without tying repayment to daily sales. Working capital requirements that fluctuate seasonally are better suited for revolving facilities than fixed-term products.",
    marketTrends: "Market trends in revolving credit include the growth of tech-enabled monitoring systems that allow for real-time borrowing base updates, increased use of financial technology to streamline ongoing compliance, and the emergence of hybrid products combining revolving credit with term loan features for phased financing strategies.",
    legalConsiderations: "Key legal aspects include borrowing base definitions and eligible collateral specifications, material adverse change clauses that could restrict access to funds, financial covenant calculations and reporting requirements, and default triggers related to cross-defaults with other debt instruments."
  },
  "equipment-financing": {
    keyBenefits: [
      "Equipment serves as built-in collateral, often requiring no additional security",
      "Preserves working capital for other business needs",
      "Potential tax benefits through depreciation and interest deductions",
      "Fixed payment schedules align with equipment useful life",
      "Higher approval rates than unsecured financing"
    ],
    keyRisks: [
      "Obligation continues even if equipment becomes obsolete",
      "Potential for negative equity if equipment depreciates faster than loan amortization",
      "Restricted flexibility for equipment upgrades or replacements",
      "Equipment maintenance requirements in lending agreements",
      "Potential balloon payments at term end for some structures"
    ],
    typicalStructure: "Equipment financing typically follows either a loan structure (where the business owns the equipment and uses it as collateral) or a lease structure (where the lender owns the equipment and the business makes lease payments with an option to purchase at term end). Financing terms usually align with the equipment's useful life, typically 3-7 years for technology and vehicles, and up to 10+ years for heavy machinery or specialized equipment.",
    documentationRequired: [
      "Equipment quotes or invoices with specifications",
      "Business financial statements",
      "Equipment appraisals (for used equipment)",
      "Business tax returns",
      "Equipment maintenance records (for used equipment)",
      "Equipment utilization projections",
      "Insurance documentation",
      "Vendor information"
    ],
    bestPractices: [
      "Evaluate total cost of ownership beyond financing costs",
      "Compare equipment loan vs. lease options based on accounting and tax implications",
      "Negotiate end-of-term options in lease agreements",
      "Consider equipment obsolescence timelines when structuring term length",
      "Analyze cash flow impact of ownership costs (maintenance, insurance)"
    ],
    comparisonWithOtherProducts: "Equipment financing offers advantages over general-purpose loans through higher loan-to-value ratios (often 80-100% vs. 70-80%), faster approval processes due to built-in collateral, and potentially lower interest rates. Unlike working capital loans, equipment financing is designed specifically for asset acquisition with terms matching asset useful life.",
    marketTrends: "The equipment financing market is evolving with embedded financing options directly from equipment manufacturers, increased focus on sustainability with preferential terms for energy-efficient equipment, digital application and approval processes, and the growth of secondary market platforms for used equipment remarketing.",
    legalConsiderations: "Equipment financing agreements typically include specific provisions about equipment use restrictions, maintenance requirements, insurance obligations, default remedies (including equipment repossession rights), and title transfer conditions. For lease structures, the distinction between true leases and disguised security agreements has important accounting and legal implications."
  },
  "sba-loans": {
    keyBenefits: [
      "Lower down payment requirements than conventional loans",
      "Longer repayment terms reducing monthly payment burden",
      "Competitive interest rates due to government guarantee",
      "Multiple programs tailored to different business needs",
      "Available to businesses that might not qualify for conventional financing"
    ],
    keyRisks: [
      "Extensive paperwork and longer application process",
      "SBA guarantee fees increase overall cost",
      "Personal guarantee requirements for all owners (20%+ ownership)",
      "Use of proceeds restrictions",
      "Potential prepayment penalties for early repayment"
    ],
    typicalStructure: "SBA loans are offered through several distinct programs. The 7(a) program is the most versatile, providing up to $5 million for working capital, equipment, or real estate with terms up to 10 years (working capital) or 25 years (real estate). The CDC/504 program provides long-term fixed-rate financing for major assets with a typical structure of 10% borrower down payment, 40% CDC second mortgage with SBA guarantee, and 50% conventional first mortgage.",
    documentationRequired: [
      "SBA-specific forms (including Form 1919, 413, etc.)",
      "Business financial statements and projections",
      "Business and personal tax returns (3 years)",
      "Business plan and history",
      "Personal financial statements for all 20%+ owners",
      "Real estate appraisals (for real estate transactions)",
      "Entity documentation (articles, bylaws, operating agreements)",
      "Detailed project cost documentation"
    ],
    bestPractices: [
      "Work with an experienced SBA Preferred Lender",
      "Prepare comprehensive documentation before applying",
      "Understand specific eligibility requirements for each SBA program",
      "Address potential eligibility issues proactively",
      "Maintain adequate equity investment in the business"
    ],
    comparisonWithOtherProducts: "SBA loans offer significantly longer terms than conventional bank loans (up to 25 years vs typical 5-10 years), lower down payments (10% vs 20-30%), and are available to businesses with less established credit histories. However, they involve more paperwork, longer processing times, and additional fees compared to conventional financing.",
    marketTrends: "Recent developments in SBA lending include specialized programs for small businesses in underserved markets, increased lending limits, streamlined application processes for smaller loan amounts, and temporary pandemic-related enhancements such as fee waivers and higher guarantee percentages.",
    legalConsiderations: "SBA loans have specific eligibility requirements regarding business size, ownership structure, and use of proceeds. They also involve unique legal considerations like the SBA's \"credit elsewhere\" test, requiring certification that the business cannot obtain credit on reasonable terms from non-federal sources, affiliation rules determining whether related businesses must be considered together for size standards, and personal guarantee requirements that cannot be circumvented."
  },
  "commercial-mortgage": {
    keyBenefits: [
      "Property appreciation builds equity while debt is repaid",
      "Stabilized occupancy costs compared to leasing escalations",
      "Tax benefits through interest deductions and depreciation",
      "Opportunity for property improvements that increase value",
      "Potential for additional equity extraction through refinancing"
    ],
    keyRisks: [
      "Substantial down payment requirements (typically 20-35%)",
      "Property value fluctuations affect equity position",
      "Balloon payment risk at maturity if refinancing unavailable",
      "Property maintenance and management responsibilities",
      "Reduced operational flexibility compared to leasing"
    ],
    typicalStructure: "Commercial mortgages typically feature 5-10 year terms with 15-30 year amortization schedules, creating a balloon payment at maturity. Loan-to-value ratios generally range from 65-80% depending on property type, with higher ratios for multifamily and lower for special-purpose properties. Interest rates may be fixed or adjustable, with spreads above treasury rates determined by property type, loan size, and borrower strength.",
    documentationRequired: [
      "Property appraisal and condition assessment",
      "Environmental reports (Phase I required, Phase II if issues identified)",
      "Rent rolls and lease abstracts for income properties",
      "Historical operating statements for the property",
      "Pro forma financial projections",
      "Entity documentation for borrowing entity",
      "Personal and business financial statements",
      "Property insurance documentation"
    ],
    bestPractices: [
      "Conduct thorough property due diligence before application",
      "Structure borrowing entity appropriately for liability protection",
      "Understand prepayment flexibility and restrictions",
      "Plan for capital expenditure requirements throughout ownership",
      "Consider interest rate risk mitigation strategies"
    ],
    comparisonWithOtherProducts: "Commercial mortgages offer longer terms and lower rates than construction loans but less flexibility than bridge financing. Compared to SBA 504 loans, conventional commercial mortgages typically require larger down payments but involve simpler closing processes. Unlike residential mortgages, commercial loans are primarily underwritten based on property income potential rather than borrower income.",
    marketTrends: "The commercial mortgage market has seen increased competition from debt funds and insurance companies alongside traditional bank lenders, growing focus on ESG performance in property valuation and underwriting, regional variations in underwriting standards based on market conditions, and concern about refinancing risk for properties facing post-pandemic occupancy challenges.",
    legalConsiderations: "Commercial mortgage documentation includes property-specific provisions like assignment of leases and rents, tenant subordination requirements, environmental indemnifications, and complex default provisions. Recourse vs. non-recourse structures have significant implications for borrower liability, with carve-out guarantees for specific \"bad acts\" being a common compromise position."
  },
  "venture-debt": {
    keyBenefits: [
      "Less dilutive than additional equity rounds",
      "Extends runway between equity financing events",
      "No board seats or control provisions typically required",
      "Faster closing process than equity rounds",
      "Signals confidence to future equity investors"
    ],
    keyRisks: [
      "Creates fixed repayment obligation for pre-profit companies",
      "Potential misalignment with company growth trajectory",
      "Covenant violations can trigger default",
      "Warrant coverage creates some dilution",
      "May restrict strategic flexibility"
    ],
    typicalStructure: "Venture debt typically consists of a term loan component (usually 3-4 year term with 6-12 month interest-only period) combined with warrant coverage giving the lender right to purchase equity (typically 5-20% of loan value). Loan sizes generally range from 25-50% of the most recent equity round. Interest rates are higher than conventional debt (often Prime + 4-9%) to compensate for the additional risk of lending to pre-profit companies.",
    documentationRequired: [
      "Capitalization table",
      "Recent equity financing documentation",
      "Financial statements and projections",
      "Investor presentations",
      "Customer metrics and growth data",
      "Cash burn analysis and runway projections",
      "Key contracts and intellectual property documentation",
      "Corporate governance documents"
    ],
    bestPractices: [
      "Time venture debt raising shortly after equity round when valuation is established",
      "Maintain open communication with equity investors about debt plans",
      "Model debt service impact on cash flow under various growth scenarios",
      "Negotiate covenant structure aligned with business model realities",
      "Understand acceleration provisions and cross-default triggers"
    ],
    comparisonWithOtherProducts: "Venture debt costs more than traditional bank financing (10-15% effective rate vs 6-8%) but provides capital to companies that wouldn't qualify for conventional loans. Unlike equity, it creates repayment obligations, but with less dilution and control provisions. Venture debt complements rather than replaces equity financing, typically providing 3-9 months of additional runway.",
    marketTrends: "The venture debt market has expanded significantly with specialized venture debt funds competing alongside banks, increasing loan sizes relative to equity rounds, expansion into earlier-stage companies than traditionally served, growing focus on specific sectors (SaaS, life sciences), and development of hybrid instruments combining debt and equity features.",
    legalConsiderations: "Venture debt agreements include specialized provisions like investor rights agreements, warrant coverage terms and anti-dilution protections, material adverse change definitions tailored to growth-stage companies, intellectual property-focused collateral arrangements, and coordination with existing equity investors through subordination or intercreditor agreements."
  },
  "invoice-financing": {
    keyBenefits: [
      "Immediate conversion of accounts receivable to cash",
      "Financing based on customer creditworthiness rather than borrower's",
      "Scales with business growth automatically",
      "No fixed repayment schedule or long-term commitment",
      "Available to businesses with limited credit history"
    ],
    keyRisks: [
      "Higher effective cost compared to traditional loans",
      "Potential customer relationship impact with factoring",
      "Concentration risk if heavily dependent on few customers",
      "Complex accounting treatment",
      "Recourse provisions create contingent liability"
    ],
    typicalStructure: "Invoice financing comes in two primary forms. Factoring involves selling invoices to a third party (factor) who advances 70-90% upfront, collects from customers, and remits the balance minus fees (typically 1-5% of invoice value). Invoice discounting creates a borrowing arrangement using invoices as collateral, with the business maintaining customer relationships and typically receiving 80-90% of invoice value upfront with the balance (minus fees) upon collection.",
    documentationRequired: [
      "Accounts receivable aging reports",
      "Customer credit information",
      "Sample invoices and historical payment data",
      "Business financial statements",
      "Customer concentration analysis",
      "Sales contracts and terms",
      "Dispute history documentation",
      "Key customer contact information"
    ],
    bestPractices: [
      "Disclose financing arrangements appropriately to customers",
      "Implement strong credit policies to minimize disputes",
      "Understand recourse vs. non-recourse provisions",
      "Calculate true effective cost including all fees",
      "Maintain diversified customer base to minimize concentration risk"
    ],
    comparisonWithOtherProducts: "Invoice financing provides more immediate access to cash than traditional loans but at higher cost. Unlike lines of credit, it scales automatically with sales growth without requiring new applications. It's particularly advantageous for businesses with long payment cycles or rapid growth that create working capital gaps conventional financing can't efficiently address.",
    marketTrends: "The invoice financing market has evolved with technology-enabled platforms offering faster funding decisions, selective invoice financing allowing businesses to choose specific invoices to finance rather than entire portfolios, integration with accounting software for streamlined processing, and emergence of supply chain financing as a related solution.",
    legalConsiderations: "Invoice financing involves unique legal considerations including notification vs. non-notification arrangements with customers, UCC financing statement filings to perfect security interests in receivables, verification procedures to confirm invoice validity, and legal provisions addressing disputed invoices and credit memo handling."
  },
  "merchant-cash-advance": {
    keyBenefits: [
      "Fast approval and funding (often 24-48 hours)",
      "Minimal documentation requirements",
      "No fixed payment schedule - payments scale with sales",
      "Available to businesses with challenged credit histories",
      "No collateral requirements beyond future sales"
    ],
    keyRisks: [
      "Extremely high effective cost (often 40-150% APR equivalent)",
      "Daily payment withdrawals impact cash flow",
      "Fixed repayment amount regardless of profit margins",
      "Potential debt spiral from stacking multiple advances",
      "Limited regulatory protections as a commercial product"
    ],
    typicalStructure: "Merchant cash advances provide upfront capital in exchange for a fixed percentage of future sales until a specified repayment amount is reached. The advance provider collects repayment through daily or weekly withdrawals, either by splitting credit card processing (split funding) or through ACH withdrawals from a business bank account. The key pricing component is the factor rate (typically 1.1-1.5), which multiplied by the advance amount determines the total repayment obligation.",
    documentationRequired: [
      "Credit card processing statements (4-6 months)",
      "Bank statements (4-6 months)",
      "Basic business identification documentation",
      "Credit card processing agreement",
      "Voided business check for ACH setup",
      "Minimal tax information",
      "Brief business history summary",
      "Personal identification"
    ],
    bestPractices: [
      "Calculate effective APR to understand true cost",
      "Avoid stacking multiple MCAs simultaneously",
      "Project cash flow impact of daily withdrawals",
      "Explore alternative financing options first",
      "Limit advance size relative to monthly revenue (ideally <10%)"
    ],
    comparisonWithOtherProducts: "MCAs provide faster access to capital than any traditional financing but at substantially higher cost. Unlike loans, they create no fixed debt obligation on the balance sheet and offer flexible repayment tied to sales performance. They're most appropriate as a short-term bridge when no alternatives exist, rather than as a recurring financing strategy.",
    marketTrends: "The MCA market has seen increased regulatory scrutiny in several states, development of hybrid products offering more transparent terms and lower costs, integration with point-of-sale systems for real-time performance monitoring, and growing specialization by industry vertical with customized underwriting models.",
    legalConsiderations: "MCAs are structured as commercial transactions rather than loans to avoid usury laws, though this distinction faces growing legal challenges. Key legal considerations include contract enforceability across state lines, confession of judgment provisions in some agreements allowing providers to obtain judgments without court proceedings, and emerging state-level disclosure requirements aimed at increasing transparency."
  }
};

// Create detail pages for each quick reference section
const detailSectionContents = {
  useCases: {
    "term-loan": {
      title: "Term Loan Use Cases",
      cases: [
        {
          title: "Business Expansion",
          description: "Funding physical expansion of facilities, opening new locations, or entering new markets."
        },
        {
          title: "Equipment Purchases",
          description: "Acquiring expensive equipment with a long useful life when equipment-specific financing isn't preferred."
        },
        {
          title: "Debt Consolidation",
          description: "Refinancing multiple high-interest debts into a single, lower-interest loan."
        },
        {
          title: "Large Inventory Purchases",
