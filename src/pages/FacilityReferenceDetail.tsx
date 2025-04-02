
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Book,
  CheckCircle2,
  FileText,
  Info,
  Clock,
  Users,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// Map facility titles
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

// Use cases data for each facility type
const useCasesData: Record<string, { title: string, cases: { title: string, description: string }[] }> = {
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
        description: "Making bulk purchases that exceed working capital capacity but offer significant cost savings."
      },
      {
        title: "Business Acquisition",
        description: "Funding the purchase of an existing business or buying out a partner."
      }
    ]
  },
  "revolving-credit": {
    title: "Revolving Credit Use Cases",
    cases: [
      {
        title: "Seasonal Working Capital",
        description: "Managing cash flow during seasonal fluctuations in revenue and expenses."
      },
      {
        title: "Inventory Management",
        description: "Funding inventory purchases with planned short-term liquidation."
      },
      {
        title: "Emergency Liquidity",
        description: "Providing a safety net for unexpected expenses or opportunities."
      },
      {
        title: "Accounts Receivable Gaps",
        description: "Bridging the timing gap between delivering services/products and receiving customer payments."
      },
      {
        title: "Project Funding",
        description: "Supporting short-term projects with defined completion dates and payment expectations."
      }
    ]
  },
  "equipment-financing": {
    title: "Equipment Financing Use Cases",
    cases: [
      {
        title: "Manufacturing Equipment",
        description: "Acquiring specialized manufacturing equipment that directly generates revenue."
      },
      {
        title: "Technology Infrastructure",
        description: "Implementing substantial technology upgrades without depleting cash reserves."
      },
      {
        title: "Vehicles & Fleet",
        description: "Purchasing company vehicles, trucks, or delivery fleet with the equipment as built-in collateral."
      },
      {
        title: "Medical Equipment",
        description: "Acquiring expensive medical devices and diagnostic equipment for healthcare practices."
      },
      {
        title: "Construction Equipment",
        description: "Obtaining heavy machinery for construction projects while preserving working capital."
      }
    ]
  },
  "sba-loans": {
    title: "SBA Loan Use Cases",
    cases: [
      {
        title: "Startup Funding",
        description: "Providing capital for new businesses with limited operating history that traditional lenders might reject."
      },
      {
        title: "Real Estate Purchase",
        description: "Acquiring commercial real estate with lower down payments than conventional mortgages."
      },
      {
        title: "Business Acquisition",
        description: "Purchasing an existing business with favorable terms and lower equity requirements."
      },
      {
        title: "Expansion Projects",
        description: "Funding significant business growth projects for small businesses with limited access to capital markets."
      },
      {
        title: "Disaster Recovery",
        description: "Rebuilding after natural disasters or economic emergencies through specialized SBA programs."
      }
    ]
  },
  "commercial-mortgage": {
    title: "Commercial Mortgage Use Cases",
    cases: [
      {
        title: "Owner-Occupied Buildings",
        description: "Purchasing office buildings, warehouses, or retail spaces where the business will operate."
      },
      {
        title: "Investment Properties",
        description: "Acquiring properties intended to generate rental income from third-party tenants."
      },
      {
        title: "Mixed-Use Development",
        description: "Financing properties with both commercial and residential components."
      },
      {
        title: "Property Renovation",
        description: "Funding substantial improvements to existing commercial properties to increase value or utility."
      },
      {
        title: "Refinancing",
        description: "Replacing existing property financing to improve terms, lower payments, or extract equity."
      }
    ]
  },
  "venture-debt": {
    title: "Venture Debt Use Cases",
    cases: [
      {
        title: "Runway Extension",
        description: "Extending cash runway between equity rounds without additional dilution."
      },
      {
        title: "Growth Acceleration",
        description: "Funding customer acquisition or market expansion with metrics that don't yet support equity valuation targets."
      },
      {
        title: "Equipment Financing",
        description: "Acquiring specialized equipment for technology companies with rapid growth but negative cash flow."
      },
      {
        title: "Bridge Financing",
        description: "Providing interim capital when equity rounds take longer than anticipated."
      },
      {
        title: "Strategic Acquisitions",
        description: "Funding opportunistic acquisitions without disrupting planned equity round timing."
      }
    ]
  },
  "invoice-financing": {
    title: "Invoice Financing Use Cases",
    cases: [
      {
        title: "Long Payment Cycles",
        description: "Managing cash flow when customers have extended payment terms (net-60, net-90)."
      },
      {
        title: "Rapid Growth",
        description: "Supporting accelerating sales that create working capital constraints despite profitability."
      },
      {
        title: "Seasonal Business",
        description: "Smoothing cash flow during seasonal peaks when delivering many orders but awaiting payment."
      },
      {
        title: "Large Projects",
        description: "Funding ongoing operations during large projects with milestone-based payments."
      },
      {
        title: "Customer Concentration",
        description: "Managing risk when significant revenue comes from a few large customers with substantial invoices."
      }
    ]
  },
  "merchant-cash-advance": {
    title: "Merchant Cash Advance Use Cases",
    cases: [
      {
        title: "Immediate Cash Needs",
        description: "Addressing urgent needs when approval speed outweighs cost considerations."
      },
      {
        title: "Credit Challenged Business",
        description: "Accessing funding when poor credit history prevents traditional financing approval."
      },
      {
        title: "Seasonal Opportunities",
        description: "Capitalizing on time-sensitive inventory deals or seasonal revenue opportunities."
      },
      {
        title: "Emergency Repairs",
        description: "Funding critical equipment repairs or replacements that directly impact revenue generation."
      },
      {
        title: "Bridge Funding",
        description: "Short-term funding until more favorable financing can be arranged."
      }
    ]
  }
};

