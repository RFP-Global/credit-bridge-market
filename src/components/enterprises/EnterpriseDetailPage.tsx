
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, MapPin, Users, Phone, Mail, Building, CalendarClock, Heart, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { enterprises } from "@/data/enterprisesData";
import { Enterprise } from "@/types/enterprises";
import { Lender } from "@/types/lenders";
import { getLenderById } from "@/data/lendersData";
import EnterpriseProjectCard from "./EnterpriseProjectCard";
import EnterpriseCompatibilityBadge from "./EnterpriseCompatibilityBadge";
import { calculateEnterpriseCompatibility } from "@/utils/compatibilityUtils";

const EnterpriseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [enterprise, setEnterprise] = useState<Enterprise | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showIdentity, setShowIdentity] = useState(false);
  
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
  
  const toggleIdentity = () => {
    setShowIdentity(prev => !prev);
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
  
  const displayName = showIdentity ? enterprise.name : anonymizedName;
  const displayDescription = showIdentity ? enterprise.description : anonymizedDescription;
  const displayContactName = showIdentity ? enterprise.contactName : "Contact Person";
  const displayPhone = showIdentity ? enterprise.phone : "XXX-XXX-XXXX";
  const displayEmail = showIdentity ? enterprise.email : "contact@enterprise.com";
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" size="sm" onClick={handleBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Enterprise Profile</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="overflow-hidden border-primary/10 bg-background">
              <CardContent className="p-8">
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
                  <div className="mt-6">
                    <EnterpriseCompatibilityBadge score={compatibility.score} showDetail />
                  </div>
                )}
                
                <div className="mt-6">
                  <p className="text-muted-foreground">{displayDescription}</p>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge variant="outline" className="px-2 py-1">
                    {enterprise.industry}
                  </Badge>
                  {enterprise.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="px-2 py-1">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                
                <Separator className="my-8" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Company Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Annual Revenue</p>
                          <p className="font-medium">{enterprise.annualRevenue}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <CalendarClock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Founded</p>
                          <p className="font-medium">{enterprise.foundedYear}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Employees</p>
                          <p className="font-medium">{enterprise.employeeCount}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Contact</p>
                          <p className="font-medium">{displayContactName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium">{displayPhone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{displayEmail}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button variant="default" className="w-full">
                        Contact {displayName}
                      </Button>
                    </div>
                  </div>
                </div>
                
                {enterprise.recentProjects && enterprise.recentProjects.length > 0 && (
                  <>
                    <Separator className="my-8" />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Recent Projects</h3>
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
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
          
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
                
                <div className="mt-6">
                  <Button onClick={toggleIdentity} variant="outline" className="w-full">
                    {showIdentity ? "Hide Identity" : "Reveal Identity"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseDetailPage;
