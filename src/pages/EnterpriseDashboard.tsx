
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Radar, Signal, BarChart3, FileText, CreditCard, ArrowUpRight, Bell, Settings, CircleDollarSign, Users, Building, CheckCircle, Clock, User } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { ProfileData } from "@/types/profile";

const EnterpriseDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch the enterprise profile data
  useEffect(() => {
    const currentEnterpriseId = localStorage.getItem('currentEnterpriseId');
    
    if (currentEnterpriseId) {
      const storedProfile = localStorage.getItem(`enterpriseProfile_${currentEnterpriseId}`);
      if (storedProfile) {
        setProfileData(JSON.parse(storedProfile));
      } else {
        // No profile found, redirect to login
        toast({
          title: "Profile Not Found",
          description: "Unable to load your profile information",
          variant: "destructive",
        });
        navigate("/enterprise-login");
      }
    } else {
      // No current enterprise ID, redirect to login
      toast({
        title: "Authentication Required",
        description: "Please login to access your dashboard",
        variant: "destructive",
      });
      navigate("/enterprise-login");
    }
    setIsLoading(false);
  }, [navigate]);
  
  // Generate some realistic active deals for this company
  const generateActiveDeals = (companyName: string) => {
    const dealTypes = ["Equipment Financing", "Expansion Capital", "Working Capital", "Inventory Financing", "Debt Refinancing"];
    const amounts = ["$1.2M", "$850K", "$3.5M", "$500K", "$2.1M"];
    const statuses = ["Review", "Draft", "Pending", "Approved"];
    
    // Generate 1-3 deals randomly but deterministically based on company name
    const numDeals = (companyName.length % 3) + 1;
    const deals = [];
    
    for (let i = 0; i < numDeals; i++) {
      const nameSum = Array.from(companyName).reduce((sum, char) => sum + char.charCodeAt(0), 0);
      const dealIndex = (nameSum + i) % dealTypes.length;
      const amountIndex = (nameSum + i * 2) % amounts.length;
      const statusIndex = (nameSum + i * 3) % statuses.length;
      
      deals.push({
        id: i + 1,
        name: dealTypes[dealIndex],
        amount: amounts[amountIndex],
        status: statuses[statusIndex]
      });
    }
    
    return deals;
  };
  
  // Generate notifications
  const generateNotifications = (companyName: string) => {
    const notificationTypes = [
      "New lender match: Global Capital", 
      "Your RFP needs additional documents", 
      "New industry report available",
      `${companyName} profile has been verified`,
      "Financing opportunity alert"
    ];
    
    const times = ["2 hours ago", "Yesterday", "3 days ago"];
    
    // Generate 2-4 notifications
    const nameSum = Array.from(companyName).reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const numNotifications = (nameSum % 3) + 2;
    const notifications = [];
    
    for (let i = 0; i < numNotifications; i++) {
      const noteIndex = (nameSum + i) % notificationTypes.length;
      const timeIndex = (nameSum + i * 2) % times.length;
      
      notifications.push({
        id: i + 1,
        text: notificationTypes[noteIndex],
        time: times[timeIndex]
      });
    }
    
    return notifications;
  };

  const handleLogout = () => {
    localStorage.removeItem('currentEnterpriseId');
    toast({
      title: "Logged Out",
      description: "Successfully logged out of your enterprise account",
    });
    navigate("/");
  };

  if (isLoading || !profileData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full mx-auto mb-4"></div>
          <p className="font-mono text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Generate data specific to this company
  const activeDeals = generateActiveDeals(profileData.companyName);
  const notifications = generateNotifications(profileData.companyName);
  
  // Calculate metrics based on company name (to get consistent but different values)
  const nameValue = Array.from(profileData.companyName).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const completedRFPs = (nameValue % 5) + 1;
  const pendingReviews = (nameValue % 3) + 1;
  
  // Generate financing amount that seems realistic based on company name
  const baseAmount = 1.5 + (nameValue % 10) * 0.5; // Between 1.5M and 6M
  const financingAmount = `$${baseAmount.toFixed(1)}M`;

  return (
    <div className="min-h-screen bg-background text-foreground relative grid-bg">
      <div className="absolute inset-0 z-0">
        <div className="radar-pulse bg-blue-500/10"></div>
        <div className="radar-pulse bg-blue-500/10" style={{ animationDelay: "1s" }}></div>
        <div className="radar-pulse bg-blue-500/10" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <div className="scanline z-10"></div>
      
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="relative mr-2">
                  <Radar className="h-6 w-6 text-primary" />
                  <Signal className="h-4 w-4 text-primary/70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <span className="font-typewriter text-xl">RFP GLOBAL</span>
              </Link>
              <span className="ml-4 text-xs font-mono text-foreground/60 border-l border-primary/20 pl-4">ENTERPRISE PORTAL</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-primary/10 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
              </button>
              <Link to="/enterprise-profile" className="p-2 rounded-full hover:bg-primary/10">
                <User className="h-5 w-5" />
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-none font-mono text-xs"
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
            <Card className="bg-background/50 backdrop-blur-sm overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono">ENTERPRISE ACCOUNT</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono">
                    {profileData.companyName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-mono text-sm">{profileData.companyName.toUpperCase()}</p>
                    <p className="text-xs text-muted-foreground">{profileData.email}</p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground pt-2 border-t border-primary/10">
                  <p className="flex justify-between py-1"><span>Industry:</span> <span className="font-mono">{profileData.industry.toUpperCase()}</span></p>
                  <p className="flex justify-between py-1"><span>Active RFPs:</span> <span className="font-mono">{activeDeals.length}</span></p>
                  <p className="flex justify-between py-1"><span>Total Financing:</span> <span className="font-mono">{financingAmount}</span></p>
                </div>
              </CardContent>
            </Card>
            
            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3 bg-primary/5 text-primary border-l-2 border-primary">
                <BarChart3 className="h-4 w-4 mr-3" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3" asChild>
                <Link to="/proposals-dashboard">
                  <FileText className="h-4 w-4 mr-3" />
                  My RFPs
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3"
                asChild
              >
                <Link to="/create-proposal">
                  <CreditCard className="h-4 w-4 mr-3" />
                  Create RFP
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3"
                asChild
              >
                <Link to="/enterprise-profile">
                  <Building className="h-4 w-4 mr-3" />
                  Company Profile
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3"
                asChild
              >
                <Link to="/transaction-archive">
                  <CircleDollarSign className="h-4 w-4 mr-3" />
                  Transactions
                </Link>
              </Button>
            </nav>
          </aside>
          
          <main className="flex-1">
            <div className="border-b border-primary/10 pb-4 mb-6">
              <h1 className="text-2xl font-mono">Welcome, {profileData.fullName}</h1>
              <p className="text-sm text-muted-foreground">Monitor your RFPs and financing opportunities.</p>
            </div>
            
            <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
              <TabsList className="bg-background/50">
                <TabsTrigger value="overview" className="font-mono text-xs">OVERVIEW</TabsTrigger>
                <TabsTrigger value="rfps" className="font-mono text-xs">ACTIVE RFPS</TabsTrigger>
                <TabsTrigger value="notifications" className="font-mono text-xs">NOTIFICATIONS</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-background/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-mono">ACTIVE RFPS</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-mono">{activeDeals.length}</div>
                      <p className="text-xs text-muted-foreground mt-1">Seeking capital</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-mono">MATCHED LENDERS</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-mono">{(nameValue % 8) + 2}</div>
                      <p className="text-xs text-muted-foreground mt-1">Interested in your RFPs</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-mono">FINANCING SECURED</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-mono">{financingAmount}</div>
                      <p className="text-xs text-muted-foreground mt-1">Across all RFPs</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-sm font-mono">ACTIVE RFPS</CardTitle>
                    <CardDescription>Your current financing requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activeDeals.map(deal => (
                        <div key={deal.id} className="border-b border-primary/10 pb-3 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-mono text-sm">{deal.name}</h3>
                              <p className="text-xs text-muted-foreground">{profileData.companyName}</p>
                            </div>
                            <div className="text-right">
                              <span className={`text-xs px-2 py-1 font-mono ${
                                deal.status === "Approved" ? "bg-green-100 text-green-800" : 
                                deal.status === "Review" ? "bg-amber-100 text-amber-800" : 
                                deal.status === "Pending" ? "bg-blue-100 text-blue-800" :
                                "bg-blue-100 text-blue-800"
                              }`}>
                                {deal.status}
                              </span>
                              <p className="text-xs font-mono mt-1">{deal.amount}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full font-mono text-xs rounded-none" asChild>
                      <Link to="/proposals-dashboard">
                        VIEW ALL RFPS
                        <ArrowUpRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-sm font-mono">PERFORMANCE METRICS</CardTitle>
                    <CardDescription>Your financing activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm">Completed RFPs</span>
                          </div>
                          <div className="text-2xl font-mono">{completedRFPs}</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-amber-500 mr-2" />
                            <span className="text-sm">Pending Review</span>
                          </div>
                          <div className="text-2xl font-mono">{pendingReviews}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="rfps" className="space-y-4">
                <Card className="bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-sm font-mono">ALL ACTIVE RFPS</CardTitle>
                    <CardDescription>Manage your financing requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activeDeals.length > 0 ? (
                        activeDeals.map(deal => (
                          <div key={deal.id} className="border-b border-primary/10 pb-4 last:border-0 last:pb-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-mono text-sm">{deal.name}</h3>
                                <p className="text-xs text-muted-foreground">{profileData.companyName}</p>
                                <p className="text-xs mt-1">Created on {new Date().toLocaleDateString()}</p>
                              </div>
                              <div className="text-right">
                                <span className={`text-xs px-2 py-1 font-mono ${
                                  deal.status === "Approved" ? "bg-green-100 text-green-800" : 
                                  deal.status === "Review" ? "bg-amber-100 text-amber-800" : 
                                  deal.status === "Pending" ? "bg-blue-100 text-blue-800" :
                                  "bg-blue-100 text-blue-800"
                                }`}>
                                  {deal.status}
                                </span>
                                <p className="text-xs font-mono mt-1">{deal.amount}</p>
                              </div>
                            </div>
                            <div className="mt-3 flex justify-end">
                              <Button variant="ghost" size="sm" className="text-xs">View Details</Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No active RFPs found.</p>
                          <Button className="mt-4" asChild>
                            <Link to="/create-proposal">Create Your First RFP</Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full font-mono text-xs rounded-none" asChild>
                      <Link to="/proposals-dashboard">
                        GO TO RFP DASHBOARD
                        <ArrowUpRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-4">
                <Card className="bg-background/50 backdrop-blur-sm">
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
                    <Button variant="outline" size="sm" className="w-full font-mono text-xs rounded-none">
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