// Participants data
const participantsData: Record<string, { title: string, participants: { role: string, description: string }[] }> = {
  "term-loan": {
    title: "Term Loan Key Participants",
    participants: [
      {
        role: "Lender (Bank/Financial Institution)",
        description: "Provides the loan capital, establishes terms, monitors compliance, and collects repayments."
      },
      {
        role: "Borrower",
        description: "The business entity receiving funds and responsible for repayment according to terms."
      },
      {
        role: "Guarantor",
        description: "Individual(s) or entities that pledge personal assets or guarantees to secure the loan."
      },
      {
        role: "Loan Officer",
        description: "Bank representative who serves as primary point of contact and manages the relationship."
      },
      {
        role: "Credit Committee",
        description: "Group responsible for final loan approval based on risk assessment criteria."
      }
    ]
  },
  "revolving-credit": {
    title: "Revolving Credit Key Participants",
    participants: [
      {
        role: "Credit Facility Provider",
        description: "Financial institution that establishes the credit line and manages the ongoing facility."
      },
      {
        role: "Borrower",
        description: "Business that draws on the facility as needed and makes repayments according to terms."
      },
      {
        role: "Relationship Manager",
        description: "Banker who oversees the credit relationship and facility administration."
      },
      {
        role: "Treasury Management",
        description: "Team that handles the mechanics of draws, payments, and monitoring available credit."
      },
      {
        role: "Credit Analysts",
        description: "Financial professionals who monitor ongoing compliance with covenants and borrowing base requirements."
      }
    ]
  },
  "equipment-financing": {
    title: "Equipment Financing Key Participants",
    participants: [
      {
        role: "Equipment Lender/Lessor",
        description: "Financial institution specialized in equipment financing that provides the capital."
      },
      {
        role: "Borrower/Lessee",
        description: "Business acquiring the equipment through loan or lease arrangement."
      },
      {
        role: "Equipment Vendor",
        description: "Company selling the equipment, often partnered with lenders for point-of-sale financing."
      },
      {
        role: "Equipment Appraiser",
        description: "Expert who determines equipment value and estimated useful life."
      },
      {
        role: "Insurance Provider",
        description: "Company providing coverage for the financed equipment against damage or loss."
      }
    ]
  },
  "sba-loans": {
    title: "SBA Loan Key Participants",
    participants: [
      {
        role: "Small Business Administration (SBA)",
        description: "Government agency providing guarantees to lenders, establishing program guidelines, and approving eligibility."
      },
      {
        role: "SBA-approved Lender",
        description: "Bank or financial institution authorized to make SBA loans with government guarantees."
      },
      {
        role: "Borrower",
        description: "Small business qualifying under SBA size standards receiving the financing."
      },
      {
        role: "Certified Development Company (CDC)",
        description: "For 504 loans, non-profit organization that works with SBA and lenders on real estate/equipment loans."
      },
      {
        role: "SBA Loan Specialist",
        description: "Expert in SBA programs who assists borrowers through the application process."
      }
    ]
  },
  "commercial-mortgage": {
    title: "Commercial Mortgage Key Participants",
    participants: [
      {
        role: "Commercial Mortgage Lender",
        description: "Bank, credit union, or specialized lender financing commercial real estate purchases."
      },
      {
        role: "Borrower Entity",
        description: "Business or investment entity purchasing the commercial property."
      },
      {
        role: "Commercial Real Estate Broker",
        description: "Professional who connects buyers with suitable properties and facilitates transactions."
      },
      {
        role: "Property Appraiser",
        description: "Expert who determines the current market value of the property."
      },
      {
        role: "Title Company",
        description: "Entity that verifies property ownership and facilitates clean title transfer."
      },
      {
        role: "Environmental Consultant",
        description: "Specialist who assesses property for environmental hazards or contamination."
      }
    ]
  },
  "venture-debt": {
    title: "Venture Debt Key Participants",
    participants: [
      {
        role: "Venture Debt Provider",
        description: "Specialized lender focused on growth-stage, venture-backed companies."
      },
      {
        role: "Venture-backed Company",
        description: "Growth-stage business with equity investment seeking non-dilutive capital."
      },
      {
        role: "Equity Investors",
        description: "VCs or other equity shareholders whose presence lends credibility for debt financing."
      },
      {
        role: "Board of Directors",
        description: "Governing body that approves the debt strategy and terms."
      },
      {
        role: "Company Executives",
        description: "CEO/CFO team that manages the capital and ensures compliance with covenants."
      }
    ]
  },
  "invoice-financing": {
    title: "Invoice Financing Key Participants",
    participants: [
      {
        role: "Factor/Invoice Financier",
        description: "Financial institution that advances funds against receivables."
      },
      {
        role: "Business Client",
        description: "Company selling or leveraging its invoices for immediate cash."
      },
      {
        role: "Account Debtors/Customers",
        description: "Entities with outstanding invoices whose payments repay the financing."
      },
      {
        role: "Collections Department",
        description: "Team responsible for ensuring invoice payment (either at factor or client)."
      },
      {
        role: "Credit Analysts",
        description: "Specialists who evaluate customer creditworthiness and set advance rates."
      }
    ]
  },
  "merchant-cash-advance": {
    title: "Merchant Cash Advance Key Participants",
    participants: [
      {
        role: "MCA Provider",
        description: "Company providing upfront cash in exchange for future sales revenue."
      },
      {
        role: "Merchant",
        description: "Business receiving advance and agreeing to repayment from future sales."
      },
      {
        role: "Payment Processor",
        description: "Credit card processor that often facilitates automatic repayment through split funding."
      },
      {
        role: "MCA Broker",
        description: "Intermediary connecting merchants with MCA providers for a commission."
      },
      {
        role: "Underwriter",
        description: "Specialist who evaluates merchant's sales history and stability for approval."
      }
    ]
  }
};

