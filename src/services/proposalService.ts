
import { Proposal, Bid } from "@/types/bids";

/**
 * Service for fetching proposal and bid data
 */
export const fetchProposalDetails = (id: string | undefined, selectedBidIds?: string[] | null): Promise<{
  proposal: Proposal;
  bids: Bid[];
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock data for the proposal
      const mockProposal: Proposal = {
        id: id || "",
        name: id === "RFP-2023-001" ? "Riverside Development" : 
              id === "RFP-2023-002" ? "Green Energy Initiative" : 
              id === "RFP-2023-003" ? "Medical Center Expansion" : 
              "Unknown Project",
        industry: id === "RFP-2023-001" ? "Commercial Real Estate" : 
                 id === "RFP-2023-002" ? "Renewable Energy" : 
                 id === "RFP-2023-003" ? "Healthcare" : 
                 "Other",
        status: "OPEN",
        principal: id === "RFP-2023-001" ? "$2.4M" : 
                  id === "RFP-2023-002" ? "$5.7M" : 
                  id === "RFP-2023-003" ? "$8.1M" : 
                  "$1.5M",
      };
      
      // Enhanced mock data for bids with more details for comparison
      const mockBids: Bid[] = [
        {
          id: "BID-001",
          amount: id === "RFP-2023-001" ? "$2.35M" : 
                  id === "RFP-2023-002" ? "$5.65M" : 
                  id === "RFP-2023-003" ? "$8.05M" : 
                  "$1.48M",
          interestRate: "5.75%",
          interestRateType: "Fixed",
          term: "60 months",
          facilityType: "Term Loan",
          status: "Under Review",
          submittedDate: "2023-11-15",
          additionalTerms: "No prepayment penalty after 24 months",
          features: [
            "Annual review of terms",
            "No collateral required",
            "Option to increase credit line after 1 year"
          ]
        },
        {
          id: "BID-002",
          amount: id === "RFP-2023-001" ? "$2.42M" : 
                  id === "RFP-2023-002" ? "$5.72M" : 
                  id === "RFP-2023-003" ? "$8.15M" : 
                  "$1.52M",
          interestRate: "5.50%",
          interestRateType: "Floating",
          term: "48 months",
          facilityType: "Revolving Credit",
          status: "Under Review",
          submittedDate: "2023-11-16",
          additionalTerms: "Includes optional line of credit",
          features: [
            "Fixed rate guarantee",
            "Flexible payment schedule",
            "Dedicated account manager"
          ]
        },
        {
          id: "BID-003",
          amount: id === "RFP-2023-001" ? "$2.38M" : 
                 id === "RFP-2023-002" ? "$5.68M" : 
                 id === "RFP-2023-003" ? "$8.08M" : 
                 "$1.49M",
          interestRate: "6.00%",
          interestRateType: "Fixed",
          term: "72 months",
          facilityType: "Bridge Loan",
          status: "Under Review",
          submittedDate: "2023-11-18",
          additionalTerms: "Fixed rate for first 36 months",
          features: [
            "Quarterly performance reviews",
            "Low early repayment fees",
            "Business growth advisory services included"
          ]
        }
      ];
      
      let filteredBids = mockBids;
      
      // Filter bids if specific bid IDs were selected
      if (selectedBidIds && selectedBidIds.length > 0) {
        filteredBids = mockBids.filter(bid => selectedBidIds.includes(bid.id));
        
        // If no matching bids are found, return all bids (fallback)
        if (filteredBids.length === 0) {
          filteredBids = mockBids;
        }
      }
      
      resolve({
        proposal: mockProposal,
        bids: filteredBids
      });
    }, 500);
  });
};
