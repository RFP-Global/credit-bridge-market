import React, { useState } from "react";
import { enterprises } from "@/data/enterprisesData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Users, Filter, Grid, List, Building, ArrowLeft, EyeOff, AlertCircle } from "lucide-react";
import EnterpriseCard from "@/components/enterprises/EnterpriseCard";
import EmptyStateTab from "@/components/lenders/EmptyStateTab"; // Reusing this component
import { useNavigate, useLocation } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const EnterpriseNetworkPage = () => {
  const [activeTab, setActiveTab] = useState("explore");
  const [following, setFollowing] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const goBack = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate(-1);
    }
  };
  
  const toggleFollow = (enterpriseId: number) => {
    setFollowing(prev => 
      prev.includes(enterpriseId) 
        ? prev.filter(id => id !== enterpriseId)
        : [...prev, enterpriseId]
    );
  };
  
  const toggleSave = (enterpriseId: number) => {
    setSaved(prev => 
      prev.includes(enterpriseId) 
        ? prev.filter(id => id !== enterpriseId)
        : [...prev, enterpriseId]
    );
  };
  
  const toggleLike = (projectId: string) => {
    setLikes(prev => ({
      ...prev,
      [projectId]: (prev[projectId] || 0) + 1
    }));
  };
  
  const handleContact = (enterpriseId: number) => {
    console.log(`Contacting enterprise with ID: ${enterpriseId}`);
  };
  
  const filteredEnterprises = enterprises.filter(enterprise => 
    enterprise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    enterprise.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    enterprise.specialties.some(specialty => specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const followingEnterprises = filteredEnterprises.filter(enterprise => following.includes(enterprise.id));
  const savedEnterprises = filteredEnterprises.filter(enterprise => saved.includes(enterprise.id));
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 mt-12">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={goBack} 
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
        </div>
      
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-4">Enterprise Network</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with enterprise customers, follow their activities, 
            and discover potential financing opportunities for your business.
          </p>
        </div>
        
        <Alert className="mb-6 bg-primary/5 border-primary/20">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Enterprise Profiles are Anonymous</AlertTitle>
          <AlertDescription className="flex items-center">
            Enterprise identities are protected by default. Click the <EyeOff className="h-3 w-3 mx-1" /> icon to toggle profile visibility.
          </AlertDescription>
        </Alert>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search enterprises by name, industry, or specialty..."
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
              <Users className="h-4 w-4" /> Following ({followingEnterprises.length})
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-1 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Saved ({savedEnterprises.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="explore">
            {filteredEnterprises.length > 0 ? (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-6"}>
                {filteredEnterprises.map(enterprise => (
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
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No enterprises found matching your search criteria.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="following">
            {followingEnterprises.length > 0 ? (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-6"}>
                {followingEnterprises.map(enterprise => (
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
            ) : (
              <EmptyStateTab type="following" setActiveTab={setActiveTab} />
            )}
          </TabsContent>
          
          <TabsContent value="saved">
            {savedEnterprises.length > 0 ? (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-6"}>
                {savedEnterprises.map(enterprise => (
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
            ) : (
              <EmptyStateTab type="saved" setActiveTab={setActiveTab} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnterpriseNetworkPage;