// Documentation data
const documentationData: Record<string, { title: string, documents: { name: string, purpose: string }[] }> = {
  "term-loan": {
    title: "Term Loan Documentation",
    documents: [
      {
        name: "Loan Application",
        purpose: "Initial request for financing with basic business and project information."
      },
      {
        name: "Business Financial Statements",
        purpose: "Balance sheet, income statement, and cash flow statement for 2-3 years."
      },
      {
        name: "Personal Financial Statements",
        purpose: "Financial information for all guarantors and major owners."
      },
      {
        name: "Business Plan",
        purpose: "Detailed plan showing how loan funds will be used and repaid."
      },
      {
        name: "Tax Returns",
        purpose: "Business and personal tax returns for 2-3 years."
      },
      {
        name: "Loan Agreement",
        purpose: "Formal contract outlining all terms, conditions, covenants, and repayment obligations."
      },
      {
        name: "Promissory Note",
        purpose: "Legal document establishing debt obligation and repayment terms."
      },
      {
        name: "Security Agreement",
        purpose: "Document creating lender's security interest in collateral."
      },
      {
        name: "Personal Guarantee",
        purpose: "Agreement making business owners personally liable for the debt."
      }
    ]
  },
  "revolving-credit": {
    title: "Revolving Credit Documentation",
    documents: [
      {
        name: "Credit Facility Application",
        purpose: "Initial request for revolving credit establishment."
      },
      {
        name: "Financial Statements",
        purpose: "Historical and projected business financial statements."
      },
      {
        name: "Accounts Receivable Aging",
        purpose: "Detailed listing of outstanding customer invoices by age."
      },
      {
        name: "Inventory Reports",
        purpose: "Current inventory listings with values (for asset-based facilities)."
      },
      {
        name: "Credit Agreement",
        purpose: "Contract establishing the facility, terms, conditions, and covenants."
      },
      {
        name: "Borrowing Base Certificate",
        purpose: "Regular report calculating available credit based on eligible collateral."
      },
      {
        name: "Draw Request Forms",
        purpose: "Documentation to request advances against the credit line."
      },
      {
        name: "Security Agreement",
        purpose: "Document establishing lender's interest in collateral assets."
      },
      {
        name: "UCC Financing Statements",
        purpose: "Public notice of lender's security interest in business assets."
      }
    ]
  },
  "equipment-financing": {
    title: "Equipment Financing Documentation",
    documents: [
      {
        name: "Equipment Financing Application",
        purpose: "Initial request for equipment-specific funding."
      },
      {
        name: "Equipment Quote/Invoice",
        purpose: "Detailed listing of equipment being financed with vendor pricing."
      },
      {
        name: "Equipment Specifications",
        purpose: "Technical details, model numbers, and capabilities of equipment."
      },
      {
        name: "Business Financial Statements",
        purpose: "Financial documentation showing ability to support payments."
      },
      {
        name: "Equipment Purpose Statement",
        purpose: "Description of how equipment will be used and generate revenue."
      },
      {
        name: "Master Lease/Loan Agreement",
        purpose: "Primary contract establishing the financing relationship."
      },
      {
        name: "Equipment Schedule",
        purpose: "Detailed listing of all equipment covered by the agreement."
      },
      {
        name: "Certificate of Acceptance",
        purpose: "Document confirming equipment delivery and acceptance."
      },
      {
        name: "Insurance Documentation",
        purpose: "Proof of coverage protecting the equipment."
      },
      {
        name: "UCC Filing",
        purpose: "Public record of lender's security interest in the equipment."
      }
    ]
  },
  "sba-loans": {
    title: "SBA Loan Documentation",
    documents: [
      {
        name: "SBA Form 1919",
        purpose: "Borrower Information Form with ownership and eligibility details."
      },
      {
        name: "SBA Form 413",
        purpose: "Personal Financial Statement for all owners with 20%+ ownership."
      },
      {
        name: "Business Plan",
        purpose: "Comprehensive plan including projections and loan use details."
      },
      {
        name: "Business Financial Statements",
        purpose: "3 years of financial statements plus interim statements."
      },
      {
        name: "Business Debt Schedule",
        purpose: "Detailed listing of all existing business obligations."
      },
      {
        name: "Business and Personal Tax Returns",
        purpose: "3 years of returns for both business and owners."
      },
      {
        name: "Entity Documentation",
        purpose: "Articles, operating agreements, bylaws, and ownership verification."
      },
      {
        name: "Collateral Documentation",
        purpose: "Details and valuation of assets securing the loan."
      },
      {
        name: "SBA Authorization",
        purpose: "Official SBA approval document with all loan terms and conditions."
      },
      {
        name: "SBA Note and Guarantee Agreements",
        purpose: "Legal documents establishing the debt obligation and guarantees."
      }
    ]
  },
  "commercial-mortgage": {
    title: "Commercial Mortgage Documentation",
    documents: [
      {
        name: "Commercial Mortgage Application",
        purpose: "Initial request for property financing with basic details."
      },
      {
        name: "Property Information Package",
        purpose: "Comprehensive details about the property being financed."
      },
      {
        name: "Property Appraisal",
        purpose: "Professional assessment of property's market value."
      },
      {
        name: "Environmental Reports",
        purpose: "Phase I and possibly Phase II environmental assessments."
      },
      {
        name: "Property Condition Assessment",
        purpose: "Report on building condition, systems, and needed repairs."
      },
      {
        name: "Financial Statements",
        purpose: "Business and property financial histories and projections."
      },
      {
        name: "Rent Rolls",
        purpose: "For income properties, listing of all tenants, leases, and rents."
      },
      {
        name: "Commercial Mortgage Note",
        purpose: "Legal document establishing debt repayment obligation."
      },
      {
        name: "Mortgage/Deed of Trust",
        purpose: "Document creating lender's security interest in the property."
      },
      {
        name: "Title Insurance Policy",
        purpose: "Insurance protecting lender against title defects."
      },
      {
        name: "Assignment of Leases and Rents",
        purpose: "Agreement giving lender rights to rental income upon default."
      }
    ]
  },
  "venture-debt": {
    title: "Venture Debt Documentation",
    documents: [
      {
        name: "Venture Debt Term Sheet",
        purpose: "Preliminary document outlining key financing terms."
      },
      {
        name: "Loan and Security Agreement",
        purpose: "Primary contract establishing the debt obligation and collateral."
      },
      {
        name: "Warrant Agreement",
        purpose: "Document granting lender rights to purchase equity at set terms."
      },
      {
        name: "Capitalization Table",
        purpose: "Listing of all equity holders, ownership percentages, and valuations."
      },
      {
        name: "Financial Statements and Projections",
        purpose: "Historical financials and forward-looking projections."
      },
      {
        name: "Cash Flow Model",
        purpose: "Detailed analysis of runway and debt service capability."
      },
      {
        name: "Board Resolutions",
        purpose: "Official approval from company's board for debt financing."
      },
      {
        name: "Investor Support Letters",
        purpose: "Documentation of existing investor support for the debt financing."
      },
      {
        name: "Intellectual Property Schedule",
        purpose: "Listing of key IP assets often used as collateral."
      },
      {
        name: "Intercreditor Agreement",
        purpose: "Document establishing priorities between different creditors."
      }
    ]
  },
  "invoice-financing": {
    title: "Invoice Financing Documentation",
    documents: [
      {
        name: "Invoice Financing Application",
        purpose: "Initial request for receivables-based financing."
      },
      {
        name: "Master Factoring/Financing Agreement",
        purpose: "Primary contract establishing the financing relationship."
      },
      {
        name: "Accounts Receivable Aging Report",
        purpose: "Detailed listing of all outstanding invoices by age."
      },
      {
        name: "Customer Credit Information",
        purpose: "Data on creditworthiness of key customers."
      },
      {
        name: "Sample Invoices",
        purpose: "Examples of company invoices and terms."
      },
      {
        name: "Assignment of Receivables",
        purpose: "Legal document transferring invoice rights to the financier."
      },
      {
        name: "Schedule of Accounts",
        purpose: "Specific listing of invoices being financed in each batch."
      },
      {
        name: "Customer Notification Letters",
        purpose: "For factoring, notifications to customers about payment redirection."
      },
      {
        name: "UCC Financing Statement",
        purpose: "Public filing establishing lender's security interest in receivables."
      },
      {
        name: "Verification Certificates",
        purpose: "Customer confirmations that invoices are valid and will be paid."
      }
    ]
  },
  "merchant-cash-advance": {
    title: "Merchant Cash Advance Documentation",
    documents: [
      {
        name: "MCA Application",
        purpose: "Basic information request for advance consideration."
      },
      {
        name: "Merchant Agreement",
        purpose: "Contract establishing the advance and repayment terms."
      },
      {
        name: "Processing Statements",
        purpose: "4-6 months of credit card processing statements."
      },
      {
        name: "Bank Statements",
        purpose: "4-6 months of business banking statements."
      },
      {
        name: "Business ID Documentation",
        purpose: "Business license, articles of incorporation, etc."
      },
      {
        name: "ACH Authorization",
        purpose: "Permission for automatic withdrawals from bank account."
      },
      {
        name: "Personal Guarantee",
        purpose: "Owner commitment to repay if business cannot."
      },
      {
        name: "Split Funding Agreement",
        purpose: "Authorization for payment processor to direct portion of sales to MCA provider."
      },
      {
        name: "Voided Business Check",
        purpose: "For setting up ACH withdrawals from correct account."
      },
      {
        name: "Disclosure Statement",
        purpose: "Document showing total payback amount, factor rate, and estimated term."
      }
    ]
  }
};

