
import EnterpriseLayout from "@/components/layout/EnterpriseLayout";
import BorrowerUnderwriting from "@/components/vdr/BorrowerUnderwriting";

const BorrowerUnderwritingPage = () => {
  return (
    <EnterpriseLayout>
      <div className="container mx-auto px-6 py-8">
        <div className="border-b border-primary/10 pb-4 mb-6">
          <h1 className="text-2xl font-mono">Borrower Underwriting</h1>
          <p className="text-sm text-muted-foreground">
            Calculate and analyze borrower financial ratios for underwriting assessment
          </p>
        </div>
        <BorrowerUnderwriting />
      </div>
    </EnterpriseLayout>
  );
};

export default BorrowerUnderwritingPage;
