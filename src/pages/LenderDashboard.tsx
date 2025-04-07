
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LenderHeader from "@/components/lender/LenderHeader";
import LenderSidebar from "@/components/lender/LenderSidebar";
import OverviewTab from "@/components/lender/OverviewTab";
import DealsTab from "@/components/lender/DealsTab";
import NotificationsTab from "@/components/lender/NotificationsTab";

const LenderDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background text-foreground relative grid-bg">
      <div className="absolute inset-0 z-0">
        <div className="radar-pulse bg-blue-500/10"></div>
        <div className="radar-pulse bg-blue-500/10" style={{ animationDelay: "1s" }}></div>
        <div className="radar-pulse bg-blue-500/10" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <div className="scanline z-10"></div>
      
      <LenderHeader />
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-6">
          <LenderSidebar />
          
          <main className="flex-1">
            <div className="border-b border-primary/10 pb-4 mb-6">
              <h1 className="text-2xl font-mono">Lender Dashboard</h1>
              <p className="text-sm text-muted-foreground">Monitor your active deals and opportunities.</p>
            </div>
            
            <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
              <TabsList className="bg-background/50">
                <TabsTrigger value="overview" className="font-mono text-xs">OVERVIEW</TabsTrigger>
                <TabsTrigger value="deals" className="font-mono text-xs">ACTIVE DEALS</TabsTrigger>
                <TabsTrigger value="notifications" className="font-mono text-xs">NOTIFICATIONS</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <OverviewTab />
              </TabsContent>
              
              <TabsContent value="deals">
                <DealsTab />
              </TabsContent>
              
              <TabsContent value="notifications">
                <NotificationsTab />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LenderDashboard;
