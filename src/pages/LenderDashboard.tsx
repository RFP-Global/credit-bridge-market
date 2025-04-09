import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LenderHeader from "@/components/lender/LenderHeader";
import LenderSidebar from "@/components/lender/LenderSidebar";
import DealsTab from "@/components/lender/DealsTab";
import { Clock, CheckCircle, Eye } from "lucide-react";

const LenderDashboard = () => {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <div className="min-h-screen bg-background text-foreground relative grid-bg">
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
            
            <Tabs defaultValue="active" className="space-y-6" onValueChange={setActiveTab}>
              <TabsList className="bg-background/50">
                <TabsTrigger value="active" className="font-mono text-xs">
                  <Clock className="h-3.5 w-3.5 mr-2" />
                  ACTIVE DEALS
                </TabsTrigger>
                <TabsTrigger value="closed" className="font-mono text-xs">
                  <CheckCircle className="h-3.5 w-3.5 mr-2" />
                  CLOSED DEALS
                </TabsTrigger>
                <TabsTrigger value="watchlist" className="font-mono text-xs">
                  <Eye className="h-3.5 w-3.5 mr-2" />
                  WATCHLIST
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="active">
                <DealsTab type="active" />
              </TabsContent>
              
              <TabsContent value="closed">
                <DealsTab type="closed" />
              </TabsContent>
              
              <TabsContent value="watchlist">
                <DealsTab type="watchlist" />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LenderDashboard;
