
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Shield, Filter, ArrowUpRight, Clock, TrendingUp, BarChart3, FileText } from "lucide-react";

const marketplaceData = [
  {
    id: "RFP-001",
    title: "Expansion Capital",
    amount: "$2,500,000",
    term: "60 months",
    industry: "Technology",
    useOfFunds: "Working Capital",
    status: "Open",
    posted: "2d ago",
    applications: 8,
    rating: "A+"
  },
  {
    id: "RFP-002",
    title: "Manufacturing Equipment",
    amount: "$750,000",
    term: "48 months",
    industry: "Manufacturing",
    useOfFunds: "Equipment Purchase",
    status: "Open",
    posted: "5d ago",
    applications: 12,
    rating: "A"
  },
  {
    id: "RFP-003",
    title: "Real Estate Acquisition",
    amount: "$5,000,000",
    term: "120 months",
    industry: "Real Estate",
    useOfFunds: "Property Acquisition",
    status: "Open",
    posted: "1d ago",
    applications: 3,
    rating: "A-"
  },
  {
    id: "RFP-004",
    title: "Inventory Financing",
    amount: "$350,000",
    term: "12 months",
    industry: "Retail",
    useOfFunds: "Inventory",
    status: "Open",
    posted: "7d ago",
    applications: 15,
    rating: "B+"
  },
  {
    id: "RFP-005",
    title: "Healthcare Equipment",
    amount: "$1,200,000",
    term: "36 months",
    industry: "Healthcare",
    useOfFunds: "Equipment Purchase",
    status: "Open",
    posted: "3d ago",
    applications: 6,
    rating: "A"
  }
];

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <div className="inline-block mb-2">
              <span className="rfp-badge">
                <Shield className="h-3 w-3 mr-2" />
                Marketplace
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2">
              RFP Marketplace
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Browse and respond to active Requests for Proposals from businesses seeking optimal financing solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-3">
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <TabsList className="mb-4 md:mb-0 bg-background border">
                    <TabsTrigger value="all" className="text-xs font-mono">ALL RFPs</TabsTrigger>
                    <TabsTrigger value="recommended" className="text-xs font-mono">RECOMMENDED</TabsTrigger>
                    <TabsTrigger value="trending" className="text-xs font-mono">TRENDING</TabsTrigger>
                    <TabsTrigger value="new" className="text-xs font-mono">NEWEST</TabsTrigger>
                  </TabsList>
                  
                  <Button variant="outline" size="sm" className="font-mono text-xs">
                    <Filter className="mr-2 h-3 w-3" />
                    FILTERS
                  </Button>
                </div>
                
                <TabsContent value="all" className="mt-0">
                  <div className="overflow-hidden rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="font-mono text-xs w-[100px]">RFP ID</TableHead>
                          <TableHead className="font-mono text-xs">TITLE</TableHead>
                          <TableHead className="font-mono text-xs">AMOUNT</TableHead>
                          <TableHead className="font-mono text-xs">TERM</TableHead>
                          <TableHead className="font-mono text-xs">INDUSTRY</TableHead>
                          <TableHead className="font-mono text-xs">STATUS</TableHead>
                          <TableHead className="font-mono text-xs text-right">ACTION</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {marketplaceData.map((item) => (
                          <TableRow key={item.id} className="hover:bg-muted/80 cursor-pointer">
                            <TableCell className="font-mono text-xs">{item.id}</TableCell>
                            <TableCell className="font-medium">{item.title}</TableCell>
                            <TableCell>{item.amount}</TableCell>
                            <TableCell>{item.term}</TableCell>
                            <TableCell>{item.industry}</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                {item.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm">
                                View
                                <ArrowUpRight className="ml-2 h-3 w-3" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <Pagination className="mt-4">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </TabsContent>
                
                <TabsContent value="recommended" className="mt-0">
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-muted-foreground">Personalized recommendations will appear here based on your preferences and history.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="trending" className="mt-0">
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-muted-foreground">Currently trending RFPs will appear here.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="new" className="mt-0">
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-muted-foreground">The newest RFPs will appear here.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="space-y-6">
              <Card className="border-primary/30">
                <CardHeader className="pb-3 border-b border-primary/20 bg-muted/30">
                  <CardTitle className="text-sm font-mono">MARKETPLACE STATS</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground font-mono flex items-center">
                        <FileText className="h-3 w-3 mr-2" />
                        ACTIVE RFPs
                      </span>
                      <span className="font-semibold">128</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground font-mono flex items-center">
                        <TrendingUp className="h-3 w-3 mr-2" />
                        TOTAL VOLUME
                      </span>
                      <span className="font-semibold">$47.2M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground font-mono flex items-center">
                        <Clock className="h-3 w-3 mr-2" />
                        AVG RESPONSE TIME
                      </span>
                      <span className="font-semibold">2.3 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground font-mono flex items-center">
                        <BarChart3 className="h-3 w-3 mr-2" />
                        FUNDED RATE
                      </span>
                      <span className="font-semibold">72%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-primary/30">
                <CardHeader className="pb-3 border-b border-primary/20 bg-muted/30">
                  <CardTitle className="text-sm font-mono">RESOURCES</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <NavigationMenu orientation="vertical" className="w-full max-w-none">
                    <NavigationMenuList className="flex-col space-y-2 w-full">
                      <NavigationMenuItem className="w-full">
                        <NavigationMenuLink 
                          className={`${navigationMenuTriggerStyle()} w-full justify-start text-left text-sm font-mono`}
                          href="#"
                        >
                          RFP Guidelines
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem className="w-full">
                        <NavigationMenuLink 
                          className={`${navigationMenuTriggerStyle()} w-full justify-start text-left text-sm font-mono`}
                          href="#"
                        >
                          Submission Requirements
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem className="w-full">
                        <NavigationMenuLink 
                          className={`${navigationMenuTriggerStyle()} w-full justify-start text-left text-sm font-mono`}
                          href="#"
                        >
                          Due Diligence Process
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem className="w-full">
                        <NavigationMenuLink 
                          className={`${navigationMenuTriggerStyle()} w-full justify-start text-left text-sm font-mono`}
                          href="#"
                        >
                          FAQ
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
