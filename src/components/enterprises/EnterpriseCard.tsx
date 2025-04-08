
import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Heart, Bookmark, Users, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Enterprise } from "@/types/enterprises";
import { Lender } from "@/types/lenders";
import EnterpriseProjectCard from "./EnterpriseProjectCard";
import EnterpriseCompatibilityBadge from "./EnterpriseCompatibilityBadge";
import { calculateEnterpriseCompatibility } from "@/utils/compatibilityUtils";

interface EnterpriseCardProps {
  enterprise: Enterprise;
  following: number[];
  saved: number[];
  likes: Record<string, number>;
  toggleFollow: (enterpriseId: number) => void;
  toggleSave: (enterpriseId: number) => void;
  toggleLike: (projectId: string) => void;
  handleContact: (enterpriseId: number) => void;
  currentUser?: Lender | null;
}

const EnterpriseCard = ({
  enterprise,
  following,
  saved,
  likes,
  toggleFollow,
  toggleSave,
  toggleLike,
  handleContact,
  currentUser
}: EnterpriseCardProps) => {
  const navigate = useNavigate();
  const isFollowing = following.includes(enterprise.id);
  const isSaved = saved.includes(enterprise.id);
  
  const compatibility = calculateEnterpriseCompatibility(currentUser, enterprise);
  
  const handleNavigateToEnterprise = () => {
    navigate(`/enterprise/${enterprise.id}`, { state: { from: window.location.pathname } });
  };
  
  // Always anonymize enterprise information
  const anonymizedName = `Enterprise ${enterprise.code}`;
  const anonymizedDescription = enterprise.description
    .replace(new RegExp(enterprise.name, 'gi'), anonymizedName)
    .replace(/\b([A-Za-z]+@[A-Za-z]+\.[A-Za-z]{2,})\b/g, "***@***.com");
  
  return (
    <Card className="overflow-hidden border-primary/10 bg-background hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-mono`}>
              {enterprise.code}
            </div>
            <div>
              <h3 className="text-lg font-medium hover:text-primary cursor-pointer" onClick={handleNavigateToEnterprise}>
                {anonymizedName}
              </h3>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                {enterprise.headquarters}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className={`h-8 text-xs ${isFollowing ? 'bg-primary/10' : ''}`}
              onClick={() => toggleFollow(enterprise.id)}
            >
              <Users className="h-3 w-3 mr-1" />
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => toggleSave(enterprise.id)}
            >
              <Bookmark className={`h-3 w-3 ${isSaved ? 'fill-yellow-500 text-yellow-500' : ''}`} />
            </Button>
          </div>
        </div>
        
        {currentUser && (
          <div className="mt-4">
            <EnterpriseCompatibilityBadge score={compatibility.score} showDetail />
          </div>
        )}
        
        <div className="mt-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{anonymizedDescription}</p>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-1">
          <Badge variant="outline" className="text-xs px-2 py-0 h-5">
            {enterprise.industry}
          </Badge>
          {enterprise.specialties.slice(0, 3).map((specialty, index) => (
            <Badge key={index} variant="outline" className="text-xs px-2 py-0 h-5">
              {specialty}
            </Badge>
          ))}
          {enterprise.specialties.length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-0 h-5">
              +{enterprise.specialties.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
          <div>
            <span className="text-muted-foreground">Annual Revenue:</span>
            <span className="font-mono ml-2">{enterprise.annualRevenue}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Founded:</span>
            <span className="font-mono ml-2">{enterprise.foundedYear}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Employees:</span>
            <span className="font-mono ml-2">{enterprise.employeeCount}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Avg Deal Size:</span>
            <span className="font-mono ml-2">{enterprise.avgDealSize}</span>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div>
          <h4 className="text-sm font-medium mb-3">Contact Information</h4>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center text-xs">
              <span className="text-muted-foreground mr-2">Contact:</span>
              <span>Contact Person</span>
            </div>
            <div className="flex items-center text-xs">
              <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
              <span>XXX-XXX-XXXX</span>
            </div>
            <div className="flex items-center text-xs">
              <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
              <span>contact@enterprise.com</span>
            </div>
          </div>
        </div>
        
        {enterprise.recentProjects && enterprise.recentProjects.length > 0 && (
          <>
            <Separator className="my-4" />
            
            <div>
              <h4 className="text-sm font-medium mb-3">Recent Projects</h4>
              <div className="space-y-2">
                {enterprise.recentProjects.map(project => (
                  <EnterpriseProjectCard
                    key={project.id}
                    project={project}
                    enterpriseId={enterprise.id}
                    likes={likes}
                    toggleLike={toggleLike}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
      
      <CardFooter className="px-6 py-4 bg-muted/10 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs"
          onClick={() => handleContact(enterprise.id)}
        >
          Contact
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs"
          onClick={handleNavigateToEnterprise}
        >
          View Details <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EnterpriseCard;
