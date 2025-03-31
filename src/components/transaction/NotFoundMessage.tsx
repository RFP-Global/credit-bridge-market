
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFoundMessage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-black/90 text-gray-200 relative grid-bg font-typewriter flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-cyan-400 mb-4">Transaction Not Found</h1>
        <Button 
          onClick={() => navigate("/transaction-archive")}
          className="bg-cyan-800 hover:bg-cyan-700 text-white"
        >
          Return to Archive
        </Button>
      </div>
    </div>
  );
};

export default NotFoundMessage;
