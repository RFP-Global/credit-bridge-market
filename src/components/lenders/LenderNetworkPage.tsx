import React, { useState } from "react";
import { lenders } from "@/data/lendersData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Users, Filter, Grid, List, Building } from "lucide-react";
import LenderCard from "@/components/lenders/LenderCard";
import EmptyStateTab from "@/components/lenders/EmptyStateTab";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer";

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
    lender.specialties.some(specialty => specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const followingLenders = filteredLenders.filter(lender => following.includes(lender.id));
  const savedLenders = filteredLenders.filter(lender => saved.includes(lender.id));
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 mt-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Lender Network</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with financial institutions, follow their activities, 
            and discover potential financing partners for your business.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search lenders by name or specialty..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" /> Filter
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-primary/10" : ""}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-primary/10" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="explore" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full flex justify-start mb-8 bg-background border-b">
            <TabsTrigger value="explore" className="flex items-center gap-1 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              <Building className="h-4 w-4" /> Explore
            </TabsTrigger>
            <TabsTrigger value="following" className="flex items-center gap-1 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              <Users className="h-4 w-4" /> Following ({followingLenders.length})
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-1 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Saved ({savedLenders.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="explore">
            {filteredLenders.length > 0 ? (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-6"}>
                {filteredLenders.map(lender => (
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
              <div className="text-center py-12">
                <p className="text-muted-foreground">No lenders found matching your search criteria.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="following">
            {followingLenders.length > 0 ? (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-6"}>
                {followingLenders.map(lender => (
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
              <EmptyStateTab type="following" setActiveTab={setActiveTab} />
            )}
          </TabsContent>
          
          <TabsContent value="saved">
            {savedLenders.length > 0 ? (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-6"}>
                {savedLenders.map(lender => (
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
              <EmptyStateTab type="saved" setActiveTab={setActiveTab} />
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default LenderNetworkPage;
