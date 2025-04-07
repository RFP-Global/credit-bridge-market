
import React from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, FileText, ShoppingCart, Building, CreditCard, Users, Database } from "lucide-react";
import SidebarNavButton from "./SidebarNavButton";

const EnterpriseSidebar = () => {
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
        <SidebarNavButton
          to="/enterprise-dashboard"
          icon={BarChart3}
          label="Dashboard"
          state={{ from: 'enterprise-dashboard' }}
        />
        <SidebarNavButton
          to="/proposals-dashboard"
          icon={FileText}
          label="Proposals"
          state={{ from: 'enterprise-dashboard' }}
        />
        <SidebarNavButton
          to="/marketplace"
          icon={ShoppingCart}
          label="Marketplace"
          state={{ from: 'enterprise-dashboard' }}
        />
        <SidebarNavButton
          to="/lenders"
          icon={Building}
          label="Lenders"
          state={{ from: 'enterprise-dashboard' }}
        />
        <SidebarNavButton
          to="/financing"
          icon={CreditCard}
          label="Financing"
          state={{ from: 'enterprise-dashboard' }}
        />
        <SidebarNavButton
          to="/team"
          icon={Users}
          label="Team"
          state={{ from: 'enterprise-dashboard' }}
        />
        <SidebarNavButton
          to="/vdr"
          icon={Database}
          label="VDR"
          state={{ from: 'enterprise-dashboard' }}
        />
      </nav>
    </aside>
  );
};

export default EnterpriseSidebar;
