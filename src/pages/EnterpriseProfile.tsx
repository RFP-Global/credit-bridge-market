
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Radar, Signal, Terminal, ArrowLeft, Building, User, Mail, Phone, MapPin, Calendar, FileEdit } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EnterpriseProfile = () => {
  // In a real app, we would fetch this data from an API
  const [profileData, setProfileData] = useState({
    companyName: "TerraForge Inc.",
    fullName: "Alex Johnson",
    email: "alex@terraforge.com",
    phone: "+1 (555) 123-4567",
    address: "123 Innovation Way, Tech City, CA 94105",
    industry: "Renewable Energy",
    founded: "2015",
    employees: "50-200",
    description: "TerraForge Inc. is a leader in renewable energy solutions, specializing in innovative solar and wind power technologies."
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate saving profile data
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your enterprise profile has been updated successfully",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <div className="container mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link 
              to="/enterprise-dashboard" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mr-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-mono">Enterprise Profile</h1>
          </div>
          
          <Button 
            variant={isEditing ? "default" : "outline"}
            onClick={() => setIsEditing(!isEditing)}
            className="font-mono text-xs"
          >
            {isEditing ? (
              <>Cancel Editing</>
            ) : (
              <>
                <FileEdit className="h-4 w-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border border-primary/20 bg-background/50 backdrop-blur-sm">
              <CardHeader className="border-b border-primary/10 pb-4">
                <CardTitle className="font-mono text-sm">ENTERPRISE DETAILS</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {isEditing ? (
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-sm font-mono">ORGANIZATION NAME</Label>
                      <div className="relative">
                        <Building className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                        <Input
                          id="companyName"
                          name="companyName"
                          type="text"
                          value={profileData.companyName}
                          onChange={handleChange}
                          className="font-mono text-sm pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-mono">REPRESENTATIVE NAME</Label>
                      <div className="relative">
                        <User className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                        <Input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={profileData.fullName}
                          onChange={handleChange}
                          className="font-mono text-sm pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-mono">EMAIL</Label>
                      <div className="relative">
                        <Mail className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleChange}
                          className="font-mono text-sm pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-mono">PHONE</Label>
                      <div className="relative">
                        <Phone className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                        <Input
                          id="phone"
                          name="phone"
                          type="text"
                          value={profileData.phone}
                          onChange={handleChange}
                          className="font-mono text-sm pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sm font-mono">ADDRESS</Label>
                      <div className="relative">
                        <MapPin className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                        <Input
                          id="address"
                          name="address"
                          type="text"
                          value={profileData.address}
                          onChange={handleChange}
                          className="font-mono text-sm pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="industry" className="text-sm font-mono">INDUSTRY</Label>
                      <div className="relative">
                        <Building className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                        <Input
                          id="industry"
                          name="industry"
                          type="text"
                          value={profileData.industry}
                          onChange={handleChange}
                          className="font-mono text-sm pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="founded" className="text-sm font-mono">FOUNDED</Label>
                        <div className="relative">
                          <Calendar className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                          <Input
                            id="founded"
                            name="founded"
                            type="text"
                            value={profileData.founded}
                            onChange={handleChange}
                            className="font-mono text-sm pl-10"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="employees" className="text-sm font-mono">EMPLOYEES</Label>
                        <div className="relative">
                          <User className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                          <Input
                            id="employees"
                            name="employees"
                            type="text"
                            value={profileData.employees}
                            onChange={handleChange}
                            className="font-mono text-sm pl-10"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-mono">COMPANY DESCRIPTION</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={profileData.description}
                        onChange={handleChange}
                        className="font-mono text-sm min-h-[120px]"
                      />
                    </div>
                    
                    <div className="flex justify-end pt-4">
                      <Button 
                        type="submit"
                        className="font-mono text-xs"
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-xs text-muted-foreground mb-1 font-mono">ORGANIZATION</h3>
                        <p className="font-mono">{profileData.companyName}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-xs text-muted-foreground mb-1 font-mono">REPRESENTATIVE</h3>
                        <p className="font-mono">{profileData.fullName}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-xs text-muted-foreground mb-1 font-mono">EMAIL</h3>
                        <p className="font-mono">{profileData.email}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-xs text-muted-foreground mb-1 font-mono">PHONE</h3>
                        <p className="font-mono">{profileData.phone}</p>
                      </div>
                      
                      <div className="md:col-span-2">
                        <h3 className="text-xs text-muted-foreground mb-1 font-mono">ADDRESS</h3>
                        <p className="font-mono">{profileData.address}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-xs text-muted-foreground mb-1 font-mono">INDUSTRY</h3>
                        <p className="font-mono">{profileData.industry}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-xs text-muted-foreground mb-1 font-mono">FOUNDED</h3>
                          <p className="font-mono">{profileData.founded}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-xs text-muted-foreground mb-1 font-mono">EMPLOYEES</h3>
                          <p className="font-mono">{profileData.employees}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xs text-muted-foreground mb-1 font-mono">COMPANY DESCRIPTION</h3>
                      <p className="font-mono text-sm leading-relaxed">{profileData.description}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="border border-primary/20 bg-background/50 backdrop-blur-sm sticky top-20">
              <CardHeader className="border-b border-primary/10 pb-4">
                <CardTitle className="font-mono text-sm">ACCOUNT STATUS</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono">
                      {profileData.companyName?.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-mono text-sm">{profileData.companyName}</p>
                      <p className="text-xs text-muted-foreground">{profileData.email}</p>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground pt-2 border-t border-primary/10">
                    <p className="flex justify-between py-1"><span>Account Level:</span> <span className="font-mono">ENTERPRISE</span></p>
                    <p className="flex justify-between py-1"><span>Member Since:</span> <span className="font-mono">APR 2025</span></p>
                    <p className="flex justify-between py-1"><span>Status:</span> <span className="font-mono text-green-500">ACTIVE</span></p>
                  </div>
                  
                  <div className="pt-4 space-y-3">
                    <Button variant="outline" size="sm" className="w-full font-mono text-xs">
                      Account Settings
                    </Button>
                    <Button variant="outline" size="sm" className="w-full font-mono text-xs">
                      Security Settings
                    </Button>
                    <Link to="/enterprise-dashboard">
                      <Button variant="default" size="sm" className="w-full font-mono text-xs">
                        Return to Dashboard
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseProfile;
