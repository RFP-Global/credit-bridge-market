
import React from "react";
import { Enterprise } from "@/types/enterprises";
import EnterpriseCard from "@/components/enterprises/EnterpriseCard";
import EmptyStateTab from "@/components/lenders/EmptyStateTab";

interface EnterpriseGridProps {
  enterprises: Enterprise[];
  following: number[];
  saved: number[];
  likes: Record<string, number>;
  viewMode: "grid" | "list";
  toggleFollow: (enterpriseId: number) => void;
  toggleSave: (enterpriseId: number) => void;
  toggleLike: (projectId: string) => void;
  handleContact: (enterpriseId: number) => void;
  emptyType?: "following" | "saved";
  setActiveTab?: (tab: string) => void;
}

const EnterpriseGrid = ({
  enterprises,
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
}: EnterpriseGridProps) => {
  if (enterprises.length === 0) {
    if (emptyType && setActiveTab) {
      return <EmptyStateTab type={emptyType} setActiveTab={setActiveTab} />;
    }
    
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No enterprises found matching your search criteria.</p>
      </div>
    );
  }

  return (
    <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-6"}>
      {enterprises.map(enterprise => (
        <EnterpriseCard
          key={enterprise.id}
          enterprise={enterprise}
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

export default EnterpriseGrid;
