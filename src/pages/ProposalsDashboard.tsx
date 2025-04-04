import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Search, Filter, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import EnterpriseLayout from "@/components/layout/EnterpriseLayout";

const ProposalsDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  
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

  const handleCreateProposal = () => {
    navigate("/create-proposal");
  };

  const handleViewProposal = (proposalId) => {
    navigate(`/proposal-bids/${proposalId}`);
  };

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
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-md">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search proposals..."
            className="pl-10 rounded-none border-primary/20 focus-visible:ring-primary/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button 
          className="rounded-none font-mono text-xs"
          onClick={handleCreateProposal}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          NEW PROPOSAL
        </Button>
      </div>
      
      <Tabs defaultValue="active" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="bg-background/50 border border-primary/20">
          <TabsTrigger value="active" className="font-mono text-xs">ACTIVE ({filteredActiveProposals.length})</TabsTrigger>
          <TabsTrigger value="drafts" className="font-mono text-xs">DRAFTS ({filteredDraftProposals.length})</TabsTrigger>
          <TabsTrigger value="completed" className="font-mono text-xs">COMPLETED ({filteredCompletedProposals.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm font-mono">ACTIVE PROPOSALS</CardTitle>
              <CardDescription>Proposals currently in the marketplace</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-primary/10">
                      <th className="text-left py-3 px-4 text-xs font-mono">
                        <div className="flex items-center">
                          NAME
                          <ArrowUpDown className="ml-2 h-3 w-3" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-mono">
                        <div className="flex items-center">
                          TYPE
                          <Filter className="ml-2 h-3 w-3" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-mono">
                        <div className="flex items-center">
                          STATUS
                          <Filter className="ml-2 h-3 w-3" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-mono">AMOUNT</th>
                      <th className="text-left py-3 px-4 text-xs font-mono">RESPONSES</th>
                      <th className="text-left py-3 px-4 text-xs font-mono">DATE</th>
                      <th className="text-right py-3 px-4 text-xs font-mono">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredActiveProposals.map(proposal => (
                      <tr 
                        key={proposal.id} 
                        className="border-b border-primary/10 hover:bg-primary/5 cursor-pointer"
                        onClick={() => handleViewProposal(proposal.id)}
                      >
                        <td className="py-3 px-4 font-mono text-sm">{proposal.name}</td>
                        <td className="py-3 px-4 text-xs">{proposal.type}</td>
                        <td className="py-3 px-4">
                          <span className="text-xs px-2 py-1 font-mono">
                            {proposal.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-sm">{proposal.amount}</td>
                        <td className="py-3 px-4 font-mono text-sm">{proposal.responses}</td>
                        <td className="py-3 px-4 text-xs">{proposal.date}</td>
                        <td className="py-3 px-4 text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="font-mono text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewProposal(proposal.id);
                            }}
                          >
                            VIEW
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredActiveProposals.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No active proposals found matching your search.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="drafts" className="space-y-4">
          <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm font-mono">DRAFT PROPOSALS</CardTitle>
              <CardDescription>Proposals in progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-primary/10">
                      <th className="text-left py-3 px-4 text-xs font-mono">NAME</th>
                      <th className="text-left py-3 px-4 text-xs font-mono">TYPE</th>
                      <th className="text-left py-3 px-4 text-xs font-mono">AMOUNT</th>
                      <th className="text-left py-3 px-4 text-xs font-mono">COMPLETION</th>
                      <th className="text-left py-3 px-4 text-xs font-mono">LAST UPDATED</th>
                      <th className="text-right py-3 px-4 text-xs font-mono">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDraftProposals.map(proposal => (
                      <tr key={proposal.id} className="border-b border-primary/10 hover:bg-primary/5">
                        <td className="py-3 px-4 font-mono text-sm">{proposal.name}</td>
                        <td className="py-3 px-4 text-xs">{proposal.type}</td>
                        <td className="py-3 px-4 font-mono text-sm">{proposal.amount}</td>
                        <td className="py-3 px-4">
                          <div className="w-full bg-primary/10 h-2">
                            <div 
                              className="bg-primary h-2" 
                              style={{ width: `${proposal.completion}%` }}
                            ></div>
                          </div>
                          <span className="text-xs mt-1">{proposal.completion}%</span>
                        </td>
                        <td className="py-3 px-4 text-xs">{proposal.date}</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm" className="font-mono text-xs">EDIT</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredDraftProposals.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No draft proposals found matching your search.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm font-mono">COMPLETED PROPOSALS</CardTitle>
              <CardDescription>Successfully financed proposals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-primary/10">
                      <th className="text-left py-3 px-4 text-xs font-mono">NAME</th>
                      <th className="text-left py-3 px-4 text-xs font-mono">TYPE</th>
                      <th className="text-left py-3 px-4 text-xs font-mono">AMOUNT</th>
                      <th className="text-left py-3 px-4 text-xs font-mono">LENDER</th>
                      <th className="text-left py-3 px-4 text-xs font-mono">COMPLETION DATE</th>
                      <th className="text-right py-3 px-4 text-xs font-mono">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCompletedProposals.map(proposal => (
                      <tr key={proposal.id} className="border-b border-primary/10 hover:bg-primary/5">
                        <td className="py-3 px-4 font-mono text-sm">{proposal.name}</td>
                        <td className="py-3 px-4 text-xs">{proposal.type}</td>
                        <td className="py-3 px-4 font-mono text-sm">{proposal.amount}</td>
                        <td className="py-3 px-4 text-sm">{proposal.lender}</td>
                        <td className="py-3 px-4 text-xs">{proposal.date}</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm" className="font-mono text-xs">DETAILS</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredCompletedProposals.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No completed proposals found matching your search.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </EnterpriseLayout>
  );
};

export default ProposalsDashboard;
