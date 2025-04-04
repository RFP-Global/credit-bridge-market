
import EnterpriseLayout from "@/components/layout/EnterpriseLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Briefcase, Clock, BarChart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Financing = () => {
  const activeLoans = [
    {
      id: 1,
      name: "Riverside Development",
      lender: "Global Capital Finance",
      amount: "$2.4M",
      term: "60 months",
      rate: "5.75%",
      secured: "Yes",
      startDate: "Jun 15, 2023",
      status: "Current"
    },
    {
      id: 2,
      name: "Green Energy Initiative",
      lender: "Pinnacle Investment Group",
      amount: "$5.7M",
      term: "84 months",
      rate: "4.95%",
      secured: "Yes",
      startDate: "Jan 10, 2023",
      status: "Current"
    },
    {
      id: 3,
      name: "Medical Center Expansion",
      lender: "Heritage Funding Partners",
      amount: "$8.1M",
      term: "120 months",
      rate: "6.25%",
      secured: "Yes",
      startDate: "Mar 22, 2022",
      status: "Current"
    }
  ];

  const options = [
    {
      id: 1,
      name: "Commercial Real Estate Loan",
      description: "For acquisition or refinance of commercial properties",
      termRange: "5-25 years",
      rateRange: "4.5%-7.0%",
      amountRange: "$1M-$50M+"
    },
    {
      id: 2,
      name: "Equipment Financing",
      description: "Fund essential equipment for your business operations",
      termRange: "2-7 years",
      rateRange: "5.0%-8.5%",
      amountRange: "$250K-$10M"
    },
    {
      id: 3,
      name: "Working Capital Loan",
      description: "Short-term funding for operational expenses",
      termRange: "6-36 months",
      rateRange: "6.0%-12.0%",
      amountRange: "$100K-$5M"
    },
    {
      id: 4,
      name: "Construction Loan",
      description: "Financing for new construction projects",
      termRange: "12-36 months",
      rateRange: "5.5%-8.0%",
      amountRange: "$2M-$100M"
    }
  ];

  return (
    <EnterpriseLayout
      title="Financing"
      description="Manage your active loans and explore financing options."
    >
      <div className="container mx-auto px-6 py-8">
        <div className="border-b border-primary/10 pb-4 mb-6">
          <h1 className="text-2xl font-mono">Financing</h1>
          <p className="text-sm text-muted-foreground">Manage your active loans and explore financing options.</p>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="bg-background/50 border border-primary/20">
            <TabsTrigger value="active" className="font-mono text-xs">ACTIVE LOANS</TabsTrigger>
            <TabsTrigger value="options" className="font-mono text-xs">FINANCING OPTIONS</TabsTrigger>
            <TabsTrigger value="calculator" className="font-mono text-xs">LOAN CALCULATOR</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-mono">Active Loans</h2>
                <Button variant="outline" size="sm" className="font-mono text-xs rounded-none">
                  <Plus className="h-3.5 w-3.5 mr-2" />
                  ADD NEW LOAN
                </Button>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {activeLoans.map((loan) => (
                  <Card key={loan.id} className="border-primary/20 bg-background/50 hover:bg-primary/5 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="text-lg font-mono">{loan.name}</h3>
                          <p className="text-sm text-muted-foreground">Lender: {loan.lender}</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <span className="font-mono text-xl">{loan.amount}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Clock className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                            <span className="text-muted-foreground">Term:</span>
                          </div>
                          <p className="font-mono text-sm">{loan.term}</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <BarChart className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                            <span className="text-muted-foreground">Rate:</span>
                          </div>
                          <p className="font-mono text-sm">{loan.rate}</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Briefcase className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                            <span className="text-muted-foreground">Start Date:</span>
                          </div>
                          <p className="font-mono text-sm">{loan.startDate}</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <FileText className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                            <span className="text-muted-foreground">Status:</span>
                          </div>
                          <p className="font-mono text-sm">{loan.status}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Button variant="outline" size="sm" className="font-mono text-xs rounded-none">
                          VIEW DETAILS
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="options">
            <div className="space-y-6">
              <h2 className="text-lg font-mono">Financing Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {options.map((option) => (
                  <Card key={option.id} className="border-primary/20 bg-background/50 hover:bg-primary/5 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lg font-mono">{option.name}</CardTitle>
                      <CardDescription>{option.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Term Range:</span>
                          <span className="font-mono">{option.termRange}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Rate Range:</span>
                          <span className="font-mono">{option.rateRange}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Amount Range:</span>
                          <span className="font-mono">{option.amountRange}</span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full mt-4 font-mono text-xs rounded-none"
                        >
                          LEARN MORE
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="calculator">
            <Card className="border-primary/20 bg-background/50">
              <CardHeader>
                <CardTitle className="text-lg font-mono">Loan Calculator</CardTitle>
                <CardDescription>Calculate payment schedules for various loan types.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loan calculator coming soon.</p>
                  <p className="text-sm mt-2">This feature is under development.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </EnterpriseLayout>
  );
};

export default Financing;
