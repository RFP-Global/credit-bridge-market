
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, ArrowRight, BarChart3, Shield, FileText, PieChart, Database, Layers } from "lucide-react";
import { Input } from "@/components/ui/input";

const Marketplace = () => {
  useEffect(() => {
    // Animation for sections as they come into view
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    document.querySelectorAll(".section-animate").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-foreground text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Credit Formation Marketplace</h1>
              <p className="text-xl opacity-90 mb-8">
                Connect with vetted lenders, create financing proposals, and receive competitive bids in real-time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Create New Proposal
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent border-white/20 hover:bg-white/10">
                  Browse Opportunities
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Marketplace Filters */}
        <section className="py-10 border-b">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search opportunities..." 
                  className="pl-10 w-full"
                />
              </div>
              
              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <Button variant="outline" size="sm" className="flex gap-2 items-center">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">Industry</Button>
                <Button variant="outline" size="sm">Amount</Button>
                <Button variant="outline" size="sm">Term Length</Button>
                <Button variant="outline" size="sm">Interest Rate</Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Live Opportunities */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">Live Opportunities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Opportunity Card 1 */}
              <Card className="hover:shadow-md transition-shadow border-primary/10 overflow-hidden section-animate">
                <div className="h-2 bg-primary"></div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Growth Capital</CardTitle>
                      <CardDescription>Manufacturing Industry</CardDescription>
                    </div>
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-1 border-b border-primary/10">
                      <span className="text-sm text-muted-foreground">Amount:</span>
                      <span className="font-medium">$2,500,000</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-primary/10">
                      <span className="text-sm text-muted-foreground">Target Terms:</span>
                      <span className="font-medium">7.2% - 8.5% APR</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-primary/10">
                      <span className="text-sm text-muted-foreground">Duration:</span>
                      <span className="font-medium">60 Months</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Current Bids:</span>
                      <span className="font-medium text-primary">3 Offers</span>
                    </div>
                    
                    <Button className="w-full">View Opportunity</Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Opportunity Card 2 */}
              <Card className="hover:shadow-md transition-shadow border-primary/10 overflow-hidden section-animate">
                <div className="h-2 bg-yellow-500"></div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Line of Credit</CardTitle>
                      <CardDescription>Technology Startup</CardDescription>
                    </div>
                    <Database className="h-5 w-5 text-yellow-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-1 border-b border-primary/10">
                      <span className="text-sm text-muted-foreground">Amount:</span>
                      <span className="font-medium">$750,000</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-primary/10">
                      <span className="text-sm text-muted-foreground">Target Terms:</span>
                      <span className="font-medium">8.2% - 9.0% APR</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-primary/10">
                      <span className="text-sm text-muted-foreground">Duration:</span>
                      <span className="font-medium">12 Months</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Current Bids:</span>
                      <span className="font-medium text-primary">5 Offers</span>
                    </div>
                    
                    <Button className="w-full">View Opportunity</Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Opportunity Card 3 */}
              <Card className="hover:shadow-md transition-shadow border-primary/10 overflow-hidden section-animate">
                <div className="h-2 bg-blue-500"></div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Equipment Finance</CardTitle>
                      <CardDescription>Healthcare Provider</CardDescription>
                    </div>
                    <Layers className="h-5 w-5 text-blue-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-1 border-b border-primary/10">
                      <span className="text-sm text-muted-foreground">Amount:</span>
                      <span className="font-medium">$1,200,000</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-primary/10">
                      <span className="text-sm text-muted-foreground">Target Terms:</span>
                      <span className="font-medium">6.8% - 7.5% APR</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-primary/10">
                      <span className="text-sm text-muted-foreground">Duration:</span>
                      <span className="font-medium">48 Months</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">Current Bids:</span>
                      <span className="font-medium text-primary">2 Offers</span>
                    </div>
                    
                    <Button className="w-full">View Opportunity</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                Load More Opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Live Bidding Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2 section-animate">
                <h2 className="text-3xl font-bold mb-4">Live Bidding Process</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Create financing proposals and receive real-time bids from qualified lenders. Compare offers, negotiate terms, and secure the best financing for your business.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-3 p-1 bg-primary/10 rounded-full text-primary">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Transparent Price Discovery</h4>
                      <p className="text-muted-foreground">Compare competing offers in real-time to find the best terms</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 p-1 bg-primary/10 rounded-full text-primary">
                      <PieChart className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Market Insights</h4>
                      <p className="text-muted-foreground">Gain access to historical transaction data for better decision making</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 p-1 bg-primary/10 rounded-full text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Streamlined Process</h4>
                      <p className="text-muted-foreground">Create, submit, and track loan proposals all in one place</p>
                    </div>
                  </li>
                </ul>
                <Button className="mt-6">
                  Start the Bidding Process
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="w-full md:w-1/2 section-animate">
                <div className="terminal-card overflow-hidden">
                  <div className="terminal-header">
                    <div className="terminal-dot bg-red-500"></div>
                    <div className="terminal-dot bg-yellow-500"></div>
                    <div className="terminal-dot bg-green-500"></div>
                    <div className="flex-1 text-center text-xs text-muted-foreground font-mono">LIVE BIDDING TERMINAL</div>
                  </div>
                  <div className="terminal-content">
                    <div className="mb-4 font-mono text-primary text-sm">
                      <span className="text-muted-foreground">&gt;</span> RFP-357 Live Bidding Session
                    </div>
                    <div className="text-xs font-mono text-muted-foreground mb-2">CURRENT BIDS</div>
                    
                    <div className="space-y-3">
                      <div className="bg-primary/5 border border-primary/20 p-3 rounded">
                        <div className="flex justify-between mb-2">
                          <span className="font-mono text-sm">LENDER-A</span>
                          <span className="font-mono text-primary">7.8% APR</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          60-month term, $25,000 origination fee, no prepayment penalty
                        </div>
                      </div>
                      
                      <div className="bg-primary/10 border border-primary p-3 rounded">
                        <div className="flex justify-between mb-2">
                          <span className="font-mono text-sm">LENDER-B</span>
                          <span className="font-mono text-primary font-semibold">7.5% APR</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          60-month term, $20,000 origination fee, 1% prepayment penalty
                        </div>
                      </div>
                      
                      <div className="bg-primary/5 border border-primary/20 p-3 rounded">
                        <div className="flex justify-between mb-2">
                          <span className="font-mono text-sm">LENDER-C</span>
                          <span className="font-mono text-primary">8.2% APR</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          60-month term, $15,000 origination fee, no prepayment penalty
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 font-mono text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>BIDDING CLOSES IN:</span>
                        <span className="text-primary">48:23:15</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
