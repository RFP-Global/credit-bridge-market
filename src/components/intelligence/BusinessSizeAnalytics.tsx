
import BusinessSizeSection from "./businessSize/BusinessSizeSection";

interface BusinessSizeAnalyticsProps {
  timeFilter: string;
  onTimeFilterChange: (value: string) => void;
  businessSizeData: any[];
  businessSizeDefaultData: any[];
  businessSizeTermsData: any[];
  loanApprovalData: any[];
  colors: Record<string, string>;
}

const BusinessSizeAnalytics = (props: BusinessSizeAnalyticsProps) => {
  return <BusinessSizeSection {...props} />;
};

export default BusinessSizeAnalytics;
