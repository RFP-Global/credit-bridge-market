import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  Bar, 
  Line, 
  Pie, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell, 
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  Download, 
  Settings, 
  Filter
} from "lucide-react";
import IntelligenceAnalyticsCard from "@/components/IntelligenceAnalyticsCard";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  ResizablePanelGroup, 
  ResizablePanel, 
  ResizableHandle 
} from "@/components/ui/resizable";

// Mock data for the charts
const businessSizeData = [
  { name: 'Small Business', pending: 45, approved: 78, rejected: 23, rate: 0.32 },
  { name: 'Medium Business', approved: 65, pending: 32, rejected: 12, rate: 0.36 },
  { name: 'Large Business', approved: 88, pending: 45, rejected: 34, rate: 0.32 }
];

const pieBusinessSizeData = [
  { name: 'Small Business', value: 40 },
  { name: 'Medium Business', value: 25 },
  { name: 'Large Business', value: 35 }
];

const industryData = [
  { name: 'Manufacturing', value: 30, color: '#33bbef' },
  { name: 'Construction', value: 25, color: '#8B5CF6' },
  { name: 'Tech', value: 20, color: '#10b981' },
  { name: 'Retail', value: 15, color: '#F97316' },
  { name: 'Healthcare', value: 10, color: '#fbd024' }
];

const industryPieData = [
  { name: 'Manufacturing', value: 22 },
  { name: 'Construction', value: 28 },
  { name: 'Tech', value: 22 },
  { name: 'Retail', value: 18 },
  { name: 'Healthcare', value: 10 }
];

const industryStackedData = [
  { 
    name: 'Manufacturing', 
    workingCapital: 200, 
    expansion: 300, 
    equipment: 150, 
    other: 100 
  },
  { 
    name: 'Construction', 
    workingCapital: 150, 
    expansion: 250, 
    equipment: 200, 
    other: 180 
  },
  { 
    name: 'Tech', 
    workingCapital: 100, 
    expansion: 200, 
    equipment: 150, 
    other: 120 
  },
  { 
    name: 'Retail', 
    workingCapital: 120, 
    expansion: 180, 
    equipment: 90, 
    other: 60 
  },
  { 
    name: 'Healthcare', 
    workingCapital: 80, 
    expansion: 120, 
    equipment: 70, 
    other: 50 
  }
];

const timeSeriesData = [
  { month: 'Jan', small: 20, medium: 30, large: 45 },
  { month: 'Feb', small: 25, medium: 35, large: 50 },
  { month: 'Mar', small: 30, medium: 40, large: 55 },
  { month: 'Apr', small: 35, medium: 45, large: 60 },
  { month: 'May', small: 40, medium: 50, large: 65 },
  { month: 'Jun', small: 45, medium: 55, large: 40 }
];

const loanRequestData = [
  { name: 'Small', pending: 40, approved: 75, rejected: 20 },
  { name: 'Medium', pending: 35, approved: 60, rejected: 25 },
  { name: 'Large', pending: 55, approved: 80, rejected: 30 }
];

const loanApprovalData = [
  { category: 'Small Business', approved: 65, rejected: 35 },
  { category: 'Medium Business', approved: 78, rejected: 22 },
  { category: 'Large Business', approved: 85, rejected: 15 }
];

const structureData = [
  { type: 'LLC', workingCapital: 42, expansion: 35, equipment: 23, rate: 7.5 },
  { type: 'Corporate', workingCapital: 28, expansion: 45, equipment: 32, rate: 6.2 },
  { type: 'Partnership', workingCapital: 30, expansion: 25, equipment: 28, rate: 8.1 }
];

const loanTermData = [
  { entity: 'Small', shortTerm: 25, mediumTerm: 40, longTerm: 35 },
  { entity: 'Medium', shortTerm: 30, mediumTerm: 45, longTerm: 25 },
  { entity: 'Large', shortTerm: 20, mediumTerm: 30, longTerm: 50 }
];

const structureLoanTermData = [
  { month: 'Jan', llc: 30, corporate: 45, partnership: 25 },
  { month: 'Feb', llc: 35, corporate: 50, partnership: 30 },
  { month: 'Mar', llc: 45, corporate: 40, partnership: 35 },
  { month: 'Apr', llc: 40, corporate: 35, partnership: 30 },
  { month: 'May', llc: 30, corporate: 30, partnership: 35 },
  { month: 'Jun', llc: 35, corporate: 25, partnership: 30 }
];

