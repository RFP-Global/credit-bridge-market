
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Terminal, Shield, Database, FileText, BarChart3, Search, Radio } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [typeComplete, setTypeComplete] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.classList.add("in-view");
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const timer = setTimeout(() => {
      setTypeComplete(true);
    }, 3500);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      clearTimeout(timer);
    };
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("featured-listings");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 grid-bg">
      <div className="absolute inset-0 z-0">
        <div className="radar-pulse"></div>
        <div className="radar-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="radar-pulse" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <div className="scanline z-10"></div>
      
      <div className="container mx-auto px-6 py-16 z-10">
        <div className="market-ticker animate-data-stream mb-6">
          <div className="data-row whitespace-nowrap flex-shrink-0" style={{ animationDelay: "0s" }}>
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex animate-data-stream">
                <span className="data-item text-xs font-mono text-primary"><BarChart3 className="h-3 w-3 inline mr-1" /> FACILITY_TYPE: TERM LOAN • APR: 7.5% • AMOUNT: $2.5M • TERM: 60M</span>
                <span className="data-item text-xs font-mono"><Search className="h-3 w-3 inline mr-1" /> INDUSTRY: MANUFACTURING • REVENUE: $12M • EBITDA: $1.8M</span>
                <span className="data-item text-xs font-mono text-primary"><FileText className="h-3 w-3 inline mr-1" /> FACILITY_TYPE: LINE OF CREDIT • APR: 8.2% • AMOUNT: $750K • TERM: 12M</span>
                <span className="data-item text-xs font-mono"><Search className="h-3 w-3 inline mr-1" /> INDUSTRY: TECHNOLOGY • REVENUE: $5.2M • EBITDA: $900K</span>
                <span className="data-item text-xs font-mono text-primary"><BarChart3 className="h-3 w-3 inline mr-1" /> FACILITY_TYPE: EQUIPMENT FINANCE • APR: 6.8% • AMOUNT: $1.2M • TERM: 48M</span>
                <span className="data-item text-xs font-mono"><Search className="h-3 w-3 inline mr-1" /> INDUSTRY: HEALTHCARE • REVENUE: $8.7M • EBITDA: $1.3M</span>
              </div>
            ))}
          </div>
        </div>
        
        <div ref={sectionRef} className="section-animate flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="w-full md:w-1/2 lg:w-5/12 space-y-8 stagger-animate">
            <div className="inline-block">
              <span className="rfp-badge">
                <Terminal className="h-3 w-3 mr-2" />
                RFP Global Access
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              <span className={typeComplete ? "" : "typewriter"}>
                Credit Formation Ecosystem
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/80 font-light">
              Accelerate credit financing with RFP Global. Connect businesses and lenders through an affordable, transparent marketplace that optimizes counterparty discovery and intellectual leverage.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-none px-8 py-6 text-md border-primary/30 group hover:bg-primary/10 transition-colors" 
                asChild
              >
                <Link to="/access" className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
                  Enterprise Portal
                  <div className="ml-3 h-4 w-px bg-primary/30 group-hover:bg-primary/50 transition-colors"></div>
                  <Radio className="ml-3 h-5 w-5 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-none px-8 py-6 text-md border-primary/30 group hover:bg-primary/10 transition-colors" 
                asChild
              >
                <Link to="/access" className="flex items-center">
                  <Radio className="mr-2 h-5 w-5 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
                  Lender Portal
                  <div className="ml-3 h-4 w-px bg-primary/30 group-hover:bg-primary/50 transition-colors"></div>
                  <Shield className="ml-3 h-5 w-5 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
                </Link>
              </Button>
            </div>
            
            <div className="pt-6 flex items-center text-muted-foreground text-xs font-mono">
              <span className="flex items-center mr-6">
                <span className="inline-block w-3 h-3 bg-primary rounded-full mr-2 opacity-70"></span>
                TRANSPARENT PRICE DISCOVERY
              </span>
              <span className="flex items-center">
                <span className="inline-block w-3 h-3 bg-primary rounded-full mr-2 opacity-70"></span>
                AI-POWERED UNDERWRITING
              </span>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 lg:w-7/12 relative">
            <div className="terminal-card overflow-hidden">
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500"></div>
                <div className="terminal-dot bg-yellow-500"></div>
                <div className="terminal-dot bg-green-500"></div>
                <div className="flex-1 text-center text-xs text-muted-foreground font-mono">RFP GLOBAL TERMINAL // SECURE MARKETPLACE</div>
              </div>
              <div className="terminal-content">
                <div className="mb-4 font-mono text-primary text-sm">
                  <span className="text-muted-foreground">&gt;</span> Initializing secure marketplace connection...
                </div>
                <div className="text-xs font-mono text-muted-foreground mb-2">FEATURED OPPORTUNITY</div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Credit RFP: EXPANSION-CAPITAL-357</h3>
                
                <div className="data-grid mb-4">
                  <div className="data-grid-item">
                    <span className="data-label">FUNDING CATEGORY</span>
                    <span className="data-value flex items-center">
                      <Shield className="h-3 w-3 mr-1 text-primary" />
                      Growth Capital
                    </span>
                  </div>
                  <div className="data-grid-item">
                    <span className="data-label">TARGET TERMS</span>
                    <span className="data-value text-primary">7.2%-8.5% APR</span>
                  </div>
                  <div className="data-grid-item">
                    <span className="data-label">AMOUNT REQUESTED</span>
                    <span className="data-value">$2.5M USD</span>
                  </div>
                  <div className="data-grid-item">
                    <span className="data-label">BUSINESS PROFILE</span>
                    <span className="data-value flex items-center">
                      <Database className="h-3 w-3 mr-1 text-primary" />
                      Manufacturing
                    </span>
                  </div>
                </div>
                
                <div className="text-xs font-mono border border-primary/20 bg-primary/5 p-3 relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background/50"></div>
                  <p>
                    Established manufacturing company seeking growth capital for equipment expansion and increased production capacity. Strong 7-year operating history with consistent revenue growth and healthy margins. Pre-qualified through RFP's underwriting process...
                    <span className="text-primary blink">_</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={scrollToNextSection}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-primary hover:text-primary/80 transition-colors duration-300"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-10 w-10 animate-bounce" />
      </button>
    </section>
  );
};

export default HeroSection;
