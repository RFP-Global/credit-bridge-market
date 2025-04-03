
import { ProfileData } from "@/types/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building, User, Mail, Phone, MapPin, Calendar } from "lucide-react";

interface ProfileFormProps {
  profileData: ProfileData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSave: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const ProfileForm = ({ profileData, handleChange, handleSave, isLoading }: ProfileFormProps) => {
  return (
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
  );
};

export default ProfileForm;