const industryLoanTermData = [
  { month: 'Jan', retail: 30, tech: 45, construction: 25, healthcare: 20, manufacturing: 35 },
  { month: 'Feb', retail: 35, tech: 50, construction: 30, healthcare: 25, manufacturing: 40 },
  { month: 'Mar', retail: 45, tech: 40, construction: 35, healthcare: 30, manufacturing: 35 },
  { month: 'Apr', retail: 40, tech: 35, construction: 45, healthcare: 20, manufacturing: 30 },
  { month: 'May', retail: 30, tech: 30, construction: 40, healthcare: 25, manufacturing: 35 },
  { month: 'Jun', retail: 35, tech: 25, construction: 30, healthcare: 40, manufacturing: 45 }
];

const COLORS = ['#33bbef', '#8B5CF6', '#10b981', '#F97316', '#fbd024'];
const DARK_COLORS = ['#0284c7', '#6d28d9', '#059669', '#c2410c', '#ca8a04'];

const Intelligence = () => {
  const [timeFilter, setTimeFilter] = useState("last-year");
  const [chartType, setChartType] = useState("bar");
  const [businessSize, setBusinessSize] = useState("all");
  const [industry, setIndustry] = useState("all");

  return (
    <div className="min-h-screen bg-black text-gray-200 overflow-x-hidden">
      <Navbar />
      <div className="container mx-auto px-2 py-6 mt-16">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-cyan-400">Analytic Intelligence</h1>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="flex items-center h-8 bg-black/60 border-gray-700 text-gray-300 hover:bg-gray-800">
              <Filter className="h-3.5 w-3.5 mr-1.5" />
              Filters
            </Button>
            <Button variant="outline" className="flex items-center h-8 bg-black/60 border-gray-700 text-gray-300 hover:bg-gray-800">
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Export
            </Button>
            <Button variant="outline" className="flex items-center h-8 bg-black/60 border-gray-700 text-gray-300 hover:bg-gray-800">
              <Settings className="h-3.5 w-3.5 mr-1.5" />
              Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="business" className="w-full">
          <TabsList className="mb-4 bg-black/40 border border-gray-800">
            <TabsTrigger 
              value="business" 
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400"
            >
              Business Demographic Analytics
            </TabsTrigger>
          </TabsList>

          <div className="space-y-4">
            {/* Business Size Analytics */}
            <Card className="bg-black/20 border-gray-800 shadow-lg">
              <CardHeader className="p-3 border-b border-gray-800 bg-black/40 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-cyan-400 flex items-center">
                  Business Size Analytics
                  <ChevronDown className="ml-2 h-4 w-4" />
                </CardTitle>
                <div className="flex space-x-2 text-xs text-gray-400">
                  <span className="border-b border-cyan-400 px-1">Last Year</span>
                  <span className="px-1">6 Months</span>
                  <span className="px-1">Last Month</span>
                  <span className="px-1">Last Week</span>
                  <span className="px-1">Today</span>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <IntelligenceAnalyticsCard 
                    title="Loan Request Patterns by Size"
                    timeFilter={timeFilter}
                    onTimeFilterChange={setTimeFilter}
                  >
                    <BarChart 
                      width={450} 
                      height={220} 
                      data={loanRequestData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="pending" name="Pending Loans" fill="#33bbef" />
                      <Bar dataKey="approved" name="Approved" fill="#10b981" />
                      <Bar dataKey="rejected" name="Rejected" fill="#F97316" />
                    </BarChart>
                  </IntelligenceAnalyticsCard>

                  <IntelligenceAnalyticsCard 
                    title="Loan Default Distribution By Business Size"
                    timeFilter={timeFilter}
                    onTimeFilterChange={setTimeFilter}
                  >
                    <PieChart width={450} height={220}>
                      <Pie
                        data={pieBusinessSizeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        innerRadius={50}
                        fill="#8884d8"
                        dataKey="value"
                        label={renderCustomizedLabel}
                      >
                        {pieBusinessSizeData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]} 
                            stroke="rgba(0,0,0,0.3)"
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend 
                        layout="vertical" 
                        verticalAlign="middle" 
                        align="right"
                        wrapperStyle={{ right: 10, top: 0, fontSize: '12px' }}
                      />
                    </PieChart>
                  </IntelligenceAnalyticsCard>

                  <IntelligenceAnalyticsCard 
                    title="Loan Terms By Business Size"
                    timeFilter={timeFilter}
                    onTimeFilterChange={setTimeFilter}
                  >
                    <LineChart 
                      width={450} 
                      height={220} 
                      data={timeSeriesData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="month" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="small" 
                        name="Small Business" 
                        stroke="#33bbef" 
                        strokeWidth={2}
                        dot={{ r: 4 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="medium" 
                        name="Medium Business" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        dot={{ r: 4 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="large" 
                        name="Large Business" 
                        stroke="#F97316" 
                        strokeWidth={2}
                        dot={{ r: 4 }} 
                      />
                    </LineChart>
                  </IntelligenceAnalyticsCard>

                  <IntelligenceAnalyticsCard 
                    title="Loan Approval and Rejection Rates"
                    timeFilter={timeFilter}
                    onTimeFilterChange={setTimeFilter}
                  >
                    <BarChart 
                      width={450} 
                      height={220} 
                      data={loanApprovalData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                      <XAxis dataKey="category" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="approved" name="Approved" fill="#10b981" />
                      <Bar dataKey="rejected" name="Rejected" fill="#F97316" />
                    </BarChart>
                  </IntelligenceAnalyticsCard>
                </div>
              </CardContent>
            </Card>

            {/* Industry Type Analytics */}
            <Card className="bg-black/20 border-gray-800 shadow-lg">
              <CardHeader className="p-3 border-b border-gray-800 bg-black/40 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-cyan-400 flex items-center">
                  Industry Type Analytics
                  <ChevronDown className="ml-2 h-4 w-4" />
                </CardTitle>
                <div className="flex space-x-2 text-xs text-gray-400">
                  <span className="border-b border-cyan-400 px-1">Last Year</span>
                  <span className="px-1">6 Months</span>
                  <span className="px-1">Last Month</span>
                  <span className="px-1">Last Week</span>
                  <span className="px-1">Today</span>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <IntelligenceAnalyticsCard 
                    title="Loan Usage Trends by Industry"
                    timeFilter={timeFilter}
                    onTimeFilterChange={setTimeFilter}
                  >
                    <BarChart
                      width={450}
                      height={220}
                      data={industryStackedData}
                      layout="vertical"
                      margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis type="number" stroke="#888" />
                      <YAxis dataKey="name" type="category" stroke="#888" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="workingCapital" name="Working Capital" stackId="a" fill="#33bbef" />
                      <Bar dataKey="expansion" name="Expansion" stackId="a" fill="#8B5CF6" />
                      <Bar dataKey="equipment" name="Equipment" stackId="a" fill="#10b981" />
                      <Bar dataKey="other" name="Other" stackId="a" fill="#F97316" />
                    </BarChart>
                  </IntelligenceAnalyticsCard>

                  <IntelligenceAnalyticsCard 
                    title="Loan Default Rates By Industry"
                    timeFilter={timeFilter}
                    onTimeFilterChange={setTimeFilter}
                  >
                    <BarChart 
                      width={450} 
                      height={220} 
                      data={industryData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="value" fill="#33bbef">
                        {industryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </IntelligenceAnalyticsCard>

                  <IntelligenceAnalyticsCard 
                    title="Loan Term Preferences By Industry"
                    timeFilter={timeFilter}
                    onTimeFilterChange={setTimeFilter}
                  >
                    <LineChart 
                      width={450} 
                      height={220} 
                      data={industryLoanTermData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="month" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="retail" 
                        name="Retail" 
                        stroke="#F97316" 
                        strokeWidth={2}
                        dot={{ r: 3 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="tech" 
                        name="Tech" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        dot={{ r: 3 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="construction" 
                        name="Construction" 
                        stroke="#8B5CF6" 
                        strokeWidth={2}
                        dot={{ r: 3 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="manufacturing" 
                        name="Manufacturing" 
                        stroke="#33bbef" 
                        strokeWidth={2}
                        dot={{ r: 3 }} 
                      />
                    </LineChart>
                  </IntelligenceAnalyticsCard>

                  <IntelligenceAnalyticsCard 
                    title="Industry-Specific Loan Volume Distribution"
                    timeFilter={timeFilter}
                    onTimeFilterChange={setTimeFilter}
                  >
                    <PieChart width={450} height={220}>
                      <Pie
                        data={industryPieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        innerRadius={50}
                        fill="#8884d8"
                        dataKey="value"
                        label={renderCustomizedLabel}
                      >
                        {industryPieData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]} 
                            stroke="rgba(0,0,0,0.3)"
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend 
                        layout="vertical" 
                        verticalAlign="middle" 
                        align="right"
                        wrapperStyle={{ right: 10, top: 0, fontSize: '12px' }}
                      />
                    </PieChart>
                  </IntelligenceAnalyticsCard>
                </div>
              </CardContent>
            </Card>

            {/* Business Structure Analytics */}
            <Card className="bg-black/20 border-gray-800 shadow-lg">
              <CardHeader className="p-3 border-b border-gray-800 bg-black/40 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-cyan-400 flex items-center">
                  Loan Volume by Business Structure
                  <ChevronDown className="ml-2 h-4 w-4" />
                </CardTitle>
                <div className="flex space-x-2 text-xs text-gray-400">
                  <span className="border-b border-cyan-400 px-1">Last Year</span>
                  <span className="px-1">6 Months</span>
                  <span className="px-1">Last Month</span>
                  <span className="px-1">Last Week</span>
                  <span className="px-1">Today</span>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <IntelligenceAnalyticsCard 
                    title="Loan Usage Trends by Structure"
                    timeFilter={timeFilter}
                    onTimeFilterChange={setTimeFilter}
                  >
                    <BarChart 
                      width={450} 
                      height={220} 
                      data={structureData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                      <XAxis dataKey="type" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="workingCapital" name="Working Capital" fill="#33bbef" />
                      <Bar dataKey="expansion" name="Expansion" fill="#8B5CF6" />
                      <Bar dataKey="equipment" name="Equipment" fill="#10b981" />
                    </BarChart>
                  </IntelligenceAnalyticsCard>

                  <IntelligenceAnalyticsCard 
                    title="Loan Default Rates By Structure"
                    timeFilter={timeFilter}
                    onTimeFilterChange={setTimeFilter}
                  >
                    <BarChart 
                      width={450} 
                      height={220} 
                      data={structureData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                      <XAxis dataKey="type" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="rate" fill="#33bbef" />
                    </BarChart>
                  </IntelligenceAnalyticsCard>

                  <IntelligenceAnalyticsCard 
                    title="Loan Term Preferences By Structure"
                    timeFilter={timeFilter}
                    onTimeFilterChange={setTimeFilter}
                  >
                    <LineChart 
                      width={450} 
                      height={220} 
                      data={structureLoanTermData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="month" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="llc" 
                        name="LLC" 
                        stroke="#33bbef" 
                        strokeWidth={2}
                        dot={{ r: 3 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="corporate" 
                        name="Corporate" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        dot={{ r: 3 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="partnership" 
                        name="Partnership" 
                        stroke="#F97316" 
                        strokeWidth={2}
                        dot={{ r: 3 }} 
                      />
                    </LineChart>
                  </IntelligenceAnalyticsCard>

                  <IntelligenceAnalyticsCard 
                    title="Loan Application And Approval Trends"
                    timeFilter={timeFilter}
                    onTimeFilterChange={setTimeFilter}
                  >
                    <BarChart 
                      width={450} 
                      height={220} 
                      data={structureData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                      <XAxis dataKey="type" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="workingCapital" name="Approved" fill="#33bbef" />
                      <Bar dataKey="equipment" name="Rejected" fill="#F97316" />
                    </BarChart>
                  </IntelligenceAnalyticsCard>
                </div>
              </CardContent>
            </Card>

            {/* Geographic Analytics */}
            <Card className="bg-black/20 border-gray-800 shadow-lg">
              <CardHeader className="p-3 border-b border-gray-800 bg-black/40 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-cyan-400 flex items-center">
                  Geography
                  <ChevronDown className="ml-2 h-4 w-4" />
                </CardTitle>
                <div className="flex space-x-2 text-xs text-gray-400">
                  <span className="border-b border-cyan-400 px-1">Last Year</span>
                  <span className="px-1">6 Months</span>
                  <span className="px-1">Last Month</span>
                  <span className="px-1">Last Week</span>
                  <span className="px-1">Today</span>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <Card className="bg-black/30 border-gray-800 shadow-lg">
                  <CardHeader className="p-3 border-b border-gray-800 bg-black/40">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-cyan-400">Loan Demand by Region</CardTitle>
                      <Select defaultValue="last-year">
                        <SelectTrigger className="h-8 w-[120px] text-xs bg-black/60 border-gray-700 text-gray-300">
                          <SelectValue placeholder="Last Year" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 border-gray-700 text-gray-300">
                          <SelectItem value="last-day">Last Day</SelectItem>
                          <SelectItem value="last-week">Last Week</SelectItem>
                          <SelectItem value="last-month">Last Month</SelectItem>
                          <SelectItem value="last-year">Last Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="relative h-[350px] bg-black w-full flex items-center justify-center rounded border border-gray-800">
                      <img 
                        src="/lovable-uploads/4c06f33d-061e-4476-a8a9-c1da823dc62e.png" 
                        alt="Geographic heat map" 
                        className="max-w-full h-auto"
                      />
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

// Function to render the customized label for pie charts
const renderCustomizedLabel = ({ 
  cx, 
  cy, 
  midAngle, 
  innerRadius, 
  outerRadius, 
  percent, 
  index 
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.1;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="#fff" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Custom tooltip component for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-gray-700 p-2 shadow-lg backdrop-blur-sm text-xs">
        <p className="text-gray-200 font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export default Intelligence;
