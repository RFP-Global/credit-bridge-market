
import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Shield, Briefcase, Radio, Database, Terminal, Lock, Eye, Zap, FileText, BarChart3, Building } from "lucide-react";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
  code: string;
}

const benefits: Benefit[] = [
  {
    icon: <Building className="h-8 w-8 text-primary" />,
    title: "MARKETPLACE ACCESS",
    description: "Create financing proposals and shop them on our secure platform with live bidding from pre-vetted lenders.",
    highlight: "Live Bidding",
    code: "MKT-01"
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "INTELLIGENT UNDERWRITING",
    description: "AI-powered underwriting algorithm that pre-qualifies businesses and matches them with compatible lenders.",
    highlight: "Pre-Qualification",
    code: "UND-02"
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "CREDIT FACILITY BUILDER",
    description: "AI tool that projects attainable loans based on company characteristics and marketplace data.",
    highlight: "AI Recommendations",
    code: "CFB-03"
  },
  {
    icon: <Database className="h-8 w-8 text-primary" />,
    title: "DOCUMENT WAREHOUSE",
    description: "Secure storage for all pertinent financial data that lenders need to review before funding.",
    highlight: "Secure Access",
    code: "DOC-04"
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: "LOAN TRACKER",
    description: "Visual timeline showing loan repayment progress, including interest and principal paid to date.",
    highlight: "Visual Timeline",
    code: "TRK-05"
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
    title: "ADVANCED ANALYTICS",
    description: "Access historical transaction data, advanced analytics and market trends to make informed decisions.",
    highlight: "Market Intelligence",
    code: "ANL-06"
  },
];

const BenefitsSection = () => {
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

  return (
    <section className="py-20 bg-background relative grid-bg">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div ref={sectionRef} className="section-animate text-center mb-16 stagger-animate">
          <div className="inline-block mb-2">
            <span className="rfp-badge">
              <Terminal className="h-3 w-3 mr-2" />
              RFP Global Platform Benefits
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            RFP Global Strategic Advantages
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Empowering businesses and lenders with a transparent credit formation ecosystem that delivers better financing outcomes through RFP Global.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="terminal-card opacity-0 relative overflow-hidden"
              style={{ 
                animation: `fade-in 0.5s ease forwards ${0.2 + index * 0.1}s`
              }}
            >
              <div className="absolute top-2 right-2 text-xs text-muted-foreground font-mono">
                {benefit.code}
              </div>
              <div className="mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 font-mono">{benefit.title}</h3>
              <p className="text-muted-foreground mb-4 text-sm">{benefit.description}</p>
              {benefit.highlight && (
                <Badge variant="outline" className="text-xs font-mono border-primary/30">
                  {benefit.highlight}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
