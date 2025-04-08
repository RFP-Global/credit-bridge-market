
import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Heart, Bookmark, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RecentDeal } from "@/types/lenders";

interface LenderDealCardProps {
  deal: RecentDeal;
  lenderId: number;
  likes: Record<string, number>;
  saved: boolean;
  toggleLike: (dealId: string) => void;
  toggleSave: () => void;
}

const LenderDealCard: React.FC<LenderDealCardProps> = ({
  deal,
  lenderId,
  likes,
  saved,
  toggleLike,
  toggleSave
}) => {
  const navigate = useNavigate();
  
  const handleNavigateToLender = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/lender/${lenderId}`, { state: { from: '/lenders' } });
  };
  
  return (
    <Card key={deal.id} className="overflow-hidden border-primary/10 bg-background">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium hover:text-primary cursor-pointer" onClick={handleNavigateToLender}>
              {deal.projectType}
            </h3>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {deal.location}
            </div>
          </div>
          <div>
            <p className="text-sm font-mono font-semibold">{deal.amount}</p>
            <p className="text-xs text-muted-foreground text-right">{deal.term}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-primary/5">
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {new Date(deal.date).toLocaleDateString()}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0"
              onClick={() => toggleLike(deal.id.toString())}
            >
              <Heart className={`h-3 w-3 ${likes[deal.id] ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0"
              onClick={toggleSave}
            >
              <Bookmark className={`h-3 w-3 ${saved ? 'fill-yellow-500 text-yellow-500' : ''}`} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0"
              onClick={handleNavigateToLender}
            >
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LenderDealCard;
