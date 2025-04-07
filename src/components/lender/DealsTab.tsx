
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DealsTab = () => {
  return (
    <Card className="bg-background/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-sm font-mono">ALL ACTIVE DEALS</CardTitle>
        <CardDescription>Manage your financing deals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 px-4">
          <p className="text-muted-foreground">Deals tab content would be displayed here.</p>
          <p className="text-sm mt-2">This is a placeholder for the deals listing and management interface.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealsTab;
