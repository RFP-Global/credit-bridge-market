
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import EnterpriseLayout from "@/components/layout/EnterpriseLayout";

const EnterpriseDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  const recentProposals = [
    { id: 1, name: "Riverside Development", type: "Commercial Real Estate", status: "Under Review", amount: "$2.4M", proposalId: "RFP-2023-001" },
    { id: 2, name: "Green Energy Initiative", type: "Renewable Energy", status: "Approved", amount: "$5.7M", proposalId: "RFP-2023-002" },
    { id: 3, name: "Medical Center Expansion", type: "Healthcare", status: "Draft", amount: "$8.1M", proposalId: "RFP-2023-003" }
  ];
  
  const notifications = [
    { id: 1, text: "New lender response on Riverside Development", time: "2 hours ago" },
    { id: 2, text: "Document approval required for Green Energy Initiative", time: "Yesterday" },
    { id: 3, text: "Market report for Q2 2023 available", time: "3 days ago" }
  ];

  const activeProposals = [
    { id: 1, name: "Riverside Development", industry: "Commercial Real Estate", status: "OPEN", principal: "$2.4M", proposalId: "RFP-2023-001" },
    { id: 2, name: "Green Energy Initiative", industry: "Renewable Energy", status: "OPEN", principal: "$5.7M", proposalId: "RFP-2023-002" },
    { id: 3, name: "Medical Center Expansion", industry: "Healthcare", status: "OPEN", principal: "$8.1M", proposalId: "RFP-2023-003" }
  ];

  const completedProposals = [
    { id: 4, name: "Office Park Development", industry: "Commercial Real Estate", status: "COMPLETED", principal: "$4.2M", proposalId: "RFP-2022-045" },
    { id: 5, name: "Solar Farm Project", industry: "Renewable Energy", status: "COMPLETED", principal: "$7.8M", proposalId: "RFP-2022-038" }
  ];

  const draftProposals = [
    { id: 6, name: "City Infrastructure", industry: "Municipal", status: "DRAFT", principal: "$12.5M", proposalId: "DRAFT-001" },
    { id: 7, name: "Hotel Renovation", industry: "Hospitality", status: "DRAFT", principal: "$3.8M", proposalId: "DRAFT-002" }
  ];

  const handleViewProposal = (proposal) => {
    navigate(`/proposal-bids/${proposal.proposalId}`);
    
    toast({
      title: "Navigating to proposal",
      description: `Viewing details for ${proposal.name}`,
    });
  };

  const handleViewAllProposals = (tabName: string) => {
    navigate(`/proposals-dashboard`);
    
    toast({
      title: "Viewing all proposals",
      description: `Showing ${tabName} proposals`,
    });
  };

  const handleNavigateToMarketplace = () => {
    navigate('/marketplace');
  };

  return (
    <EnterpriseLayout>
      <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="bg-background/50 border border-primary/20">
          <TabsTrigger value="overview" className="font-mono text-xs">OVERVIEW</TabsTrigger>
          <TabsTrigger value="proposals" className="font-mono text-xs">PROPOSALS</TabsTrigger>
          <TabsTrigger value="notifications" className="font-mono text-xs">NOTIFICATIONS</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-primary/20 bg-background/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-mono">ACTIVE PROPOSALS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-mono">7</div>
                <p className="text-xs text-muted-foreground mt-1">+2 from last month</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-background/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-mono">LENDER RESPONSES</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-mono">24</div>
                <p className="text-xs text-muted-foreground mt-1">+8 in the last 7 days</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-background/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-mono">TOTAL FINANCING</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-mono">$28.5M</div>
                <p className="text-xs text-muted-foreground mt-1">Across all active proposals</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm font-mono">RECENT PROPOSALS</CardTitle>
              <CardDescription>Your latest financing proposals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProposals.map(proposal => (
                  <div 
                    key={proposal.id} 
                    className="border-b border-primary/10 pb-3 last:border-0 last:pb-0 cursor-pointer hover:bg-primary/5"
                    onClick={() => handleViewProposal(proposal)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-mono text-sm">{proposal.name}</h3>
                        <p className="text-xs text-muted-foreground">{proposal.type}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 font-mono ${
                          proposal.status === "Approved" ? "bg-green-100 text-green-800" : 
                          proposal.status === "Under Review" ? "bg-amber-100 text-amber-800" : 
                          "bg-blue-100 text-blue-800"
                        }`}>
                          {proposal.status}
                        </span>
                        <p className="text-xs font-mono mt-1">{proposal.amount}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full font-mono text-xs rounded-none border-primary/20"
                onClick={() => navigate("/proposals-dashboard")}
              >
                VIEW ALL PROPOSALS
                <ArrowUpRight className="ml-2 h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="proposals" className="space-y-4">
          <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm font-mono">ALL PROPOSALS</CardTitle>
              <CardDescription>Manage your financing proposals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-primary/20 p-4 rounded-md hover:bg-primary/5 transition-colors">
                  <h3 className="font-mono text-sm mb-2">ACTIVE PROPOSALS</h3>
                  <p className="text-2xl font-mono">7</p>
                  <p className="text-xs text-muted-foreground mt-1">Currently in marketplace</p>
                  
                  <div className="mt-4 space-y-2">
                    {activeProposals.map(proposal => (
                      <div 
                        key={proposal.id}
                        className="border-t border-primary/10 pt-2 cursor-pointer hover:text-primary"
                        onClick={() => handleViewProposal(proposal)}
                      >
                        <p className="text-sm font-mono">{proposal.name}</p>
                        <p className="text-xs text-muted-foreground">{proposal.principal}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-4 text-xs"
                    onClick={() => handleViewAllProposals("active")}
                  >
                    View All Active
                  </Button>
                </div>
                
                <div className="border border-primary/20 p-4 rounded-md hover:bg-primary/5 transition-colors">
                  <h3 className="font-mono text-sm mb-2">COMPLETED PROPOSALS</h3>
                  <p className="text-2xl font-mono">12</p>
                  <p className="text-xs text-muted-foreground mt-1">Successfully financed</p>
                  
                  <div className="mt-4 space-y-2">
                    {completedProposals.map(proposal => (
                      <div 
                        key={proposal.id}
                        className="border-t border-primary/10 pt-2 cursor-pointer hover:text-primary"
                        onClick={() => handleViewProposal(proposal)}
                      >
                        <p className="text-sm font-mono">{proposal.name}</p>
                        <p className="text-xs text-muted-foreground">{proposal.principal}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-4 text-xs"
                    onClick={() => handleViewAllProposals("completed")}
                  >
                    View All Completed
                  </Button>
                </div>
                
                <div className="border border-primary/20 p-4 rounded-md hover:bg-primary/5 transition-colors">
                  <h3 className="font-mono text-sm mb-2">DRAFT PROPOSALS</h3>
                  <p className="text-2xl font-mono">3</p>
                  <p className="text-xs text-muted-foreground mt-1">In progress</p>
                  
                  <div className="mt-4 space-y-2">
                    {draftProposals.map(proposal => (
                      <div 
                        key={proposal.id}
                        className="border-t border-primary/10 pt-2 cursor-pointer hover:text-primary"
                        onClick={() => handleViewProposal(proposal)}
                      >
                        <p className="text-sm font-mono">{proposal.name}</p>
                        <p className="text-xs text-muted-foreground">{proposal.principal}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-4 text-xs"
                    onClick={() => handleViewAllProposals("drafts")}
                  >
                    View All Drafts
                  </Button>
                </div>
              </div>
              
              <Button 
                className="w-full font-mono text-xs"
                onClick={() => navigate("/proposals-dashboard")}
              >
                VIEW PROPOSALS DASHBOARD
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm font-mono">NOTIFICATIONS</CardTitle>
              <CardDescription>Recent activity and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map(notification => (
                  <div key={notification.id} className="border-b border-primary/10 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bell className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm">{notification.text}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full font-mono text-xs rounded-none border-primary/20">
                VIEW ALL NOTIFICATIONS
                <ArrowUpRight className="ml-2 h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </EnterpriseLayout>
  );
};

export default EnterpriseDashboard;
