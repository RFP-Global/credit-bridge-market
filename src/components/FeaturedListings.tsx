
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag, Timer, ArrowUpRight, TrendingUp, Shield, BarChart3 } from "lucide-react";
import { useEffect, useRef } from "react";

interface DealProps {
  title: string;
  type: string;
  target: string;
  term: string;
  minInvestment: string;
  status: "Open" | "Closing Soon" | "Oversubscribed";
  badgeColor: string;
  progress: number;
}

const deals: DealProps[] = [
  {
    title: "Multi-Family Real Estate Debt Fund",
    type: "Senior Secured Debt",
    target: "9.2% APY",
    term: "36 Months",
    minInvestment: "$100,000",
    status: "Open",
    badgeColor: "bg-green-100 text-green-800",
    progress: 65,
  },
  {
    title: "Infrastructure Credit Opportunity",
    type: "Mezzanine Debt",
    target: "11.5% APY",
    term: "48 Months",
    minInvestment: "$250,000",
    status: "Closing Soon",
    badgeColor: "bg-amber-100 text-amber-800",
    progress: 82,
  },
  {
    title: "Diversified Corporate Lending Portfolio",
    type: "Senior Secured Loans",
    target: "8.7% APY",
    term: "24 Months",
    minInvestment: "$50,000",
    status: "Oversubscribed",
    badgeColor: "bg-blue-100 text-blue-800",
    progress: 98,
  },
];

const DealCard = ({ deal }: { deal: DealProps }) => {
  return (
    <Card className="overflow-hidden glass-card hover-scale">
      <CardHeader className="border-b bg-muted/30">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center mb-2">
              <Badge className={`font-medium ${deal.badgeColor}`}>
                {deal.status}
              </Badge>
              <span className="text-xs text-muted-foreground ml-2 flex items-center">
                <Tag className="h-3 w-3 mr-1" />
                {deal.type}
              </span>
            </div>
            <CardTitle className="text-xl">{deal.title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Target Return</p>
            <p className="text-2xl font-semibold text-primary flex items-center">
              {deal.target}
              <TrendingUp className="h-4 w-4 ml-1" />
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Investment Term</p>
            <p className="text-2xl font-semibold flex items-center">
              {deal.term}
              <Timer className="h-4 w-4 ml-1" />
            </p>
          </div>
        </div>
        
        <div className="space-y-1 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Funding Progress</span>
            <span className="font-medium">{deal.progress}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full" 
              style={{ width: `${deal.progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground flex items-center">
          <Shield className="h-4 w-4 mr-1" />
          <span>Min. Investment: {deal.minInvestment}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/30">
        <Button className="w-full rounded-md">
          View Opportunity
          <ArrowUpRight className="ml-2 h-4 w-4" />
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
    <section id="featured-listings" className="py-20 bg-gradient-to-b from-white to-secondary">
      <div className="container mx-auto px-6">
        <div ref={sectionRef} className="section-animate mb-12 text-center stagger-animate">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Curated Investment Opportunities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our exclusive selection of private credit investments, carefully vetted for quality and performance.
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
          <Button variant="outline" size="lg" className="rounded-full px-8">
            View All Opportunities
            <BarChart3 className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
