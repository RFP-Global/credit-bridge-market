
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building, Calendar, DollarSign, UserCheck, FileText, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const DealDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dealType, dealData } = location.state || {};
  
  if (!dealData) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <Building className="h-16 w-16 text-primary/20 mb-4" />
        <h2 className="text-2xl font-mono mb-2">Deal Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The deal information could not be loaded. Please try again.
        </p>
        <Button 
          variant="outline" 
          onClick={() => navigate("/lender-dashboard")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 relative z-10">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate("/lender-dashboard")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>
      
      <div className="flex flex-col space-y-6">
        <Card className="bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl font-mono">{dealData.name}</CardTitle>
                <CardDescription className="mt-1">{dealData.company}</CardDescription>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="text-lg font-mono">{dealData.amount}</span>
              </div>
            </div>
            
            {dealType === "active" && (
              <span className={`text-xs px-3 py-1 font-mono rounded inline-block mt-2 ${
                dealData.stage === "Approved" ? "bg-green-100 text-green-800" : 
                dealData.stage === "Review" ? "bg-amber-100 text-amber-800" : 
                "bg-blue-100 text-blue-800"
              }`}>
                {dealData.stage}
              </span>
            )}
            
            {dealType === "closed" && (
              <span className={`text-xs px-3 py-1 font-mono rounded inline-block mt-2 ${
                dealData.result === "Funded" ? "bg-green-100 text-green-800" : 
                "bg-red-100 text-red-800"
              }`}>
                {dealData.result}
              </span>
            )}
            
            {dealType === "watchlist" && (
              <span className={`text-xs px-3 py-1 font-mono rounded inline-block mt-2 ${
                dealData.status === "High Potential" ? "bg-purple-100 text-purple-800" : 
                dealData.status === "Interested" ? "bg-blue-100 text-blue-800" : 
                "bg-gray-100 text-gray-800"
              }`}>
                {dealData.status}
              </span>
            )}
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold flex items-center">
                  <Building className="h-4 w-4 mr-2" /> Company
                </h3>
                <p className="text-sm">{dealData.company}</p>
                <p className="text-xs text-muted-foreground">
                  {dealType === "watchlist" ? "Potential partner" : "Active partner"}
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-semibold flex items-center">
                  <Calendar className="h-4 w-4 mr-2" /> 
                  {dealType === "active" ? "Due Date" : 
                   dealType === "closed" ? "Close Date" : 
                   "Follow-up Date"}
                </h3>
                <p className="text-sm">
                  {dealType === "active" ? dealData.dueDate : 
                   dealType === "closed" ? dealData.closeDate : 
                   "Not scheduled"}
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-semibold flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" /> Amount
                </h3>
                <p className="text-sm font-mono">{dealData.amount}</p>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            {dealType === "active" && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold flex items-center">
                  <Clock className="h-4 w-4 mr-2" /> Timeline
                </h3>
                <div className="relative pl-8 border-l border-primary/20 space-y-6">
                  <div className="relative">
                    <div className="absolute -left-[29px] top-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                    </div>
                    <h4 className="text-xs font-semibold">Initial Review</h4>
                    <p className="text-xs text-muted-foreground">April 2, 2025</p>
                    <p className="text-sm mt-1">Received initial application and began review process.</p>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-[29px] top-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                    </div>
                    <h4 className="text-xs font-semibold">Documentation Review</h4>
                    <p className="text-xs text-muted-foreground">April 5, 2025</p>
                    <p className="text-sm mt-1">Financial statements and business plan under evaluation.</p>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-[29px] top-0 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
                    </div>
                    <h4 className="text-xs font-semibold text-muted-foreground">Final Approval</h4>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                </div>
              </div>
            )}
            
            {dealType === "closed" && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold flex items-center">
                  <FileText className="h-4 w-4 mr-2" /> Summary
                </h3>
                <p className="text-sm">
                  {dealData.result === "Funded" 
                    ? `This deal was successfully funded on ${dealData.closeDate}. The financing terms were agreed upon after careful review of the project viability and return projections.`
                    : `This deal was declined on ${dealData.closeDate} due to risk assessment concerns. The project did not meet our current investment criteria.`
                  }
                </p>
                
                <h3 className="text-sm font-semibold flex items-center mt-6">
                  <UserCheck className="h-4 w-4 mr-2" /> Key Stakeholders
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 border border-primary/10 rounded">
                    <p className="text-xs font-semibold">Primary Contact</p>
                    <p className="text-sm">Jane Smith, CFO</p>
                    <p className="text-xs text-muted-foreground">jane.smith@example.com</p>
                  </div>
                  <div className="p-3 border border-primary/10 rounded">
                    <p className="text-xs font-semibold">Account Manager</p>
                    <p className="text-sm">Michael Johnson</p>
                    <p className="text-xs text-muted-foreground">Internal stakeholder</p>
                  </div>
                </div>
              </div>
            )}
            
            {dealType === "watchlist" && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold">Notes</h3>
                <p className="text-sm p-3 bg-primary/5 rounded">{dealData.notes}</p>
                
                <h3 className="text-sm font-semibold mt-6">Opportunity Assessment</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex flex-col items-center p-3 border border-primary/10 rounded">
                    <p className="text-xs font-semibold">Market Potential</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <p className="text-xs mt-1">85%</p>
                  </div>
                  <div className="flex flex-col items-center p-3 border border-primary/10 rounded">
                    <p className="text-xs font-semibold">Financial Stability</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <p className="text-xs mt-1">70%</p>
                  </div>
                  <div className="flex flex-col items-center p-3 border border-primary/10 rounded">
                    <p className="text-xs font-semibold">Alignment with Strategy</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                    <p className="text-xs mt-1">90%</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-end space-x-2">
            {dealType === "active" && (
              <>
                <Button variant="outline" size="sm">Schedule Meeting</Button>
                <Button size="sm">Update Status</Button>
              </>
            )}
            
            {dealType === "closed" && (
              <>
                <Button variant="outline" size="sm">View Full Report</Button>
                <Button size="sm">Archive</Button>
              </>
            )}
            
            {dealType === "watchlist" && (
              <>
                <Button variant="outline" size="sm">Set Reminder</Button>
                <Button size="sm">Move to Active</Button>
              </>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DealDetails;
