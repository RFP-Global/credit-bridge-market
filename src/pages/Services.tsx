
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Building2, BarChart3, FileText, Calculator, Database, Book, Shield, Lightbulb, CircleDollarSign, PieChart } from "lucide-react";

const Services = () => {
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Products & Services</h1>
              <p className="text-xl opacity-90 mb-8">
                Comprehensive tools and solutions to accelerate credit formation for businesses and lenders
              </p>
            </div>
          </div>
        </section>
        
        {/* Service Tabs */}
        <section className="py-10 border-b">
          <div className="container mx-auto px-6">
            <div className="flex overflow-x-auto pb-2 space-x-2 section-animate">
              <Button variant="outline" className="rounded-full px-6 flex-shrink-0 bg-primary/5 border-primary/30">
                <Briefcase className="h-4 w-4 mr-2" />
                For Businesses
              </Button>
              <Button variant="outline" className="rounded-full px-6 flex-shrink-0">
                <Building2 className="h-4 w-4 mr-2" />
                For Lenders
              </Button>
              <Button variant="outline" className="rounded-full px-6 flex-shrink-0">
                <Database className="h-4 w-4 mr-2" />
                Marketplace
              </Button>
              <Button variant="outline" className="rounded-full px-6 flex-shrink-0">
                <Calculator className="h-4 w-4 mr-2" />
                Tools
              </Button>
              <Button variant="outline" className="rounded-full px-6 flex-shrink-0">
                <Book className="h-4 w-4 mr-2" />
                Education
              </Button>
            </div>
          </div>
        </section>
        
        {/* Business Services */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="flex items-center mb-12 section-animate">
              <Briefcase className="h-6 w-6 mr-3 text-primary" />
              <h2 className="text-3xl font-bold">For Businesses</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <Card className="border-primary/10 hover:shadow-md transition-shadow section-animate">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Marketplace Access</CardTitle>
                  <CardDescription>Connect with qualified lenders and receive competitive bids</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Create financing proposals and shop them on the platform
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Compare bids from interested credit providers in real-time
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Access to nationwide lenders outside your local geography
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Gain market insights from other platform transactions
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              
              {/* Card 2 */}
              <Card className="border-primary/10 hover:shadow-md transition-shadow section-animate">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Credit Facility Builder</CardTitle>
                  <CardDescription>Design and optimize your ideal financing structure</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      AI-powered loan projections based on your company profile
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Receive success probability ratings from 5% to 95%
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Get suggestions to make your proposal more competitive
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Forecast the cash flow impact of different loan structures
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              
              {/* Card 3 */}
              <Card className="border-primary/10 hover:shadow-md transition-shadow section-animate">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Document Warehouse</CardTitle>
                  <CardDescription>Secure storage and management of critical documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Store all pertinent financial data for investor review
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Access credit scores without additional credit pulls
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      AI Agreement Synthesizer to analyze credit agreements
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Organized interactive data room for efficient due diligence
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Lender Services */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-6">
            <div className="flex items-center mb-12 section-animate">
              <Building2 className="h-6 w-6 mr-3 text-primary" />
              <h2 className="text-3xl font-bold">For Lenders</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <Card className="border-primary/10 hover:shadow-md transition-shadow section-animate">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Qualified Deal Flow</CardTitle>
                  <CardDescription>Access pre-approved businesses seeking financing</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Exclusive access to pre-approved prospective borrowers
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Interact with businesses from diverse industries
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Set pre-screening criteria for compatible matches
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Reduce time spent on unqualified leads
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              
              {/* Card 2 */}
              <Card className="border-primary/10 hover:shadow-md transition-shadow section-animate">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Database className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Data Room</CardTitle>
                  <CardDescription>Gain valuable market insights and analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Access to historical transaction data and trends
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Advanced analytics on transaction characteristics
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Track loan performance, delinquency and pre-payment data
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Identify top-performing sectors and asset classes
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              
              {/* Card 3 */}
              <Card className="border-primary/10 hover:shadow-md transition-shadow section-animate">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Match Maker</CardTitle>
                  <CardDescription>Find ideal borrowers that match your criteria</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Store and update your borrower parameters
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      View a ledger of businesses with 5-100% match rates
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Receive notifications when qualified businesses join
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      Scale credit operations with minimal investment
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Educational Tools */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="flex items-center mb-12 section-animate">
              <Book className="h-6 w-6 mr-3 text-primary" />
              <h2 className="text-3xl font-bold">Educational Tools</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 section-animate">
              {/* Feature 1 */}
              <Card className="border-primary/10 hover:shadow-md transition-shadow flex flex-col">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Book className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Credit Education Center</CardTitle>
                  <CardDescription>Comprehensive resources to understand business credit</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-6">
                    Access tutorials, videos, and guides explaining the mechanics and tactics of credit and various credit facilities available to businesses. Our educational materials help you make informed decisions and navigate the lending landscape effectively.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">Video Tutorials</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">Credit Guides</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">Case Studies</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">Loan Structures</span>
                  </div>
                  <Button variant="outline" className="w-full mt-auto">
                    Explore Resources
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              
              {/* Feature 2 */}
              <Card className="border-primary/10 hover:shadow-md transition-shadow flex flex-col">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <PieChart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Loan Tracker Visualization</CardTitle>
                  <CardDescription>Visualize and manage your loan repayment process</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-6">
                    Our interactive visualization tool helps you track your loan repayment progress with clear visuals showing interest paid to date, principal paid, upcoming payment schedules, and overall loan health. Stay on top of your financial obligations with comprehensive payment tracking.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">Payment Timeline</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">Interest Analytics</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">Principal Tracking</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">Payment Reminders</span>
                  </div>
                  <Button variant="outline" className="w-full mt-auto">
                    See Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-foreground text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center section-animate">
              <CircleDollarSign className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Financing Journey?</h2>
              <p className="text-xl opacity-90 mb-8">
                Join RFP Global today and gain access to our comprehensive suite of tools designed to optimize your credit financing experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Register As Business
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent border-white/20 hover:bg-white/10">
                  Register As Lender
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
