
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, BarChart3, FileText, Calculator, Target, Lightbulb, Users, CheckCircle, Terminal } from "lucide-react";

const HowItWorks = () => {
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
            <div className="max-w-3xl mx-auto text-center section-animate">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">How RFP Global Works</h1>
              <p className="text-xl opacity-90 mb-8">
                Our platform connects businesses with lenders through a transparent, 
                efficient marketplace designed to optimize financing outcomes.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Process Overview */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 section-animate">
              <h2 className="text-3xl font-bold mb-4">The RFP Global Process</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our streamlined process makes it easy for businesses to find the right financing 
                and for lenders to discover qualified borrowers.
              </p>
            </div>
            
            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                {/* Step 1 */}
                <div className="md:text-right section-animate relative">
                  <div className="hidden md:block absolute right-0 top-5 w-5 h-5 rounded-full bg-primary -translate-y-1/2 translate-x-[calc(50%+24px)]"></div>
                  <div className="md:inline-flex md:float-right items-center bg-primary/10 px-4 py-2 rounded-full text-primary font-medium text-sm mb-4">
                    <Shield className="h-4 w-4 md:ml-2 md:mr-0 mr-2" order-1 md:order-2 />
                    <span className="order-2 md:order-1">Step 1: Qualification</span>
                  </div>
                  <div className="clear-both"></div>
                  <h3 className="text-2xl font-bold mb-4">Underwriting & Qualification</h3>
                  <p className="text-muted-foreground mb-6">
                    Businesses and lenders undergo a thorough qualification examination and underwriting process.
                    Both parties upload key financial, legal, and tax documentation to ensure compliance with
                    KYC and AML standards.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Key Components:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start md:justify-end">
                        <span className="md:order-2 text-sm md:text-right">Financial documentation review</span>
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 md:ml-2 mr-2 md:mr-0 md:order-1" />
                      </li>
                      <li className="flex items-start md:justify-end">
                        <span className="md:order-2 text-sm md:text-right">KYC and AML verification</span>
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 md:ml-2 mr-2 md:mr-0 md:order-1" />
                      </li>
                      <li className="flex items-start md:justify-end">
                        <span className="md:order-2 text-sm md:text-right">Business legitimacy confirmation</span>
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 md:ml-2 mr-2 md:mr-0 md:order-1" />
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Step 1 Image */}
                <div className="md:pl-12 flex items-center justify-center section-animate relative">
                  <div className="hidden md:block absolute left-0 top-5 w-5 h-5 rounded-full bg-primary -translate-y-1/2 -translate-x-[calc(50%+24px)]"></div>
                  <div className="bg-muted/50 rounded-lg p-6 w-full">
                    <div className="flex items-center justify-center bg-foreground text-white p-8 rounded-lg">
                      <div className="text-center">
                        <Shield className="h-16 w-16 mx-auto mb-4 text-primary" />
                        <h4 className="text-xl font-semibold mb-2">Secure Verification</h4>
                        <p className="opacity-80">
                          Our thorough qualification process ensures only legitimate businesses 
                          and lenders participate in the marketplace.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 2 Image */}
                <div className="md:pr-12 flex items-center justify-center order-4 md:order-3 section-animate relative">
                  <div className="hidden md:block absolute right-0 top-5 w-5 h-5 rounded-full bg-primary -translate-y-1/2 translate-x-[calc(50%+24px)]"></div>
                  <div className="bg-muted/50 rounded-lg p-6 w-full">
                    <div className="flex items-center justify-center bg-foreground text-white p-8 rounded-lg">
                      <div className="text-center">
                        <Terminal className="h-16 w-16 mx-auto mb-4 text-primary" />
                        <h4 className="text-xl font-semibold mb-2">Live Marketplace</h4>
                        <p className="opacity-80">
                          Our interactive terminal enables transparent, real-time bidding 
                          and negotiation between businesses and lenders.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="order-3 md:order-4 section-animate relative">
                  <div className="hidden md:block absolute left-0 top-5 w-5 h-5 rounded-full bg-primary -translate-y-1/2 -translate-x-[calc(50%+24px)]"></div>
                  <div className="inline-flex items-center bg-primary/10 px-4 py-2 rounded-full text-primary font-medium text-sm mb-4">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    <span>Step 2: Marketplace</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">The Live Marketplace</h3>
                  <p className="text-muted-foreground mb-6">
                    Our live marketplace is rooted in free-market principles, allowing for honest price discovery 
                    through unbridled transparency and intellectual leverage. Enterprise customers craft credit 
                    facility proposals and present them to our network of credit providers.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Key Features:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                        <span className="text-sm">Interactive proposal creation and posting</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                        <span className="text-sm">Real-time bid comparison and counterbidding</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                        <span className="text-sm">Access to historical transaction data</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="md:text-right order-5 section-animate relative">
                  <div className="hidden md:block absolute right-0 top-5 w-5 h-5 rounded-full bg-primary -translate-y-1/2 translate-x-[calc(50%+24px)]"></div>
                  <div className="md:inline-flex md:float-right items-center bg-primary/10 px-4 py-2 rounded-full text-primary font-medium text-sm mb-4">
                    <Calculator className="h-4 w-4 md:ml-2 md:mr-0 mr-2" order-1 md:order-2 />
                    <span className="order-2 md:order-1">Step 3: Tools & Services</span>
                  </div>
                  <div className="clear-both"></div>
                  <h3 className="text-2xl font-bold mb-4">Ancillary Products & Services</h3>
                  <p className="text-muted-foreground mb-6">
                    We offer a suite of concierge products and services that complement the marketplace, 
                    fostering a deeper understanding of enterprise lending and providing tools to help 
                    prepare for and navigate credit facilities.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Available Tools:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start md:justify-end">
                        <span className="md:order-2 text-sm md:text-right">Credit Facility Builder</span>
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 md:ml-2 mr-2 md:mr-0 md:order-1" />
                      </li>
                      <li className="flex items-start md:justify-end">
                        <span className="md:order-2 text-sm md:text-right">Term Sheet Synthesizer</span>
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 md:ml-2 mr-2 md:mr-0 md:order-1" />
                      </li>
                      <li className="flex items-start md:justify-end">
                        <span className="md:order-2 text-sm md:text-right">Loan Tracker Visualization</span>
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 md:ml-2 mr-2 md:mr-0 md:order-1" />
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Step 3 Image */}
                <div className="md:pl-12 flex items-center justify-center order-6 section-animate relative">
                  <div className="hidden md:block absolute left-0 top-5 w-5 h-5 rounded-full bg-primary -translate-y-1/2 -translate-x-[calc(50%+24px)]"></div>
                  <div className="bg-muted/50 rounded-lg p-6 w-full">
                    <div className="flex items-center justify-center bg-foreground text-white p-8 rounded-lg">
                      <div className="text-center">
                        <Lightbulb className="h-16 w-16 mx-auto mb-4 text-primary" />
                        <h4 className="text-xl font-semibold mb-2">Intellectual Leverage</h4>
                        <p className="opacity-80">
                          Our suite of tools helps businesses understand and optimize their 
                          financing options for better outcomes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 4 Image */}
                <div className="md:pr-12 flex items-center justify-center order-8 md:order-7 section-animate relative">
                  <div className="hidden md:block absolute right-0 top-5 w-5 h-5 rounded-full bg-primary -translate-y-1/2 translate-x-[calc(50%+24px)]"></div>
                  <div className="bg-muted/50 rounded-lg p-6 w-full">
                    <div className="flex items-center justify-center bg-foreground text-white p-8 rounded-lg">
                      <div className="text-center">
                        <Target className="h-16 w-16 mx-auto mb-4 text-primary" />
                        <h4 className="text-xl font-semibold mb-2">Optimized Matching</h4>
                        <p className="opacity-80">
                          Our AI-powered matching algorithms ensure businesses find the right 
                          lenders based on compatibility and preferences.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="order-7 md:order-8 section-animate relative">
                  <div className="hidden md:block absolute left-0 top-5 w-5 h-5 rounded-full bg-primary -translate-y-1/2 -translate-x-[calc(50%+24px)]"></div>
                  <div className="inline-flex items-center bg-primary/10 px-4 py-2 rounded-full text-primary font-medium text-sm mb-4">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Step 4: Matchmaking</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Counterparty Matching</h3>
                  <p className="text-muted-foreground mb-6">
                    Our AI-powered underwriting algorithm analyzes enterprise member data and generates a 
                    lender-specific compatibility score based on the lender's policies, portfolio parameters, 
                    and exposure aspirations.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Matching Benefits:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                        <span className="text-sm">Businesses find appropriate lenders faster</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                        <span className="text-sm">Lenders receive high-quality, pre-qualified leads</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                        <span className="text-sm">Improved loan success rates and reduced friction</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* For Businesses Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-6">
            <div className="flex items-center mb-12 section-animate">
              <Briefcase className="h-6 w-6 mr-3 text-primary" />
              <h2 className="text-3xl font-bold">For Businesses</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="order-2 lg:order-1 section-animate">
                <h3 className="text-2xl font-bold mb-6">How Businesses Benefit</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Create and Post Financing Proposals</h4>
                      <p className="text-muted-foreground text-sm">
                        Design your ideal credit facility and post it to our marketplace
                        where qualified lenders can review and bid on your proposal.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Receive and Compare Competitive Bids</h4>
                      <p className="text-muted-foreground text-sm">
                        Receive multiple offers from interested lenders and compare terms
                        in real-time to find the best financing solution for your business.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Access Educational Resources</h4>
                      <p className="text-muted-foreground text-sm">
                        Utilize our comprehensive educational materials to better understand
                        credit mechanics, facility types, and financing strategies.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Calculator className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Use AI-Powered Tools</h4>
                      <p className="text-muted-foreground text-sm">
                        Leverage our Credit Facility Builder, Term Sheet Synthesizer, and
                        Loan Tracker to optimize your financing journey from start to finish.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button className="mt-8">
                  Register as a Business
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="order-1 lg:order-2 section-animate">
                <div className="terminal-card overflow-hidden">
                  <div className="terminal-header">
                    <div className="terminal-dot bg-red-500"></div>
                    <div className="terminal-dot bg-yellow-500"></div>
                    <div className="terminal-dot bg-green-500"></div>
                    <div className="flex-1 text-center text-xs text-muted-foreground font-mono">BUSINESS WORKFLOW</div>
                  </div>
                  <div className="terminal-content">
                    <div className="mb-4 font-mono text-primary text-sm">
                      <span className="text-muted-foreground">&gt;</span> Business Financing Pathway
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="border border-primary/20 p-3 rounded font-mono text-xs">
                        <div className="text-primary mb-1">1. QUALIFICATION</div>
                        <div className="text-muted-foreground">Upload financial documents</div>
                        <div className="text-muted-foreground">Complete KYC verification</div>
                        <div className="text-green-500">✓ Account Approved</div>
                      </div>
                      
                      <div className="border border-primary/20 p-3 rounded font-mono text-xs">
                        <div className="text-primary mb-1">2. CREATE PROPOSAL</div>
                        <div className="text-muted-foreground">Amount: $2,500,000</div>
                        <div className="text-muted-foreground">Term: 60 months</div>
                        <div className="text-muted-foreground">Purpose: Equipment expansion</div>
                        <div className="text-green-500">✓ Proposal Published</div>
                      </div>
                      
                      <div className="border border-primary/20 p-3 rounded font-mono text-xs">
                        <div className="text-primary mb-1">3. RECEIVE BIDS</div>
                        <div className="text-muted-foreground">Lender A: 7.8% APR</div>
                        <div className="text-muted-foreground">Lender B: 7.5% APR</div>
                        <div className="text-muted-foreground">Lender C: 8.2% APR</div>
                        <div className="text-yellow-500">⟳ Active Bidding (48h remaining)</div>
                      </div>
                      
                      <div className="border border-primary/20 p-3 rounded font-mono text-xs">
                        <div className="text-primary mb-1">4. SELECT LENDER</div>
                        <div className="text-muted-foreground">Review terms</div>
                        <div className="text-muted-foreground">Compare offers</div>
                        <div className="text-muted-foreground">Select financing partner</div>
                        <div className="text-primary/50 blink">_ Pending Selection</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-foreground text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center section-animate">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Financing Journey?</h2>
              <p className="text-xl opacity-90 mb-8">
                Join RFP Global today and access a marketplace designed to find you the best financing 
                options for your business needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Register as Business
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent border-white/20 hover:bg-white/10">
                  Register as Lender
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

export default HowItWorks;
