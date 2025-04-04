
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import ActiveRFPsTab from "@/components/dashboard/ActiveRFPsTab";
import NotificationsTab from "@/components/dashboard/NotificationsTab";
import { useEnterpriseDashboard } from "@/hooks/useEnterpriseDashboard";

const EnterpriseDashboard = () => {
  const {
    activeTab,
    setActiveTab,
    profileData,
    isLoading,
    handleLogout,
    dashboardData
  } = useEnterpriseDashboard();

  if (isLoading || !profileData || !dashboardData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full mx-auto mb-4"></div>
          <p className="font-mono text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const { activeDeals, notifications, metrics } = dashboardData;

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
            activePage="dashboard"
            financingAmount={metrics.financingAmount}
            activeDealsCount={activeDeals.length}
          />
          
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
              
              <TabsContent value="overview">
                <DashboardOverview 
                  profileData={profileData}
                  activeDeals={activeDeals}
                  metrics={metrics}
                />
              </TabsContent>
              
              <TabsContent value="rfps">
                <ActiveRFPsTab 
                  companyName={profileData.companyName}
                  activeDeals={activeDeals}
                />
              </TabsContent>
              
              <TabsContent value="notifications">
                <NotificationsTab notifications={notifications} />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseDashboard;
