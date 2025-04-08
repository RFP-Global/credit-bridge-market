
import React from "react";
import { MapPin, Heart, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RecentProject } from "@/types/enterprises";

interface EnterpriseProjectCardProps {
  project: RecentProject;
  enterpriseId: number;
  likes: Record<string, number>;
  toggleLike: (projectId: string) => void;
}

const EnterpriseProjectCard: React.FC<EnterpriseProjectCardProps> = ({
  project,
  enterpriseId,
  likes,
  toggleLike
}) => {
  return (
    <Card className="overflow-hidden border-primary/10 bg-background">
      <CardContent className="p-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium">
              {project.projectType}
            </h3>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {project.location}
            </div>
          </div>
          <div>
            <p className="text-sm font-mono font-semibold">{project.amount}</p>
            <p className="text-xs text-muted-foreground text-right">
              <span className={`px-1.5 py-0.5 rounded-sm text-[10px] ${
                project.status === "Active" ? "bg-green-100 text-green-800" : 
                project.status === "Completed" ? "bg-blue-100 text-blue-800" : 
                "bg-amber-100 text-amber-800"
              }`}>
                {project.status}
              </span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-primary/5">
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {new Date(project.date).toLocaleDateString()}
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0"
            onClick={() => toggleLike(project.id.toString())}
          >
            <Heart className={`h-3 w-3 ${likes[project.id] ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnterpriseProjectCard;
