
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Filter, Clock, ArrowUpDown, Bookmark } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Marketplace = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

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
            
            <Button variant="outline" className="h-10 bg-black/60 border-gray-700 text-gray-300 hover:bg-gray-800">
              <Filter className="h-4 w-4 mr-2" />
              Filters
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
            />
            
            <FinanceListing
              title="Growth Accelerator Loan"
              lender="Expansion Capital Partners"
              amount="$50,000 - $1M"
              term="1-5 years"
              rate="7.5% - 12%"
              type="loan"
              tags={["Expansion", "Equipment"]}
            />
            
            <FinanceListing
              title="Flexible Business Credit Line"
              lender="Horizon Financial"
              amount="Up to $150,000"
              term="Revolving"
              rate="10% - 16%"
              type="credit"
              tags={["Draw as Needed", "Low Minimum Payments"]}
            />
            
            <FinanceListing
              title="Manufacturing Equipment Financing"
              lender="Industrial Finance Group"
              amount="$25,000 - $500,000"
              term="3-7 years"
              rate="5.9% - 9.8%"
              type="specialized"
              tags={["Equipment Specific", "Tax Benefits"]}
            />
            
            <FinanceListing
              title="Startup Growth Capital"
              lender="Venture Lending Associates"
              amount="$100,000 - $2M"
              term="2-4 years"
              rate="10% - 18%"
              type="loan"
              tags={["Early Stage", "Minimal Documentation"]}
            />
            
            <FinanceListing
              title="Merchant Cash Advance"
              lender="Future Revenue Capital"
              amount="$5,000 - $250,000"
              term="3-12 months"
              rate="Factor rate: 1.1 - 1.5"
              type="specialized"
              tags={["Revenue Based", "Quick Funding"]}
            />
            
            <FinanceListing
              title="Commercial Real Estate Loan"
              lender="Property Finance Trust"
              amount="$200,000 - $5M"
              term="5-20 years"
              rate="4.5% - 7.25%"
              type="loan"
              tags={["Real Estate", "Low Rates"]}
            />
            
            <FinanceListing
              title="Small Business Administration (SBA) Loan"
              lender="National Business Bank"
              amount="$50,000 - $5M"
              term="Up to 25 years"
              rate="6% - 8%"
              type="loan"
              tags={["Government Backed", "Low Down Payment"]}
            />
            
            <FinanceListing
              title="Inventory Financing"
              lender="Supply Chain Capital"
              amount="$20,000 - $1M"
              term="3-12 months"
              rate="8% - 15%"
              type="specialized"
              tags={["Inventory Specific", "Seasonal Business"]}
            />
          </div>
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
}

const FinanceListing: React.FC<FinanceListingProps> = ({
  title,
  lender,
  amount,
  term,
  rate,
  type,
  tags
}) => {
  return (
    <Card className="bg-black/20 border-gray-800 hover:border-cyan-900 transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-cyan-400 mb-1">{title}</CardTitle>
            <p className="text-sm text-gray-400">Provided by {lender}</p>
          </div>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Bookmark className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-y-3 mb-3">
          <div>
            <p className="text-xs text-gray-500">Amount Range</p>
            <p className="text-sm font-medium">{amount}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Term</p>
            <p className="text-sm font-medium">{term}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Interest Rate</p>
            <p className="text-sm font-medium">{rate}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Type</p>
            <p className="text-sm font-medium capitalize">{type}</p>
          </div>
        </div>
        
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
        <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Marketplace;
