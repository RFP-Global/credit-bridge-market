import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  DollarSign, 
  Hash, 
  Globe, 
  CheckCircle, 
  Clock, 
  MessageSquare, 
  Heart, 
  Share, 
  Users,
  Bookmark,
  History
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lenders } from "@/data/lendersData";
import EnterpriseLayout from "@/components/layout/EnterpriseLayout";
import { toast } from "@/hooks/use-toast";

const Lenders = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [following, setFollowing] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [likes, setLikes] = useState<Record<string, number>>({});
  
  const toggleFollow = (lenderId: number) => {
    setFollowing(prev => 
      prev.includes(lenderId) 
        ? prev.filter(id => id !== lenderId)
        : [...prev, lenderId]
    );
    
    const isFollowing = following.includes(lenderId);
    const lender = lenders.find(l => l.id === lenderId);
    
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: isFollowing 
        ? `You've unfollowed ${lender?.name}`
        : `You're now following ${lender?.name}`,
    });
  };
  
  const toggleSave = (lenderId: number) => {
    setSaved(prev => 
      prev.includes(lenderId) 
        ? prev.filter(id => id !== lenderId)
        : [...prev, lenderId]
    );
    
    const isSaved = saved.includes(lenderId);
    const lender = lenders.find(l => l.id === lenderId);
    
    toast({
      title: isSaved ? "Removed from saved" : "Saved",
      description: isSaved 
        ? `${lender?.name} removed from your saved lenders`
        : `${lender?.name} added to your saved lenders`,
    });
  };
  
  const toggleLike = (dealId: string) => {
    setLikes(prev => ({
      ...prev,
      [dealId]: (prev[dealId] || 0) + 1
    }));
    
    toast({
      title: "Liked",
      description: "You've liked this deal",
    });
  };
  
  const handleContact = (lenderId: number) => {
    const lender = lenders.find(l => l.id === lenderId);
    
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${lender?.name}`,
    });
  };
  
  const filteredLenders = activeTab === "following"
    ? lenders.filter(lender => following.includes(lender.id))
    : activeTab === "saved"
    ? lenders.filter(lender => saved.includes(lender.id))
    : lenders;
  
  return (
    <EnterpriseLayout>
      <div className="border-b border-primary/10 pb-4 mb-6">
        <h1 className="text-2xl font-mono">Lender Community</h1>
        <p className="text-sm text-muted-foreground">Connect with financial institutions in your network.</p>
      </div>
      
      <Tabs defaultValue="all" className="space-y-6" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList className="bg-background/50 border border-primary/20">
            <TabsTrigger value="all" className="font-mono text-xs">ALL LENDERS</TabsTrigger>
            <TabsTrigger value="following" className="font-mono text-xs">FOLLOWING</TabsTrigger>
            <TabsTrigger value="saved" className="font-mono text-xs">SAVED</TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm" className="font-mono text-xs">
            <Users className="h-4 w-4 mr-2" />
            Discover New Lenders
          </Button>
        </div>
        
        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {filteredLenders.map(lender => (
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
                        <h2 className="text-xl font-semibold">{lender.name}</h2>
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
                    <p className="text-sm">{lender.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">In business for {lender.yearsInBusiness} years</span>
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
                          <Card key={deal.id} className="bg-background/50">
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
                                    onClick={() => toggleLike(`${lender.id}-${deal.id}`)}
                                  >
                                    <Heart className="h-4 w-4 mr-1" />
                                    {likes[`${lender.id}-${deal.id}`] || 0}
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
                                  onClick={() => toggleSave(lender.id)}
                                >
                                  <Bookmark className={`h-4 w-4 ${saved.includes(lender.id) ? "fill-current" : ""}`} />
                                </button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                      {lender.recentDeals && lender.recentDeals.length > 2 && (
                        <Button variant="link" className="mt-2 p-0">
                          <History className="h-4 w-4 mr-1" />
                          View all {lender.recentDeals.length} deals
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="following" className="space-y-6">
          {filteredLenders.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {
                filteredLenders.map(lender => (
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
                          <h2 className="text-xl font-semibold">{lender.name}</h2>
                          <p className="text-sm text-muted-foreground font-mono">{lender.code}</p>
                        </div>
                      </div>
                      <div className="space-x-2 flex">
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => toggleFollow(lender.id)}
                        >
                          Following
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
                      <p className="text-sm">{lender.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center">
                          <Building className="h-4 w-4 text-primary mr-2" />
                          <span className="text-sm">In business for {lender.yearsInBusiness} years</span>
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
                            <Card key={deal.id} className="bg-background/50">
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
                                      onClick={() => toggleLike(`${lender.id}-${deal.id}`)}
                                    >
                                      <Heart className="h-4 w-4 mr-1" />
                                      {likes[`${lender.id}-${deal.id}`] || 0}
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
                                    onClick={() => toggleSave(lender.id)}
                                  >
                                    <Bookmark className={`h-4 w-4 ${saved.includes(lender.id) ? "fill-current" : ""}`} />
                                  </button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        
                        {lender.recentDeals && lender.recentDeals.length > 2 && (
                          <Button variant="link" className="mt-2 p-0">
                            <History className="h-4 w-4 mr-1" />
                            View all {lender.recentDeals.length} deals
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
              }
            </div>
          ) : (
            <div className="text-center py-12 space-y-4">
              <Users className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="text-lg font-medium">No Followed Lenders</h3>
              <p className="text-muted-foreground max-w-md mx-auto">You haven't followed any lenders yet. Follow lenders to see their updates and recent deals here.</p>
              <Button 
                variant="outline" 
                onClick={() => setActiveTab("all")}
              >
                Browse Lenders
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="saved" className="space-y-6">
          {filteredLenders.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {
                filteredLenders.map(lender => (
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
                          <h2 className="text-xl font-semibold">{lender.name}</h2>
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
                      <p className="text-sm">{lender.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center">
                          <Building className="h-4 w-4 text-primary mr-2" />
                          <span className="text-sm">In business for {lender.yearsInBusiness} years</span>
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
                            <Card key={deal.id} className="bg-background/50">
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
                                      onClick={() => toggleLike(`${lender.id}-${deal.id}`)}
                                    >
                                      <Heart className="h-4 w-4 mr-1" />
                                      {likes[`${lender.id}-${deal.id}`] || 0}
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
                                    onClick={() => toggleSave(lender.id)}
                                  >
                                    <Bookmark className="h-4 w-4 fill-current" />
                                  </button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        
                        {lender.recentDeals && lender.recentDeals.length > 2 && (
                          <Button variant="link" className="mt-2 p-0">
                            <History className="h-4 w-4 mr-1" />
                            View all {lender.recentDeals.length} deals
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
              }
            </div>
          ) : (
            <div className="text-center py-12 space-y-4">
              <Bookmark className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="text-lg font-medium">No Saved Lenders</h3>
              <p className="text-muted-foreground max-w-md mx-auto">You haven't saved any lenders yet. Save lenders to quickly access them later.</p>
              <Button 
                variant="outline" 
                onClick={() => setActiveTab("all")}
              >
                Browse Lenders
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </EnterpriseLayout>
  );
};

export default Lenders;
