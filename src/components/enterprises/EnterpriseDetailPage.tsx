import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { 
  ArrowLeft, MapPin, Users, Phone, Mail, Building, CalendarClock, 
  Heart, Bookmark, Globe, Linkedin, Twitter, Facebook, Instagram,
  BarChart, PieChart, DollarSign, Briefcase, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { enterprises } from "@/data/enterprisesData";
import { Enterprise } from "@/types/enterprises";
import { Lender } from "@/types/lenders";
import { getLenderById } from "@/data/lendersData";
import EnterpriseProjectCard from "./EnterpriseProjectCard";
import EnterpriseCompatibilityBadge from "./EnterpriseCompatibilityBadge";
import { calculateEnterpriseCompatibility } from "@/utils/compatibilityUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EnterpriseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [enterprise, setEnterprise] = useState<Enterprise | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [currentTab, setCurrentTab] = useState("overview");
  
  // Determine if user is a lender based on the URL path or state
  const isLenderRole = location.pathname.includes('lender-dashboard') || 
                    (location.state?.from && location.state.from.includes('lender-dashboard'));
  
  // For demo purposes, if the user is a lender, use lender ID 1
  const currentUser = isLenderRole ? getLenderById(1) : null;
  
  useEffect(() => {
    if (id) {
      const fetchedEnterprise = enterprises.find(e => e.id === parseInt(id));
      if (fetchedEnterprise) {
        setEnterprise(fetchedEnterprise);
      }
    }
  }, [id]);
  
  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/enterprise-network");
    }
  };
  
  const toggleFollow = () => {
    setIsFollowing(prev => !prev);
  };
  
  const toggleSave = () => {
    setIsSaved(prev => !prev);
  };
  
  if (!enterprise) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Enterprise not found</h2>
          <p className="text-muted-foreground mt-2">The enterprise you're looking for doesn't exist or has been removed.</p>
          <Button onClick={handleBack} className="mt-4">
            Back to Network
          </Button>
        </div>
      </div>
    );
  }
  
  const compatibility = currentUser ? calculateEnterpriseCompatibility(currentUser, enterprise) : null;
  
  const anonymizedName = `Enterprise ${enterprise.code}`;
  const anonymizedDescription = enterprise.description
    .replace(new RegExp(enterprise.name, 'gi'), anonymizedName)
    .replace(/\b([A-Za-z]+@[A-Za-z]+\.[A-Za-z]{2,})\b/g, "***@***.com");
  
  // Always use anonymized information
  const displayName = anonymizedName;
  const displayDescription = anonymizedDescription;
  const displayContactName = "Contact Person";
  const displayPhone = "XXX-XXX-XXXX";
  const displayEmail = "contact@enterprise.com";
  const displayCeo = enterprise.demographics?.ceo ? "CEO" : undefined;
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" size="sm" onClick={handleBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Enterprise Profile</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Main Content - Left 3 columns */}
          <div className="md:col-span-3 space-y-6">
            {/* Enterprise Header Card */}
            <Card className="border-primary/10">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-mono`}>
                      {enterprise.code}
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold">{displayName}</h2>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {enterprise.headquarters}
                      </div>
                      {displayCeo && (
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <User className="h-4 w-4 mr-1" />
                          CEO: {displayCeo}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`${isFollowing ? 'bg-primary/10' : ''}`}
                      onClick={toggleFollow}
                    >
                      <Users className="h-4 w-4 mr-1" />
                      {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-9 w-9 p-0"
                      onClick={toggleSave}
                    >
                      <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                    </Button>
                  </div>
                </div>
                
                {compatibility && (
                  <div className="mt-4">
                    <EnterpriseCompatibilityBadge score={compatibility.score} showDetail />
                  </div>
                )}
                
                <div className="mt-4">
                  <p className="text-muted-foreground">{displayDescription}</p>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline" className="px-2 py-1">
                    {enterprise.industry}
                  </Badge>
                  {enterprise.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="px-2 py-1">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                
                {/* Social Media Links (always generic) */}
                {enterprise.socialMedia && (
                  <div className="mt-4 flex items-center gap-3">
                    {enterprise.socialMedia.website && (
                      <a href="#" 
                         className="text-muted-foreground hover:text-primary transition-colors">
                        <Globe className="h-5 w-5" />
                      </a>
                    )}
                    {enterprise.socialMedia.linkedin && (
                      <a href="#" 
                         className="text-muted-foreground hover:text-blue-600 transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    {enterprise.socialMedia.twitter && (
                      <a href="#" 
                         className="text-muted-foreground hover:text-blue-400 transition-colors">
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                    {enterprise.socialMedia.facebook && (
                      <a href="#" 
                         className="text-muted-foreground hover:text-blue-700 transition-colors">
                        <Facebook className="h-5 w-5" />
                      </a>
                    )}
                    {enterprise.socialMedia.instagram && (
                      <a href="#" 
                         className="text-muted-foreground hover:text-pink-600 transition-colors">
                        <Instagram className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Tabs for Different Sections */}
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="w-full grid grid-cols-4 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="financials">Financials</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Demographics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {enterprise.demographics ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Legal Structure</h3>
                            <p>{enterprise.demographics.legalStructure}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Year Established</h3>
                            <p>{enterprise.demographics.yearEstablished}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Publicly Traded</h3>
                            <p>{enterprise.demographics.publiclyTraded ? 'Yes' : 'No'}</p>
                          </div>
                          {enterprise.demographics.stockSymbol && (
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Stock Symbol</h3>
                              <p>{enterprise.demographics.stockSymbol}</p>
                            </div>
                          )}
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Employee Count</h3>
                            <p>{enterprise.employeeCount}</p>
                          </div>
                          {enterprise.demographics.employeeGrowthRate && (
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">Employee Growth Rate</h3>
                              <p>{enterprise.demographics.employeeGrowthRate}</p>
                            </div>
                          )}
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Annual Revenue</h3>
                            <p>{enterprise.annualRevenue}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Headquarters</h3>
                            <p>{enterprise.headquarters}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Demographic information not available.</p>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Business Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Industry</h3>
                          <p>{enterprise.industry}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Specialties</h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {enterprise.specialties.map((specialty, index) => (
                              <Badge key={index} variant="outline">{specialty}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {enterprise.projectTypes && (
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Project Types</h3>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {enterprise.projectTypes.map((type, index) => (
                                <Badge key={index} variant="outline">{type}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {enterprise.preferredFinancing && (
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Preferred Financing</h3>
                            <p>{enterprise.preferredFinancing}</p>
                          </div>
                        )}
                        {enterprise.avgDealSize && (
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Average Deal Size</h3>
                            <p>{enterprise.avgDealSize}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Financials Tab */}
              <TabsContent value="financials" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Ratios</CardTitle>
                    <CardDescription>Key financial performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {enterprise.financialRatios ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Debt Service Coverage Ratio</h3>
                            <p className="text-xl font-semibold">{enterprise.financialRatios.debtServiceCoverageRatio.toFixed(2)}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Current Ratio</h3>
                            <p className="text-xl font-semibold">{enterprise.financialRatios.currentRatio.toFixed(2)}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Quick Ratio</h3>
                            <p className="text-xl font-semibold">{enterprise.financialRatios.quickRatio.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Debt to Equity Ratio</h3>
                            <p className="text-xl font-semibold">{enterprise.financialRatios.debtToEquityRatio.toFixed(2)}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Return on Assets</h3>
                            <p className="text-xl font-semibold">{(enterprise.financialRatios.returnOnAssets * 100).toFixed(1)}%</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Return on Equity</h3>
                            <p className="text-xl font-semibold">{(enterprise.financialRatios.returnOnEquity * 100).toFixed(1)}%</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Gross Margin</h3>
                            <p className="text-xl font-semibold">{(enterprise.financialRatios.grossMargin * 100).toFixed(1)}%</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Operating Margin</h3>
                            <p className="text-xl font-semibold">{(enterprise.financialRatios.operatingMargin * 100).toFixed(1)}%</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Net Profit Margin</h3>
                            <p className="text-xl font-semibold">{(enterprise.financialRatios.netProfitMargin * 100).toFixed(1)}%</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Financial ratio information not available.</p>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Balance Sheet Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {enterprise.demographics && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {enterprise.demographics.totalAssets && (
                          <div className="flex flex-col items-center p-6 bg-muted/10 rounded-lg">
                            <DollarSign className="h-8 w-8 text-primary mb-2" />
                            <h3 className="text-sm font-medium text-muted-foreground">Total Assets</h3>
                            <p className="text-xl font-semibold">{enterprise.demographics.totalAssets}</p>
                          </div>
                        )}
                        {enterprise.demographics.totalLiabilities && (
                          <div className="flex flex-col items-center p-6 bg-muted/10 rounded-lg">
                            <BarChart className="h-8 w-8 text-primary mb-2" />
                            <h3 className="text-sm font-medium text-muted-foreground">Total Liabilities</h3>
                            <p className="text-xl font-semibold">{enterprise.demographics.totalLiabilities}</p>
                          </div>
                        )}
                        {enterprise.demographics.netWorth && (
                          <div className="flex flex-col items-center p-6 bg-muted/10 rounded-lg">
                            <PieChart className="h-8 w-8 text-primary mb-2" />
                            <h3 className="text-sm font-medium text-muted-foreground">Net Worth</h3>
                            <p className="text-xl font-semibold">{enterprise.demographics.netWorth}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Projects Tab */}
              <TabsContent value="projects" className="space-y-6">
                {enterprise.recentProjects && enterprise.recentProjects.length > 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Projects</CardTitle>
                      <CardDescription>Latest enterprise activities and developments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {enterprise.recentProjects.map(project => (
                          <Card key={project.id} className="border-primary/10">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{project.projectType}</h4>
                                  <p className="text-sm text-muted-foreground">{project.location}</p>
                                </div>
                                <Badge variant={project.status === "Active" ? "outline" : "secondary"}>
                                  {project.status}
                                </Badge>
                              </div>
                              <div className="mt-3 flex justify-between">
                                <span className="text-sm font-mono">{project.amount}</span>
                                <span className="text-xs text-muted-foreground">{project.date}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="flex items-center justify-center p-12 border rounded-lg">
                    <div className="text-center">
                      <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">No Projects Available</h3>
                      <p className="text-muted-foreground">This enterprise has no recent projects to display.</p>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              {/* Contact Tab */}
              <TabsContent value="contact" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Contact Person</p>
                            <p className="font-medium">{displayContactName}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Phone</p>
                            <p className="font-medium">{displayPhone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="font-medium">{displayEmail}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Building className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Headquarters</p>
                            <p className="font-medium">{enterprise.headquarters}</p>
                          </div>
                        </div>
                        {enterprise.socialMedia?.website && (
                          <div className="flex items-center gap-3">
                            <Globe className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Website</p>
                              <p className="font-medium">www.company-website.com</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button variant="default" className="w-full">
                        Contact {displayName}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar - Right column */}
          <div className="md:col-span-1">
            <Card className="border-primary/10 bg-background sticky top-4">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Business Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Industry</p>
                    <p className="font-medium">{enterprise.industry}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Specialties</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {enterprise.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {enterprise.projectTypes && (
                    <div>
                      <p className="text-sm text-muted-foreground">Project Types</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {enterprise.projectTypes.map((type, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {enterprise.preferredFinancing && (
                    <div>
                      <p className="text-sm text-muted-foreground">Preferred Financing</p>
                      <p className="font-medium">{enterprise.preferredFinancing}</p>
                    </div>
                  )}
                  
                  {enterprise.avgDealSize && (
                    <div>
                      <p className="text-sm text-muted-foreground">Average Deal Size</p>
                      <p className="font-medium">{enterprise.avgDealSize}</p>
                    </div>
                  )}
                </div>
                
                {currentUser && compatibility && (
                  <>
                    <Separator className="my-4" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Compatibility Score</p>
                      <div className="bg-muted/50 rounded-full h-2 w-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            compatibility.score >= 80 ? 'bg-green-500' : 
                            compatibility.score >= 60 ? 'bg-yellow-500' : 
                            'bg-red-500'
                          }`}
                          style={{ width: `${compatibility.score}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>Low</span>
                        <span>Medium</span>
                        <span>High</span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseDetailPage;
