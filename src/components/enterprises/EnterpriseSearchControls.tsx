
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Grid, List } from "lucide-react";

interface EnterpriseSearchControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

const EnterpriseSearchControls = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode
}: EnterpriseSearchControlsProps) => {
  return (
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
  );
};

export default EnterpriseSearchControls;
