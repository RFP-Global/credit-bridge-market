
import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, ShieldCheck, Briefcase, LineChart, Zap } from "lucide-react";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
}

const benefits: Benefit[] = [
  {
    icon: <TrendingUp className="h-10 w-10 text-blue-500" />,
    title: "Superior Returns",
    description: "Access private credit investments with historically higher yields than public markets.",
    highlight: "7-12% Target Returns",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-emerald-500" />,
    title: "Institutional Quality",
    description: "Rigorous due diligence process ensures only high-quality opportunities are offered.",
    highlight: "Thorough Vetting",
  },
  {
    icon: <Users className="h-10 w-10 text-violet-500" />,
    title: "Network Access",
    description: "Tap into deals typically only available to institutional investors.",
    highlight: "Exclusive Opportunities",
  },
  {
    icon: <LineChart className="h-10 w-10 text-amber-500" />,
    title: "Portfolio Diversification",
    description: "Low correlation to public markets helps protect your overall portfolio.",
    highlight: "Reduced Volatility",
  },
  {
    icon: <Briefcase className="h-10 w-10 text-indigo-500" />,
    title: "Simplified Process",
    description: "Streamlined investment process with transparent documentation and reporting.",
    highlight: "Easy Onboarding",
  },
  {
    icon: <Zap className="h-10 w-10 text-rose-500" />,
    title: "Efficient Deployment",
    description: "Quickly deploy capital across multiple opportunities in a single platform.",
    highlight: "Fast Access",
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div ref={sectionRef} className="section-animate text-center mb-16 stagger-animate">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Why Choose CreditBridge
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the advantages of our premium private credit marketplace for sophisticated investors.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow duration-300 opacity-0"
              style={{ 
                animation: `fade-in 0.5s ease forwards ${0.2 + index * 0.1}s`
              }}
            >
              <div className="mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground mb-4">{benefit.description}</p>
              {benefit.highlight && (
                <Badge variant="secondary" className="text-sm font-medium">
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
