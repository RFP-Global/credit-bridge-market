
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, BarChart3, Building2, Target, Check, Users, TrendingUp, Award, Lightbulb } from "lucide-react";

const About = () => {
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
        <section className="py-20 bg-foreground text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center section-animate">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About RFP Global</h1>
              <p className="text-xl opacity-90 mb-8">
                We're revolutionizing the credit formation ecosystem through transparency, 
                technology, and trust.
              </p>
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="section-animate">
                <div className="inline-flex items-center bg-primary/10 px-4 py-2 rounded-full text-primary font-medium text-sm mb-4">
                  <Shield className="h-4 w-4 mr-2" />
                  Our Mission
                </div>
                <h2 className="text-3xl font-bold mb-6">Transforming Credit Formation</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  RFP Global is committed to improving the entrepreneurial journey and accelerating the transformation 
                  velocity of business aspirations into productive enterprises by providing a synthesized credit formation 
                  ecosystem rooted in free market principles.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  We equip small businesses and lenders with an affordable, efficient, and transparent marketplace 
                  solution to accelerate credit financing results through enhanced counterparty connectivity, 
                  price discovery, and intellectual leverage.
                </p>
                <Button className="mt-4">
                  Learn About Our Approach
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-6 section-animate">
                <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                  <BarChart3 className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Transparent Marketplace</h3>
                  <p className="text-muted-foreground">Enabling honest price discovery through unbridled transparency</p>
                </div>
                <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                  <Building2 className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Business Empowerment</h3>
                  <p className="text-muted-foreground">Helping SMBs optimize their cost-of-capital efficiently</p>
                </div>
                <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                  <Target className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Intellectual Leverage</h3>
                  <p className="text-muted-foreground">Providing tools and insights for better financing decisions</p>
                </div>
                <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                  <Lightbulb className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Innovation Focus</h3>
                  <p className="text-muted-foreground">Reimagining credit formation with AI and technology</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* What Makes Us Different */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 section-animate">
              <h2 className="text-3xl font-bold mb-4">What Makes Us Different</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We focus on the borrower's experience as much as the lender's, creating a truly 
                balanced marketplace that benefits both sides of the credit formation equation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 section-animate">
              <div className="bg-background p-6 rounded-lg shadow-sm border border-primary/10">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Borrower-Centric Approach</h3>
                <p className="text-muted-foreground mb-4">
                  Unlike competitors who focus primarily on lenders, we prioritize the borrower's experience 
                  and needs, creating better outcomes for all parties involved.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2 mt-0.5" />
                    <span className="text-sm">Enhanced confidence in navigating credit formation</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2 mt-0.5" />
                    <span className="text-sm">Tools to understand credit value and options</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border border-primary/10">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Live Primary Marketplace</h3>
                <p className="text-muted-foreground mb-4">
                  We offer a genuine live marketplace where pre-qualified borrowers and lenders can connect 
                  directly to improve capital formation outcomes.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2 mt-0.5" />
                    <span className="text-sm">Real-time bidding and negotiation</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2 mt-0.5" />
                    <span className="text-sm">Transparent price discovery process</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border border-primary/10">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Quality Over Quantity</h3>
                <p className="text-muted-foreground mb-4">
                  We deliver quality matches between businesses and lenders, not just high volumes of 
                  unqualified leads that waste everyone's time.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2 mt-0.5" />
                    <span className="text-sm">Thorough qualification and underwriting process</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2 mt-0.5" />
                    <span className="text-sm">AI-powered compatibility matching</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Market Opportunity */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="section-animate order-2 md:order-1">
                <div className="bg-foreground rounded-lg p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">Market Opportunity</h3>
                  <p className="mb-6 opacity-90">
                    By improving the credit formation process for small businesses, we create a more efficient 
                    and productive lending environment that benefits all stakeholders.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-white/10 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-primary mb-1">$5.5T+</div>
                      <div className="text-sm">Small business lending market size</div>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-primary mb-1">63%</div>
                      <div className="text-sm">Of SMBs struggle to access adequate financing</div>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-primary mb-1">42%</div>
                      <div className="text-sm">Higher approval rates through optimized matching</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="section-animate order-1 md:order-2">
                <div className="inline-flex items-center bg-primary/10 px-4 py-2 rounded-full text-primary font-medium text-sm mb-4">
                  <Target className="h-4 w-4 mr-2" />
                  Market Opportunity
                </div>
                <h2 className="text-3xl font-bold mb-6">Focusing on Borrowers Creates Value for All</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  We understand a crucial insight many competitors overlook: a successful lending marketplace should 
                  focus on the needs of enterprises seeking credit, not just the lenders.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  By enhancing the confidence of businesses in navigating the credit formation process, we create 
                  better outcomes for all involved. Our approach empowers enterprises by addressing their specific needs, 
                  helping them understand credit formation, their credit value, and optimal partnership options.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Through transparency and technology, we build trust between borrowers and lenders, providing 
                  businesses with the tools to take control of their credit strategies.
                </p>
                <Button className="mt-4">
                  View Market Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-foreground text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center section-animate">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Credit Formation Revolution</h2>
              <p className="text-xl opacity-90 mb-8">
                Be part of our mission to transform how businesses access financing and how lenders find qualified borrowers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent border-white/20 hover:bg-white/10">
                  Contact Us
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

export default About;
