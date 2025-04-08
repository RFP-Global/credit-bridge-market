
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface SidebarNavButtonProps {
  to: string;
  icon: LucideIcon;
  label: string;
  state?: Record<string, unknown>;
}

const SidebarNavButton = ({ to, icon: Icon, label, state }: SidebarNavButtonProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  // Create navigation state that properly tracks the current path
  // for all navigation including intelligence page
  const navigationState = {
    ...(state || {}),
    from: location.pathname
  };

  return (
    <Button 
      variant="ghost" 
      className={`w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3 ${
        isActive ? "bg-primary/5 text-primary border-l-2 border-primary" : ""
      }`}
      asChild
    >
      <Link to={to} state={navigationState}>
        <Icon className="h-4 w-4 mr-3" />
        {label}
      </Link>
    </Button>
  );
};

export default SidebarNavButton;
