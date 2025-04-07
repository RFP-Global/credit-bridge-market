
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, Clock } from "lucide-react";

// Mock data for the different deal types
const activeDeals = [
  { id: 1, name: "Riverside Development", company: "TerraForge Inc.", amount: "$2.4M", stage: "Review", dueDate: "June 10, 2025" },
  { id: 2, name: "Green Energy Initiative", company: "EcoSystems LLC", amount: "$5.7M", stage: "Approved", dueDate: "July 15, 2025" },
  { id: 3, name: "Medical Center Expansion", company: "HealthCore Solutions", amount: "$8.1M", stage: "Pending", dueDate: "Aug 22, 2025" }
];

const closedDeals = [
  { id: 4, name: "Downtown Office Complex", company: "Urban Spaces Inc.", amount: "$4.2M", result: "Funded", closeDate: "March 15, 2025" },
  { id: 5, name: "Solar Farm Project", company: "SunPower Systems", amount: "$7.9M", result: "Funded", closeDate: "Feb 28, 2025" },
  { id: 6, name: "Retail Shopping Center", company: "Commerce Group", amount: "$3.5M", result: "Rejected", closeDate: "Jan 10, 2025" }
];

const watchlistDeals = [
  { id: 7, name: "Autonomous Vehicle Facility", company: "NextGen Mobility", amount: "$12.3M", status: "High Potential", notes: "Innovative tech with strong market growth" },
  { id: 8, name: "Waterfront Hotel Development", company: "Coastal Ventures", amount: "$18.5M", status: "Monitoring", notes: "Awaiting environmental clearance" },
  { id: 9, name: "Agricultural Tech Campus", company: "GrowSmart Technologies", amount: "$6.1M", status: "Interested", notes: "Strong financials, expanding sector" }
];

interface DealsTabProps {
  defaultTab?: "active" | "closed" | "watchlist";
}

const DealsTab = ({ defaultTab = "active" }: DealsTabProps) => {
  return (
    <Card className="bg-background/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-sm font-mono">DEALS MANAGEMENT</CardTitle>
        <CardDescription>Track and manage all your financing deals</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={defaultTab} className="space-y-4">
          <TabsList className="bg-background/50">
            <TabsTrigger value="active" className="font-mono text-xs">
              <Clock className="h-3.5 w-3.5 mr-2" />
              ACTIVE DEALS
            </TabsTrigger>
            <TabsTrigger value="closed" className="font-mono text-xs">
              <CheckCircle className="h-3.5 w-3.5 mr-2" />
              CLOSED DEALS
            </TabsTrigger>
            <TabsTrigger value="watchlist" className="font-mono text-xs">
              <Eye className="h-3.5 w-3.5 mr-2" />
              WATCH LIST
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-primary/10">
                  <TableHead className="font-mono text-xs">DEAL NAME</TableHead>
                  <TableHead className="font-mono text-xs">COMPANY</TableHead>
                  <TableHead className="font-mono text-xs">AMOUNT</TableHead>
                  <TableHead className="font-mono text-xs">STAGE</TableHead>
                  <TableHead className="font-mono text-xs">DUE DATE</TableHead>
                  <TableHead className="text-right font-mono text-xs">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeDeals.map(deal => (
                  <TableRow key={deal.id} className="border-b border-primary/10 hover:bg-primary/5">
                    <TableCell className="font-mono text-sm">{deal.name}</TableCell>
                    <TableCell className="text-xs">{deal.company}</TableCell>
                    <TableCell className="font-mono text-sm">{deal.amount}</TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 font-mono rounded ${
                        deal.stage === "Approved" ? "bg-green-100 text-green-800" : 
                        deal.stage === "Review" ? "bg-amber-100 text-amber-800" : 
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {deal.stage}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs">{deal.dueDate}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="font-mono text-xs">DETAILS</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="closed">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-primary/10">
                  <TableHead className="font-mono text-xs">DEAL NAME</TableHead>
                  <TableHead className="font-mono text-xs">COMPANY</TableHead>
                  <TableHead className="font-mono text-xs">AMOUNT</TableHead>
                  <TableHead className="font-mono text-xs">RESULT</TableHead>
                  <TableHead className="font-mono text-xs">CLOSE DATE</TableHead>
                  <TableHead className="text-right font-mono text-xs">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {closedDeals.map(deal => (
                  <TableRow key={deal.id} className="border-b border-primary/10 hover:bg-primary/5">
                    <TableCell className="font-mono text-sm">{deal.name}</TableCell>
                    <TableCell className="text-xs">{deal.company}</TableCell>
                    <TableCell className="font-mono text-sm">{deal.amount}</TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 font-mono rounded ${
                        deal.result === "Funded" ? "bg-green-100 text-green-800" : 
                        "bg-red-100 text-red-800"
                      }`}>
                        {deal.result}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs">{deal.closeDate}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="font-mono text-xs">REPORT</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="watchlist">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-primary/10">
                  <TableHead className="font-mono text-xs">COMPANY</TableHead>
                  <TableHead className="font-mono text-xs">PROJECT</TableHead>
                  <TableHead className="font-mono text-xs">AMOUNT</TableHead>
                  <TableHead className="font-mono text-xs">STATUS</TableHead>
                  <TableHead className="font-mono text-xs">NOTES</TableHead>
                  <TableHead className="text-right font-mono text-xs">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {watchlistDeals.map(deal => (
                  <TableRow key={deal.id} className="border-b border-primary/10 hover:bg-primary/5">
                    <TableCell className="text-xs">{deal.company}</TableCell>
                    <TableCell className="font-mono text-sm">{deal.name}</TableCell>
                    <TableCell className="font-mono text-sm">{deal.amount}</TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 font-mono rounded ${
                        deal.status === "High Potential" ? "bg-purple-100 text-purple-800" : 
                        deal.status === "Interested" ? "bg-blue-100 text-blue-800" : 
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {deal.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs max-w-[200px] truncate">{deal.notes}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="font-mono text-xs">TRACK</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DealsTab;
