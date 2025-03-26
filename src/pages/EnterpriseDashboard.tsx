
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Radar, Signal, BarChart3, FileText, Users, Building, CreditCard, ArrowUpRight, Bell, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const EnterpriseDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Simulated data
  const recentProjects = [
    { id: 1, name: "Riverside Development", type: "Commercial Real Estate", status: "Under Review", amount: "$2.4M" },
    { id: 2, name: "Green Energy Initiative", type: "Renewable Energy", status: "Approved", amount: "$5.7M" },
    { id: 3, name: "Medical Center Expansion", type: "Healthcare", status: "Draft", amount: "$8.1M" }
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

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative mr-2">
                <Radar className="h-6 w-6 text-primary" />
                <Signal className="h-4 w-4 text-primary/70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <span className="font-mono text-xl">RFP GLOBAL</span>
              <span className="ml-4 text-xs font-mono text-foreground/60 border-l border-primary/20 pl-4">ENTERPRISE PORTAL</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-primary/10 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
              </button>
              <button className="p-2 rounded-full hover:bg-primary/10">
                <Settings className="h-5 w-5" />
              </button>
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
      
      {/* Dashboard Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
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
                  <p className="flex justify-between py-1"><span>Active Projects:</span> <span className="font-mono">7</span></p>
                  <p className="flex justify-between py-1"><span>Total Financing:</span> <span className="font-mono">$28.5M</span></p>
                </div>
              </CardContent>
            </Card>
            
            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3 bg-primary/5 text-primary border-l-2 border-primary">
                <BarChart3 className="h-4 w-4 mr-3" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3">
                <FileText className="h-4 w-4 mr-3" />
                Projects
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
            </nav>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1">
            <div className="border-b border-primary/10 pb-4 mb-6">
              <h1 className="text-2xl font-mono">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back to your Enterprise portal.</p>
            </div>
            
            <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
              <TabsList className="bg-background/50 border border-primary/20">
                <TabsTrigger value="overview" className="font-mono text-xs">OVERVIEW</TabsTrigger>
                <TabsTrigger value="projects" className="font-mono text-xs">PROJECTS</TabsTrigger>
                <TabsTrigger value="notifications" className="font-mono text-xs">NOTIFICATIONS</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-primary/20 bg-background/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-mono">ACTIVE PROJECTS</CardTitle>
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
                      <p className="text-xs text-muted-foreground mt-1">Across all active projects</p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Recent Projects */}
                <Card className="border-primary/20 bg-background/50">
                  <CardHeader>
                    <CardTitle className="text-sm font-mono">RECENT PROJECTS</CardTitle>
                    <CardDescription>Your latest financing projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentProjects.map(project => (
                        <div key={project.id} className="border-b border-primary/10 pb-3 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-mono text-sm">{project.name}</h3>
                              <p className="text-xs text-muted-foreground">{project.type}</p>
                            </div>
                            <div className="text-right">
                              <span className={`text-xs px-2 py-1 font-mono ${
                                project.status === "Approved" ? "bg-green-100 text-green-800" : 
                                project.status === "Under Review" ? "bg-amber-100 text-amber-800" : 
                                "bg-blue-100 text-blue-800"
                              }`}>
                                {project.status}
                              </span>
                              <p className="text-xs font-mono mt-1">{project.amount}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full font-mono text-xs rounded-none border-primary/20">
                      VIEW ALL PROJECTS
                      <ArrowUpRight className="ml-2 h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="projects" className="space-y-4">
                <Card className="border-primary/20 bg-background/50">
                  <CardHeader>
                    <CardTitle className="text-sm font-mono">ALL PROJECTS</CardTitle>
                    <CardDescription>Manage your financing projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 px-4">
                      <p className="text-muted-foreground">Projects tab content would be displayed here.</p>
                      <p className="text-sm mt-2">This is a placeholder for the projects listing and management interface.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-4">
                <Card className="border-primary/20 bg-background/50">
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
