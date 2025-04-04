import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  BarChart3, FileText, FilePlus, Eye, Target, Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { ProfileData } from "@/types/profile";

const ProposalsDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");
  
  const profileData: ProfileData = {
    id: "enterprise-001",
    fullName: "TerraForge Admin",
    companyName: "TerraForge Inc.",
    email: "admin@terraforge.com",
    phone: "555-987-6543",
    industry: "Commercial Real Estate",
    address: "456 Development Ave, San Francisco, CA",
    size: "Mid-Market",
    yearFounded: "2010",
    description: "TerraForge Inc. is an innovative commercial real estate development company."
  };
  
  const activeProposals = [
    { 
      id: "RFP-2023-001", 
      name: "Riverside Development", 
      industry: "Commercial Real Estate", 
      status: "OPEN", 
      principal: "$2.4M",
      bidDeadline: "2023-12-31",
      views: 42,
      bids: 5,
      saves: 12
    },
    { 
      id: "RFP-2023-002", 
      name: "Green Energy Initiative", 
      industry: "Renewable Energy", 
      status: "OPEN", 
      principal: "$5.7M",
      bidDeadline: "2023-12-15",
      views: 78,
      bids: 8,
      saves: 25
    },
    { 
      id: "RFP-2023-003", 
      name: "Medical Center Expansion", 
      industry: "Healthcare", 
      status: "OPEN", 
      principal: "$8.1M",
      bidDeadline: "2024-01-15",
      views: 31,
      bids: 3,
      saves: 9
    }
  ];
  
  const completedProposals = [
    { 
      id: "RFP-2022-045", 
      name: "Office Park Development", 
      industry: "Commercial Real Estate", 
      status: "COMPLETED", 
      principal: "$4.2M",
      bidDeadline: "2022-11-15",
      views: 64,
      bids: 12,
      saves: 18
    },
    { 
      id: "RFP-2022-038", 
      name: "Solar Farm Project", 
      industry: "Renewable Energy", 
      status: "COMPLETED", 
      principal: "$7.8M",
      bidDeadline: "2022-10-30",
      views: 87,
      bids: 15,
      saves: 32
    }
  ];

  const draftProposals = [
    { 
      id: "DRAFT-001", 
      name: "City Infrastructure", 
      industry: "Municipal", 
      status: "DRAFT", 
      principal: "$12.5M",
      lastEdited: "2023-12-01"
    },
    { 
      id: "DRAFT-002", 
      name: "Hotel Renovation", 
      industry: "Hospitality", 
      status: "DRAFT", 
      principal: "$3.8M",
      lastEdited: "2023-11-25"
    }
  ];

  const handleCreateNewProposal = () => {
    navigate("/create-proposal");
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "Successfully logged out of your enterprise account",
    });
    navigate("/");
  };

  const handleViewProposal = (proposalId: string) => {
    navigate(`/proposal-bids/${proposalId}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative grid-bg">
      <div className="absolute inset-0 z-0">
        <div className="radar-pulse bg-blue-500/10"></div>
        <div className="radar-pulse bg-blue-500/10" style={{ animationDelay: "1s" }}></div>
        <div className="radar-pulse bg-blue-500/10" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <div className="scanline z-10"></div>
      
      <DashboardHeader onLogout={handleLogout} />
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-6">
          <DashboardSidebar 
            profileData={profileData} 
            activePage="proposals"
            financingAmount="$28.5M"
            activeDealsCount={activeProposals.length}
          />
          
          <main className="flex-1">
            <div className="flex justify-between items-center border-b border-primary/10 pb-4 mb-6">
              <div>
                <h1 className="text-2xl font-mono">Proposals</h1>
                <p className="text-sm text-muted-foreground">Manage your funding proposals and track market responses.</p>
              </div>
              <Button 
                className="font-mono text-xs"
                onClick={handleCreateNewProposal}
              >
                <FilePlus className="h-4 w-4 mr-2" />
                CREATE NEW PROPOSAL
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="border-primary/20 bg-background/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-mono">ACTIVE PROPOSALS</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-mono">{activeProposals.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">Currently in marketplace</p>
                </CardContent>
              </Card>
              <Card className="border-primary/20 bg-background/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-mono">TOTAL VIEWS</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-mono">151</div>
                  <p className="text-xs text-muted-foreground mt-1">Across all proposals</p>
                </CardContent>
              </Card>
              <Card className="border-primary/20 bg-background/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-mono">TOTAL BIDS</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-mono">16</div>
                  <p className="text-xs text-muted-foreground mt-1">From verified lenders</p>
                </CardContent>
              </Card>
              <Card className="border-primary/20 bg-background/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-mono">FINANCING SOUGHT</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-mono">$16.2M</div>
                  <p className="text-xs text-muted-foreground mt-1">Active proposals</p>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="active" className="space-y-6" onValueChange={setActiveTab}>
              <TabsList className="bg-background/50 border border-primary/20">
                <TabsTrigger value="active" className="font-mono text-xs">ACTIVE</TabsTrigger>
                <TabsTrigger value="completed" className="font-mono text-xs">COMPLETED</TabsTrigger>
                <TabsTrigger value="drafts" className="font-mono text-xs">DRAFTS</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active" className="space-y-6">
                <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-sm font-mono">ACTIVE PROPOSALS</CardTitle>
                    <CardDescription>Your proposals currently seeking financing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Industry</TableHead>
                          <TableHead>Principal</TableHead>
                          <TableHead>Deadline</TableHead>
                          <TableHead>Activity</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activeProposals.map((proposal) => (
                          <TableRow key={proposal.id} className="cursor-pointer">
                            <TableCell className="font-mono text-xs">{proposal.id}</TableCell>
                            <TableCell>
                              <div className="font-extralight">{proposal.name}</div>
                            </TableCell>
                            <TableCell className="font-extralight">{proposal.industry}</TableCell>
                            <TableCell className="font-mono font-extralight">{proposal.principal}</TableCell>
                            <TableCell className="font-mono text-xs font-extralight">{proposal.bidDeadline}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-3 text-xs font-extralight">
                                <span className="flex items-center"><Eye className="h-3 w-3 mr-1" />{proposal.views}</span>
                                <span className="flex items-center"><Target className="h-3 w-3 mr-1" />{proposal.bids}</span>
                                <span className="flex items-center"><Bookmark className="h-3 w-3 mr-1" />{proposal.saves}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="font-extralight text-xs h-7 px-2"
                                onClick={() => handleViewProposal(proposal.id)}
                              >
                                View Bids
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="completed" className="space-y-6">
                <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-sm font-mono">COMPLETED PROPOSALS</CardTitle>
                    <CardDescription>Proposals that have secured funding</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Industry</TableHead>
                          <TableHead>Principal</TableHead>
                          <TableHead>Closed Date</TableHead>
                          <TableHead>Engagement</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {completedProposals.map((proposal) => (
                          <TableRow key={proposal.id} className="cursor-pointer">
                            <TableCell className="font-mono text-xs">{proposal.id}</TableCell>
                            <TableCell>
                              <div className="font-extralight">{proposal.name}</div>
                            </TableCell>
                            <TableCell className="font-extralight">{proposal.industry}</TableCell>
                            <TableCell className="font-mono font-extralight">{proposal.principal}</TableCell>
                            <TableCell className="font-mono text-xs font-extralight">{proposal.bidDeadline}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-3 text-xs font-extralight">
                                <span className="flex items-center"><Eye className="h-3 w-3 mr-1" />{proposal.views}</span>
                                <span className="flex items-center"><Target className="h-3 w-3 mr-1" />{proposal.bids}</span>
                                <span className="flex items-center"><Bookmark className="h-3 w-3 mr-1" />{proposal.saves}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="font-extralight text-xs h-7 px-2"
                                onClick={() => handleViewProposal(proposal.id)}
                              >
                                View Bids
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="drafts" className="space-y-6">
                <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-sm font-mono">DRAFT PROPOSALS</CardTitle>
                    <CardDescription>Proposals in progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Industry</TableHead>
                          <TableHead>Principal</TableHead>
                          <TableHead>Last Edited</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {draftProposals.map((proposal) => (
                          <TableRow key={proposal.id}>
                            <TableCell className="font-mono text-xs">{proposal.id}</TableCell>
                            <TableCell>
                              <div className="font-extralight">{proposal.name}</div>
                            </TableCell>
                            <TableCell className="font-extralight">{proposal.industry}</TableCell>
                            <TableCell className="font-mono font-extralight">{proposal.principal}</TableCell>
                            <TableCell className="font-mono text-xs font-extralight">{proposal.lastEdited}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm" className="font-extralight text-xs h-7 px-2">Edit</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProposalsDashboard;
