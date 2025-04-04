
import EnterpriseLayout from "@/components/layout/EnterpriseLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Lenders = () => {
  const lenders = [
    {
      id: 1,
      name: "Global Capital Finance",
      description: "Specializing in commercial real estate and renewable energy financing.",
      contactName: "Sarah Johnson",
      phone: "(555) 123-4567",
      email: "sjohnson@globalcapital.com",
      fundingCapacity: "$25M-$100M"
    },
    {
      id: 2,
      name: "Pinnacle Investment Group",
      description: "Infrastructure and healthcare sector financing solutions.",
      contactName: "Michael Chen",
      phone: "(555) 987-6543",
      email: "mchen@pinnacleig.com",
      fundingCapacity: "$10M-$50M"
    },
    {
      id: 3,
      name: "Heritage Funding Partners",
      description: "Traditional and mezz debt for mid-market commercial projects.",
      contactName: "David Williams",
      phone: "(555) 456-7890",
      email: "dwilliams@heritagefp.com",
      fundingCapacity: "$5M-$30M"
    }
  ];

  return (
    <EnterpriseLayout
      title="Lenders Network"
      description="Connect with qualified financial institutions for your projects."
    >
      <div className="container mx-auto px-6 py-8">
        <div className="border-b border-primary/10 pb-4 mb-6">
          <h1 className="text-2xl font-mono">Lenders Network</h1>
          <p className="text-sm text-muted-foreground">Explore and connect with pre-qualified lenders for your projects.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lenders.map((lender) => (
            <Card key={lender.id} className="border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-primary/5 transition-colors">
              <CardHeader>
                <CardTitle className="text-lg font-mono">{lender.name}</CardTitle>
                <CardDescription>{lender.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Contact:</span> {lender.contactName}
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    {lender.phone}
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    {lender.email}
                  </div>
                  <div className="text-sm mt-2">
                    <span className="text-muted-foreground">Funding Capacity:</span> 
                    <span className="font-mono ml-2">{lender.fundingCapacity}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full font-mono text-xs mt-2 rounded-none border-primary/20"
                  >
                    VIEW PROFILE
                    <ArrowRight className="h-3.5 w-3.5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </EnterpriseLayout>
  );
};

export default Lenders;
