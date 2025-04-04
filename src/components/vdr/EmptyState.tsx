
import { Database } from "lucide-react";

interface EmptyStateProps {
  searchQuery: string;
}

const EmptyState = ({ searchQuery }: EmptyStateProps) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
      <Database className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-xl font-mono mb-2">No items found</h3>
      <p className="text-muted-foreground max-w-md">
        {searchQuery 
          ? "No matching files or folders found. Try a different search term." 
          : "This folder is empty. Upload files or create new folders to get started."}
      </p>
    </div>
  );
};

export default EmptyState;
