
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Lender } from "@/types/lenders";
import LenderCard from "./LenderCard";
import EmptyStateTab from "./EmptyStateTab";

interface LenderTabContentProps {
  tabValue: string;
  lenders: Lender[];
  following: number[];
  saved: number[];
  likes: Record<string, number>;
  toggleFollow: (lenderId: number) => void;
  handleContact: (lenderId: number) => void;
  toggleSave: (lenderId: number) => void;
  toggleLike: (dealId: string) => void;
  setActiveTab: (tab: string) => void;
}

const LenderTabContent: React.FC<LenderTabContentProps> = ({
  tabValue,
  lenders,
  following,
  saved,
  likes,
  toggleFollow,
  handleContact,
  toggleSave,
  toggleLike,
  setActiveTab
}) => {
  return (
    <TabsContent value={tabValue} className="space-y-6">
      {lenders.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
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
      ) : (
        <EmptyStateTab 
          type={tabValue as "following" | "saved"} 
          setActiveTab={setActiveTab} 
        />
      )}
    </TabsContent>
  );
};

export default LenderTabContent;
