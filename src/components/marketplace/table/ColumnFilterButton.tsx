
import React from 'react';
import { Filter } from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface ColumnFilterButtonProps {
  field: string;
  title: string;
  children: React.ReactNode;
}

const ColumnFilterButton = ({ 
  field, 
  title,
  children
}: ColumnFilterButtonProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-5 w-5 p-0 hover:bg-transparent ml-1 text-gray-400 hover:text-cyan-400"
        >
          <Filter className="h-3 w-3" />
          <span className="sr-only">Filter {title}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-60 p-3 bg-black/95 border border-gray-700 rounded-md shadow-lg z-50"
        align="start"
      >
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-cyan-400 uppercase">
            Filter: {title}
          </h4>
          <div className="pt-2">
            {children}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColumnFilterButton;
