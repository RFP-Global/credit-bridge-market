
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Terminal, Shield, Database } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

    // Simulate typewriter completion
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
        <div ref={sectionRef} className="section-animate flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="w-full md:w-1/2 lg:w-5/12 space-y-8 stagger-animate">
            <div className="inline-block">
              <span className="inline-flex items-center px-4 py-1.5 rounded-sm bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider border border-primary/30">
                <Terminal className="h-3 w-3 mr-2" />
                Secure Access Protocol
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              <span className={typeComplete ? "" : "typewriter"}>
                Strategic Credit Asset Deployment
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/80 font-light">
              Access classified private credit intel curated for operatives with level 5 clearance. High-yield assets, compartmentalized information, secure transmission.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-none px-8 py-6 text-md group">
                Request Clearance
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-none px-8 py-6 text-md border-primary/30">
                Decrypt Intel
              </Button>
            </div>
            
            <div className="pt-6 flex items-center text-muted-foreground text-xs font-mono">
              <span className="flex items-center mr-6">
                <span className="inline-block w-3 h-3 bg-primary rounded-full mr-2 opacity-70"></span>
                $1.5B+ TRANSACTION VOLUME
              </span>
              <span className="flex items-center">
                <span className="inline-block w-3 h-3 bg-primary rounded-full mr-2 opacity-70"></span>
                150+ INSTITUTIONAL PARTNERS
              </span>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 lg:w-7/12 relative">
            <div className="terminal-card overflow-hidden">
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500"></div>
                <div className="terminal-dot bg-yellow-500"></div>
                <div className="terminal-dot bg-green-500"></div>
                <div className="flex-1 text-center text-xs text-muted-foreground font-mono">SECURE CONNECTION</div>
              </div>
              <div className="terminal-content">
                <div className="mb-4 font-mono text-primary text-sm">
                  <span className="text-muted-foreground">&gt;</span> Initiating secured asset database connection...
                </div>
                <div className="text-xs font-mono text-muted-foreground mb-2">FEATURED OPPORTUNITY INTEL</div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Classified Asset: STRATOS-7</h3>
                
                <div className="data-grid mb-4">
                  <div className="data-grid-item">
                    <span className="data-label">CLASSIFICATION</span>
                    <span className="data-value flex items-center">
                      <Shield className="h-3 w-3 mr-1 text-primary" />
                      Top-Tier Secured
                    </span>
                  </div>
                  <div className="data-grid-item">
                    <span className="data-label">TARGET YIELD</span>
                    <span className="data-value text-primary">8.5% APY</span>
                  </div>
                  <div className="data-grid-item">
                    <span className="data-label">TERM PERIOD</span>
                    <span className="data-value">36 MONTHS</span>
                  </div>
                  <div className="data-grid-item">
                    <span className="data-label">DATA STRUCTURE</span>
                    <span className="data-value flex items-center">
                      <Database className="h-3 w-3 mr-1 text-primary" />
                      Multi-Sector
                    </span>
                  </div>
                </div>
                
                <div className="text-xs font-mono border border-primary/20 bg-primary/5 p-3 relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-background/50"></div>
                  <p>
                    Operational parameters indicate optimal conditions for deployment of capital resources across domestic infrastructure sectors with counter-cyclical properties and enhanced yield projections...
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
