import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Download, Settings, Filter, Terminal, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import BusinessSizeAnalytics from "@/components/intelligence/BusinessSizeAnalytics";
import IndustryTypeAnalytics from "@/components/intelligence/IndustryTypeAnalytics";
import BusinessStructureAnalytics from "@/components/intelligence/BusinessStructureAnalytics";
import GeographyAnalytics from "@/components/intelligence/GeographyAnalytics";
import { COLORS } from "@/components/charts/ChartUtils";

// Mock data for the charts
const businessSizeData = [
  { name: 'Small Business', pending: 45, approved: 78, rejected: 23, rate: 0.32 },
  { name: 'Medium Business', approved: 65, pending: 32, rejected: 12, rate: 0.36 },
  { name: 'Large Business', approved: 88, pending: 45, rejected: 34, rate: 0.32 }
];

const pieBusinessSizeData = [
  { name: 'Small Business', value: 40 },
  { name: 'Medium Business', value: 25 },
  { name: 'Large Business', value: 35 }
];

const industryData = [
  { name: 'Manufacturing', value: 30, color: '#33bbef' },
  { name: 'Construction', value: 25, color: '#8B5CF6' },
  { name: 'Tech', value: 20, color: '#10b981' },
  { name: 'Retail', value: 15, color: '#F97316' },
  { name: 'Healthcare', value: 10, color: '#fbd024' }
];

const industryPieData = [
  { name: 'Manufacturing', value: 22 },
  { name: 'Construction', value: 28 },
  { name: 'Tech', value: 22 },
  { name: 'Retail', value: 18 },
  { name: 'Healthcare', value: 10 }
];

const industryStackedData = [
  { 
    name: 'Manufacturing', 
    workingCapital: 200, 
    expansion: 300, 
    equipment: 150, 
    other: 100 
  },
  { 
    name: 'Construction', 
    workingCapital: 150, 
    expansion: 250, 
    equipment: 200, 
    other: 180 
  },
  { 
    name: 'Tech', 
    workingCapital: 100, 
    expansion: 200, 
    equipment: 150, 
    other: 120 
  },
  { 
    name: 'Retail', 
    workingCapital: 120, 
    expansion: 180, 
    equipment: 90, 
    other: 60 
  },
  { 
    name: 'Healthcare', 
    workingCapital: 80, 
    expansion: 120, 
    equipment: 70, 
    other: 50 
  }
];

const timeSeriesData = [
  { month: 'Jan', small: 20, medium: 30, large: 45 },
  { month: 'Feb', small: 25, medium: 35, large: 50 },
  { month: 'Mar', small: 30, medium: 40, large: 55 },
  { month: 'Apr', small: 35, medium: 45, large: 60 },
  { month: 'May', small: 40, medium: 50, large: 65 },
  { month: 'Jun', small: 45, medium: 55, large: 40 }
];

const loanRequestData = [
  { name: 'Small', pending: 40, approved: 75, rejected: 20 },
  { name: 'Medium', pending: 35, approved: 60, rejected: 25 },
  { name: 'Large', pending: 55, approved: 80, rejected: 30 }
];

const loanApprovalData = [
  { category: 'Small Business', approved: 65, rejected: 35 },
  { category: 'Medium Business', approved: 78, rejected: 22 },
  { category: 'Large Business', approved: 85, rejected: 15 }
];

const structureData = [
  { type: 'LLC', workingCapital: 42, expansion: 35, equipment: 23, rate: 7.5 },
  { type: 'Corporate', workingCapital: 28, expansion: 45, equipment: 32, rate: 6.2 },
  { type: 'Partnership', workingCapital: 30, expansion: 25, equipment: 28, rate: 8.1 }
];

const structureLoanTermData = [
  { month: 'Jan', llc: 30, corporate: 45, partnership: 25 },
  { month: 'Feb', llc: 35, corporate: 50, partnership: 30 },
  { month: 'Mar', llc: 45, corporate: 40, partnership: 35 },
  { month: 'Apr', llc: 40, corporate: 35, partnership: 30 },
  { month: 'May', llc: 30, corporate: 30, partnership: 35 },
  { month: 'Jun', llc: 35, corporate: 25, partnership: 30 }
];

const Intelligence = () => {
  const [timeFilter, setTimeFilter] = useState("last-year");
  const [scanline, setScanline] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {scanline && <div className="scanline"></div>}
      <div className="radar-pulse"></div>
      <Navbar />
      
      <div className="container mx-auto px-6 py-16 mt-16 section-animate">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Terminal className="h-6 w-6 mr-3 text-primary" />
            <h1 className="text-3xl font-typewriter tracking-tighter">
              INTELLIGENCE_DASHBOARD
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              className="flex items-center h-10 bg-background/60 border-primary/30 text-foreground/80 hover:bg-primary/10 font-mono text-sm"
            >
              <Filter className="h-4 w-4 mr-2" />
              FILTER
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center h-10 bg-background/60 border-primary/30 text-foreground/80 hover:bg-primary/10 font-mono text-sm"
            >
              <Download className="h-4 w-4 mr-2" />
              EXPORT
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center h-10 bg-background/60 border-primary/30 text-foreground/80 hover:bg-primary/10 font-mono text-sm"
            >
              <Settings className="h-4 w-4 mr-2" />
              CONFIG
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => setScanline(!scanline)}
              className="flex items-center h-10 bg-background/60 border-primary/30 text-foreground/80 hover:bg-primary/10 font-mono text-sm"
            >
              <Shield className="h-4 w-4 mr-2" />
              {scanline ? "HIDE_SCAN" : "SHOW_SCAN"}
            </Button>
          </div>
        </div>

        <div className="terminal-card mb-6 section-animate">
          <div className="terminal-header">
            <div className="terminal-dot bg-destructive"></div>
            <div className="terminal-dot bg-accent"></div>
            <div className="terminal-dot bg-primary"></div>
            <span className="ml-2 text-xs font-mono text-foreground/80">terminal@intelligence-system</span>
          </div>
          <div className="terminal-content font-mono text-sm text-foreground/80">
            <div className="mb-1">$ initializing intelligence protocol...</div>
            <div className="mb-1">$ analyzing market vectors...</div>
            <div className="mb-1">$ decrypting trend patterns...</div>
            <div className="mb-1 blink">$ system_ready_</div>
          </div>
        </div>

        <Tabs defaultValue="business" className="w-full">
          <TabsList className="mb-4 bg-background/40 border border-primary/20">
            <TabsTrigger 
              value="business" 
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-mono text-sm"
            >
              MARKET_INTELLIGENCE
            </TabsTrigger>
          </TabsList>

          <div className="space-y-4 section-animate">
            <BusinessSizeAnalytics 
              timeFilter={timeFilter}
              onTimeFilterChange={setTimeFilter}
              loanRequestData={loanRequestData}
              pieBusinessSizeData={pieBusinessSizeData}
              timeSeriesData={timeSeriesData}
              loanApprovalData={loanApprovalData}
            />

            <IndustryTypeAnalytics 
              timeFilter={timeFilter}
              onTimeFilterChange={setTimeFilter}
              industryStackedData={industryStackedData}
              industryData={industryData}
              industryLoanTermData={industryLoanTermData}
              industryPieData={industryPieData}
            />

            <BusinessStructureAnalytics 
              timeFilter={timeFilter}
              onTimeFilterChange={setTimeFilter}
              structureData={structureData}
              structureLoanTermData={structureLoanTermData}
            />

            <GeographyAnalytics 
              timeFilter={timeFilter}
              onTimeFilterChange={setTimeFilter}
            />
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Intelligence;
