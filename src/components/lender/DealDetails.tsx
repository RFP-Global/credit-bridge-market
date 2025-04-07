
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import DealHeader from "@/components/lender/DealHeader";
import DealOverviewTab from "@/components/lender/tabs/DealOverviewTab";
import DealFinancialsTab from "@/components/lender/tabs/DealFinancialsTab";
import DealCompanyTab from "@/components/lender/tabs/DealCompanyTab";
import DealHistoryTab from "@/components/lender/tabs/DealHistoryTab";

const DealDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dealType, dealData } = location.state || {};
  
  if (!dealData) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <Building className="h-16 w-16 text-primary/20 mb-4" />
        <h2 className="text-2xl font-mono mb-2">Deal Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The deal information could not be loaded. Please try again.
        </p>
        <Button 
          variant="outline" 
          onClick={() => navigate("/lender-dashboard")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 relative">
      <div className="absolute inset-0 bg-grid-pattern bg-grid-size opacity-20 pointer-events-none" />
      
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 pt-24 relative z-10">
        <Button 
          variant="outline" 
          size="sm" 
          className="mb-4"
          onClick={() => navigate("/lender-dashboard")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <DealHeader 
          dealData={dealData} 
          dealType={dealType} 
        />
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="font-mono text-xs">OVERVIEW</TabsTrigger>
            <TabsTrigger value="financials" className="font-mono text-xs">FINANCIALS</TabsTrigger>
            <TabsTrigger value="company" className="font-mono text-xs">COMPANY INFO</TabsTrigger>
            <TabsTrigger value="history" className="font-mono text-xs">HISTORY</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <DealOverviewTab dealData={dealData} dealType={dealType} />
          </TabsContent>
          
          <TabsContent value="financials">
            <DealFinancialsTab dealData={dealData} />
          </TabsContent>
          
          <TabsContent value="company">
            <DealCompanyTab dealData={dealData} />
          </TabsContent>
          
          <TabsContent value="history">
            <DealHistoryTab dealData={dealData} dealType={dealType} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DealDetails;
