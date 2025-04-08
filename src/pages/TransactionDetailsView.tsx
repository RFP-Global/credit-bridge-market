
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "react-router-dom";

const TransactionDetailsView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the previous page from location state
  const goBack = () => {
    const previousPage = location.state?.from || "/lenders";
    navigate(previousPage);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={goBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl font-mono">Transaction Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Viewing details for transaction {id}. This page is a placeholder and will be connected 
              to the transaction data in a future update.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionDetailsView;
