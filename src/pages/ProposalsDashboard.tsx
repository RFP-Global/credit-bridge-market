
import React, { useState } from "react";
import EnterpriseLayout from "@/components/layout/EnterpriseLayout";
import ProposalsDashboardHeader from "@/components/proposals/ProposalsDashboardHeader";
import ProposalTabs from "@/components/proposals/ProposalTabs";

const ProposalsDashboard = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for proposals
  const activeProposals = [
    { id: 1, name: "Riverside Development", type: "Commercial Real Estate", status: "Under Review", amount: "$2.4M", date: "2023-06-15", responses: 4 },
    { id: 2, name: "Green Energy Initiative", type: "Renewable Energy", status: "Approved", amount: "$5.7M", date: "2023-05-22", responses: 7 },
    { id: 3, name: "Medical Center Expansion", type: "Healthcare", status: "Pending", amount: "$8.1M", date: "2023-06-01", responses: 2 },
    { id: 4, name: "Tech Campus Development", type: "Commercial Real Estate", status: "Under Review", amount: "$12.3M", date: "2023-06-10", responses: 5 },
    { id: 5, name: "Retail Center Renovation", type: "Retail", status: "Pending", amount: "$3.8M", date: "2023-05-28", responses: 3 }
  ];
  
  const draftProposals = [
    { id: 6, name: "City Infrastructure", type: "Municipal", status: "Draft", amount: "$12.5M", date: "2023-06-18", completion: 65 },
    { id: 7, name: "Hotel Renovation", type: "Hospitality", status: "Draft", amount: "$3.8M", date: "2023-06-12", completion: 80 },
    { id: 8, name: "Industrial Park", type: "Industrial", status: "Draft", amount: "$7.2M", date: "2023-06-05", completion: 45 }
  ];
  
  const completedProposals = [
    { id: 9, name: "Office Park Development", type: "Commercial Real Estate", status: "Completed", amount: "$4.2M", date: "2023-04-15", lender: "Global Capital" },
    { id: 10, name: "Solar Farm Project", type: "Renewable Energy", status: "Completed", amount: "$7.8M", date: "2023-03-22", lender: "Green Investments" },
    { id: 11, name: "Apartment Complex", type: "Residential", status: "Completed", amount: "$6.5M", date: "2023-02-10", lender: "Urban Housing Fund" }
  ];

  // Filter proposals based on search query
  const filteredActiveProposals = activeProposals.filter(
    proposal => proposal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               proposal.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredDraftProposals = draftProposals.filter(
    proposal => proposal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               proposal.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredCompletedProposals = completedProposals.filter(
    proposal => proposal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               proposal.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <EnterpriseLayout
      title="Proposals Dashboard"
      description="Manage all your financing proposals in one place."
    >
      <ProposalsDashboardHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <ProposalTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filteredActiveProposals={filteredActiveProposals}
        filteredDraftProposals={filteredDraftProposals}
        filteredCompletedProposals={filteredCompletedProposals}
      />
    </EnterpriseLayout>
  );
};

export default ProposalsDashboard;
