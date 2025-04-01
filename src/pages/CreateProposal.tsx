
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { getUniqueIndustries, financeProposals } from "@/data/marketplace";

// Form schema using zod
const formSchema = z.object({
  projectName: z.string().min(2, { message: "Project name must be at least 2 characters." }),
  facilityType: z.string().min(1, { message: "Please select a facility type." }),
  financingType: z.string().min(1, { message: "Please select a financing type." }),
  industry: z.string().min(1, { message: "Please select an industry." }),
  principal: z.string().min(1, { message: "Please enter the principal amount." }),
  interestRate: z.number().min(0).max(30, { message: "Interest rate must be between 0% and 30%." }),
  term: z.number().int().min(1, { message: "Term must be at least 1 month." }),
  termUnit: z.enum(["Months", "Years"]),
  lenderPreferences: z.string().min(1, { message: "Please select lender preferences." }),
  description: z.string().optional(),
  publicListing: z.boolean().default(true),
});

const CreateProposal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      facilityType: "",
      financingType: "",
      industry: "",
      principal: "",
      interestRate: 5.0,
      term: 12,
      termUnit: "Months",
      lenderPreferences: "",
      description: "",
      publicListing: true,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Construct the proposal object
    const newProposal = {
      id: `P${String(financeProposals.length + 1).padStart(3, '0')}`,
      projectName: values.projectName,
      facilityType: values.facilityType,
      financingType: values.financingType,
      principal: `$${values.principal.replace(/[^\d.]/g, '')}`,
      interestRate: `${values.interestRate.toFixed(2)}%`,
      term: `${values.term} ${values.termUnit}`,
      industry: values.industry,
      lenderPreferences: values.lenderPreferences,
      status: "OPEN",
      bidVolume: 0,
      creditRating: 7.5,
      bidDeadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    };

    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: "Proposal Created",
        description: "Your financing proposal has been successfully created.",
      });
      setIsSubmitting(false);
      navigate("/proposals-dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto px-4 py-12 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create New Financing Proposal</h1>
            <p className="text-muted-foreground">
              Create a new RFP (Request for Proposal) to find financing for your business.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Project Information</CardTitle>
                  <CardDescription>
                    Basic information about your financing request.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Expansion Project Phase 1" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter a clear name that describes your financing need
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="facilityType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Facility Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select facility type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Term Loan">Term Loan</SelectItem>
                              <SelectItem value="Revolving Credit">Revolving Credit</SelectItem>
                              <SelectItem value="Equipment Financing">Equipment Financing</SelectItem>
                              <SelectItem value="Commercial Mortgage">Commercial Mortgage</SelectItem>
                              <SelectItem value="Construction Loan">Construction Loan</SelectItem>
                              <SelectItem value="Bridge Loan">Bridge Loan</SelectItem>
                              <SelectItem value="SBA Loan">SBA Loan</SelectItem>
                              <SelectItem value="Asset-Based Lending">Asset-Based Lending</SelectItem>
                              <SelectItem value="Mezzanine Financing">Mezzanine Financing</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="financingType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Financing Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select financing type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="New Financing">New Financing</SelectItem>
                              <SelectItem value="Refinancing">Refinancing</SelectItem>
                              <SelectItem value="Additional Capital">Additional Capital</SelectItem>
                              <SelectItem value="Debt Restructuring">Debt Restructuring</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Industries</SelectLabel>
                              {getUniqueIndustries().map((industry) => (
                                <SelectItem key={industry} value={industry}>
                                  {industry}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Details</CardTitle>
                  <CardDescription>
                    Specify the financial parameters of your request
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="principal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Principal Amount ($)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 500000" {...field} />
                        </FormControl>
                        <FormDescription>
                          The total amount of financing you're seeking
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="interestRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Interest Rate (%): {field.value.toFixed(2)}%</FormLabel>
                        <FormControl>
                          <Slider 
                            min={0} 
                            max={30} 
                            step={0.1}
                            value={[field.value]} 
                            onValueChange={(value) => field.onChange(value[0])} 
                          />
                        </FormControl>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>0%</span>
                          <span>15%</span>
                          <span>30%</span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="term"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Term</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="e.g., 12" 
                              {...field}
                              onChange={event => field.onChange(event.target.valueAsNumber)} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="termUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Term Unit</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Months">Months</SelectItem>
                              <SelectItem value="Years">Years</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lender Preferences</CardTitle>
                  <CardDescription>
                    Specify your preferences for potential lenders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="lenderPreferences"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Lender Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Commercial Bank" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Commercial Bank
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Credit Union" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Credit Union
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Online Lender" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Online Lender
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Private Equity" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Private Equity
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Any" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Any (No Preference)
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator className="my-6" />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Details (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide any additional information about your financing needs..."
                            className="resize-none min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Add any specific requirements or information that might help lenders understand your needs
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Listing Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="publicListing"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Public Marketplace Listing
                          </FormLabel>
                          <FormDescription>
                            Make your proposal visible to all lenders on the marketplace
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => navigate("/proposals-dashboard")}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-background rounded-full"></div>
                        Creating...
                      </>
                    ) : (
                      "Create Proposal"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateProposal;
