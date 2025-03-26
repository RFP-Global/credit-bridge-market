
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  ArrowUpDown,
  Bookmark,
  DollarSign,
  Clock,
  BadgePercent,
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const Marketplace = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [amountRange, setAmountRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const handleSaveToFavorites = (title: string) => {
    toast({
      title: "Added to favorites",
      description: `${title} has been saved to your favorites`,
    });
  };

  const handleApplyNow = (title: string) => {
    toast({
      title: "Application Started",
      description: `You are applying for ${title}`,
    });
  };

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <Navbar />

      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-cyan-400 mb-2">Business Finance Marketplace</h1>
            <p className="text-gray-400">Browse and apply for business financing options</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                type="text" 
                placeholder="Search listings..." 
                className="pl-10 bg-black/60 border-gray-700 text-gray-300 w-full md:w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <Popover open={showFilters} onOpenChange={setShowFilters}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="h-10 bg-black/60 border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] bg-black/90 border-gray-700 text-gray-300">
                <div className="space-y-4">
                  <h4 className="font-medium">Filter Options</h4>
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Amount Range</h5>
                    <Select 
                      defaultValue={amountRange} 
                      onValueChange={setAmountRange}
                    >
                      <SelectTrigger className="w-full bg-black/60 border-gray-700">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-gray-700 text-gray-300">
                        <SelectItem value="all">Any amount</SelectItem>
                        <SelectItem value="small">Up to $50,000</SelectItem>
                        <SelectItem value="medium">$50,000 - $250,000</SelectItem>
                        <SelectItem value="large">$250,000 - $1M</SelectItem>
                        <SelectItem value="xlarge">Over $1M</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Sort By</h5>
                    <Select 
                      defaultValue={sortBy} 
                      onValueChange={setSortBy}
                    >
                      <SelectTrigger className="w-full bg-black/60 border-gray-700">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-gray-700 text-gray-300">
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="amountAsc">Amount (Low to High)</SelectItem>
                        <SelectItem value="amountDesc">Amount (High to Low)</SelectItem>
                        <SelectItem value="rateAsc">Rate (Low to High)</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-2">
                    <Button 
                      onClick={() => setShowFilters(false)} 
                      className="w-full bg-cyan-600 hover:bg-cyan-700"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button 
              variant="outline" 
              className="h-10 bg-black/60 border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
          <TabsList className="mb-8 bg-black/40 border border-gray-800">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400"
            >
              All Listings
            </TabsTrigger>
            <TabsTrigger 
              value="loans" 
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400"
            >
              Business Loans
            </TabsTrigger>
            <TabsTrigger 
              value="credit" 
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400"
            >
              Credit Lines
            </TabsTrigger>
            <TabsTrigger 
              value="specialized" 
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400"
            >
              Specialized Finance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Loan Listing Cards */}
              <FinanceListing
                title="Working Capital Express"
                lender="Capital First Bank"
                amount="$10,000 - $250,000"
                term="3-18 months"
                rate="Starting at 6.9%"
                type="loan"
                tags={["Fast Approval", "No Collateral"]}
                onSave={() => handleSaveToFavorites("Working Capital Express")}
                onApply={() => handleApplyNow("Working Capital Express")}
              />
              
              <FinanceListing
                title="Growth Accelerator Loan"
                lender="Expansion Capital Partners"
                amount="$50,000 - $1M"
                term="1-5 years"
                rate="7.5% - 12%"
                type="loan"
                tags={["Expansion", "Equipment"]}
                onSave={() => handleSaveToFavorites("Growth Accelerator Loan")}
                onApply={() => handleApplyNow("Growth Accelerator Loan")}
              />
              
              <FinanceListing
                title="Flexible Business Credit Line"
                lender="Horizon Financial"
                amount="Up to $150,000"
                term="Revolving"
                rate="10% - 16%"
                type="credit"
                tags={["Draw as Needed", "Low Minimum Payments"]}
                onSave={() => handleSaveToFavorites("Flexible Business Credit Line")}
                onApply={() => handleApplyNow("Flexible Business Credit Line")}
              />
              
              <FinanceListing
                title="Manufacturing Equipment Financing"
                lender="Industrial Finance Group"
                amount="$25,000 - $500,000"
                term="3-7 years"
                rate="5.9% - 9.8%"
                type="specialized"
                tags={["Equipment Specific", "Tax Benefits"]}
                onSave={() => handleSaveToFavorites("Manufacturing Equipment Financing")}
                onApply={() => handleApplyNow("Manufacturing Equipment Financing")}
              />
              
              <FinanceListing
                title="Startup Growth Capital"
                lender="Venture Lending Associates"
                amount="$100,000 - $2M"
                term="2-4 years"
                rate="10% - 18%"
                type="loan"
                tags={["Early Stage", "Minimal Documentation"]}
                onSave={() => handleSaveToFavorites("Startup Growth Capital")}
                onApply={() => handleApplyNow("Startup Growth Capital")}
              />
              
              <FinanceListing
                title="Merchant Cash Advance"
                lender="Future Revenue Capital"
                amount="$5,000 - $250,000"
                term="3-12 months"
                rate="Factor rate: 1.1 - 1.5"
                type="specialized"
                tags={["Revenue Based", "Quick Funding"]}
                onSave={() => handleSaveToFavorites("Merchant Cash Advance")}
                onApply={() => handleApplyNow("Merchant Cash Advance")}
              />
              
              <FinanceListing
                title="Commercial Real Estate Loan"
                lender="Property Finance Trust"
                amount="$200,000 - $5M"
                term="5-20 years"
                rate="4.5% - 7.25%"
                type="loan"
                tags={["Real Estate", "Low Rates"]}
                onSave={() => handleSaveToFavorites("Commercial Real Estate Loan")}
                onApply={() => handleApplyNow("Commercial Real Estate Loan")}
              />
              
              <FinanceListing
                title="Small Business Administration (SBA) Loan"
                lender="National Business Bank"
                amount="$50,000 - $5M"
                term="Up to 25 years"
                rate="6% - 8%"
                type="loan"
                tags={["Government Backed", "Low Down Payment"]}
                onSave={() => handleSaveToFavorites("Small Business Administration (SBA) Loan")}
                onApply={() => handleApplyNow("Small Business Administration (SBA) Loan")}
              />
              
              <FinanceListing
                title="Inventory Financing"
                lender="Supply Chain Capital"
                amount="$20,000 - $1M"
                term="3-12 months"
                rate="8% - 15%"
                type="specialized"
                tags={["Inventory Specific", "Seasonal Business"]}
                onSave={() => handleSaveToFavorites("Inventory Financing")}
                onApply={() => handleApplyNow("Inventory Financing")}
              />
            </div>
          </TabsContent>

          <TabsContent value="loans" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FinanceListing
                title="Working Capital Express"
                lender="Capital First Bank"
                amount="$10,000 - $250,000"
                term="3-18 months"
                rate="Starting at 6.9%"
                type="loan"
                tags={["Fast Approval", "No Collateral"]}
                onSave={() => handleSaveToFavorites("Working Capital Express")}
                onApply={() => handleApplyNow("Working Capital Express")}
              />
              
              <FinanceListing
                title="Growth Accelerator Loan"
                lender="Expansion Capital Partners"
                amount="$50,000 - $1M"
                term="1-5 years"
                rate="7.5% - 12%"
                type="loan"
                tags={["Expansion", "Equipment"]}
                onSave={() => handleSaveToFavorites("Growth Accelerator Loan")}
                onApply={() => handleApplyNow("Growth Accelerator Loan")}
              />
              
              <FinanceListing
                title="Startup Growth Capital"
                lender="Venture Lending Associates"
                amount="$100,000 - $2M"
                term="2-4 years"
                rate="10% - 18%"
                type="loan"
                tags={["Early Stage", "Minimal Documentation"]}
                onSave={() => handleSaveToFavorites("Startup Growth Capital")}
                onApply={() => handleApplyNow("Startup Growth Capital")}
              />
              
              <FinanceListing
                title="Commercial Real Estate Loan"
                lender="Property Finance Trust"
                amount="$200,000 - $5M"
                term="5-20 years"
                rate="4.5% - 7.25%"
                type="loan"
                tags={["Real Estate", "Low Rates"]}
                onSave={() => handleSaveToFavorites("Commercial Real Estate Loan")}
                onApply={() => handleApplyNow("Commercial Real Estate Loan")}
              />
              
              <FinanceListing
                title="Small Business Administration (SBA) Loan"
                lender="National Business Bank"
                amount="$50,000 - $5M"
                term="Up to 25 years"
                rate="6% - 8%"
                type="loan"
                tags={["Government Backed", "Low Down Payment"]}
                onSave={() => handleSaveToFavorites("Small Business Administration (SBA) Loan")}
                onApply={() => handleApplyNow("Small Business Administration (SBA) Loan")}
              />
            </div>
          </TabsContent>

          <TabsContent value="credit" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FinanceListing
                title="Flexible Business Credit Line"
                lender="Horizon Financial"
                amount="Up to $150,000"
                term="Revolving"
                rate="10% - 16%"
                type="credit"
                tags={["Draw as Needed", "Low Minimum Payments"]}
                onSave={() => handleSaveToFavorites("Flexible Business Credit Line")}
                onApply={() => handleApplyNow("Flexible Business Credit Line")}
              />
              
              <FinanceListing
                title="Business Platinum Credit Line"
                lender="Apex Finance Partners"
                amount="$25,000 - $250,000"
                term="Revolving"
                rate="8.5% - 14%"
                type="credit"
                tags={["Revolving Credit", "Flexible Terms"]}
                onSave={() => handleSaveToFavorites("Business Platinum Credit Line")}
                onApply={() => handleApplyNow("Business Platinum Credit Line")}
              />
              
              <FinanceListing
                title="Secured Business Credit Line"
                lender="Security Finance Group"
                amount="$50,000 - $500,000"
                term="Revolving"
                rate="6% - 9%"
                type="credit"
                tags={["Secured", "Lower Rates"]}
                onSave={() => handleSaveToFavorites("Secured Business Credit Line")}
                onApply={() => handleApplyNow("Secured Business Credit Line")}
              />
            </div>
          </TabsContent>

          <TabsContent value="specialized" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FinanceListing
                title="Manufacturing Equipment Financing"
                lender="Industrial Finance Group"
                amount="$25,000 - $500,000"
                term="3-7 years"
                rate="5.9% - 9.8%"
                type="specialized"
                tags={["Equipment Specific", "Tax Benefits"]}
                onSave={() => handleSaveToFavorites("Manufacturing Equipment Financing")}
                onApply={() => handleApplyNow("Manufacturing Equipment Financing")}
              />
              
              <FinanceListing
                title="Merchant Cash Advance"
                lender="Future Revenue Capital"
                amount="$5,000 - $250,000"
                term="3-12 months"
                rate="Factor rate: 1.1 - 1.5"
                type="specialized"
                tags={["Revenue Based", "Quick Funding"]}
                onSave={() => handleSaveToFavorites("Merchant Cash Advance")}
                onApply={() => handleApplyNow("Merchant Cash Advance")}
              />
              
              <FinanceListing
                title="Inventory Financing"
                lender="Supply Chain Capital"
                amount="$20,000 - $1M"
                term="3-12 months"
                rate="8% - 15%"
                type="specialized"
                tags={["Inventory Specific", "Seasonal Business"]}
                onSave={() => handleSaveToFavorites("Inventory Financing")}
                onApply={() => handleApplyNow("Inventory Financing")}
              />
              
              <FinanceListing
                title="Accounts Receivable Factoring"
                lender="AR Finance Solutions"
                amount="Based on receivables"
                term="30-90 days"
                rate="1-3% per month"
                type="specialized"
                tags={["Invoice Based", "Immediate Cash"]}
                onSave={() => handleSaveToFavorites("Accounts Receivable Factoring")}
                onApply={() => handleApplyNow("Accounts Receivable Factoring")}
              />
              
              <FinanceListing
                title="Equipment Leasing"
                lender="Tech Capital Leasing"
                amount="$10,000 - $1M"
                term="2-5 years"
                rate="Lease factor: 0.028 - 0.04"
                type="specialized"
                tags={["Lease to Own", "100% Financing"]}
                onSave={() => handleSaveToFavorites("Equipment Leasing")}
                onApply={() => handleApplyNow("Equipment Leasing")}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface FinanceListingProps {
  title: string;
  lender: string;
  amount: string;
  term: string;
  rate: string;
  type: 'loan' | 'credit' | 'specialized';
  tags: string[];
  onSave: () => void;
  onApply: () => void;
}

