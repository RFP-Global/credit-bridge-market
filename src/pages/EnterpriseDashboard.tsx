import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Radar, Signal, BarChart3, FileText, Users, Building, CreditCard, ArrowUpRight, Bell, Settings, ShoppingCart, User } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

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

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "Successfully logged out of your enterprise account",
    });
    navigate("/");
  };

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

  return (
    <div className="min-h-screen bg-background text-foreground relative grid-bg">
      <div className="absolute inset-0 z-0">
        <div className="radar-pulse bg-blue-500/10"></div>
        <div className="radar-pulse bg-blue-500/10" style={{ animationDelay: "1s" }}></div>
        <div className="radar-pulse bg-blue-500/10" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <div className="scanline z-10"></div>
      
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="relative mr-2">
                  <Radar className="h-6 w-6 text-primary" />
                  <Signal className="h-4 w-4 text-primary/70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <span className="font-mono text-xl">RFP GLOBAL</span>
              </Link>
              <span className="ml-4 text-xs font-mono text-foreground/60 border-l border-primary/20 pl-4">ENTERPRISE PORTAL</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-primary/10 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
              </button>
              <Link to="/enterprise-profile" className="p-2 rounded-full hover:bg-primary/10 flex items-center">
                <User className="h-5 w-5" />
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-none font-mono border-primary/30 text-xs"
                onClick={handleLogout}
              >
                LOGOUT
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-64 space-y-6">
            <Card className="border border-primary/20 bg-background/50 backdrop-blur-sm overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono">ENTERPRISE ACCOUNT</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono">TF</div>
                  <div>
                    <p className="font-mono text-sm">TERRAFORGE INC.</p>
                    <p className="text-xs text-muted-foreground">admin@terraforge.com</p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground pt-2 border-t border-primary/10">
                  <p className="flex justify-between py-1"><span>Account Level:</span> <span className="font-mono">ENTERPRISE</span></p>
                  <p className="flex justify-between py-1"><span>Active Proposals:</span> <span className="font-mono">7</span></p>
                  <p className="flex justify-between py-1"><span>Total Financing:</span> <span className="font-mono">$28.5M</span></p>
                </div>
                <div className="pt-2">
                  <Link to="/enterprise-profile">
                    <Button variant="outline" size="sm" className="w-full text-xs font-mono">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3 bg-primary/5 text-primary border-l-2 border-primary">
                <BarChart3 className="h-4 w-4 mr-3" />
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3"
                onClick={() => navigate("/proposals-dashboard")}
              >
                <FileText className="h-4 w-4 mr-3" />
                Proposals
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3"
                onClick={() => navigate("/marketplace")}
              >
                <ShoppingCart className="h-4 w-4 mr-3" />
                Marketplace
              </Button>
              <Button variant="ghost" className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3">
                <Building className="h-4 w-4 mr-3" />
                Lenders
              </Button>
              <Button variant="ghost" className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3">
                <CreditCard className="h-4 w-4 mr-3" />
                Financing
              </Button>
              <Button variant="ghost" className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3">
                <Users className="h-4 w-4 mr-3" />
                Team
              </Button>
              <Link to="/enterprise-profile" className="block">
                <Button variant="ghost" className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3">
                  <User className="h-4 w-4 mr-3" />
                  Profile
                </Button>
              </Link>
            </nav>
          </aside>
          
          <main className="flex-1">
            <div className="border-b border-primary/10 pb-4 mb-6">
              <h1 className="text-2xl font-mono">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back to your Enterprise portal.</p>
            </div>
            
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
                      <div 
                        className="border border-primary/20 p-4 rounded-md hover:bg-primary/5 cursor-pointer transition-colors"
                        onClick={() => handleViewAllProposals("active")}
                      >
                        <h3 className="font-mono text-sm mb-2">ACTIVE PROPOSALS</h3>
                        <p className="text-2xl font-mono">7</p>
                        <p className="text-xs text-muted-foreground mt-1">Currently in marketplace</p>
                      </div>
                      
                      <div 
                        className="border border-primary/20 p-4 rounded-md hover:bg-primary/5 cursor-pointer transition-colors"
                        onClick={() => handleViewAllProposals("completed")}
                      >
                        <h3 className="font-mono text-sm mb-2">COMPLETED PROPOSALS</h3>
                        <p className="text-2xl font-mono">12</p>
                        <p className="text-xs text-muted-foreground mt-1">Successfully financed</p>
                      </div>
                      
                      <div 
                        className="border border-primary/20 p-4 rounded-md hover:bg-primary/5 cursor-pointer transition-colors"
                        onClick={() => handleViewAllProposals("drafts")}
                      >
                        <h3 className="font-mono text-sm mb-2">DRAFT PROPOSALS</h3>
                        <p className="text-2xl font-mono">3</p>
                        <p className="text-xs text-muted-foreground mt-1">In progress</p>
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
          </main>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseDashboard;
