
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, FileText, ShoppingCart, Building, CreditCard, Users, Database } from "lucide-react";

const EnterpriseSidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-full md:w-64 space-y-6">
      <Card className="border border-primary/20 bg-background/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-mono">ENTERPRISE ACCOUNT</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono">TF</div>
            <div>
              <p className="font-mono text-sm">TERRAFORGE INC.</p>
              <p className="text-xs text-muted-foreground">admin@terraforge.com</p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground pt-2 border-t border-primary/10">
            <p className="flex justify-between py-1"><span>Account Level:</span> <span className="font-mono">ENTERPRISE</span></p>
            <p className="flex justify-between py-1"><span>Active Proposals:</span> <span className="font-mono">7</span></p>
            <p className="flex justify-between py-1"><span>Total Financing:</span> <span className="font-mono">$28.5M</span></p>
          </div>
          <div className="pt-2">
            <Link to="/enterprise-profile">
              <Button variant="outline" size="sm" className="w-full text-xs font-mono">
                View Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      
      <nav className="space-y-1">
        <Button 
          variant="ghost" 
          className={`w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3 ${
            isActive("/enterprise-dashboard") ? "bg-primary/5 text-primary border-l-2 border-primary" : ""
          }`}
          asChild
        >
          <Link to="/enterprise-dashboard">
            <BarChart3 className="h-4 w-4 mr-3" />
            Dashboard
          </Link>
        </Button>
        <Button 
          variant="ghost"
          className={`w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3 ${
            isActive("/proposals-dashboard") ? "bg-primary/5 text-primary border-l-2 border-primary" : ""
          }`}
          asChild
        >
          <Link to="/proposals-dashboard">
            <FileText className="h-4 w-4 mr-3" />
            Proposals
          </Link>
        </Button>
        <Button 
          variant="ghost"
          className={`w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3 ${
            isActive("/marketplace") ? "bg-primary/5 text-primary border-l-2 border-primary" : ""
          }`}
          asChild
        >
          <Link to="/marketplace">
            <ShoppingCart className="h-4 w-4 mr-3" />
            Marketplace
          </Link>
        </Button>
        <Button 
          variant="ghost"
          className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3"
          asChild
        >
          <Link to="#">
            <Building className="h-4 w-4 mr-3" />
            Lenders
          </Link>
        </Button>
        <Button 
          variant="ghost"
          className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3"
          asChild
        >
          <Link to="#">
            <CreditCard className="h-4 w-4 mr-3" />
            Financing
          </Link>
        </Button>
        <Button 
          variant="ghost"
          className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3"
          asChild
        >
          <Link to="#">
            <Users className="h-4 w-4 mr-3" />
            Team
          </Link>
        </Button>
        <Button 
          variant="ghost"
          className={`w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3 ${
            isActive("/vdr") ? "bg-primary/5 text-primary border-l-2 border-primary" : ""
          }`}
          asChild
        >
          <Link to="/vdr">
            <Database className="h-4 w-4 mr-3" />
            VDR
          </Link>
        </Button>
      </nav>
    </aside>
  );
};

export default EnterpriseSidebar;
