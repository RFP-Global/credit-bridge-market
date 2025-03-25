
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("featured-listings");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-6 py-16 z-10">
        <div ref={sectionRef} className="section-animate flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="w-full md:w-1/2 lg:w-5/12 space-y-8 stagger-animate">
            <div className="inline-block">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Private Credit Marketplace
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Connecting Capital with Exceptional Opportunities
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/80">
              Access exclusive private credit deals curated for sophisticated investors. High yields, institutional quality, simplified access.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full px-8 py-6 text-md">
                Start Investing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-md">
                Learn More
              </Button>
            </div>
            
            <div className="pt-6 flex items-center text-muted-foreground text-sm">
              <span className="flex items-center mr-6">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                $1.5B+ Transaction Volume
              </span>
              <span className="flex items-center">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                150+ Institutional Partners
              </span>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 lg:w-7/12 relative">
            <div className="glass-card rounded-2xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" 
                alt="Private Credit Investment" 
                className="w-full h-auto object-cover rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                <div className="text-white">
                  <h3 className="text-xl font-semibold mb-2">Featured Opportunity</h3>
                  <p className="text-white/80 mb-2">Diversified Private Credit Fund</p>
                  <div className="flex items-center">
                    <span className="font-bold text-2xl">8.5%</span>
                    <span className="ml-2 text-white/70">Target Yield</span>
                  </div>
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
