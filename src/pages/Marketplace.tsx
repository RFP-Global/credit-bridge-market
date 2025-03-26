
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Eye, Filter, Check, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

const marketplaceData = [
  {
    id: "75",
    projectName: "Project A",
    facilityType: "Term Loan",
    financing: "New Financing",
    principal: "$500,000",
    rateType: "Fixed",
    targetRate: "12.00%",
    term: "36 Months",
    status: "OPEN",
    deadline: "21:08:30",
    lender: "Regional Bank",
    industry: "Construction",
    bidVolume: 75
  },
  {
    id: "82",
    projectName: "Project B",
    facilityType: "364-Day Revolver",
    financing: "Refinancing",
    principal: "$1,500,000",
    rateType: "Fixed",
    targetRate: "10.175%",
    term: "12 Months",
    status: "OPEN",
    deadline: "00:05:35",
    lender: "Community Bank",
    industry: "Real Estate",
    bidVolume: 85
  },
  {
    id: "54",
    projectName: "Project C",
    facilityType: "Asset-Based Loan",
    financing: "Refinancing",
    principal: "$250,000",
    rateType: "Floating",
    targetRate: "SOFR + 350",
    term: "14 Months",
    status: "OPEN",
    deadline: "02:11:10",
    lender: "National Bank",
    industry: "Healthcare",
    bidVolume: 60
  },
  {
    id: "94",
    projectName: "Project D",
    facilityType: "SBA Loan",
    financing: "New Financing",
    principal: "$5,000,000",
    rateType: "Floating",
    targetRate: "SOFR + 200",
    term: "24 Months",
    status: "COMPLETED",
    deadline: "Closed",
    lender: "FinTech",
    industry: "Manufacturing",
    bidVolume: 90
  },
  {
    id: "47",
    projectName: "Project E",
    facilityType: "Equipment Financing",
    financing: "Refinancing",
    principal: "$7,500,000",
    rateType: "Floating",
    targetRate: "8.750%",
    term: "60 Months",
    status: "EXPIRED",
    deadline: "Closed",
    lender: "Private Credit",
    industry: "Manufacturing",
    bidVolume: 45
  }
];

