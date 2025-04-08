
import React from "react";
import { MapPin, DollarSign, Calendar, Heart, MessageSquare, Share, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
  return (
    <Card className="bg-background/50">
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div>
            <p className="font-medium">{deal.projectType}</p>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              {deal.location}
              <Separator orientation="vertical" className="mx-2 h-3" />
              <DollarSign className="h-3 w-3 mr-1" />
              {deal.amount}
              <Separator orientation="vertical" className="mx-2 h-3" />
              <Calendar className="h-3 w-3 mr-1" />
              {new Date(deal.date).toLocaleDateString()}
            </div>
          </div>
          <Badge variant="outline" className="bg-primary/5">
            {deal.term}
          </Badge>
        </div>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-primary/10">
          <div className="flex items-center space-x-4">
            <button 
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
              onClick={() => toggleLike(`${lenderId}-${deal.id}`)}
            >
              <Heart className="h-4 w-4 mr-1" />
              {likes[`${lenderId}-${deal.id}`] || 0}
            </button>
            <button className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <MessageSquare className="h-4 w-4 mr-1" />
              0
            </button>
            <button className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <Share className="h-4 w-4 mr-1" />
              Share
            </button>
          </div>
          <button 
            className="text-sm text-muted-foreground hover:text-foreground"
            onClick={toggleSave}
          >
            <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LenderDealCard;
