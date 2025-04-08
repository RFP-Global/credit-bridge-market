
import React, { useState } from "react";
import { lenders } from "@/data/lendersData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LenderNetworkHeader from "./LenderNetworkHeader";
import LenderSearchControls from "./LenderSearchControls";
import LenderGrid from "./LenderGrid";

const LenderNetworkPage = () => {
  const [activeTab, setActiveTab] = useState("explore");
  const [following, setFollowing] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const toggleFollow = (lenderId: number) => {
    setFollowing(prev => 
      prev.includes(lenderId) 
        ? prev.filter(id => id !== lenderId)
        : [...prev, lenderId]
    );
  };
  
  const toggleSave = (lenderId: number) => {
    setSaved(prev => 
      prev.includes(lenderId) 
        ? prev.filter(id => id !== lenderId)
        : [...prev, lenderId]
    );
  };
  
  const toggleLike = (dealId: string) => {
    setLikes(prev => ({
      ...prev,
      [dealId]: (prev[dealId] || 0) + 1
    }));
  };
  
  const handleContact = (lenderId: number) => {
    console.log(`Contacting lender with ID: ${lenderId}`);
  };
  
  const filteredLenders = lenders.filter(lender => 
    lender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lender.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lender.specialties.some(specialty => specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const followingLenders = filteredLenders.filter(lender => following.includes(lender.id));
  const savedLenders = filteredLenders.filter(lender => saved.includes(lender.id));
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 mt-12">
        <LenderNetworkHeader />
        
        <LenderSearchControls 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        
        <Tabs defaultValue="explore" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full flex justify-start mb-8 bg-background border-b">
            <TabsTrigger value="explore" className="flex items-center gap-1 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Explore
            </TabsTrigger>
            <TabsTrigger value="following" className="flex items-center gap-1 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Following ({followingLenders.length})
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-1 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Saved ({savedLenders.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="explore">
            <LenderGrid 
              lenders={filteredLenders}
              following={following}
              saved={saved}
              likes={likes}
              viewMode={viewMode}
              toggleFollow={toggleFollow}
              toggleSave={toggleSave}
              toggleLike={toggleLike}
              handleContact={handleContact}
            />
          </TabsContent>
          
          <TabsContent value="following">
            <LenderGrid 
              lenders={followingLenders}
              following={following}
              saved={saved}
              likes={likes}
              viewMode={viewMode}
              toggleFollow={toggleFollow}
              toggleSave={toggleSave}
              toggleLike={toggleLike}
              handleContact={handleContact}
              emptyType="following"
              setActiveTab={setActiveTab}
            />
          </TabsContent>
          
          <TabsContent value="saved">
            <LenderGrid 
              lenders={savedLenders}
              following={following}
              saved={saved}
              likes={likes}
              viewMode={viewMode}
              toggleFollow={toggleFollow}
              toggleSave={toggleSave}
              toggleLike={toggleLike}
              handleContact={handleContact}
              emptyType="saved"
              setActiveTab={setActiveTab}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LenderNetworkPage;