const facilityTypes = ["Term Loan", "364-Day Revolver", "Asset-Based Loan", "SBA Loan", "Equipment Financing"];
const rateTypes = ["Fixed", "Floating"];
const financingTypes = ["New Financing", "Refinancing"];
const industries = ["Construction", "Real Estate", "Healthcare", "Manufacturing"];
const statuses = ["OPEN", "COMPLETED", "EXPIRED"];

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(marketplaceData);
  const [filters, setFilters] = useState({
    facilityType: [],
    financing: [],
    rateType: [],
    industry: [],
    status: []
  });
  
  // Apply filters and search to the data
  useEffect(() => {
    let result = [...marketplaceData];
    
    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.projectName.toLowerCase().includes(query) ||
        item.facilityType.toLowerCase().includes(query) ||
        item.principal.toLowerCase().includes(query) ||
        item.industry.toLowerCase().includes(query) ||
        item.lender.toLowerCase().includes(query)
      );
    }
    
    // Apply filters
    if (filters.facilityType.length > 0) {
      result = result.filter(item => filters.facilityType.includes(item.facilityType));
    }
    
    if (filters.financing.length > 0) {
      result = result.filter(item => filters.financing.includes(item.financing));
    }
    
    if (filters.rateType.length > 0) {
      result = result.filter(item => filters.rateType.includes(item.rateType));
    }
    
    if (filters.industry.length > 0) {
      result = result.filter(item => filters.industry.includes(item.industry));
    }
    
    if (filters.status.length > 0) {
      result = result.filter(item => filters.status.includes(item.status));
    }
    
    setFilteredData(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, filters]);

  // Handle filter changes
  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const updatedCategory = [...prev[category]];
      
      if (updatedCategory.includes(value)) {
        // Remove the value
        const index = updatedCategory.indexOf(value);
        updatedCategory.splice(index, 1);
      } else {
        // Add the value
        updatedCategory.push(value);
      }
      
      return {
        ...prev,
        [category]: updatedCategory
      };
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      facilityType: [],
      financing: [],
      rateType: [],
      industry: [],
      status: []
    });
    setSearchQuery("");
    toast.success("All filters have been cleared.");
  };

  // Handle pagination
  const itemsPerPage = 5;
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle view project
  const handleViewProject = (projectId) => {
    toast.info(`Viewing details for project ${projectId}`);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-primary mb-2">
                Proposals
              </h1>
              <p className="text-sm text-muted-foreground">
                Browse and engage with active loan requests from businesses seeking financing
              </p>
            </div>
            <Button variant="default" className="font-mono text-xs" onClick={() => toast.info("New proposal functionality coming soon")}>
              New Proposal
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-primary/30 text-foreground pl-10"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground">
                  <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
            
            {/* Facility Type Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2 font-mono text-xs border-primary/30">
                  <Filter className="h-4 w-4" />
                  Loan Request Type
                  {filters.facilityType.length > 0 && (
                    <span className="ml-1 rounded-full bg-primary w-5 h-5 flex items-center justify-center text-[10px] text-primary-foreground">
                      {filters.facilityType.length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-2 rounded-md border border-primary/30 bg-background">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-mono font-semibold">FACILITY TYPE</p>
                    {filters.facilityType.length > 0 && (
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => setFilters(prev => ({...prev, facilityType: []}))}>
                        Clear
                      </Button>
                    )}
                  </div>
                  <div className="space-y-1">
                    {facilityTypes.map(type => (
                      <div 
                        key={type}
                        className="flex items-center justify-between p-2 text-xs rounded-sm cursor-pointer hover:bg-primary/5"
                        onClick={() => toggleFilter('facilityType', type)}
                      >
                        <span>{type}</span>
                        {filters.facilityType.includes(type) ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            {/* Target Terms Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2 font-mono text-xs border-primary/30">
                  <Filter className="h-4 w-4" />
                  Target Terms
                  {(filters.financing.length > 0 || filters.rateType.length > 0) && (
                    <span className="ml-1 rounded-full bg-primary w-5 h-5 flex items-center justify-center text-[10px] text-primary-foreground">
                      {filters.financing.length + filters.rateType.length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-2 rounded-md border border-primary/30 bg-background">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-mono font-semibold">FINANCING</p>
                      {filters.financing.length > 0 && (
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => setFilters(prev => ({...prev, financing: []}))}>
                          Clear
                        </Button>
                      )}
                    </div>
                    <div className="space-y-1">
                      {financingTypes.map(type => (
                        <div 
                          key={type}
                          className="flex items-center justify-between p-2 text-xs rounded-sm cursor-pointer hover:bg-primary/5"
                          onClick={() => toggleFilter('financing', type)}
                        >
                          <span>{type}</span>
                          {filters.financing.includes(type) ? (
                            <Check className="h-4 w-4 text-primary" />
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-mono font-semibold">RATE TYPE</p>
                      {filters.rateType.length > 0 && (
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => setFilters(prev => ({...prev, rateType: []}))}>
                          Clear
                        </Button>
                      )}
                    </div>
                    <div className="space-y-1">
                      {rateTypes.map(type => (
                        <div 
                          key={type}
                          className="flex items-center justify-between p-2 text-xs rounded-sm cursor-pointer hover:bg-primary/5"
                          onClick={() => toggleFilter('rateType', type)}
                        >
                          <span>{type}</span>
                          {filters.rateType.includes(type) ? (
                            <Check className="h-4 w-4 text-primary" />
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            {/* Deal Activity Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2 font-mono text-xs border-primary/30">
                  <Filter className="h-4 w-4" />
                  Deal Activity Metrics
                  {(filters.industry.length > 0 || filters.status.length > 0) && (
                    <span className="ml-1 rounded-full bg-primary w-5 h-5 flex items-center justify-center text-[10px] text-primary-foreground">
                      {filters.industry.length + filters.status.length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-2 rounded-md border border-primary/30 bg-background">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-mono font-semibold">INDUSTRY</p>
                      {filters.industry.length > 0 && (
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => setFilters(prev => ({...prev, industry: []}))}>
                          Clear
                        </Button>
                      )}
                    </div>
                    <div className="space-y-1">
                      {industries.map(type => (
                        <div 
                          key={type}
                          className="flex items-center justify-between p-2 text-xs rounded-sm cursor-pointer hover:bg-primary/5"
                          onClick={() => toggleFilter('industry', type)}
                        >
                          <span>{type}</span>
                          {filters.industry.includes(type) ? (
                            <Check className="h-4 w-4 text-primary" />
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-mono font-semibold">STATUS</p>
                      {filters.status.length > 0 && (
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => setFilters(prev => ({...prev, status: []}))}>
                          Clear
                        </Button>
                      )}
                    </div>
                    <div className="space-y-1">
                      {statuses.map(type => (
                        <div 
                          key={type}
                          className="flex items-center justify-between p-2 text-xs rounded-sm cursor-pointer hover:bg-primary/5"
                          onClick={() => toggleFilter('status', type)}
                        >
                          <span>{type}</span>
                          {filters.status.includes(type) ? (
                            <Check className="h-4 w-4 text-primary" />
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            {(Object.values(filters).some(array => array.length > 0) || searchQuery) && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-1 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={clearFilters}
              >
                <X className="h-3 w-3" />
                Clear All
              </Button>
            )}
          </div>

          <Card className="terminal-card border border-primary/30">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-primary/20">
                      <TableHead className="text-xs text-muted-foreground font-mono w-[50px]"></TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">
                        RFP<br/>CREDIT<br/>RATING
                      </TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">
                        PROJECT<br/>NAME
                      </TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">
                        FACILITY<br/>TYPE
                      </TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">
                        NEW FINANCING<br/>OR<br/>REFINANCING
                      </TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">
                        TARGET<br/>PRINCIPAL
                      </TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">
                        INTEREST RATE<br/>TYPE
                      </TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">
                        TARGET<br/>INTEREST<br/>RATE
                      </TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">
                        TARGET<br/>TERM
                      </TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">STATUS</TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">BID DEADLINE</TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">
                        LENDER<br/>PREFERENCES
                      </TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">INDUSTRY</TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">BID VOLUME</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={14} className="text-center py-8 text-muted-foreground">
                          No results found. Try adjusting your search or filters.
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedData.map((item) => (
                        <TableRow 
                          key={item.id}
                          className="hover:bg-primary/5 border-primary/20"
                        >
                          <TableCell className="py-3">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleViewProject(item.id)}
                            >
                              <Eye className="h-4 w-4 text-primary/80" />
                            </Button>
                          </TableCell>
                          <TableCell className="font-mono py-3">
                            <div className="flex items-center justify-center">
                              <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center text-primary text-xs">
                                {item.id}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-foreground py-3">{item.projectName}</TableCell>
                          <TableCell className="font-mono text-foreground py-3">{item.facilityType}</TableCell>
                          <TableCell className="font-mono text-foreground py-3">{item.financing}</TableCell>
                          <TableCell className="font-mono text-foreground py-3">{item.principal}</TableCell>
                          <TableCell className="font-mono text-foreground py-3">{item.rateType}</TableCell>
                          <TableCell className="font-mono text-foreground py-3">{item.targetRate}</TableCell>
                          <TableCell className="font-mono text-foreground py-3">{item.term}</TableCell>
                          <TableCell className="py-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-mono
                              ${item.status === 'OPEN' ? 'bg-emerald-400/10 text-emerald-400' :
                                item.status === 'COMPLETED' ? 'bg-blue-400/10 text-blue-400' :
                                'bg-gray-400/10 text-gray-400'}`}>
                              {item.status}
                            </span>
                          </TableCell>
                          <TableCell className="font-mono text-foreground py-3">{item.deadline}</TableCell>
                          <TableCell className="font-mono text-foreground py-3">{item.lender}</TableCell>
                          <TableCell className="font-mono text-foreground py-3">{item.industry}</TableCell>
                          <TableCell className="py-3">
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-full rounded-full" 
                                style={{ width: `${item.bidVolume}%` }}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {pageCount > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, pageCount) }).map((_, i) => {
                    // Show first page, last page, and pages around current page
                    let pageNum;
                    if (pageCount <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= pageCount - 2) {
                      pageNum = pageCount - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <PaginationItem key={i}>
                        <PaginationLink 
                          onClick={() => handlePageChange(pageNum)}
                          isActive={currentPage === pageNum}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  {pageCount > 5 && currentPage < pageCount - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  
                  {pageCount > 5 && currentPage < pageCount - 1 && (
                    <PaginationItem>
                      <PaginationLink 
                        onClick={() => handlePageChange(pageCount)}
                        className="cursor-pointer"
                      >
                        {pageCount}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(Math.min(pageCount, currentPage + 1))}
                      className={currentPage === pageCount ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Marketplace;
