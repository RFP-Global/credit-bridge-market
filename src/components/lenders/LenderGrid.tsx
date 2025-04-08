
import React from "react";
import { Lender } from "@/types/lenders";
import LenderCard from "@/components/lenders/LenderCard";
import EmptyStateTab from "@/components/lenders/EmptyStateTab";

interface LenderGridProps {
  lenders: Lender[];
  following: number[];
  saved: number[];
  likes: Record<string, number>;
  viewMode: "grid" | "list";
  toggleFollow: (lenderId: number) => void;
  toggleSave: (lenderId: number) => void;
  toggleLike: (dealId: string) => void;
  handleContact: (lenderId: number) => void;
  emptyType?: "following" | "saved";
  setActiveTab?: (tab: string) => void;
}

const LenderGrid = ({
  lenders,
  following,
  saved,
  likes,
  viewMode,
  toggleFollow,
  toggleSave,
  toggleLike,
  handleContact,
  emptyType,
  setActiveTab
}: LenderGridProps) => {
  if (lenders.length === 0) {
    if (emptyType && setActiveTab) {
      return <EmptyStateTab type={emptyType} setActiveTab={setActiveTab} />;
    }
    
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No bankers found matching your search criteria.</p>
      </div>
    );
  }

  return (
    <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-6"}>
      {lenders.map(lender => (
        <LenderCard
          key={lender.id}
          lender={lender}
          following={following}
          saved={saved}
          likes={likes}
          toggleFollow={toggleFollow}
          handleContact={handleContact}
          toggleSave={toggleSave}
          toggleLike={toggleLike}
        />
      ))}
    </div>
  );
};

export default LenderGrid;
