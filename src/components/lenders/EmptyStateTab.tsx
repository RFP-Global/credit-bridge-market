
import React from "react";
import { Users, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateTabProps {
  type: "following" | "saved";
  setActiveTab: (tab: string) => void;
}

const EmptyStateTab: React.FC<EmptyStateTabProps> = ({ type, setActiveTab }) => {
  const isFollowing = type === "following";
  
  return (
    <div className="text-center py-12 space-y-4">
      {isFollowing ? (
        <Users className="h-12 w-12 mx-auto text-muted-foreground" />
      ) : (
        <Bookmark className="h-12 w-12 mx-auto text-muted-foreground" />
      )}
      <h3 className="text-lg font-medium">
        {isFollowing ? "No Followed Lenders" : "No Saved Lenders"}
      </h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        {isFollowing 
          ? "You haven't followed any lenders yet. Follow lenders to see their updates and recent deals here."
          : "You haven't saved any lenders yet. Save lenders to quickly access them later."}
      </p>
      <Button 
        variant="outline" 
        onClick={() => setActiveTab("all")}
      >
        Browse Lenders
      </Button>
    </div>
  );
};

export default EmptyStateTab;