// Timeline data
const timelineData: Record<string, { title: string, stages: { name: string, duration: string, description: string }[] }> = {
  "term-loan": {
    title: "Term Loan Timeline",
    stages: [
      {
        name: "Initial Consultation",
        duration: "1-3 days",
        description: "Preliminary meeting to discuss needs, options, and basic qualification parameters."
      },
      {
        name: "Application Preparation",
        duration: "1-2 weeks",
        description: "Gathering required documentation and completing formal loan application."
      },
      {
        name: "Underwriting",
        duration: "2-4 weeks",
        description: "Lender review of financial information, credit history, and collateral valuation."
      },
      {
        name: "Loan Approval",
        duration: "1-2 weeks",
        description: "Credit committee decision and issuance of commitment letter with terms."
      },
      {
        name: "Documentation",
        duration: "1-2 weeks",
        description: "Preparation and review of loan agreements and closing documents."
      },
      {
        name: "Closing",
        duration: "1-3 days",
        description: "Signing of final documents and recording of security interests."
      },
      {
        name: "Funding",
        duration: "1-3 days",
        description: "Disbursement of loan proceeds according to agreement terms."
      }
    ]
  },
  "revolving-credit": {
    title: "Revolving Credit Timeline",
    stages: [
      {
        name: "Preliminary Discussion",
        duration: "1-3 days",
        description: "Initial conversation about facility needs and qualification requirements."
      },
      {
        name: "Application and Documentation",
        duration: "1-3 weeks",
        description: "Assembling required financial statements and completing application."
      },
      {
        name: "Collateral Evaluation",
        duration: "1-2 weeks",
        description: "Assessment of accounts receivable, inventory, or other collateral quality."
      },
      {
        name: "Credit Analysis",
        duration: "2-3 weeks",
        description: "Review of business financial health, cash flow, and repayment capacity."
      },
      {
        name: "Facility Approval",
        duration: "1-2 weeks",
        description: "Final credit decision and establishment of facility terms and limits."
      },
      {
        name: "Documentation and Setup",
        duration: "1-2 weeks",
        description: "Preparation of credit agreement and establishment of draw procedures."
      },
      {
        name: "Facility Activation",
        duration: "1-3 days",
        description: "Line becomes available for draws once all documents are executed."
      },
      {
        name: "Initial Draw",
        duration: "1-2 days",
        description: "First utilization of the credit line after activation."
      }
    ]
  },
  "equipment-financing": {
    title: "Equipment Financing Timeline",
    stages: [
      {
        name: "Equipment Selection",
        duration: "Varies by business",
        description: "Identifying specific equipment and obtaining vendor quotes."
      },
      {
        name: "Application Submission",
        duration: "1-2 days",
        description: "Completing simplified equipment financing application with equipment details."
      },
      {
        name: "Credit Review",
        duration: "2-5 days",
        description: "Evaluation of business credit profile and repayment ability."
      },
      {
        name: "Equipment Verification",
        duration: "1-3 days",
        description: "Confirmation of equipment specifications, value, and useful life."
      },
      {
        name: "Approval",
        duration: "1-5 days",
        description: "Financing decision and issuance of term sheet or approval letter."
      },
      {
        name: "Documentation",
        duration: "2-5 days",
        description: "Preparation and execution of lease or loan documents."
      },
      {
        name: "Vendor Payment",
        duration: "1-3 days",
        description: "Direct payment to equipment vendor upon document completion."
      },
      {
        name: "Equipment Delivery",
        duration: "Varies by equipment",
        description: "Delivery and installation of financed equipment."
      },
      {
        name: "Acceptance",
        duration: "1 day",
        description: "Verification that equipment meets specifications and functions properly."
      }
    ]
  },
  "sba-loans": {
    title: "SBA Loan Timeline",
    stages: [
      {
        name: "Lender Selection",
        duration: "1-2 weeks",
        description: "Identifying and engaging with an experienced SBA-approved lender."
      },
      {
        name: "Packaging",
        duration: "3-4 weeks",
        description: "Comprehensive gathering of all required SBA and lender documentation."
      },
      {
        name: "Lender Underwriting",
        duration: "3-4 weeks",
        description: "Bank review of application package and internal approval process."
      },
      {
        name: "SBA Submission",
        duration: "1-2 days",
        description: "Submission of approved application to SBA for review."
      },
      {
        name: "SBA Approval",
        duration: "5-10 business days",
        description: "SBA review and issuance of loan authorization."
      },
      {
        name: "Commitment Letter",
        duration: "3-5 days",
        description: "Formal offer of financing with all terms and conditions."
      },
      {
        name: "Closing Preparation",
        duration: "2-3 weeks",
        description: "Preparation of extensive closing documentation and satisfaction of conditions."
      },
      {
        name: "Closing",
        duration: "1 day",
        description: "Execution of final loan documents."
      },
      {
        name: "Funding",
        duration: "3-7 days",
        description: "Disbursement of loan proceeds according to authorization terms."
      }
    ]
  },
  "commercial-mortgage": {
    title: "Commercial Mortgage Timeline",
    stages: [
      {
        name: "Pre-Qualification",
        duration: "1-2 weeks",
        description: "Initial assessment of borrower and property eligibility."
      },
      {
        name: "Application",
        duration: "1-2 weeks",
        description: "Formal application with preliminary property and business information."
      },
      {
        name: "Term Sheet Issuance",
        duration: "1-2 weeks",
        description: "Preliminary commitment outlining basic loan terms."
      },
      {
        name: "Due Diligence",
        duration: "3-6 weeks",
        description: "Comprehensive property evaluation including appraisal, environmental assessment, and title search."
      },
      {
        name: "Underwriting",
        duration: "2-4 weeks",
        description: "Detailed analysis of property financials and borrower creditworthiness."
      },
      {
        name: "Loan Approval",
        duration: "1-2 weeks",
        description: "Final credit decision and issuance of commitment letter."
      },
      {
        name: "Documentation",
        duration: "2-3 weeks",
        description: "Preparation of loan documents and review by all parties."
      },
      {
        name: "Closing",
        duration: "1 day",
        description: "Execution of documents, recording of mortgage, and fund disbursement."
      }
    ]
  },
  "venture-debt": {
    title: "Venture Debt Timeline",
    stages: [
      {
        name: "Initial Discussion",
        duration: "1-2 weeks",
        description: "Exploratory conversations with potential venture debt providers."
      },
      {
        name: "Term Sheet Negotiation",
        duration: "2-3 weeks",
        description: "Negotiation and agreement on key terms including amount, interest, warrants, and covenants."
      },
      {
        name: "Due Diligence",
        duration: "2-4 weeks",
        description: "Lender review of company financials, metrics, capitalization, and investor base."
      },
      {
        name: "Investor Communication",
        duration: "1-2 weeks",
        description: "Confirmation of existing equity investors' support for venture debt."
      },
      {
        name: "Credit Approval",
        duration: "1-2 weeks",
        description: "Final lender decision based on completed due diligence."
      },
      {
        name: "Documentation",
        duration: "2-3 weeks",
        description: "Preparation and negotiation of loan and warrant agreements."
      },
      {
        name: "Closing",
        duration: "1 day",
        description: "Execution of final documents."
      },
      {
        name: "Initial Funding",
        duration: "1-3 days",
        description: "First tranche disbursement (if multiple tranches are structured)."
      }
    ]
  },
  "invoice-financing": {
    title: "Invoice Financing Timeline",
    stages: [
      {
        name: "Initial Application",
        duration: "1-2 days",
        description: "Submission of basic company information and receivables data."
      },
      {
        name: "Customer Credit Review",
        duration: "2-5 days",
        description: "Assessment of invoice customers' creditworthiness and payment history."
      },
      {
        name: "Facility Setup Approval",
        duration: "3-7 days",
        description: "Approval decision and establishment of advance rates and fees."
      },
      {
        name: "Documentation",
        duration: "2-5 days",
        description: "Preparation and execution of factoring or financing agreements."
      },
      {
        name: "Account Setup",
        duration: "1-3 days",
        description: "Establishment of systems for invoice submission and payment tracking."
      },
      {
        name: "Initial Invoice Submission",
        duration: "1 day",
        description: "First batch of invoices submitted for financing."
      },
      {
        name: "Verification",
        duration: "1-3 days",
        description: "Confirmation that submitted invoices are valid and eligible."
      },
      {
        name: "Initial Funding",
        duration: "1-2 days",
        description: "First advance payment based on approved invoices."
      }
    ]
  },
  "merchant-cash-advance": {
    title: "Merchant Cash Advance Timeline",
    stages: [
      {
        name: "Application",
        duration: "10-15 minutes",
        description: "Simplified online or paper application with basic business information."
      },
      {
        name: "Document Submission",
        duration: "1 day",
        description: "Providing processing statements, bank statements, and business ID."
      },
      {
        name: "Underwriting",
        duration: "1-2 days",
        description: "Review of credit card processing volume, bank balance stability, and business tenure."
      },
      {
        name: "Approval Decision",
        duration: "Same day to 1 day",
        description: "Determination of advance amount, factor rate, and holdback percentage."
      },
      {
        name: "Agreement Signing",
        duration: "Same day",
        description: "Electronic or physical execution of merchant agreement."
      },
      {
        name: "ACH or Split Setup",
        duration: "1 day",
        description: "Configuration of payment processor for automatic repayments."
      },
      {
        name: "Funding",
        duration: "1-2 business days",
        description: "Transfer of lump sum advance to merchant's bank account."
      },
      {
        name: "First Withdrawal",
        duration: "Next business day after funding",
        description: "Initial repayment withdrawal from daily sales or bank account."
      }
    ]
  }
};

