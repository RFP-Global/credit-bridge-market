
import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Shield, Briefcase, Radio, Database, Terminal, Lock, Eye, Zap } from "lucide-react";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
  code: string;
}

const benefits: Benefit[] = [
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: "SUPERIOR YIELD VECTORS",
    description: "Classified returns significantly outperforming public sector instruments with strategic deployment.",
    highlight: "7-12% Target Returns",
    code: "RTN-01"
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "ENHANCED SECURITY PROTOCOL",
    description: "Multi-layered authentication and verification ensures only top-tier opportunities are transmitted.",
    highlight: "Level 5 Clearance",
    code: "SEC-02"
  },
  {
    icon: <Radio className="h-8 w-8 text-primary" />,
    title: "ENCRYPTED NETWORK ACCESS",
    description: "Secure channel to opportunities typically restricted to highest-level institutional operatives.",
    highlight: "Exclusive Intel",
    code: "NET-03"
  },
  {
    icon: <Eye className="h-8 w-8 text-primary" />,
    title: "COUNTER-CYCLICAL PROTECTION",
    description: "Strategic diversification with minimal correlation to standard market fluctuations.",
    highlight: "Signal Isolation",
    code: "DIV-04"
  },
  {
    icon: <Terminal className="h-8 w-8 text-primary" />,
    title: "STREAMLINED DEPLOYMENT",
    description: "Efficient processing algorithms optimize transmission of documentation and asset allocation.",
    highlight: "Rapid Execution",
    code: "PRO-05"
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "ACCELERATED CAPITAL TRANSFER",
    description: "Swift deployment protocols across multiple strategic vectors via unified command interface.",
    highlight: "Optimized Deployment",
    code: "SPD-06"
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
            <span className="inline-flex items-center px-4 py-1.5 rounded-sm bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider border border-primary/30">
              <Lock className="h-3 w-3 mr-2" />
              Secure Protocol
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            CreditBridge Strategic Advantages
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Tactical benefits of our secure private credit transmission network for operatives with proper clearance.
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
