
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Building, 
  MapPin, 
  DollarSign, 
  Hash, 
  Mail, 
  Phone, 
  MessageSquare,
  Bookmark,
  History,
  ExternalLink,
  Briefcase
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Lender } from "@/types/lenders";
import LenderDealCard from "./LenderDealCard";

interface LenderCardProps {
  lender: Lender;
  following: number[];
  saved: number[];
  likes: Record<string, number>;
  toggleFollow: (lenderId: number) => void;
  handleContact: (lenderId: number) => void;
  toggleSave: (lenderId: number) => void;
  toggleLike: (dealId: string) => void;
}

const LenderCard: React.FC<LenderCardProps> = ({
  lender,
  following,
  saved,
  likes,
  toggleFollow,
  handleContact,
  toggleSave,
  toggleLike
}) => {
  const navigate = useNavigate();
  
  // Handle navigation to lender profile
  const navigateToProfile = (e: React.MouseEvent) => {
    // Prevent event from bubbling to parent elements
    e.stopPropagation();
    navigate(`/lender/${lender.id}`, { state: { from: '/lenders' } });
  };

  return (
    <Card key={lender.id} className="overflow-hidden border-primary/20">
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 h-32 relative"></div>
      <div className="px-6 pb-6">
        <div className="flex justify-between relative -mt-10">
          <div className="flex items-end">
            <Avatar className="h-20 w-20 border-4 border-background bg-primary/10">
              <AvatarFallback className="bg-primary/20 text-xl">
                {lender.name.split(' ').map(word => word[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 mb-2">
              <button 
                onClick={navigateToProfile} 
                className="text-xl font-semibold hover:text-primary flex items-center group"
              >
                {lender.name} 
                <ExternalLink className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <p className="text-sm text-muted-foreground">{lender.title}</p>
              <p className="text-sm text-muted-foreground font-mono">{lender.code}</p>
            </div>
          </div>
          <div className="space-x-2 flex">
            <Button 
              variant={following.includes(lender.id) ? "default" : "outline"} 
              size="sm"
              className={following.includes(lender.id) ? "bg-primary text-primary-foreground" : ""}
              onClick={() => toggleFollow(lender.id)}
            >
              {following.includes(lender.id) ? "Following" : "Follow"}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleContact(lender.id)}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center mb-3">
            <Building className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium">{lender.bankName}</span>
          </div>
          
          <p className="text-sm">{lender.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm">{lender.yearsExperience || lender.yearsInBusiness} years experience</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm">Preferred Regions: {lender.preferredRegions.join(', ')}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm">Funding Capacity: {lender.fundingCapacity}</span>
            </div>
            <div className="flex items-center">
              <Hash className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm">Min Deal Size: {lender.minimumDeal}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {lender.specialties.map((specialty, index) => (
              <Badge key={index} variant="outline" className="bg-primary/5">
                {specialty}
              </Badge>
            ))}
          </div>
          
          <div className="mt-6">
            <p className="text-sm font-medium mb-2">Contact Information</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">{lender.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm">{lender.phone}</span>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div>
            <p className="text-sm font-medium mb-4">Recent Deals</p>
            <div className="space-y-4">
              {lender.recentDeals?.slice(0, 2).map(deal => (
                <LenderDealCard 
                  key={deal.id} 
                  deal={deal} 
                  lenderId={lender.id} 
                  likes={likes} 
                  saved={saved.includes(lender.id)}
                  toggleLike={toggleLike}
                  toggleSave={() => toggleSave(lender.id)}
                />
              ))}
            </div>
            
            {lender.recentDeals && lender.recentDeals.length > 2 && (
              <Button variant="link" className="mt-2 p-0" onClick={navigateToProfile}>
                <History className="h-4 w-4 mr-1" />
                View all {lender.recentDeals.length} deals
              </Button>
            )}
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-6 font-mono text-xs"
              onClick={navigateToProfile}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Full Profile
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LenderCard;
