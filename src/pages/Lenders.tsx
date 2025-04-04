
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EnterpriseLayout from "@/components/layout/EnterpriseLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Phone, Mail, ArrowRight, Search, Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { lenders } from "@/data/lendersData";

const Lenders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetails, setShowDetails] = useState<Record<number, boolean>>({});
  const navigate = useNavigate();
  
  const toggleDetails = (id: number) => {
    setShowDetails(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleViewProfile = (id: number) => {
    navigate(`/lender/${id}`);
  };

  const filteredLenders = lenders.filter(lender => 
    lender.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lender.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lender.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    lender.preferredRegions.some(region => 
      region.toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    lender.fundingCapacity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lender.minimumDeal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <EnterpriseLayout
      title="Lenders Network"
      description="Connect with qualified financial institutions for your projects."
    >
      <div className="container mx-auto px-6 py-8">
        <div className="border-b border-primary/10 pb-4 mb-6">
          <h1 className="text-2xl font-mono">Anonymous Lenders Network</h1>
          <p className="text-sm text-muted-foreground">Search and connect with qualified lenders without revealing their identities.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by specialty, region, funding size..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-md border-primary/20"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Lender identities are protected until connection is approved</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLenders.length > 0 ? (
            filteredLenders.map((lender) => (
              <Card key={lender.id} className="border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-primary/5 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-mono">{lender.code}</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => toggleDetails(lender.id)}
                    >
                      {showDetails[lender.id] ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <CardDescription>{lender.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {showDetails[lender.id] ? (
                      <>
                        <div className="text-sm mt-2">
                          <span className="text-muted-foreground">Funding Capacity:</span> 
                          <span className="font-mono ml-2">{lender.fundingCapacity}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Minimum Deal Size:</span> 
                          <span className="font-mono ml-2">{lender.minimumDeal}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Years in Business:</span> 
                          <span className="font-mono ml-2">{lender.yearsInBusiness}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Specialties:</span> 
                          <div className="flex flex-wrap gap-1 mt-1">
                            {lender.specialties.map((specialty, index) => (
                              <span key={index} className="bg-primary/10 px-2 py-0.5 text-xs font-mono">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Preferred Regions:</span> 
                          <div className="flex flex-wrap gap-1 mt-1">
                            {lender.preferredRegions.map((region, index) => (
                              <span key={index} className="bg-primary/10 px-2 py-0.5 text-xs font-mono">
                                {region}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full font-mono text-xs mt-4 rounded-none border-primary/20"
                          onClick={() => handleViewProfile(lender.id)}
                        >
                          VIEW FULL PROFILE
                          <ArrowRight className="h-3.5 w-3.5 ml-2" />
                        </Button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-4">
                        <Shield className="h-10 w-10 text-primary/40 mb-2" />
                        <p className="text-sm text-center text-muted-foreground">
                          View more details about this lender
                        </p>
                      </div>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full font-mono text-xs mt-4 rounded-none border-primary/20"
                    >
                      REQUEST CONNECTION
                      <ArrowRight className="h-3.5 w-3.5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-primary/20 mb-4" />
              <h3 className="font-mono text-lg mb-2">No lenders found</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Try adjusting your search criteria to find lenders that match your project needs.
              </p>
            </div>
          )}
        </div>
      </div>
    </EnterpriseLayout>
  );
};

export default Lenders;