const FinanceListing: React.FC<FinanceListingProps> = ({
  title,
  lender,
  amount,
  term,
  rate,
  type,
  tags,
  onSave,
  onApply
}) => {
  const getTypeColor = (type: string) => {
    switch(type) {
      case 'loan': return 'bg-blue-800 text-blue-100';
      case 'credit': return 'bg-green-800 text-green-100';
      case 'specialized': return 'bg-purple-800 text-purple-100';
      default: return 'bg-gray-800 text-gray-100';
    }
  };

  return (
    <Card className="bg-black/20 border-gray-800 hover:border-cyan-900 transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-cyan-400 mb-1 flex items-center gap-2">
              {title}
              <Badge className={`text-xs py-0 h-5 ${getTypeColor(type)}`}>
                {type === 'loan' ? 'Loan' : type === 'credit' ? 'Credit Line' : 'Specialized'}
              </Badge>
            </CardTitle>
            <p className="text-sm text-gray-400">Provided by {lender}</p>
          </div>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={onSave}>
            <Bookmark className="h-5 w-5 text-gray-500 hover:text-cyan-400" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-y-3 mb-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Amount Range</p>
              <p className="text-sm font-medium">{amount}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Term</p>
              <p className="text-sm font-medium">{term}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BadgePercent className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Interest Rate</p>
              <p className="text-sm font-medium">{rate}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Analytics</p>
              <p className="text-sm font-medium text-cyan-400">View Report</p>
            </div>
          </div>
        </div>
        
        <Separator className="my-3 bg-gray-800" />
        
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
          onClick={onApply}
        >
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Marketplace;
