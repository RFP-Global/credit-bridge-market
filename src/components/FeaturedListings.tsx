
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Terminal, Timer, ArrowUpRight, TrendingUp, Shield, BarChart3, Database, Lock, FileText, Building, Briefcase } from "lucide-react";
import { useEffect, useRef } from "react";

interface DealProps {
  title: string;
  type: string;
  target: string;
  term: string;
  minInvestment: string;
  status: "ACTIVE" | "CLOSING SOON" | "QUALIFIED";
  badgeColor: string;
  progress: number;
  code: string;
  industry: string;
  subSector?: string;
  location?: string;
  zipCode?: string;
  employeeCount?: number;
}

const deals: DealProps[] = [
  {
    title: "GROWTH CAPITAL",
    type: "Term Loan",
    target: "7.8% APR",
    term: "60 Months",
    minInvestment: "$500,000",
    status: "ACTIVE",
    badgeColor: "bg-emerald-900/20 text-emerald-500 border-emerald-500/30",
    progress: 65,
    code: "TCF-713",
    industry: "Technology",
    subSector: "SaaS/Cloud Services",
    location: "San Francisco, CA",
    zipCode: "94103",
    employeeCount: 42
  },
  {
    title: "WORKING CAPITAL",
    type: "Revolving Line of Credit",
    target: "8.5% APR",
    term: "24 Months",
    minInvestment: "$250,000",
    status: "CLOSING SOON",
    badgeColor: "bg-amber-900/20 text-amber-500 border-amber-500/30",
    progress: 82,
    code: "RLC-289",
    industry: "Healthcare",
    subSector: "Medical Devices",
    location: "Boston, MA",
    zipCode: "02115",
    employeeCount: 78
  },
  {
    title: "EQUIPMENT FINANCE",
    type: "Asset-Backed Loan",
    target: "6.7% APR",
    term: "48 Months",
    minInvestment: "$100,000",
    status: "QUALIFIED",
    badgeColor: "bg-blue-900/20 text-blue-500 border-blue-500/30",
    progress: 98,
    code: "EQF-456",
    industry: "Manufacturing",
    subSector: "Industrial Equipment",
    location: "Detroit, MI",
    zipCode: "48201",
    employeeCount: 125
  },
];

const DealCard = ({ deal }: { deal: DealProps }) => {
  return (
    <Card className="overflow-hidden terminal-card hover-scale border-primary/30">
      <CardHeader className="border-b border-primary/20 bg-muted/30 pb-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center mb-2">
              <Badge className={`font-mono text-xs border ${deal.badgeColor}`}>
                {deal.status}
              </Badge>
              <span className="text-xs text-muted-foreground ml-2 flex items-center font-mono">
                <Terminal className="h-3 w-3 mr-1" />
                {deal.code}
              </span>
            </div>
            <CardTitle className="text-md font-mono tracking-tight">{deal.title}</CardTitle>
            <div className="flex items-center">
              <p className="text-xs text-muted-foreground mt-1 font-mono">{deal.type}</p>
              <span className="mx-2 text-muted-foreground">•</span>
              <p className="text-xs text-muted-foreground mt-1 font-mono flex items-center">
                <Building className="h-3 w-3 mr-1" /> 
                {deal.industry}
                {deal.subSector && <span className="ml-1">({deal.subSector})</span>}
              </p>
            </div>
            {deal.location && (
              <p className="text-xs text-muted-foreground mt-1 font-mono">
                {deal.location} {deal.zipCode && <span>• {deal.zipCode}</span>}
                {deal.employeeCount && <span> • {deal.employeeCount} employees</span>}
              </p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Rate</p>
            <p className="text-xl font-semibold text-primary flex items-center">
              {deal.target}
              <TrendingUp className="h-4 w-4 ml-1" />
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Term</p>
            <p className="text-xl font-semibold flex items-center">
              {deal.term}
              <Timer className="h-4 w-4 ml-1" />
            </p>
          </div>
        </div>
        
        <div className="space-y-1 mb-4">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-muted-foreground uppercase tracking-wider">Funding Status</span>
            <span className="font-medium">{deal.progress}%</span>
          </div>
          <div className="w-full bg-secondary rounded-none h-1">
            <div 
              className="bg-primary h-1" 
              style={{ width: `${deal.progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground flex items-center font-mono">
          <Shield className="h-3 w-3 mr-1" />
          <span>MIN. INVESTMENT: {deal.minInvestment}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t border-primary/20 bg-muted/30">
        <Button className="w-full rounded-none text-xs font-mono" size="sm">
          SUBMIT BID
          <ArrowUpRight className="ml-2 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const FeaturedListings = () => {
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
    <section id="featured-listings" className="py-20 bg-gradient-to-b from-background to-secondary/50 grid-bg relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div ref={sectionRef} className="section-animate mb-12 text-center stagger-animate">
          <div className="inline-block mb-2">
            <span className="rfp-badge">
              <Briefcase className="h-3 w-3 mr-2" />
              Active Credit RFPs
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            Active Marketplace Opportunities
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Pre-vetted credit opportunities from qualified businesses seeking optimal financing terms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal, index) => (
            <div 
              key={index} 
              className="opacity-0" 
              style={{ 
                animation: `fade-in 0.5s ease forwards ${0.2 + index * 0.1}s`
              }}
            >
              <DealCard deal={deal} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 opacity-0" style={{ animation: 'fade-in 0.5s ease forwards 0.8s' }}>
          <Button variant="outline" size="lg" className="rounded-none px-8 border-primary/30 font-mono text-sm">
            EXPLORE ALL OPPORTUNITIES
            <Lock className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
