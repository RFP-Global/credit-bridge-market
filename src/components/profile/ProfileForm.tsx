
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProfileData } from "@/types/profile";
import { Save } from "lucide-react";

interface ProfileFormProps {
  profileData: ProfileData;
  onSave: (updatedData: ProfileData) => void;
}

const ProfileForm = ({ profileData, onSave }: ProfileFormProps) => {
  const [formData, setFormData] = useState<ProfileData>(profileData);

  useEffect(() => {
    // Update form data when profileData changes
    setFormData(profileData);
  }, [profileData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="border border-primary/20 bg-background/50 backdrop-blur-sm p-6 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="bg-background/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="bg-background/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-background/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="bg-background/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Company Address</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="bg-background/50"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="bg-background/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="founded">Year Founded</Label>
            <Input
              id="founded"
              name="founded"
              value={formData.founded}
              onChange={handleChange}
              className="bg-background/50"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="employees">Number of Employees</Label>
          <Input
            id="employees"
            name="employees"
            value={formData.employees}
            onChange={handleChange}
            className="bg-background/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Company Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="bg-background/50"
          />
        </div>
        
        <Button type="submit" className="font-mono">
          <Save className="h-4 w-4 mr-2" />
          Save Profile
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