// Section icons
const sectionIcons = {
  useCases: <Target className="h-6 w-6 text-cyan-400" />,
  participants: <Users className="h-6 w-6 text-blue-400" />,
  documentation: <FileText className="h-6 w-6 text-purple-400" />,
  timeline: <Clock className="h-6 w-6 text-amber-400" />
};

// Section title mapping
const sectionTitles: Record<string, string> = {
  "use-cases": "Common Use Cases",
  "participants": "Key Participants",
  "documentation": "Documentation",
  "timeline": "Timeline"
};

const FacilityReferenceDetail: React.FC = () => {
  const navigate = useNavigate();
  const { facilityId, sectionType } = useParams<{ facilityId: string, sectionType: string }>();
  const [animateIn, setAnimateIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [facilityTitle, setFacilityTitle] = useState("");

  useEffect(() => {
    if (!facilityId || !sectionType) {
      navigate('/education');
      return;
    }
    
    setFacilityTitle(facilityTitles[facilityId] || "Credit Facility");
    
    // Simulate loading for smooth animation
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setAnimateIn(true), 100);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [facilityId, sectionType, navigate]);

  const goBack = () => {
    navigate(`/facility-mechanics/${facilityId}`);
  };

  // Render content based on section type
  const renderContent = () => {
    if (!facilityId || !sectionType) return null;

    switch (sectionType) {
      case 'use-cases':
        const useCases = useCasesData[facilityId];
        if (!useCases) return <p>No use cases found for this facility type.</p>;
        
        return (
          <div>
            <div className="bg-gradient-to-r from-cyan-900/50 to-cyan-800/20 rounded-xl p-6 mb-6 border border-cyan-700/30">
              <h2 className="text-2xl text-cyan-100 font-mono font-bold flex items-center gap-3 mb-2">
                {sectionIcons.useCases}
                <span>When To Use {facilityTitle}</span>
              </h2>
              <p className="text-gray-300">
                These scenarios represent the most common situations where {facilityTitle} offers an optimal financing solution.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {useCases.cases.map((useCase, index) => (
                <div 
                  key={index} 
                  className={`
                    bg-black/40 rounded-xl border border-cyan-800/30 p-6 transform hover:bg-cyan-900/20 transition-all
                    ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                  `}
                  style={{ transitionDelay: `${100 + (index * 100)}ms` }}
                >
                  <h3 className="text-xl text-cyan-200 font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                    {useCase.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'participants':
        const participants = participantsData[facilityId];
        if (!participants) return <p>No participant data found for this facility type.</p>;
        
        return (
          <div>
            <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/20 rounded-xl p-6 mb-6 border border-blue-700/30">
              <h2 className="text-2xl text-blue-100 font-mono font-bold flex items-center gap-3 mb-2">
                {sectionIcons.participants}
                <span>Key Participants in {facilityTitle}</span>
              </h2>
              <p className="text-gray-300">
                Understanding the roles and responsibilities of each stakeholder in the {facilityTitle.toLowerCase()} process.
              </p>
            </div>
            
            <div className="space-y-5">
              {participants.participants.map((participant, index) => (
                <div 
                  key={index} 
                  className={`
                    bg-black/40 rounded-xl border border-blue-800/30 p-6 transform hover:bg-blue-900/20 transition-all
                    ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                  `}
                  style={{ transitionDelay: `${100 + (index * 100)}ms` }}
                >
                  <h3 className="text-xl text-blue-200 font-semibold mb-2 flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-400" />
                    {participant.role}
                  </h3>
                  <p className="text-gray-300 leading-relaxed pl-8">
                    {participant.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'documentation':
        const documentation = documentationData[facilityId];
        if (!documentation) return <p>No documentation data found for this facility type.</p>;
        
        return (
          <div>
            <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/20 rounded-xl p-6 mb-6 border border-purple-700/30">
              <h2 className="text-2xl text-purple-100 font-mono font-bold flex items-center gap-3 mb-2">
                {sectionIcons.documentation}
                <span>{facilityTitle} Documentation Guide</span>
              </h2>
              <p className="text-gray-300">
                Essential paperwork and agreements required throughout the {facilityTitle.toLowerCase()} process.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {documentation.documents.map((document, index) => (
                <div 
                  key={index} 
                  className={`
                    bg-black/40 rounded-xl border border-purple-800/30 p-5 transform hover:bg-purple-900/20 transition-all
                    ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                    flex items-start gap-4
                  `}
                  style={{ transitionDelay: `${100 + (index * 50)}ms` }}
                >
                  <FileText className="h-6 w-6 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg text-purple-200 font-semibold mb-1">
                      {document.name}
                    </h3>
                    <p className="text-gray-300">
                      {document.purpose}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'timeline':
        const timeline = timelineData[facilityId];
        if (!timeline) return <p>No timeline data found for this facility type.</p>;
        
        return (
          <div>
            <div className="bg-gradient-to-r from-amber-900/50 to-amber-800/20 rounded-xl p-6 mb-6 border border-amber-700/30">
              <h2 className="text-2xl text-amber-100 font-mono font-bold flex items-center gap-3 mb-2">
                {sectionIcons.timeline}
                <span>{facilityTitle} Process Timeline</span>
              </h2>
              <p className="text-gray-300">
                Typical timeframe from application to funding for {facilityTitle.toLowerCase()}.
              </p>
            </div>
            
            <div className="relative">
              {/* Timeline vertical line */}
              <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-amber-700/50"></div>
              
              <div className="space-y-6">
                {timeline.stages.map((stage, index) => (
                  <div 
                    key={index} 
                    className={`
                      relative pl-16 transform
                      ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                    `}
                    style={{ transitionDelay: `${100 + (index * 100)}ms` }}
                  >
                    {/* Timeline node */}
                    <div className="absolute left-6 top-4 w-5 h-5 rounded-full bg-amber-500 border-4 border-black transform -translate-x-2.5"></div>
                    
                    <div className="bg-black/40 rounded-xl border border-amber-800/30 p-5 hover:bg-amber-900/20 transition-all">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h3 className="text-xl text-amber-200 font-semibold">
                          {stage.name}
                        </h3>
                        <span className="text-amber-400 font-mono bg-amber-900/30 px-3 py-1 rounded-full text-sm">
                          {stage.duration}
                        </span>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return <p>Select a section to view details.</p>;
    }
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
              Back to {facilityTitle}
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Book className="h-5 w-5 text-cyan-400" />
            <span className="text-cyan-300 font-mono text-sm">{sectionTitles[sectionType || ''] || 'DETAILS'}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-28 pb-16">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="h-12 w-12 rounded-full border-4 border-cyan-500/30 border-t-cyan-500 animate-spin"></div>
            <p className="mt-4 text-cyan-400 font-mono">Loading {sectionTitles[sectionType || '']} details...</p>
          </div>
        ) : (
          <div className="bg-black/60 rounded-xl border border-cyan-800/30 p-6 md:p-8">
            <ScrollArea className="h-[75vh] pr-4">
              {renderContent()}
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacilityReferenceDetail;
