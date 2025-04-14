
import EnterpriseLayout from "@/components/layout/EnterpriseLayout";
import BorrowerUnderwriting from "@/components/vdr/BorrowerUnderwriting";

const BorrowerUnderwritingPage = () => {
  return (
    <EnterpriseLayout title="Borrower Underwriting" description="Calculate and analyze borrower financial ratios">
      <div className="container mx-auto px-6 py-8">
        <BorrowerUnderwriting />
      </div>
    </EnterpriseLayout>
  );
};

export default BorrowerUnderwritingPage;
